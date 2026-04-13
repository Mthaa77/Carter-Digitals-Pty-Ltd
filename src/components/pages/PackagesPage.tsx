"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Phone,
  CheckCircle,
  Sparkles,
  Bot,
  Search,
  Server,
  FileText,
  CircleDollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import FaqSearch from "@/components/shared/FaqSearch";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ParallaxSection } from "@/components/shared/ParallaxSection";
import { useNavigation } from "@/lib/navigation";
import CosmicDecorations from "@/components/shared/CosmicDecorations";

/* ──────────────────────── SME packages ─────────────────────────── */
const smePackages = [
  {
    name: "VULA",
    price: "R3,999",
    retainer: "R399/mo",
    tagline: "Get online and start getting calls.",
    popular: false,
    features: [
      "Up to 4 pages",
      "Hosting & domain — Year 1 free",
      "Lead form + WhatsApp integration",
      "Google Business Profile setup",
      "Mobile-first branded design",
      "Basic SEO",
      "5-7 day delivery",
    ],
  },
  {
    name: "KHULA",
    price: "R7,999",
    retainer: "R799/mo",
    tagline: "Convert visitors into paying clients.",
    popular: true,
    features: [
      "Everything in Vula included",
      "Up to 8 pages incl. Portfolio & Blog",
      "AI WhatsApp chatbot — 24/7",
      "Quote / booking request system",
      "SEO keyword targeting (3 keywords)",
      "Google Analytics + Search Console",
    ],
  },
  {
    name: "ELEVATE",
    price: "R14,999",
    retainer: "R1,199/mo",
    tagline: "A fully managed digital engine.",
    popular: false,
    features: [
      "Everything in Khula included",
      "Sanity CMS — full content management",
      "E-commerce ready",
      "Advanced SEO + monthly ranking report",
      "Custom integrations (CRM, payments)",
    ],
  },
];

/* ──────────────────────── School packages ──────────────────────── */
const schoolPackages = [
  {
    name: "PRESENÇA",
    price: "R4,999",
    retainer: "R499/mo",
    tagline: "Be found and trusted online.",
    popular: false,
    features: [
      "5 pages (Home, About, Grades, News, Contact)",
      "Hosting & domain — Year 1 free",
      "Mobile-first fast design",
      "WhatsApp click-to-chat",
      "Google Maps + contact form",
      "Basic SEO",
    ],
  },
  {
    name: "IKREDIBO",
    price: "R9,999",
    retainer: "R899/mo",
    tagline: "Build community trust & enrolment.",
    popular: true,
    features: [
      "Everything in Presença included",
      "10 pages (Staff, Gallery, Admissions+)",
      "News & announcements system",
      "Parent enquiry / enrolment form",
      "Google Analytics dashboard",
      "Branded school email",
    ],
  },
  {
    name: "MASTERY",
    price: "R18,999",
    retainer: "R1,499/mo",
    tagline: "Full content control + 24/7 AI.",
    popular: false,
    features: [
      "Everything in Ikredibo included",
      "Sanity CMS — full content management",
      "AI chatbot — 24/7 admissions & FAQ",
      "Unlimited pages + downloads portal",
      "Staff / SGB portal with login",
      "Advanced SEO + Search Console",
    ],
  },
];

/* ──────────────────────── add-on services ──────────────────────── */
const addons = [
  {
    icon: Bot,
    title: "AI Chatbot & WhatsApp Automation",
    onceOff: "R4,999",
    monthly: "R499/mo",
    description:
      "24/7 automated customer engagement. Answer FAQs, capture leads, and qualify prospects while you sleep.",
  },
  {
    icon: Search,
    title: "SEO & Google Setup",
    onceOff: "R999",
    monthly: null,
    description:
      "Google Business Profile, Search Console, Analytics, keyword research, and on-page SEO optimisation.",
  },
  {
    icon: Server,
    title: "Hosting & Domain Management",
    onceOff: null,
    monthly: "R1,990/yr | R199/mo",
    description:
      "Enterprise-grade hosting on Vercel's global CDN. Domain registration, SSL, and priority email support included.",
  },
  {
    icon: FileText,
    title: "Company Profile & Pitch Deck",
    onceOff: "R1,999",
    monthly: null,
    description:
      "Investor-ready company profiles and compelling pitch decks that tell your story and win stakeholder buy-in.",
  },
];

