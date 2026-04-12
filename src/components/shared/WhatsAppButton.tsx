"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <AnimatePresence>
            <motion.a
              href="https://wa.me/27724026893?text=Hi%20Carter%20Digitals%2C%20I%27d%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with us on WhatsApp"
              className="fixed bottom-24 right-8 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-[rgba(37,211,102,0.3)] hover:shadow-[rgba(37,211,102,0.5)] hover:scale-110 transition-all duration-300 group"
              initial={{ opacity: 0, scale: 0, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 1.2,
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Pulse ring animation */}
              <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />

              {/* Second pulse ring - staggered */}
              <motion.span
                className="absolute inset-0 rounded-full border-2 border-[#25D366]"
                animate={{
                  scale: [1, 1.6],
                  opacity: [0.4, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />

              {/* WhatsApp Icon */}
              <MessageCircle className="w-6 h-6 relative z-10" />
            </motion.a>
          </AnimatePresence>
        </TooltipTrigger>
        <TooltipContent
          side="left"
          className="bg-[#131316] border border-[rgba(255,255,255,0.1)] text-[#F5F5F5] text-sm font-medium px-3 py-1.5"
        >
          Chat with us
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
