import { Trophy, Gift, Users, Zap, MapPin, Heart } from "lucide-react";
import BenefitCard from "./BenefitCard";

const benefits = [
  {
    icon: <Trophy className="w-8 h-8" />,
    title: "Become Campus Famous",
    description:
      "Be the person everyone knows and respects. Lead events, make connections, and build your personal brand!",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: <Gift className="w-8 h-8" />,
    title: "Epic Rewards & Swag",
    description:
      "Exclusive merchandise, certificates, and goodies that money can't buy. Your friends will be jealous!",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Network Like a Pro",
    description:
      "Connect with industry leaders, fellow ambassadors, and build relationships that last a lifetime.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Skill Up Fast",
    description:
      "Leadership, marketing, event management - develop skills that look amazing on your resume!",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: <MapPin className="w-8 h-8" />,
    title: "Travel & Explore",
    description:
      "Sponsored trips to events, meetups in different cities, and adventures you'll never forget!",
    color: "from-red-500 to-rose-500",
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Make Real Impact",
    description:
      "Shape your campus culture, inspire others, and be part of something bigger than yourself!",
    color: "from-indigo-500 to-purple-500",
  },
];

export default function BenefitCardGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {benefits.map((benefit, index) => (
        <BenefitCard
          key={index}
          icon={benefit.icon}
          title={benefit.title}
          description={benefit.description}
          color={benefit.color}
        />
      ))}
    </div>
  );
}
