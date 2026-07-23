"use client";

import { useState } from "react";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { Sparkles, MessageSquare, ArrowRight, X, Send, Loader2 } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { motion, AnimatePresence } from "framer-motion";

// Sparkline Production Data
const SPARKLINE_DATA = [
  { value: 10 },
  { value: 12 },
  { value: 11 },
  { value: 15 },
  { value: 14 },
  { value: 18 },
  { value: 20 },
];

export default function AIInsights() {
  const { addToast } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [userQuery, setUserQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ sender: "user" | "ai"; text: string }>>([
    { sender: "ai", text: "Hello! I am your VaultCat AI Guardian. Ask me anything about your Real World Assets (RWA) portfolio security or yield opportunities!" }
  ]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim() || isTyping) return;

    const query = userQuery;
    setUserQuery("");
    setChatHistory((prev) => [...prev, { sender: "user", text: query }]);
    setIsTyping(true);

    // Simulate AI thinking and response
    await new Promise((resolve) => setTimeout(resolve, 1500));

    let reply = "I analyzed market yields. I recommend increasing allocation in Ondo OUSG (+4.32% APY) for maximum security.";
    
    const queryLower = query.toLowerCase();
    if (queryLower.includes("safe") || queryLower.includes("risk")) {
      reply = "Your safest holding is currently Ondo OUSG (U.S. Treasuries) which has a security score of 92/100 and represents 42.1% of your portfolio.";
    } else if (queryLower.includes("yield") || queryLower.includes("apy") || queryLower.includes("return")) {
      reply = "The highest yielding pool in your portfolio is Maple Finance Institutional Credit at 9.17% APY. However, it carries a private credit risk profile.";
    } else if (queryLower.includes("mascot") || queryLower.includes("cat")) {
      reply = "Meow! I am VaultCat. Curious by nature, but extremely secure by design. Rest assured, your tokenized vaults are safe with me!";
    }

    setChatHistory((prev) => [...prev, { sender: "ai", text: reply }]);
    setIsTyping(false);
    addToast("AI Guardian answered your question", "success");
  };

  return (
    <div className="rounded-2xl border border-purple-550/10 bg-[#0B0623]/40 p-5 flex flex-col justify-between shadow-xl relative overflow-hidden h-full min-h-[380px]">
      
      {/* Background glow */}
      <div className="absolute right-0 top-0 w-32 h-32 bg-purple-500/5 blur-[40px] pointer-events-none" />

      {/* Header section with cat avatar */}
      <div>
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500/30 shrink-0">
            <Image
              src="/logo/logo.png"
              alt="VaultCat AI Avatar"
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <div className="flex flex-col text-left">
            <h3 className="font-display font-bold text-base text-white">VaultCat AI Insights</h3>
            <span className="text-[10px] text-[#8E8A9F]">The AI has analyzed your portfolio and market conditions.</span>
          </div>
        </div>

        {/* Content Insight Box */}
        <div className="mt-5 p-4 rounded-xl border border-purple-500/10 bg-[#07041a]/60 flex items-center justify-between gap-4 h-[120px] relative overflow-hidden">
          
          {/* Left Text */}
          <div className="flex-1 flex flex-col gap-1 text-left min-w-0">
            <div className="flex items-center gap-1.5 text-[11px] text-white font-bold leading-normal">
              <span className="text-emerald-400 shrink-0">⚡</span>
              <span className="truncate">High opportunity detected in</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-white font-bold leading-normal">
              <span className="text-emerald-400 shrink-0">🛡️</span>
              <span className="truncate">U.S. Treasury tokenization.</span>
            </div>
            <span className="text-emerald-400 font-display text-xs font-black mt-2 leading-none">
              Projected APY: +0.45%
            </span>
          </div>

          {/* Right Sparkline */}
          <div className="w-20 h-14 shrink-0 flex items-end">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SPARKLINE_DATA}>
                <defs>
                  <linearGradient id="greenSpark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#10b981"
                  strokeWidth={1.5}
                  fillOpacity={1}
                  fill="url(#greenSpark)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>

      {/* Button: Ask AI Guardian */}
      <div className="mt-5 space-y-4">
        <button
          onClick={() => setModalOpen(true)}
          className="w-full flex items-center justify-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold py-3 rounded-xl transition-all"
        >
          Ask the AI Guardian
        </button>

        <div className="flex items-center justify-between pt-1">
          <button
            onClick={() => addToast("Opening insights catalog...", "info")}
            className="flex items-center gap-1 text-[10px] font-bold text-[#8E8A9F] hover:text-white transition-colors group"
          >
            View Full Insights
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
          <span className="text-[9px] text-[#8E8A9F]">Models updated 5m ago</span>
        </div>
      </div>

      {/* AI Chat Modal Dialog */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Modal Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-[#050212]/80 backdrop-blur-sm"
            />
            
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg rounded-2xl border border-purple-500/20 bg-[#0b0623] p-6 shadow-2xl z-10 flex flex-col justify-between max-h-[500px]"
            >
              {/* Close Button */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-[#8E8A9F] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-3 border-b border-purple-500/10 pb-4 mb-4">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-purple-500/20 shrink-0">
                  <Image
                    src="/logo/logo.png"
                    alt="VaultCat Avatar"
                    fill
                    className="object-cover"
                    sizes="32px"
                  />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-display font-bold text-white text-sm">Ask the AI Guardian</span>
                  <span className="text-[10px] text-[#8E8A9F]">Interactive security & yield consultant</span>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 py-1 min-h-[220px] max-h-[260px] text-xs">
                {chatHistory.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-xl p-3 text-left leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-purple-600 text-white font-medium rounded-tr-none"
                          : "bg-purple-950/40 border border-purple-500/15 text-purple-200 rounded-tl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-purple-950/40 border border-purple-500/15 text-purple-200 rounded-xl rounded-tl-none p-3 flex items-center gap-1.5">
                      <Loader2 className="w-3.5 h-3.5 text-purple-400 animate-spin" />
                      <span>AI Guardian is typing...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSend} className="mt-4 border-t border-purple-500/10 pt-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Ask a question (e.g. What is my safest asset?)"
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#050212] border border-purple-500/15 text-xs text-white placeholder-[#8E8A9F] focus:outline-none focus:border-purple-500/40"
                />
                <button
                  type="submit"
                  disabled={!userQuery.trim() || isTyping}
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-600 text-white hover:bg-purple-500 disabled:opacity-50 disabled:pointer-events-none transition-colors shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
