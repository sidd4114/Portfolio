"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

/**
 * Word-by-word reveal — each word slides up from a clip mask.
 * Inspired by Vercel's homepage hero text animation.
 */
export default function WordReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.07,
}: WordRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const words = text.split(" ");

  return (
    <p ref={ref} className={`flex flex-wrap gap-x-[0.25em] ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block" aria-hidden="true">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : {}}
            transition={{
              duration: 0.75,
              delay: delay + i * stagger,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </p>
  );
}
