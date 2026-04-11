"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useMotionValue, useSpring } from "framer-motion";

function useIsTouchDevice() {
  const subscribe = useCallback((callback: () => void) => {
    const query = window.matchMedia("(pointer: coarse)");
    query.addEventListener("change", callback);
    return () => query.removeEventListener("change", callback);
  }, []);

  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: coarse)").matches;
  }, []);

  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const isTouchDevice = useIsTouchDevice();

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const ringSpringConfig = { damping: 30, stiffness: 200, mass: 0.8 };

  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);
  const smoothRingX = useSpring(ringX, ringSpringConfig);
  const smoothRingY = useSpring(ringY, ringSpringConfig);

  const rafRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);
  const targetX = useRef(-100);
  const targetY = useRef(-100);
  const ringTargetX = useRef(-100);
  const ringTargetY = useRef(-100);
  const motionValuesRef = useRef({
    cursorX, cursorY, ringX, ringY,
    smoothX, smoothY, smoothRingX, smoothRingY,
  });
  useEffect(() => {
    motionValuesRef.current = {
      cursorX, cursorY, ringX, ringY,
      smoothX, smoothY, smoothRingX, smoothRingY,
    };
  });

  useEffect(() => {
    if (isTouchDevice) return;

    // Add cursor-none class to body
    document.body.classList.add("cursor-none");

    const animate = () => {
      const vals = motionValuesRef.current;

      targetX.current += (vals.cursorX.get() - targetX.current) * 0.15;
      targetY.current += (vals.cursorY.get() - targetY.current) * 0.15;
      ringTargetX.current += (vals.ringX.get() - ringTargetX.current) * 0.08;
      ringTargetY.current += (vals.ringY.get() - ringTargetY.current) * 0.08;

      vals.smoothX.set(targetX.current);
      vals.smoothY.set(targetY.current);
      vals.smoothRingX.set(ringTargetX.current);
      vals.smoothRingY.set(ringTargetY.current);

      rafRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);

      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Track mouse position
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Detect hover on interactive elements using event delegation
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest('[role="button"]') ||
        target.closest('[role="link"]') ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("select")
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const relatedTarget = e.relatedTarget as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest('[role="button"]') ||
        target.closest('[role="link"]')
      ) {
        // Check if we're still inside an interactive element
        if (
          relatedTarget &&
          (
            relatedTarget.tagName === "BUTTON" ||
            relatedTarget.tagName === "A" ||
            relatedTarget.closest("button") ||
            relatedTarget.closest("a") ||
            relatedTarget.closest('[role="button"]') ||
            relatedTarget.closest('[role="link"]')
          )
        ) {
          return;
        }
        setIsHovering(false);
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    // Start animation loop
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove("cursor-none");
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isTouchDevice, cursorX, cursorY, ringX, ringY]);

  if (isTouchDevice) return null;

  return (
    <div className="custom-cursor-container fixed inset-0 pointer-events-none z-[9999]">
      {/* Dot cursor */}
      <div
        className="absolute top-0 left-0 w-2 h-2 rounded-full bg-[#D4A853] mix-blend-difference -translate-x-1/2 -translate-y-1/2"
        style={{
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 2.5 : 1,
          transition: "opacity 0.2s, scale 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
          x: smoothX,
          y: smoothY,
        }}
      />
      {/* Ring cursor */}
      <div
        className="absolute top-0 left-0 w-8 h-8 rounded-full border border-[rgba(212,168,83,0.5)] -translate-x-1/2 -translate-y-1/2"
        style={{
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 0.6 : 1,
          borderColor: isHovering ? "rgba(212,168,83,0.8)" : "rgba(212,168,83,0.5)",
          transition: "opacity 0.2s, scale 0.3s cubic-bezier(0.25, 0.1, 0.25, 1), border-color 0.3s",
          x: smoothRingX,
          y: smoothRingY,
        }}
      />
    </div>
  );
}
