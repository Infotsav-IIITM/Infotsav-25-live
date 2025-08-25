"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/CACard";
import { Trophy, Gift, Zap, MapPin, Star } from "lucide-react";

export default function FloatingAmbassadorCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex justify-center items-center">
      <div className="relative">
        {/* Main Floating Card */}
        <div
          className={`transform transition-all duration-700 ${
            isHovered ? "rotate-6 scale-110" : "rotate-3"
          } animate-bounce`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            animation: "float 6s ease-in-out infinite",
          }}
        >
          <Card className="w-80 bg-gradient-to-br from-red-900/40 to-black border-2 border-red-500/50 shadow-2xl shadow-red-500/20 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-white">
                Ambassador Pass
              </CardTitle>
              <CardDescription className="text-red-300">
                Your ticket to awesomeness
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Trophy className="w-4 h-4 text-red-400" />
                  <span className="text-gray-300">Exclusive Recognition</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Gift className="w-4 h-4 text-red-400" />
                  <span className="text-gray-300">Cool Merchandise</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Zap className="w-4 h-4 text-red-400" />
                  <span className="text-gray-300">Free Event Access</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-red-400" />
                  <span className="text-gray-300">Travel Opportunities</span>
                </div>
              </div>

              <div className="pt-4 border-t border-red-500/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">
                    UNLIMITED
                  </div>
                  <div className="text-xs text-gray-400">Fun & Learning</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Floating Elements Around Card */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-red-500 rounded-full animate-ping opacity-75" />
        <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-red-400 rounded-full animate-pulse" />
        <div
          className="absolute top-1/2 -right-8 w-4 h-4 bg-red-300 rounded-full animate-bounce"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Custom CSS for animations */}
      <style>
        {`
    @keyframes float {
      0%, 100% {
        transform: translateY(0px) rotate(3deg);
      }
      50% {
        transform: translateY(-20px) rotate(3deg);
      }
    }
  `}
      </style>
    </div>
  );
}
