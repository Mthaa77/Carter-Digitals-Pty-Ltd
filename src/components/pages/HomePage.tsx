"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Globe,
  Code,
  Settings,
  Bot,
  Palette,
  Presentation,
  Zap,
  Shield,
  TrendingUp,
  KeyRound,
  Star,
  Quote,
  Phone,
  MessageCircle,
  CheckCircle,
  ChevronRight,
  Sparkles,
  Cloud,
  Database,
  Terminal,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
  AnimatedCounter,
} from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { ParallaxSection } from "@/components/shared/ParallaxSection";
import { useNavigation } from "@/lib/navigation";

/* ─────────────────────────── floating shape data ─────────────────────────── */
const floatingShapes = [
  { size: 320, x: "10%", y: "15%", delay: 0, duration: 20, opacity: 0.04 },
  { size: 200, x: "75%", y: "10%", delay: 2, duration: 25, opacity: 0.03 },
  { size: 160, x: "85%", y: "65%", delay: 4, duration: 22, opacity: 0.05 },
  { size: 260, x: "5%", y: "60%", delay: 1, duration: 18, opacity: 0.03 },
  { size: 120, x: "50%", y: "80%", delay: 3, duration: 15, opacity: 0.04 },
];

/* ──────────────────────── about feature cards ────────────────────────── */
const aboutFeatures = [
  {
    icon: Zap,
    title: "Lightning-Fast Delivery",
    description:
      "From brief to launch in 5–7 business days. No bloated timelines, no scope creep — just ruthless execution.",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Technology",
    description:
      "Built on Next.js and deployed on Vercel's edge network. Your site loads in milliseconds, not seconds.",
  },
  {
    icon: TrendingUp,
    title: "Real-World Results",
    description:
      "Google-ranking infrastructure, SEO-optimised architecture, and conversion-focused design from day one.",
  },
  {
    icon: KeyRound,
    title: "Zero Dependency",
    description:
      "Full source code ownership after handover. No lock-in contracts. Your digital asset, your rules.",
  },
];

/* ──────────────────────── services data ─────────────────────────────── */
const services = [
  {
    icon: Globe,
    title: "Website Development",
    description:
      "High-performance, SEO-optimised websites that rank, convert, and scale. Mobile-first, accessible, and blazing fast.",
  },
  {
    icon: Code,
    title: "Bespoke Web Applications",
    description:
      "Custom-built SaaS platforms, client portals, booking systems, and dashboards tailored to your operations.",
  },
  {
    icon: Settings,
    title: "Internal Business Tools",
    description:
      "Streamline operations with purpose-built tools: inventory management, CRM integrations, reporting dashboards.",
  },
  {
    icon: Bot,
    title: "AI-Powered Solutions",
    description:
      "Intelligent chatbots, automated workflows, and AI-driven analytics that give your business a competitive edge.",
  },
  {
    icon: Palette,
    title: "Brand Identity & Design",
    description:
      "From logo systems to comprehensive brand guidelines — visual identities that command attention and trust.",
  },
  {
    icon: Presentation,
    title: "Pitch Decks & Profiles",
    description:
      "Investor-ready pitch decks and compelling company profiles that tell your story and win stakeholder buy-in.",
  },
];

/* ──────────────────────── process steps ─────────────────────────────── */
const processSteps = [
  {
    num: "01",
    title: "Discovery & Alignment",
    description: "We learn your vision, audience, and goals — no assumptions, just deep understanding.",
  },
  {
    num: "02",
    title: "Architecture & Wireflow",
    description: "Strategic sitemaps, user flows, and technical architecture designed for scale.",
  },
  {
    num: "03",
    title: "Design & Build",
    description: "Pixel-perfect design and clean, maintainable code — shipped in days, not months.",
  },
  {
    num: "04",
    title: "QA & Compliance",
    description: "Rigorous testing across devices, browsers, and POPIA compliance checks.",
  },
  {
    num: "05",
    title: "Launch & Enablement",
    description: "Go live with full handover, training, and ongoing support. You own everything.",
  },
];

