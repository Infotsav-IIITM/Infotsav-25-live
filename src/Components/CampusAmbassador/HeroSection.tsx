"use client";

import { Button } from "@/Components/ui/CAButton";
import { Badge } from "@/Components/ui/CABadge";
import { ExternalLink, Sparkles, Rocket } from "lucide-react";
import FloatingAmbassadorCard from "@/Components/ui/CampusAmbassadorCard";
import CountUp from "@/Components/ui/CACountUp";

export default function HeroSection() {
  const handleApplyNow = () => {
    window.open("https://forms.google.com/your-form-link", "_blank");
  };

  const handleLearnMore = () => {
    window.open(
      "https://rightful-lock-b42.notion.site/Infotsav-24-Campus-Ambassador-Program-738b0f78578349c0b12946f92ffca139",
      "_blank"
    );
  };

  return (
    <section className="mt-25 pb-2 px-4 min-h-screen flex items-start">
      <div className="max-w-7xl w-full mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col">
              <Badge
                variant="outline"
                className="border-red-500 text-red-400 animate-bounce w-max"
              >
                <Sparkles className="w-3 h-3 mr-1" />
                JOIN THE CREW
              </Badge>

              <div className="flex flex-col gap-2">
                <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                  <span className="bg-gradient-to-r from-white via-red-200 to-red-500 bg-clip-text text-transparent">
                    CAMPUS
                  </span>
                  <br />
                  <span className="text-red-400 animate-pulse">AMBASSADOR</span>
                </h1>
              </div>

              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed">
                Ready to be the{" "}
                <span className="text-red-400 font-semibold">
                  coolest person
                </span>{" "}
                on campus? Join our squad and turn your college into the
                epicenter of our techno-cultural revolution! 🚀
              </p>
            </div>

            {/* Buttons + Counters Wrapper */}
            <div className="flex flex-col gap-4 w-max">
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={handleApplyNow}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 text-lg font-bold transform hover:scale-105 transition-all duration-200 shadow-lg shadow-red-500/25"
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  APPLY NOW
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleLearnMore}
                  className="border-red-500 text-red-400 hover:bg-red-500/10 px-8 py-4 text-lg bg-transparent font-bold"
                >
                  Learn More
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-between gap-4 pt-2">
                <div className="text-center flex-1 min-w-[110px]">
                  <div className="text-3xl font-bold text-red-400">
                    <CountUp from={0} to={50} separator="," duration={1.2} />+
                  </div>
                  <div className="text-sm text-gray-400">Colleges</div>
                </div>
                <div className="text-center flex-1 min-w-[110px]">
                  <div className="text-3xl font-bold text-red-400">
                    <CountUp from={0} to={500} separator="," duration={2.5} />+
                  </div>
                  <div className="text-sm text-gray-400">Students</div>
                </div>
                <div className="text-center flex-1 min-w-[110px]">
                  <div className="text-3xl font-bold text-red-400">
                    <CountUp from={0} to={25} separator="," duration={1.0} />+
                  </div>
                  <div className="text-sm text-gray-400">Cities</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Floating Card */}
          <div className="flex justify-center items-center h-full">
            <FloatingAmbassadorCard />
          </div>
        </div>
      </div>
    </section>
  );
}
