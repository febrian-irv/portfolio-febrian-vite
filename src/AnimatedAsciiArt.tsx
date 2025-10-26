import { useState, useEffect, useMemo } from "react";

interface AnimatedAsciiArtProps {
  text: string;
  className?: string;
  speed?: number;
  lineDelay?: number;
}

interface CharSegment {
  start: number;
  end: number;
}

function AnimatedAsciiArt({
  text,
  className = "",
  speed = 20,
  lineDelay = 3,
}: AnimatedAsciiArtProps) {
  const lines = text.split("\n");
  const maxLength = Math.max(...lines.map((line) => line.length));

  const [position, setPosition] = useState(0);
  const gradientChars = useMemo(
    () => [".", ":", "-", "=", "+", "*", "#", "%", "@"],
    []
  );

  const lineSegments = useMemo(() => {
    return lines.map((line) => {
      const segments: CharSegment[] = [];
      let inSegment = false;
      let segmentStart = 0;

      for (let i = 0; i < line.length; i++) {
        const isWhitespace = line[i] === " " || line[i] === "\u00A0";

        if (!isWhitespace && !inSegment) {
          segmentStart = i;
          inSegment = true;
        } else if (isWhitespace && inSegment) {
          segments.push({ start: segmentStart, end: i - 1 });
          inSegment = false;
        }
      }

      if (inSegment) {
        segments.push({ start: segmentStart, end: line.length - 1 });
      }

      return segments;
    });
  }, [lines]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        // Account for the last line's delay in the animation duration
        const totalAnimationLength =
          maxLength + gradientChars.length + lines.length * lineDelay;
        if (prev >= totalAnimationLength) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [maxLength, speed, lines.length, lineDelay]);

  const renderCharacter = (
    char: string,
    charIndex: number,
    lineSegments: CharSegment[],
    lineIndex: number
  ) => {
    const isWhitespace = char === " " || char === "\u00A0";

    if (isWhitespace) {
      return char;
    }

    const segment = lineSegments.find(
      (seg) => charIndex >= seg.start && charIndex <= seg.end
    );

    if (!segment) {
      return char;
    }

    const effectivePosition = position - lineIndex * lineDelay;
    const relativePos = effectivePosition - charIndex;

    if (relativePos > gradientChars.length) {
      return char;
    }

    if (relativePos > 0 && relativePos <= gradientChars.length) {
      const gradientIndex = gradientChars.length - relativePos;
      return gradientChars[gradientIndex];
    }

    return "\u00A0";
  };

  return (
    <pre className={className}>
      {lines.map((line, lineIndex) => (
        <div key={lineIndex}>
          {Array.from(line).map((char, charIndex) => (
            <span key={charIndex}>
              {renderCharacter(
                char,
                charIndex,
                lineSegments[lineIndex],
                lineIndex
              )}
            </span>
          ))}
        </div>
      ))}
    </pre>
  );
}

export default AnimatedAsciiArt;
