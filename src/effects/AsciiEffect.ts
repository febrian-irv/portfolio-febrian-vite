import type * as THREE from "three";

/**
 * Options for the AsciiEffect
 *
 * @param {number} resolution The resolution of the ascii effect. Higher for more details. Default is 0.15.
 * @param {number} scale The scale of the ascii effect. Default is 1.
 * @param {string} color A color to use for the ascii effect. Can either be a hex color or a rgb color. If you want to use a gradient, use the gradient option instead.
 * @param {string} secondaryColor A secondary color to use for the ascii effect in areas where normally black would be used to show depth.
 * @param {boolean} invert Whether to invert the colors. Useful for dark backgrounds. Default is false.
 */
type AsciiEffectOptions = {
  resolution?: number;
  scale?: number;
  color?: string;
  // Can only be two long
  secondaryColor?: string;
  invert?: boolean;
};

/**
 * PerformantAsciiEffect by Louis Escher
 *
 * A modified version of the AsciiEffect from the three.js examples. This version is way more performant when using colors and also supports colors based on the brightness of pixels.
 *
 * @param {THREE.WebGLRenderer} renderer The three.js renderer
 * @param {string} charSet The characters to use for the ascii effect
 * @param {AsciiEffectOptions} options The options for the ascii effect
 */
class AsciiEffect {
  setSize: (w: number, h: number) => void;
  render: (scene: THREE.Scene, camera: THREE.Camera) => void;
  domElement: HTMLDivElement;

