"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  Phone,
  Twitter,
  Linkedin,
  Instagram,
  MessageCircle,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigation, type PageKey } from "@/lib/navigation";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

const navItems: { key: PageKey; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "about", label: "About" },
  { key: "services", label: "Services" },
  { key: "portfolio", label: "Portfolio" },
  { key: "packages", label: "Packages" },
  { key: "contact", label: "Contact" },
];

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Twitter, href: "https://x.com", label: "X / Twitter" },
  { icon: Phone, href: "tel:0724026893", label: "Phone" },
  { icon: MessageCircle, href: "https://wa.me/27724026893", label: "WhatsApp" },
];

/* ─── Framer Motion Variants ─── */

const drawerOverlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2, delay: 0.05 } },
};

const drawerPanelVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: {
      type: "spring",
      damping: 28,
      stiffness: 220,
      mass: 0.8,
    },
  },
  exit: {
    x: "100%",
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 260,
      mass: 0.8,
    },
  },
};

const navListVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.12,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

const navItemVariants = {
  hidden: {
    opacity: 0,
    x: 24,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 180,
    },
  },
  exit: {
    opacity: 0,
    x: 24,
    filter: "blur(4px)",
    transition: {
      duration: 0.15,
      ease: "easeIn",
    },
  },
};

const bottomSectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 160,
      delay: 0.45,
    },
  },
  exit: {
    opacity: 0,
    y: 16,
    transition: { duration: 0.12 },
  },
};

