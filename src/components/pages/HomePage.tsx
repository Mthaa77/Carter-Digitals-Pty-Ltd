"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
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
  CheckCircle,
  ChevronRight,
  Sparkles,
  Cloud,
  Database,
  Terminal,
  FileText,
  GraduationCap,
  Scale,
  HeartPulse,
  Landmark,
  Building2,
  BarChart3,
  Timer,
  Users,
  Trophy,
  Lock,
  Clock,
  Headphones,
  Target,
  Play,
  Rocket,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { CircularProgress } from "@/components/shared/CircularProgress";
import { QuickCalculator } from "@/components/shared/QuickCalculator";
import { BeforeAfterSlider } from "@/components/shared/BeforeAfterSlider";
import InteractiveTestimonials from "@/components/shared/InteractiveTestimonials";
import FaqSearch from "@/components/shared/FaqSearch";
import CosmicDecorations from "@/components/shared/CosmicDecorations";
import { useNavigation } from "@/lib/navigation";

/* ─────────────────────────── DATA ─────────────────────────── */

const floatingShapes = [
  { size: 320, x: "10%", y: "15%", delay: 0, duration: 20, opacity: 0.04 },
  { size: 200, x: "75%", y: "10%", delay: 2, duration: 25, opacity: 0.03 },
  { size: 160, x: "85%", y: "65%", delay: 4, duration: 22, opacity: 0.05 },
  { size: 260, x: "5%", y: "60%", delay: 1, duration: 18, opacity: 0.03 },
  { size: 120, x: "50%", y: "80%", delay: 3, duration: 15, opacity: 0.04 },
];

const aboutFeatures = [
  {
    icon: Zap,
    title: "Accelerated Delivery",
    description: "Engineered for speed — from brief to launch in 5–7 business days. No bloat, no scope creep, just relentless execution that outpaces every competitor.",
    large: true,
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Stack",
    description: "Architected on Next.js and deployed on Vercel's edge network. Your infrastructure loads in milliseconds, not seconds.",
  },
  {
    icon: TrendingUp,
    title: "Results That Compound",
    description: "Google-ranking architecture, conversion-optimised design, and SEO engineered from day one. Real outcomes, not vanity metrics.",
  },
  {
    icon: KeyRound,
    title: "Zero Lock-In. Ever.",
    description: "Full source code ownership upon handover. No contracts, no recurring licensing. Your digital asset, your rules.",
  },
];

const services = [
  {
    icon: Globe,
    title: "Website Development",
    description: "High-performance, SEO-architected websites engineered to rank, convert, and scale — deployed on edge infrastructure for blistering speed.",
  },
  {
    icon: Code,
    title: "Bespoke Web Applications",
    description: "Custom-built SaaS platforms, client portals, booking systems, and mission-critical dashboards tailored to your operations.",
  },
  {
    icon: Settings,
    title: "Internal Business Tools",
    description: "Purpose-built operational tools: inventory systems, CRM integrations, reporting engines — everything your team needs to perform.",
  },
  {
    icon: Bot,
    title: "AI-Powered Solutions",
    description: "Intelligent chatbots, automated workflows, and AI-driven analytics that unleash a decisive competitive advantage.",
  },
  {
    icon: Palette,
    title: "Brand Identity & Design",
    description: "From logo systems to comprehensive brand guidelines — visual identities that command attention and instil trust.",
  },
  {
    icon: Presentation,
    title: "Pitch Decks & Profiles",
    description: "Investor-ready pitch decks and compelling company profiles that dominate boardrooms and win stakeholder buy-in.",
  },
];

const sectors = [
  { icon: GraduationCap, name: "Education", description: "School management systems, enrollment portals, and institutional websites that transform how schools operate and communicate." },
  { icon: Scale, name: "Legal", description: "Authority-projecting websites for law firms engineered to drive client inquiries and showcase expertise." },
  { icon: HeartPulse, name: "Healthcare", description: "Patient portals, clinic management tools, and POPIA-compliant medical practice platforms." },
  { icon: Landmark, name: "Government", description: "Municipal websites, public service portals, and end-to-end digital transformation for government departments." },
  { icon: Building2, name: "Hospitality", description: "Booking platforms, restaurant sites, and guest experience tools that fill rooms and tables." },
  { icon: BarChart3, name: "Finance", description: "Secure financial portals, advisory firm websites, and fintech interfaces built for trust and compliance." },
];

const featuredProjects = [
  {
    name: "Soshanguve Secondary School",
    category: "Education",
    description: "Full school management system with online enrollment, parent portal, and Google Workspace integration — architected to transform how the institution engages with parents and learners.",
    results: [
      { label: "Enrollment Increase", value: 340, suffix: "%" },
      { label: "Delivery Time", value: 14, suffix: " Days" },
      { label: "Uptime", value: 99.9, suffix: "%" },
    ],
    gradient: "from-blue-900/30 via-indigo-900/20 to-slate-900/40",
    accentColor: "#6366f1",
  },
  {
    name: "Mogale & Associates Law",
    category: "Legal",
    description: "Premium law firm website with client intake forms, case tracking dashboard, and appointment scheduling — designed to project authority and convert visitors into clients.",
    results: [
      { label: "Inquiry Growth", value: 3, suffix: "x" },
      { label: "Google Rank", value: 1, suffix: "st Page" },
      { label: "Client Rating", value: 5, suffix: "★" },
    ],
    gradient: "from-amber-900/30 via-yellow-900/20 to-stone-900/40",
    accentColor: "#D4A853",
  },
  {
    name: "Gateway Hospitality Group",
    category: "Hospitality",
    description: "Multi-property booking platform with real-time availability, payment processing, and guest management — engineered to maximise revenue and occupancy.",
    results: [
      { label: "Revenue Generated", value: 2.4, suffix: "M", prefix: "R" },
      { label: "Occupancy Rate", value: 85, suffix: "%" },
      { label: "Guest Rating", value: 4.8, suffix: "★" },
    ],
    gradient: "from-emerald-900/30 via-teal-900/20 to-cyan-900/40",
    accentColor: "#10b981",
  },
];

const whyChooseUs = [
  { num: "01", title: "Speed That Dominates", description: "5–7 day delivery without cutting corners. Every line of code is battle-tested, every pixel is intentional. We move faster so you can win sooner." },
  { num: "02", title: "You Own Everything", description: "Full source code, hosting credentials, domain — all yours from day one. Zero lock-in contracts. Walk away anytime with everything you paid for." },
  { num: "03", title: "Results, Not Promises", description: "Google-ranking websites, 340% enrollment surges, 3x inquiry growth. The numbers don't lie — and they're all verifiable." },
  { num: "04", title: "B-BBEE Level 1 Certified", description: "135% procurement recognition means working with us accelerates your own compliance score. A partnership that pays dividends." },
  { num: "05", title: "Full-Stack Engineers", description: "We're not designers who code. We're engineers who design. The difference shows in performance, security, and scalability." },
  { num: "06", title: "Post-Launch Ironclad", description: "30 days of free support, bug fixes, and content updates included in every package. We don't disappear after launch — we stay." },
];

const processSteps = [
  { num: "01", title: "Discovery & Alignment", description: "Deep-dive into your vision, audience, and goals. No assumptions — just rigorous understanding of what success looks like for you." },
  { num: "02", title: "Architecture & Strategy", description: "Strategic sitemaps, user flows, and technical architecture engineered for scale. Every decision backed by data and experience." },
  { num: "03", title: "Design & Engineering", description: "Pixel-perfect design meets clean, maintainable code. Shipped in days, not months — without sacrificing a single detail." },
  { num: "04", title: "QA & Compliance", description: "Rigorous cross-device testing, POPIA compliance checks, and performance audits. We catch what others miss." },
  { num: "05", title: "Launch & Enablement", description: "Go live with full handover, training, and ongoing support. You own everything — and you'll know how to use it." },
];

