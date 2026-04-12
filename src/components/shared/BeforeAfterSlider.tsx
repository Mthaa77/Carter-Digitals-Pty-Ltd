"use client";

import { useState, useRef, useCallback, useEffect, type PointerEvent as ReactPointerEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GripVertical, ArrowRight } from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

interface BeforeAfterItem {
  title: string;
  category: string;
  beforeLabel: string;
  afterLabel: string;
  beforeGradient: string; // e.g. "from-red-900/30 to-slate-900/40"
  afterGradient: string;  // e.g. "from-emerald-900/30 to-slate-900/40"
  stats: { label: string; value: string }[];
}

interface BeforeAfterSliderProps {
  items?: BeforeAfterItem[];
}

// ── Default Data ─────────────────────────────────────────────────────────────

const defaultItems: BeforeAfterItem[] = [
  {
    title: "Soshanguve Secondary School",
    category: "Education",
    beforeLabel: "No Website",
    afterLabel: "Full Digital Platform",
    beforeGradient: "from-red-950/40 via-slate-900/60 to-red-900/30",
    afterGradient: "from-emerald-950/30 via-teal-900/20 to-emerald-900/40",
    stats: [
      { label: "Enrollment Increase", value: "+340%" },
      { label: "Google Ranking", value: "Page 1" },
      { label: "Parent Engagement", value: "+85%" },
    ],
  },
  {
    title: "Mogale & Associates",
    category: "Legal",
    beforeLabel: "Outdated Site",
    afterLabel: "Authority Platform",
    beforeGradient: "from-red-950/30 via-stone-900/60 to-stone-900/40",
    afterGradient: "from-amber-950/30 via-yellow-900/20 to-amber-900/40",
    stats: [
      { label: "Client Inquiries", value: "3x Growth" },
      { label: "Load Speed", value: "0.8s" },
      { label: "Mobile Score", value: "98/100" },
    ],
  },
  {
    title: "Gateway Hospitality",
    category: "Hospitality",
    beforeLabel: "No Online Presence",
    afterLabel: "Booking Engine",
    beforeGradient: "from-red-950/30 via-stone-900/60 to-stone-900/40",
    afterGradient: "from-emerald-950/30 via-cyan-900/20 to-emerald-900/40",
    stats: [
      { label: "Revenue Impact", value: "R2.4M" },
      { label: "Occupancy Rate", value: "85%" },
      { label: "Guest Rating", value: "4.8★" },
    ],
  },
];

// ── Single Comparison Card ───────────────────────────────────────────────────