/* ─── Ripple Component ─── */
function Ripple({ x, y }: { x: number; y: number }) {
  return (
    <motion.span
      initial={{ scale: 0, opacity: 0.5 }}
      animate={{ scale: 4, opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute rounded-full bg-[rgba(212,168,83,0.25)] pointer-events-none"
      style={{
        width: 40,
        height: 40,
        left: x - 20,
        top: y - 20,
      }}
    />
  );
}

/* ─── Mobile Nav Item ─── */
function MobileNavItem({
  item,
  isActive,
  onClick,
}: {
  item: (typeof navItems)[number];
  isActive: boolean;
  onClick: (page: PageKey) => void;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleTap = useCallback(
    (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
      const btn = btnRef.current;
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      let clientX: number;
      let clientY: number;

      if ("touches" in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const id = Date.now();

      setRipples((prev) => [...prev, { id, x, y }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 700);

      onClick(item.key);
    },
    [item.key, onClick]
  );

  return (
    <motion.button
      ref={btnRef}
      variants={navItemVariants}
      onClick={handleTap}
      whileTap={{ scale: 0.97 }}
      className={`
        relative w-full text-left rounded-xl overflow-hidden
        transition-colors duration-200
        min-h-[56px] flex items-center pl-4 pr-4
        ${
          isActive
            ? "text-[#E8C97A] font-semibold"
            : "text-[rgba(245,245,245,0.7)] font-medium"
        }
      `}
    >
      {/* Glass-gold background for active item */}
      {isActive && (
        <motion.div
          layoutId="mobileActiveBg"
          className="absolute inset-0 rounded-xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(212,168,83,0.12) 0%, rgba(212,168,83,0.06) 100%)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(212,168,83,0.15)",
            boxShadow:
              "inset 0 1px 0 rgba(212,168,83,0.1), 0 0 20px rgba(212,168,83,0.04)",
          }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        />
      )}

      {/* Gold dot indicator on the left for active item */}
      {isActive && (
        <motion.span
          layoutId="mobileActiveDot"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full bg-gradient-to-b from-[#E8C97A] to-[#D4A853]"
          style={{
            boxShadow: "0 0 8px rgba(212,168,83,0.4)",
          }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        />
      )}

      {/* Gold sliding indicator bar on the right */}
      {isActive && (
        <motion.span
          layoutId="mobileActiveBar"
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-full bg-gradient-to-b from-[#E8C97A] via-[#D4A853] to-[#B8922F]"
          style={{
            boxShadow: "0 0 10px rgba(212,168,83,0.5), 0 0 20px rgba(212,168,83,0.2)",
          }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        />
      )}

      {/* Ripple effects */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <Ripple key={ripple.id} x={ripple.x} y={ripple.y} />
        ))}
      </AnimatePresence>

      {/* Label text */}
      <span className="relative z-10 text-[15px] tracking-[0.01em]">{item.label}</span>

      {/* Subtle arrow for active item */}
      {isActive && (
        <motion.span
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10 ml-auto"
        >
          <ArrowRight className="w-4 h-4 text-[#D4A853]" />
        </motion.span>
      )}
    </motion.button>
  );
}

/* ─── Main Navbar ─── */
export function Navbar() {
  const { currentPage, navigate, isMobileMenuOpen, setMobileMenuOpen } = useNavigation();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (page: PageKey) => {
    navigate(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* ─── Desktop / Mobile Header ─── */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-gold py-3 shadow-lg shadow-black/20"
            : "bg-transparent py-5"
        }`}
      >
        {/* Gold gradient bottom border line when scrolled */}
        {scrolled && (
          <div
            className="absolute bottom-0 left-0 right-0 h-[1px]"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(212,168,83,0.4) 50%, transparent 100%)",
            }}
          />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* ─── Logo ─── */}
            <button
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-3 group relative"
            >
              <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-[rgba(212,168,83,0.2)] group-hover:shadow-[rgba(212,168,83,0.4)] transition-shadow duration-300">
                <Image src="/images/carter-digitals-logo.png" alt="Carter Digitals" fill className="object-cover rounded-xl" />
                {/* Gold shimmer on hover */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer-gold pointer-events-none" />
              </div>
              <div className="flex flex-col">
                <span
                  className="text-lg font-bold tracking-tight text-white leading-none"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Carter
                </span>
                <span className="text-[10px] font-medium tracking-[0.2em] uppercase leading-none mt-0.5 text-gradient-gold">
                  Digitals
                </span>
              </div>
            </button>

            {/* ─── Desktop Navigation ─── */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.key)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg tracking-[0.02em] ${
                    currentPage === item.key
                      ? "text-gradient-gold"
                      : "text-[rgba(245,245,245,0.7)] hover:text-white hover:shadow-[0_0_12px_rgba(212,168,83,0.15)]"
                  }`}
                >
                  {item.label}
                  {currentPage === item.key && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-[rgba(212,168,83,0.1)] rounded-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {/* Gold bottom indicator for active item */}
                  {currentPage === item.key && (
                    <motion.div
                      layoutId="activeNavDot"
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-gradient-to-r from-[#E8C97A] to-[#D4A853]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* ─── CTA Buttons (Desktop) ─── */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Theme toggle button */}
              <ThemeToggle />
              {/* Phone pill */}
              <a
                href="tel:0724026893"
                className="flex items-center gap-2 text-sm bg-[rgba(212,168,83,0.06)] border border-[rgba(212,168,83,0.12)] rounded-full px-3 py-1 text-[rgba(245,245,245,0.7)] hover:text-[#D4A853] hover:border-[rgba(212,168,83,0.25)] transition-all duration-300 group"
              >
                <Phone className="w-4 h-4 text-[#D4A853] group-hover:text-[#E8C97A] transition-colors" />
                <span>072 402 6893</span>
              </a>
              {/* Get Started button with gold glow wrapper */}
              <div className="relative rounded-lg">
                <div className="absolute -inset-[1px] rounded-lg bg-gradient-to-r from-[#D4A853] to-[#B8922F] opacity-30 blur-sm group-hover:opacity-50 transition-opacity duration-300" />
                <Button
                  onClick={() => handleNavClick("contact")}
                  className="relative bg-gradient-to-r from-[#D4A853] to-[#B8922F] hover:from-[#E8C97A] hover:to-[#D4A853] text-[#0A0A0B] font-semibold text-sm px-5 py-2.5 rounded-lg shadow-lg shadow-[rgba(212,168,83,0.2)] hover:shadow-[rgba(212,168,83,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group overflow-hidden"
                >
                  {/* Gold shimmer overlay on hover */}
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer-gold pointer-events-none" />
                  <span className="relative flex items-center">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </Button>
              </div>
            </div>

            {/* ─── Mobile Hamburger Button ─── */}
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-[rgba(212,168,83,0.2)] hover:bg-[rgba(212,168,83,0.06)] transition-all duration-300 hover:shadow-[0_0_12px_rgba(212,168,83,0.1)]"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#D4A853]" />
              ) : (
                <Menu className="w-6 h-6 text-[#D4A853]" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ─── Enhanced Mobile Menu Drawer ─── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={drawerOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Overlay with enhanced backdrop blur */}
            <motion.div
              className="absolute inset-0 bg-black/70"
              style={{
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
              onClick={() => setMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            />

            {/* Drawer panel with spring animation */}
            <motion.div
              variants={drawerPanelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute right-0 top-0 bottom-0 w-[300px] flex flex-col"
              style={{
                background:
                  "linear-gradient(180deg, #0F0F12 0%, #0D0D10 50%, #0B0B0E 100%)",
                borderLeft: "1px solid rgba(212,168,83,0.08)",
              }}
            >
              {/* Premium gold gradient top line */}
              <div className="relative shrink-0">
                <div
                  className="h-[2px] w-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #B8922F 0%, #D4A853 30%, #E8C97A 50%, #D4A853 70%, #B8922F 100%)",
                    boxShadow: "0 0 20px rgba(212,168,83,0.3), 0 1px 40px rgba(212,168,83,0.15)",
                  }}
                />
                {/* Glow effect beneath gold line */}
                <div
                  className="absolute top-0 left-[10%] right-[10%] h-8 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(212,168,83,0.08) 0%, transparent 70%)",
                  }}
                />
              </div>

              {/* Logo + Company Name at top of drawer */}
              <div className="shrink-0 pt-5 pb-4 px-6">
                <button
                  onClick={() => handleNavClick("home")}
                  className="flex items-center gap-3 group"
                >
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-[rgba(212,168,83,0.2)]">
                    <Image src="/images/carter-digitals-logo.png" alt="Carter Digitals" fill className="object-cover rounded-xl" />
                  </div>
                  <div className="flex flex-col">
                    <span
                      className="text-lg font-bold tracking-tight text-white leading-none"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Carter
                    </span>
                    <span className="text-[10px] font-medium tracking-[0.2em] uppercase leading-none mt-0.5 text-gradient-gold">
                      Digitals
                    </span>
                  </div>
                </button>
              </div>

              {/* Subtle divider after logo */}
              <div
                className="mx-6 h-[1px] shrink-0"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
                }}
              />

              {/* Mobile nav links with staggered animations */}
              <nav className="flex-1 overflow-y-auto px-4 pt-4 gold-scrollbar">
                <motion.div
                  variants={navListVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col gap-1.5"
                >
                  {navItems.map((item) => (
                    <MobileNavItem
                      key={item.key}
                      item={item}
                      isActive={currentPage === item.key}
                      onClick={handleNavClick}
                    />
                  ))}
                </motion.div>
              </nav>

              {/* Bottom action area with glass-gold styling */}
              <motion.div
                variants={bottomSectionVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="shrink-0"
              >
                {/* Gold gradient divider */}
                <div
                  className="h-[1px] mx-6 mb-4"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(212,168,83,0.3) 50%, transparent 100%)",
                  }}
                />

                <div className="px-5 pb-4">
                  {/* Theme toggle (mobile) */}
                  <div className="mb-3">
                    <ThemeToggle variant="pill" showLabel />
                  </div>

                  {/* Phone number pill */}
                  <a
                    href="tel:0724026893"
                    className="flex items-center gap-2.5 text-sm text-[rgba(245,245,245,0.7)] hover:text-[#D4A853] transition-all duration-300 bg-[rgba(212,168,83,0.05)] border border-[rgba(212,168,83,0.12)] rounded-full px-3 py-2 hover:border-[rgba(212,168,83,0.25)] hover:bg-[rgba(212,168,83,0.08)]"
                  >
                    <Phone className="w-4 h-4 text-[#D4A853]" />
                    <span className="font-medium">072 402 6893</span>
                  </a>
                </div>

                {/* CTA Buttons area with glass-gold container */}
                <div
                  className="px-5 pb-4 pt-1 rounded-t-2xl"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(212,168,83,0.04) 0%, rgba(212,168,83,0.08) 100%)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    borderTop: "1px solid rgba(212,168,83,0.1)",
                  }}
                >
                  <div className="space-y-2.5">
                    {/* Schedule a Call — Primary gold gradient button */}
                    <motion.a
                      href="tel:0724026893"
                      whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(212,168,83,0.3)" }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", damping: 20, stiffness: 300 }}
                      className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4A853] to-[#B8922F] hover:from-[#E8C97A] hover:to-[#D4A853] text-[#0A0A0B] font-semibold text-sm transition-all duration-300 relative overflow-hidden group"
                    >
                      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer-gold pointer-events-none" />
                      <span className="relative flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Schedule a Call
                      </span>
                    </motion.a>

                    {/* WhatsApp Us — Secondary green-bordered button */}
                    <motion.a
                      href="https://wa.me/27724026893?text=Hi%20Carter%20Digitals%2C%20I%27d%20like%20to%20discuss%20a%20project."
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{
                        y: -2,
                        boxShadow: "0 8px 24px rgba(37,211,102,0.15)",
                      }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", damping: 20, stiffness: 300 }}
                      className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl border-2 border-[#25D366]/40 text-[#25D366] font-semibold text-sm transition-all duration-300 hover:border-[#25D366]/70 hover:bg-[rgba(37,211,102,0.06)] relative overflow-hidden"
                    >
                      <span className="relative flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        WhatsApp Us
                      </span>
                    </motion.a>
                  </div>
                </div>

                {/* Social media icons */}
                <div className="px-5 pb-6 pt-3">
                  <div className="flex items-center justify-center gap-3">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-9 h-9 rounded-full border border-[rgba(212,168,83,0.15)] bg-[rgba(212,168,83,0.04)] flex items-center justify-center text-[rgba(245,245,245,0.4)] hover:text-[#D4A853] hover:border-[rgba(212,168,83,0.35)] hover:bg-[rgba(212,168,83,0.08)] transition-all duration-300 hover:shadow-[0_0_12px_rgba(212,168,83,0.1)]"
                      >
                        <social.icon className="w-4 h-4" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
