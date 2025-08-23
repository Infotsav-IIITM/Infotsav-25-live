import React, { useEffect, useRef } from "react";
import Card from "./Card";
import ArrowNavButton from "./ArrowNavButton";

interface CardData {
  title: string;
  description: string;
  url: string;
  img: string;
}

interface DomainProps {
  domainName: string;
  cards: CardData[];
  currentIndex: number;
  setCurrentIndex: (idx: number) => void;
}

const Domain: React.FC<DomainProps> = ({
  domainName,
  cards,
  currentIndex,
  setCurrentIndex,
}) => {
  // Horizontal scroll state/refs
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const isProgrammaticScroll = useRef(false);
  const rafId = useRef<number | null>(null);
  const virtualIndexRef = useRef(0);
  const scrollEndTimerRef = useRef<NodeJS.Timeout | null>(null);
  const restartTimerRef = useRef<NodeJS.Timeout | null>(null);
  const indexFromScrollRef = useRef(false);

  // Build virtual list (3 loops for seamless wrap)
  const L = cards.length || 1;
  const LOOPS = 3;
  const BASE_OFFSET = L; // middle loop start index
  const virtualCards = Array.from(
    { length: LOOPS * L },
    (_, i) => cards[i % L]
  );

  // Compute scrollLeft to center a specific VIRTUAL index
  const getScrollLeftForVirtualIndex = React.useCallback((vIdx: number) => {
    const scroller = scrollerRef.current;
    const el = itemRefs.current[vIdx];
    if (!scroller || !el) return 0;
    const left = el.offsetLeft - (scroller.clientWidth - el.clientWidth) / 2;
    return Math.max(0, left);
  }, []);

  // Scroll to a specific VIRTUAL index
  const scrollToVirtualIndex = React.useCallback(
    (vIdx: number, smooth = true) => {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      isProgrammaticScroll.current = true;
      scroller.scrollTo({
        left: getScrollLeftForVirtualIndex(vIdx),
        behavior: smooth ? "smooth" : "auto",
      });
      virtualIndexRef.current = vIdx;
      window.setTimeout(() => (isProgrammaticScroll.current = false), 400);
    },
    [getScrollLeftForVirtualIndex]
  );

  // Scroll to the nearest virtual index representing the given REAL index
  const scrollToIndex = React.useCallback(
    (realIdx: number, smooth = true) => {
      const currentV = virtualIndexRef.current || BASE_OFFSET + currentIndex;
      const candidate = BASE_OFFSET + realIdx; // middle loop
      const candidates = [candidate - L, candidate, candidate + L];
      let best = candidates[0];
      let bestDist = Math.abs(candidates[0] - currentV);
      for (let i = 1; i < candidates.length; i++) {
        const d = Math.abs(candidates[i] - currentV);
        if (d < bestDist) {
          best = candidates[i];
          bestDist = d;
        }
      }
      scrollToVirtualIndex(best, smooth);
    },
    [BASE_OFFSET, currentIndex, L, scrollToVirtualIndex]
  );

  const autoScroll = React.useCallback(() => {
    // Always use the latest index for autoscroll
    const latestIndex = virtualIndexRef.current % cards.length;
    const next = (latestIndex + 1) % cards.length;
    setCurrentIndex(next);
    scrollToIndex(next);
  }, [cards.length, scrollToIndex, setCurrentIndex]);

  const startAutoScroll = React.useCallback(() => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
    autoScrollIntervalRef.current = setInterval(autoScroll, 10000); // 10 seconds
  }, [autoScroll]);

  // Stop auto-scroll timer
  const stopAutoScroll = () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }
  };

  // Reset auto-scroll timer (called on manual navigation)
  const resetAutoScroll = () => {
    stopAutoScroll();
    startAutoScroll();
  };

  // Initialize auto-scroll on mount
  useEffect(() => {
    startAutoScroll();
    // align scroll to initial index in middle loop
    const startV = BASE_OFFSET + currentIndex;
    virtualIndexRef.current = startV;
    scrollToVirtualIndex(startV, false);

    // Cleanup on unmount
    return () => {
      stopAutoScroll();
    };
  }, [BASE_OFFSET, currentIndex, scrollToVirtualIndex, startAutoScroll]);

  // Restart auto-scroll when currentIndex changes and sync scroll
  useEffect(() => {
    startAutoScroll();
    if (indexFromScrollRef.current) {
      // If index came from user scroll, do NOT jump back to autoscroll position
      indexFromScrollRef.current = false;
      // Do not scrollToIndex here, let manual scroll position persist
    } else {
      scrollToIndex(currentIndex);
    }
  }, [currentIndex, scrollToIndex, startAutoScroll]);

  const goToPrevious = () => {
    const next = currentIndex === 0 ? L - 1 : currentIndex - 1;
    setCurrentIndex(next);
    scrollToIndex(next);
    resetAutoScroll(); // Reset timer on manual navigation
    // Update virtualIndexRef so autoscroll resumes from here
    virtualIndexRef.current = BASE_OFFSET + next;
  };

  const goToNext = () => {
    const next = currentIndex === L - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(next);
    scrollToIndex(next);
    resetAutoScroll(); // Reset timer on manual navigation
    // Update virtualIndexRef so autoscroll resumes from here
    virtualIndexRef.current = BASE_OFFSET + next;
  };

  // Update currentIndex based on scroll position
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const onScroll = () => {
      if (isProgrammaticScroll.current) return;
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        // Pause auto-scroll while user is scrolling
        if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
        stopAutoScroll();

        // Debounce until scroll settles, then compute nearest and sync index
        if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);
        scrollEndTimerRef.current = setTimeout(() => {
          const center = scroller.scrollLeft + scroller.clientWidth / 2;
          let nearest = 0;
          let min = Infinity;
          itemRefs.current.forEach((el, idx) => {
            if (!el) return;
            const elCenter = el.offsetLeft + el.clientWidth / 2;
            const d = Math.abs(elCenter - center);
            if (d < min) {
              min = d;
              nearest = idx;
            }
          });
          virtualIndexRef.current = nearest;
          const realIdx = ((nearest % L) + L) % L;
          if (realIdx !== currentIndex) {
            indexFromScrollRef.current = true;
            setCurrentIndex(realIdx);
          }

          // Teleport when near edges to keep in middle loop window
          const leftThreshold = Math.floor(L * 0.5);
          const rightThreshold = Math.floor(L * 2.5);
          if (nearest <= leftThreshold || nearest >= rightThreshold) {
            const rebased =
              nearest <= leftThreshold ? nearest + L : nearest - L;
            isProgrammaticScroll.current = true;
            scroller.scrollTo({
              left: getScrollLeftForVirtualIndex(rebased),
              behavior: "auto",
            });
            virtualIndexRef.current = rebased;
            window.setTimeout(() => (isProgrammaticScroll.current = false), 0);
          }

          // restart auto scroll after a short delay
          restartTimerRef.current = setTimeout(() => startAutoScroll(), 2000);
        }, 140);
      });
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);
      if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
    };
  }, [
    currentIndex,
    setCurrentIndex,
    cards.length,
    L,
    startAutoScroll,
    getScrollLeftForVirtualIndex,
  ]);

  // Helper to generate unique card IDs
  const getCardId = (idx: number) =>
    `${domainName.replace(/\s+/g, "-").toLowerCase()}-card-${idx}`;

  // Placeholder register handler
  // const handleRegister = (cardIdx: number) => {
  //   alert(`Register for ${cards[cardIdx].title}`);
  // };

  const handleRegister = (cardIdx: number) => {
    const eventUrl = cards[cardIdx].url;
    if (eventUrl) {
      window.open(eventUrl, "_blank"); // opens in a new tab
    } else {
      alert("Registrations Opening Soon!!");
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h2 className="text-[5vw] text-center text-gray-200 font-cattedrale tracking-wide mb-0">
        {domainName}
      </h2>
      <div className="mt-1 sm:mt-0.5" />

      {/* Carousel container */}
      <div
        className="relative h-[400px] sm:h-[520px] md:h-[600px] w-[98vw] sm:w-[90%] max-w-[1400px] flex items-center justify-center overflow-x-hidden"
        onMouseEnter={stopAutoScroll}
        onMouseLeave={startAutoScroll}
      >
        {/* Fade overlays - hidden on mobile, narrower on sm */}
        <div
          className="hidden sm:block pointer-events-none absolute left-0 top-0 h-full w-6 sm:w-16 md:w-32 z-20"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0) 100%)",
          }}
        />
        <div
          className="hidden sm:block pointer-events-none absolute right-0 top-0 h-full w-6 sm:w-16 md:w-32 z-20"
          style={{
            background:
              "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0) 100%)",
          }}
        />

        {/* Left nav button - always at side, smaller on mobile */}
        <div className="absolute left-1 sm:left-8 top-1/2 -translate-y-1/2 z-30">
          <div className="w-10 h-10 sm:w-12 sm:h-12">
            <ArrowNavButton direction="left" onClick={goToPrevious} />
          </div>
        </div>

        {/* Cards wrapper - horizontal scroll with snap */}
        <div className="relative h-full w-full">
          <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
          <div
            ref={scrollerRef}
            className="hide-scrollbar flex h-full w-full items-center overflow-x-auto scroll-smooth snap-x snap-mandatory gap-6 px-6"
            onMouseDown={stopAutoScroll}
            onWheel={stopAutoScroll}
            onTouchStart={stopAutoScroll}
            onTouchEnd={startAutoScroll}
          >
            {virtualCards.map((card, vIdx) => (
              <div
                key={vIdx}
                ref={(el) => {
                  itemRefs.current[vIdx] = el;
                }}
                id={getCardId(vIdx % L)}
                className={`snap-center snap-always shrink-0 h-[360px] sm:h-[460px] md:h-[560px] w-[78vw] sm:w-[420px] md:w-[520px] transition-transform duration-300 ${
                  vIdx % L === currentIndex
                    ? "scale-[1.03]"
                    : "scale-[0.96] opacity-90"
                }`}
              >
                <Card
                  id={getCardId(vIdx % L)}
                  title={virtualCards[vIdx].title}
                  description={virtualCards[vIdx].description}
                  img={virtualCards[vIdx].img}
                  onRegister={() => handleRegister(vIdx % L)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right nav button - always at side, smaller on mobile */}
        <div className="absolute right-5 sm:right-8 top-1/2 -translate-y-1/2 z-30">
          <div className="w-10 h-10 sm:w-12 sm:h-12">
            <ArrowNavButton direction="right" onClick={goToNext} />
          </div>
        </div>
      </div>
      {/* Navigation Dots */}
      <div className="flex justify-center items-center space-x-3">
        {cards.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full focus:outline-none transition-all duration-300 border-2 border-white ${
              currentIndex === idx
                ? "bg-white scale-110 shadow"
                : "bg-gray-400 opacity-60"
            }`}
            onClick={() => {
              setCurrentIndex(idx);
              scrollToIndex(idx);
              resetAutoScroll();
              // Update virtualIndexRef so autoscroll resumes from here
              virtualIndexRef.current = BASE_OFFSET + idx;
            }}
            aria-label={`Go to card ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Domain;
