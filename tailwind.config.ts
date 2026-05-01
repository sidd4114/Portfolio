import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:              "#070709",
        "bg-soft":       "#0D0D12",
        "bg-raised":     "#12121A",
        primary:         "#FFFFFF",
        secondary:       "rgba(255,255,255,0.45)",
        accent:          "#E02D3C",
        "accent-dim":    "#B91C2C",
        "accent-muted":  "rgba(224,45,60,0.12)",
        "accent-glow":   "rgba(224,45,60,0.35)",
        glass:           "rgba(255,255,255,0.028)",
        "glass-border":  "rgba(255,255,255,0.065)",
      },
      fontFamily: {
        display: ["'Orbitron'", "monospace"],
        accent:  ["'Syne'",    "sans-serif"],
        body:    ["'DM Sans'", "sans-serif"],
        sans:    ["'DM Sans'", "sans-serif"],
        mono:    ["'JetBrains Mono'", "monospace"],
      },
      animation: {
        "glow-pulse":    "glow-pulse 3s ease-in-out infinite",
        "float":         "float 6s ease-in-out infinite",
        "shimmer":       "shimmer 4s linear infinite",
        "border-rotate": "border-rotate 4s linear infinite",
        "scan":          "scan 4s linear infinite",
        "grid-fade":     "grid-fade 5s ease-in-out infinite",
        "blink":         "blink 1s step-end infinite",
        "aurora":        "aurora 60s linear infinite",
      },
      keyframes: {
        aurora: {
          from: { backgroundPosition: "50% 50%, 50% 50%" },
          to: { backgroundPosition: "350% 50%, 350% 50%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
