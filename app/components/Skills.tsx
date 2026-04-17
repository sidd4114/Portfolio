"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "@/app/lib/data";
import { fadeUpVariant, staggerContainer } from "@/app/lib/animations";
import BackgroundGrid from "@/app/components/BackgroundGrid";

gsap.registerPlugin(ScrollTrigger);

// Map skill groups to icon abbreviations for the visual
const GROUP_ICONS: Record<string, string> = {
  "Languages & Frameworks": "{ }",
  "UI & Styling":           "✦",
  "Data & AI/ML":           "◈",
  "Cloud & Backend":        "⬡",
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10%" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".skill-group",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.14, ease: "expo.out",
          scrollTrigger: { trigger: ".skills-grid", start: "top 80%" } }
      );
      gsap.fromTo(".pill-item",
        { opacity: 0, scale: 0.78, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.55, stagger: 0.03, ease: "back.out(1.8)",
          scrollTrigger: { trigger: ".skills-grid", start: "top 75%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills"
      className="relative py-32 lg:py-44 px-6 lg:px-16 max-w-7xl mx-auto overflow-hidden">
      <BackgroundGrid />

      <motion.div className="relative z-10 flex items-center gap-4 mb-16"
        initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
        <div className="w-6 h-px bg-accent" />
        <span className="section-label">Tech Stack</span>
        <span className="section-label text-white/20">— 04</span>
      </motion.div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">
        <motion.div className="lg:col-span-4"
          variants={staggerContainer} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.h2 className="text-headline text-white sticky top-28" variants={fadeUpVariant}
            style={{ fontFamily: "'Google Sans', sans-serif" }}>
            Tools of<br /><span className="text-secondary">the craft.</span>
          </motion.h2>
          <motion.p variants={fadeUpVariant}
            className="text-secondary text-sm leading-relaxed mt-6">
            Technologies I reach for to architect, build, and deploy full-stack products and AI pipelines.
          </motion.p>

          {/* Visual skill count */}
          <motion.div variants={fadeUpVariant} className="mt-10 glass rounded-xl p-5">
            <p className="text-4xl font-display font-bold text-white"
              style={{ fontFamily: "'Google Sans', sans-serif" }}>
              {skills.reduce((acc, g) => acc + g.items.length, 0)}+
            </p>
            <p className="text-secondary text-xs tracking-widest uppercase mt-1">Technologies</p>
            <div className="mt-4 h-px bg-white/[0.06]" />
            <p className="text-secondary/60 text-xs mt-3 leading-relaxed">
              From low-level C++ to cloud infra — full-stack and beyond.
            </p>
          </motion.div>
        </motion.div>

        {/* Skills grid */}
        <div className="lg:col-span-8 skills-grid flex flex-col gap-10">
          {skills.map((group) => (
            <div key={group.group} className="skill-group opacity-0">
              {/* Group header */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-accent/60 text-lg select-none" aria-hidden="true">
                  {GROUP_ICONS[group.group] ?? "·"}
                </span>
                <p className="text-xs font-semibold tracking-[0.22em] uppercase text-accent/80"
                  style={{ fontFamily: "'Open Sans', sans-serif" }}>{group.group}</p>
                <span className="text-secondary/20 text-xs">({group.items.length})</span>
              </div>

              {/* Pills */}
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill, si) => (
                  <motion.span
                    key={skill}
                    className="skill-pill pill-item"
                    style={{ animationDelay: `${si * 30}ms` }}
                    whileHover={{ scale: 1.07, transition: { duration: 0.18 } }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
