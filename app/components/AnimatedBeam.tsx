"use client";

import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useRef } from "react";

/**
 * AnimatedBeam — drifting gradient orbs that create a cinematic energy feel
 * behind the hero section.
 */
export default function AnimatedBeam() {
  const time = useMotionValue(0);

  useAnimationFrame((t) => {
    time.set(t);
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Primary orb — slow drift */}
      <motion.div
        className="absolute rounded-full opacity-[0.18] blur-3xl"
        style={{
          width: 600, height: 600,
          background: "radial-gradient(circle, #E02D3C 0%, #7f1d1d 40%, transparent 70%)",
          top: "10%", left: "15%",
        }}
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Secondary orb — faster, subtler */}
      <motion.div
        className="absolute rounded-full opacity-[0.10] blur-3xl"
        style={{
          width: 400, height: 400,
          background: "radial-gradient(circle, #FF6B6B 0%, transparent 70%)",
          bottom: "20%", right: "10%",
        }}
        animate={{
          x: [0, -60, 30, 0],
          y: [0, 40, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      {/* Accent thin orb */}
      <motion.div
        className="absolute rounded-full opacity-[0.07] blur-2xl"
        style={{
          width: 250, height: 250,
          background: "radial-gradient(circle, #E02D3C 0%, transparent 70%)",
          top: "60%", left: "45%",
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 20, 0],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 6 }}
      />
    </div>
  );
}
