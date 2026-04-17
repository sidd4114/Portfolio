"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import AnimatedBeam from "@/app/components/AnimatedBeam";
import TextScramble from "@/app/components/TextScramble";
import ParticleField from "@/app/components/ParticleField";
import Typewriter from "@/app/components/Typewriter";
import MagneticButton from "@/app/components/MagneticButton";
import { personal } from "@/app/lib/data";

const stats = [
  { val: "9.85", label: "CGPA" },
  { val: "2nd",  label: "Year 2 Rank" },
  { val: "10",   label: "Perfect SGPA ×2" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const yContent  = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const opContent = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80);
    const ctx = gsap.context(() => {
      gsap.timeline({ delay: 0.25 })
        .fromTo(".hl1", { yPercent: 110, skewY: 4 }, { yPercent: 0, skewY: 0, duration: 1.1, ease: "expo.out" })
        .fromTo(".hl2", { yPercent: 110, skewY: 4 }, { yPercent: 0, skewY: 0, duration: 1.1, ease: "expo.out" }, "-=0.9")
        .fromTo(".hero-sub",   { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" }, "-=0.65")
        .fromTo(".hero-stat",  { opacity: 0, y: 16 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.65, ease: "expo.out" }, "-=0.5")
        .fromTo(".hero-ctas",  { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" }, "-=0.4");
    }, sectionRef);
    return () => { clearTimeout(t); ctx.revert(); };
  }, []);

  return (
    <section ref={sectionRef} id="hero"
      className="relative w-full min-h-screen overflow-hidden bg-bg flex flex-col justify-end">

      {/* ── Layers ─────────────────────────────────────────────── */}
      <AnimatedBeam />
      <ParticleField />

      {/* Dot-grid backdrop */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full opacity-[0.05] grid-fade" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hg" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#E02D3C" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hg)" />
        </svg>
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 90% 70% at 20% 60%, transparent 40%, #0B0B0E 90%)"
        }} />
      </div>

      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-accent to-transparent opacity-50" />

      {/* Scan line */}
      <div className="scan-line" aria-hidden="true" />

      {/* ── Content ──────────────────────────────────────────────── */}
      <motion.div className="relative z-10 w-full px-6 lg:px-16 pb-16 lg:pb-20"
        style={{ y: yContent, opacity: opContent }}>

        {/* Label with scramble */}
        <motion.div className="mb-8 flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}>
          <span className="w-8 h-px bg-accent flex-shrink-0" />
          {ready && (
            <TextScramble text="Computer Engineering · Fr. CRIT · 2023–2027"
              className="section-label" delay={600} speed={22} />
          )}
        </motion.div>

        {/* Giant name */}
        <h1 className="leading-none select-none" aria-label={personal.name}>
          <div className="overflow-hidden">
            <div className="hl1 text-hero text-white"
              style={{ fontFamily: "'Google Sans', sans-serif", fontWeight: 700 }}>
              SIDDHEN
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="hl2 text-hero"
              style={{
                fontFamily: "'Google Sans', sans-serif", fontWeight: 700,
                WebkitTextStroke: "1.5px rgba(255,255,255,0.18)",
                color: "transparent",
              }}>
              PISE
            </div>
          </div>
        </h1>

        {/* Typewriter role */}
        <div className="hero-sub mt-7 flex items-center gap-4 opacity-0">
          <span className="w-8 h-px bg-accent flex-shrink-0" />
          <Typewriter className="text-secondary text-sm md:text-base tracking-widest" />
        </div>

        {/* Stats */}
        <div className="mt-10 flex flex-wrap gap-10">
          {stats.map((s) => (
            <div key={s.label} className="hero-stat opacity-0">
              <p className="text-3xl font-display font-bold text-white"
                style={{ fontFamily: "'Google Sans', sans-serif" }}>{s.val}</p>
              <p className="text-secondary text-xs tracking-widest uppercase mt-0.5"
                style={{ fontFamily: "'Open Sans', sans-serif" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* CTAs with magnetic effect */}
        <div className="hero-ctas mt-10 flex flex-wrap items-center gap-5 opacity-0">
          <MagneticButton>
            <button
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-red glow-pulse px-8 py-3.5 text-sm tracking-widest uppercase flex items-center gap-3">
              <span>View Work</span>
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>→</motion.span>
            </button>
          </MagneticButton>

          <MagneticButton>
            <a href={personal.github} target="_blank" rel="noopener noreferrer"
              className="btn-outline px-8 py-3.5 text-sm tracking-widest uppercase">
              GitHub ↗
            </a>
          </MagneticButton>

          <a href={personal.linkedin} target="_blank" rel="noopener noreferrer"
            className="text-secondary hover:text-white text-sm tracking-widest uppercase transition-colors hover-underline">
            LinkedIn
          </a>
        </div>

        {/* Email */}
        <motion.p className="mt-6 text-secondary/40 text-xs tracking-widest"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}>
          {personal.email}
        </motion.p>
      </motion.div>

      {/* Scroll hint */}
      <motion.div className="absolute bottom-8 right-8 md:right-14 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 1 }}>
        <span className="section-label" style={{ writingMode: "vertical-rl", letterSpacing: "0.2em" }}>Scroll</span>
        <motion.div className="w-px h-14 bg-gradient-to-b from-accent to-transparent"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }} />
      </motion.div>
    </section>
  );
}
