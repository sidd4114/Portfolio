"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { eventsParticipated } from "@/app/lib/data";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function Events() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section ref={sectionRef} id="events" className="relative overflow-hidden py-16 lg:py-20">
      <AuroraBackground
        showRadialGradient={false}
        className="h-auto rounded-[2rem] border border-white/10 bg-zinc-900 text-white"
      >
      <div className="relative mx-auto max-w-7xl px-6 py-8 lg:px-16 lg:py-10">
        <motion.div
          className="mb-6 flex items-center gap-4"
          initial={{ opacity: 0, x: -14 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.45 }}
        >
          <div className="h-px w-6 bg-white/25" />
          <span className="section-label text-white/55">Participation</span>
          <span className="section-label text-white/20">— Events</span>
        </motion.div>

        <motion.p
          className="mb-8 max-w-3xl text-sm leading-relaxed text-white/45 md:text-base"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          A visual event ribbon of hackathons, summits, and ideathons I have actively participated in.
        </motion.p>

        <div className="relative">
          <div className="pointer-events-none absolute left-0 right-0 top-[45%] hidden h-px bg-white/10 md:block" />
          <div className="no-scrollbar -mx-1 flex gap-4 overflow-x-auto px-1 pb-2">
          {eventsParticipated.map((event, index) => (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, x: 30, y: 12 }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 * index, ease: "easeOut" }}
              whileHover={{ y: -6, scale: 1.015 }}
              className="h-[18rem] w-[16rem] shrink-0 snap-start rounded-2xl border border-white/10 bg-white/[0.04] p-2 shadow-[0_16px_35px_rgba(0,0,0,0.22)]"
            >
              <div className="relative h-28 overflow-hidden rounded-xl">
                <img
                  src={event.image}
                  alt={event.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute left-2 top-2 rounded-full border border-white/20 bg-black/45 px-2 py-0.5 text-[9px] uppercase tracking-[0.16em] text-white/75">
                  {event.type}
                </span>
              </div>

              <div className="flex h-[12rem] flex-col px-1 pb-1 pt-2">
                <h3 className="line-clamp-2 min-h-[2.6rem] text-sm font-semibold text-white/85">
                  {event.name}
                </h3>
                <p className="mt-1 line-clamp-1 text-[11px] text-white/50">{event.issuer}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.16em] text-white/38">
                    {event.issued}
                  </span>
                  <span className="rounded-full border border-white/15 px-2 py-0.5 text-[9px] tracking-[0.14em] text-white/52">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-2 line-clamp-4 text-xs leading-relaxed text-white/42">{event.note}</p>
              </div>
            </motion.article>
          ))}
          </div>
        </div>
      </div>
      </AuroraBackground>
    </section>
  );
}