function ComparisonCard({ item, index }: { item: BeforeAfterItem; index: number }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      isDraggingRef.current = true;
      setIsDragging(true);
      updatePosition(e.clientX);

      const handlePointerMove = (ev: PointerEvent) => {
        if (!isDraggingRef.current) return;
        ev.preventDefault();
        updatePosition(ev.clientX);
      };

      const handlePointerUp = () => {
        isDraggingRef.current = false;
        setIsDragging(false);
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerup", handlePointerUp);
      };

      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handlePointerUp);
    },
    [updatePosition],
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isDraggingRef.current = false;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className="min-w-[320px] sm:min-w-[380px] md:min-w-0 flex-shrink-0"
    >
      <div className="overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#0F0F12] group">
        {/* ── Slider Area ─────────────────────────────────────────────── */}
        <div
          ref={containerRef}
          className="relative h-[280px] sm:h-[320px] select-none overflow-hidden cursor-ew-resize"
          onPointerDown={handlePointerDown}
          role="slider"
          aria-label={`Before and after comparison for ${item.title}`}
          aria-valuenow={Math.round(sliderPosition)}
          aria-valuemin={0}
          aria-valuemax={100}
          tabIndex={0}
        >
          {/* After side (right — full background, vibrant) */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${item.afterGradient} transition-colors duration-300`}
          >
            {/* Decorative grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(212,168,83,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,168,83,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Gold corner accent */}
            <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-[rgba(212,168,83,0.08)] blur-2xl" />

            {/* Category badge */}
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.15em] uppercase bg-[rgba(212,168,83,0.1)] text-[#D4A853] border border-[rgba(212,168,83,0.2)]">
              {item.category}
            </div>

            {/* After label */}
            <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#D4A853] bg-[rgba(212,168,83,0.1)] border border-[rgba(212,168,83,0.2)]">
              {item.afterLabel}
            </div>

            {/* Central after icon / decorative element */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.6, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-20 h-20 rounded-2xl bg-[rgba(212,168,83,0.08)] border border-[rgba(212,168,83,0.15)] flex items-center justify-center backdrop-blur-sm"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D4A853] to-[#B8922F]" />
                </motion.div>
                {/* Glow behind */}
                <div className="absolute inset-0 rounded-2xl bg-[#D4A853]/5 blur-xl" />
              </div>
            </div>
          </div>

          {/* Before side (left — clipped, muted/grayscale) */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${item.beforeGradient} transition-colors duration-300`}
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            {/* Grayscale noise texture */}
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.3)]" />
            <div className="absolute inset-0 opacity-30 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />

            {/* Red/muted corner glow */}
            <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-[rgba(239,68,68,0.06)] blur-2xl" />

            {/* Before label */}
            <div
              className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg text-xs font-semibold text-[rgba(245,245,245,0.6)] bg-[rgba(0,0,0,0.4)] border border-[rgba(255,255,255,0.08)] backdrop-blur-sm"
              style={{ opacity: sliderPosition > 20 ? 1 : 0 }}
            >
              {item.beforeLabel}
            </div>

            {/* Central before icon — broken/disabled look */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] border-dashed flex items-center justify-center">
                <div className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,0.05)] flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[rgba(255,255,255,0.2)]">
                    <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* ── Divider Line ───────────────────────────────────────────── */}
          <motion.div
            className="absolute top-0 bottom-0 z-20 pointer-events-none"
            style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
            animate={{ opacity: isDragging ? 1 : 0.9 }}
            transition={{ duration: 0.15 }}
          >
            {/* Gold vertical line */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-[#D4A853] to-transparent shadow-[0_0_12px_rgba(212,168,83,0.4)]" />

            {/* Handle circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
              <motion.div
                animate={{
                  scale: isDragging ? 1.2 : 1,
                  boxShadow: isDragging
                    ? "0 0 20px rgba(212,168,83,0.5), 0 0 40px rgba(212,168,83,0.2)"
                    : "0 0 10px rgba(212,168,83,0.3), 0 0 20px rgba(212,168,83,0.1)",
                }}
                transition={{ duration: 0.2 }}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4A853] to-[#B8922F] flex items-center justify-center shadow-lg cursor-ew-resize touch-none"
              >
                <GripVertical className="w-5 h-5 text-[#0A0A0B]" strokeWidth={2.5} />
              </motion.div>
            </div>
          </motion.div>

          {/* Drag hint overlay (fades out after first interaction) */}
          <AnimatePresence>
            {!isDragging && (
              <motion.div
                initial={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
              >
                <motion.div
                  animate={{ x: [-8, 8, -8] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="mt-24 px-4 py-2 rounded-full bg-[rgba(0,0,0,0.5)] backdrop-blur-sm border border-[rgba(255,255,255,0.08)] text-[rgba(245,245,245,0.5)] text-xs font-medium"
                >
                  ← Drag to compare →
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Card Info ────────────────────────────────────────────────── */}
        <div className="px-5 py-5 border-t border-[rgba(255,255,255,0.04)]">
          {/* Title */}
          <h3
            className="text-base sm:text-lg font-bold text-white mb-4 leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {item.title}
          </h3>

          {/* Stats */}
          <div className="space-y-2.5">
            {item.stats.map((stat, statIndex) => (
              <div
                key={statIndex}
                className="flex items-center justify-between group/stat"
              >
                <span className="text-xs sm:text-sm text-[rgba(245,245,245,0.5)]">
                  {stat.label}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base font-bold text-[#D4A853] tabular-nums">
                    {stat.value}
                  </span>
                  <ArrowRight className="w-3 h-3 text-[rgba(212,168,83,0.4)] opacity-0 -translate-x-1 transition-all duration-200 group-hover/stat:opacity-100 group-hover/stat:translate-x-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────

export function BeforeAfterSlider({ items = defaultItems }: BeforeAfterSliderProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    setCanScrollLeft(container.scrollLeft > 4);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 4,
    );
  }, []);

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (!container) return;
    container.addEventListener("scroll", checkScroll, { passive: true });
    const resizeObserver = new ResizeObserver(checkScroll);
    resizeObserver.observe(container);
    return () => {
      container.removeEventListener("scroll", checkScroll);
      resizeObserver.disconnect();
    };
  }, [checkScroll]);

  const scrollBy = useCallback((direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.7;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="w-full">
      {/* Mobile scroll container */}
      <div className="relative md:hidden">
        {/* Left arrow */}
        <AnimatePresence>
          {canScrollLeft && (
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              onClick={() => scrollBy("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-[#0A0A0B]/90 backdrop-blur-sm border border-[rgba(255,255,255,0.08)] flex items-center justify-center shadow-lg"
              aria-label="Scroll left"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white">
                <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Right arrow */}
        <AnimatePresence>
          {canScrollRight && (
            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onClick={() => scrollBy("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-[#0A0A0B]/90 backdrop-blur-sm border border-[rgba(255,255,255,0.08)] flex items-center justify-center shadow-lg"
              aria-label="Scroll right"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white">
                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Hide scrollbar with fade edges */}
        <div className="relative">
          {/* Left fade */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0A0A0B] to-transparent z-20 pointer-events-none" />
          )}
          {/* Right fade */}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0A0A0B] to-transparent z-20 pointer-events-none" />
          )}

          <div
            ref={scrollContainerRef}
            className="flex gap-5 overflow-x-auto pb-4 px-1 scrollbar-hide snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {items.map((item, i) => (
              <div key={i} className="snap-center">
                <ComparisonCard item={item} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <ComparisonCard key={i} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}

export default BeforeAfterSlider;

// ── Named Exports ────────────────────────────────────────────────────────────
export type { BeforeAfterItem };
export { defaultItems };
