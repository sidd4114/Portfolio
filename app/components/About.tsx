"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personal, education } from "@/app/lib/data";
import { fadeUpVariant, staggerContainer } from "@/app/lib/animations";
import SpotlightCard from "@/app/components/SpotlightCard";
import WordReveal from "@/app/components/WordReveal";
import MagneticButton from "@/app/components/MagneticButton";
import BackgroundGrid from "@/app/components/BackgroundGrid";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "9.85", label: "CGPA at CRIT" },
  { value: "2024", label: "First internship year" },
  { value: "3+",   label: "Hackathons won / finalist" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-15%" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-counter",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "expo.out",
          scrollTrigger: { trigger: counterRef.current, start: "top 80%" } }
      );
      gsap.fromTo(".edu-card",
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.9, stagger: 0.12, ease: "expo.out",
          scrollTrigger: { trigger: ".edu-grid", start: "top 80%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about"
      className="relative py-32 lg:py-44 px-6 lg:px-16 max-w-7xl mx-auto overflow-hidden">
      <BackgroundGrid />

      <motion.div className="relative z-10 flex items-center gap-4 mb-16"
        initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
        <div className="w-6 h-px bg-accent" />
        <span className="section-label">About</span>
        <span className="section-label text-white/20">— 01</span>
      </motion.div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

        {/* Left */}
        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.h2 className="text-display text-white" variants={fadeUpVariant}
            style={{ fontFamily: "'Google Sans', sans-serif" }}>
            Engineering<br />
            <span className="text-secondary">real systems,</span><br />
            real impact.
          </motion.h2>

          {/* Stats */}
          <div ref={counterRef} className="mt-14 flex gap-10 flex-wrap">
            {stats.map((s) => (
              <div key={s.label} className="about-counter opacity-0">
                <p className="text-4xl font-display font-bold text-white"
                  style={{ fontFamily: "'Google Sans', sans-serif" }}>{s.value}</p>
                <p className="text-secondary text-xs tracking-widest uppercase mt-1"
                  style={{ fontFamily: "'Open Sans', sans-serif" }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="edu-grid mt-14 flex flex-col gap-4">
            <p className="section-label mb-2">Education</p>
            {education.map((e) => (
              <SpotlightCard key={e.id} className="edu-card opacity-0 glass rounded-xl card-glow">
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <p className="text-white font-semibold text-sm"
                        style={{ fontFamily: "'Google Sans', sans-serif" }}>{e.degree}</p>
                      <p className="text-accent text-xs mt-0.5">{e.institution}</p>
                    </div>
                    <span className="text-secondary text-xs font-mono border border-white/10 rounded-full px-3 py-1">
                      {e.period}
                    </span>
                  </div>
                  {e.highlights.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {e.highlights.map((h) => (
                        <span key={h} className="skill-pill text-xs">{h}</span>
                      ))}
                    </div>
                  )}
                </div>
              </SpotlightCard>
            ))}
          </div>
        </motion.div>

        {/* Right */}
        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? "visible" : "hidden"} className="pt-2 lg:pt-20">
          <WordReveal
            text={personal.description}
            className="text-secondary leading-relaxed text-base lg:text-lg"
            delay={0.2}
            stagger={0.04}
          />

          <motion.p variants={fadeUpVariant}
            className="text-secondary leading-relaxed text-base lg:text-lg mt-6">
            Currently interning at a fintech startup (Optiqo) and running DL research on medical
            imaging — knee MRI and hip X-ray implant templating — at my university lab.
            I believe in building things that work in the real world, not just in notebooks.
          </motion.p>

          <motion.p variants={fadeUpVariant}
            className="text-secondary leading-relaxed text-base lg:text-lg mt-6">
            Outside academia: hackathons, competitive programming, and shipping side projects
            that scratch real itches.
          </motion.p>

          <motion.div variants={fadeUpVariant} className="mt-10 flex gap-5 flex-wrap">
            <MagneticButton>
              <a href={personal.github} target="_blank" rel="noopener noreferrer"
                className="btn-outline px-7 py-3 text-xs tracking-widest uppercase">
                GitHub ↗
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer"
                className="btn-outline px-7 py-3 text-xs tracking-widest uppercase">
                LinkedIn ↗
              </a>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      <motion.div className="relative z-10 mt-24 h-px bg-white/[0.05]"
        initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
        style={{ transformOrigin: "left" }} />
    </section>
  );
}
