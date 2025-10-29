import { useState, useEffect, useMemo, memo, useCallback } from "react";

interface AnimatedAsciiArtProps {
  text: string;
  className?: string;
  speed?: number;
  lineDelay?: number;
  tailLength?: number;
  randomCharSet?: string;
  randomizeLineDelays?: boolean; // enable random line delays instead of diagonal
  lineDelayRange?: [number, number]; // range for random delays [min, max]
}

interface CharSegment {
  start: number;
  end: number;
}

// Memoized line component to prevent unnecessary re-renders
const MemoizedLine = memo(({ content }: { content: string }) => {
  return <div>{content}</div>;
});

MemoizedLine.displayName = 'MemoizedLine';

function AnimatedAsciiArt({
  text,
  className = "",
  speed = 20,
  lineDelay = 3,
  tailLength = 4,
  randomCharSet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  randomizeLineDelays = false,
  lineDelayRange = [0, 10],
}: AnimatedAsciiArtProps) {
  const lines = text.split("\n");
  const maxLength = Math.max(...lines.map((line) => line.length));

  const [position, setPosition] = useState(0);

  const getRandomChar = useMemo(() => {
    return (pos: number, charIdx: number, lineIdx: number) => {
      const seed = pos * 7 + charIdx * 13 + lineIdx * 17;
      const index = seed % randomCharSet.length;
      return randomCharSet[index];
    };
  }, [randomCharSet]);

  // Generate line-specific delays (either linear diagonal or random)
  const lineDelays = useMemo(() => {
    if (!randomizeLineDelays) {
      // Use linear delays for diagonal effect
      return lines.map((_, idx) => idx * lineDelay);
    }

    // Generate random delays for each line
    const [min, max] = lineDelayRange;
    return lines.map(() => Math.floor(Math.random() * (max - min + 1)) + min);
  }, [randomizeLineDelays, lines, lineDelay, lineDelayRange]);

  // Pre-compute segment lookup maps for O(1) access
  const lineSegmentMaps = useMemo(() => {
    return lines.map((line) => {
      const segments: CharSegment[] = [];
      const charToSegmentMap = new Map<number, CharSegment>();
      let inSegment = false;
      let segmentStart = 0;

      for (let i = 0; i < line.length; i++) {
        const isWhitespace = line[i] === " " || line[i] === "\u00A0";

        if (!isWhitespace && !inSegment) {
          segmentStart = i;
          inSegment = true;
        } else if (isWhitespace && inSegment) {
          const segment = { start: segmentStart, end: i - 1 };
          segments.push(segment);
          // Map each character index to its segment
          for (let j = segmentStart; j < i; j++) {
            charToSegmentMap.set(j, segment);
          }
          inSegment = false;
        }
      }

      if (inSegment) {
        const segment = { start: segmentStart, end: line.length - 1 };
        segments.push(segment);
        // Map remaining characters to segment
        for (let j = segmentStart; j < line.length; j++) {
          charToSegmentMap.set(j, segment);
        }
      }

      return { segments, charToSegmentMap };
    });
  }, [lines]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        // Find the maximum delay to ensure animation runs long enough
        const maxDelay = Math.max(...lineDelays);
        const totalAnimationLength = maxLength + tailLength + maxDelay;
        if (prev >= totalAnimationLength) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [maxLength, speed, tailLength, lineDelays]);

  const renderLine = useCallback((line: string, lineIndex: number) => {
    const { charToSegmentMap } = lineSegmentMaps[lineIndex];
    const effectivePosition = position - lineDelays[lineIndex];

    // Early bailout: if animation hasn't reached this line yet
    if (effectivePosition < -tailLength) {
      return line.replace(/[^ \u00A0]/g, "\u00A0");
    }

    // Early bailout: if animation has passed this line completely
    if (effectivePosition > line.length + tailLength) {
      return line;
    }

    // Use array for O(n) instead of O(n²) string concatenation
    const result: string[] = [];

    for (let charIndex = 0; charIndex < line.length; charIndex++) {
      const char = line[charIndex];
      const isWhitespace = char === " " || char === "\u00A0";

      if (isWhitespace) {
        result.push(char);
        continue;
      }

      // O(1) lookup instead of O(m) find
      const segment = charToSegmentMap.get(charIndex);

      if (!segment) {
        result.push(char);
        continue;
      }

      const relativePos = effectivePosition - charIndex;

      if (relativePos > tailLength) {
        result.push(char);
      } else if (relativePos > 0 && relativePos <= tailLength) {
        result.push(getRandomChar(position, charIndex, lineIndex));
      } else {
        result.push("\u00A0");
      }
    }
    return result.join('');
  }, [position, lineDelays, lineSegmentMaps, tailLength, getRandomChar]);

  // Memoize rendered lines to avoid recalculating unchanged lines
  const renderedLines = useMemo(() => {
    return lines.map((line, lineIndex) => renderLine(line, lineIndex));
  }, [lines, renderLine]);

  return (
    <pre className={className}>
      {renderedLines.map((content, lineIndex) => (
        <MemoizedLine key={lineIndex} content={content} />
      ))}
    </pre>
  );
}

export default AnimatedAsciiArt;
