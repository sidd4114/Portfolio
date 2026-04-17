"use client";

import { useEffect, useRef } from "react";

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

/** Scramble/decode reveal animation — inspired by Aceternity + Framer website */
export default function TextScramble({ text, className = "", delay = 0, speed = 30 }: TextScrambleProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let raf: ReturnType<typeof setTimeout>;
    const chars = text.toUpperCase().split("");

    const animate = () => {
      const output = chars
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < Math.floor(frame / 3)) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      el.textContent = output;
      if (frame < chars.length * 3) {
        frame++;
        raf = setTimeout(animate, speed);
      } else {
        el.textContent = text.toUpperCase();
      }
    };

    const timeout = setTimeout(animate, delay);
    return () => {
      clearTimeout(timeout);
      clearTimeout(raf);
    };
  }, [text, delay, speed]);

  return (
    <span ref={ref} className={`font-mono ${className}`} aria-label={text}>
      {text.toUpperCase()}
    </span>
  );
}