const testimonials = [
  {
    quote: "Carter Digitals transformed our school's online presence completely. Parents now enroll their children directly through the website, and our Google ranking jumped from page 5 to the top 3 results within two months. The team understood exactly what an educational institution needs.",
    name: "Dr. Thabo Molefe",
    role: "School Principal",
    company: "Rise & Shine Academy, Gauteng",
  },
  {
    quote: "As a growing SME, we needed a professional web presence without the enterprise price tag. Carter Digitals delivered a stunning e-commerce site in under a week. Our online sales increased by 340% in the first quarter. Absolute game-changer.",
    name: "Nomsa Dlamini",
    role: "Founder & CEO",
    company: "Lush Naturals Co., Johannesburg",
  },
  {
    quote: "In the legal industry, credibility is everything. Carter Digitals built us a website that projects authority and professionalism. Client inquiries through the site have tripled. Truly exceptional work from a team that understands our world.",
    name: "Adv. Pieter van der Merwe",
    role: "Senior Partner",
    company: "Van der Merwe & Associates, Pretoria",
  },
];

const packages = [
  { name: "Vula", price: "R3,999", description: "Launch-Ready Starter", popular: false, features: ["5-page responsive website", "Mobile-first design", "Basic SEO & Google setup", "5-7 day delivery"] },
  { name: "Khula", price: "R7,999", description: "Growth-Focused Business", popular: true, features: ["10-page custom website", "Booking / Contact forms", "Advanced SEO & Analytics", "Content management system", "Brand identity starter pack"] },
  { name: "Elevate", price: "R14,999", description: "Enterprise-Grade Platform", popular: false, features: ["Bespoke web application", "Custom integrations & API", "AI-powered chatbot", "Full brand identity design", "Priority support & training"] },
];

const comparisonFeatures = ["Responsive Design", "SEO Optimisation", "Google Integration", "Contact Forms", "Analytics Setup", "Content Updates", "Custom Domain", "SSL Certificate", "Mobile-First Build", "Source Code Ownership"];

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

const trustBadges = ["B-BBEE Level 1", "100% Black-Owned", "CSD Registered", "5-7 Day Delivery", "POPIA Compliant"];

const homeFaqItems = [
  { id: "home-faq-1", question: "How long does it take to build a website?", answer: "5–7 business days from design approval. We've built battle-tested processes and reusable component libraries that let us ship fast without cutting corners. No bloated timelines — just relentless execution." },
  { id: "home-faq-2", question: "Do I own my website after it's built?", answer: "Yes, 100%. Full source code, hosting credentials, domain — all yours from day one. No lock-in contracts, no recurring licensing fees. Your digital asset, your rules." },
  { id: "home-faq-3", question: "What technology do you use?", answer: "We build exclusively on Next.js and deploy on Vercel's edge network — the same infrastructure powering GitHub and Nike. TypeScript throughout for type safety, Tailwind CSS for pixel-perfect styling." },
  { id: "home-faq-4", question: "What support do I get after launch?", answer: "Every package includes 30 days of free post-launch support — bug fixes, content updates, and priority email access. For ongoing needs, our optional retainers cover unlimited edits and new pages." },
  { id: "home-faq-5", question: "Can I integrate with third-party tools?", answer: "Absolutely. We integrate with Google Workspace, WhatsApp, CRM platforms, payment gateways, and more. If you have an existing system, we'll connect it seamlessly." },
  { id: "home-faq-6", question: "What makes Carter Digitals different?", answer: "We're B-BBEE Level 1 certified, 100% Black-Owned, and engineer-grade. We don't design and hope — we architect for results: Google rankings, lead generation, and measurable ROI." },
];

/* ═══════════════════════════════════════════════════════════════
   TYPING TEXT COMPONENT
   ═══════════════════════════════════════════════════════════════ */
