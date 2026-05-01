"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { projects } from "@/app/lib/data";
import DraggableCardStack, { type DraggableCard } from "@/app/components/DraggableCardStack";
import BackgroundGrid from "@/app/components/BackgroundGrid";

/* ── GitHub icon ─────────────────────────────────────── */
function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

/* ── Map to DraggableCard ────────────────────────────── */
const draggableCards: DraggableCard[] = projects.map((p) => ({
  id:       p.id,
  title:    p.title,
  subtitle: p.subtitle,
  category: p.category,
  year:     p.year,
  stack:    p.stack,
  github:   p.github,
  status:   p.status as "Ongoing" | "Shipped",
}));

/* ── Featured project card (large) ──────────────────── */
function FeaturedCard({ project }: { project: typeof projects[number] }) {
  return (
    <a
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-full h-full relative rounded-3xl overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #12121E 0%, #0A0A14 100%)",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.08), 0 40px 80px rgba(0,0,0,0.6)",
      }}
    >
      {/* Top-left corner accent */}
      <div
        className="absolute top-0 left-0 w-48 h-48 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 0% 0%, rgba(224,45,60,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Moving border (conic gradient) */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          padding: "1.5px",
          background:
            "linear-gradient(135deg, rgba(224,45,60,0.4), rgba(255,255,255,0.05) 40%, rgba(224,45,60,0.1) 80%, rgba(224,45,60,0.4))",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          opacity: 0.8,
        }}
      />

      {/* Inner glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(224,45,60,0.08), transparent 60%)",
        }}
      />

      <div className="p-8 lg:p-12 flex flex-col h-full relative z-10">
        {/* Top meta row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="section-label">{project.category}</span>
            {project.status === "Ongoing" ? (
              <span className="badge-ongoing">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse inline-block" />
                Live Build
              </span>
            ) : (
              <span className="badge-shipped">Shipped</span>
            )}
          </div>
          <span
            className="text-xs font-mono"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-display text-white leading-none mb-4 group-hover:neon-text transition-all duration-500"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {project.title}
        </h3>
        <p
          className="text-base mb-3"
          style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-accent)" }}
        >
          {project.subtitle}
        </p>
        <p
          className="text-sm leading-relaxed max-w-2xl mb-auto"
          style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}
        >
          {project.description}
        </p>

        {/* Bottom row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-8 border-t border-white/[0.06]">
          <div className="flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <span key={t} className="skill-pill">
                {t}
              </span>
            ))}
          </div>
          <span
            className="flex items-center gap-2 text-sm group-hover:text-white transition-colors duration-300"
            style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}
          >
            <GitHubIcon />
            View Repository ↗
          </span>
        </div>
      </div>
    </a>
  );
}

/* ── ContainerScroll section ─────────────────────────── */
function ContainerScrollHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scaleSp = useSpring(useTransform(scrollYProgress, [0, 0.5], [1.08, 1]), {
    stiffness: 80,
    damping: 20,
  });
  const opacitySp = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const ySp = useTransform(scrollYProgress, [0, 1], ["30px", "-20px"]);

  return (
    <motion.div
      ref={ref}
      style={{ scale: scaleSp, opacity: opacitySp, y: ySp }}
      className="container-scroll-header"
    >
      <div className="text-center mb-16 lg:mb-24 max-w-4xl mx-auto px-6">
        {/* Small label */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-6 h-px bg-accent" />
          <span className="section-label">Projects</span>
          <span className="section-label text-white/15">— 03</span>
          <div className="w-6 h-px bg-accent" />
        </motion.div>

        {/* Big title */}
        <motion.h2
          className="text-display text-white leading-none mb-6"
          style={{ fontFamily: "var(--font-display)" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          Selected
          <br />
          <span className="neon-text">work.</span>
        </motion.h2>

        <motion.p
          className="text-base max-w-lg mx-auto"
          style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          From embedded AI to fintech products — each one shipped and real.
        </motion.p>
      </div>
    </motion.div>
  );
}

/* ── Main Projects component ─────────────────────────── */
export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10%" });

  const featured = projects.find((p) => p.featured)!;

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      <BackgroundGrid />

      {/* ── ContainerScroll-style header ─── */}
      <div className="pt-32 lg:pt-44 pb-8">
        <ContainerScrollHeader />
      </div>

      {/* ── Cards area ─── */}
      <div className="relative z-10 px-6 lg:px-16 max-w-7xl mx-auto pb-32 lg:pb-44">

        {/* ── Sticky-scroll featured card ─── */}
        <div className="relative mb-16">
          {/* Perspective wrapper for 3D entrance */}
          <motion.div
            initial={{ opacity: 0, y: 60, rotateX: 8 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            style={{ transformPerspective: 1200, transformStyle: "preserve-3d" }}
            className="project-card-enter"
          >
            {/* Ambient glow behind card */}
            <div
              className="absolute -inset-8 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(224,45,60,0.08), transparent 70%)",
              }}
            />
            <FeaturedCard project={featured} />
          </motion.div>
        </div>

        {/* ── Browse all — draggable stack + list ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left: descriptor column */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            >
              <p className="section-label mb-5">All projects</p>
              <h3
                className="text-headline text-white mb-5 leading-tight"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                Drag the stack
                <br />
                to explore.
              </h3>
              <p
                className="text-sm leading-relaxed mb-8"
                style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}
              >
                Swipe or drag any card away to reveal the next project beneath it.
                Every card is a shipped or in-progress build.
              </p>

              {/* Instruction HUD */}
              <div
                className="rounded-xl px-5 py-4 flex items-center gap-4"
                style={{
                  background: "rgba(224,45,60,0.05)",
                  border: "1px solid rgba(224,45,60,0.15)",
                }}
              >
                <span className="text-2xl select-none">👆</span>
                <div>
                  <p
                    className="text-xs font-semibold text-white mb-0.5"
                    style={{ fontFamily: "var(--font-accent)" }}
                  >
                    Drag to cycle
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)" }}
                  >
                    Toss the card left, right, or up to reveal the next one.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: draggable stack */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-center justify-start"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <DraggableCardStack cards={draggableCards} />
          </motion.div>
        </div>

        {/* ── GitHub CTA ─── */}
        <motion.div
          className="flex justify-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <a
            href="https://github.com/sidd4114"
            target="_blank"
            rel="noopener noreferrer"
            className="moving-border px-10 py-4 text-sm text-white tracking-widest uppercase flex items-center gap-3 group"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <GitHubIcon />
            <span>All repositories on GitHub</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ↗
            </motion.span>
          </a>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--bg))",
        }}
      />
    </section>
  );
}
