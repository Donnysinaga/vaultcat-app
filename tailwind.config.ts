import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050212",
        foreground: "#ffffff",
        brand: {
          purple: "#A855F7",
          pink: "#EC4899",
          card: "#0B0623",
          border: "rgba(168, 85, 247, 0.12)",
          "border-pink": "rgba(236, 72, 153, 0.12)",
          "glow-purple": "rgba(168, 85, 247, 0.2)",
          "glow-pink": "rgba(236, 72, 153, 0.2)",
          textMuted: "#8E8A9F",
          success: "#10B981",
          danger: "#EF4444",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-purple-pink": "linear-gradient(135deg, #EC4899 0%, #A855F7 100%)",
        "gradient-hero": "radial-gradient(circle at top right, rgba(168, 85, 247, 0.15) 0%, rgba(5, 2, 18, 0) 50%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out infinite 3s",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