/* ──────────────────────── testimonials ──────────────────────────────── */
const testimonials = [
  {
    quote:
      "Carter Digitals transformed our school's online presence completely. Parents now enroll their children directly through the website, and our Google ranking jumped from page 5 to the top 3 results within two months. The team understood exactly what an educational institution needs.",
    name: "Dr. Thabo Molefe",
    role: "School Principal",
    company: "Rise & Shine Academy, Gauteng",
  },
  {
    quote:
      "As a growing SME, we needed a professional web presence without the enterprise price tag. Carter Digitals delivered a stunning e-commerce site in under a week. Our online sales increased by 340% in the first quarter. Absolute game-changer for our business.",
    name: "Nomsa Dlamini",
    role: "Founder & CEO",
    company: "Lush Naturals Co., Johannesburg",
  },
  {
    quote:
      "In the legal industry, credibility is everything. Carter Digitals built us a website that projects authority and professionalism. Client inquiries through the site have tripled, and we've received compliments from senior counsel about our online presence. Truly exceptional work.",
    name: "Adv. Pieter van der Merwe",
    role: "Senior Partner",
    company: "Van der Merwe & Associates, Pretoria",
  },
];

/* ──────────────────────── packages data ─────────────────────────────── */
const packages = [
  {
    name: "Vula",
    price: "R3,999",
    description: "Launch-Ready Starter",
    popular: false,
    features: [
      "5-page responsive website",
      "Mobile-first design",
      "Basic SEO & Google setup",
      "5-7 day delivery",
    ],
  },
  {
    name: "Khula",
    price: "R7,999",
    description: "Growth-Focused Business",
    popular: true,
    features: [
      "10-page custom website",
      "Booking / Contact forms",
      "Advanced SEO & Analytics",
      "Content management system",
      "Brand identity starter pack",
    ],
  },
  {
    name: "Elevate",
    price: "R14,999",
    description: "Enterprise-Grade Platform",
    popular: false,
    features: [
      "Bespoke web application",
      "Custom integrations & API",
      "AI-powered chatbot",
      "Full brand identity design",
      "Priority support & training",
    ],
  },
];

/* ──────────────────────── tech stack data ────────────────────────── */
const techStack = [
  { name: "Next.js", icon: Globe },
  { name: "React", icon: Code },
  { name: "TypeScript", icon: Code },
  { name: "Vercel", icon: Cloud },
  { name: "PostgreSQL", icon: Database },
  { name: "Python / FastAPI", icon: Terminal },
  { name: "Google Cloud", icon: Cloud },
  { name: "Tailwind CSS", icon: Palette },
  { name: "Framer Motion", icon: Sparkles },
  { name: "Sanity CMS", icon: FileText },
];

/* ──────────────────────── trust badges ──────────────────────────────── */
const trustBadges = [
  "B-BBEE Level 1",
  "100% Black-Owned",
  "CSD Registered",
  "5-7 Day Delivery",
  "POPIA Compliant",
];

/* ═══════════════════════════════════════════════════════════════════════
   TYPING TEXT COMPONENT
   ═══════════════════════════════════════════════════════════════════════ */
interface TypingTextProps {
  words: string[];
  className?: string;
}

