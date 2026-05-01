"use client";
import React, { useEffect, useRef, useState } from "react";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface CarouselProps {
  items: React.ReactNode[];
  initialScroll?: number;
}

type CardData = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
};

const MOBILE_CARD_WIDTH = 320;
const DESKTOP_CARD_WIDTH = 448;
const DESKTOP_CARD_HEIGHT = 704;
const CARD_GAP = 16;

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [maxStep, setMaxStep] = useState(0);
  const [maxTranslate, setMaxTranslate] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const wheelDeltaRef = useRef(0);
  const wheelLockRef = useRef(false);
  const wheelUnlockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    return () => {
      if (wheelUnlockTimerRef.current) {
        clearTimeout(wheelUnlockTimerRef.current);
      }
    };
  }, []);

  const cardWidth = isMobile ? MOBILE_CARD_WIDTH : DESKTOP_CARD_WIDTH;
  const maxIndex = Math.max(0, items.length - 1);
  const stepWidth = cardWidth + CARD_GAP;

  useEffect(() => {
    const nextIndex = Math.min(Math.max(initialScroll, 0), maxIndex);
    setCurrentIndex(nextIndex);
  }, [initialScroll, maxIndex]);

  useEffect(() => {
    const updateBounds = () => {
      const viewportWidth = viewportRef.current?.clientWidth ?? 0;
      const trackWidth = items.length * cardWidth + Math.max(0, items.length - 1) * CARD_GAP + 32;
      const nextMaxTranslate = Math.max(0, trackWidth - viewportWidth);
      const nextMaxStep = Math.max(0, Math.ceil(nextMaxTranslate / stepWidth));

      setMaxTranslate(nextMaxTranslate);
      setMaxStep(nextMaxStep);
      setCurrentIndex((prev) => Math.min(prev, nextMaxStep));
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, [items.length, cardWidth, stepWidth]);

  useEffect(() => {
    setCanScrollLeft(currentIndex > 0);
    setCanScrollRight(currentIndex < maxStep);
  }, [currentIndex, maxStep]);

  const scrollLeft = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
  const scrollRight = () => setCurrentIndex((prev) => Math.min(maxStep, prev + 1));

  const handleWheel: React.WheelEventHandler<HTMLDivElement> = (event) => {
    // Use horizontal trackpad gestures, and Shift+wheel as a fallback.
    const directionalDelta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.shiftKey
          ? event.deltaY
          : 0;

    if (!directionalDelta) {
      return;
    }

    event.preventDefault();
    wheelDeltaRef.current += directionalDelta;

    if (wheelLockRef.current) {
      return;
    }

    if (Math.abs(wheelDeltaRef.current) < 40) {
      return;
    }

    if (wheelDeltaRef.current > 0) {
      scrollRight();
    } else {
      scrollLeft();
    }

    wheelDeltaRef.current = 0;
    wheelLockRef.current = true;
    if (wheelUnlockTimerRef.current) {
      clearTimeout(wheelUnlockTimerRef.current);
    }
    wheelUnlockTimerRef.current = setTimeout(() => {
      wheelLockRef.current = false;
    }, 180);
  };

  return (
    <div className="relative w-full">
      <div
        ref={viewportRef}
        className="overflow-hidden py-10 md:py-20"
        onWheel={handleWheel}
        aria-label="Scrollable achievement cards"
      >
        <motion.div
          className="flex w-max flex-row items-stretch justify-start gap-4 px-4"
          animate={{ x: -Math.min(currentIndex * stepWidth, maxTranslate) }}
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
        >
          {items.map((item, index) => (
            <motion.div
              key={"card" + index}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.45, delay: 0.1 * index, ease: "easeOut" },
              }}
              className="h-full w-80 shrink-0 rounded-[2rem] md:w-[28rem]"
            >
              {item}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          className={cn(
            "relative z-40 flex h-10 w-10 items-center justify-center rounded-full transition",
            canScrollLeft
              ? "bg-white/90 text-black shadow-lg shadow-black/20"
              : "bg-white/20 text-white/40",
          )}
          onClick={scrollLeft}
          disabled={!canScrollLeft}
          aria-label="Scroll cards left"
        >
          <IconArrowNarrowLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          className={cn(
            "relative z-40 flex h-10 w-10 items-center justify-center rounded-full transition",
            canScrollRight
              ? "bg-white/90 text-black shadow-lg shadow-black/20"
              : "bg-white/20 text-white/40",
          )}
          onClick={scrollRight}
          disabled={!canScrollRight}
          aria-label="Scroll cards right"
        >
          <IconArrowNarrowRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: CardData;
  index: number;
  layout?: boolean;
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleExpanded();
    }
  };

  return (
    <div className="h-[35rem] w-80 md:h-[44rem] md:w-[28rem]">
      <motion.div
        layoutId={layout ? `card-${card.title}` : undefined}
        role="button"
        tabIndex={0}
        onClick={toggleExpanded}
        onKeyDown={handleKeyDown}
        whileHover={{ y: -8, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
        className="group relative h-full w-full cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black md:h-[44rem]"
        aria-label={`Toggle details for card ${index + 1}: ${card.title}`}
      >
        <BlurImage
          src={card.src}
          alt={card.title}
          className="absolute inset-0 z-10 object-cover"
        />
        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-black/55 via-black/20 to-black/80" />
        <div className="pointer-events-none absolute inset-0 z-30 bg-[radial-gradient(120%_70%_at_20%_0%,rgba(255,255,255,0.16),transparent)] opacity-60 transition-opacity duration-300 group-hover:opacity-90" />

        <div className="relative z-40 p-7 md:p-8">
          <p className="text-left text-sm font-medium tracking-wide text-white/85 md:text-base">
            {card.category}
          </p>
          <p className="mt-2 max-w-xs text-left text-[2.05rem] font-semibold leading-[1.08] text-white md:max-w-sm md:text-[3rem]">
            {card.title}
          </p>
        </div>

        <motion.div
          initial={false}
          animate={{ y: expanded ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 240, damping: 30 }}
          className="absolute inset-0 z-50 flex flex-col rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#202639] via-[#151a28] to-[#0d111b] p-6 text-white shadow-[0_25px_60px_rgba(0,0,0,0.55)]"
        >
          <div className="inline-flex w-fit rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/75">
            {card.category}
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-white md:text-[2rem]">
            {card.title}
          </h3>
          <div className="mt-5 flex-1 overflow-auto pr-1 [mask-image:linear-gradient(to_bottom,black_85%,transparent)]">
            {card.content}
          </div>
          <p className="mt-4 text-xs tracking-[0.14em] text-white/55">
            Tap card to close details
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export const BlurImage = ({
  src,
  className,
  alt,
}: {
  src: string;
  className?: string;
  alt?: string;
}) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <img
      className={cn("h-full w-full transition duration-300", isLoading ? "blur-sm" : "blur-0", className)}
      onLoad={() => setLoading(false)}
      src={src}
      width={DESKTOP_CARD_WIDTH}
      height={DESKTOP_CARD_HEIGHT}
      loading="lazy"
      decoding="async"
      alt={alt ? alt : "Apple-style feature card image"}
    />
  );
};
