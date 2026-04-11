"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Zap,
  KeyRound,
  Target,
  Handshake,
  Briefcase,
  Code,
  Database,
  Cloud,
  Cpu,
  Globe,
  FileCheck,
  MapPin,
  Quote,
  ChevronRight,
  Shield,
  Recycle,
  Rocket,
  Clock,
  Users,
  CheckCircle,
  Sparkles,
  GraduationCap,
  Scale,
  HeartPulse,
  Building2,
  Landmark,
  BarChart3,
  TrendingUp,
  Bot,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
  AnimatedCounter,
} from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ParallaxSection } from "@/components/shared/ParallaxSection";
import { TiltCard } from "@/components/shared/TiltCard";
import { useNavigation } from "@/lib/navigation";

/* ──────────────────────── value cards data ─────────────────────── */
const values = [
  {
    icon: Zap,
    title: "Speed Over Process",
    description: "5-7 day delivery. Not weeks. Not months.",
  },
  {
    icon: KeyRound,
    title: "Ownership Over Dependency",
    description: "Full handover. Zero lock-in. You own everything.",
  },
  {
    icon: Target,
    title: "Substance Over Style",
    description: "Results that compound. Not templates that expire.",
  },
  {
    icon: Handshake,
    title: "Partnership Over Transactions",
    description: "We build with you, not just for you.",
  },
];

/* ──────────────────────── tech stack ───────────────────────────── */
const techStack = [
  "Next.js",
  "React",
  "Python/FastAPI",
  "PostgreSQL",
  "GCP/Vertex AI",
  "Vercel",
  "Sanity CMS",
  "WhatsApp API",
  "Make.com",
];

/* ──────────────────── engagement models ────────────────────────── */
const engagementModels = [
  {
    icon: Briefcase,
    title: "Project-Based",
    description: "Fixed scope, fixed cost, milestone-driven delivery. You know exactly what you're getting, when you're getting it, and what it costs — before we start.",
    bestFor: "SMEs, startups, and organisations with clearly defined digital needs",
  },
  {
    icon: Recycle,
    title: "Retainer & Ongoing Support",
    description: "Continuous optimisation on a predictable monthly basis. We become an extension of your team — iterating, improving, and scaling your digital presence.",
    bestFor: "Growing businesses needing regular updates, new features, and strategic guidance",
  },
  {
    icon: Rocket,
    title: "Prototype-to-Production",
    description: "Fully functional pilot before full-scale rollout. Test your concept in the real world, gather feedback, then scale with confidence.",
    bestFor: "Innovators testing new digital products or internal systems",
  },
];

/* ──────────────────── credentials data ─────────────────────────── */
const credentials = [
  { label: "Registered Name", value: "Carter Digitals (Pty) Ltd" },
  { label: "CIPC Registration", value: "2025/907839/07" },
  { label: "SARS Tax Reference", value: "9382428234" },
  {
    label: "B-BBEE Status",
    value: "Level 1 Contributor (EME) — 135% Procurement Recognition",
  },
  { label: "Ownership", value: "100% Black-Owned | 100% Youth-Owned" },
  { label: "CSD Registration", value: "Registered & Active" },
  { label: "Compliance", value: "POPIA Compliant" },
  {
    label: "Location",
    value: "1457 Block L, Soshanguve, Pretoria, Gauteng",
  },
];

/* ──────────────────── trust logos data ────────────────────────── */
const trustLogos = [
  { name: "Rise & Shine Academy", sector: "Education", icon: GraduationCap },
  { name: "Mogale & Associates", sector: "Legal", icon: Scale },
  { name: "Family Clinic Group", sector: "Healthcare", icon: HeartPulse },
  { name: "Gateway Hospitality", sector: "Hospitality", icon: Building2 },
  { name: "Tshwane Municipality", sector: "Government", icon: Landmark },
  { name: "Nkosi Advisory", sector: "Finance", icon: BarChart3 },
];

