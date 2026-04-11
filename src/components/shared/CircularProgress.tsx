"use client";

import { useEffect, useRef, useState } from "react";

interface CircularProgressProps {
  value: number; // 0-100
  label: string;
  suffix?: string;
  icon?: React.ReactNode;
  size?: number; // px
  strokeWidth?: number;
  duration?: number; // ms
  color?: string;
}

export function CircularProgress({
  value,
  label,
  suffix = "%",
  icon,
  size = 140,
  strokeWidth = 6,
  duration = 2000,
  color = "#D4A853",
}: CircularProgressProps) {
  const [currentValue, setCurrentValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (currentValue / 100) * circumference;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            const startTime = Date.now();
            const animate = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease out cubic
              const eased = 1 - Math.pow(1 - progress, 3);
              setCurrentValue(Math.round(eased * value));
              if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
          }, 200);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background circle */}
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: "stroke-dashoffset 0.1s ease-out",
              filter: `drop-shadow(0 0 6px ${color}40)`,
            }}
          />
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {icon && <div className="mb-1 text-[rgba(245,245,245,0.4)]">{icon}</div>}
          <span
            className="text-2xl md:text-3xl font-extrabold text-gradient-gold counter-glow"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {currentValue}
            <span className="text-lg md:text-xl text-[rgba(245,245,245,0.4)] ml-0.5">{suffix}</span>
          </span>
        </div>
      </div>
      <p className="text-sm md:text-base text-[rgba(245,245,245,0.6)] font-medium text-center leading-tight">
        {label}
      </p>
    </div>
  );
}
