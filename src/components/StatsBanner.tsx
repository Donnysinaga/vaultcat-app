"use client";

import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { Users, ShieldCheck, Activity, Award } from "lucide-react";

export default function StatsBanner() {
  const { addToast } = useApp();

  const stats = [
    { label: "Users", value: "25K+", icon: Users, color: "text-purple-400" },
    { label: "Assets Secured", value: "$2.1B+", icon: ShieldCheck, color: "text-pink-400" },
    { label: "Uptime", value: "98.7%", icon: Activity, color: "text-[#D946EF]" },
    { label: "AI Protection", value: "24/7", icon: Award, color: "text-blue-400" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 mb-10">
      <div className="rounded-3xl border border-purple-550/10 bg-[#0B0623]/40 p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        
        {/* Glow Element */}
        <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 blur-[60px] pointer-events-none" />

        {/* Left Stats Section */}
        <div className="flex-1 flex flex-col items-start gap-4">
          <span className="text-[10px] uppercase font-bold text-[#8E8A9F] tracking-widest block text-left">
            Trusted by the Community
          </span>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-1">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  onClick={() => addToast(`Stat details: ${stat.value} ${stat.label}`, "info")}
                  className="flex flex-row items-center gap-3 cursor-pointer hover:opacity-85 transition-opacity text-left"
                >
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-purple-950/40 border border-purple-500/10 shrink-0 ${stat.color}`}>
                    <Icon className="w-4 h-4" strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col leading-none">
                    <span className="font-display text-lg font-black text-white tracking-tight">
                      {stat.value}
                    </span>
                    <span className="text-[#8E8A9F] text-[9px] font-bold uppercase tracking-wider mt-1">
                      {stat.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Middle Glowing Paw circle */}
        <div className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full border border-purple-500/35 bg-purple-950/20 shadow-[0_0_15px_rgba(168,85,247,0.25)] shrink-0">
          <span className="text-sm">🐾</span>
        </div>

        {/* Right Sleeping Cat Mascot Section */}
        <div className="relative w-56 h-28 shrink-0 flex items-center justify-center">
          <div className="relative w-full h-full rounded-2xl overflow-hidden border border-purple-500/15 bg-purple-950/5">
            <Image
              src="/api/images/sleeping"
              alt="Sleeping VaultCat Mascot"
              fill
              className="object-cover"
              sizes="224px"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
