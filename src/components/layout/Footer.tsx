"use client";

import { useState } from "react";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
  Twitter,
  GraduationCap,
  Scale,
  HeartPulse,
  Building2,
  Landmark,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/lib/navigation";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  company: [
    { label: "About Us", page: "about" as const },
    { label: "Our Services", page: "services" as const },
    { label: "Portfolio", page: "portfolio" as const },
    { label: "Packages", page: "packages" as const },
  ],
  services: [
    { label: "Website Development", page: "services" as const },
    { label: "Web Applications", page: "services" as const },
    { label: "Brand Identity", page: "services" as const },
    { label: "AI Solutions", page: "services" as const },
  ],
  resources: [
    { label: "Contact Us", page: "contact" as const },
    { label: "Free Consultation", page: "contact" as const },
    { label: "WhatsApp Chat", page: "contact" as const },
    { label: "Company Profile", page: "about" as const },
  ],
};

const trustedClients = [
  { name: "Rise & Shine Academy", icon: GraduationCap },
  { name: "Mogale & Associates", icon: Scale },
  { name: "Family Clinic", icon: HeartPulse },
  { name: "Gateway Hospitality", icon: Building2 },
  { name: "Tshwane Municipality", icon: Landmark },
  { name: "Nkosi Advisory", icon: BarChart3 },
];

