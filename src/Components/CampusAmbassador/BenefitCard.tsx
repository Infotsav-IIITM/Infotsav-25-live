import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/CACard";

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

export default function BenefitCard({
  icon,
  title,
  description,
  color,
}: BenefitCardProps) {
  return (
    <Card className="bg-black/50 border-red-500/20 hover:border-red-500/40 transition-all duration-300 hover:transform hover:scale-105 group">
      <CardHeader>
        <div
          className={`w-12 h-12 rounded-[8px] bg-gradient-to-r ${color} p-2 mb-4 group-hover:animate-pulse`}
        >
          <div className="text-white">{icon}</div>
        </div>
        <CardTitle className="text-white text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400 text-base">{description}</p>
      </CardContent>
    </Card>
  );
}
