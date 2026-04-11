"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function LiveChatIndicator() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    window.open("https://wa.me/27724026893?text=Hi%20Carter%20Digitals%2C%20I%27d%20like%20to%20chat%20about%20a%20project.", "_blank");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          className="fixed bottom-28 right-4 md:right-6 z-40 hidden md:block"
        >
          <button
            onClick={handleClick}
            className="group flex items-center gap-3 px-4 py-3 rounded-2xl glass-gold-premium hover:bg-[rgba(212,168,83,0.08)] transition-all duration-300 max-w-[240px]"
          >
            {/* Pulse dot */}
            <div className="relative shrink-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center shadow-lg shadow-[rgba(37,211,102,0.3)]">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#25D366] animate-live-pulse" />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-white">We&apos;re Online</p>
              <p className="text-[10px] text-[rgba(245,245,245,0.4)]">Chat with us now</p>
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
