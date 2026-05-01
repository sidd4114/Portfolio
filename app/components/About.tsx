"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { personal, education } from "@/app/lib/data";

/* ── Stat data ─────────────────────────────────────────── */
const stats = [
  { value: "9.85",  label: "CGPA",            suffix: "" },
  { value: "2",     label: "Year Rank",        suffix: "nd" },
  { value: "3",     label: "Hackathons",       suffix: "+" },
];

const traits = [
  "Full‑Stack Engineer",
  "AI/ML Researcher",
  "Systems Builder",
  "Hackathon Winner",
];

/* ── Holographic tilt photo ─────────────────────────────── */
function PhotoCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rotateX.set(-dy * 12);
    rotateY.set(dx * 12);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
      className="relative w-full max-w-[380px] mx-auto lg:mx-0"
    >
      {/* Holographic spinning border */}
      <div className="holo-border">
        <div className="holo-border-inner">
          {/* Skeuomorphic photo frame */}
          <div className="photo-frame relative w-full aspect-[3/4]">
            <Image
              src="/avatar.jpg"
              alt="Siddhen Pise"
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 768px) 90vw, 380px"
            />

            {/* Photo gradient overlay */}
            <div className="photo-overlay absolute inset-0 z-10" />

            {/* Scan line over photo */}
            <div className="scan-line z-20 opacity-60" />

            {/* Bottom glass info plate — skeuomorphic */}
            <div
              className="absolute bottom-0 left-0 right-0 z-20 p-5"
              style={{
                background: "linear-gradient(to top, rgba(7,7,9,0.98) 0%, rgba(7,7,9,0.7) 60%, transparent 100%)",
              }}
            >
              {/* Status indicator */}
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                <span className="section-label text-[10px] tracking-[0.3em]">
                  Available for opportunities
                </span>
              </div>

              {/* Name plate — skeuomorphic panel */}
              <div
                className="rounded-xl px-4 py-3"
                style={{
                  background: "linear-gradient(145deg, rgba(20,20,28,0.95), rgba(10,10,16,0.98))",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,0,0,0.4), 0 4px 24px rgba(0,0,0,0.5)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <p
                  className="text-white font-bold text-lg tracking-wide leading-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  SIDDHEN PISE
                </p>
                <p
                  className="mt-0.5 text-xs tracking-widest"
                  style={{ color: "var(--accent)", fontFamily: "var(--font-body)" }}
                >
                  Computer Engineering · Fr. CRIT
                </p>
              </div>
            </div>

            {/* Corner brackets — HUD aesthetic */}
            {[
              "top-3 left-3 border-t border-l",
              "top-3 right-3 border-t border-r",
              "bottom-3 left-3 border-b border-l",
              "bottom-3 right-3 border-b border-r",
            ].map((cls, i) => (
              <div
                key={i}
                className={`absolute w-4 h-4 ${cls} z-30 opacity-60`}
                style={{ borderColor: "var(--accent)" }}
              />
            ))}

            {/* Glint highlight — skeuomorphic light source */}
            <div
              className="absolute top-0 left-0 right-0 h-1/3 z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Floating accent tags */}
      <motion.div
        className="absolute -top-4 -right-4 z-40 glass-red rounded-full px-3 py-1.5 text-[10px] tracking-widest text-accent uppercase font-body"
        style={{ fontFamily: "var(--font-body)" }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        2nd Year Rank
      </motion.div>

      <motion.div
        className="absolute -bottom-4 -left-4 z-40 glass rounded-xl px-3 py-2 text-[10px] text-white/60 tracking-widest uppercase"
        style={{ fontFamily: "var(--font-body)" }}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <span className="text-accent">9.85</span> CGPA
      </motion.div>
    </motion.div>
  );
}

/* ── Animated stat ──────────────────────────────────────── */
function AnimatedStat({
  value,
  suffix,
  label,
  delay = 0,
}: {
  value: string;
  suffix: string;
  label: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}
      className="relative group"
    >
      {/* Skeuo raised panel */}
      <div
        className="rounded-2xl px-6 py-5 relative overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #14141E 0%, #0A0A12 100%)",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.6), 0 8px 32px rgba(0,0,0,0.5)",
        }}
      >
        {/* Red glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(224,45,60,0.1) 0%, transparent 70%)",
            boxShadow: "inset 0 0 30px rgba(224,45,60,0.07)",
          }}
        />

        <p
          className="text-4xl font-black leading-none stat-glow"
          style={{ fontFamily: "var(--font-display)", color: "#fff" }}
        >
          {value}
          <span className="text-accent text-2xl">{suffix}</span>
        </p>
        <p
          className="mt-2 text-[10px] tracking-[0.2em] uppercase"
          style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)" }}
        >
          {label}
        </p>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--accent), transparent)",
            opacity: 0.4,
          }}
        />
      </div>
    </motion.div>
  );
}

/* ── Trait badge ────────────────────────────────────────── */
function TraitBadge({ label, i }: { label: string; i: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.05 * i, duration: 0.4, ease: "easeOut" }}
      className="skill-pill"
      style={{ fontFamily: "var(--font-body)" }}
    >
      {label}
    </motion.span>
  );
}

