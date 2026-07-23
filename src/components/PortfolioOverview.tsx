"use client";

import { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

// Production Chart Data for different filters
const CHART_DATA = {
  "24H": [
    { time: "00:00", value: 119500 },
    { time: "04:00", value: 121000 },
    { time: "08:00", value: 120500 },
    { time: "12:00", value: 124200 },
    { time: "16:00", value: 123800 },
    { time: "20:00", value: 126900 },
    { time: "24:00", value: 127843.21 },
  ],
  "7D": [
    { time: "Day 1", value: 124000 },
    { time: "Day 2", value: 123100 },
    { time: "Day 3", value: 126400 },
    { time: "Day 4", value: 125900 },
    { time: "Day 5", value: 128200 },
    { time: "Day 6", value: 127100 },
    { time: "Day 7", value: 129510.40 },
  ],
  "30D": [
    { time: "Week 1", value: 112000 },
    { time: "Week 2", value: 115600 },
    { time: "Week 3", value: 119000 },
    { time: "Week 4", value: 121980.00 },
  ],
  "All": [
    { time: "Jan", value: 78000 },
    { time: "Feb", value: 83400 },
    { time: "Mar", value: 92100 },
    { time: "Apr", value: 91000 },
    { time: "May", value: 98500 },
    { time: "Jun", value: 104240.50 },
  ],
};

const STATS_DATA = {
  "24H": { val: "$127,843.21", change: "+6.42% (24h)", positive: true },
  "7D": { val: "$129,510.40", change: "+4.18% (7d)", positive: true },
  "30D": { val: "$121,980.00", change: "+8.25% (30d)", positive: true },
  "All": { val: "$104,240.50", change: "+22.64% (All)", positive: true },
};

// Allocation Donut Data
const ALLOCATION_DATA = [
  { name: "U.S. Treasuries", value: 42.1, color: "#8b5cf6" },
  { name: "Real Estate", value: 28.3, color: "#ec4899" },
  { name: "Commodities", value: 15.7, color: "#3b82f6" },
  { name: "Private Credit", value: 9.8, color: "#06b6d4" },
  { name: "Other", value: 4.1, color: "#eab308" },
];

export default function PortfolioOverview() {
  const { addToast } = useApp();
  const [activeFilter, setActiveFilter] = useState<"24H" | "7D" | "30D" | "All">("24H");
  const [chartLoading, setChartLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFilterChange = (filter: "24H" | "7D" | "30D" | "All") => {
    if (filter === activeFilter) return;
    setActiveFilter(filter);
    addToast(`Updated chart interval to ${filter}`, "info");
  };

  useEffect(() => {
    if (activeFilter) {
      setChartLoading(true);
      const timer = setTimeout(() => setChartLoading(false), 400);
      return () => clearTimeout(timer);
    }
  }, [activeFilter]);

  const currentStats = STATS_DATA[activeFilter];

  if (!mounted) {
    return (
      <div className="rounded-2xl border border-purple-500/10 bg-[#0B0623]/40 p-6 min-h-[380px] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-purple-550/10 bg-[#0B0623]/40 p-5 shadow-xl relative overflow-hidden">
      
      {/* Glow Backdrop */}
      <div className="absolute right-0 top-0 w-80 h-80 bg-purple-500/5 blur-[80px] pointer-events-none" />

      {/* Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 z-10 relative mb-5 px-1">
        <div>
          <h3 className="font-display font-bold text-base text-white text-left">Portfolio Overview</h3>
          <p className="text-[#8E8A9F] text-[10px] text-left mt-0.5">All your tokenized assets at a glance.</p>
        </div>

        {/* Filters Tabs */}
        <div className="flex bg-[#050212] p-0.5 rounded-lg border border-purple-500/10">
          {(["24H", "7D", "30D", "All"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`text-[9px] font-bold px-2 py-1 rounded-md transition-all ${
                activeFilter === filter
                  ? "bg-purple-600 text-white shadow-md shadow-purple-950/50"
                  : "text-[#8E8A9F] hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Inner Content Grid - splits into two sub-cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 relative z-10 items-stretch">
        
        {/* Left Sub-card: Area Chart */}
        <div className="lg:col-span-7 rounded-xl border border-purple-500/10 bg-[#07041a]/60 p-5 flex flex-col justify-between">
          
          {/* Stats Row */}
          <div className="flex items-baseline gap-2.5 text-left mb-4">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-[#8E8A9F] tracking-wider">Total Portfolio Value</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display text-2xl font-black text-white leading-none">
                  {currentStats.val}
                </span>
                <span className="text-emerald-400 text-[10px] font-extrabold flex items-center leading-none">
                  {currentStats.change}
                </span>
              </div>
            </div>
          </div>

          {/* Line Chart Area */}
          <div className="h-44 w-full relative min-h-[170px]">
            <AnimatePresence mode="wait">
              {chartLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-[#07041a]/40 backdrop-blur-[1px] z-20 rounded-xl"
                >
                  <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
                </motion.div>
              )}
            </AnimatePresence>

            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA[activeFilter]} margin={{ left: -25, top: 5, right: 5, bottom: 0 }}>
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(168, 85, 247, 0.04)" vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="time"
                  stroke="#8E8A9F"
                  fontSize={8}
                  tickLine={false}
                  axisLine={false}
                  dy={6}
                />
                <YAxis
                  stroke="#8E8A9F"
                  fontSize={8}
                  tickLine={false}
                  axisLine={false}
                  dx={-5}
                  tickFormatter={(v) => `$${v / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0b0623",
                    borderColor: "rgba(168, 85, 247, 0.2)",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "10px",
                  }}
                  formatter={(value: any) => [`$${value.toLocaleString()}`, "Value"]}
                  labelStyle={{ color: "#8E8A9F", fontWeight: "bold" }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#ec4899"
                  strokeWidth={1.5}
                  fillOpacity={1}
                  fill="url(#areaGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* Right Sub-card: Asset Allocation Donut */}
        <div className="lg:col-span-5 rounded-xl border border-purple-500/10 bg-[#07041a]/60 p-5 flex flex-col justify-between">
          
          <div className="w-full text-left mb-2">
            <span className="text-[10px] uppercase font-bold text-[#8E8A9F] tracking-widest block">Asset Allocation</span>
          </div>

          <div className="flex flex-row items-center justify-between gap-4 h-full">
            
            {/* Donut Chart (Left Side) */}
            <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ALLOCATION_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={32}
                    outerRadius={45}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {ALLOCATION_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#07041a" strokeWidth={1.5} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              
              {/* Donut Center Label */}
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-[7px] uppercase font-bold text-[#8E8A9F] tracking-wider leading-none">RWA</span>
                <span className="text-[11px] font-black text-white mt-0.5 leading-none">5 Types</span>
              </div>
            </div>

            {/* Legend list (Right Side) */}
            <div className="flex-1 space-y-1.5 min-w-0">
              {ALLOCATION_DATA.map((item) => (
                <div
                  key={item.name}
                  onClick={() => addToast(`Allocation: ${item.name} is ${item.value}%`, "info")}
                  className="flex items-center justify-between text-[9px] py-0.5 px-1 rounded hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-1.5 truncate mr-2">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-white font-medium truncate">{item.name}</span>
                  </div>
                  <span className="text-white font-bold shrink-0">{item.value}%</span>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
