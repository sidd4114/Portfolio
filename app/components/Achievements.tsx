"use client";

import React, { useRef } from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { motion, useInView } from "framer-motion";

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10%" });

  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <section ref={sectionRef} id="achievements" className="py-32 lg:py-44 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <motion.div className="flex items-center gap-4 mb-4"
          initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
          <div className="w-6 h-px bg-accent" />
          <span className="section-label">Recognition</span>
          <span className="section-label text-white/20">— 05</span>
        </motion.div>

        <motion.h2 className="text-headline text-white mb-10 max-w-4xl"
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          Earned <span className="text-secondary">through</span> execution.
        </motion.h2>
      </div>

      <div className="w-full">
        <Carousel items={cards} />
      </div>
    </section>
  );
}

const DummyContent = ({ text }: { text: string }) => {
  return (
    <div className="bg-[#12121A] p-8 md:p-14 rounded-3xl mb-4 border border-white/5">
      <p className="text-neutral-400 text-base md:text-xl font-sans max-w-3xl mx-auto">
        {text}
      </p>
    </div>
  );
};

const data = [
  {
    category: "Hackathon Highlight",
    title: "TechNova 2025 — 1st Place",
    src: "/technova.jpg",
    content: <DummyContent text="Competed against 50+ teams and won 1st Place in the App Development track at TechNova 2025 for building 'Roots' using React Native and MongoDB." />,
  },
  {
    category: "Academic Excellence",
    title: "Ranked 3rd in 1st Year",
    src: "/felicitation 1st year.jpg",
    content: <DummyContent text="Maintained outstanding academics since day one, ranking 3rd across the entire Computer Engineering department." />,
  },
  {
    category: "Academic Excellence",
    title: "Ranked 2nd in 2nd Year",
    src: "/felicitation 2nd year.jpg",
    content: <DummyContent text="Ranked 2nd out of 120+ students in the entire Computer Engineering Department along with a perfect 10 SGPA in Semester 1 & 4 with an overall CGPA of 9.85." />,
  },
  {
    category: "Ideathon",
    title: "Ecoclub Sustainability 3rd Position",
    src: "/ecoclub ideathon.jpg",
    content: <DummyContent text="Secured 3rd position pitching out-of-the-box sustainability solutions and creating a real-world impact plan focusing on green tech." />,
  },
  {
    category: "Hackathon",
    title: "Hackquinox 2.0 — Top 10",
    src: "/hackquinox2.0.JPG",
    content: <DummyContent text="Secured a spot in the top 10 teams out of 600+ participants at Hackquinox 2.0." />,
  }
];
