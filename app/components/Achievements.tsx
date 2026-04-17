"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { achievements } from "@/app/lib/data";
import { fadeUpVariant, staggerContainer } from "@/app/lib/animations";
import SpotlightCard from "@/app/components/SpotlightCard";

gsap.registerPlugin(ScrollTrigger);

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10%" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ach-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: "expo.out",
          scrollTrigger: { trigger: ".ach-grid", start: "top 75%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="achievements"
      className="py-32 lg:py-44 px-6 lg:px-16 max-w-7xl mx-auto">
      <motion.div className="flex items-center gap-4 mb-16"
        initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
        <div className="w-6 h-px bg-accent" />
        <span className="section-label">Recognition</span>
        <span className="section-label text-white/20">— 05</span>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
        <motion.div className="lg:col-span-4"
          variants={staggerContainer} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.h2 className="text-headline text-white sticky top-28" variants={fadeUpVariant}>
            Earned<br /><span className="text-secondary">through</span><br />execution.
          </motion.h2>
        </motion.div>

        <div className="lg:col-span-8 ach-grid flex flex-col gap-5">
          {achievements.map((ach, i) => (
            <SpotlightCard key={ach.id} className="ach-card opacity-0 glass rounded-2xl card-glow group">
              <div className="p-6 lg:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <div className="flex items-start gap-4">
                    <span className="text-accent/40 text-sm font-mono tabular-nums pt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-white font-semibold text-base leading-snug">{ach.title}</h3>
                  </div>
                  <span className="text-secondary text-xs font-mono border border-white/10 rounded-full px-3 py-1 shrink-0">
                    {ach.year}
                  </span>
                </div>
                <div className="pl-8">
                  <p className="text-accent/70 text-xs tracking-wide uppercase mb-2 font-semibold">{ach.context}</p>
                  <p className="text-secondary text-sm leading-relaxed">{ach.description}</p>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
