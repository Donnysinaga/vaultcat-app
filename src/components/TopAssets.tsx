"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Search, ArrowUpDown, ChevronLeft, ChevronRight, Sparkles, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Asset {
  id: string;
  name: string;
  symbol: string;
  category: string;
  value: number;
  change24h: number;
  apy: number;
  aiScore: number;
  icon: string;
}

const INITIAL_ASSETS: Asset[] = [
  {
    id: "ousg",
    name: "Ondo Short-Term US Government Bond",
    symbol: "OUSG",
    category: "U.S. Treasuries",
    value: 54321.00,
    change24h: 0.18,
    apy: 4.32,
    aiScore: 92,
    icon: "💵",
  },
  {
    id: "centrifuge",
    name: "Centrifuge Tinlake Senior Pool",
    symbol: "CENT-SP",
    category: "Real Estate",
    value: 28942.10,
    change24h: 1.25,
    apy: 7.24,
    aiScore: 88,
    icon: "🏢",
  },
  {
    id: "paxg",
    name: "Paxos Gold",
    symbol: "PAXG",
    category: "Commodities",
    value: 18765.42,
    change24h: -0.05,
    apy: 5.21,
    aiScore: 89,
    icon: "🪙",
  },
  {
    id: "maple",
    name: "Maple Finance Institutional Credit",
    symbol: "MPL-IC",
    category: "Private Credit",
    value: 15814.69,
    change24h: 0.42,
    apy: 9.17,
    aiScore: 87,
    icon: "🤝",
  },
  {
    id: "openeden",
    name: "OpenEden TBILL",
    symbol: "TBILL",
    category: "U.S. Treasuries",
    value: 9909.99,
    change24h: 0.17,
    apy: 4.18,
    aiScore: 85,
    icon: "🇺🇸",
  },
  {
    id: "tangible",
    name: "Tangible Real Estate USDR",
    symbol: "USDR-RE",
    category: "Real Estate",
    value: 8400.00,
    change24h: -0.15,
    apy: 6.80,
    aiScore: 81,
    icon: "🏠",
  },
  {
    id: "matrixdock",
    name: "Matrixdock Treasury Bill",
    symbol: "SBTB",
    category: "U.S. Treasuries",
    value: 7200.50,
    change24h: 0.22,
    apy: 4.85,
    aiScore: 90,
    icon: "📉",
  },
];

type SortKey = "value" | "change24h" | "apy" | "aiScore";
type SortOrder = "asc" | "desc";