/* ──────────────────────── FAQ data ─────────────────────────────── */
const packagesFaqItems = [
  { id: "pkg-faq-1", question: "How long does it take to build a website?", answer: "5-7 business days from approval of design. We work fast because we've built battle-tested processes and reusable component libraries. No bloated timelines — just ruthless execution." },
  { id: "pkg-faq-2", question: "Do I own my website after it's built?", answer: "Yes, 100%. Full handover of source code, hosting credentials, and domain ownership. No lock-in contracts, no ongoing dependency on us. Your digital asset, your rules." },
  { id: "pkg-faq-3", question: "What's included in Year 1 hosting?", answer: "Domain registration, SSL certificate, hosting on Vercel's global CDN (the same infrastructure that powers GitHub and Nike), and priority email support. Everything you need for a fast, secure, reliable website." },
  { id: "pkg-faq-4", question: "Can I upgrade my package later?", answer: "Absolutely. You can upgrade at any time and pay only the difference between your current and new package. No penalties, no hassle — just seamless scaling." },
  { id: "pkg-faq-5", question: "What if I need changes after launch?", answer: "Minor revisions are included in every package. For ongoing changes and updates, our monthly retainers cover unlimited edits, new page additions, and priority support." },
  { id: "pkg-faq-6", question: "Do you work with clients outside Pretoria?", answer: "Yes, we serve clients nationwide across South Africa. Our entire process is remote-friendly — from discovery calls to design approvals to launch. Geography is not a barrier." },
];

