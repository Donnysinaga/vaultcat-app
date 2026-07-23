"use client";

import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { siteConfig } from "@/config/site";
import { ShieldCheck, Cat } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const { connectWallet, walletConnected, addToast } = useApp();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Background Radial Glow */}
      <div className="absolute right-0 top-0 -z-10 w-[600px] h-[600px] rounded-full bg-purple-900/10 blur-[130px] pointer-events-none" />
      <div className="absolute left-1/4 bottom-0 -z-10 w-[400px] h-[400px] rounded-full bg-pink-900/5 blur-[110px] pointer-events-none" />

      <div className="grid md:grid-cols-12 gap-8 items-center">
        
        {/* Left Column Content */}
        <div className="md:col-span-6 flex flex-col items-start text-left space-y-5">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-purple-550/20 bg-purple-950/40 text-purple-300 text-[10px] font-bold uppercase tracking-wider"
          >
            <Cat className="w-3.5 h-3.5" />
            Meme Utility × RWA Vault
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-1 font-display text-4xl sm:text-5xl md:text-[52px] font-black tracking-tight leading-[1.1]"
          >
            <h1 className="leading-tight text-white">
              <span className="bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] bg-clip-text text-transparent">
                Curious
              </span>{" "}
              by Nature.
            </h1>
            <h2 className="text-white leading-tight">
              Secure by Design.
            </h2>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm md:text-base text-[#8E8A9F] max-w-lg leading-relaxed font-normal"
          >
            VaultCat protects your tokenized assets, tracks your portfolio, and delivers AI-powered alerts.
          </motion.p>

          {/* CA Section */}
          <div 
            onClick={() => {
              navigator.clipboard.writeText(siteConfig.contractAddress);
            }}
            className="cursor-pointer font-mono text-xs text-[#8E8A9F] hover:text-white transition-colors py-1 select-all"
          >
            CA: {siteConfig.contractAddress}
          </div>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-3.5 w-full sm:w-auto"
          >
            {!walletConnected ? (
              <button
                onClick={connectWallet}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] hover:opacity-90 text-white text-xs font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform active:scale-95 shadow-[0_4px_20px_rgba(236,72,153,0.25)]"
              >
                Connect Wallet
              </button>
            ) : (
              <button
                onClick={() => addToast("Your wallet is ready!", "success")}
                className="flex items-center justify-center gap-2 bg-purple-950/40 border border-purple-500/30 text-purple-200 text-xs font-semibold px-6 py-3 rounded-xl hover:bg-purple-950/60 transition-all"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Wallet Connected
              </button>
            )}

            <button
              onClick={() => {
                const target = document.querySelector("#assets");
                if (target) target.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center justify-center gap-2 bg-transparent hover:bg-white/5 text-white text-xs font-semibold px-6 py-3 rounded-xl border border-[#8B5CF6]/40 hover:border-[#8B5CF6]/70 transition-all duration-300 active:scale-0.98"
            >
              Explore Vaults
            </button>
          </motion.div>

        </div>

        {/* Right Column Mascot Illustration */}
        <div className="md:col-span-6 flex justify-center items-center relative h-[300px] md:h-[420px]">
          
          {/* Animated Mascot container */}
          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-full h-full"
          >
            <Image
              src="/images/hero.jpg"
              alt="VaultCat Guardian Mascot"
              fill
              className="object-contain hover:scale-105 transition-transform duration-700"
              sizes="(max-w-768px) 100vw, 500px"
              priority
            />
          </motion.div>
          
        </div>

      </div>
    </section>
  );
}