/* ──────────────────── milestones data ───────────────────────────── */
const milestones = [
  { year: "2023", title: "Founded", description: "Carter Digitals established in Soshanguve, Pretoria — born from a friendship and a vision to build real digital infrastructure for South African institutions.", icon: Rocket },
  { year: "2024", title: "First Major Client", description: "Delivered the Soshanguve School of Specialisation website — our first government-adjacent deployment, proving our capability at scale.", icon: Building2 },
  { year: "2024", title: "B-BBEE Level 1", description: "Achieved B-BBEE Level 1 certification with 135% procurement recognition — opening doors to government procurement.", icon: Shield },
  { year: "2025", title: "50+ Projects", description: "Crossed 50 projects delivered across education, legal, medical, hospitality, and government sectors.", icon: TrendingUp },
  { year: "2025", title: "AI Integration", description: "Launched AI-powered business tools — chatbots, automated workflows, and intelligent analytics for our clients.", icon: Bot },
  { year: "2026", title: "National AI Policy", description: "Positioned as a key implementation partner for South Africa's Draft National AI Policy — targeting funded contracts.", icon: Globe },
];

/* ──────────────────── company stats data ────────────────────────── */
const companyStats = [
  { value: "50+", label: "Projects Delivered", numericValue: 50, suffix: "+" },
  { value: "30+", label: "Happy Clients", numericValue: 30, suffix: "+" },
  { value: "99.9%", label: "Uptime Guaranteed", numericValue: 99, suffix: ".9%" },
  { value: "5-7", label: "Day Delivery", numericValue: 5, suffix: "-7" },
];

/* ═══════════════════════════════════════════════════════════════════════
   ABOUT PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════════ */