/* ──────────────────── Pricing card component ───────────────────── */
function PricingCard({
  pkg,
}: {
  pkg: {
    name: string;
    price: string;
    retainer: string;
    tagline: string;
    popular: boolean;
    features: string[];
  };
}) {
  const { navigate } = useNavigation();

  return (
    <div
      className={`relative h-full rounded-2xl ${
        pkg.popular
          ? "bg-[#131316] border-2 border-[rgba(212,168,83,0.3)] glow-gold md:-mt-4 md:mb-[-16px] z-10 gold-border-animated"
          : "bg-[#131316] border border-[rgba(255,255,255,0.06)]"
      } p-6 md:p-8 glass-gold card-hover-gold flex flex-col card-idle-pulse`}
    >
      {/* Popular badge */}
      {pkg.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <Badge className="bg-gradient-to-r from-[#D4A853] to-[#B8922F] text-[#0A0A0B] font-semibold text-xs px-4 py-1 border-0 shadow-lg shadow-[rgba(212,168,83,0.25)]">
            Most Popular
          </Badge>
        </div>
      )}

      {/* Package name */}
      <div className="mb-6">
        <h3
          className="text-xl font-bold text-gradient-gold mb-1 font-['Space_Grotesk']"
        >
          {pkg.name}
        </h3>
        <p className="text-sm text-[rgba(245,245,245,0.4)] italic">
          &ldquo;{pkg.tagline}&rdquo;
        </p>
      </div>

      {/* Price */}
      <div className="mb-6">
        <span
          className="text-3xl md:text-4xl font-bold text-white font-display"
        >
          {pkg.price}
        </span>
        <span className="text-sm text-[rgba(245,245,245,0.4)] ml-1">
          once-off
        </span>
        <div className="mt-1">
          <span className="text-xs text-[rgba(245,245,245,0.35)]">
            + {pkg.retainer} optional retainer
          </span>
        </div>
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
        onClick={() => {
          navigate("contact");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        variant={pkg.popular ? "default" : "outline"}
        className={`w-full font-semibold py-5 rounded-xl transition-all duration-300 group ${
          pkg.popular
            ? "bg-gradient-to-r from-[#D4A853] to-[#B8922F] hover:from-[#E8C97A] hover:to-[#D4A853] text-[#0A0A0B] shadow-lg shadow-[rgba(212,168,83,0.2)] hover:shadow-[rgba(212,168,83,0.3)]"
            : "border-[rgba(255,255,255,0.12)] bg-transparent hover:bg-white/5 text-white"
        }`}
      >
        Get Started
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   PACKAGES PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════════ */
export default function PackagesPage() {
  const { navigate } = useNavigation();

  const handleNavClick = (page: "contact") => {
    navigate(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="relative overflow-hidden">
      {/* ───────────────────── 1. PAGE HERO ───────────────────── */}
      <section className="relative py-28 md:py-40 bg-[#0A0A0B]">
        {/* Background */}
        <div className="absolute inset-0 bg-grid pattern-grid-animated" />

        {/* ── Parallax background layers ── */}
        {/* Large gold glow orb — speed 0.15 */}
        <ParallaxSection speed={0.15} direction="up" className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[rgba(212,168,83,0.06)] rounded-full blur-[120px]" />
          <div className="absolute top-[55%] left-[15%] w-[300px] h-[300px] bg-[rgba(212,168,83,0.04)] rounded-full blur-[100px]" />
        </ParallaxSection>

        {/* Small floating geometric shapes — speed 0.08 */}
        <ParallaxSection speed={0.08} direction="up" className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ rotate: 45 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[20%] left-[10%] w-8 h-8 rounded-lg border border-[rgba(212,168,83,0.1)] bg-[rgba(212,168,83,0.03)]"
          />
          <motion.div
            animate={{ rotate: -30 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-[25%] right-[8%] w-6 h-6 rounded-full border border-[rgba(212,168,83,0.08)] bg-[rgba(212,168,83,0.02)]"
          />
          <motion.div
            animate={{ rotate: 60 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[30%] left-[22%] w-10 h-10 rounded-sm border border-[rgba(212,168,83,0.06)] bg-[rgba(212,168,83,0.02)]"
          />
          <motion.div
            animate={{ rotate: -45 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[20%] right-[12%] w-5 h-5 rounded border border-[rgba(212,168,83,0.1)] bg-[rgba(212,168,83,0.03)]"
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
                <CircleDollarSign className="w-4 h-4 text-[#D4A853]" />
                <span className="text-sm font-medium text-[#D4A853]">
                  Transparent Pricing
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} direction="up">
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight font-display"
              >
                <span className="text-gradient-gold">Packages & Pricing</span>
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.35} direction="up">
              <p
                className="mt-4 text-xl md:text-2xl text-[rgba(245,245,245,0.65)] font-medium font-display"
              >
                Pick Your Package. Go Live in 5-7 Days.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.5} direction="up">
              <p className="mt-6 text-base md:text-lg text-[rgba(245,245,245,0.6)] max-w-2xl mx-auto leading-relaxed">
                No lock-in contracts. No hidden fees. All packages include free
                Year 1 hosting and domain. Simple, honest pricing built for South
                African businesses and institutions.
              </p>
            </AnimatedSection>
          </div>
        </ParallaxSection>

        {/* Gold gradient fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0A0B] via-[rgba(10,10,11,0.6)] to-transparent pointer-events-none" />
      </section>

      <div className="h-px section-divider-gold" />

      {/* ────────────────── 2. SME PACKAGES TABS ─────────────────── */}
      <section className="relative py-20 md:py-28 bg-[#0A0A0B] section-gold-tint">
        <CosmicDecorations variant="nebula" intensity="subtle" />
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[rgba(212,168,83,0.025)] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Packages"
            title="Tailored for"
            titleHighlight="Your Sector"
            description="Whether you're a growing SME or an established school, we have a package designed around your specific needs."
            align="center"
          />

          <AnimatedSection delay={0.2} direction="up">
            <Tabs defaultValue="sme" className="w-full">
              <div className="flex justify-center mb-12">
                <TabsList className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] rounded-xl p-1 h-auto">
                  <TabsTrigger
                    value="sme"
                    className="data-[state=active]:bg-[rgba(212,168,83,0.15)] data-[state=active]:text-[#D4A853] text-[rgba(245,245,245,0.5)] px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                  >
                    Small Business
                  </TabsTrigger>
                  <TabsTrigger
                    value="school"
                    className="data-[state=active]:bg-[rgba(212,168,83,0.15)] data-[state=active]:text-[#D4A853] text-[rgba(245,245,245,0.5)] px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                  >
                    School
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* SME Tab */}
              <TabsContent value="sme" className="mt-0">
                <StaggerContainer
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start"
                  staggerDelay={0.12}
                  once={false}
                >
                  {smePackages.map((pkg) => (
                    <StaggerItem key={pkg.name}>
                      <PricingCard pkg={pkg} />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </TabsContent>

              {/* School Tab */}
              <TabsContent value="school" className="mt-0">
                <StaggerContainer
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start"
                  staggerDelay={0.12}
                  once={false}
                >
                  {schoolPackages.map((pkg) => (
                    <StaggerItem key={pkg.name}>
                      <PricingCard pkg={pkg} />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </TabsContent>
            </Tabs>
          </AnimatedSection>
        </div>
      </section>

      <div className="h-px section-divider-gold" />

      {/* ────────────────── 3. ADD-ON SERVICES ──────────────────── */}
      <section className="relative py-20 md:py-28 bg-[#0A0A0B] section-gold-tint">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-[rgba(212,168,83,0.03)] rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Extras"
            title="Bolt-On"
            titleHighlight="Extras"
            description="Need something extra? These add-on services can be bundled with any package or purchased separately."
            align="center"
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.1}>
            {addons.map((addon) => (
              <StaggerItem key={addon.title}>
                <div className="group relative h-full rounded-2xl bg-[rgba(212,168,83,0.02)] border border-[rgba(212,168,83,0.08)] backdrop-blur-sm p-6 card-hover-gold">
                  {/* Gold top accent */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4A853] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-[rgba(212,168,83,0.1)] border border-[rgba(212,168,83,0.15)] flex items-center justify-center group-hover:bg-[rgba(212,168,83,0.15)] transition-colors duration-300">
                      <addon.icon className="w-6 h-6 text-[#D4A853]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-base font-semibold text-white mb-1.5 font-display"
                      >
                        {addon.title}
                      </h3>
                      <p className="text-sm text-[rgba(245,245,245,0.5)] leading-relaxed mb-3">
                        {addon.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {addon.onceOff && (
                          <Badge className="bg-[rgba(212,168,83,0.1)] text-[#D4A853] border-[rgba(212,168,83,0.15)] text-xs font-medium px-2.5 py-0.5">
                            {addon.onceOff}
                          </Badge>
                        )}
                        {addon.monthly && (
                          <Badge className="bg-[rgba(255,255,255,0.05)] text-[rgba(245,245,245,0.6)] border-[rgba(255,255,255,0.08)] text-xs font-medium px-2.5 py-0.5">
                            {addon.monthly}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <div className="h-px section-divider-gold" />

      {/* ──────────────────── 4. FAQ SECTION ───────────────────── */}
      <section className="relative py-20 md:py-28 bg-[#0A0A0B] section-gold-tint">
        <CosmicDecorations variant="aurora" intensity="subtle" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[rgba(212,168,83,0.02)] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="FAQ"
            title="Frequently Asked"
            titleHighlight="Questions"
            description="Everything you need to know before getting started. Can't find your answer? Drop us a message."
            align="center"
          />

          <AnimatedSection delay={0.15} direction="up">
            <div className="gold-border-animated rounded-2xl">
              <FaqSearch items={packagesFaqItems} />
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="h-px section-divider-gold" />

      {/* ──────────────────── 5. CTA SECTION ───────────────────── */}
      <section className="relative py-20 md:py-28 bg-[#0A0A0B] section-gold-tint">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up">
            <div className="relative overflow-hidden rounded-3xl gold-border-animated">
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(212,168,83,0.08)] via-[rgba(19,19,22,0.95)] to-[rgba(212,168,83,0.04)]" />
              <div className="absolute inset-0 bg-dots opacity-40" />

              {/* Gold glow orbs */}
              <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-[rgba(212,168,83,0.08)] rounded-full blur-[140px] pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-[rgba(212,168,83,0.06)] rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] bg-[rgba(212,168,83,0.04)] rounded-full blur-[80px] pointer-events-none" />

              {/* Floating gold dots */}
              <div className="absolute top-8 left-8 w-2 h-2 rounded-full bg-[rgba(212,168,83,0.3)] animate-gold-float" />
              <div className="absolute top-1/2 left-[15%] w-1.5 h-1.5 rounded-full bg-[rgba(212,168,83,0.2)] animate-gold-float" style={{ animationDelay: "1s" }} />
              <div className="absolute bottom-12 right-12 w-2 h-2 rounded-full bg-[rgba(212,168,83,0.25)] animate-gold-float" style={{ animationDelay: "0.5s" }} />
              <div className="absolute top-8 right-[20%] w-1.5 h-1.5 rounded-full bg-[rgba(212,168,83,0.2)] animate-gold-float" style={{ animationDelay: "1.5s" }} />
              <div className="absolute bottom-1/4 left-[25%] w-1 h-1 rounded-full bg-[rgba(212,168,83,0.15)] animate-gold-float" style={{ animationDelay: "2s" }} />
              <div className="absolute top-[30%] right-[10%] w-2 h-2 rounded-full bg-[rgba(212,168,83,0.2)] animate-gold-float" style={{ animationDelay: "0.8s" }} />

              <div className="relative z-10 px-6 py-14 md:px-16 md:py-20 lg:px-24 lg:py-24 text-center">
                <h2
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight font-display"
                >
                  Ready to Get Started?
                </h2>

                <p className="text-base md:text-lg text-[rgba(245,245,245,0.55)] max-w-2xl mx-auto leading-relaxed mb-10">
                  No obligation. A 30-minute discovery call where we learn about 
                  your goals and outline a clear path forward — whether you work 
                  with us or not.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    onClick={() => handleNavClick("contact")}
                    size="lg"
                    className="bg-gradient-to-r from-[#D4A853] to-[#B8922F] hover:from-[#E8C97A] hover:to-[#D4A853] text-[#0A0A0B] font-semibold px-10 py-6 text-base rounded-xl shadow-lg shadow-[rgba(212,168,83,0.25)] hover:shadow-[rgba(212,168,83,0.35)] transition-all duration-300 group"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Schedule Your Call
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                <p className="mt-6 text-xs text-[rgba(245,245,245,0.3)]">
                  Free consultation · No commitment · Response within 2 hours
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
