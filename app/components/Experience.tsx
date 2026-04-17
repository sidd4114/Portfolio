"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences } from "@/app/lib/data";
import { fadeUpVariant, staggerContainer } from "@/app/lib/animations";
import SpotlightCard from "@/app/components/SpotlightCard";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10%" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".exp-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "expo.out",
          scrollTrigger: { trigger: ".exp-list", start: "top 75%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience"
      className="py-32 lg:py-44 px-6 lg:px-16 max-w-7xl mx-auto">
      <motion.div className="flex items-center gap-4 mb-16"
        initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
        <div className="w-6 h-px bg-accent" />
        <span className="section-label">Experience</span>
        <span className="section-label text-white/20">— 02</span>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Heading */}
        <motion.div className="lg:col-span-4"
          variants={staggerContainer} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.h2 className="text-headline text-white sticky top-28" variants={fadeUpVariant}>
            Where I&apos;ve<br />
            <span className="text-secondary">built &</span><br />
            <span className="text-secondary">shipped.</span>
          </motion.h2>
        </motion.div>

        {/* Timeline */}
        <div className="lg:col-span-8 exp-list relative">
          {/* Vertical accent line */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, #E02D3C, rgba(224,45,60,0.1), transparent)", transformOrigin: "top" }}
            initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
          />

          <div className="pl-10 flex flex-col gap-10">
            {experiences.map((exp) => (
              <div key={exp.id} className="exp-card relative opacity-0">
                {/* Dot */}
                <div className="absolute -left-10 top-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent ring-4 ring-accent/20" />
                </div>

                <SpotlightCard className="glass rounded-2xl card-glow group">
                  <div className="p-6 lg:p-8">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                      <div>
                        <h3 className="text-white font-semibold text-lg">{exp.role}</h3>
                        <p className="text-accent text-sm mt-0.5 font-medium">{exp.company}</p>
                        <p className="text-secondary/60 text-xs mt-0.5">{exp.companyType}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-secondary text-xs font-mono border border-white/10 rounded-full px-3 py-1">
                          {exp.period}
                        </span>
                        {exp.period === "Ongoing" && (
                          <span className="badge-ongoing">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                            Live
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-secondary text-sm leading-relaxed">{exp.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {exp.stack.map((t) => (
                        <span key={t} className="skill-pill">{t}</span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
