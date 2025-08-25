import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface FlagshipEvent {
  id: number;
  name: string;
  category: string;
  about: string;
  img?: string;
  prize?: string;
  date?: string;
  url?: string;
  fee?: number;
  contact?: Array<{
    name: string;
    phone: string;
    email: string;
  }>;
  description?: {
    overview: string;
    rules: Record<string, unknown>;
  };
}

interface FlagshipEventCardProps {
  event: FlagshipEvent;
  isActive: boolean;
}

export const FlagshipEventCard = ({
  event,
  isActive,
}: FlagshipEventCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobile &&
        showDetails &&
        cardRef.current &&
        !cardRef.current.contains(event.target as Node)
      ) {
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

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (event.url) {
      window.open(event.url, "_blank");
    } else {
      alert("Details Coming Soon!!");
    }
  };

  return (
    <motion.div
      ref={cardRef}
      animate={{
        scale: isActive ? 1.0 : 0.97,
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      className="relative aspect-[4/3] w-full h-full shrink-0 rounded-xl bg-neutral-800 object-cover overflow-hidden shadow-lg border border-gray-700 group cursor-pointer"
      onMouseEnter={() => !isMobile && setShowDetails(true)}
      onMouseLeave={() => !isMobile && setShowDetails(false)}
      onClick={handleCardClick}
      style={{ cursor: isMobile ? "pointer" : "default" }}
    >
      {/* Background Image */}
      {event.img ? (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{
            backgroundImage: `url(${event.img})`,
          }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-red-900 to-red-700 transition-transform duration-500 group-hover:scale-105" />
      )}

      {/* Default State: Only Event Name */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: showDetails ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-6 left-6 text-white"
      >
        <h3 className="text-2xl font-bold font-cattedrale text-shadow-lg tracking-wide drop-shadow-2xl">
          {event.name}
        </h3>
      </motion.div>

      {/* Details Overlay: show on hover (desktop) or tap (mobile) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{
          opacity: showDetails ? 1 : 0,
          x: showDetails ? 0 : -20,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent z-10"
      >
        <div
          className={`absolute inset-0 flex flex-col justify-center p-6 text-white ${
            isMobile ? "max-w-full w-full" : "max-w-[55%]"
          } overflow-y-auto`}
          style={{ maxHeight: isMobile ? "100%" : "90%" }}
        >
          <div className="space-y-4 pr-2" style={{ minHeight: 0 }}>
            {/* Event Name - Larger */}
            <h3 className="text-3xl lg:text-4xl font-bold font-cattedrale leading-tight tracking-wide drop-shadow-2xl">
              {event.name}
            </h3>

            {/* About Text - Make scrollable */}
            <div className="overflow-y-auto" style={{ maxHeight: "8em" }}>
              <p className="text-base font-semibold lg:text-lg text-gray-200 leading-relaxed font-poppins">
                {event.about}
              </p>
            </div>

            {/* Date */}
            {event.date && (
              <p className="text-sm text-gray-300 font-poppins">
                📅{" "}
                {new Date(event.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}

            {/* View Details Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-fit bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-5 text-base rounded-xl transition-colors duration-200 shadow-lg font-poppins"
              onClick={handleViewDetails}
            >
              View Details
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
