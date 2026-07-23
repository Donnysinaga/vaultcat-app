"use client";

import { useApp } from "@/context/AppContext";
import { ArrowRight } from "lucide-react";

const MEMBERS = [
  { name: "Alpha", bg: "bg-purple-500", text: "🐱" },
  { name: "Beta", bg: "bg-indigo-500", text: "🦊" },
  { name: "Gamma", bg: "bg-pink-500", text: "🦁" },
  { name: "Delta", bg: "bg-blue-500", text: "🐼" },
  { name: "Epsilon", bg: "bg-emerald-500", text: "🐸" },
];

export default function CommunityHub() {
  const { addToast } = useApp();

  return (
    <div className="rounded-2xl border border-purple-550/10 bg-[#0B0623]/40 p-5 flex flex-col justify-between shadow-xl relative overflow-hidden h-full min-h-[380px]">
      
      {/* Background glow */}
      <div className="absolute left-0 bottom-0 w-24 h-24 bg-purple-500/5 blur-[35px] pointer-events-none" />

      <div>
        <h3 className="font-display font-bold text-base text-white text-left">Community Hub</h3>
        <p className="text-[#8E8A9F] text-[10px] mt-0.5 text-left">Join the community</p>

        {/* Stacked avatars container */}
        <div className="flex items-center gap-3 mt-4">
          <div className="flex -space-x-2 overflow-hidden">
            {MEMBERS.map((member) => (
              <div
                key={member.name}
                className={`inline-flex items-center justify-center h-6 w-6 rounded-full border-2 border-[#0b0623] ${member.bg} text-xs shrink-0`}
              >
                {member.text}
              </div>
            ))}
          </div>
          <span className="text-white text-[10px] font-black">+12.5K</span>
        </div>

        {/* Community details */}
        <div className="mt-5 p-4 rounded-xl border border-purple-500/10 bg-[#07041a]/60 text-left">
          <span className="text-white font-bold text-xs">VaultCat Community</span>
          <p className="text-[#8E8A9F] text-[9px] mt-1 leading-relaxed">
            12.5K members • 1.2K online
          </p>
          
          {/* Button: Join Discord */}
          <button
            onClick={() => addToast("Joining VaultCat Discord Server...", "success")}
            className="mt-3 flex items-center justify-center gap-1.5 bg-[#5865F2] hover:bg-[#4752C4] text-white text-[10px] font-bold px-4 py-2 rounded-lg shadow-[0_0_10px_rgba(88,101,242,0.15)] transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            {/* Discord Icon SVG */}
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 127.14 96.36" xmlns="http://www.w3.org/2000/svg">
              <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5c.88-.65,1.72-1.34,2.51-2a75.58,75.58,0,0,0,73,0c.79.71,1.63,1.4,2.51,2a68.43,68.43,0,0,1-10.5,5A77.7,77.7,0,0,0,102,85.51a105.73,105.73,0,0,0,31.56-18.83C129.86,54.65,124.34,31.58,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z" />
            </svg>
            Join Discord
          </button>
        </div>
      </div>

      {/* Bottom Link */}
      <div className="flex items-center justify-between border-t border-purple-500/10 pt-4 mt-5">
        <button
          onClick={() => addToast("Redirecting to Community Hub page...", "info")}
          className="flex items-center gap-1 text-[10px] font-bold text-[#8E8A9F] hover:text-white transition-colors"
        >
          View Community
        </button>
        <button
          onClick={() => addToast("Redirecting to Community Hub page...", "info")}
          className="text-purple-400 hover:text-purple-300 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
