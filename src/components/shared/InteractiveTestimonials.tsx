"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ArrowUpRight } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  metric?: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    quote: "Carter Digitals transformed our school's digital presence. The new website has made it easier for parents to engage with us, and enrollment inquiries have increased significantly. They truly understood what a school of specialisation needs.",
    name: "School of Specialisation",
    role: "Soshanguve Secondary",
    company: "Gauteng, South Africa",
    metric: "Digital Transformation Partner",
  },
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter((part) => !["Dr.", "Adv.", "Mr.", "Mrs.", "Ms."].includes(part))
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

interface InteractiveTestimonialsProps {
  testimonials?: Testimonial[];
  autoRotateInterval?: number;
  className?: string;
}

export default function InteractiveTestimonials({
  testimonials = defaultTestimonials,
  autoRotateInterval = 6000,
  className = "",
}: InteractiveTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((prev) => {
        if (index < 0) return testimonials.length - 1;
        if (index >= testimonials.length) return 0;
        return index;
      });
    },
    [testimonials.length]
  );

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  // Auto-rotate
  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(goNext, autoRotateInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPaused, goNext, autoRotateInterval]);

  // Reset timer on manual navigation
  const handleManualSelect = (index: number) => {
    setActiveIndex(index);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (!isPaused) {
      intervalRef.current = setInterval(goNext, autoRotateInterval);
    }
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Client testimonials"
      aria-roledescription="carousel"
    >
      <div className="relative flex flex-col md:flex-row gap-6 md:gap-8 items-stretch">
        {/* Main Testimonial Card */}
        <div className="flex-1 relative">
          <div className="relative rounded-2xl bg-card border border-border p-8 md:p-12 overflow-hidden">
            {/* Background Gold Quotation Watermark */}
            <div className="absolute top-4 left-6 md:top-6 md:left-10 pointer-events-none select-none">
              <Quote
                className="w-24 h-24 md:w-32 md:h-32 text-[rgba(212,168,83,0.04)]"
                strokeWidth={1}
              />
            </div>

            {/* Progress bar for auto-rotation */}
            {!isPaused && (
              <motion.div
                className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#D4A853] to-[#E8C97A]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: autoRotateInterval / 1000, ease: "linear" }}
                key={activeIndex}
              />
            )}

            {/* Active Indicator Dots on mobile */}
            <div className="flex items-center gap-2 mb-6 md:hidden">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleManualSelect(idx)}
                  aria-label={`View testimonial ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    idx === activeIndex
                      ? "w-6 h-2 bg-[#D4A853]"
                      : "w-2 h-2 bg-foreground/10 hover:bg-foreground/20"
                  }`}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                className="relative z-10"
              >
                {/* Decorative Gold Quote Icon */}
                <div className="mb-6">
                  <Quote className="w-8 h-8 text-[#D4A853]" strokeWidth={2.5} />
                </div>

                {/* Testimonial Text */}
                <blockquote className="mb-8">
                  <p className="text-lg md:text-xl text-muted-foreground leading-[1.9] font-light">
                    &ldquo;{activeTestimonial.quote}&rdquo;
                  </p>
                </blockquote>

                {/* Metric Badge */}
                {activeTestimonial.metric && (
                  <div className="mb-6">
                    <span className="inline-flex items-center gap-1.5 bg-[rgba(212,168,83,0.08)] border border-[rgba(212,168,83,0.2)] text-[#D4A853] rounded-full px-3 py-1 text-sm font-medium">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      {activeTestimonial.metric}
                    </span>
                  </div>
                )}

                {/* Star Rating */}
                <div className="flex items-center gap-0.5 mb-6" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-[#D4A853] fill-[#D4A853]"
                    />
                  ))}
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  {/* Initials Avatar */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#D4A853] to-[#B8922F] flex items-center justify-center text-[#0A0A0B] font-semibold text-sm">
                    {getInitials(activeTestimonial.name)}
                  </div>
                  <div>
                    <p className="text-foreground font-semibold text-base font-['Space_Grotesk']">
                      {activeTestimonial.name}
                    </p>
                    <p className="text-muted-foreground text-sm mt-0.5">
                      {activeTestimonial.role}
                    </p>
                    <p className="text-muted-foreground/70 text-sm">
                      {activeTestimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Vertical Avatar Selector (desktop only) */}
        <div
          className="hidden md:flex flex-col items-center gap-3 py-4"
          role="tablist"
          aria-label="Select a testimonial"
        >
          {testimonials.map((testimonial, idx) => (
            <button
              key={idx}
              onClick={() => handleManualSelect(idx)}
              role="tab"
              aria-selected={idx === activeIndex}
              aria-label={`${testimonial.name} testimonial`}
              className={`
                group relative transition-all duration-300 rounded-full
                ${
                  idx === activeIndex
                    ? "border-2 border-[#D4A853] shadow-[0_0_12px_rgba(212,168,83,0.25)]"
                    : "border border-border hover:border-[rgba(212,168,83,0.4)]"
                }
              `}
            >
              {/* Active glow indicator */}
              {idx === activeIndex && (
                <motion.div
                  layoutId="activeTestimonialGlow"
                  className="absolute -inset-1 rounded-full bg-[rgba(212,168,83,0.1)]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              {/* Avatar circle with initials */}
              <div
                className={`
                  relative w-14 h-14 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300
                  ${
                    idx === activeIndex
                      ? "bg-gradient-to-br from-[#D4A853] to-[#B8922F] text-[#0A0A0B]"
                      : "bg-muted text-muted-foreground group-hover:text-[rgba(212,168,83,0.8)] group-hover:bg-[rgba(212,168,83,0.08)]"
                  }
                `}
              >
                {getInitials(testimonial.name)}
              </div>

              {/* Tooltip on hover (desktop) */}
              <div
                className={`
                  absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap
                  px-3 py-1.5 rounded-lg text-xs font-medium
                  transition-all duration-200 pointer-events-none
                  ${
                    idx === activeIndex
                      ? "opacity-100 bg-muted text-foreground border border-[rgba(212,168,83,0.2)]"
                      : "opacity-0 group-hover:opacity-100 bg-muted text-muted-foreground border border-border"
                  }
                `}
              >
                <span className="text-[#D4A853]">{testimonial.name}</span>
                <span className="text-muted-foreground/70 ml-1">— {testimonial.role}</span>
                {/* Arrow */}
                <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-muted" />
              </div>
            </button>
          ))}

          {/* Navigation Arrows */}
          <div className="mt-4 flex flex-col gap-2">
            <button
              onClick={goPrev}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-[#D4A853] hover:border-[rgba(212,168,83,0.3)] transition-all duration-200"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="rotate-90"
              >
                <path
                  d="M2 5L7 10L12 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={goNext}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-[#D4A853] hover:border-[rgba(212,168,83,0.3)] transition-all duration-200"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="-rotate-90"
              >
                <path
                  d="M2 5L7 10L12 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Arrows + Dots Row */}
      <div className="flex md:hidden items-center justify-between mt-4 px-2">
        <div className="flex gap-2">
          <button
            onClick={goPrev}
            aria-label="Previous testimonial"
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-[#D4A853] hover:border-[rgba(212,168,83,0.3)] transition-all duration-200"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M9 2L4 7L9 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={goNext}
            aria-label="Next testimonial"
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-[#D4A853] hover:border-[rgba(212,168,83,0.3)] transition-all duration-200"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M5 2L10 7L5 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <span className="text-xs text-muted-foreground">
          {activeIndex + 1} / {testimonials.length}
        </span>
      </div>
    </div>
  );
}
