"use client";

import { useApp } from "@/context/AppContext";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { TrendingUp, ArrowRight } from "lucide-react";

// Sparkline Production Data
const SPARKLINE_DATA = [
  { val: 22.4 },
  { val: 22.8 },
  { val: 23.1 },
  { val: 22.9 },
  { val: 23.8 },
  { val: 24.1 },
  { val: 24.7 },
];

const TOP_GAINERS = [
  { name: "Ondo Finance", symbol: "ONDO", price: "$1.08", change: "+12.45%", logo: "💵" },
  { name: "Centrifuge", symbol: "CFG", price: "$0.43", change: "+9.21%", logo: "🏢" },
  { name: "Maple", symbol: "MPL", price: "$12.78", change: "+7.84%", logo: "🤝" },
];

export default function MarketOverview() {
  const { addToast } = useApp();

  return (
    <div className="rounded-2xl border border-purple-550/10 bg-[#0B0623]/40 p-5 flex flex-col justify-between shadow-xl relative overflow-hidden h-full min-h-[380px]">
      
      {/* Background glow */}
      <div className="absolute left-0 bottom-0 w-24 h-24 bg-purple-500/5 blur-[35px] pointer-events-none" />

      <div>
        {/* Header */}
        <h3 className="font-display font-bold text-base text-white text-left">Market Overview</h3>
        <p className="text-[#8E8A9F] text-[10px] text-left mt-0.5">RWA Market Cap</p>
        
        {/* Stats Row */}
        <div className="mt-2.5 flex items-baseline gap-2 text-left">
          <span className="text-white font-display text-xl font-black tracking-tight">$24.7B</span>
          <span className="text-emerald-400 text-[10px] font-extrabold flex items-center gap-0.5">
            +3.21% (24h)
          </span>
        </div>

        {/* Sparkline chart */}
        <div className="h-14 w-full my-3">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={SPARKLINE_DATA} margin={{ left: 0, top: 0, right: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="purpleSpark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="val"
                stroke="#a855f7"
                strokeWidth={1.5}
                fillOpacity={1}
                fill="url(#purpleSpark)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top Gainers List */}
        <div className="space-y-3 mt-4">
          <span className="text-[10px] uppercase font-bold text-[#8E8A9F] tracking-widest block text-left">Top Gainers</span>
          
          <div className="space-y-2.5">
            {TOP_GAINERS.map((gainer) => (
              <div
                key={gainer.name}
                onClick={() => addToast(`Opening details for ${gainer.name} (${gainer.symbol})`, "info")}
                className="flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xs shrink-0">{gainer.logo}</span>
                  <span className="text-white text-xs font-bold text-left group-hover:text-purple-300 transition-colors">
                    {gainer.name}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-right">
                  <span className="text-white text-xs font-semibold">{gainer.price}</span>
                  <span className="text-emerald-400 text-xs font-bold w-12 text-right">{gainer.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Link */}
      <div className="flex items-center justify-between border-t border-purple-500/10 pt-4 mt-5">
        <button
          onClick={() => addToast("Redirecting to Markets section...", "info")}
          className="flex items-center gap-1 text-[10px] font-bold text-[#8E8A9F] hover:text-white transition-colors group"
        >
          View All Markets
        </button>
        <button
          onClick={() => addToast("Redirecting to Markets section...", "info")}
          className="text-purple-400 hover:text-purple-300 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