function TypingText({ words, className = "" }: TypingTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);
  const wordIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const lastTimestampRef = useRef<number | null>(null);
  const pauseUntilRef = useRef<number>(0);

  // Observe when the element enters viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Typing animation loop using requestAnimationFrame
  useEffect(() => {
    if (!isInView) return;

    const TYPING_SPEED = 80;
    const DELETE_SPEED = 40;
    const PAUSE_DURATION = 2000;

    const animate = (timestamp: number) => {
      // Handle pause after typing a full word
      if (timestamp < pauseUntilRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const word = words[wordIndexRef.current];

      if (!isDeletingRef.current) {
        // Typing
        if (lastTimestampRef.current === null) {
          lastTimestampRef.current = timestamp;
        }

        if (timestamp - lastTimestampRef.current >= TYPING_SPEED) {
          lastTimestampRef.current = timestamp;
          charIndexRef.current += 1;
          setDisplayText(word.slice(0, charIndexRef.current));

          if (charIndexRef.current === word.length) {
            // Word fully typed — pause before deleting
            pauseUntilRef.current = timestamp + PAUSE_DURATION;
            isDeletingRef.current = true;
            lastTimestampRef.current = null;
          }
        }
      } else {
        // Deleting
        if (lastTimestampRef.current === null) {
          lastTimestampRef.current = timestamp;
        }

        if (timestamp - lastTimestampRef.current >= DELETE_SPEED) {
          lastTimestampRef.current = timestamp;
          charIndexRef.current -= 1;
          setDisplayText(word.slice(0, charIndexRef.current));

          if (charIndexRef.current === 0) {
            // Move to next word
            isDeletingRef.current = false;
            wordIndexRef.current = (wordIndexRef.current + 1) % words.length;
            lastTimestampRef.current = null;
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isInView, words]);

  return (
    <span ref={containerRef} className={className} aria-label={words.join(", ")}>
      <span aria-hidden="true">{displayText}</span>
      <span className="animate-blink text-[#D4A853]" aria-hidden="true">|</span>
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   HOME PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const { navigate } = useNavigation();
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isHoveringCarousel, setIsHoveringCarousel] = useState(false);

  const onSelect = useCallback(() => {
    if (!carouselApi) return;
    setCurrentSlide(carouselApi.selectedScrollSnap());
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi) return;
    const handler = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    // Defer initial sync to avoid synchronous setState in effect
    const raf = requestAnimationFrame(handler);
    carouselApi.on("select", handler);
    carouselApi.on("reInit", handler);
    return () => {
      cancelAnimationFrame(raf);
      carouselApi.off("select", handler);
      carouselApi.off("reInit", handler);
    };
  }, [carouselApi]);

  // Auto-play carousel every 5 seconds
  useEffect(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    if (!isHoveringCarousel) {
      autoplayRef.current = setInterval(() => {
        if (carouselApi && carouselApi.canScrollNext()) {
          carouselApi.scrollNext();
        } else {
          carouselApi?.scrollTo(0);
        }
      }, 5000);
    }
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [carouselApi, isHoveringCarousel]);

  const handleNavClick = (page: "contact" | "services" | "packages") => {
    navigate(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="relative overflow-hidden">
      {/* ───────────────────── 1. HERO SECTION ───────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center bg-[#0A0A0B]">
        {/* Background grid */}
        <div className="absolute inset-0 bg-grid" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B] via-transparent to-[#0A0A0B]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(212,168,83,0.03)] via-transparent to-[rgba(212,168,83,0.02)]" />

        {/* Floating geometric shapes with parallax */}
        <ParallaxSection speed={0.1} direction="up" className="absolute inset-0 pointer-events-none">
          {floatingShapes.map((shape, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-[rgba(212,168,83,0.15)]"
              style={{
                width: shape.size,
                height: shape.size,
                left: shape.x,
                top: shape.y,
                opacity: shape.opacity,
              }}
              animate={{
                y: [0, -30, 0, 20, 0],
                x: [0, 15, 0, -10, 0],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: shape.duration,
                delay: shape.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </ParallaxSection>

        {/* Radial glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[rgba(212,168,83,0.04)] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[rgba(212,168,83,0.03)] rounded-full blur-[100px] pointer-events-none" />

        {/* Decorative parallax gold glow orb */}
        <ParallaxSection speed={0.1} direction="up" className="absolute pointer-events-none">
          <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-[rgba(212,168,83,0.03)] rounded-full blur-[150px]" />
        </ParallaxSection>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="max-w-4xl">
            {/* Badge */}
            <AnimatedSection delay={0.1} direction="up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(212,168,83,0.08)] border border-[rgba(212,168,83,0.15)] mb-8">
                <Sparkles className="w-4 h-4 text-[#D4A853]" />
                <span className="text-sm font-medium text-[#D4A853]">
                  Pretoria&apos;s Premier Digital Studio
                </span>
              </div>
            </AnimatedSection>

            {/* Headline */}
            <AnimatedSection delay={0.2} direction="up">
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <span className="text-[#F5F5F5]">We Build Digital</span>
                <br />
                <span className="text-gradient-gold">
                  <TypingText words={["Infrastructure.", "Credibility.", "Futures.", "Experiences."]} />
                </span>
                <br />
                <span className="text-[#F5F5F5]">Built to Win.</span>
              </h1>
            </AnimatedSection>

            {/* Subheadline */}
            <AnimatedSection delay={0.4} direction="up">
              <p className="mt-6 md:mt-8 text-lg md:text-xl text-[rgba(245,245,245,0.6)] max-w-2xl leading-relaxed">
                We design and deploy high-performance digital infrastructure for South
                Africa&apos;s schools, SMEs, law firms, medical practices, and
                government institutions — in days, not months.
              </p>
            </AnimatedSection>

            {/* CTA Buttons */}
            <AnimatedSection delay={0.6} direction="up">
              <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4">
                <MagneticButton strength={0.2}>
                  <Button
                    onClick={() => handleNavClick("contact")}
                    size="lg"
                    className="bg-gradient-to-r from-[#D4A853] to-[#B8922F] hover:from-[#E8C97A] hover:to-[#D4A853] text-[#0A0A0B] font-semibold px-8 py-6 text-base rounded-xl shadow-lg shadow-[rgba(212,168,83,0.25)] hover:shadow-[rgba(212,168,83,0.35)] transition-all duration-300 group"
                  >
                    Start Your Project
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </MagneticButton>
                <MagneticButton strength={0.2}>
                  <Button
                    onClick={() => handleNavClick("services")}
                    size="lg"
                    variant="outline"
                    className="border-[rgba(255,255,255,0.15)] bg-transparent hover:bg-white/5 text-white font-semibold px-8 py-6 text-base rounded-xl transition-all duration-300 group"
                  >
                    View Our Work
                    <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </MagneticButton>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Trust badges strip */}
        <div className="relative z-10 mt-auto">
          <div className="border-t border-[rgba(255,255,255,0.06)] bg-[rgba(10,10,11,0.8)] backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:gap-x-10">
                {trustBadges.map((badge) => (
                  <div
                    key={badge}
                    className="flex items-center gap-2 text-[rgba(245,245,245,0.5)]"
                  >
                    <CheckCircle className="w-4 h-4 text-[#D4A853] shrink-0" />
                    <span className="text-xs md:text-sm font-medium whitespace-nowrap">
                      {badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── 2. ABOUT PREVIEW SECTION ───────────────── */}
      <section className="relative py-24 md:py-32 bg-[#0A0A0B]">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.15)] to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Who We Are"
            title="We Don't Build Websites. We Build"
            titleHighlight="Institutional Credibility"
            description="Carter Digitals (Pty) Ltd is a Pretoria-based digital services studio that equips South Africa's forward-thinking institutions with the digital infrastructure they need to compete, grow, and lead. We don't do templates. We build digital assets that work as hard as you do."
            align="center"
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {aboutFeatures.map((feature) => (
              <StaggerItem key={feature.title}>
                <div className="group relative h-full rounded-2xl bg-[#131316] border border-[rgba(255,255,255,0.06)] p-6 card-hover overflow-hidden">
                  {/* Gold top accent */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4A853] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="w-12 h-12 rounded-xl bg-[rgba(212,168,83,0.1)] border border-[rgba(212,168,83,0.15)] flex items-center justify-center mb-5 group-hover:bg-[rgba(212,168,83,0.15)] transition-colors duration-300">
                    <feature.icon className="w-6 h-6 text-[#D4A853]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[rgba(245,245,245,0.5)] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─────────────────────── 3. STATS SECTION ──────────────────── */}
      <section className="relative py-20 md:py-28 bg-[#0A0A0B] bg-dots">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.15)] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.15)] to-transparent" />

        {/* Center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[rgba(212,168,83,0.03)] rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12" staggerDelay={0.15}>
            {/* Stat 1 */}
            <StaggerItem>
              <div className="text-center">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-gold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <AnimatedCounter target={100} suffix="%" duration={2000} />
                </div>
                <p className="text-sm md:text-base text-[rgba(245,245,245,0.5)] font-medium">
                  Black-Owned
                </p>
              </div>
            </StaggerItem>

            {/* Stat 2 */}
            <StaggerItem>
              <div className="text-center">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-gold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <AnimatedCounter target={135} suffix="%" duration={2500} />
                </div>
                <p className="text-sm md:text-base text-[rgba(245,245,245,0.5)] font-medium">
                  B-BBEE Procurement
                </p>
              </div>
            </StaggerItem>

            {/* Stat 3 */}
            <StaggerItem>
              <div className="text-center">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <span className="text-gradient-gold">5-7</span>
                  <span className="text-[rgba(245,245,245,0.4)] text-2xl md:text-3xl lg:text-4xl ml-1">Days</span>
                </div>
                <p className="text-sm md:text-base text-[rgba(245,245,245,0.5)] font-medium">
                  Delivery Guarantee
                </p>
              </div>
            </StaggerItem>

            {/* Stat 4 */}
            <StaggerItem>
              <div className="text-center">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <span className="text-gradient-gold">24/7</span>
                </div>
                <p className="text-sm md:text-base text-[rgba(245,245,245,0.5)] font-medium">
                  Uptime Guarantee
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* ───────────────────── TECH MARQUEE SECTION ─────────────── */}
      <section className="relative py-12 md:py-16 bg-[#0A0A0B] overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.15)] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.15)] to-transparent" />

        <p className="text-center text-xs font-medium tracking-widest uppercase text-[rgba(245,245,245,0.3)] mb-8">
          Technologies We Work With
        </p>

        {/* Marquee - infinite scroll */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A0B] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0A0B] to-transparent z-10" />

          <div className="flex animate-marquee">
            {/* Duplicate items for seamless loop */}
            {[...techStack, ...techStack].map((tech, i) => (
              <div key={i} className="flex items-center gap-3 px-8 shrink-0">
                <tech.icon className="w-5 h-5 text-[rgba(212,168,83,0.4)]" />
                <span className="text-sm font-medium text-[rgba(245,245,245,0.35)] whitespace-nowrap">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── 4. SERVICES OVERVIEW SECTION ───────────── */}
      <section className="relative py-24 md:py-32 bg-[#0A0A0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Our Services"
            title="End-to-End Digital"
            titleHighlight="Infrastructure"
            description="From first click to full-scale deployment — every service designed to give South African institutions a digital advantage."
            align="center"
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
            {services.map((service) => (
              <StaggerItem key={service.title}>
                <div className="group relative h-full rounded-2xl glass p-6 card-hover cursor-pointer overflow-hidden">
                  {/* Shimmer on hover */}
                  <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[rgba(212,168,83,0.15)] to-[rgba(212,168,83,0.05)] border border-[rgba(212,168,83,0.12)] flex items-center justify-center mb-5 group-hover:shadow-lg group-hover:shadow-[rgba(212,168,83,0.1)] transition-shadow duration-300">
                      <service.icon className="w-7 h-7 text-[#D4A853]" />
                    </div>

                    {/* Title */}
                    <h3
                      className="text-lg font-semibold text-white mb-3"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[rgba(245,245,245,0.5)] leading-relaxed mb-5">
                      {service.description}
                    </p>

                    {/* Learn More link */}
                    <div className="flex items-center gap-2 text-sm font-medium text-[#D4A853] group-hover:text-[#E8C97A] transition-colors duration-300">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ────────────────────── 5. PROCESS SECTION ──────────────────── */}
      <section className="relative py-24 md:py-32 bg-[#0A0A0B]">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.15)] to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="How We Work"
            title="Our 5-Phase"
            titleHighlight="Delivery Framework"
            description="A battle-tested process that transforms your vision into a live, high-performance digital asset — with clarity at every step."
            align="center"
          />

          {/* Desktop horizontal timeline */}
          <div className="hidden lg:block">
            <StaggerContainer className="relative" staggerDelay={0.15}>
              {/* Connecting line */}
              <div className="absolute top-[44px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-[rgba(212,168,83,0.3)] via-[rgba(212,168,83,0.15)] to-[rgba(212,168,83,0.3)]" />

              <div className="grid grid-cols-5 gap-4">
                {processSteps.map((step, idx) => (
                  <StaggerItem key={step.num}>
                    <div className="relative flex flex-col items-center text-center">
                      {/* Step circle */}
                      <div className="relative z-10 w-[88px] h-[88px] rounded-full bg-[#131316] border-2 border-[rgba(212,168,83,0.3)] flex items-center justify-center mb-6 group hover:border-[#D4A853] hover:shadow-lg hover:shadow-[rgba(212,168,83,0.15)] transition-all duration-300">
                        <span
                          className="text-2xl font-bold text-gradient-gold"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {step.num}
                        </span>
                      </div>

                      {/* Content */}
                      <h4
                        className="text-base font-semibold text-white mb-2"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {step.title}
                      </h4>
                      <p className="text-xs text-[rgba(245,245,245,0.45)] leading-relaxed max-w-[200px]">
                        {step.description}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>

          {/* Mobile vertical timeline */}
          <div className="lg:hidden">
            <StaggerContainer className="relative ml-8" staggerDelay={0.1}>
              {/* Vertical line */}
              <div className="absolute left-0 top-6 bottom-6 w-[2px] bg-gradient-to-b from-[rgba(212,168,83,0.3)] via-[rgba(212,168,83,0.15)] to-[rgba(212,168,83,0.3)]" />

              {processSteps.map((step) => (
                <StaggerItem key={step.num}>
                  <div className="relative flex gap-6 pb-10 last:pb-0">
                    {/* Circle */}
                    <div className="relative z-10 w-12 h-12 shrink-0 rounded-full bg-[#131316] border-2 border-[rgba(212,168,83,0.3)] flex items-center justify-center">
                      <span
                        className="text-sm font-bold text-[#D4A853]"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {step.num}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="pt-1">
                      <h4
                        className="text-base font-semibold text-white mb-1.5"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {step.title}
                      </h4>
                      <p className="text-sm text-[rgba(245,245,245,0.45)] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ──────────────────── 6. TESTIMONIALS SECTION ───────────────── */}
      <section className="relative py-24 md:py-32 bg-[#0A0A0B]">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.15)] to-transparent" />
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[rgba(212,168,83,0.02)] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Testimonials"
            title="Trusted by SA's"
            titleHighlight="Forward-Thinkers"
            description="Real results from real clients. Hear how we've helped institutions across South Africa transform their digital presence."
            align="center"
          />

          {/* Testimonial Carousel */}
          <AnimatedSection delay={0.1} direction="up">
            <div
              className="relative mx-auto max-w-5xl"
              onMouseEnter={() => setIsHoveringCarousel(true)}
              onMouseLeave={() => setIsHoveringCarousel(false)}
            >
              <Carousel
                setApi={setCarouselApi}
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {testimonials.map((testimonial, idx) => (
                    <CarouselItem
                      key={idx}
                      className="pl-4 md:basis-1/2 lg:basis-1/3"
                    >
                      <div className="group relative h-full rounded-2xl bg-[#131316] border border-[rgba(255,255,255,0.06)] p-6 md:p-8 card-hover flex flex-col">
                        {/* Quote icon */}
                        <Quote className="w-10 h-10 text-[rgba(212,168,83,0.2)] mb-5 shrink-0" />

                        {/* Quote text */}
                        <p className="text-sm md:text-base text-[rgba(245,245,245,0.6)] leading-relaxed mb-6 flex-1">
                          &ldquo;{testimonial.quote}&rdquo;
                        </p>

                        {/* Star rating */}
                        <div className="flex gap-1 mb-5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 text-[#D4A853] fill-[#D4A853]"
                            />
                          ))}
                        </div>

                        <Separator className="bg-[rgba(255,255,255,0.06)] mb-5" />

                        {/* Author info */}
                        <div className="flex items-start gap-4">
                          {/* Avatar placeholder */}
                          <div className="w-11 h-11 shrink-0 rounded-full bg-gradient-to-br from-[rgba(212,168,83,0.2)] to-[rgba(212,168,83,0.05)] border border-[rgba(212,168,83,0.15)] flex items-center justify-center">
                            <span className="text-sm font-bold text-[#D4A853]">
                              {testimonial.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)}
                            </span>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-white">
                              {testimonial.name}
                            </h4>
                            <p className="text-xs text-[rgba(245,245,245,0.4)]">
                              {testimonial.role}
                            </p>
                            <p className="text-xs text-[#D4A853] mt-0.5">
                              {testimonial.company}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious
                  className="hidden md:flex -left-6 lg:-left-14 border-[rgba(212,168,83,0.3)] bg-[#131316]/90 hover:bg-[#1A1A1F] text-[#D4A853] hover:text-[#E8C97A] hover:border-[#D4A853] transition-all duration-300"
                />
                <CarouselNext
                  className="hidden md:flex -right-6 lg:-right-14 border-[rgba(212,168,83,0.3)] bg-[#131316]/90 hover:bg-[#1A1A1F] text-[#D4A853] hover:text-[#E8C97A] hover:border-[#D4A853] transition-all duration-300"
                />
              </Carousel>

              {/* Dot indicators */}
              <div className="flex items-center justify-center gap-2 mt-8">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => carouselApi?.scrollTo(idx)}
                    className={`transition-all duration-300 rounded-full ${
                      currentSlide === idx
                        ? "w-8 h-2 bg-[#D4A853]"
                        : "w-2 h-2 bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.35)]"
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ────────────────── 7. PACKAGES PREVIEW SECTION ────────────── */}
      <section className="relative py-24 md:py-32 bg-[#0A0A0B]">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.15)] to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Pricing"
            title="Transparent Pricing."
            titleHighlight="No Surprises."
            description="Every package is built around real business outcomes. No hidden fees, no recurring surprises. Pick your tier and let's build."
            align="center"
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start" staggerDelay={0.12}>
            {packages.map((pkg) => (
              <StaggerItem key={pkg.name}>
                <div
                  className={`relative h-full rounded-2xl ${
                    pkg.popular
                      ? "bg-[#131316] border-2 border-[rgba(212,168,83,0.3)] glow-gold md:-mt-4 md:mb-[-16px] z-10"
                      : "bg-[#131316] border border-[rgba(255,255,255,0.06)]"
                  } p-6 md:p-8 card-hover flex flex-col`}
                >
                  {/* Popular badge */}
                  {pkg.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-[#D4A853] to-[#B8922F] text-[#0A0A0B] font-semibold text-xs px-4 py-1 border-0 shadow-lg shadow-[rgba(212,168,83,0.25)]">
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  {/* Package name & description */}
                  <div className="mb-6">
                    <h3
                      className="text-xl font-bold text-white mb-1"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-[rgba(245,245,245,0.4)]">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <span
                      className="text-3xl md:text-4xl font-bold text-gradient-gold"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {pkg.price}
                    </span>
                    <span className="text-sm text-[rgba(245,245,245,0.4)] ml-1">
                      once-off
                    </span>
                  </div>

                  <Separator className="bg-[rgba(255,255,255,0.06)] mb-6" />

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {pkg.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-[rgba(245,245,245,0.6)]"
                      >
                        <CheckCircle className="w-4 h-4 text-[#D4A853] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    onClick={() => handleNavClick("packages")}
                    variant={pkg.popular ? "default" : "outline"}
                    className={`w-full font-semibold py-5.5 rounded-xl transition-all duration-300 group ${
                      pkg.popular
                        ? "bg-gradient-to-r from-[#D4A853] to-[#B8922F] hover:from-[#E8C97A] hover:to-[#D4A853] text-[#0A0A0B] shadow-lg shadow-[rgba(212,168,83,0.2)] hover:shadow-[rgba(212,168,83,0.3)]"
                        : "border-[rgba(255,255,255,0.12)] bg-transparent hover:bg-white/5 text-white"
                    }`}
                  >
                    View All Packages
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ──────────────────── 8. FINAL CTA SECTION ─────────────────── */}
      <section className="relative py-24 md:py-32 bg-[#0A0A0B]">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.15)] to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up">
            <div className="relative overflow-hidden rounded-3xl border border-gradient-gold">
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(212,168,83,0.08)] via-[rgba(19,19,22,0.95)] to-[rgba(212,168,83,0.04)]" />
              <div className="absolute inset-0 bg-dots opacity-40" />

              {/* Decorative glows */}
              <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-[rgba(212,168,83,0.06)] rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-[rgba(212,168,83,0.04)] rounded-full blur-[100px] pointer-events-none" />

              <div className="relative z-10 px-6 py-14 md:px-16 md:py-20 lg:px-24 lg:py-24 text-center">
                {/* Heading */}
                <h2
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Ready When You Are
                </h2>

                {/* Persuasive copy */}
                <p className="text-base md:text-lg text-[rgba(245,245,245,0.55)] max-w-2xl mx-auto leading-relaxed mb-10">
                  Book a free 30-minute discovery call and walk away with a clear,
                  no-obligation roadmap — even if you don&apos;t work with us.
                  No high-pressure sales. Just honest strategy from people who
                  build for a living.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    onClick={() => handleNavClick("contact")}
                    size="lg"
                    className="bg-gradient-to-r from-[#D4A853] to-[#B8922F] hover:from-[#E8C97A] hover:to-[#D4A853] text-[#0A0A0B] font-semibold px-10 py-6 text-base rounded-xl shadow-lg shadow-[rgba(212,168,83,0.25)] hover:shadow-[rgba(212,168,83,0.35)] transition-all duration-300 group"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Schedule a Call
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <a
                    href="https://wa.me/27724026893"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-10 py-6 text-base font-semibold rounded-xl border border-[rgba(255,255,255,0.15)] bg-transparent text-white hover:bg-white/5 hover:border-[rgba(255,255,255,0.25)] transition-all duration-300 group"
                  >
                    <MessageCircle className="w-5 h-5 mr-2 text-[#25D366]" />
                    WhatsApp Us
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>

                {/* Micro-copy */}
                <p className="mt-6 text-xs text-[rgba(245,245,245,0.3)]">
                  No commitment required · Response within 2 hours · Available Mon–Sat
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
