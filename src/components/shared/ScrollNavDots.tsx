"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sectionLabels = [
  "Hero",
  "About",
  "Stats",
  "Tech",
  "Services",
  "Sectors",
  "Why Us",
  "Process",
  "Testimonials",
  "Projects",
  "Pricing",
  "Results",
  "Guarantee",
  "CTA",
];

export function ScrollNavDots() {
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
    };

    const sections = document.querySelectorAll("main > section, main > div > section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Array.from(sections).indexOf(entry.target);
            if (idx >= 0) setActiveSection(idx);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-10% 0px -60% 0px" }
    );

    // Observe after a delay to let DOM settle
    setTimeout(() => {
      const allSections = document.querySelectorAll("main > section, main > div > section");
      allSections.forEach((s) => observer.observe(s));
    }, 1000);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (index: number) => {
    const sections = document.querySelectorAll("main > section, main > div > section");
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-2"
        >
          {sectionLabels.slice(0, activeSection + 3).map((label, idx) => (
            <button
              key={label}
              onClick={() => scrollToSection(idx)}
              className="group relative flex items-center"
              aria-label={`Scroll to ${label}`}
            >
              {/* Tooltip */}
              <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap text-[10px] font-medium text-[#D4A853] bg-[#1A1A1F] border border-[rgba(212,168,83,0.2)] px-2 py-1 rounded-md">
                {label}
              </span>
              {/* Dot */}
              <div
                className={`scroll-dot rounded-full ${
                  idx === activeSection
                    ? "active w-1.5 h-6"
                    : "w-1.5 h-1.5 bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.4)]"
                }`}
              />
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
