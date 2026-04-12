"use client";

import { motion } from "framer-motion";

const skeletonVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export function PageTransitionSkeleton() {
  return (
    <motion.div
      variants={skeletonVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Gold accent shimmer bar at top */}
      <div className="h-1 w-24 rounded-full bg-gradient-to-r from-[#D4A853] via-[#E8C97A] to-[#D4A853] mb-8 animate-shimmer-gold" />

      {/* Hero skeleton */}
      <div className="relative rounded-2xl overflow-hidden mb-8">
        <div className="h-48 md:h-56 bg-[#131316] rounded-2xl border border-[rgba(255,255,255,0.04)] relative overflow-hidden">
          {/* Shimmer overlay */}
          <div className="absolute inset-0 animate-shimmer-gold rounded-2xl" />
          {/* Skeleton content lines */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
            {/* Label badge skeleton */}
            <div className="h-6 w-28 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.04)]" />
            {/* Title skeleton */}
            <div className="h-8 w-72 md:w-96 rounded-lg bg-[rgba(255,255,255,0.04)]" />
            {/* Subtitle skeleton */}
            <div className="h-4 w-56 md:w-72 rounded-lg bg-[rgba(255,255,255,0.03)]" />
            {/* Button skeletons */}
            <div className="flex gap-3 mt-2">
              <div className="h-10 w-36 rounded-xl bg-[rgba(212,168,83,0.08)] border border-[rgba(212,168,83,0.1)]" />
              <div className="h-10 w-36 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.04)]" />
            </div>
          </div>
        </div>
      </div>

      {/* Content card skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-32 rounded-2xl bg-[#131316] border border-[rgba(255,255,255,0.04)] relative overflow-hidden"
          >
            {/* Shimmer overlay */}
            <div className="absolute inset-0 animate-shimmer-gold rounded-2xl" style={{ animationDelay: `${i * 0.3}s` }} />
            {/* Skeleton content */}
            <div className="absolute inset-0 p-5 flex flex-col gap-3">
              {/* Icon circle */}
              <div className="w-10 h-10 rounded-xl bg-[rgba(212,168,83,0.06)] border border-[rgba(212,168,83,0.08)]" />
              {/* Title line */}
              <div className="h-3.5 w-3/4 rounded bg-[rgba(255,255,255,0.04)]" />
              {/* Description lines */}
              <div className="space-y-2 mt-1">
                <div className="h-2.5 w-full rounded bg-[rgba(255,255,255,0.03)]" />
                <div className="h-2.5 w-5/6 rounded bg-[rgba(255,255,255,0.02)]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom shimmer bar */}
      <div className="h-px w-full mt-8 bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.2)] to-transparent" />
    </motion.div>
  );
}
