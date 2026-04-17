import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:              "#0B0B0E",
        "bg-soft":       "#111118",
        primary:         "#FFFFFF",
        secondary:       "#A1A1AA",
        accent:          "#E02D3C",
        "accent-dim":    "#B91C2C",
        "accent-muted":  "rgba(224,45,60,0.12)",
        "accent-glow":   "rgba(224,45,60,0.28)",
        glass:           "rgba(255,255,255,0.04)",
        "glass-border":  "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        display: ["'Google Sans'", "'Open Sans'", "sans-serif"],
        body:    ["'Open Sans'",   "'Google Sans'", "sans-serif"],
        sans:    ["'Open Sans'",   "'Google Sans'", "sans-serif"],
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
      },
    },
  },
  plugins: [],
};

export default config;
