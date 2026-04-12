"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Globe,
  Code,
  Wrench,
  Palette,
  Printer,
  FileText,
  BarChart3,
  Receipt,
  Calendar,
  Bot,
  Shield,
  ShoppingCart,
  CheckCircle,
  ChevronRight,
  Sparkles,
  Smartphone,
  Gauge,
  Search,
  MessageCircle,
  MapPin,
  Server,
  Lightbulb,
  ClipboardCheck,
  Rocket,
  Zap,
  BotIcon,
  SearchIcon,
  CreditCard,
  Presentation,
  Clock,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ParallaxSection } from "@/components/shared/ParallaxSection";
import { TiltCard } from "@/components/shared/TiltCard";
import { CircularProgress } from "@/components/shared/CircularProgress";
import { useNavigation } from "@/lib/navigation";
import { toast } from "sonner";

/* -------------------- flagship features -------------------- */
const flagshipFeatures = [
  {
    icon: Smartphone,
    title: "Mobile-first design",
  },
  {
    icon: Gauge,
    title: "Core Web Vitals optimised",
  },
  {
    icon: Search,
    title: "Built-in SEO from day one",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp click-to-chat integration",
  },
  {
    icon: MapPin,
    title: "Google Business Profile setup",
  },
  {
    icon: Server,
    title: "Year 1 hosting and domain included",
  },
];

/* -------------------- core services ------------------------- */
const coreServices = [
  {
    icon: Globe,
    title: "Website Development",
    description: "Custom, mobile-first websites built on Next.js with Vercel.",
  },
  {
    icon: Code,
    title: "Bespoke Web Applications",
    description: "Client portals, booking systems, inventory management.",
  },
  {
    icon: Wrench,
    title: "Internal Business Tools",
    description: "Staff dashboards, invoice trackers, pipeline managers.",
  },
  {
    icon: Palette,
    title: "Logo & Brand Identity",
    description: "Professional logo design, brand colour systems, typography guides.",
  },
  {
    icon: Printer,
    title: "Flyers, Posters & Print",
    description: "Event flyers, A5/A4 service posters, promotional banners.",
  },
  {
    icon: Presentation,
    title: "Pitch Decks & Company Profiles",
    description: "Investor-ready pitch decks and corporate profiles.",
  },
  {
    icon: BarChart3,
    title: "Operations Dashboards",
    description: "Live KPI displays, performance trackers, project pipelines.",
  },
  {
    icon: Receipt,
    title: "Quoting, Invoicing & CRM",
    description: "Automated quote generators, invoice trackers, client management.",
  },
  {
    icon: Calendar,
    title: "Booking & Scheduling",
    description: "Online appointment booking, resource scheduling, WhatsApp confirmations.",
  },
  {
    icon: Bot,
    title: "AI-Powered Business Tools",
    description: "Intelligent chatbots, document processors, automated reporting.",
  },
  {
    icon: Shield,
    title: "Portals & Secure Login",
    description: "Staff portals, client-facing portals, role-based access control.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce & Payments",
    description: "Online stores, payment gateways, order tracking.",
  },
];

/* -------------------- process phases ------------------------ */
const processPhases = [
  {
    num: "01",
    title: "Discovery & Alignment",
    timeline: "Day 1",
    description:
      "We map your institutional goals, stakeholder expectations, technical constraints, and compliance requirements. No assumptions -- just deep understanding and a shared roadmap before a single line of code is written.",
    icon: Lightbulb,
  },
  {
    num: "02",
    title: "Architecture & Wireflow",
    timeline: "Day 1–2",
    description:
      "We design the information hierarchy, user journeys, and system architecture upfront. Every page, every flow, every integration is planned and approved before development begins.",
    icon: Code,
  },
  {
    num: "03",
    title: "Design & Build",
    timeline: "Day 2–5",
    description:
      "We develop using modern, secure frameworks, building content and interface as a unified experience. Mobile-first, accessible, and performance-optimised from the ground up.",
    icon: Wrench,
  },
  {
    num: "04",
    title: "QA & Compliance",
    timeline: "Day 5–6",
    description:
      "Cross-device testing, messaging refinement, validation against security, accessibility, SEO, and regulatory standards. We test everything so you don't have to.",
    icon: ClipboardCheck,
  },
  {
    num: "05",
    title: "Launch & Enablement",
    timeline: "Day 6–7",
    description:
      "Deploy, document, and equip your team for full ownership. Training, handover documentation, and post-launch support -- you own everything from day one.",
    icon: Rocket,
  },
];