/* ── Education card ─────────────────────────────────────── */
function EduCard({ e, i }: { e: typeof education[number]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.08 * i, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="relative rounded-xl overflow-hidden"
      style={{
        background: "linear-gradient(145deg, rgba(18,18,26,0.9), rgba(10,10,16,0.95))",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.07), 0 4px 20px rgba(0,0,0,0.4)",
      }}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px]"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--accent), transparent)",
        }}
      />

      <div className="pl-6 pr-5 py-4">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <p
              className="text-white font-semibold text-sm"
              style={{ fontFamily: "var(--font-accent)" }}
            >
              {e.degree}
            </p>
            <p className="text-accent text-xs mt-0.5" style={{ fontFamily: "var(--font-body)" }}>
              {e.institution}
            </p>
          </div>
          <span
            className="text-xs font-mono border rounded-full px-3 py-1 flex-shrink-0"
            style={{
              color: "rgba(255,255,255,0.35)",
              borderColor: "rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.025)",
            }}
          >
            {e.period}
          </span>
        </div>
        {e.highlights.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {e.highlights.map((h) => (
              <span key={h} className="skill-pill text-xs">
                {h}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ── Main component ─────────────────────────────────────── */
export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [traitIdx, setTraitIdx] = useState(0);

  // Cycle traits
  useEffect(() => {
    const t = setInterval(() => setTraitIdx((i) => (i + 1) % traits.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 lg:py-44 overflow-hidden mesh-bg"
    >
      {/* ── Background data-grid ─── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full grid-fade" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="about-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#E02D3C" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-grid)" />
        </svg>
        {/* Radial fade mask */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, var(--bg) 85%)",
          }}
        />
      </div>

      <div className="relative z-10 px-6 lg:px-16 max-w-7xl mx-auto">

        {/* ── Section label ─── */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-6 h-px bg-accent" />
          <span className="section-label">About</span>
          <span className="section-label text-white/15">— 01</span>
          {/* Live trait badge */}
          <motion.span
            key={traitIdx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="ml-4 text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
            style={{
              background: "rgba(224,45,60,0.1)",
              border: "1px solid rgba(224,45,60,0.2)",
              color: "var(--accent)",
              fontFamily: "var(--font-body)",
            }}
          >
            {traits[traitIdx]}
          </motion.span>
        </motion.div>

        {/* ── Main grid ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">

          {/* ── Left: Photo ─── */}
          <div className="lg:col-span-4">
            <PhotoCard />
          </div>

          {/* ── Right: Content ─── */}
          <div className="lg:col-span-8 pt-2 lg:pt-6">

            {/* Headline */}
            <motion.h2
              className="text-display text-white leading-none mb-8"
              style={{ fontFamily: "var(--font-display)" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              Engineering
              <br />
              <span className="neon-text">real systems,</span>
              <br />
              real impact.
            </motion.h2>

            {/* Bio paragraphs */}
            <div className="space-y-5 mb-12">
              {[
                personal.description,
                "Currently interning at Optiqo (fintech) and running deep learning research on medical imaging — knee MRI and hip X-ray implant templating — at my university lab. Building things that work in the real world, not just in notebooks.",
                "Outside academia: hackathons, competitive programming, and shipping side projects that scratch real itches.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                  className="text-base leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}
                >
                  {text}
                </motion.p>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mb-12">
              {stats.map((s, i) => (
                <AnimatedStat key={s.label} {...s} delay={0.1 * i} />
              ))}
            </div>

            {/* Trait pills */}
            <div className="flex flex-wrap gap-2 mb-12">
              {traits.map((t, i) => (
                <TraitBadge key={t} label={t} i={i} />
              ))}
              <TraitBadge label="Navi Mumbai, India 🇮🇳" i={4} />
              <TraitBadge label="Open to internships" i={5} />
            </div>

            {/* CTA buttons */}
            <motion.div
              className="flex gap-4 flex-wrap mb-16"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline px-7 py-3 text-xs tracking-widest uppercase"
              >
                GitHub ↗
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline px-7 py-3 text-xs tracking-widest uppercase"
              >
                LinkedIn ↗
              </a>
              <a
                href={`mailto:${personal.email}`}
                className="btn-red glow-pulse px-7 py-3 text-xs tracking-widest uppercase"
              >
                Email me →
              </a>
            </motion.div>

            {/* Education */}
            <div>
              <motion.p
                className="section-label mb-5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Education
              </motion.p>
              <div className="flex flex-col gap-3">
                {education.map((e, i) => (
                  <EduCard key={e.id} e={e} i={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section divider */}
      <motion.div
        className="relative z-10 mt-24 mx-6 lg:mx-16 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(224,45,60,0.3) 30%, rgba(224,45,60,0.3) 70%, transparent)",
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
      />
    </section>
  );
}
