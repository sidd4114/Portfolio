"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { personal } from "@/app/lib/data";
import MagneticButton from "@/app/components/MagneticButton";
import ParticleField from "@/app/components/ParticleField";

const links = [
  { label: "GitHub",   href: personal.github },
  { label: "LinkedIn", href: personal.linkedin },
  { label: "Resume",   href: "/resume.pdf" },
];

const navItems = [
  { label: "About",        href: "#about" },
  { label: "Experience",   href: "#experience" },
  { label: "Projects",     href: "#projects" },
  { label: "Skills",       href: "#skills" },
  { label: "Achievements", href: "#achievements" },
];

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isAnchor = href.startsWith("#");
  const cls = "text-secondary/60 hover:text-white text-xs tracking-widest uppercase transition-colors duration-300 hover-underline";
  if (isAnchor) {
    return (
      <button onClick={() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })}
        className={cls}>{children}</button>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {children} <span className="opacity-40">↗</span>
    </a>
  );
}

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <footer ref={ref}
      className="relative border-t border-white/[0.04] px-6 lg:px-16 py-24 overflow-hidden">
      {/* Particle layer */}
      <div className="absolute inset-0 opacity-40">
        <ParticleField />
      </div>

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[180px] blur-3xl opacity-[0.14] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #E02D3C 0%, transparent 70%)" }} />

      {/* Closing statement */}
      <motion.div className="relative z-10 max-w-7xl mx-auto mb-20"
        initial={{ opacity: 0, y: 60 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}>

        <div className="flex items-center gap-4 mb-10">
          <div className="w-8 h-px bg-accent" />
          <span className="section-label">Let&apos;s Connect</span>
        </div>

        <h2 className="text-display text-white leading-none"
          style={{ fontFamily: "'Google Sans', sans-serif" }}>
          <span className="block">Let&apos;s build</span>
          <span className="block shimmer-text">something great.</span>
        </h2>

        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <MagneticButton>
            <a href={`mailto:${personal.email}`}
              className="btn-red glow-pulse px-9 py-4 text-sm tracking-widest uppercase flex items-center gap-3">
              <span>Get in touch</span>
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>→</motion.span>
            </a>
          </MagneticButton>
          <a href={`mailto:${personal.email}`}
            className="text-secondary text-sm hover:text-white transition-colors hover-underline">
            {personal.email}
          </a>
        </div>
      </motion.div>

      {/* Bottom bar */}
      <motion.div className="relative z-10 max-w-7xl mx-auto border-t border-white/[0.04] pt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4, duration: 0.8 }}>
        {/* Brand */}
        <div>
          <p className="text-white font-display font-bold text-lg tracking-widest uppercase"
            style={{ fontFamily: "'Google Sans', sans-serif" }}>
            Siddhen Pise
          </p>
          <p className="text-secondary/50 text-xs mt-1">{personal.role}</p>
          <p className="text-secondary/30 text-xs mt-0.5">Fr. CRIT · Navi Mumbai</p>
        </div>

        {/* Nav */}
        <div>
          <p className="text-secondary/30 text-xs tracking-widest uppercase mb-4">Navigation</p>
          <div className="flex flex-col gap-3">
            {navItems.map((l) => <FooterLink key={l.href} href={l.href}>{l.label}</FooterLink>)}
          </div>
        </div>

        {/* Links */}
        <div>
          <p className="text-secondary/30 text-xs tracking-widest uppercase mb-4">Elsewhere</p>
          <div className="flex flex-col gap-3">
            {links.map((l) => <FooterLink key={l.href} href={l.href}>{l.label}</FooterLink>)}
          </div>
        </div>

        {/* Fun stats */}
        <div>
          <p className="text-secondary/30 text-xs tracking-widest uppercase mb-4">Quick Stats</p>
          <div className="flex flex-col gap-3">
            {[
              ["CGPA", "9.85"],
              ["Year", "2nd (2023–2027)"],
              ["Rank", "2nd in batch"],
              ["Location", "Navi Mumbai, IN"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between">
                <span className="text-secondary/50 text-xs">{k}</span>
                <span className="text-white text-xs font-mono">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Watermark */}
      <div className="absolute bottom-0 left-0 right-0 text-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span className="text-[10rem] lg:text-[15rem] font-display font-bold opacity-[0.018] leading-none"
          style={{ fontFamily: "'Google Sans', sans-serif" }}>SP</span>
      </div>

      {/* Copyright */}
      <motion.p className="relative z-10 max-w-7xl mx-auto mt-10 text-secondary/25 text-xs"
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8, duration: 0.6 }}>
        &copy; {new Date().getFullYear()} Siddhen Pise — Designed & built with intention.
      </motion.p>
    </footer>
  );
}
