import { useState } from "react";
import asciiArt from "/public/building-ascii.txt?raw";
import AnimatedAsciiArt from "./AnimatedAsciiArt";

function App() {
  return (
    <div className="bg-black w-screen h-screen">
      {/* cover ascii with orange background */}
      <div className="relative">
        <svg
          width="1728"
          height="726"
          viewBox="0 0 1728 726"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="illuminate"
        >
          <g filter="url(#filter0_fn_9_12)">
            <path
              d="M802.5 -54.0778C261.3 -14.1246 -124 -164.712 -249 -245L-140 435L1570 98.8681C1554 -126.909 1343.7 -94.031 802.5 -54.0778Z"
              fill="#F17249"
            />
          </g>
          <defs>
            <filter
              id="filter0_fn_9_12"
              x="-539.7"
              y="-535.7"
              width="2400.4"
              height="1261.4"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="145.35"
                result="effect1_foregroundBlur_9_12"
              />
              <feTurbulence
                type="fractalNoise"
                baseFrequency="2 2"
                stitchTiles="stitch"
                numOctaves="3"
                result="noise"
                seed="5785"
              />
              <feColorMatrix
                in="noise"
                type="luminanceToAlpha"
                result="alphaNoise"
              />
              <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                <feFuncA
                  type="discrete"
                  tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "
                />
              </feComponentTransfer>
              <feComposite
                operator="in"
                in2="effect1_foregroundBlur_9_12"
                in="coloredNoise1"
                result="noise1Clipped"
              />
              <feFlood flood-color="rgba(0, 0, 0, 0.25)" result="color1Flood" />
              <feComposite
                operator="in"
                in2="noise1Clipped"
                in="color1Flood"
                result="color1"
              />
              <feMerge result="effect2_noise_9_12">
                <feMergeNode in="effect1_foregroundBlur_9_12" />
                <feMergeNode in="color1" />
              </feMerge>
            </filter>
          </defs>
        </svg>
        <pre
          className="text-white absolute top-10 left-10 text-[10px]
        "
        >
          {asciiArt}
        </pre>

        {/* Introduction */}
        <div className="text-white left-10 absolute">
          <h1 className="text-8xl font-averia">Hello, I'm Febrian</h1>
          <p className="mt-2 text-lg font-be-vietnam">
            A passionate developer specializing in building web applications.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
