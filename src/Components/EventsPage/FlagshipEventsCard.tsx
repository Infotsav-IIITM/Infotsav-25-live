import { motion } from "framer-motion";
import { useState } from "react";

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
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if(event.url) {
        window.open(event.url, "_blank");
    }
    else {
        alert("Details Coming Soon!!");
    }
  };

  return (
    <motion.div
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
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
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-6 left-6 text-white">
        <h3 className="text-2xl font-bold font-cattedrale text-shadow-lg tracking-wide drop-shadow-2xl">
          {event.name}
        </h3>
      </motion.div>

      {/* Hover State: Side Overlay */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          x: isHovered ? 0 : -20,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent">
        <div className="absolute inset-0 flex flex-col justify-center p-6 text-white max-w-[55%]">
          <div className="space-y-4">
            {/* Event Name - Larger */}
            <h3 className="text-3xl lg:text-4xl font-bold font-cattedrale leading-tight tracking-wide drop-shadow-2xl">
              {event.name}
            </h3>

            {/* About Text */}
            <p className="text-base lg:text-lg text-gray-200 leading-relaxed line-clamp-3 font-poppins">
              {event.about}
            </p>

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
              onClick={handleClick}
              >
              View Details
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
