"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { ShieldCheck, Eye, ShieldAlert, Sparkles, Settings, ArrowRight, ShieldCheck as ShieldIcon, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AIGuardian() {
  const { addToast } = useApp();
  const [isScanning, setIsScanning] = useState(false);

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: "RWA yield opportunity detected",
      time: "2m ago",
      type: "opportunity",
      details: "Ondo OUSG yield rose by 0.12% due to short-term treasury rate adjustments.",
      icon: Sparkles,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
    {
      id: 2,
      title: "Large transaction detected",
      time: "15m ago",
      type: "warning",
      details: "A transfer of $1.2M USDC was completed in Maple Finance Pool by a whale address.",
      icon: ShieldAlert,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      id: 3,
      title: "Market sentiment is very high",
      time: "1h ago",
      type: "info",
      details: "RWA tokenization sentiment index reached 84/100, showing strong demand.",
      icon: Eye,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      id: 4,
      title: "New RWA asset added",
      time: "3h ago",
      type: "new",
      details: "OpenEden TBILL has been listed with support for multi-chain deposits.",
      icon: ShieldCheck,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
  ]);

  const handleAlertClick = (alert: typeof alerts[0]) => {
    addToast(`Alert Info: ${alert.details}`, "info");
  };

  const startScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    addToast("AI Guardian started scanning smart contracts...", "info");
    setTimeout(() => {
      setIsScanning(false);
      addToast("Security scan complete. All 24 assets are fully secure.", "success");
    }, 2000);
  };

  return (
    <div className="rounded-2xl border border-purple-550/10 bg-[#0B0623]/40 p-5 flex flex-col justify-between shadow-xl relative overflow-hidden h-full min-h-[380px]">
      
      {/* Glow Element */}
      <div className="absolute right-0 top-0 w-32 h-32 bg-purple-500/5 blur-[40px] pointer-events-none" />

      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-base text-white">AI Guardian</h3>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
            Active
          </span>
        </div>

        {/* Security Summary Panel */}
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex flex-col text-left">
            <span className="text-emerald-400 font-bold text-sm">All systems secure</span>
            <span className="text-[#8E8A9F] text-[10px] mt-1">Monitoring 24 assets across 5 chains</span>
          </div>
          
          {/* Circular Shield Dial */}
          <button
            onClick={startScan}
            disabled={isScanning}
            className="relative flex items-center justify-center w-16 h-16 rounded-full shrink-0 border border-purple-500/20 bg-purple-950/20 shadow-[0_0_20px_rgba(168,85,247,0.15)] group"
          >
            {isScanning ? (
              <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
            ) : (
              <div className="relative flex items-center justify-center w-full h-full">
                {/* Concentric rotating glowing ring */}
                <div className="absolute inset-1 rounded-full border border-dashed border-purple-400/40 group-hover:rotate-45 transition-transform duration-500" />
                <div className="absolute inset-2.5 rounded-full border border-purple-400/20" />
                <ShieldIcon className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
                <span className="absolute text-[8px] font-bold top-[22px] left-[23px] text-purple-400">🐾</span>
              </div>
            )}
          </button>
        </div>

        {/* Alerts List */}
        <div className="mt-6 space-y-3.5">
          <span className="text-[10px] uppercase font-bold text-[#8E8A9F] tracking-widest block text-left">Recent Alerts</span>
          
          <div className="space-y-3">
            {alerts.map((alert) => {
              const Icon = alert.icon;
              return (
                <div
                  key={alert.id}
                  onClick={() => handleAlertClick(alert)}
                  className="flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center justify-center w-7 h-7 rounded-full border ${alert.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-white text-xs font-medium text-left group-hover:text-purple-300 transition-colors leading-snug">
                      {alert.title}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#8E8A9F] whitespace-nowrap ml-3">
                    {alert.time}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom links */}
      <div className="flex items-center justify-between border-t border-purple-500/10 pt-4 mt-5">
        <button
          onClick={() => addToast("Alert settings loaded", "success")}
          className="flex items-center gap-1 text-[10px] font-semibold text-[#8E8A9F] hover:text-white transition-colors"
        >
          Customize Alerts
          <Settings className="w-3 h-3 ml-0.5" />
        </button>
        
        <button
          onClick={() => addToast("Showing all system logs...", "info")}
          className="text-purple-400 hover:text-purple-300 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
