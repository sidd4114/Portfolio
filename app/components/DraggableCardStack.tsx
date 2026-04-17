"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  PanInfo,
} from "framer-motion";
import { cn } from "@/app/lib/utils";

export interface DraggableCard {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  stack: string[];
  github: string;
  status: "Ongoing" | "Shipped";
}

interface DraggableCardStackProps {
  cards: DraggableCard[];
}

function CardItem({
  card,
  index,
  total,
  onDragEnd,
}: {
  card: DraggableCard;
  index: number;
  total: number;
  onDragEnd: (id: string) => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateZ = useTransform(x, [-200, 200], [-18, 18]);
  const opacity  = useTransform(x, [-200, 0, 200], [0, 1, 0]);
  const scale = 1 - index * 0.04;
  const yOffset = index * -12;

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 120 || Math.abs(info.offset.y) > 100) {
      onDragEnd(card.id);
    }
  };

  return (
    <motion.div
      className={cn(
        "absolute inset-0 rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing select-none",
        index === 0 ? "z-30" : index === 1 ? "z-20" : "z-10"
      )}
      style={{
        x: index === 0 ? x : 0,
        y: index === 0 ? y : yOffset,
        rotateZ: index === 0 ? rotateZ : index * 2,
        scale,
        opacity: index === 0 ? opacity : 1,
      }}
      drag={index === 0}
      dragConstraints={{ left: -200, right: 200, top: -150, bottom: 150 }}
      dragElastic={0.12}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.03 }}
    >
      {/* Card face */}
      <div className="glass-red w-full h-full p-7 flex flex-col justify-between relative overflow-hidden">
        {/* Shimmer on hover */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ background: "linear-gradient(135deg, rgba(224,45,60,0.06) 0%, transparent 50%)" }} />

        {/* Top */}
        <div>
          <div className="flex items-start justify-between gap-3 mb-4">
            <span className="section-label text-[10px]">{card.category}</span>
            <div className="flex items-center gap-2">
              {card.status === "Ongoing" ? (
                <span className="badge-ongoing text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse inline-block" />
                  Live
                </span>
              ) : (
                <span className="badge-shipped text-[10px]">Shipped</span>
              )}
              <span className="text-secondary/50 text-xs font-mono">{card.year}</span>
            </div>
          </div>

          <h3
            className="text-white text-2xl font-display font-bold leading-tight mt-2"
            style={{ fontFamily: "'Google Sans', sans-serif" }}
          >
            {card.title}
          </h3>
          <p className="text-secondary text-sm mt-1.5">{card.subtitle}</p>
        </div>

        {/* Stack pills */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {card.stack.map((t) => (
            <span key={t} className="skill-pill text-xs">{t}</span>
          ))}
        </div>

        {/* Bottom − drag hint only on top card */}
        {index === 0 && (
          <p className="mt-5 text-secondary/40 text-xs tracking-widest uppercase font-body">
            Drag to dismiss →
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function DraggableCardStack({ cards }: DraggableCardStackProps) {
  const [stack, setStack] = useState(cards);

  const dismiss = (id: string) => {
    setStack((prev) => {
      const idx = prev.findIndex((c) => c.id === id);
      if (idx === -1) return prev;
      // Move to back
      const next = [...prev];
      const [item] = next.splice(idx, 1);
      next.push(item);
      return next;
    });
  };

  return (
    <div className="relative w-[320px] h-[380px] mx-auto" aria-label="Draggable project cards">
      {stack.slice(0, 3).map((card, i) => (
        <CardItem
          key={card.id}
          card={card}
          index={i}
          total={Math.min(stack.length, 3)}
          onDragEnd={dismiss}
        />
      ))}
      <p className="absolute -bottom-8 left-0 right-0 text-center text-secondary/40 text-xs tracking-widest uppercase">
        {stack.length} projects · drag to browse
      </p>
    </div>
  );
}
