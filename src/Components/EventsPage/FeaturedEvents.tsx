import React, { useState, useEffect, useRef } from "react";
import flagshipEvents from "@/Constants/Events/FlagshipEvents.json";

// Prepare slides from FlagshipEvents.json
const slides = flagshipEvents.map((event: any) => ({
  id: event.id,
  name: event.name,
  about: event.about,
  img: event.img,
  contact: event.contact,
  domain: event.category || "", // Use category as domain
}));

const carouselSlides = [...slides, slides[0]];

interface FeaturedEventsProps {
  setDomainIndex: (domainIdx: number, cardIdx: number) => void;
}

const FeaturedEvents: React.FC<FeaturedEventsProps> = ({ setDomainIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true); // State to control transition
  const slideInterval = useRef<NodeJS.Timeout | null>(null);

  const startAutoSlide = () => {
    slideInterval.current = setInterval(() => {
      // Just increment the index. The useEffect will handle the loop.
      setCurrentIndex((prev) => prev + 1);
    }, 5000);
  };

  const stopAutoSlide = () => {
    if (slideInterval.current) clearInterval(slideInterval.current);
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  // This effect handles the seamless loop logic
  useEffect(() => {
    // When we reach the cloned slide at the end
    if (currentIndex === slides.length) {
      // Wait for the transition to finish (700ms)
      const timer = setTimeout(() => {
        setIsTransitioning(false); // Disable transition
        setCurrentIndex(0); // Instantly jump back to the first slide
      }, 700); // This duration must match the CSS transition duration

      return () => clearTimeout(timer);
    }

    // After jumping back to the first slide, re-enable the transition
    if (currentIndex === 0 && !isTransitioning) {
      // A tiny timeout allows the browser to process the index change
      // before re-enabling the transition.
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, isTransitioning]);

  // Navigation: scroll to corresponding event card in domain carousel
  const handleSlideClick = (slide: (typeof slides)[0]) => {
    // Map category to domain index (must match domainJsons order in EventsPage)
    const domainMap = ["Managerial Events", "Robotics Events"];
    // Find domain index by matching full domain name
    const domainIdx = domainMap.findIndex((d) =>
      d.toLowerCase().includes(slide.domain.toLowerCase())
    );
    if (domainIdx !== -1) {
      // Get domain events from window (since FeaturedEvents doesn't have direct access)
      let domainEvents = [];
      try {
        // @ts-ignore
        domainEvents = window.__DOMAIN_EVENTS__?.[domainIdx] || [];
      } catch {}
      // Find card index by event name
      let cardIdx = 0;
      if (domainEvents.length) {
        cardIdx = domainEvents.findIndex((e: any) => e.name === slide.name);
        if (cardIdx === -1) cardIdx = 0;
      }
      setDomainIndex(domainIdx, cardIdx);
      setTimeout(() => {
        const cardId = `${domainMap[domainIdx]
          .replace(/\s+/g, "-")
          .toLowerCase()}-card-${cardIdx}`;
        const cardElement = document.getElementById(cardId);
        if (cardElement) {
          cardElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center space-y-[3vw]">
      <h2 className="w-full font-cattedrale text-[6vw] md:text-[5vw] lg:text-7xl text-center text-white drop-shadow-2xl tracking-wide">
        FEATURED EVENTS
      </h2>

      <div
        className="relative w-[70vw] max-w-[900px] h-[36vw] min-h-[250px] max-h-[600px] overflow-hidden rounded-2xl mx-auto"
        onMouseEnter={() => {
          stopAutoSlide();
        }}
        onMouseLeave={() => {
          startAutoSlide();
        }}>
        <div
          className={`flex h-full ${
            isTransitioning
              ? "transition-transform duration-700 ease-in-out"
              : ""
          }`}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {carouselSlides.map((slide, index) => (
            <div
              key={index}
              className="relative w-full h-full flex-shrink-0 cursor-pointer group transition-transform duration-500 ease-in-out hover:z-20 hover:scale-105"
              onClick={() => handleSlideClick(slide)}>
              {/* Full background image */}
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
                style={{ backgroundImage: `url(${slide.img})` }}
              />
              {/* Overlay for readability: always visible on mobile, hover on desktop */}
              <div className="absolute inset-0 w-full h-full z-10 transition-opacity duration-300 bg-gradient-to-br from-black/70 via-teal-900/60 to-gray-900/70 opacity-100 sm:opacity-0 sm:group-hover:opacity-100" />
              {/* Info section: always visible on mobile, hover on desktop */}
              <div className="absolute inset-0 z-20 h-full w-full flex flex-col justify-center items-start p-4 sm:p-10 gap-4 transition-opacity duration-300 opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
                {/* Mask for text background on mobile */}
                <div className="absolute inset-0 z-[-1] bg-black/40 rounded-2xl sm:bg-transparent" />
                <h3 className="text-white text-2xl sm:text-4xl font-bold font-cattedrale mb-2 drop-shadow-lg tracking-wide">
                  {slide.name}
                </h3>
                <div
                  className="text-gray-200 text-base sm:text-lg mb-2 drop-shadow-md w-full overflow-y-auto h-[7em] sm:h-[12em] rounded-md bg-gray-900/60 flex items-start font-poppins"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                  <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
                  <div className="hide-scrollbar p-3">
                    {slide.about}
                    {slide.contact && (
                      <div className="mt-3 flex flex-col gap-1">
                        {slide.contact.map((c: any, i: number) => (
                          <span
                            key={i}
                            className="text-sm text-teal-300 drop-shadow">
                            {c.name} | {c.phone} | {c.email}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Navigation Dots */}
      <div className="flex justify-center items-center mt-1 space-x-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full focus:outline-none transition-all duration-300 border-2 border-white ${
              currentIndex === idx ||
              (currentIndex === slides.length && idx === 0)
                ? "bg-white scale-110 shadow"
                : "bg-gray-400 opacity-60"
            }`}
            onClick={() => {
              setIsTransitioning(true);
              setCurrentIndex(idx);
            }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedEvents;
