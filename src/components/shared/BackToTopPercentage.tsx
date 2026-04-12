"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function BackToTopPercentage() {
  const [isVisible, setIsVisible] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const progressValue = useMotionValue(0);
  const progressSpring = useSpring(progressValue, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;

      setPercentage(Math.round(scrollPercentage));
      progressValue.set(scrollPercentage);
      setIsVisible(scrollTop > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [progressValue]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-4 md:right-6 z-40 group"
          aria-label="Back to top"
        >
          {/* Outer ring (progress circle) */}
          <div className="relative w-12 h-12">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
              {/* Background track */}
              <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
              {/* Progress arc */}
              <motion.circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="url(#goldGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 20}
                style={{
                  strokeDashoffset: progressSpring.get() * 0.01 * (2 * Math.PI * 20),
                  filter: "drop-shadow(0 0 4px rgba(212,168,83,0.4))",
                }}
              />
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E8C97A" />
                  <stop offset="50%" stopColor="#D4A853" />
                  <stop offset="100%" stopColor="#B8922F" />
                </linearGradient>
              </defs>
            </svg>
            {/* Inner button */}
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-[rgba(19,19,22,0.8)] backdrop-blur-sm border border-[rgba(255,255,255,0.08)] group-hover:border-[rgba(212,168,83,0.3)] transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[rgba(212,168,83,0.15)]">
              <span className="text-[10px] font-bold text-[#D4A853] tabular-nums" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {percentage}%
              </span>
            </div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
