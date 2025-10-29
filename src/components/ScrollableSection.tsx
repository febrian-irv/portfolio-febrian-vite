import { useRef, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface ScrollableSectionProps {
  children: ReactNode;
  gap?: string;
}

export default function ScrollableSection({
  children,
  gap = "gap-6",
}: ScrollableSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check scroll position and update arrow visibility
  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    // Can scroll left if not at the start
    setCanScrollLeft(scrollLeft > 0);

    // Can scroll right if not at the end (with small tolerance for rounding)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  // Scroll to the next/previous card position
  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const flexContainer = container.firstElementChild;
    if (!flexContainer) return;

    // Get all card elements
    const cards = Array.from(flexContainer.children) as HTMLElement[];
    if (cards.length === 0) return;

    const containerRect = container.getBoundingClientRect();

    // Find the current card (most visible card in viewport)
    let currentCardIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const cardLeftRelativeToContainer = cardRect.left - containerRect.left;
      const distance = Math.abs(cardLeftRelativeToContainer);

      if (distance < minDistance) {
        minDistance = distance;
        currentCardIndex = index;
      }
    });

    // Calculate target card index
    const targetCardIndex =
      direction === "left"
        ? Math.max(0, currentCardIndex - 1)
        : Math.min(cards.length - 1, currentCardIndex + 1);

    // Get target card position
    const targetCard = cards[targetCardIndex];
    const targetCardOffsetLeft = targetCard.offsetLeft;

    // Scroll to the target card
    container.scrollTo({
      left: targetCardOffsetLeft,
      behavior: "smooth",
    });
  };

  // Initialize and set up event listeners
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Initial check
    checkScrollPosition();

    // Debounced scroll handler for performance
    let scrollTimeout: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(checkScrollPosition, 50);
    };

    // Resize handler to recalculate on window resize
    const handleResize = () => {
      checkScrollPosition();
    };

    container.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      clearTimeout(scrollTimeout);
    };
  }, [children]); // Re-run when children change

  return (
    <div className="relative py-4">
      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        aria-label="Scroll left"
        className={`absolute left-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 p-3 md:p-4 bg-gray-900/80 hover:bg-gray-800/90 backdrop-blur-sm rounded-full transition-all duration-300 cursor-pointer ${
          canScrollLeft
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 md:h-8 md:w-8 text-gray-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto overflow-y-visible scrollbar-hide scroll-smooth snap-x snap-mandatory"
      >
        <div className={`flex ${gap} py-2 pb-4 w-max`}>
          {children}
        </div>
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        aria-label="Scroll right"
        className={`absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 p-3 md:p-4 bg-gray-900/80 hover:bg-gray-800/90 backdrop-blur-sm rounded-full transition-all duration-300 cursor-pointer ${
          canScrollRight
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 md:h-8 md:w-8 text-gray-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
