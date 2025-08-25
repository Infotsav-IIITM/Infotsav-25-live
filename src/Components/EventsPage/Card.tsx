import React, { useState, useEffect } from "react";

interface CardProps {
  title: string;
  description: string;
  id?: string;
  img: string;
  onRegister?: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  id,
  img,
  onRegister,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isMobile, setIsMobile] = useState(false);


  const cardRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect mobile screen
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // Tailwind sm breakpoint
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Hide details when clicking outside the card (mobile only)
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && showDetails && cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setShowDetails(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", checkMobile);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile, showDetails]);

  const handleCardClick = () => {
    if (isMobile) setShowDetails((prev) => !prev);
  };

  // Hide details when switching to desktop
  useEffect(() => {
    if (!isMobile) setShowDetails(false);
  }, [isMobile]);

  return (
    <div
      ref={cardRef}
      id={id}
      className="group relative bg-gray-800 shadow-2xl rounded-2xl overflow-hidden h-full w-full transition-all duration-300 ease-in-out border-gray-300/40"
      onClick={handleCardClick}
      style={{ cursor: isMobile ? "pointer" : "default" }}
    >
      {/* Background / Image area from JSON */}
      <div
        className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
        style={{
          backgroundImage:
            img && typeof img === "string" && img.trim() !== ""
              ? `url(${img})`
              : "none",
          backgroundSize:
            img && typeof img === "string" && img.trim() !== ""
              ? "cover"
              : undefined,
          backgroundPosition:
            img && typeof img === "string" && img.trim() !== ""
              ? "center"
              : undefined,
          backgroundColor: !img || img.trim() === "" ? "#14b8a6" : undefined,
        }}
      />

      {/* Hover overlay background - vertical from bottom (no side fade) */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent transition-opacity duration-300 ${isMobile ? (showDetails ? "opacity-100" : "opacity-0") : "group-hover:opacity-100 opacity-0"}`} />

      <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent transition-opacity duration-300 ${isMobile ? (showDetails ? "opacity-100" : "opacity-0") : "group-hover:opacity-100 opacity-0"}`} />
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
        <div className={`w-[92%] sm:w-[85%] space-y-3 transition-all duration-300 ease-out ${isMobile ? (showDetails ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4") : "group-hover:opacity-100 group-hover:translate-y-0 opacity-0 translate-y-4"}`}>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#f83e3e] font-cattedrale drop-shadow">
            {title}
          </h3>
          <style>{`
            .hide-scrollbar::-webkit-scrollbar { display: none; }
          `}</style>
          <div
            className="hide-scrollbar text-gray-200 text-xs font-semibold sm:text-sm leading-relaxed max-h-[9em] overflow-y-auto pr-2 drop-shadow-sm"
            style={{
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE/Edge
            }}
          >
            {description}
          </div>
          <button
            className="mt-2 sm:mt-3 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors duration-300 shadow"
            onClick={(e) => {
              e.stopPropagation();
              if (onRegister) onRegister();
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
