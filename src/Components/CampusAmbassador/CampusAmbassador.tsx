import React from "react";
import HeroSection from "./HeroSection";
import WhyBecomeAmbassador from "./WhyBecomeAmbassador";
import Footer from "../Other/Footer";
import { useNavigate } from "react-router-dom";

const CampusAmbassador: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => navigate("/")}
        className="fixed top-8 left-8 z-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3 hover:bg-white/20 transition-all duration-300 group"
        aria-label="Back to Home"
      >
        <svg
          className="w-6 h-6 text-white group-hover:text-gray-200 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
      </button>
      <HeroSection />
      {/* Section 2: Why Join */}
      <WhyBecomeAmbassador />
      <Footer />
    </div>
  );
};

export default CampusAmbassador;
