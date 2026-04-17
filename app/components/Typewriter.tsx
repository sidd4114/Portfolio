"use client";

import { useEffect, useRef, useState } from "react";

const WORDS = [
  "Full-Stack Developer",
  "AI/ML Engineer",
  "DSA Enthusiast",
  "Problem Solver",
  "Open-Source Contributor",
];

/**
 * Typewriter — cycles through words with a realistic keystroke animation
 * and blinking cursor. Google Sans bold for max impact.
 */
export default function Typewriter({ className = "" }: { className?: string }) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pause" | "deleting">("typing");
  const raf = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const word = WORDS[wordIdx];

    if (phase === "typing") {
      if (displayed.length < word.length) {
        raf.current = setTimeout(() => {
          setDisplayed(word.slice(0, displayed.length + 1));
        }, 75 + Math.random() * 60);
      } else {
        raf.current = setTimeout(() => setPhase("pause"), 1600);
      }
    } else if (phase === "pause") {
      raf.current = setTimeout(() => setPhase("deleting"), 100);
    } else {
      if (displayed.length > 0) {
        raf.current = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 40);
      } else {
        setWordIdx((i) => (i + 1) % WORDS.length);
        setPhase("typing");
      }
    }

    return () => {
      if (raf.current) {
        clearTimeout(raf.current);
      }
    };
  }, [displayed, phase, wordIdx]);

  return (
    <span className={className} aria-label={WORDS[wordIdx]}>
      <span style={{ fontFamily: "'Google Sans', sans-serif" }}>{displayed}</span>
      <span className="typewriter-cursor" aria-hidden="true" />
    </span>
  );
}
