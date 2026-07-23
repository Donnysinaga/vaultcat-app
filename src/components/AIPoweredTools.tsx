"use client";

import { useApp } from "@/context/AppContext";
import { Search, Percent, ShieldAlert, Cpu, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function AIPoweredTools() {
  const { addToast } = useApp();

  const tools = [
    {
      name: "RWA Scanner",
      description: "Find new assets",
      icon: Search,
      color: "from-purple-650/10 to-purple-500/5 hover:to-purple-500/15 text-purple-400 border-purple-500/20",
    },
    {
      name: "Yield Optimizer",
      description: "Maximize returns",
      icon: Percent,
      color: "from-pink-650/10 to-pink-500/5 hover:to-pink-500/15 text-pink-400 border-pink-500/20",
    },
    {
      name: "Risk Analyzer",
      description: "Analyze risk",
      icon: ShieldAlert,
      color: "from-indigo-650/10 to-indigo-500/5 hover:to-indigo-500/15 text-indigo-400 border-indigo-500/20",
    },
    {
      name: "Portfolio Builder",
      description: "Build smart",
      icon: Cpu,
      color: "from-blue-650/10 to-blue-500/5 hover:to-blue-500/15 text-blue-400 border-blue-500/20",
    },
  ];

  return (
    <div className="rounded-2xl border border-purple-550/10 bg-[#0B0623]/40 p-5 flex flex-col justify-between shadow-xl relative overflow-hidden h-full min-h-[380px]">
      
      {/* Background glow */}
      <div className="absolute right-0 top-0 w-24 h-24 bg-pink-500/5 blur-[35px] pointer-events-none" />

      <div>
        <h3 className="font-display font-bold text-base text-white text-left">AI-Powered Tools</h3>
        
        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.name}
                onClick={() => addToast(`Opening tool: ${tool.name}`, "success")}
                className={`flex flex-row items-center gap-3 p-3 rounded-xl border bg-gradient-to-br cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 ${tool.color}`}
              >
                <div className="p-2 rounded-lg bg-black/40 border border-white/5 shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left min-w-0">
                  <span className="text-white text-xs font-bold truncate">{tool.name}</span>
                  <span className="text-[#8E8A9F] text-[9px] mt-0.5 truncate">{tool.description}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Link */}
      <div className="flex items-center justify-between border-t border-purple-500/10 pt-4 mt-5">
        <button
          onClick={() => addToast("Opening all security and analytics tools...", "info")}
          className="flex items-center gap-1 text-[10px] font-bold text-[#8E8A9F] hover:text-white transition-colors group"
        >
          Explore All Tools
        </button>
        <button
          onClick={() => addToast("Opening all security and analytics tools...", "info")}
          className="text-purple-400 hover:text-purple-300 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
