"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface LoadingScreenProps {
  onComplete?: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A0A0B]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Logo */}
          <motion.div
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#D4A853] to-[#B8922F] flex items-center justify-center mb-8"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.6,
              ease: [0.34, 1.56, 0.64, 1], // bounce effect
            }}
          >
            <span
              className="text-4xl font-bold text-[#0A0A0B] -translate-y-[1px]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              C
            </span>
          </motion.div>

          {/* Company name */}
          <motion.h1
            className="text-2xl font-bold text-[#F5F5F5] mb-12"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Carter Digitals
          </motion.h1>

          {/* Progress line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-[#D4A853] to-[#E8C97A]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
