import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: `${siteConfig.name} | Meme Utility × RWA Vault`,
  description: siteConfig.description,
  keywords: ["VaultCat", "RWA", "Tokenization", "Meme Utility", "Secure Vault", "DeFi"],
  icons: {
    icon: "/logo/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${plusJakarta.variable} font-sans antialiased bg-[#050212] text-white selection:bg-purple-500 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
