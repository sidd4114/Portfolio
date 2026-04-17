"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/app/lib/data";
import { fadeUpVariant, staggerContainer } from "@/app/lib/animations";
import DraggableCardStack, { type DraggableCard } from "@/app/components/DraggableCardStack";
import TiltCard from "@/app/components/TiltCard";
import SpotlightCard from "@/app/components/SpotlightCard";
import BackgroundGrid from "@/app/components/BackgroundGrid";

gsap.registerPlugin(ScrollTrigger);

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

// Map project data to DraggableCard format
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

function FeaturedCard({ project }: { project: typeof projects[number] }) {
  return (
    <TiltCard intensity={6} className="group">
      <SpotlightCard className="glass-red rounded-2xl card-glow overflow-hidden">
        <a href={project.github} target="_blank" rel="noopener noreferrer"
          className="block p-8 lg:p-12">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="section-label">{project.category}</span>
              {project.status === "Ongoing" ? (
                <span className="badge-ongoing">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse inline-block" />
                  Ongoing
                </span>
              ) : (
                <span className="badge-shipped">Shipped</span>
              )}
            </div>
            <span className="text-secondary/40 text-xs font-mono">{project.year}</span>
          </div>

          <h3 className="text-display text-white leading-none mb-3"
            style={{ fontFamily: "'Google Sans', sans-serif" }}>
            {project.title}
          </h3>
          <p className="text-secondary text-base mb-2">{project.subtitle}</p>
          <p className="text-secondary/70 text-sm leading-relaxed max-w-2xl mb-8">
            {project.description}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <span key={t} className="skill-pill">{t}</span>
              ))}
            </div>
            <span className="flex items-center gap-2 text-secondary group-hover:text-white transition-colors text-sm">
              <GitHubIcon /> View Repository
            </span>
          </div>
        </a>
      </SpotlightCard>
    </TiltCard>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10%" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".proj-reveal",
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1.1, stagger: 0.14, ease: "expo.out",
          scrollTrigger: { trigger: ".proj-grid", start: "top 78%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const featured = projects.find((p) => p.featured)!;

  return (
    <section ref={sectionRef} id="projects"
      className="relative py-32 lg:py-44 px-6 lg:px-16 max-w-7xl mx-auto overflow-hidden">
      <BackgroundGrid />

      {/* Header */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
        <div>
          <motion.div className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
            <div className="w-6 h-px bg-accent" />
            <span className="section-label">Projects</span>
            <span className="section-label text-white/20">— 03</span>
          </motion.div>
          <motion.h2 className="text-display text-white"
            variants={fadeUpVariant} initial="hidden" animate={inView ? "visible" : "hidden"}
            style={{ fontFamily: "'Google Sans', sans-serif" }}>
            Selected<br /><span className="text-secondary">work.</span>
          </motion.h2>
        </div>
        <motion.p className="text-secondary text-sm max-w-xs leading-relaxed"
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3, duration: 0.8 }}>
          From embedded AI to fintech products — each one shipped and real.
        </motion.p>
      </div>

      {/* ── Two-column layout: featured left, draggable stack right ── */}
      <div className="proj-grid relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-12">
        {/* Featured big card */}
        <div className="proj-reveal opacity-0 lg:col-span-8">
          <FeaturedCard project={featured} />
        </div>

        {/* Draggable card stack */}
        <div className="proj-reveal opacity-0 lg:col-span-4 flex flex-col items-center justify-start pt-6">
          <p className="section-label mb-10 text-center">All Projects</p>
          <DraggableCardStack cards={draggableCards} />
        </div>
      </div>

      {/* All GitHub link */}
      <motion.div className="relative z-10 flex justify-center mt-16"
        initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6, duration: 0.8 }}>
        <a href={`https://github.com/sidd4114`} target="_blank" rel="noopener noreferrer"
          className="moving-border px-8 py-3.5 text-sm text-white tracking-widest uppercase flex items-center gap-3 group"
          style={{ fontFamily: "'Google Sans', sans-serif" }}>
          <GitHubIcon />
          <span>All repositories on GitHub</span>
          <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }}>↗</motion.span>
        </a>
      </motion.div>
    </section>
  );
}
