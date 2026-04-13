"use client";

import React, { useMemo, useCallback, useSyncExternalStore } from "react";
import { motion } from "framer-motion";

interface CosmicDecorationsProps {
  variant?: "nebula" | "constellation" | "aurora" | "stardust" | "cosmic-ring";
  intensity?: "subtle" | "medium" | "vivid";
  className?: string;
}

const intensityMultiplier: Record<string, number> = {
  subtle: 0.5,
  medium: 1,
  vivid: 1.5,
};

// ---------------------------------------------------------------------------
// Seeded pseudo-random number generator for deterministic positions
// ---------------------------------------------------------------------------
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// ---------------------------------------------------------------------------
// Nebula Variant — drifting radial gradient blobs
// ---------------------------------------------------------------------------
function Nebula({ multiplier, prefersReducedMotion }: { multiplier: number; prefersReducedMotion: boolean }) {
  const blobs = useMemo(
    () => [
      {
        color: "#1a0533",
        baseOpacity: 0.15,
        size: "w-[500px] h-[500px] md:w-[700px] md:h-[700px]",
        top: "top-[-10%]",
        left: "left-[-5%]",
        animate: { x: [0, 30, -20, 0], y: [0, -25, 15, 0] },
        duration: 20,
      },
      {
        color: "#0a2e3d",
        baseOpacity: 0.1,
        size: "w-[400px] h-[400px] md:w-[600px] md:h-[600px]",
        top: "top-[30%]",
        left: "left-[50%]",
        animate: { x: [0, -25, 20, 0], y: [0, 20, -30, 0] },
        duration: 25,
      },
      {
        color: "#2d1f0a",
        baseOpacity: 0.08,
        size: "w-[350px] h-[350px] md:w-[500px] md:h-[500px]",
        top: "top-[60%]",
        left: "left-[20%]",
        animate: { x: [0, 20, -15, 0], y: [0, -15, 25, 0] },
        duration: 22,
      },
    ],
    [],
  );

  return (
    <>
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute ${blob.size} ${blob.top} ${blob.left} rounded-full pointer-events-none`}
          style={{
            background: `radial-gradient(ellipse at center, ${blob.color} ${Math.min(blob.baseOpacity * multiplier, 1).toFixed(3)}, transparent 70%)`,
            filter: "blur(60px)",
          }}
          animate={prefersReducedMotion ? {} : blob.animate}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  duration: blob.duration,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }
          }
        />
      ))}
    </>
  );
}

// ---------------------------------------------------------------------------
// Constellation Variant — dots connected by faint lines (SVG)
// ---------------------------------------------------------------------------
function Constellation({ multiplier }: { multiplier: number }) {
  const dotColor = `rgba(212,168,83,${(0.15 * multiplier).toFixed(3)})`;
  const lineColor = `rgba(212,168,83,${(0.06 * multiplier).toFixed(3)})`;

  // Pre-defined constellation points (viewBox 0 0 400 300)
  const points = useMemo(
    () => [
      { cx: 50, cy: 40 },
      { cx: 140, cy: 80 },
      { cx: 220, cy: 30 },
      { cx: 310, cy: 90 },
      { cx: 180, cy: 160 },
      { cx: 260, cy: 200 },
      { cx: 350, cy: 250 },
      { cx: 80, cy: 230 },
    ],
    [],
  );

  // Edges connecting the dots
  const edges = useMemo(
    () => [
      [0, 1],
      [1, 2],
      [2, 3],
      [1, 4],
      [2, 4],
      [4, 5],
      [5, 6],
      [4, 7],
      [0, 7],
    ],
    [],
  );

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Lines */}
      {edges.map(([a, b], i) => (
        <line
          key={`line-${i}`}
          x1={points[a].cx}
          y1={points[a].cy}
          x2={points[b].cx}
          y2={points[b].cy}
          stroke={lineColor}
          strokeWidth="1"
        />
      ))}
      {/* Dots with subtle pulse */}
      {points.map((p, i) => (
        <motion.circle
          key={`dot-${i}`}
          cx={p.cx}
          cy={p.cy}
          r="2.5"
          fill={dotColor}
          animate={{
            opacity: [0.6, 1, 0.6],
            r: [2.5, 3.5, 2.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Aurora Variant — flowing wavy gradient band (SVG with animated gradient)
// ---------------------------------------------------------------------------
function Aurora({ multiplier, prefersReducedMotion }: { multiplier: number; prefersReducedMotion: boolean }) {
  const gradientId = useMemo(() => "auroraGradient", []);

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="none"
      viewBox="0 0 1200 400"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1a0533" stopOpacity={(0.06 * multiplier).toFixed(3)} />
          <stop offset="30%" stopColor="#0f0a2e" stopOpacity={(0.05 * multiplier).toFixed(3)} />
          <stop offset="55%" stopColor="#2d1f0a" stopOpacity={(0.04 * multiplier).toFixed(3)} />
          <stop offset="80%" stopColor="#1a2a3d" stopOpacity={(0.05 * multiplier).toFixed(3)} />
          <stop offset="100%" stopColor="#1a0533" stopOpacity={(0.03 * multiplier).toFixed(3)} />
        </linearGradient>
        <filter id="auroraBlur">
          <feGaussianBlur stdDeviation="20" />
        </filter>
      </defs>
      <motion.g filter="url(#auroraBlur)">
        {/* Primary wave */}
        <motion.path
          d="M0,200 C150,120 350,280 500,180 C650,80 850,260 1000,200 C1100,160 1150,190 1200,200 L1200,300 C1100,290 1000,320 850,280 C650,230 450,330 250,270 C100,230 50,260 0,280 Z"
          fill={`url(#${gradientId})`}
          animate={
            prefersReducedMotion
              ? {}
              : {
                  d: [
                    "M0,200 C150,120 350,280 500,180 C650,80 850,260 1000,200 C1100,160 1150,190 1200,200 L1200,300 C1100,290 1000,320 850,280 C650,230 450,330 250,270 C100,230 50,260 0,280 Z",
                    "M0,220 C150,280 350,120 500,220 C650,320 850,140 1000,220 C1100,260 1150,210 1200,220 L1200,320 C1100,310 1000,280 850,300 C650,330 450,230 250,290 C100,270 50,240 0,260 Z",
                    "M0,200 C150,120 350,280 500,180 C650,80 850,260 1000,200 C1100,160 1150,190 1200,200 L1200,300 C1100,290 1000,320 850,280 C650,230 450,330 250,270 C100,230 50,260 0,280 Z",
                  ],
                }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  duration: 12,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }
          }
        />
        {/* Secondary thinner wave for depth */}
        <motion.path
          d="M0,240 C200,180 400,300 600,220 C800,140 1000,280 1200,240 L1200,280 C1000,320 800,180 600,260 C400,340 200,220 0,280 Z"
          fill={`url(#${gradientId})`}
          opacity={0.5}
          animate={
            prefersReducedMotion
              ? {}
              : {
                  d: [
                    "M0,240 C200,180 400,300 600,220 C800,140 1000,280 1200,240 L1200,280 C1000,320 800,180 600,260 C400,340 200,220 0,280 Z",
                    "M0,220 C200,300 400,160 600,250 C800,340 1000,180 1200,230 L1200,260 C1000,300 800,220 600,240 C400,260 200,300 0,250 Z",
                    "M0,240 C200,180 400,300 600,220 C800,140 1000,280 1200,240 L1200,280 C1000,320 800,180 600,260 C400,340 200,220 0,280 Z",
                  ],
                }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  duration: 16,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }
          }
        />
      </motion.g>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Stardust Variant — scattered tiny sparkle dots with CSS twinkle
// ---------------------------------------------------------------------------
function Stardust({ multiplier, prefersReducedMotion }: { multiplier: number; prefersReducedMotion: boolean }) {
  const sparkles = useMemo(() => {
    const rng = seededRandom(42);
    const count = 18;
    const dots: { x: number; y: number; size: number; delay: number; isGold: boolean }[] = [];
    for (let i = 0; i < count; i++) {
      dots.push({
        x: rng() * 100,
        y: rng() * 100,
        size: rng() > 0.5 ? 2 : 1.5,
        delay: rng() * 4,
        isGold: rng() > 0.4,
      });
    }
    return dots;
  }, []);

  return (
    <>
      <style>{`
        @keyframes cosmicTwinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }
        .cosmic-twinkle {
          animation: cosmicTwinkle 3s ease-in-out infinite;
        }
        .cosmic-twinkle-paused {
          animation: none;
          opacity: 0.6;
        }
      `}</style>
      {sparkles.map((s, i) => {
        const baseOpacity = s.isGold ? 0.6 : 0.4;
        const color = s.isGold ? `rgba(212,168,83,${(baseOpacity * multiplier).toFixed(2)})` : `rgba(255,255,255,${(baseOpacity * multiplier).toFixed(2)})`;
        return (
          <div
            key={i}
            className={`absolute rounded-full pointer-events-none ${prefersReducedMotion ? "cosmic-twinkle-paused" : "cosmic-twinkle"}`}
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              backgroundColor: color,
              boxShadow: s.isGold
                ? `0 0 ${4 * multiplier}px rgba(212,168,83,${(0.3 * multiplier).toFixed(2)})`
                : `0 0 ${3 * multiplier}px rgba(255,255,255,${(0.2 * multiplier).toFixed(2)})`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${2.5 + s.delay * 0.5}s`,
            }}
          />
        );
      })}
    </>
  );
}

// ---------------------------------------------------------------------------
// Cosmic Ring Variant — large rotating dashed orbit circle (SVG)
// ---------------------------------------------------------------------------
function CosmicRing({ multiplier, prefersReducedMotion }: { multiplier: number; prefersReducedMotion: boolean }) {
  const strokeColor = `rgba(212,168,83,${(0.08 * multiplier).toFixed(3)})`;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 600 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Primary ring */}
      <motion.g
        style={{ originX: "300px", originY: "300px" }}
        animate={
          prefersReducedMotion
            ? {}
            : { rotate: 360 }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : {
                duration: 60,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              }
        }
      >
        <circle
          cx="300"
          cy="300"
          r="250"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1"
          strokeDasharray="12 8"
        />
      </motion.g>
      {/* Secondary ring — tilted perspective */}
      <motion.g
        style={{ originX: "300px", originY: "300px" }}
        animate={
          prefersReducedMotion
            ? {}
            : { rotate: -360 }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : {
                duration: 90,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              }
        }
      >
        <ellipse
          cx="300"
          cy="300"
          rx="220"
          ry="120"
          fill="none"
          stroke={strokeColor}
          strokeWidth="0.75"
          strokeDasharray="8 12"
          transform="rotate(-20 300 300)"
        />
      </motion.g>
      {/* Small gold dot orbiting the primary ring */}
      {!prefersReducedMotion && (
        <motion.circle
          cx="300"
          cy="50"
          r="3"
          fill={`rgba(212,168,83,${(0.2 * multiplier).toFixed(3)})`}
          style={{ originX: "300px", originY: "300px" }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 60,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
        />
      )}
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
export default function CosmicDecorations({
  variant = "nebula",
  intensity = "medium",
  className = "",
}: CosmicDecorationsProps) {
  const multiplier = intensityMultiplier[intensity];

  const subscribe = useCallback((callback: () => void) => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", callback);
    return () => mq.removeEventListener("change", callback);
  }, []);

  const getSnapshot = useCallback(() => {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const getServerSnapshot = useCallback(() => false, []);

  const prefersReducedMotion = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const renderVariant = () => {
    switch (variant) {
      case "nebula":
        return <Nebula multiplier={multiplier} prefersReducedMotion={prefersReducedMotion} />;
      case "constellation":
        return <Constellation multiplier={multiplier} />;
      case "aurora":
        return <Aurora multiplier={multiplier} prefersReducedMotion={prefersReducedMotion} />;
      case "stardust":
        return <Stardust multiplier={multiplier} prefersReducedMotion={prefersReducedMotion} />;
      case "cosmic-ring":
        return <CosmicRing multiplier={multiplier} prefersReducedMotion={prefersReducedMotion} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden z-0 ${className}`}
      aria-hidden="true"
    >
      {renderVariant()}
    </div>
  );
}
