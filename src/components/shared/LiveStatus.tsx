"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Clock, Calendar } from "lucide-react";

export function LiveStatus() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed top-20 right-4 lg:right-6 z-30 hidden md:block">
      <AnimatePresence>
        {/* Main pill button */}
        <motion.div
          className="relative"
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          {/* Collapsed pill */}
          <motion.div
            layout
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full cursor-pointer"
            style={{
              background:
                "linear-gradient(135deg, rgba(15,15,18,0.85), rgba(20,20,24,0.75))",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(212,168,83,0.15)",
              boxShadow:
                "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03) inset",
            }}
          >
            {/* Green pulsing dot */}
            <div className="relative shrink-0">
              <span className="block w-2.5 h-2.5 rounded-full bg-[#22C55E] shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              <span className="absolute inset-0 block w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-ping opacity-40" />
            </div>

            <span className="text-[13px] font-medium text-[rgba(245,245,245,0.85)] whitespace-nowrap">
              Available for Projects
            </span>
          </motion.div>

          {/* Expanded info card */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{
                  duration: 0.25,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                className="absolute top-full right-0 mt-3 w-[260px] rounded-2xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(15,15,18,0.92), rgba(20,20,24,0.88))",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(212,168,83,0.12)",
                  boxShadow:
                    "0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03) inset, 0 0 40px rgba(212,168,83,0.04)",
                }}
              >
                {/* Gold accent line at top */}
                <div
                  className="h-[2px]"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, #D4A853, transparent)",
                  }}
                />

                {/* Header */}
                <div className="px-5 pt-4 pb-3 flex items-center gap-2.5">
                  <div className="relative shrink-0">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(212,168,83,0.15), rgba(212,168,83,0.05))",
                        border: "1px solid rgba(212,168,83,0.2)",
                      }}
                    >
                      <Activity className="w-4 h-4 text-[#D4A853]" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white leading-none">
                      Live Status
                    </p>
                    <p className="text-[11px] text-[rgba(245,245,245,0.4)] mt-0.5">
                      Updated just now
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="mx-5 h-[1px] bg-[rgba(255,255,255,0.06)]" />

                {/* Stats */}
                <div className="px-5 py-4 space-y-3">
                  {/* Projects in progress */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background: "rgba(212,168,83,0.08)",
                        border: "1px solid rgba(212,168,83,0.1)",
                      }}
                    >
                      <Activity className="w-3.5 h-3.5 text-[#D4A853]" />
                    </div>
                    <div>
                      <p className="text-[12px] text-[rgba(245,245,245,0.5)] leading-none">
                        In Progress
                      </p>
                      <p className="text-[13px] font-semibold text-white mt-0.5">
                        3 active projects
                      </p>
                    </div>
                  </div>

                  {/* Avg response time */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background: "rgba(212,168,83,0.08)",
                        border: "1px solid rgba(212,168,83,0.1)",
                      }}
                    >
                      <Clock className="w-3.5 h-3.5 text-[#D4A853]" />
                    </div>
                    <div>
                      <p className="text-[12px] text-[rgba(245,245,245,0.5)] leading-none">
                        Avg Response
                      </p>
                      <p className="text-[13px] font-semibold text-white mt-0.5">
                        ~2 hours
                      </p>
                    </div>
                  </div>

                  {/* Next available slot */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background: "rgba(212,168,83,0.08)",
                        border: "1px solid rgba(212,168,83,0.1)",
                      }}
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#D4A853]" />
                    </div>
                    <div>
                      <p className="text-[12px] text-[rgba(245,245,245,0.5)] leading-none">
                        Next Slot
                      </p>
                      <p className="text-[13px] font-semibold text-white mt-0.5">
                        Tomorrow
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer CTA */}
                <div
                  className="px-5 py-3"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent, rgba(212,168,83,0.04))",
                  }}
                >
                  <div
                    className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-[12px] font-semibold cursor-pointer transition-all duration-200"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(212,168,83,0.12), rgba(212,168,83,0.06))",
                      border: "1px solid rgba(212,168,83,0.2)",
                      color: "#D4A853",
                    }}
                  >
                    <span>Schedule a Call</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      className="transition-transform duration-200"
                    >
                      <path
                        d="M3 6H9M9 6L6.5 3.5M9 6L6.5 8.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
