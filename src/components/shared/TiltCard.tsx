"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltStrength?: number; // default 5
}

export function TiltCard({
  children,
  className = "",
  tiltStrength = 5,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [tiltStrength, -tiltStrength]),
    { stiffness: 300, damping: 30 }
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-tiltStrength, tiltStrength]),
    { stiffness: 300, damping: 30 }
  );

  const glarePosX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
  const glarePosY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);
  const glareOpacity = useSpring(0, { stiffness: 300, damping: 30 });

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  }

  function handleMouseEnter() {
    setHovering(true);
    glareOpacity.set(0.08);
  }

  function handleMouseLeave() {
    setHovering(false);
    mouseX.set(0);
    mouseY.set(0);
    glareOpacity.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
      {/* Glare highlight that follows cursor */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden"
        style={{
          opacity: glareOpacity,
          background:
            "radial-gradient(circle at var(--glare-x) var(--glare-y), rgba(212,168,83,0.5), transparent 60%)",
          "--glare-x": useTransform(glarePosX, (v) => `${v}%`),
          "--glare-y": useTransform(glarePosY, (v) => `${v}%`),
        } as React.CSSProperties}
      />
    </motion.div>
  );
}
