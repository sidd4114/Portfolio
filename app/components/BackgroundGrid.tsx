"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * BackgroundGrid — a subtle SVG dot-grid with a radial vignette fade
 * that reveals itself on load. Used as a decorative section backdrop.
 */
export default function BackgroundGrid({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* Dot grid SVG pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dot-grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#E02D3C" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" />
      </svg>
      {/* Radial fade overlay */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, #0B0B0E 100%)"
      }} />
    </div>
  );
}