export default function TopAssets() {
  const { searchQuery, setSearchQuery, addToast } = useApp();
  const [sortKey, setSortKey] = useState<SortKey>("value");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSort = (key: SortKey) => {
    const order = sortKey === key && sortOrder === "desc" ? "asc" : "desc";
    setSortKey(key);
    setSortOrder(order);
    addToast(`Sorting table by ${key} (${order})`, "info");
  };

  // Filter & Sort
  const filteredAssets = INITIAL_ASSETS.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.category.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => {
    const factor = sortOrder === "asc" ? 1 : -1;
    return (a[sortKey] - b[sortKey]) * factor;
  });

  // Pagination Slice
  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage) || 1;
  const currentAssets = filteredAssets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(val);
  };

  // Icon styles mapping
  const iconStyles: Record<string, string> = {
    ousg: "bg-neutral-800 text-white border border-neutral-700",
    centrifuge: "bg-[#eab308] text-white border border-[#ca8a04]",
    paxg: "bg-amber-100 text-amber-700 border border-amber-300",
    maple: "bg-blue-600 text-white border border-blue-500",
    openeden: "bg-[#0B0623] text-purple-400 border border-purple-500/30",
  };

  const assetIcons: Record<string, string> = {
    ousg: "◎",
    centrifuge: "⚡",
    paxg: "🪙",
    maple: "M",
    openeden: "◱",
  };

  return (
    <div className="rounded-2xl border border-purple-550/10 bg-[#0B0623]/40 p-5 flex flex-col justify-between shadow-xl relative overflow-hidden h-full min-h-[380px]">
      
      {/* Background glow */}
      <div className="absolute left-0 bottom-0 w-32 h-32 bg-purple-500/5 blur-[40px] pointer-events-none" />

      {/* Header section */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="text-left">
            <h3 className="font-display font-bold text-base text-white">Your Top Assets</h3>
            <p className="text-[#8E8A9F] text-[10px] mt-0.5">Based on value</p>
          </div>
          
          {/* Top Actions: Search + Button */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8E8A9F]" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-8 pr-3 py-1 w-32 text-[10px] rounded-lg bg-[#050212] border border-purple-500/15 focus:border-purple-500/40 text-white placeholder-[#8E8A9F] focus:outline-none transition-all"
              />
            </div>
            
            <button
              onClick={() => {
                setSearchQuery("");
                setCurrentPage(1);
                addToast("Showing all assets list", "info");
              }}
              className="text-[9px] font-bold px-3 py-1.5 rounded-lg border border-purple-500/15 bg-purple-950/20 text-[#8E8A9F] hover:text-white transition-all shrink-0"
            >
              View All Assets
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[550px]">
            <thead>
              <tr className="border-b border-purple-500/10 text-[9px] uppercase font-bold tracking-wider text-[#8E8A9F]">
                <th className="py-2.5 px-1 font-extrabold">ASSET</th>
                <th className="py-2.5 px-1 font-extrabold">CATEGORY</th>
                
                {/* Clickable sort headers */}
                <th className="py-2.5 px-1 cursor-pointer hover:text-white font-extrabold" onClick={() => handleSort("value")}>
                  <div className="flex items-center gap-1">
                    VALUE
                    <ArrowUpDown className="w-2.5 h-2.5" />
                  </div>
                </th>
                <th className="py-2.5 px-1 cursor-pointer hover:text-white font-extrabold" onClick={() => handleSort("change24h")}>
                  <div className="flex items-center gap-1">
                    24H CHANGE
                    <ArrowUpDown className="w-2.5 h-2.5" />
                  </div>
                </th>
                <th className="py-2.5 px-1 cursor-pointer hover:text-white font-extrabold" onClick={() => handleSort("apy")}>
                  <div className="flex items-center gap-1">
                    APY
                    <ArrowUpDown className="w-2.5 h-2.5" />
                  </div>
                </th>
                <th className="py-2.5 px-1 cursor-pointer hover:text-white font-extrabold text-center" onClick={() => handleSort("aiScore")}>
                  <div className="flex items-center gap-1 justify-center">
                    AI SCORE
                    <ArrowUpDown className="w-2.5 h-2.5" />
                  </div>
                </th>
              </tr>
            </thead>
            
            <tbody>
              <AnimatePresence mode="popLayout">
                {currentAssets.length > 0 ? (
                  currentAssets.map((asset) => (
                    <motion.tr
                      key={asset.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      onClick={() => addToast(`Selected ${asset.name} (${asset.symbol})`, "success")}
                      className="border-b border-purple-500/5 hover:bg-[#0c072b]/30 cursor-pointer transition-colors group"
                    >
                      {/* Name / Asset column */}
                      <td className="py-3 px-1">
                        <div className="flex items-center gap-2.5">
                          <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-black shrink-0 ${
                            iconStyles[asset.id] || "bg-neutral-800"
                          }`}>
                            {assetIcons[asset.id] || "🐾"}
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="text-[11px] font-bold text-white group-hover:text-purple-300 transition-colors leading-tight">
                              {asset.name}
                            </span>
                            <span className="text-[9px] text-[#8E8A9F] mt-0.5">{asset.symbol}</span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-1 text-[11px] font-bold text-[#8E8A9F]">
                        {asset.category}
                      </td>

                      {/* Value */}
                      <td className="py-3 px-1 text-[11px] font-bold text-white">
                        {formatCurrency(asset.value)}
                      </td>

                      {/* 24h change */}
                      <td className="py-3 px-1 text-[11px] font-bold">
                        <span className={asset.change24h >= 0 ? "text-emerald-400" : "text-rose-450"}>
                          {asset.change24h >= 0 ? "+" : ""}
                          {asset.change24h}%
                        </span>
                      </td>

                      {/* APY */}
                      <td className="py-3 px-1 text-[11px] font-bold text-white">
                        {asset.apy}%
                      </td>

                      {/* AI Score pill */}
                      <td className="py-3 px-1 text-center">
                        <div className="flex justify-center">
                          <span className="inline-flex items-center justify-center w-7 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold shadow-[0_0_10px_rgba(16,185,129,0.05)]">
                            {asset.aiScore}
                          </span>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-10 text-center">
                      <div className="flex flex-col items-center justify-center gap-1.5">
                        <AlertCircle className="w-7 h-7 text-[#8E8A9F]" />
                        <span className="text-[10px] text-[#8E8A9F]">No assets found matching your search.</span>
                      </div>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-purple-500/10 pt-3 mt-3">
          <span className="text-[9px] text-[#8E8A9F] font-semibold">
            Showing Page {currentPage} of {totalPages}
          </span>
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1 rounded-lg border border-purple-500/10 bg-[#050212] hover:bg-[#0c072b] disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft className="w-3 h-3 text-white" />
            </button>
            
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`w-5 h-5 rounded-lg text-[9px] font-bold flex items-center justify-center transition-all ${
                  currentPage === idx + 1
                    ? "bg-purple-600 text-white shadow-md shadow-purple-950/50"
                    : "text-[#8E8A9F] hover:text-white border border-purple-500/10 bg-[#050212]"
                }`}
              >
                {idx + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1 rounded-lg border border-purple-500/10 bg-[#050212] hover:bg-[#0c072b] disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronRight className="w-3 h-3 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
