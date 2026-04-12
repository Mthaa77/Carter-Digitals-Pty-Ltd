"use client";

import { useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "md";
  showLabel?: boolean;
  variant?: "icon" | "pill";
}

export function ThemeToggle({
  className = "",
  size = "md",
  showLabel = false,
  variant = "icon",
}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) {
    // Skeleton placeholder to prevent layout shift
    return (
      <div
        className={`${size === "sm" ? "w-8 h-8" : "w-9 h-9"} rounded-lg animate-pulse bg-[rgba(212,168,83,0.1)] ${className}`}
      />
    );
  }

  const isDark = theme === "dark";
  const sizeClasses = size === "sm" ? "w-8 h-8" : "w-9 h-9";
  const iconSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";

  const handleClick = () => {
    setTheme(isDark ? "light" : "dark");
  };

  if (variant === "pill") {
    return (
      <button
        onClick={handleClick}
        className={`theme-toggle-btn flex items-center gap-2.5 text-sm rounded-full px-3 py-1.5 font-medium ${className}`}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="sun"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.25 }}
            >
              <Sun className={`${iconSize} text-[#D4A853]`} />
            </motion.span>
          ) : (
            <motion.span
              key="moon"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.25 }}
            >
              <Moon className={`${iconSize} text-[#D4A853]`} />
            </motion.span>
          )}
        </AnimatePresence>
        {showLabel && (
          <span className="text-[rgba(245,245,245,0.7)]">
            {isDark ? "Light Mode" : "Dark Mode"}
          </span>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`theme-toggle-btn ${sizeClasses} rounded-lg flex items-center justify-center text-[rgba(245,245,245,0.7)] hover:text-[#D4A853] ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className={iconSize} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className={iconSize} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