function TypingText({ words, className = "" }: { words: string[]; className?: string }) {
  const [displayText, setDisplayText] = useState("");
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);
  const wordIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const lastTimestampRef = useRef<number | null>(null);
  const pauseUntilRef = useRef<number>(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsInView(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const TYPING_SPEED = 80, DELETE_SPEED = 40, PAUSE_DURATION = 2000;
    const animate = (timestamp: number) => {
      if (timestamp < pauseUntilRef.current) { animationRef.current = requestAnimationFrame(animate); return; }
      const word = words[wordIndexRef.current];
      if (!isDeletingRef.current) {
        if (lastTimestampRef.current === null) lastTimestampRef.current = timestamp;
        if (timestamp - lastTimestampRef.current >= TYPING_SPEED) {
          lastTimestampRef.current = timestamp;
          charIndexRef.current += 1;
          setDisplayText(word.slice(0, charIndexRef.current));
          if (charIndexRef.current === word.length) {
            pauseUntilRef.current = timestamp + PAUSE_DURATION;
            isDeletingRef.current = true;
            lastTimestampRef.current = null;
          }
        }
      } else {
        if (lastTimestampRef.current === null) lastTimestampRef.current = timestamp;
        if (timestamp - lastTimestampRef.current >= DELETE_SPEED) {
          lastTimestampRef.current = timestamp;
          charIndexRef.current -= 1;
          setDisplayText(word.slice(0, charIndexRef.current));
          if (charIndexRef.current === 0) {
            isDeletingRef.current = false;
            wordIndexRef.current = (wordIndexRef.current + 1) % words.length;
            lastTimestampRef.current = null;
          }
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, [isInView, words]);

  return (
    <span ref={containerRef} className={className} aria-label={words.join(", ")}>
      <span aria-hidden="true">{displayText}</span>
      <span className="animate-blink text-[#D4A853]" aria-hidden="true">|</span>
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   RESULTS BAR COMPONENT
   ═══════════════════════════════════════════════════════════════ */
function ResultsBar({ label, percentage }: { label: string; percentage: number }) {
  const [width, setWidth] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setTimeout(() => setWidth(percentage), 100); observer.disconnect(); }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [percentage]);
  return (
    <div ref={barRef} className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm md:text-base font-medium text-[rgba(245,245,245,0.7)]">{label}</span>
        <span className="text-sm md:text-base font-bold text-gradient-gold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{width}%</span>
      </div>
      <div className="w-full bg-[rgba(255,255,255,0.06)] rounded-full h-2.5 overflow-hidden">
        <div className="h-2.5 rounded-full bg-gradient-to-r from-[#D4A853] to-[#E8C97A] transition-all duration-1000 ease-out" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   GOLD PARTICLES DATA — deterministic seeded PRNG for SSR hydration
   ═══════════════════════════════════════════════════════════════ */
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
const goldParticles = (() => {
  const rng = seededRandom(42);
  return Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: rng() * 3 + 1,
    x: `${(rng() * 100).toFixed(4)}%`,
    y: `${(rng() * 100).toFixed(4)}%`,
    delay: Number((rng() * 5).toFixed(4)),
    duration: Number((rng() * 4 + 4).toFixed(4)),
    opacity: Number((rng() * 0.5 + 0.2).toFixed(4)),
  }));
})();

/* ═══════════════════════════════════════════════════════════════
   LIVE TICKER COMPONENT
   ═══════════════════════════════════════════════════════════════ */
const tickerRow1Items = [
  "Rise & Shine Academy", "135% B-BBEE Recognition", "Mogale & Associates", "5-7 Day Delivery",
  "Gateway Hospitality", "99.9% Uptime", "Soshanguve Secondary", "50+ Projects Delivered",
  "Tshwane Municipality", "100% Black-Owned", "Nkosi Advisory", "POPIA Compliant",
];
const tickerRow2Items = [
  "Next.js", "React", "CSD Registered", "Python/FastAPI", "PostgreSQL",
  "Level 1 Contributor", "Vercel", "AI-Powered", "Google Cloud", "Tailwind CSS",
  "POPIA Compliant", "TypeScript",
];

function LiveTicker() {
  return (
    <section className="relative w-full bg-[#0A0A0B] overflow-hidden ticker-vertical-fade" aria-label="Live achievements ticker">
      {/* Subtle gold gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(212,168,83,0.08)] via-[rgba(212,168,83,0.12)] to-[rgba(212,168,83,0.08)]" />
      <div className="relative z-10 py-4 md:py-5 space-y-2 md:space-y-3">
        {/* Top row — scrolls left-to-right */}
        <div className="relative overflow-hidden ticker-fade-mask">
          <div className="flex animate-marquee-reverse whitespace-nowrap">
            {[...tickerRow1Items, ...tickerRow1Items].map((item, i) => (
              <div key={`t1-${i}`} className="flex items-center gap-2 px-4 md:px-6 shrink-0">
                <CheckCircle className="w-3 h-3 text-[#D4A853] shrink-0 opacity-70" />
                <span className="text-[10px] md:text-xs font-semibold tracking-[0.12em] uppercase text-[rgba(212,168,83,0.65)]">{item}</span>
                <span className="text-[#D4A853] opacity-40 ml-1">◆</span>
              </div>
            ))}
          </div>
        </div>
        {/* Bottom row — scrolls right-to-left (standard) */}
        <div className="relative overflow-hidden ticker-fade-mask">
          <div className="flex animate-marquee whitespace-nowrap" style={{ animationDuration: "32s" }}>
            {[...tickerRow2Items, ...tickerRow2Items].map((item, i) => (
              <div key={`t2-${i}`} className="flex items-center gap-2 px-4 md:px-6 shrink-0">
                <Sparkles className="w-3 h-3 text-[#D4A853] shrink-0 opacity-70" />
                <span className="text-[10px] md:text-xs font-semibold tracking-[0.12em] uppercase text-[rgba(212,168,83,0.65)]">{item}</span>
                <span className="text-[#D4A853] opacity-40 ml-1">◆</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HOME PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const { navigate } = useNavigation();
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isHoveringCarousel, setIsHoveringCarousel] = useState(false);
  const [billingToggle, setBillingToggle] = useState(false);
  const tickerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const handleNavClick = (page: "contact" | "services" | "packages") => {
    navigate(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Carousel logic
  useEffect(() => {
    if (!carouselApi) return;
    const handler = () => setCurrentSlide(carouselApi.selectedScrollSnap());
    const raf = requestAnimationFrame(handler);
    carouselApi.on("select", handler);
    carouselApi.on("reInit", handler);
    return () => { cancelAnimationFrame(raf); carouselApi.off("select", handler); carouselApi.off("reInit", handler); };
  }, [carouselApi]);

  useEffect(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    if (!isHoveringCarousel) {
      autoplayRef.current = setInterval(() => {
        if (carouselApi && carouselApi.canScrollNext()) carouselApi.scrollNext();
        else carouselApi?.scrollTo(0);
      }, 5000);
    }
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };
  }, [carouselApi, isHoveringCarousel]);

  // Ticker auto-scroll
  useEffect(() => {
    const el = tickerRef.current;
    if (!el) return;
    let animId: number;
    let scrollPos = 0;
    const speed = 0.5;
    const animate = () => {
      if (!isDraggingRef.current) {
        scrollPos += speed;
        if (scrollPos >= el.scrollWidth / 2) scrollPos = 0;
        el.scrollLeft = scrollPos;
      }
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleTickerMouseDown = () => { isDraggingRef.current = true; };
  const handleTickerMouseUp = () => { isDraggingRef.current = false; };
  const handleTickerDragStart = (e: React.DragEvent) => { e.preventDefault(); isDraggingRef.current = true; };
  const handleTickerDragEnd = () => { isDraggingRef.current = false; };

  return (
    <main className="relative overflow-hidden">
      {/* ════════════════════ 1. HERO SECTION ════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center bg-[#0A0A0B] overflow-hidden">
        {/* Cosmic ring decoration behind hero */}
        <CosmicDecorations variant="cosmic-ring" intensity="subtle" />
        {/* Background layers */}
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B] via-transparent to-[#0A0A0B]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(212,168,83,0.03)] via-transparent to-[rgba(212,168,83,0.02)]" />

        {/* Floating shapes with parallax */}
        <ParallaxSection speed={0.1} direction="up" className="absolute inset-0 pointer-events-none">
          {floatingShapes.map((shape, i) => (
            <motion.div key={i} className={`absolute border border-[rgba(212,168,83,0.15)] animate-morph-blob ${i % 2 === 0 ? 'bg-[rgba(212,168,83,0.02)]' : ''}`}
              style={{ width: shape.size, height: shape.size, left: shape.x, top: shape.y, opacity: shape.opacity }}
              animate={{ y: [0, -30, 0, 20, 0], x: [0, 15, 0, -10, 0], rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: shape.duration, delay: shape.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </ParallaxSection>

        {/* Ambient gold glow orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[rgba(212,168,83,0.04)] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[rgba(212,168,83,0.03)] rounded-full blur-[100px] pointer-events-none" />
        <ParallaxSection speed={0.1} direction="up" className="absolute pointer-events-none">
          <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-[rgba(212,168,83,0.03)] rounded-full blur-[150px]" />
        </ParallaxSection>

        {/* Gold particle field */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {goldParticles.map((p) => (
            <div key={p.id} className="absolute rounded-full bg-[#D4A853] animate-particle-drift"
              style={{
                width: p.size, height: p.size, left: p.x, top: p.y,
                opacity: p.opacity, animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s`,
              }} />
          ))}
        </div>

        {/* Kabelo character watermark (bottom-right, partially overlapping) */}
        <div className="absolute bottom-0 right-0 z-0 pointer-events-none hidden lg:block">
          <div className="relative w-[320px] h-[400px] opacity-[0.15] rounded-2xl overflow-hidden"
            style={{ maskImage: "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)" }}>
            <Image src="/images/kabelo-character.png" alt="" fill className="object-cover object-top" unoptimized />
          </div>
        </div>

        {/* Main hero content — two-column layout */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-36 md:pb-20 w-full flex-1 flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
            {/* Left column — text content */}
            <div className="max-w-2xl">
              <AnimatedSection delay={0.1} direction="up">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(212,168,83,0.08)] border border-[rgba(212,168,83,0.15)] mb-8">
                  <Rocket className="w-4 h-4 text-[#D4A853]" />
                  <span className="text-xs font-medium text-[#D4A853] tracking-[0.15em] uppercase">High-Agility Digital Infrastructure</span>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2} direction="up">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold leading-[1.05] tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <span className="text-gradient-gold animate-gradient-text">Built Different.</span>
                  <br />
                  <span className="text-gradient-gold animate-gradient-text">Built African.</span>
                  <br />
                  <span className="text-[#F5F5F5]">Built to Win.</span>
                </h1>
              </AnimatedSection>

              <AnimatedSection delay={0.4} direction="up">
                <p className="mt-6 md:mt-8 text-lg md:text-xl text-[rgba(245,245,245,0.55)] max-w-xl leading-[1.8]">
                  South Africa&apos;s forward-thinking institutions don&apos;t need another digital vendor. They need a builder — someone who delivers on time and leaves institutions stronger.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.6} direction="up">
                <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4">
                  <MagneticButton strength={0.2}>
                    <Button onClick={() => handleNavClick("contact")} size="lg"
                      className="bg-gradient-to-r from-[#D4A853] to-[#B8922F] hover:from-[#E8C97A] hover:to-[#D4A853] text-[#0A0A0B] font-semibold px-8 py-6 text-base rounded-xl shadow-lg shadow-[rgba(212,168,83,0.25)] hover:shadow-[rgba(212,168,83,0.35)] transition-all duration-300 group">
                      Start Your Project <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </MagneticButton>
                  <MagneticButton strength={0.2}>
                    <Button onClick={() => handleNavClick("services")} size="lg" variant="outline"
                      className="border-[rgba(255,255,255,0.15)] bg-transparent hover:bg-white/5 text-white font-semibold px-8 py-6 text-base rounded-xl transition-all duration-300 group">
                      View Our Work <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </MagneticButton>
                </div>
              </AnimatedSection>
            </div>

            {/* Right column — logo in glass-morphism frame */}
            <div className="flex justify-center lg:justify-end order-first lg:order-last">
              <AnimatedSection delay={0.3} direction="up">
                <div className="relative">
                  {/* Ambient glow behind logo */}
                  <div className="absolute -inset-8 bg-[rgba(212,168,83,0.06)] rounded-full blur-[80px] pointer-events-none" />
                  <div className="relative hero-logo-frame animate-logo-glow rounded-3xl p-6 md:p-8">
                    <div className="relative w-[220px] h-[220px] md:w-[300px] md:h-[300px] rounded-2xl overflow-hidden">
                      <Image src="/images/carter-digitals-logo.png" alt="Carter Digitals Logo" fill className="object-contain" priority />
                    </div>
                  </div>
                  {/* Decorative gold accent line below logo */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-[#D4A853] to-transparent opacity-50" />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>

        {/* Trust badges strip */}
        <div className="relative z-10 mt-auto">
          <div className="border-t border-[rgba(212,168,83,0.08)] bg-[rgba(10,10,11,0.8)] backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:gap-x-10">
                {trustBadges.map((badge) => (
                  <div key={badge} className="flex items-center gap-2 text-[rgba(245,245,245,0.5)]">
                    <CheckCircle className="w-4 h-4 text-[#D4A853] shrink-0" />
                    <span className="text-xs md:text-sm font-medium whitespace-nowrap">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-scroll-bounce">
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-[rgba(245,245,245,0.3)]">Scroll</span>
          <ChevronDown className="w-5 h-5 text-[rgba(212,168,83,0.5)]" />
        </div>
      </section>

      {/* ════════════════ 1.5 LIVE TICKER ════════════════ */}
      <LiveTicker />

      {/* ════════════════ 2. ABOUT PREVIEW — BENTO GRID ════════════════ */}
      <section className="relative py-24 md:py-32 bg-[#0A0A0B]">
        {/* Nebula decoration for about section */}
        <CosmicDecorations variant="nebula" intensity="subtle" />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(212,168,83,0.02)] to-transparent pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[rgba(212,168,83,0.03)] rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.2)] to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Who We Are"
            title="We Don't Build Websites."
            titleHighlight="We Engineer Digital Supremacy"
            description="Carter Digitals (Pty) Ltd is a Pretoria-based digital studio that engineers high-performance infrastructure for South Africa's most ambitious institutions. No templates. No compromises. Only digital assets built to dominate."
            align="center"
          />
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5" staggerDelay={0.1}>
            {aboutFeatures.map((feature, idx) => (
              <StaggerItem key={feature.title} className={idx === 0 ? "lg:col-span-2 lg:row-span-1" : ""}>
                {idx === 0 ? (
                  /* Large featured bento card */
                  <div className="group relative h-full rounded-2xl overflow-hidden p-8 md:p-10 hover:-translate-y-1 transition-transform duration-500 hover-lift card-idle-pulse border border-transparent"
                    style={{ background: "linear-gradient(135deg, rgba(212,168,83,0.08) 0%, rgba(19,19,22,0.95) 50%, rgba(212,168,83,0.04) 100%)" }}>
                    <motion.div className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full opacity-30"
                      style={{ background: "radial-gradient(circle, rgba(212,168,83,0.15) 0%, transparent 70%)" }}
                      animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[rgba(212,168,83,0.2)] to-[rgba(212,168,83,0.05)] border border-[rgba(212,168,83,0.2)] flex items-center justify-center shrink-0 group-hover:shadow-lg group-hover:shadow-[rgba(212,168,83,0.15)] transition-shadow duration-500">
                        <feature.icon className="w-10 h-10 text-[#D4A853]" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-extrabold text-white mb-3 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{feature.title}</h3>
                        <p className="text-sm md:text-base text-[rgba(245,245,245,0.55)] leading-[1.8]">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Minimal accent bar cards */
                  <div className="group relative h-full pl-5 py-6 pr-4 hover:-translate-y-1 transition-transform duration-500 border-l-2 border-[rgba(212,168,83,0.2)] hover:border-[#D4A853] bg-transparent hover-lift card-idle-pulse">
                    <div className="w-10 h-10 rounded-lg bg-[rgba(212,168,83,0.08)] flex items-center justify-center mb-4 group-hover:bg-[rgba(212,168,83,0.15)] transition-colors duration-300">
                      <feature.icon className="w-5 h-5 text-[#D4A853]" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{feature.title}</h3>
                    <p className="text-sm text-[rgba(245,245,245,0.45)] leading-[1.8]">{feature.description}</p>
                  </div>
                )}
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ════════════════════ 3. STATS SECTION ════════════════════ */}
      <section className="relative py-20 md:py-28 bg-[#0A0A0B] bg-dots">
        {/* Stardust decoration for stats */}
        <CosmicDecorations variant="stardust" intensity="medium" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.2)] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.2)] to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[rgba(212,168,83,0.03)] rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12" staggerDelay={0.15}>
            {[
              { value: <AnimatedCounter target={100} suffix="%" duration={2000} />, label: "Black-Owned" },
              { value: <AnimatedCounter target={135} suffix="%" duration={2500} />, label: "B-BBEE Procurement" },
              { value: <><span className="text-gradient-gold">5-7</span><span className="text-[rgba(245,245,245,0.4)] text-2xl md:text-3xl lg:text-4xl ml-1">Days</span></>, label: "Delivery Guarantee" },
              { value: <span className="text-gradient-gold">24/7</span>, label: "Uptime Guarantee" },
            ].map((stat, i) => (
              <StaggerItem key={i}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gradient-gold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{stat.value}</div>
                  <p className="text-sm md:text-base text-[rgba(245,245,245,0.5)] font-medium">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ══════════════════ 4. TECH MARQUEE ══════════════════ */}
      <section className="relative py-12 md:py-16 bg-[#0A0A0B] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(212,168,83,0.02)] to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.2)] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.2)] to-transparent" />
        <p className="text-center text-xs font-medium tracking-[0.2em] uppercase text-[rgba(245,245,245,0.3)] mb-8">Technologies We Work With</p>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A0B] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0A0B] to-transparent z-10" />
          <div className="flex animate-marquee">
            {[...techStack, ...techStack].map((tech, i) => (
              <div key={i} className="flex items-center gap-3 px-8 shrink-0">
                <tech.icon className="w-5 h-5 text-[rgba(212,168,83,0.4)]" />
                <span className="text-sm font-medium text-[rgba(245,245,245,0.35)] whitespace-nowrap">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ 5. SERVICES — EXPAND-ON-HOVER ════════════════ */}
      <section className="relative py-24 md:py-32 bg-[#0A0A0B]">
        {/* Constellation decoration for services */}
        <CosmicDecorations variant="constellation" intensity="subtle" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Our Services"
            title="Command Your Digital"
            titleHighlight="Presence With Authority"
            description="Every service meticulously architected to give South African institutions an unassailable competitive advantage — from first pixel to global deployment."
            align="center"
          />
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.08}>
            {services.map((service, idx) => (
              <StaggerItem key={service.title}>
                <div className="group relative rounded-2xl bg-[#111114] border border-[rgba(255,255,255,0.04)] hover:border-[rgba(212,168,83,0.2)] transition-all duration-500 overflow-hidden cursor-pointer hover-lift card-shine-sweep">
                  {/* Numbered gold circle + title row */}
                  <div className="flex items-center gap-4 p-6 pb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[rgba(212,168,83,0.15)] to-[rgba(212,168,83,0.05)] border border-[rgba(212,168,83,0.2)] flex items-center justify-center shrink-0">
                      <span className="text-sm font-extrabold text-[#D4A853]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white tracking-tight group-hover:text-[#E8C97A] transition-colors duration-300" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {service.title}
                    </h3>
                    <service.icon className="w-5 h-5 text-[rgba(212,168,83,0.3)] ml-auto shrink-0 group-hover:text-[#D4A853] transition-colors duration-300" />
                  </div>
                  {/* Gold line separator */}
                  <div className="mx-6 h-px bg-gradient-to-r from-[rgba(212,168,83,0.2)] via-[rgba(212,168,83,0.05)] to-transparent" />
                  {/* Expandable content */}
                  <div className="px-6 overflow-hidden transition-all duration-500 ease-out" style={{ maxHeight: "0px", opacity: 0 }}>
                    <div className="pt-4 pb-6">
                      <p className="text-sm text-[rgba(245,245,245,0.5)] leading-[1.8] mb-4">{service.description}</p>
                      <div className="flex items-center gap-2 text-sm font-medium text-[#D4A853] group-hover:text-[#E8C97A] transition-colors">
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                  {/* Hover state forces open */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="px-6 pt-4">
                      <div className="h-px bg-gradient-to-r from-[rgba(212,168,83,0.2)] via-[rgba(212,168,83,0.05)] to-transparent" />
                    </div>
                    <div className="px-6 pb-6 pt-4">
                      <p className="text-sm text-[rgba(245,245,245,0.5)] leading-[1.8] mb-4">{service.description}</p>
                      <div className="flex items-center gap-2 text-sm font-medium text-[#D4A853] group-hover:text-[#E8C97A] transition-colors">
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ════════════════ 6. INDUSTRY SECTORS — HONEYCOMB ════════════════ */}
      <section className="relative py-24 md:py-32 bg-[#0A0A0B]">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(212,168,83,0.02)] to-transparent pointer-events-none" />
        <div className="absolute top-1/4 left-0 w-[350px] h-[350px] bg-[rgba(212,168,83,0.03)] rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-[rgba(212,168,83,0.025)] rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.2)] to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Sectors"
            title="Purpose-Built for South Africa's"
            titleHighlight="Highest-Stakes Sectors"
            description="From classrooms to courtrooms, clinics to boardrooms — we decode the unique demands of every sector and engineer solutions that outperform."
            align="center"
          />
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto" staggerDelay={0.08}>
            {sectors.map((sector) => (
              <StaggerItem key={sector.name}>
                <div className="group relative cursor-pointer">
                  {/* Hexagonal shape */}
                  <div className="relative aspect-[4/3.5] md:aspect-[4/3] flex flex-col items-center justify-center p-4 md:p-6 transition-all duration-500"
                    style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", background: "linear-gradient(180deg, rgba(212,168,83,0.06) 0%, rgba(19,19,22,0.9) 100%)" }}>
                    {/* Pulsing ring on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <motion.div className="w-16 h-16 rounded-full border border-[rgba(212,168,83,0.4)]"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }} />
                    </div>
                    <sector.icon className="w-8 h-8 md:w-10 md:h-10 text-[rgba(212,168,83,0.4)] group-hover:text-[#D4A853] transition-all duration-500 mb-2 md:mb-3 relative z-10" />
                    <h3 className="text-sm md:text-base font-semibold text-[rgba(245,245,245,0.7)] group-hover:text-white text-center tracking-tight relative z-10" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {sector.name}
                    </h3>
                  </div>
                  {/* Tooltip overlay */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 md:w-56 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 pointer-events-none z-20">
                    <div className="bg-[#1A1A1F] border border-[rgba(212,168,83,0.2)] rounded-xl p-4 shadow-xl shadow-[rgba(0,0,0,0.5)]">
                      <p className="text-xs text-[rgba(245,245,245,0.6)] leading-[1.7] text-center">{sector.description}</p>
                    </div>
                    <div className="w-3 h-3 bg-[#1A1A1F] border-l border-b border-[rgba(212,168,83,0.2)] rotate-45 absolute -top-1.5 left-1/2 -translate-x-1/2" />
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ════════════════ 7. WHY CHOOSE US — SCROLLING TICKER ════════════════ */}
      <section className="relative py-20 md:py-24 bg-[#0A0A0B]">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.2)] to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[rgba(212,168,83,0.025)] rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <SectionHeading
            label="Our Edge"
            title="Why 50+ Institutions"
            titleHighlight="Trust Carter Digitals"
            description="Six uncompromising pillars that separate us from every other digital agency operating in South Africa today."
            align="center"
          />
        </div>
        <AnimatedSection delay={0.1} direction="up">
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-[#0A0A0B] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-[#0A0A0B] to-transparent z-10" />
            <div ref={tickerRef}
              className="flex gap-5 overflow-x-hidden cursor-grab active:cursor-grabbing py-4"
              onMouseDown={handleTickerMouseDown}
              onMouseUp={handleTickerMouseUp}
              onMouseLeave={handleTickerMouseUp}
              onDragStart={handleTickerDragStart}
              onDragEnd={handleTickerDragEnd}>
              {[...whyChooseUs, ...whyChooseUs, ...whyChooseUs].map((usp, i) => (
                <div key={i} className="shrink-0 w-72 md:w-80 rounded-2xl bg-[#111114] border border-[rgba(255,255,255,0.04)] hover:border-[rgba(212,168,83,0.15)] p-6 md:p-8 transition-all duration-500 hover-lift">
                  <span className="text-4xl md:text-5xl font-extrabold text-[rgba(212,168,83,0.1)] block mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{usp.num}</span>
                  <h3 className="text-lg font-semibold text-white mb-2 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{usp.title}</h3>
                  <p className="text-sm text-[rgba(245,245,245,0.45)] leading-[1.8]">{usp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ════════════════ 8. PROCESS TIMELINE ════════════════ */}
      <section className="relative py-24 md:py-32 bg-[#0A0A0B]">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(212,168,83,0.02)] to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.2)] to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="How We Work"
            title="A Ruthlessly Efficient"
            titleHighlight="5-Phase Delivery Engine"
            description="A battle-tested methodology that transforms your vision into a live, revenue-generating digital asset — with absolute clarity at every phase."
            align="center"
          />
          {/* Desktop timeline */}
          <div className="hidden lg:block">
            <StaggerContainer className="relative" staggerDelay={0.15}>
              <div className="absolute top-[44px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-[rgba(212,168,83,0.3)] via-[rgba(212,168,83,0.15)] to-[rgba(212,168,83,0.3)]" />
              <div className="grid grid-cols-5 gap-4">
                {processSteps.map((step) => (
                  <StaggerItem key={step.num}>
                    <div className="relative flex flex-col items-center text-center">
                      <div className="relative z-10 w-[88px] h-[88px] rounded-full bg-[#131316] border-2 border-[rgba(212,168,83,0.3)] flex items-center justify-center mb-6 hover:border-[#D4A853] hover:shadow-lg hover:shadow-[rgba(212,168,83,0.15)] transition-all duration-300">
                        <span className="text-2xl font-extrabold text-gradient-gold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{step.num}</span>
                      </div>
                      <h4 className="text-base font-semibold text-white mb-2 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{step.title}</h4>
                      <p className="text-xs text-[rgba(245,245,245,0.45)] leading-relaxed max-w-[200px]">{step.description}</p>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>
          {/* Mobile timeline */}
          <div className="lg:hidden">
            <StaggerContainer className="relative ml-8" staggerDelay={0.1}>
              <div className="absolute left-0 top-6 bottom-6 w-[2px] bg-gradient-to-b from-[rgba(212,168,83,0.3)] via-[rgba(212,168,83,0.15)] to-[rgba(212,168,83,0.3)]" />
              {processSteps.map((step) => (
                <StaggerItem key={step.num}>
                  <div className="relative flex gap-6 pb-10 last:pb-0">
                    <div className="relative z-10 w-12 h-12 shrink-0 rounded-full bg-[#131316] border-2 border-[rgba(212,168,83,0.3)] flex items-center justify-center">
                      <span className="text-sm font-bold text-[#D4A853]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{step.num}</span>
                    </div>
                    <div className="pt-1">
                      <h4 className="text-base font-semibold text-white mb-1.5 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{step.title}</h4>
                      <p className="text-sm text-[rgba(245,245,245,0.45)] leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ════════════════ 9. TESTIMONIALS — INTERACTIVE FEATURED ════════════════ */}
      <section className="relative py-24 md:py-32 bg-[#0A0A0B]">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.2)] to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[rgba(212,168,83,0.02)] rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Testimonials"
            title="The Results Speak for"
            titleHighlight="Themselves"
            description="Don't take our word for it — hear directly from the institutions we've partnered with to engineer transformative digital outcomes."
            align="center"
          />
          <AnimatedSection delay={0.15} direction="up">
            <InteractiveTestimonials />
          </AnimatedSection>
        </div>
      </section>

      {/* ════════════════ 10. FEATURED PROJECTS — INTERACTIVE SHOWCASE ════════════════ */}
      <section className="relative py-24 md:py-32 bg-[#0A0A0B] grain-texture overflow-hidden">
        {/* Aurora decoration for featured projects */}
        <CosmicDecorations variant="aurora" intensity="subtle" />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(212,168,83,0.02)] to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.2)] to-transparent" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[rgba(212,168,83,0.025)] rounded-full blur-[150px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Our Work"
            title="Case Studies in"
            titleHighlight="Digital Transformation"
            description="Every project is a testament to what's possible when engineering rigour meets creative ambition. Hover to explore the results."
            align="center"
          />
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6" staggerDelay={0.12}>
            {featuredProjects.map((project, idx) => (
              <StaggerItem key={project.name}>
                <div className="group relative rounded-2xl border border-[rgba(255,255,255,0.06)] hover:border-[rgba(212,168,83,0.2)] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[rgba(212,168,83,0.08)] bg-[#111114] h-full hover-lift">
                  {/* Gradient header */}
                  <div className={`relative h-40 md:h-48 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-transparent to-transparent" />
                    {/* Animated stat counters on hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <div className="flex items-center gap-4">
                        {project.results.slice(0, 2).map((result) => (
                          <div key={result.label} className="text-center flex-1">
                            <span className="text-xl font-extrabold text-white block" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                              {result.prefix && <span className="text-sm text-[rgba(245,245,245,0.5)]">{result.prefix}</span>}
                              <AnimatedCounter target={result.value} suffix={result.suffix} duration={1500} />
                            </span>
                            <span className="text-[10px] text-[rgba(245,245,245,0.5)] uppercase tracking-wider">{result.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-[rgba(0,0,0,0.4)] backdrop-blur-sm border border-[rgba(255,255,255,0.1)] text-white text-[10px] font-medium px-2.5 py-0.5">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 tracking-tight group-hover:text-[#E8C97A] transition-colors duration-300" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {project.name}
                    </h3>
                    <p className="text-sm text-[rgba(245,245,245,0.45)] leading-[1.7] mb-4 line-clamp-2">{project.description}</p>
                    {/* Third result stat always visible */}
                    <div className="flex items-center justify-between py-3 border-t border-[rgba(255,255,255,0.06)]">
                      <span className="text-xs text-[rgba(245,245,245,0.4)]">{project.results[2].label}</span>
                      <span className="text-lg font-extrabold text-gradient-gold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        <AnimatedCounter target={project.results[2].value} suffix={project.results[2].suffix} duration={2000} />
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-[#D4A853] group-hover:text-[#E8C97A] transition-colors cursor-pointer mt-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <span>Explore Case Study</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ════════════════ 11. BEFORE & AFTER — TRANSFORMATION SHOWCASE ════════════════ */}
      <section className="relative py-24 md:py-32 bg-[#0A0A0B]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(212,168,83,0.015)] to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.2)] to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Transformations"
            title="Before & After."
            titleHighlight="See The Difference."
            description="Drag the slider to compare what our clients had before — and what they got after partnering with Carter Digitals. Real projects, real results."
            align="center"
          />
          <AnimatedSection delay={0.15} direction="up">
            <BeforeAfterSlider />
          </AnimatedSection>
        </div>
      </section>

      {/* ════════════════ 12. QUICK CALCULATOR ════════════════ */}
      <section className="relative py-24 md:py-32 bg-[#0A0A0B]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(212,168,83,0.015)] to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.2)] to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Budget"
            title="Plan Your Investment."
            titleHighlight="See What's Possible."
            description="Our interactive estimator gives you an instant ballpark. Get a precise, tailored quote on a 30-minute discovery call — no obligation."
            align="center"
          />
          <AnimatedSection delay={0.15} direction="up">
            <div className="max-w-2xl mx-auto">
              <QuickCalculator />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ════════════════ 11. PACKAGES — COMPARISON TABLE ════════════════ */}
      <section className="relative py-24 md:py-32 bg-[#0A0A0B]">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(212,168,83,0.02)] to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-[rgba(212,168,83,0.025)] rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.2)] to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Pricing"
            title="Invest With Confidence."
            titleHighlight="Reap Exceptional Returns."
            description="Every tier is architected around measurable business outcomes. No hidden fees, no recurring surprises — pick your tier and let's engineer your advantage."
            align="center"
          />

          {/* Billing toggle */}
          <AnimatedSection delay={0.1} direction="up">
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className={`text-sm font-medium transition-colors duration-300 ${!billingToggle ? "text-white" : "text-[rgba(245,245,245,0.4)]"}`}>Once-Off</span>
              <button onClick={() => setBillingToggle(!billingToggle)}
                className="relative w-14 h-7 rounded-full bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] transition-colors duration-300 hover:border-[rgba(212,168,83,0.3)]"
                aria-label="Toggle billing period">
                <div className={`absolute top-0.5 w-6 h-6 rounded-full transition-all duration-300 ${billingToggle ? "left-7 bg-[#D4A853]" : "left-0.5 bg-[rgba(245,245,245,0.5)]"}`} />
              </button>
              <span className={`text-sm font-medium transition-colors duration-300 ${billingToggle ? "text-white" : "text-[rgba(245,245,245,0.4)]"}`}>Monthly</span>
            </div>
          </AnimatedSection>

          {/* Comparison table */}
          <AnimatedSection delay={0.15} direction="up">
            <div className="overflow-x-auto rounded-2xl border border-[rgba(255,255,255,0.06)]">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-[rgba(255,255,255,0.06)]">
                    <th className="text-left p-5 md:p-6 text-sm font-medium text-[rgba(245,245,245,0.4)] w-1/4">Features</th>
                    {packages.map((pkg) => (
                      <th key={pkg.name} className={`p-5 md:p-6 text-center ${pkg.popular ? "relative bg-[rgba(212,168,83,0.04)]" : ""}`}>
                        {pkg.popular && (
                          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D4A853] via-[#E8C97A] to-[#D4A853]" />
                        )}
                        <h3 className="text-lg font-bold text-white tracking-tight mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{pkg.name}</h3>
                        <p className="text-2xl font-extrabold text-gradient-gold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{pkg.price}</p>
                        <p className="text-xs text-[rgba(245,245,245,0.3)]">{pkg.description}</p>
                        {pkg.popular && (
                          <Badge className="mt-3 bg-gradient-to-r from-[#D4A853] to-[#B8922F] text-[#0A0A0B] font-semibold text-[10px] px-3 py-0.5 border-0">Most Popular</Badge>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, fidx) => (
                    <tr key={feature} className={`border-b border-[rgba(255,255,255,0.04)] ${fidx % 2 === 0 ? "bg-[rgba(255,255,255,0.01)]" : ""}`}>
                      <td className="p-4 md:p-5 text-sm text-[rgba(245,245,245,0.6)]">{feature}</td>
                      {packages.map((pkg) => {
                        const maxFeatures = Math.max(...packages.map(p => p.features.length));
                        const featureIdx = pkg.features.findIndex(f => f.toLowerCase().includes(feature.toLowerCase().split(" ")[0]));
                        const hasFeature = featureIdx >= 0;
                        return (
                          <td key={pkg.name} className={`p-4 md:p-5 text-center ${pkg.popular ? "bg-[rgba(212,168,83,0.02)]" : ""}`}>
                            {hasFeature ? (
                              <CheckCircle className="w-5 h-5 text-[#D4A853] mx-auto" />
                            ) : (
                              <span className="text-[rgba(245,245,245,0.15)]">—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="p-5"></td>
                    {packages.map((pkg) => (
                      <td key={pkg.name} className={`p-5 text-center ${pkg.popular ? "bg-[rgba(212,168,83,0.04)]" : ""}`}>
                        <Button onClick={() => handleNavClick("packages")}
                          variant={pkg.popular ? "default" : "outline"}
                          className={`w-full font-semibold py-3 rounded-xl transition-all duration-300 group text-sm ${pkg.popular
                            ? "bg-gradient-to-r from-[#D4A853] to-[#B8922F] hover:from-[#E8C97A] hover:to-[#D4A853] text-[#0A0A0B] shadow-lg shadow-[rgba(212,168,83,0.2)]"
                            : "border-[rgba(255,255,255,0.12)] bg-transparent hover:bg-white/5 text-white"}`}>
                          Get Started <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tfoot>
              </table>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ════════════════ 12. CLIENT SUCCESS METRICS — CIRCULAR PROGRESS ════════════════ */}
      <AnimatedSection direction="up">
        <section className="relative py-24 md:py-32 bg-[#0A0A0B] grain-texture overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-[rgba(212,168,83,0.04)] rounded-full blur-[160px] pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.2)] to-transparent" />
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              label="Impact"
              title="Metrics That"
              titleHighlight="Define Our Standard"
              description="Real performance data from real projects. These aren't aspirational targets — they're our baseline expectations for every engagement."
              align="center"
            />
            <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10" staggerDelay={0.12}>
              <StaggerItem>
                <CircularProgress value={98} label="Client Satisfaction" suffix="%" size={130} color="#E8C97A" icon={<Star className="w-4 h-4" />} />
              </StaggerItem>
              <StaggerItem>
                <CircularProgress value={100} label="On-Time Delivery" suffix="%" size={130} color="#D4A853" icon={<Clock className="w-4 h-4" />} />
              </StaggerItem>
              <StaggerItem>
                <CircularProgress value={85} label="Avg. SEO Rank Jump" suffix="%" size={130} color="#E8C97A" icon={<TrendingUp className="w-4 h-4" />} />
              </StaggerItem>
              <StaggerItem>
                <CircularProgress value={96} label="Client Retention" suffix="%" size={130} color="#D4A853" icon={<Users className="w-4 h-4" />} />
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>
      </AnimatedSection>

      {/* ════════════════ 13. IRON-CLAD PROMISE — GLASSMORPHISM CARDS ════════════════ */}
      <AnimatedSection direction="up">
        <section className="relative py-24 md:py-32 bg-[#0A0A0B]">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.2)] to-transparent" />
          <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-[rgba(212,168,83,0.025)] rounded-full blur-[160px] pointer-events-none" />
          <div className="absolute bottom-1/3 right-0 w-[350px] h-[350px] bg-[rgba(212,168,83,0.02)] rounded-full blur-[140px] pointer-events-none" />
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              label="Our Promise"
              title="An Iron-Clad"
              titleHighlight="Commitment To Your Success"
              description="Every word below is backed by our track record. No fine print, no asterisks, no legal loopholes — just unwavering accountability."
              align="center"
            />
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6" staggerDelay={0.1}>
              {[
                {
                  icon: <Timer className="w-7 h-7 text-[#D4A853]" />,
                  title: "5–7 Days or It's Free",
                  description: "Miss your deadline? You pay absolutely nothing. We stake our revenue on our reliability — that's how confident we are in our process.",
                  accent: "from-[rgba(212,168,83,0.15)] to-[rgba(212,168,83,0.02)]",
                },
                {
                  icon: <Lock className="w-7 h-7 text-[#D4A853]" />,
                  title: "Full Ownership. Zero Lock-In.",
                  description: "Source code, hosting credentials, domain — everything belongs to you from day one. No contracts, no recurring licensing fees, ever.",
                  accent: "from-[rgba(232,201,122,0.12)] to-[rgba(184,146,47,0.02)]",
                },
                {
                  icon: <Headphones className="w-7 h-7 text-[#D4A853]" />,
                  title: "30 Days Free Support",
                  description: "Post-launch bug fixes, content updates, and technical guidance — all included at zero extra cost. We don't vanish after handover.",
                  accent: "from-[rgba(212,168,83,0.12)] to-[rgba(212,168,83,0.01)]",
                },
              ].map((promise) => (
                <StaggerItem key={promise.title}>
                  <div className="group relative rounded-2xl glass-gold-premium p-7 md:p-8 h-full hover-lift">
                    {/* Animated gold border glow on hover */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{
                        background: "conic-gradient(from 0deg, rgba(212,168,83,0.3), rgba(212,168,83,0.05), rgba(232,201,122,0.3), rgba(212,168,83,0.05), rgba(212,168,83,0.3))",
                        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        maskComposite: "exclude",
                        WebkitMaskComposite: "xor",
                        padding: "1px",
                        borderRadius: "1rem",
                      }}
                    />
                    <div className="relative z-10">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${promise.accent} border border-[rgba(212,168,83,0.15)] flex items-center justify-center mb-5 group-hover:shadow-lg group-hover:shadow-[rgba(212,168,83,0.1)] transition-shadow duration-500`}>
                        {promise.icon}
                      </div>
                      <h3 className="text-lg font-bold text-white mb-3 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {promise.title}
                      </h3>
                      <p className="text-sm text-[rgba(245,245,245,0.5)] leading-[1.8]">{promise.description}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
            <AnimatedSection delay={0.3} direction="up">
              <p className="text-center text-sm text-[rgba(212,168,83,0.5)] mt-10 font-serif-accent italic">
                &ldquo;Our reputation is our most valuable asset — and we protect it with every line of code.&rdquo;
              </p>
            </AnimatedSection>
          </div>
        </section>
      </AnimatedSection>

      {/* ════════════════ 14. FAQ — SEARCHABLE ACCORDION ════════════════ */}
      <section className="relative py-24 md:py-32 bg-[#0A0A0B]">
        {/* Constellation decoration for FAQ */}
        <CosmicDecorations variant="constellation" intensity="subtle" />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(212,168,83,0.02)] to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[rgba(212,168,83,0.025)] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.2)] to-transparent" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="FAQ"
            title="Frequently Asked"
            titleHighlight="Questions"
            description="Everything you need to know before getting started. Can't find your answer? Drop us a message."
            align="center"
          />

          <AnimatedSection delay={0.15} direction="up">
            <FaqSearch items={homeFaqItems} />
          </AnimatedSection>
        </div>
      </section>

      {/* ════════════════ 15. START YOUR JOURNEY — PREMIUM CTA ════════════════ */}
      <section className="relative py-32 md:py-44 overflow-hidden">
        {/* Nebula decoration for final CTA */}
        <CosmicDecorations variant="nebula" intensity="medium" />
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B] via-[#0D0B08] to-[#0A0A0B]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(212,168,83,0.02)] via-[rgba(212,168,83,0.04)] to-[rgba(212,168,83,0.02)]" />

        {/* Animated gold particle dots floating upward (deterministic to avoid hydration mismatch) */}
        {[
          { w: 2.3, h: 1.8, x: 12, o: 0.25, yEnd: 520, oMid: 0.15, dur: 10, del: 0 },
          { w: 1.5, h: 3.1, x: 28, o: 0.15, yEnd: 780, oMid: 0.20, dur: 12, del: 1.2 },
          { w: 3.0, h: 2.4, x: 45, o: 0.30, yEnd: 600, oMid: 0.18, dur: 8, del: 2.5 },
          { w: 1.8, h: 1.2, x: 62, o: 0.20, yEnd: 900, oMid: 0.12, dur: 14, del: 0.8 },
          { w: 2.7, h: 3.5, x: 78, o: 0.35, yEnd: 450, oMid: 0.22, dur: 9, del: 3.0 },
          { w: 1.2, h: 2.8, x: 90, o: 0.18, yEnd: 700, oMid: 0.25, dur: 11, del: 1.5 },
          { w: 3.4, h: 1.5, x: 5, o: 0.28, yEnd: 550, oMid: 0.14, dur: 10, del: 4.0 },
          { w: 2.1, h: 2.9, x: 22, o: 0.12, yEnd: 850, oMid: 0.20, dur: 13, del: 2.0 },
          { w: 1.6, h: 3.3, x: 38, o: 0.22, yEnd: 480, oMid: 0.16, dur: 7, del: 0.5 },
          { w: 2.8, h: 1.1, x: 55, o: 0.32, yEnd: 650, oMid: 0.19, dur: 11, del: 3.5 },
          { w: 1.4, h: 2.2, x: 72, o: 0.14, yEnd: 950, oMid: 0.23, dur: 15, del: 1.0 },
          { w: 3.2, h: 2.6, x: 85, o: 0.26, yEnd: 520, oMid: 0.17, dur: 9, del: 2.8 },
          { w: 1.9, h: 1.7, x: 15, o: 0.19, yEnd: 730, oMid: 0.21, dur: 12, del: 4.2 },
          { w: 2.5, h: 3.0, x: 33, o: 0.33, yEnd: 560, oMid: 0.13, dur: 8, del: 0.3 },
          { w: 1.3, h: 2.4, x: 50, o: 0.16, yEnd: 820, oMid: 0.24, dur: 14, del: 1.8 },
          { w: 3.6, h: 1.3, x: 68, o: 0.29, yEnd: 470, oMid: 0.15, dur: 10, del: 3.8 },
        ].map((p, i) => (
          <motion.div key={i}
            className="absolute rounded-full bg-[#D4A853]"
            style={{
              width: `${p.w}px`,
              height: `${p.h}px`,
              left: `${p.x}%`,
              bottom: "-10px",
              opacity: p.o,
            }}
            animate={{
              y: [0, -p.yEnd],
              opacity: [p.o, p.oMid, 0],
            }}
            transition={{
              duration: p.dur,
              delay: p.del,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Central gold glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[rgba(212,168,83,0.06)] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection direction="up">
            {/* Animated gold ring */}
            <div className="relative inline-block mb-10">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[rgba(212,168,83,0.15)] to-[rgba(212,168,83,0.03)] border border-[rgba(212,168,83,0.2)] flex items-center justify-center">
                <Play className="w-7 h-7 text-[#D4A853] ml-1" />
              </div>
              {/* Spinning ring */}
              <div className="absolute top-1/2 left-1/2 w-28 h-28 animate-gold-ring-spin"
                style={{
                  borderRadius: "50%",
                  border: "2px dashed rgba(212,168,83,0.2)",
                }}
              />
            </div>

            {/* Tagline */}
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] tracking-tight mb-6"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
              }}>
              <span className="text-[#F5F5F5]">Ready to</span>{" "}
              <span className="font-serif-accent text-gradient-gold">Dominate</span>
              <span className="text-[#F5F5F5]"> Your Market?</span>
            </h2>

            <p className="text-lg md:text-xl text-[rgba(245,245,245,0.5)] max-w-2xl mx-auto leading-[1.8] mb-10">
              Join 50+ South African institutions that chose Carter Digitals to engineer their digital future. Your 30-minute discovery call is free — and it might change everything.
            </p>

            {/* Trust micro-badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
              {["Free Discovery Call", "No Obligation", "Response Within 2 Hours"].map((badge) => (
                <span key={badge} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgba(212,168,83,0.06)] border border-[rgba(212,168,83,0.12)] text-xs font-medium text-[#D4A853]">
                  <CheckCircle className="w-3 h-3" />
                  {badge}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton strength={0.2}>
                <Button onClick={() => handleNavClick("contact")} size="lg"
                  className="bg-gradient-to-r from-[#D4A853] to-[#B8922F] hover:from-[#E8C97A] hover:to-[#D4A853] text-[#0A0A0B] font-semibold px-10 py-6 text-base rounded-xl shadow-lg shadow-[rgba(212,168,83,0.3)] hover:shadow-[rgba(212,168,83,0.4)] transition-all duration-300 group">
                  Start Your Project <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </MagneticButton>
              <MagneticButton strength={0.2}>
                <Button onClick={() => handleNavClick("services")} size="lg" variant="outline"
                  className="border-[rgba(212,168,83,0.3)] bg-transparent hover:bg-[rgba(212,168,83,0.08)] text-[#D4A853] hover:text-[#E8C97A] font-semibold px-10 py-6 text-base rounded-xl transition-all duration-300 group">
                  View Our Work <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </MagneticButton>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