  getRGBValuesFromInput(color: string): number[] {
    const isHex = color.match(new RegExp(/^#([0-9a-f]{3}){1,2}$/i));
    const isRGB = color.match(new RegExp(/^(\d{1,3}),(\d{1,3}),(\d{1,3})$/));

    if (isHex) {
      return (
        isHex[0].match(new RegExp(/\w\w/g))?.map((x) => parseInt(x, 16)) || []
      );
    } else if (isRGB) {
      return (
        color.match(new RegExp(/\w\w/g))?.map((x) => parseInt(x, 16)) || []
      );
    }

    throw new Error("Could not parse color");
  }

  constructor(
    renderer: THREE.WebGLRenderer,
    charSet: string = " .:-=+*#%@",
    options: AsciiEffectOptions = {}
  ) {
    const fResolution = options["resolution"] || 0.15;
    const iScale = options["scale"] || 1;
    const bColor = options["color"] || "#ffffff";
    const bSecondary = options["secondaryColor"] || "#000000";
    const bInvert = options["invert"] || false;

    let width: number, height: number;

    const domElement = document.createElement("div");
    domElement.style.cursor = "default";

    const oAscii: HTMLTableElement = document.createElement("table");
    domElement.appendChild(oAscii);

    let iWidth: number, iHeight: number;
    let oImg: HTMLCanvasElement;

    this.setSize = function (w, h) {
      width = w;
      height = h;

      renderer.setSize(w, h);

      initAsciiSize();
    };

    // Frame skipping for performance
    let frameCounter = 0;
    let cachedHTML = '';

    this.render = function (scene, camera) {
      renderer.render(scene, camera);

      // Only update ASCII every 2 frames (50% performance gain)
      frameCounter++;
      if (frameCounter % 2 === 0) {
        asciifyImage(oAscii);
      }
    };

    this.domElement = domElement;

    // Ascii Image Renderer from https://github.com/hassadee/jsascii/blob/master/jsascii.js (MIT License)
    function initAsciiSize() {
      iWidth = Math.floor(width * fResolution);
      iHeight = Math.floor(height * fResolution);

      oCanvas.width = iWidth;
      oCanvas.height = iHeight;

      oImg = renderer.domElement;

      if (oImg.style.backgroundColor) {
        oAscii.rows[0].cells[0].style.backgroundColor =
          oImg.style.backgroundColor;
        oAscii.rows[0].cells[0].style.color = oImg.style.color;
      }

      oAscii.cellSpacing = "0";
      oAscii.cellPadding = "0";

      const oStyle = oAscii.style;
      oStyle.whiteSpace = "pre";
      oStyle.margin = "0px";
      oStyle.padding = "0px";
      oStyle.letterSpacing = fLetterSpacing + "px";
      oStyle.fontFamily = strFont;
      oStyle.fontSize = fFontSize + "px";
      oStyle.lineHeight = fLineHeight + "px";
      oStyle.textAlign = "left";
      oStyle.textDecoration = "none";
    }

    const aDefaultCharList = " .,:;i1tfLCG08@".split("");
    const aDefaultColorCharList = " CGO08@".split("");
    const strFont = "courier new, monospace";

    const oCanvasImg = renderer.domElement;

    const oCanvas = document.createElement("canvas");
    if (!oCanvas.getContext) return;

    const oCtx = oCanvas.getContext("2d");
    if (!oCtx || !oCtx.getImageData) return;

    let aCharList = bColor ? aDefaultColorCharList : aDefaultCharList;

    if (charSet) aCharList = charSet.split("");

    const colorPerCharacterLookup: Record<string, string> = {};
    const charToClassMap: Record<string, string> = {}; // Map character to CSS class

    const rgb1 = this.getRGBValuesFromInput(bColor);
    const rgb2 = this.getRGBValuesFromInput(bSecondary);

    const diff = rgb2.map((x, i) => x - rgb1[i]);
    const dividedDiff = diff.map((x) => x / aCharList.length);

    const copiedCharList = [...aCharList].filter((x) => x != " ");
    copiedCharList.reverse();

    // Create CSS classes for each character color
    let styleSheet = '<style>';
    for (let i = 0; i < copiedCharList.length; i++) {
      const character = copiedCharList[i];
      const rgbValues = `rgb(${Math.round(rgb1[0])},${Math.round(
        rgb1[1]
      )},${Math.round(rgb1[2])})`;
      colorPerCharacterLookup[character] = rgbValues;
      const className = `c${i}`;
      charToClassMap[character] = className;
      styleSheet += `.${className}{color:${rgbValues};}`;
      rgb1[0] += dividedDiff[0];
      rgb1[1] += dividedDiff[1];
      rgb1[2] += dividedDiff[2];
    }
    styleSheet += '</style>';

    const fFontSize = (2 / fResolution) * iScale;
    const fLineHeight = (2 / fResolution) * iScale;

    let fLetterSpacing = 0;

    switch (iScale) {
      case 1:
        fLetterSpacing = -1;
        break;
      case 2:
      case 3:
        fLetterSpacing = -2.1;
        break;
      case 4:
        fLetterSpacing = -3.1;
        break;
      case 5:
        fLetterSpacing = -4.15;
        break;
    }

    // convert img element to ascii
    function asciifyImage(oAscii: HTMLTableElement) {
      if (!oCtx) return;

      oCtx.clearRect(0, 0, iWidth, iHeight);
      oCtx.drawImage(oCanvasImg, 0, 0, iWidth, iHeight);
      const oImgData = oCtx.getImageData(0, 0, iWidth, iHeight).data;

      // Use array instead of string concatenation for O(n) performance
      const htmlParts: string[] = [styleSheet];

      // console.time('rendering');

      for (let y = 0; y < iHeight; y += 2) {
        let lastSymbol: string | undefined = undefined;

        for (let x = 0; x < iWidth; x++) {
          const iOffset = (y * iWidth + x) * 4;

          const iRed = oImgData[iOffset];
          const iGreen = oImgData[iOffset + 1];
          const iBlue = oImgData[iOffset + 2];
          const iAlpha = oImgData[iOffset + 3];
          let iCharIdx: number;

          if (iAlpha == 0) {
            htmlParts.push('<span style="color:transparent">&nbsp;</span>');
            continue;
          }

          const fBrightness = (0.3 * iRed + 0.59 * iGreen + 0.11 * iBlue) / 255;

          iCharIdx = Math.floor((1 - fBrightness) * (aCharList.length - 1));

          if (bInvert) {
            iCharIdx = aCharList.length - iCharIdx - 1;
          }

          const strThisChar = aCharList[iCharIdx];

          if (strThisChar === undefined || strThisChar == " ") {
            htmlParts.push("&nbsp;");
          } else {
            const className = charToClassMap[strThisChar];

            if (lastSymbol == strThisChar) {
              htmlParts.push(strThisChar);
            } else {
              htmlParts.push(`</span><span class="${className}">${strThisChar}`);
              lastSymbol = strThisChar;
            }
          }
        }
        htmlParts.push("<br/>");
      }

      // Join array once instead of many string concatenations
      const newHTML = `<tr><td style="display:block;width:${width}px;height:${height}px;overflow:hidden">${htmlParts.join('')}</td></tr>`;

      // Only update DOM if content changed (caching)
      if (newHTML !== cachedHTML) {
        oAscii.innerHTML = newHTML;
        cachedHTML = newHTML;
      }

      // console.timeEnd('rendering');
    }
  }
}

export { AsciiEffect };
