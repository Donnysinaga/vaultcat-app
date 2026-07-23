"use client";

import { AppProvider } from "@/context/AppContext";
import ToastsContainer from "@/components/ToastsContainer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeatureBar from "@/components/FeatureBar";
import PortfolioOverview from "@/components/PortfolioOverview";
import AIGuardian from "@/components/AIGuardian";
import TopAssets from "@/components/TopAssets";
import AIInsights from "@/components/AIInsights";
import MarketOverview from "@/components/MarketOverview";
import AIPoweredTools from "@/components/AIPoweredTools";
import CommunityHub from "@/components/CommunityHub";
import StatsBanner from "@/components/StatsBanner";
import { siteConfig } from "@/config/site";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#050212] bg-gradient-hero text-white flex flex-col justify-between" id="dashboard">
        
        {/* Top Section */}
        <div>
          <Header />
          <Hero />
          <FeatureBar />
          
          {/* Main Dashboard Workspace Grid */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pb-12">
            
            {/* Row 1: Portfolio Overview (2/3) + AI Guardian (1/3) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              <div className="lg:col-span-2">
                <PortfolioOverview />
              </div>
              <div className="lg:col-span-1">
                <AIGuardian />
              </div>
            </div>

            {/* Row 2: Top Assets (2/3) + AI Insights (1/3) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch" id="assets">
              <div className="lg:col-span-2">
                <TopAssets />
              </div>
              <div className="lg:col-span-1" id="ai-guardian">
                <AIInsights />
              </div>
            </div>

            {/* Row 3: Market Overview (1/3) + AI Tools (1/3) + Community Hub (1/3) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch" id="alerts">
              <div className="md:col-span-1">
                <MarketOverview />
              </div>
              <div className="md:col-span-1">
                <AIPoweredTools />
              </div>
              <div className="md:col-span-2 lg:col-span-1" id="community">
                <CommunityHub />
              </div>
            </div>

            {/* Row 4: Footer Stats Banner (Full Width) */}
            <div id="learn">
              <StatsBanner />
            </div>

          </main>
        </div>

        {/* Real Footer */}
        <footer className="border-t border-purple-500/10 py-6 bg-[#03010d] text-center text-xs text-[#8E8A9F]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-left">© {new Date().getFullYear()} {siteConfig.name}. Institutional grade security for tokenized assets.</span>
            <span className="font-display font-semibold text-purple-400">Curious by Nature. Secure by Design.</span>
            <div className="flex items-center gap-4">
              <a href={siteConfig.xUrl} target="_blank" rel="noopener noreferrer" className="text-[#8E8A9F] hover:text-white transition-colors">
                <span className="sr-only">X (Twitter)</span>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer" className="text-[#8E8A9F] hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                </svg>
              </a>
            </div>
          </div>
        </footer>

        {/* Global Toast Notifications Popup */}
        <ToastsContainer />

      </div>
    </AppProvider>
  );
}
