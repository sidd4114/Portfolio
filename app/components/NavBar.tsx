"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personal } from "@/app/lib/data";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "nav-blur" : ""}`}
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="relative font-display font-black text-white text-sm tracking-[0.2em] uppercase"
            style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 900 }}
            whileHover={{ scale: 1.05 }}
            aria-label="Back to top"
          >
            SP
            <span className="absolute -bottom-0.5 left-0 w-full h-px bg-accent opacity-70" />
          </motion.a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className="group relative text-secondary text-xs tracking-widest uppercase font-medium hover:text-white transition-colors duration-300"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-400" />
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-5">
            <a href={personal.github} target="_blank" rel="noopener noreferrer"
              className="text-secondary text-xs tracking-widest uppercase hover:text-white transition-colors">
              GitHub
            </a>
            <a href="/resume.pdf" target="_blank"
              className="btn-red px-5 py-2.5 text-xs tracking-widest uppercase">
              Resume ↗
            </a>
          </div>

          {/* Hamburger */}
          <button className="md:hidden p-2 flex flex-col gap-[5px]" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <motion.span className="w-6 h-px bg-white block" animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} />
            <motion.span className="w-4 h-px bg-white block" animate={menuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }} transition={{ duration: 0.3 }} />
            <motion.span className="w-6 h-px bg-white block" animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-bg flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            {navLinks.map((l, i) => (
              <motion.button key={l.href} onClick={() => go(l.href)}
                className="text-5xl font-display font-black text-white tracking-tight"
                style={{ fontFamily: "Satoshi, sans-serif" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 + 0.2 }}>
                {l.label}
              </motion.button>
            ))}
            <motion.a href="/resume.pdf" target="_blank"
              className="mt-4 btn-red px-8 py-3 text-sm tracking-widest uppercase"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              Resume ↗
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
