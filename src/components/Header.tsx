"use client";

import { useState } from "react";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { Menu, X, LogIn, Wallet, ChevronDown, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const { walletConnected, walletAddress, isConnecting, connectWallet, disconnectWallet, addToast } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [walletDropdownOpen, setWalletDropdownOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "#dashboard", active: true },
    { name: "Assets", href: "#assets" },
    { name: "Alerts", href: "#alerts" },
    { name: "AI Guardian", href: "#ai-guardian" },
    { name: "Community", href: "#community" },
    { name: "Learn", href: "#learn" },
  ];

  const handleNavScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else if (href === "#dashboard") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-purple-550/10 bg-[#050212]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setMobileMenuOpen(false);
          }}
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-purple-500/30">
            <Image
              src="/logo/logo.png"
              alt="VaultCat Logo"
              fill
              className="object-cover"
              sizes="32px"
              priority
            />
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-white group-hover:text-purple-400 transition-colors">
            VaultCat
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavScroll(e, item.href)}
              className={`text-xs font-semibold transition-colors hover:text-white relative py-2 ${
                item.active ? "text-white text-glow-purple" : "text-[#8E8A9F]"
              }`}
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Buttons / Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => addToast("Login portal is under maintenance", "info")}
            className="flex items-center gap-2 px-4 py-1.5 text-xs font-semibold text-[#8E8A9F] hover:text-white border border-white/10 hover:border-white/20 rounded-xl transition-all"
          >
            <LogIn className="w-3.5 h-3.5" />
            Log In
          </button>

          {!walletConnected ? (
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className="relative overflow-hidden group flex items-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold px-5 py-2 rounded-xl transition-all duration-300 transform active:scale-95 disabled:opacity-75 disabled:pointer-events-none"
            >
              {isConnecting ? (
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Wallet className="w-3.5 h-3.5" />
              )}
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setWalletDropdownOpen(!walletDropdownOpen)}
                className="flex items-center gap-2 bg-purple-950/40 border border-purple-500/30 text-purple-200 text-xs font-bold px-4 py-2 rounded-xl hover:bg-purple-950/60 transition-colors"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {walletAddress}
                <ChevronDown className="w-3.5 h-3.5 text-[#8E8A9F]" />
              </button>
              
              <AnimatePresence>
                {walletDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setWalletDropdownOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 mt-2 w-40 rounded-xl bg-[#0b0623] border border-purple-500/20 p-1.5 shadow-xl z-20"
                    >
                      <button
                        onClick={() => {
                          disconnectWallet();
                          setWalletDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-rose-400 hover:bg-rose-950/20 hover:text-rose-300 rounded-lg transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Disconnect
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          {!walletConnected ? (
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className="p-2 rounded-xl bg-[#7C3AED] text-white shadow-lg disabled:opacity-50"
            >
              {isConnecting ? (
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Wallet className="w-3.5 h-3.5" />
              )}
            </button>
          ) : (
            <div className="text-[10px] bg-purple-950/40 border border-purple-500/30 px-2.5 py-1 rounded-lg text-purple-300 font-medium">
              {walletAddress}
            </div>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#8E8A9F] hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-purple-500/10 bg-[#050212] overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1.5 flex flex-col">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavScroll(e, item.href)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    item.active
                      ? "bg-purple-950/40 text-purple-300 border-l-2 border-purple-500"
                      : "text-[#8E8A9F] hover:bg-[#0b0623] hover:text-white"
                  }`}
                >
                  {item.name}
                </a>
              ))}
              
              <div className="border-t border-purple-500/10 pt-4 mt-2 space-y-2">
                <button
                  onClick={() => {
                    addToast("Login portal is under maintenance", "info");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-[#8E8A9F] hover:text-white border border-white/15 rounded-xl transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Log In
                </button>
                {walletConnected && (
                  <button
                    onClick={() => {
                      disconnectWallet();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-950/10 rounded-xl transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Disconnect Wallet
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
