// ─── Animation presets for Framer Motion & GSAP ──────────────

import { Variants } from "framer-motion";

// ─── Framer Motion Variants ──────────────────────────────────

export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
  },
};

export const fadeInVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0,
    },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
  },
};

export const scaleInVariant: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
  },
};

export const clipReveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
  },
};

// ─── GSAP Ease Strings ───────────────────────────────────────
export const EASE_OUT_EXPO = "expo.out";
export const EASE_IN_OUT_EXPO = "expo.inOut";
export const EASE_CUSTOM = "power3.out";

// ─── GSAP Default Duration ───────────────────────────────────
export const DURATION_BASE = 1.0;
export const DURATION_SLOW = 1.4;
export const DURATION_FAST = 0.7;