export default function AboutPage() {
  const { navigate } = useNavigation();

  const handleNavClick = (page: "contact" | "services" | "packages") => {
    navigate(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="relative overflow-hidden">
      {/* ───────────────────── 1. PAGE HERO ───────────────────── */}
      <section className="relative py-24 md:py-36 bg-[#0A0A0B]">
        {/* Background grid */}
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B] via-transparent to-[#0A0A0B]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(212,168,83,0.03)] via-transparent to-[rgba(212,168,83,0.02)]" />

        {/* Radial glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[rgba(212,168,83,0.04)] rounded-full blur-[120px] pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection delay={0.1} direction="up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(212,168,83,0.08)] border border-[rgba(212,168,83,0.15)] mb-8">
              <Sparkles className="w-4 h-4 text-[#D4A853]" />
              <span className="text-sm font-medium text-[#D4A853]">
                Our Story
              </span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2} direction="up">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <span className="text-[#F5F5F5]">About Carter </span>
              <span className="text-gradient-gold">Digitals</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.35} direction="up">
            <p
              className="mt-4 text-xl md:text-2xl font-medium text-[rgba(245,245,245,0.5)] tracking-wide"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Built Different. Built African. Built to Win.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.5} direction="up">
            <p className="mt-6 text-base md:text-lg text-[rgba(245,245,245,0.55)] max-w-2xl mx-auto leading-relaxed">
              Carter Digitals (Pty) Ltd is a Pretoria-based digital services
              studio operating out of Soshanguve — building production-ready
              digital infrastructure for South Africa&apos;s schools, SMEs, law
              firms, medical practices, and government institutions.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.65} direction="up">
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => handleNavClick("contact")}
                size="lg"
                className="bg-gradient-to-r from-[#D4A853] to-[#B8922F] hover:from-[#E8C97A] hover:to-[#D4A853] text-[#0A0A0B] font-semibold px-8 py-6 text-base rounded-xl shadow-lg shadow-[rgba(212,168,83,0.25)] hover:shadow-[rgba(212,168,83,0.35)] transition-all duration-300 group"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={() => handleNavClick("services")}
                size="lg"
                variant="outline"
                className="border-[rgba(255,255,255,0.15)] bg-transparent hover:bg-white/5 text-white font-semibold px-8 py-6 text-base rounded-xl transition-all duration-300 group"
              >
                View Our Services
                <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ────────────────── 2. OUR STORY SECTION ───────────────── */}
      <section className="relative py-20 md:py-28 bg-[#0A0A0B] section-gold-tint">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.2)] to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text column */}
            <AnimatedSection direction="right" delay={0.1}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-[rgba(212,168,83,0.1)] text-[#D4A853] border border-[rgba(212,168,83,0.2)] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4A853]" />
                Our Story
              </span>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-6"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                A Studio Born from{" "}
                <span className="text-gradient-gold">Purpose</span>
              </h2>

              <div className="space-y-5 text-[rgba(245,245,245,0.6)] leading-[1.8]">
                <p>
                  Carter Digitals was never meant to be just another digital
                  agency. Founded in 2023, this studio was named in tribute to a
                  close friend who passed away in April 2021. Every project we
                  deliver, every client we serve, and every line of code we write
                  exists as a living monument to that friendship.
                </p>
                <p>
                  That sense of purpose drives everything. We don&apos;t build
                  websites to fill a portfolio — we build them because South
                  Africa&apos;s institutions deserve digital infrastructure that
                  actually works. Schools that enroll students online. Law firms
                  that field client inquiries 24/7. Medical practices that manage
                  bookings without chaos. SMEs that compete on the same digital
                  playing field as the multinationals.
                </p>
                <p>
                  We&apos;re based in Soshanguve, Pretoria — and we&apos;re
                  proud of it. Our roots are firmly African, our standards are
                  global, and our turnaround times are unmatched.
                </p>
              </div>
            </AnimatedSection>

            {/* Visual column */}
            <ParallaxSection speed={0.15} direction="up">
              <AnimatedSection direction="left" delay={0.2}>
                <div className="relative">
                  {/* Main visual card */}
                  <div className="relative rounded-3xl bg-[#131316] border border-[rgba(255,255,255,0.06)] p-8 md:p-10 overflow-hidden">
                    <div className="absolute inset-0 bg-dots opacity-30" />
                    <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-[rgba(212,168,83,0.04)] rounded-full blur-[100px] pointer-events-none" />

                    <div className="relative z-10">
                      {/* Decorative quote */}
                      <Quote className="w-12 h-12 text-[rgba(212,168,83,0.2)] mb-6" />
                      <blockquote
                        className="text-lg md:text-xl font-medium text-[rgba(245,245,245,0.8)] leading-relaxed mb-6"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        We don&apos;t ask you to trust our pitch. We ask you to
                        look at what we&apos;ve already built — and let the work
                        speak.
                      </blockquote>

                      <Separator className="bg-[rgba(212,168,83,0.15)] mb-6" />

                      {/* Key highlights */}
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { label: "Founded", value: "2023" },
                          { label: "Based In", value: "Pretoria" },
                          { label: "Delivery", value: "5-7 Days" },
                          { label: "Ownership", value: "100%" },
                        ].map((item) => (
                          <div key={item.label}>
                            <p className="text-xs text-[rgba(245,245,245,0.4)] uppercase tracking-wider mb-1">
                              {item.label}
                            </p>
                            <p
                              className="text-lg font-bold text-gradient-gold"
                              style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                              }}
                            >
                              {item.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Floating accent element */}
                  <motion.div
                    className="absolute -bottom-4 -left-4 w-24 h-24 rounded-2xl bg-gradient-to-br from-[rgba(212,168,83,0.15)] to-[rgba(212,168,83,0.05)] border border-[rgba(212,168,83,0.15)]"
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute -top-4 -right-4 w-16 h-16 rounded-xl bg-gradient-to-br from-[rgba(212,168,83,0.1)] to-[rgba(212,168,83,0.03)] border border-[rgba(212,168,83,0.1)]"
                    animate={{ y: [0, 6, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  />
                </div>
              </AnimatedSection>
            </ParallaxSection>
          </div>
        </div>
      </section>

      {/* ────────────────── 3. MISSION & VALUES ─────────────────── */}
      <section className="relative py-20 md:py-28 bg-[#0A0A0B] section-gold-tint">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.2)] to-transparent" />
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-[rgba(212,168,83,0.02)] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Our Philosophy"
            title="What Drives Us"
            titleHighlight="Forward"
            description="Four principles that shape every decision, every line of code, and every client relationship we build."
            align="center"
          />

          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            staggerDelay={0.1}
          >
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <TiltCard className="h-full" tiltStrength={4}>
                  <div className="group relative h-full rounded-2xl bg-[#131316] border border-[rgba(255,255,255,0.06)] p-6 card-hover-gold overflow-hidden">
                    {/* Gold top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4A853] to-transparent opacity-60" />

                    <div className="w-12 h-12 rounded-xl bg-[rgba(212,168,83,0.1)] border border-[rgba(212,168,83,0.15)] flex items-center justify-center mb-5 group-hover:bg-[rgba(212,168,83,0.15)] transition-colors duration-300">
                      <value.icon className="w-6 h-6 text-[#D4A853]" />
                    </div>
                    <h3
                      className="text-lg font-semibold text-white mb-3"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {value.title}
                    </h3>
                    <p className="text-sm text-[rgba(245,245,245,0.5)] leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ────────────────── 4. FOUNDER SECTION ──────────────────── */}
      <section className="relative py-20 md:py-28 bg-[#0A0A0B]">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.2)] to-transparent" />
        {/* Gold gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(212,168,83,0.03)] via-[rgba(212,168,83,0.01)] to-transparent pointer-events-none" />
        {/* Gold glow orb */}
        <div className="absolute top-1/3 right-0 w-[400px] h-[300px] bg-[rgba(212,168,83,0.03)] rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image/visual column */}
            <AnimatedSection direction="right" delay={0.1}>
              <div className="relative">
                <div className="relative rounded-3xl bg-gradient-to-br from-[#131316] via-[rgba(212,168,83,0.03)] to-[#131316] border border-[rgba(212,168,83,0.12)] overflow-hidden aspect-[4/5] max-w-md mx-auto lg:max-w-none">
                  {/* Background pattern */}
                  <div className="absolute inset-0 bg-grid opacity-50" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131316] via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[rgba(212,168,83,0.05)] via-transparent to-transparent" />

                  {/* Founder visual representation */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                    {/* Initials avatar */}
                    <div className="relative mb-6">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[rgba(212,168,83,0.2)] to-[rgba(212,168,83,0.05)] border-2 border-[rgba(212,168,83,0.25)] flex items-center justify-center">
                        <span
                          className="text-4xl font-bold text-gradient-gold"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          KK
                        </span>
                      </div>
                      {/* Status indicator */}
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#131316] border-2 border-[rgba(212,168,83,0.3)] flex items-center justify-center">
                        <Cpu className="w-4 h-4 text-[#D4A853]" />
                      </div>
                    </div>

                    <h3
                      className="text-2xl font-bold text-white text-center"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Kabelo Kadiaka
                    </h3>
                    <p className="text-sm text-[#D4A853] text-center mt-1">
                      Founder & Director
                    </p>

                    <Separator className="bg-[rgba(212,168,83,0.15)] my-6 w-2/3" />

                    {/* Tech icons grid */}
                    <div className="grid grid-cols-3 gap-3 w-full max-w-[240px]">
                      {[
                        { icon: Globe, label: "Next.js" },
                        { icon: Code, label: "React" },
                        { icon: Database, label: "PostgreSQL" },
                        { icon: Cloud, label: "GCP" },
                        { icon: Cpu, label: "AI/ML" },
                        { icon: Rocket, label: "Vercel" },
                      ].map((tech) => (
                        <div
                          key={tech.label}
                          className="flex flex-col items-center gap-1.5 py-2"
                        >
                          <tech.icon className="w-5 h-5 text-[rgba(245,245,245,0.4)]" />
                          <span className="text-[10px] text-[rgba(245,245,245,0.35)]">
                            {tech.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <motion.div
                  className="absolute -bottom-6 -right-6 w-28 h-28 rounded-2xl bg-gradient-to-br from-[rgba(212,168,83,0.12)] to-[rgba(212,168,83,0.03)] border border-[rgba(212,168,83,0.12)]"
                  animate={{ y: [0, -10, 0], rotate: [0, 3, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </AnimatedSection>

            {/* Content column */}
            <AnimatedSection direction="left" delay={0.2}>
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-[rgba(212,168,83,0.1)] text-[#D4A853] border border-[rgba(212,168,83,0.2)] mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4A853]" />
                  Leadership
                </span>

                <h2
                  className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-3"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Meet <span className="text-gradient-gold">Kabelo Kadiaka</span>
                </h2>
                <p className="text-base text-[#D4A853] font-medium mb-6">
                  Founder & Director, Carter Digitals (Pty) Ltd
                </p>

                {/* Badge strip */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {[
                    "B-BBEE Level 1",
                    "135% Procurement",
                    "5-7 Day Delivery",
                    "Founded 2023",
                  ].map((badge) => (
                    <Badge
                      key={badge}
                      className="bg-[rgba(212,168,83,0.08)] text-[#D4A853] border border-[rgba(212,168,83,0.15)] font-medium text-xs px-3 py-1"
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>

                {/* Bio */}
                <div className="space-y-4 text-[rgba(245,245,245,0.6)] leading-[1.8] mb-8">
                  <p>
                    Kabelo is a full-stack developer and enterprise cloud
                    architect with deep expertise in building production-grade
                    digital systems. His work spans the full spectrum — from
                    high-performance websites to AI-augmented business
                    applications deployed on Google Cloud Platform.
                  </p>
                  <p>
                    With hands-on experience in Next.js, React, Python/FastAPI,
                    PostgreSQL, and Vertex AI, Kabelo doesn&apos;t just follow
                    trends — he architects solutions that are built to scale,
                    built to last, and built to deliver measurable business
                    outcomes.
                  </p>
                  <p>
                    His approach is simple: capability over credentials, outcomes
                    over promises, and speed without sacrificing quality.
                  </p>
                </div>

                {/* Tech stack badges */}
                <div className="mb-8">
                  <p className="text-xs text-[rgba(245,245,245,0.4)] uppercase tracking-wider font-semibold mb-3">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#1A1A1F] border border-[rgba(255,255,255,0.06)] text-xs text-[rgba(245,245,245,0.6)] font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <Separator className="bg-[rgba(255,255,255,0.06)] mb-6" />

                {/* Quote */}
                <div>
                  <p
                    className="text-lg md:text-xl font-semibold text-[rgba(245,245,245,0.8)] leading-relaxed mb-2"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    &ldquo;AI-Augmented. Human-Driven. Built to Deliver.&rdquo;
                  </p>
                  <p className="text-sm text-[rgba(245,245,245,0.4)] italic">
                    Capability over credentials. Outcomes over promises.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ──────────── 5a. COMPANY STATS BAR ───────────────────── */}
      <AnimatedSection direction="up">
        <section className="relative py-16 md:py-20 bg-[#0A0A0B]">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.2)] to-transparent" />
          <div className="absolute inset-0 bg-dots opacity-40" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[rgba(212,168,83,0.03)] rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12" staggerDelay={0.1}>
              {companyStats.map((stat) => (
                <StaggerItem key={stat.label}>
                  <div className="text-center">
                    <div
                      className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-gold mb-2"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      <AnimatedCounter
                        target={stat.numericValue}
                        suffix={stat.suffix}
                        duration={2000}
                      />
                    </div>
                    <p className="text-sm text-[rgba(245,245,245,0.45)] font-medium tracking-wide">
                      {stat.label}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      </AnimatedSection>

      {/* ──────────── 5b. COMPANY MILESTONES TIMELINE ─────────────── */}
      <AnimatedSection direction="up">
        <section className="relative py-20 md:py-28 bg-[#0A0A0B] section-gold-tint">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.2)] to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[600px] bg-[rgba(212,168,83,0.03)] rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              label="Our Journey"
              title="Building Milestone by"
              titleHighlight="Milestone"
              description="From a bold idea in Soshanguve to becoming a trusted digital partner for South Africa's institutions."
              align="center"
            />

            <div className="relative mt-12">
              {/* Vertical gold gradient line — centered on desktop, left on mobile */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
                <div className="w-full h-full bg-gradient-to-b from-[#D4A853] via-[#B8922F] to-[rgba(212,168,83,0.1)]" />
              </div>
              <div className="md:hidden absolute left-[15px] top-0 bottom-0 w-px">
                <div className="w-full h-full bg-gradient-to-b from-[#D4A853] via-[#B8922F] to-[rgba(212,168,83,0.1)]" />
              </div>

              <div className="space-y-12 md:space-y-16">
                {milestones.map((milestone, idx) => {
                  const isLeft = idx % 2 === 0;
                  return (
                    <StaggerContainer key={milestone.title + milestone.year} className="relative" staggerDelay={0.08}>
                      <div className={`flex items-start gap-6 md:gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
                        {/* Content card */}
                        <div className={`flex-1 pl-10 md:pl-0 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
                          <StaggerItem>
                            <div className="group rounded-2xl bg-[#131316] border border-[rgba(255,255,255,0.06)] p-6 card-hover hover:border-[rgba(212,168,83,0.15)] transition-colors duration-300">
                              <div className={`flex items-center gap-3 mb-3 ${isLeft ? "md:flex-row-reverse" : ""}`}>
                                <div className="w-10 h-10 rounded-xl bg-[rgba(212,168,83,0.1)] border border-[rgba(212,168,83,0.15)] flex items-center justify-center shrink-0 group-hover:bg-[rgba(212,168,83,0.15)] transition-colors duration-300">
                                  <milestone.icon className="w-5 h-5 text-[#D4A853]" />
                                </div>
                                <div className={`flex items-center gap-3 ${isLeft ? "md:flex-row-reverse" : ""}`}>
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-[rgba(212,168,83,0.1)] text-[#D4A853] text-xs font-bold tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                    {milestone.year}
                                  </span>
                                  <h3
                                    className="text-lg font-bold text-white"
                                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                  >
                                    {milestone.title}
                                  </h3>
                                </div>
                              </div>
                              <p className="text-sm text-[rgba(245,245,245,0.5)] leading-relaxed">
                                {milestone.description}
                              </p>
                            </div>
                          </StaggerItem>
                        </div>

                        {/* Center dot — desktop only */}
                        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 w-10 h-10 rounded-full bg-[#0A0A0B] border-2 border-[#D4A853] items-center justify-center z-10 shadow-lg shadow-[rgba(212,168,83,0.3)]">
                          <div className="w-4 h-4 rounded-full bg-[#D4A853]" />
                        </div>

                        {/* Mobile dot */}
                        <div className="md:hidden absolute left-[5px] top-6 w-5 h-5 rounded-full bg-[#D4A853] border-2 border-[#0A0A0B] z-10 shadow-md shadow-[rgba(212,168,83,0.25)]" />

                        {/* Spacer for alternating layout — desktop only */}
                        <div className="hidden md:block flex-1" />
                      </div>
                    </StaggerContainer>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ────────────────── 5. CREDENTIALS SECTION ──────────────── */}
      <section className="relative py-20 md:py-28 bg-[#0A0A0B] section-gold-tint">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.2)] to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[rgba(212,168,83,0.02)] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Company Details"
            title="Verified &"
            titleHighlight="Credentialled"
            description="Every registration verified. Every compliance standard met. Full transparency — no fine print."
            align="center"
          />

          <AnimatedSection direction="up" delay={0.15}>
            <div className="relative max-w-3xl mx-auto">
              {/* Credentials card */}
              <div className="rounded-3xl bg-[#131316] border border-[rgba(212,168,83,0.15)] overflow-hidden glow-gold">
                {/* Glass effect overlay */}
                <div className="absolute inset-0 rounded-3xl" style={{ background: "rgba(19,19,22,0.7)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }} />
                <div className="absolute inset-0 bg-dots opacity-20 rounded-3xl" />

                <div className="relative z-10 p-6 md:p-10">
                  {/* Header with shield icon */}
                  <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[rgba(212,168,83,0.12)]">
                    <div className="w-14 h-14 rounded-2xl bg-[rgba(212,168,83,0.1)] border border-[rgba(212,168,83,0.15)] flex items-center justify-center">
                      <FileCheck className="w-7 h-7 text-[#D4A853]" />
                    </div>
                    <div>
                      <h3
                        className="text-xl font-bold text-white"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        Company Credentials
                      </h3>
                      <p className="text-sm text-[rgba(245,245,245,0.4)]">
                        Carter Digitals (Pty) Ltd — Official Records
                      </p>
                    </div>
                  </div>

                  {/* Key-value list */}
                  <div className="space-y-0">
                    {credentials.map((item, idx) => (
                      <div key={item.label}>
                        <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-4">
                          <div className="flex items-start gap-3 sm:w-[200px] shrink-0">
                            <CheckCircle className="w-4 h-4 text-[#D4A853] shrink-0 mt-0.5" />
                            <span className="text-sm font-medium text-[rgba(245,245,245,0.5)] whitespace-nowrap">
                              {item.label}
                            </span>
                          </div>
                          <span className="text-sm text-[#F5F5F5] font-medium leading-relaxed">
                            {item.value}
                          </span>
                        </div>
                        {idx < credentials.length - 1 && (
                          <div className="h-px bg-gradient-to-r from-[rgba(212,168,83,0.08)] via-[rgba(212,168,83,0.12)] to-[rgba(212,168,83,0.08)]" />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Location badge */}
                  <div className="mt-8 pt-6 border-t border-[rgba(212,168,83,0.12)]">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-[#D4A853]" />
                      <div>
                        <p className="text-sm text-[#F5F5F5] font-medium">
                          Soshanguve, Pretoria, Gauteng
                        </p>
                        <p className="text-xs text-[rgba(245,245,245,0.4)]">
                          Serving clients across South Africa
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ──────────────── TRUSTED BY / CLIENT LOGOS ──────────────── */}
      <AnimatedSection direction="up">
        <div className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-[rgba(212,168,83,0.1)] text-[#D4A853] border border-[rgba(212,168,83,0.2)]">
                Trusted Across Sectors
              </span>
              <h2 className="mt-6 text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Institutions That <span className="text-gradient-gold">Believe In Us</span>
              </h2>
            </div>

            {/* Logo grid - styled text logos since we don't have actual images */}
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6" staggerDelay={0.05}>
              {trustLogos.map((logo) => (
                <StaggerItem key={logo.name}>
                  <div className="group flex flex-col items-center justify-center p-6 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] hover:border-[rgba(212,168,83,0.15)] transition-all duration-300">
                    <logo.icon className="w-8 h-8 text-[rgba(245,245,245,0.2)] group-hover:text-[rgba(212,168,83,0.5)] transition-colors duration-300 mb-3" />
                    <span className="text-xs font-semibold text-[rgba(245,245,245,0.3)] group-hover:text-[rgba(245,245,245,0.6)] transition-colors text-center leading-tight">{logo.name}</span>
                    <span className="text-[10px] text-[rgba(245,245,245,0.15)] mt-1">{logo.sector}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </AnimatedSection>

      {/* ────────────── 6. ENGAGEMENT MODELS SECTION ────────────── */}
      <section className="relative py-20 md:py-28 bg-[#0A0A0B]">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.2)] to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="How We Work Together"
            title="Engagement Models"
            titleHighlight="for Every Reality"
            description="Whether you need a single project, ongoing support, or a full-scale digital transformation — we have a model that fits."
            align="center"
          />

          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
            staggerDelay={0.12}
          >
            {engagementModels.map((model) => (
              <StaggerItem key={model.title}>
                <div className="group relative h-full rounded-2xl bg-[#131316] border border-[rgba(255,255,255,0.06)] p-6 md:p-8 card-hover overflow-hidden flex flex-col">
                  {/* Gold top accent */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4A853] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[rgba(212,168,83,0.15)] to-[rgba(212,168,83,0.05)] border border-[rgba(212,168,83,0.12)] flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-[rgba(212,168,83,0.1)] transition-shadow duration-300">
                    <model.icon className="w-7 h-7 text-[#D4A853]" />
                  </div>

                  <h3
                    className="text-xl font-bold text-white mb-3"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {model.title}
                  </h3>

                  <p className="text-sm text-[rgba(245,245,245,0.55)] leading-relaxed mb-6 flex-1">
                    {model.description}
                  </p>

                  {/* Best for tag */}
                  <div className="mt-auto pt-4 border-t border-[rgba(255,255,255,0.06)]">
                    <div className="flex items-start gap-2">
                      <Users className="w-4 h-4 text-[#D4A853] shrink-0 mt-0.5" />
                      <p className="text-xs text-[rgba(245,245,245,0.4)] leading-relaxed">
                        <span className="font-semibold text-[rgba(245,245,245,0.6)]">
                          Best for:
                        </span>{" "}
                        {model.bestFor}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* CTA */}
          <AnimatedSection direction="up" delay={0.4}>
            <div className="text-center mt-12">
              <Button
                onClick={() => handleNavClick("contact")}
                size="lg"
                className="bg-gradient-to-r from-[#D4A853] to-[#B8922F] hover:from-[#E8C97A] hover:to-[#D4A853] text-[#0A0A0B] font-semibold px-8 py-6 text-base rounded-xl shadow-lg shadow-[rgba(212,168,83,0.25)] hover:shadow-[rgba(212,168,83,0.35)] transition-all duration-300 group"
              >
                Discuss Your Project
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