/* -------------------- add-on services ----------------------- */
const addOns = [
  {
    icon: Bot,
    title: "AI Chatbot & WhatsApp Automation",
    price: "R4,999 once-off",
    altPrice: "R499/mo",
    description:
      "Intelligent chatbot for your website integrated with WhatsApp Business API for automated responses, appointment scheduling, and lead qualification.",
  },
  {
    icon: Search,
    title: "SEO & Google Setup",
    price: "R999 once-off",
    description:
      "Full Google Business Profile optimisation, Search Console integration, sitemap submission, and foundational SEO setup to help you rank from launch day.",
  },
  {
    icon: Server,
    title: "Hosting & Domain Management",
    price: "R1,990/yr",
    altPrice: "R199/mo",
    description:
      "Enterprise-grade hosting on Vercel's edge network with custom domain management, SSL certificates, and 99.9% uptime guarantee.",
  },
  {
    icon: Presentation,
    title: "Company Profile & Pitch Deck",
    price: "R1,999 once-off",
    description:
      "Professional company profile document and investor-ready pitch deck designed to win stakeholder buy-in and secure new business.",
  },
];

/* ═══════════════════════════════════════════════════════════════
   SERVICES PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function ServicesPage() {
  const { navigate } = useNavigation();

  const handleNavClick = (page: "contact" | "packages") => {
    navigate(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="relative overflow-hidden">
      {/* ----------------- 1. PAGE HERO ----------------- */}
      <section className="relative py-24 md:py-36 bg-[#0A0A0B]">
        {/* Background grid */}
        <div className="absolute inset-0 bg-grid pattern-grid-animated" />

        {/* ── Parallax background layers ── */}
        {/* Large gold glow orb — speed 0.15 */}
        <ParallaxSection speed={0.15} direction="up" className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[rgba(212,168,83,0.06)] rounded-full blur-[120px]" />
          <div className="absolute top-[60%] left-[20%] w-[300px] h-[300px] bg-[rgba(212,168,83,0.04)] rounded-full blur-[100px]" />
        </ParallaxSection>

        {/* Small floating geometric shapes — speed 0.08 */}
        <ParallaxSection speed={0.08} direction="up" className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ rotate: 45 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[25%] left-[8%] w-8 h-8 rounded-lg border border-[rgba(212,168,83,0.1)] bg-[rgba(212,168,83,0.03)]"
          />
          <motion.div
            animate={{ rotate: -30 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-[20%] right-[12%] w-6 h-6 rounded-full border border-[rgba(212,168,83,0.08)] bg-[rgba(212,168,83,0.02)]"
          />
          <motion.div
            animate={{ rotate: 60 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[30%] left-[25%] w-10 h-10 rounded-sm border border-[rgba(212,168,83,0.06)] bg-[rgba(212,168,83,0.02)]"
          />
          <motion.div
            animate={{ rotate: -45 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[25%] right-[8%] w-5 h-5 rounded border border-[rgba(212,168,83,0.1)] bg-[rgba(212,168,83,0.03)]"
          />
        </ParallaxSection>

        {/* Grid/dot pattern overlay — speed 0.05 */}
        <ParallaxSection speed={0.05} direction="up" className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-dots opacity-20" />
        </ParallaxSection>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B] via-transparent to-[#0A0A0B]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(212,168,83,0.03)] via-transparent to-[rgba(212,168,83,0.02)]" />

        {/* Content with subtle parallax — speed 0.03 */}
        <ParallaxSection speed={0.03} direction="up">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection delay={0.1} direction="up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(212,168,83,0.08)] border border-[rgba(212,168,83,0.15)] mb-8">
                <Zap className="w-4 h-4 text-[#D4A853]" />
                <span className="text-sm font-medium text-[#D4A853]">
                  What We Deliver
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} direction="up">
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight font-display"
              >
                <span className="text-[#F5F5F5]">Our </span>
                <span className="text-gradient-gold">Services</span>
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.35} direction="up">
              <p
                className="mt-4 text-xl md:text-2xl font-medium text-[rgba(245,245,245,0.5)] tracking-wide font-display"
              >
                From a Single Page to a Full Platform
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.5} direction="up">
              <p className="mt-6 text-base md:text-lg text-[rgba(245,245,245,0.55)] max-w-2xl mx-auto leading-relaxed">
                We design and deliver production-ready digital infrastructure --
                from high-performance websites to AI-powered business systems.
                Everything you need to compete, grow, and lead in the digital age.
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
                  onClick={() => handleNavClick("packages")}
                  size="lg"
                  variant="outline"
                  className="border-[rgba(255,255,255,0.15)] bg-transparent hover:bg-white/5 text-white font-semibold px-8 py-6 text-base rounded-xl transition-all duration-300 group"
                >
                  View Packages
                  <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </ParallaxSection>

        {/* Gold gradient fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0A0B] via-[rgba(10,10,11,0.6)] to-transparent pointer-events-none" />
      </section>

      {/* ---------- 2. FLAGSHIP SERVICE -- WEBSITE DEV ---------- */}
      <section className="relative py-20 md:py-28 bg-[#0A0A0B] section-gold-tint grain-texture">
        <div className="absolute top-0 left-0 right-0 h-px section-divider-gold" />
        {/* Ambient orbs */}
        <div className="ambient-orb ambient-orb-float w-[250px] h-[250px] bg-[rgba(212,168,83,0.03)] top-[20%] right-[-5%]" style={{animationDelay: '3s'}} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up" delay={0.1}>
            <div className="relative rounded-3xl bg-[#131316] border-2 border-[rgba(212,168,83,0.25)] overflow-hidden">
              {/* Gold border glow */}
              <div className="absolute inset-0 rounded-3xl shadow-[0_0_60px_rgba(212,168,83,0.15)] pointer-events-none" />
              <div className="absolute inset-0 bg-dots opacity-20" />
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4A853] to-transparent" />
              {/* Gold glow orbs */}
              <div className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-[rgba(212,168,83,0.06)] rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-[250px] h-[250px] bg-[rgba(212,168,83,0.04)] rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10 p-8 md:p-12 lg:p-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                  {/* Left content */}
                  <div>
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-[rgba(212,168,83,0.1)] text-[#D4A853] border border-[rgba(212,168,83,0.2)] mb-6">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4A853]" />
                      Flagship Service
                    </span>

                    <h2
                      className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-3 font-display"
                    >
                      Website{" "}
                      <span className="text-gradient-gold">Development</span>
                    </h2>
                    <p
                      className="text-lg text-[#D4A853] font-medium mb-6 font-display"
                    >
                      Your Digital Foundation
                    </p>

                    <div className="space-y-4 text-[rgba(245,245,245,0.6)] leading-relaxed">
                      <p>
                        Your website isn&#39;t marketing -- it&#39;s
                        infrastructure. It&#39;s the first place clients,
                        patients, parents, and partners go to evaluate your
                        credibility. We build sites that load fast, rank high,
                        and convert visitors into action-takers.
                      </p>
                      <p>
                        Every Carter Digitals website is custom-designed,
                        mobile-first, and built on Next.js -- the same framework
                        used by Vercel, Netflix, and TikTok. Deployed on
                        Vercel&#39;s global edge network for sub-second load
                        times, anywhere in South Africa.
                      </p>
                    </div>
                  </div>

                  {/* Right: Why Next.js features with parallax */}
                  <ParallaxSection speed={0.1} direction="up">
                    <div>
                      <h3
                        className="text-xl font-bold text-white mb-6 font-display"
                      >
                        Why Next.js & Vercel?
                      </h3>

                      <StaggerContainer
                        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                        staggerDelay={0.08}
                      >
                        {flagshipFeatures.map((feature) => (
                          <StaggerItem key={feature.title}>
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-[rgba(10,10,11,0.5)] border border-[rgba(255,255,255,0.04)] hover:border-[rgba(212,168,83,0.15)] transition-colors duration-300 hover-lift">
                              <div className="w-9 h-9 shrink-0 rounded-lg bg-[rgba(212,168,83,0.1)] border border-[rgba(212,168,83,0.12)] flex items-center justify-center">
                                <feature.icon className="w-4 h-4 text-[#D4A853]" />
                              </div>
                              <span className="text-sm text-[rgba(245,245,245,0.7)] font-medium leading-snug pt-1.5">
                                {feature.title}
                              </span>
                            </div>
                          </StaggerItem>
                        ))}
                      </StaggerContainer>
                    </div>
                  </ParallaxSection>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ----------------- 3. CORE SERVICES GRID ----------------- */}
      <section className="relative py-20 md:py-28 bg-[#0A0A0B] section-gold-tint">
        <div className="absolute top-0 left-0 right-0 h-px section-divider-gold" />
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[rgba(212,168,83,0.025)] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Full Service Catalogue"
            title="Everything We"
            titleHighlight="Deliver"
            description="A comprehensive suite of digital services designed to give South African institutions a competitive edge -- from concept to deployment and beyond."
            align="center"
          />

          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
            staggerDelay={0.07}
          >
            {coreServices.map((service) => (
              <StaggerItem key={service.title}>
                <TiltCard className="h-full" tiltStrength={4}>
                  <div className="group relative h-full rounded-2xl bg-[#131316] border border-[rgba(255,255,255,0.06)] p-6 card-hover-gold hover:border-[rgba(212,168,83,0.2)] hover-lift overflow-hidden">
                    {/* Gold shimmer on hover */}
                    <div className="absolute inset-0 animate-shimmer-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                    <div className="relative z-10">
                      {/* Icon in gold circle */}
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[rgba(212,168,83,0.18)] to-[rgba(212,168,83,0.05)] border border-[rgba(212,168,83,0.15)] flex items-center justify-center mb-5 group-hover:shadow-lg group-hover:shadow-[rgba(212,168,83,0.12)] transition-shadow duration-300">
                        <service.icon className="w-6 h-6 text-[#D4A853]" />
                      </div>

                      {/* Title */}
                      <h3
                        className="text-lg font-semibold text-white mb-2.5 font-display"
                      >
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-[rgba(245,245,245,0.5)] leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Gold glow accent divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3"><div className="gold-glow-line mx-auto max-w-xs rounded-full" /></div>

      {/* ----------------- 3.5 ANIMATED STATS SECTION ----------------- */}
      <AnimatedSection direction="up">
        <section className="relative py-20 md:py-28 bg-[#0A0A0B]">
          <div className="absolute top-0 left-0 right-0 h-px section-divider-gold" />
          {/* Gold radial glow orbs behind section */}
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[rgba(212,168,83,0.05)] rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-[rgba(212,168,83,0.04)] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[rgba(212,168,83,0.03)] rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              label="By The Numbers"
              title="The Numbers Behind Our"
              titleHighlight="Impact"
              description="Real metrics from real projects. Hard numbers that reflect our commitment to quality, speed, and client satisfaction."
              align="center"
            />

            <StaggerContainer
              className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
              staggerDelay={0.15}
            >
              <StaggerItem>
                <div className="flex flex-col items-center">
                  <CircularProgress
                    value={100}
                    label="Projects Delivered"
                    suffix="+"
                    icon={
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#D4A853]">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    }
                    size={130}
                    strokeWidth={5}
                    duration={2000}
                    color="#D4A853"
                  />
                  <div className="mt-3">
                    <p className="text-2xl md:text-3xl font-extrabold text-gradient-gold font-display text-center">
                      150+
                    </p>
                    <p className="text-sm text-[rgba(245,245,245,0.5)] font-medium text-center mt-1">
                      Projects Delivered
                    </p>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="flex flex-col items-center">
                  <CircularProgress
                    value={98}
                    label="Client Satisfaction"
                    suffix="%"
                    icon={
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#D4A853]">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    }
                    size={130}
                    strokeWidth={5}
                    duration={2200}
                    color="#E8C97A"
                  />
                  <div className="mt-3">
                    <p className="text-2xl md:text-3xl font-extrabold text-gradient-gold font-display text-center">
                      98%
                    </p>
                    <p className="text-sm text-[rgba(245,245,245,0.5)] font-medium text-center mt-1">
                      Client Satisfaction
                    </p>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="flex flex-col items-center">
                  <CircularProgress
                    value={90}
                    label="Active Retainers"
                    suffix="+"
                    icon={
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#D4A853]">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    }
                    size={130}
                    strokeWidth={5}
                    duration={2000}
                    color="#D4A853"
                  />
                  <div className="mt-3">
                    <p className="text-2xl md:text-3xl font-extrabold text-gradient-gold font-display text-center">
                      35+
                    </p>
                    <p className="text-sm text-[rgba(245,245,245,0.5)] font-medium text-center mt-1">
                      Active Retainers
                    </p>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="flex flex-col items-center">
                  <CircularProgress
                    value={85}
                    label="Average Delivery"
                    suffix=""
                    icon={
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#D4A853]">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    }
                    size={130}
                    strokeWidth={5}
                    duration={2000}
                    color="#E8C97A"
                  />
                  <div className="mt-3">
                    <p className="text-2xl md:text-3xl font-extrabold text-gradient-gold font-display text-center">
                      5-7
                    </p>
                    <p className="text-sm text-[rgba(245,245,245,0.5)] font-medium text-center mt-1">
                      Day Average Delivery
                    </p>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px section-divider-gold" />
        </section>
      </AnimatedSection>

      {/* ----------------- 4. PROCESS SECTION ----------------- */}
      <section className="relative py-20 md:py-28 bg-[#0A0A0B] section-gold-tint">
        <div className="absolute top-0 left-0 right-0 h-px section-divider-gold" />
        {/* Gold glow orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-[rgba(212,168,83,0.03)] rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Our Process"
            title="How We"
            titleHighlight="Work"
            description="A battle-tested 5-phase framework that transforms your vision into a live, high-performance digital asset -- with clarity at every step."
            align="center"
          />

          <AnimatedSection direction="up" delay={0.15}>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {processPhases.map((phase, idx) => (
                  <AccordionItem
                    key={phase.num}
                    value={`phase-${phase.num}`}
                    className="rounded-2xl bg-[#131316] border border-[rgba(255,255,255,0.06)] overflow-hidden px-6 data-[state=open]:border-[rgba(212,168,83,0.25)] data-[state=open]:bg-[rgba(19,19,22,0.8)] transition-colors duration-300"
                  >
                    <AccordionTrigger className="hover:no-underline py-5 [&>svg]:text-[#D4A853]">
                      <div className="flex items-center gap-4 text-left">
                        {/* Phase number in gold circle */}
                        <div className="w-11 h-11 shrink-0 rounded-full bg-gradient-to-br from-[rgba(212,168,83,0.2)] to-[rgba(212,168,83,0.08)] border border-[rgba(212,168,83,0.25)] flex items-center justify-center">
                          <span
                            className="text-sm font-bold text-[#D4A853] font-display"
                          >
                            {phase.num}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <phase.icon className="w-5 h-5 text-[rgba(212,168,83,0.6)] hidden sm:block" />
                          <span
                            className="text-base md:text-lg font-semibold text-white font-display"
                          >
                            {phase.title}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide bg-[rgba(212,168,83,0.1)] text-[#D4A853] border border-[rgba(212,168,83,0.2)]">
                            <Clock className="w-2.5 h-2.5" />
                            {phase.timeline}
                          </span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5">
                      <div className="ml-[60px] sm:ml-[76px]">
                        <p className="text-sm md:text-base text-[rgba(245,245,245,0.55)] leading-relaxed">
                          {phase.description}
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ----------------- 5. ADD-ON SERVICES ----------------- */}
      <section className="relative py-20 md:py-28 bg-[#0A0A0B] section-gold-tint">
        <div className="absolute top-0 left-0 right-0 h-px section-divider-gold" />
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-[rgba(212,168,83,0.02)] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Optional Extras"
            title="Supercharge Your"
            titleHighlight="Package"
            description="Enhance your digital infrastructure with powerful add-ons designed to maximise engagement, visibility, and operational efficiency."
            align="center"
          />

          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            staggerDelay={0.1}
          >
            {addOns.map((addon) => (
              <StaggerItem key={addon.title}>
                <div className="group relative h-full rounded-2xl bg-[#131316] border border-[rgba(255,255,255,0.06)] p-6 md:p-8 card-hover-gold overflow-hidden flex flex-col">
                  {/* Gold top accent */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4A853] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-[rgba(212,168,83,0.15)] to-[rgba(212,168,83,0.05)] border border-[rgba(212,168,83,0.12)] flex items-center justify-center">
                      <addon.icon className="w-7 h-7 text-[#D4A853]" />
                    </div>
                    <div className="flex-1">
                      <h3
                        className="text-lg font-bold text-white mb-1 font-display"
                      >
                        {addon.title}
                      </h3>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className="text-xl font-bold text-gradient-gold font-display"
                        >
                          {addon.price}
                        </span>
                        {addon.altPrice && (
                          <span className="text-sm text-[rgba(245,245,245,0.4)]">
                            or{" "}
                            <span className="text-[rgba(245,245,245,0.6)] font-medium">
                              {addon.altPrice}
                            </span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-[rgba(245,245,245,0.5)] leading-relaxed flex-1">
                    {addon.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ---------- 6. SERVICES COMPARISON TABLE ---------- */}
      <section className="relative py-20 md:py-28 bg-[#0A0A0B] section-gold-tint">
        <div className="absolute top-0 left-0 right-0 h-px section-divider-gold" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[rgba(212,168,83,0.02)] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Find Your Fit"
            title="Compare Our"
            titleHighlight="Solutions"
            description="Not sure which service is right for you? This side-by-side comparison makes it easy to find the perfect match for your goals and budget."
            align="center"
          />

          <AnimatedSection direction="up" delay={0.15}>
            <div className="overflow-x-auto gold-scrollbar">
              <div className="min-w-[640px]">
                {/* Table */}
                <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] overflow-hidden">
                  {/* Header Row */}
                  <div className="grid grid-cols-4">
                    <div className="p-4 md:p-5 bg-[#131316] border-b border-[rgba(255,255,255,0.06)]" />
                    <div className="p-4 md:p-5 bg-[#131316] border-b border-[rgba(255,255,255,0.06)] border-l border-[rgba(255,255,255,0.04)] text-center">
                      <Globe className="w-6 h-6 text-[rgba(245,245,245,0.5)] mx-auto mb-2" />
                      <h4
                        className="text-sm md:text-base font-bold text-white font-display"
                      >
                        Website Development
                      </h4>
                      <p className="text-[11px] text-[rgba(245,245,245,0.4)] mt-1">
                        Professional online presence
                      </p>
                    </div>
                    {/* Recommended Column */}
                    <div className="p-4 md:p-5 bg-[rgba(212,168,83,0.06)] border-b border-[rgba(212,168,83,0.15)] border-l border-[rgba(212,168,83,0.12)] text-center relative">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-gradient-to-r from-[#D4A853] to-[#B8922F] text-[#0A0A0B] shadow-lg shadow-[rgba(212,168,83,0.25)]">
                          <Star className="w-3 h-3" />
                          Most Popular
                        </span>
                      </div>
                      <Code className="w-6 h-6 text-[#D4A853] mx-auto mb-2 mt-2" />
                      <h4
                        className="text-sm md:text-base font-bold text-white font-display"
                      >
                        Web Applications
                      </h4>
                      <p className="text-[11px] text-[#D4A853] mt-1">
                        Custom software solutions
                      </p>
                    </div>
                    <div className="p-4 md:p-5 bg-[#131316] border-b border-[rgba(255,255,255,0.06)] border-l border-[rgba(255,255,255,0.04)] text-center">
                      <Bot className="w-6 h-6 text-[rgba(245,245,245,0.5)] mx-auto mb-2" />
                      <h4
                        className="text-sm md:text-base font-bold text-white font-display"
                      >
                        AI & Automation
                      </h4>
                      <p className="text-[11px] text-[rgba(245,245,245,0.4)] mt-1">
                        Intelligent technology
                      </p>
                    </div>
                  </div>

                  {/* Data Rows */}
                  {[
                    {
                      label: "Best For",
                      values: [
                        "Small businesses, schools, professionals needing a credible online presence",
                        "Organisations needing custom tools, portals, or internal systems",
                        "Businesses ready to automate workflows and leverage AI capabilities",
                      ],
                    },
                    {
                      label: "Starting Price",
                      values: [
                        "R3,999",
                        "R7,999",
                        "R4,999",
                      ],
                      highlight: true,
                    },
                    {
                      label: "Delivery Time",
                      values: ["5–7 Days", "2–3 Weeks", "1–2 Weeks"],
                    },
                    {
                      label: "Complexity",
                      values: ["Standard", "Custom", "Advanced"],
                    },
                    {
                      label: "Includes Design",
                      values: ["Yes", "Yes", "Yes"],
                      isBoolean: true,
                    },
                    {
                      label: "Custom Features",
                      values: ["No", "Yes", "Yes"],
                      isBoolean: true,
                    },
                    {
                      label: "Post-Launch Support",
                      values: ["30 days", "90 days", "Ongoing"],
                    },
                    {
                      label: "SEO Included",
                      values: ["Basic", "Advanced", "AI-Powered"],
                    },
                  ].map((row, rowIdx) => (
                    <div
                      key={row.label}
                      className={`grid grid-cols-4 ${
                        rowIdx % 2 === 0 ? "bg-[#131316]" : "bg-[#151519]"
                      }`}
                    >
                      {/* Label cell */}
                      <div className="p-4 md:p-5 border-b border-[rgba(255,255,255,0.03)]">
                        <span className="text-xs md:text-sm font-semibold text-[rgba(245,245,245,0.6)] uppercase tracking-wider">
                          {row.label}
                        </span>
                      </div>
                      {/* Value cells */}
                      {row.values.map((val, colIdx) => {
                        const isRecommended = colIdx === 1;
                        const isNo = row.isBoolean && val === "No";
                        return (
                          <div
                            key={`${row.label}-${colIdx}`}
                            className={`p-4 md:p-5 border-b border-[rgba(255,255,255,0.03)] border-l border-[rgba(255,255,255,0.04)] text-center ${
                              isRecommended
                                ? "bg-[rgba(212,168,83,0.04)] border-l-[rgba(212,168,83,0.08)]"
                                : ""
                            }`}
                          >
                            {row.isBoolean ? (
                              <span className="inline-flex items-center gap-1.5">
                                {val === "Yes" ? (
                                  <CheckCircle
                                    className={`w-4 h-4 ${
                                      isRecommended
                                        ? "text-[#D4A853]"
                                        : "text-emerald-400"
                                    }`}
                                  />
                                ) : (
                                  <span
                                    className={`text-sm ${
                                      isRecommended
                                        ? "text-[rgba(245,245,245,0.4)]"
                                        : "text-[rgba(245,245,245,0.3)]"
                                    }`}
                                  >
                                    --
                                  </span>
                                )}
                              </span>
                            ) : (
                              <span
                                className={`text-sm font-medium leading-snug ${
                                  row.highlight && isRecommended
                                    ? "text-gradient-gold text-base font-bold"
                                    : row.highlight
                                      ? "text-white font-semibold"
                                      : isRecommended
                                        ? "text-[rgba(245,245,245,0.8)]"
                                        : "text-[rgba(245,245,245,0.55)]"
                                }`}
                              >
                                {val}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}

                  {/* Footer Row with CTAs */}
                  <div className="grid grid-cols-4">
                    <div className="p-4 md:p-5 bg-[#0F0F12]" />
                    <div className="p-4 md:p-5 bg-[#0F0F12] border-l border-[rgba(255,255,255,0.04)] flex justify-center">
                      <Button
                        onClick={() => handleNavClick("packages")}
                        variant="outline"
                        size="sm"
                        className="border-[rgba(255,255,255,0.12)] bg-transparent hover:bg-white/5 text-white text-xs rounded-lg px-4 py-2 transition-all duration-300"
                      >
                        View Packages
                        <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                    <div className="p-4 md:p-5 bg-[rgba(212,168,83,0.04)] border-l border-[rgba(212,168,83,0.08)] flex justify-center">
                      <Button
                        onClick={() => handleNavClick("contact")}
                        size="sm"
                        className="bg-gradient-to-r from-[#D4A853] to-[#B8922F] hover:from-[#E8C97A] hover:to-[#D4A853] text-[#0A0A0B] font-semibold text-xs rounded-lg px-4 py-2 shadow-md shadow-[rgba(212,168,83,0.2)] transition-all duration-300"
                      >
                        Get Started
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                    <div className="p-4 md:p-5 bg-[#0F0F12] border-l border-[rgba(255,255,255,0.04)] flex justify-center">
                      <Button
                        onClick={() => handleNavClick("contact")}
                        variant="outline"
                        size="sm"
                        className="border-[rgba(255,255,255,0.12)] bg-transparent hover:bg-white/5 text-white text-xs rounded-lg px-4 py-2 transition-all duration-300"
                      >
                        Learn More
                        <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ---------- 7. STAY CONNECTED / NEWSLETTER ---------- */}
      <section className="relative py-16 md:py-20 bg-[#0A0A0B] section-gold-tint">
        <div className="absolute top-0 left-0 right-0 h-px section-divider-gold" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[rgba(212,168,83,0.1)] via-[#131316] to-[rgba(212,168,83,0.05)] border border-[rgba(212,168,83,0.15)] p-8 md:p-10 glow-gold">
              {/* Decorative glows */}
              <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-[rgba(212,168,83,0.06)] rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-[200px] h-[200px] bg-[rgba(212,168,83,0.03)] rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h3
                    className="text-xl md:text-2xl font-bold text-white mb-2 font-display"
                  >
                    Stay Ahead of the Curve
                  </h3>
                  <p className="text-sm text-[rgba(245,245,245,0.5)] leading-relaxed">
                    Get monthly insights on digital trends, AI developments, and
                    web strategy tips -- tailored for South African businesses and
                    institutions.
                  </p>
                </div>
                <div className="flex-1 w-full">
                  <div className="flex gap-3">
                    <Input
                      placeholder="Enter your email"
                      className="flex-1 bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] text-white placeholder:text-[rgba(245,245,245,0.25)] focus:border-[rgba(212,168,83,0.4)] rounded-xl h-11"
                    />
                    <Button
                      onClick={() =>
                        toast.success(
                          "Subscribed! Check your inbox for a welcome email."
                        )
                      }
                      className="bg-gradient-to-r from-[#D4A853] to-[#B8922F] hover:from-[#E8C97A] hover:to-[#D4A853] text-[#0A0A0B] font-semibold px-6 rounded-xl shrink-0 shadow-lg shadow-[rgba(212,168,83,0.3)] hover:shadow-[rgba(212,168,83,0.5),0_0_24px_rgba(212,168,83,0.3)] transition-all duration-300 glow-gold"
                    >
                      Subscribe
                    </Button>
                  </div>
                  <p className="mt-2 text-[10px] text-[rgba(245,245,245,0.25)]">
                    No spam. Unsubscribe anytime. Join 200+ SA business leaders.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ----------------- 8. CTA SECTION ----------------- */}
      <section className="relative py-20 md:py-28 bg-[#0A0A0B]">
        <div className="absolute top-0 left-0 right-0 h-px section-divider-gold" />
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
                {/* Quote icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[rgba(212,168,83,0.1)] border border-[rgba(212,168,83,0.15)] mb-8">
                  <Sparkles className="w-7 h-7 text-[#D4A853]" />
                </div>

                {/* Quote */}
                <blockquote
                  className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight max-w-3xl mx-auto font-display"
                >
                  &#8220;In the time it takes most agencies to finish their
                  proposal, we&#39;ve already launched your site.&#8221;
                </blockquote>

                <p className="text-base md:text-lg text-[rgba(245,245,245,0.5)] max-w-xl mx-auto leading-relaxed mb-10">
                  Stop waiting. Start building. Carter Digitals delivers
                  production-ready digital infrastructure in 5-7 business days.
                </p>

                {/* CTA Button */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    onClick={() => handleNavClick("contact")}
                    size="lg"
                    className="bg-gradient-to-r from-[#D4A853] to-[#B8922F] hover:from-[#E8C97A] hover:to-[#D4A853] text-[#0A0A0B] font-semibold px-10 py-6 text-base rounded-xl shadow-lg shadow-[rgba(212,168,83,0.25)] hover:shadow-[rgba(212,168,83,0.35)] transition-all duration-300 group"
                  >
                    Start Your Project
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    onClick={() => handleNavClick("packages")}
                    size="lg"
                    variant="outline"
                    className="border-[rgba(255,255,255,0.15)] bg-transparent hover:bg-white/5 text-white font-semibold px-8 py-6 text-base rounded-xl transition-all duration-300 group"
                  >
                    View Packages & Pricing
                    <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                {/* Micro-copy */}
                <p className="mt-6 text-xs text-[rgba(245,245,245,0.3)]">
                  No commitment required · Response within 2 hours · Available
                  Mon–Sat
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}

