import React from "react";
import HeroSection from "./HeroSection";
import WhyBecomeAmbassador from "./WhyBecomeAmbassador";
import Footer from "../Other/Footer";

const CampusAmbassador: React.FC = () => {
  return (
    <div className="mt-[50px]">
      <HeroSection />
      {/* Section 2: Why Join */}
      <WhyBecomeAmbassador />
      <Footer/>
    </div>
  );
};

export default CampusAmbassador;