export function Footer() {
  const { navigate } = useNavigation();
  const [year] = useState(2026);

  const handleNavClick = (page: "about" | "services" | "portfolio" | "packages" | "contact") => {
    navigate(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#0F0F12] border-t border-border section-gold-tint">
      {/* Top gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.4)] to-transparent" />

      {/* Subtle gold radial glow at top-center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[rgba(212,168,83,0.04)] rounded-full blur-[100px] pointer-events-none" />

      {/* CTA Band */}
      <div className="py-16 md:py-20 relative">
        {/* Gold radial glow behind CTA card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[rgba(212,168,83,0.06)] rounded-full blur-[80px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Gold border animated wrapper */}
          <div className="gold-border-animated">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[rgba(212,168,83,0.15)] via-[rgba(212,168,83,0.05)] to-transparent border border-[rgba(212,168,83,0.2)] p-8 md:p-12 lg:p-16 noise-gold">
              {/* Floating gold dots */}
              <span className="animate-gold-float absolute top-8 right-16 w-2 h-2 rounded-full bg-[#D4A853] opacity-40" />
              <span className="animate-gold-float absolute bottom-12 right-32 w-1.5 h-1.5 rounded-full bg-[#E8C97A] opacity-30" style={{ animationDelay: "1s" }} />
              <span className="animate-gold-float absolute top-20 right-48 w-2.5 h-2.5 rounded-full bg-[#B8922F] opacity-25" style={{ animationDelay: "2s" }} />

              {/* Existing ambient glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[rgba(212,168,83,0.05)] rounded-full blur-3xl" />
              <div className="relative z-10 max-w-2xl">
                <h3
                  className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Ready to Build Something{" "}
                  <span className="text-gradient-gold">Extraordinary?</span>
                </h3>
                <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed">
                  No obligation. A 30-minute discovery call. Just clarity on what we can build
                  together — and what it will take to get you there.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    onClick={() => handleNavClick("contact")}
                    size="lg"
                    className="bg-gradient-to-r from-[#D4A853] to-[#B8922F] hover:from-[#E8C97A] hover:to-[#D4A853] text-[#0A0A0B] font-semibold px-8 py-6 text-base shadow-lg shadow-[rgba(212,168,83,0.2)] hover:shadow-[rgba(212,168,83,0.3)] transition-all duration-300"
                  >
                    Start Your Project
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <a
                    href="https://wa.me/27724026893"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-6 text-base font-semibold rounded-lg border border-[rgba(212,168,83,0.25)] text-foreground hover:bg-[rgba(212,168,83,0.1)] hover:border-[rgba(212,168,83,0.4)] transition-all duration-300"
                  >
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-border" />

      {/* Main Footer */}
      <div className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              {/* Logo with gold gradient glow behind */}
              <div className="flex items-center gap-3 mb-5 relative">
                <div className="absolute -inset-3 bg-[rgba(212,168,83,0.08)] rounded-2xl blur-xl pointer-events-none" />
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4A853] to-[#B8922F] flex items-center justify-center shadow-lg shadow-[rgba(212,168,83,0.2)]">
                  <span
                    className="text-[#0A0A0B] font-bold text-lg tracking-tight"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    C
                  </span>
                </div>
                <div className="flex flex-col">
                  <span
                    className="text-lg font-bold tracking-tight text-foreground leading-none"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Carter
                  </span>
                  <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#D4A853] leading-none mt-0.5">
                    Digitals
                  </span>
                </div>
              </div>

              {/* Brand description in glass-gold card */}
              <div className="glass-gold rounded-xl p-4 mb-6 max-w-sm">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  High-agility digital infrastructure &amp; AI-enabled solutions for South Africa&apos;s
                  forward-thinking institutions.
                </p>
                <p className="text-[#D4A853] text-sm italic mt-2 font-medium">
                  Built Different. Built African. Built to Win.
                </p>
              </div>

              {/* Contact info with gold icon hover glow */}
              <div className="space-y-3 text-sm text-muted-foreground">
                <a
                  href="mailto:kabelokadiaka4@gmail.com"
                  className="flex items-center gap-2 hover:text-[#D4A853] transition-all duration-300 group"
                >
                  <span className="p-1 rounded-md group-hover:bg-[rgba(212,168,83,0.1)] group-hover:shadow-[0_0_8px_rgba(212,168,83,0.3)] transition-all duration-300">
                    <Mail className="w-4 h-4" />
                  </span>
                  kabelokadiaka4@gmail.com
                </a>
                <a
                  href="tel:0724026893"
                  className="flex items-center gap-2 hover:text-[#D4A853] transition-all duration-300 group"
                >
                  <span className="p-1 rounded-md group-hover:bg-[rgba(212,168,83,0.1)] group-hover:shadow-[0_0_8px_rgba(212,168,83,0.3)] transition-all duration-300">
                    <Phone className="w-4 h-4" />
                  </span>
                  072 402 6893
                </a>
                <div className="flex items-center gap-2 group">
                  <span className="p-1 rounded-md group-hover:bg-[rgba(212,168,83,0.1)] group-hover:shadow-[0_0_8px_rgba(212,168,83,0.3)] transition-all duration-300">
                    <MapPin className="w-4 h-4 shrink-0" />
                  </span>
                  1457 Block L, Soshanguve, Pretoria, Gauteng
                </div>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-5 flex items-center gap-2">
                <span className="w-3 h-px bg-gradient-to-r from-[#D4A853] to-transparent" />
                <span className="text-gradient-gold">Company</span>
              </h4>
              <span className="block w-4 h-0.5 bg-[rgba(212,168,83,0.2)] rounded-full mb-4" />
              <ul className="space-y-3">
                {footerLinks.company.map((link, i) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNavClick(link.page)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:translate-x-1 inline-block"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Links */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-5 flex items-center gap-2">
                <span className="w-3 h-px bg-gradient-to-r from-[#D4A853] to-transparent" />
                <span className="text-gradient-gold">Services</span>
              </h4>
              <span className="block w-4 h-0.5 bg-[rgba(212,168,83,0.2)] rounded-full mb-4" />
              <ul className="space-y-3">
                {footerLinks.services.map((link, i) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNavClick(link.page)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:translate-x-1 inline-block"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-5 flex items-center gap-2">
                <span className="w-3 h-px bg-gradient-to-r from-[#D4A853] to-transparent" />
                <span className="text-gradient-gold">Get Started</span>
              </h4>
              <span className="block w-4 h-0.5 bg-[rgba(212,168,83,0.2)] rounded-full mb-4" />
              <ul className="space-y-3">
                {footerLinks.resources.map((link, i) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNavClick(link.page)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:translate-x-1 inline-block"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-border" />

      {/* Social Proof Strip — Trusted By */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-[rgba(212,168,83,0.5)] mb-6">
            Trusted By
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {trustedClients.map((client, i) => (
              <div key={client.name} className="flex items-center gap-3">
                <div className="glass-gold rounded-lg px-4 py-2.5 flex items-center gap-2.5 transition-all duration-300 hover:bg-[rgba(212,168,83,0.1)] hover:border-[rgba(212,168,83,0.3)] group cursor-default hover-lift">
                  <client.icon className="w-4 h-4 text-[rgba(212,168,83,0.4)] group-hover:text-[#D4A853] transition-colors duration-300" />
                  <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300 whitespace-nowrap">
                    {client.name}
                  </span>
                </div>
                {i < trustedClients.length - 1 && (
                  <span className="hidden md:block w-1 h-1 rounded-full bg-[rgba(212,168,83,0.3)]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="section-divider-gold py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[rgba(212,168,83,0.35)]">
              &copy; {year} Carter Digitals (Pty) Ltd. All rights reserved. | CIPC:
              2025/907839/07
            </p>
            <div className="flex items-center gap-3">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover-gold text-muted-foreground hover:text-foreground transition-all duration-300 p-2 rounded-lg"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              {/* Instagram */}
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover-gold text-muted-foreground hover:text-foreground transition-all duration-300 p-2 rounded-lg"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              {/* X / Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover-gold text-muted-foreground hover:text-foreground transition-all duration-300 p-2 rounded-lg"
                aria-label="X / Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>

              {/* Compliance badges with gold gradient backgrounds */}
              <div className="flex items-center gap-2 ml-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gradient-to-r from-[rgba(212,168,83,0.2)] to-[rgba(212,168,83,0.1)] text-[#D4A853] border border-[rgba(212,168,83,0.3)]">
                  B-BBEE L1
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gradient-to-r from-[rgba(212,168,83,0.2)] to-[rgba(212,168,83,0.1)] text-[#D4A853] border border-[rgba(212,168,83,0.3)]">
                  100% BLACK-OWNED
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
