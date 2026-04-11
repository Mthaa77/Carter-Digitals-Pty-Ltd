"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Phone, Twitter, Linkedin, Instagram, MessageCircle } from "lucide-react";
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
              <div className="animate-pulse-glow relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4A853] to-[#B8922F] flex items-center justify-center shadow-lg shadow-[rgba(212,168,83,0.2)] group-hover:shadow-[rgba(212,168,83,0.4)] transition-shadow duration-300">
                <span
                  className="text-[#0A0A0B] font-bold text-lg tracking-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  C
                </span>
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

      {/* ─── Mobile Menu Drawer ─── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[300px] bg-[#0F0F12] border-l border-[rgba(255,255,255,0.06)] flex flex-col"
            >
              {/* Gold gradient top line */}
              <div
                className="h-[2px] w-full shrink-0"
                style={{
                  background:
                    "linear-gradient(90deg, #B8922F 0%, #D4A853 40%, #E8C97A 50%, #D4A853 60%, #B8922F 100%)",
                }}
              />

              {/* Logo + Company Name at top of drawer */}
              <div className="shrink-0 pt-6 pb-4 px-6">
                <button
                  onClick={() => handleNavClick("home")}
                  className="flex items-center gap-3 group"
                >
                  <div className="animate-pulse-glow relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4A853] to-[#B8922F] flex items-center justify-center shadow-lg shadow-[rgba(212,168,83,0.2)]">
                    <span
                      className="text-[#0A0A0B] font-bold text-lg tracking-tight"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      C
                    </span>
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

              {/* Mobile nav links */}
              <nav className="flex-1 overflow-y-auto px-6 pt-2">
                <div className="flex flex-col gap-1">
                  {navItems.map((item, i) => (
                    <motion.button
                      key={item.key}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => handleNavClick(item.key)}
                      className={`text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                        currentPage === item.key
                          ? "text-gradient-gold bg-[rgba(212,168,83,0.1)] border border-[rgba(212,168,83,0.1)]"
                          : "text-[rgba(245,245,245,0.7)] hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </div>
              </nav>

              {/* Bottom section: divider + phone + CTA + socials */}
              <div className="shrink-0 px-6 pb-6">
                {/* Gold divider line */}
                <div
                  className="h-[1px] w-full mb-5"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(212,168,83,0.3) 50%, transparent 100%)",
                  }}
                />

                <div className="space-y-3">
                  {/* Theme toggle (mobile) */}
                  <ThemeToggle variant="pill" showLabel />

                  {/* Phone */}
                  <a
                    href="tel:0724026893"
                    className="flex items-center gap-3 text-sm text-[rgba(245,245,245,0.7)] hover:text-[#D4A853] transition-colors bg-[rgba(212,168,83,0.06)] border border-[rgba(212,168,83,0.12)] rounded-full px-3 py-1.5"
                  >
                    <Phone className="w-4 h-4 text-[#D4A853]" />
                    072 402 6893
                  </a>

                  {/* Get Started CTA */}
                  <Button
                    onClick={() => handleNavClick("contact")}
                    className="w-full bg-gradient-to-r from-[#D4A853] to-[#B8922F] hover:from-[#E8C97A] hover:to-[#D4A853] text-[#0A0A0B] font-semibold relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer-gold pointer-events-none" />
                    <span className="relative flex items-center justify-center">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </Button>
                </div>

                {/* Social media icons */}
                <div className="flex items-center justify-center gap-4 mt-5 pt-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-9 h-9 rounded-full border border-[rgba(212,168,83,0.15)] bg-[rgba(212,168,83,0.04)] flex items-center justify-center text-[rgba(245,245,245,0.4)] hover:text-[#D4A853] hover:border-[rgba(212,168,83,0.35)] hover:bg-[rgba(212,168,83,0.08)] transition-all duration-300 hover:shadow-[0_0_12px_rgba(212,168,83,0.1)]"
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
