"use client";

import { useApp } from "@/context/AppContext";
import { Shield, BarChart3, BellRing, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function FeatureBar() {
  const { addToast } = useApp();

  const features = [
    {
      id: "ai-guardian",
      title: "AI Guardian",
      description: "24/7 asset protection",
      icon: Shield,
      toast: "AI Guardian is scanning assets for security risks.",
    },
    {
      id: "rwa-tracking",
      title: "RWA Tracking",
      description: "All your assets in one place",
      icon: BarChart3,
      toast: "Opening real-world asset tracker panel.",
    },
    {
      id: "smart-alerts",
      title: "Smart Alerts",
      description: "AI-powered notifications",
      icon: BellRing,
      toast: "Alert notification settings loaded.",
    },
    {
      id: "community-driven",
      title: "Community Driven",
      description: "Built for the community",
      icon: Users,
      toast: "Connecting with community hub...",
    },
  ];

  const handleFeatureClick = (title: string, toastMsg: string) => {
    addToast(toastMsg, "success");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 mb-10">
      <div className="rounded-2xl border border-purple-500/10 bg-[#0B0623]/50 shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-purple-500/10">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                onClick={() => handleFeatureClick(feature.title, feature.toast)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="flex items-center gap-3.5 p-4 cursor-pointer hover:bg-[#0c072b]/40 transition-all duration-300 group"
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-purple-950/40 border border-purple-500/20 text-purple-400 group-hover:text-purple-300 group-hover:bg-purple-950/70 group-hover:border-purple-500/40 transition-colors shadow-[0_0_15px_rgba(168,85,247,0.05)] shrink-0">
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-display font-bold text-white text-xs leading-none">
                    {feature.title}
                  </span>
                  <span className="text-[#8E8A9F] text-[10px] font-normal mt-1 leading-none">
                    {feature.description}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
