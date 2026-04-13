"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  CheckCircle,
  Sparkles,
  Building2,
  GraduationCap,
  Scale,
  HeartPulse,
  ShoppingCart,
  Landmark,
  BarChart3,
  Store,
  X,
  Clock,
  Calendar,
  User,
  Camera,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
  AnimatedCounter,
} from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useNavigation } from "@/lib/navigation";
import { ParallaxSection } from "@/components/shared/ParallaxSection";
import CosmicDecorations from "@/components/shared/CosmicDecorations";
import ImageLightbox from "@/components/shared/ImageLightbox";
import type { LightboxImage } from "@/components/shared/ImageLightbox";

/* ──────────────────────── project data types ────────────────────────── */
interface ProjectData {
  name: string;
  category: string;
  categoryKey: string;
  description: string;
  tech: string[];
  gradient: string;
  icon: LucideIcon;
  client: string;
  duration: string;
  year: string;
  results: string[];
  fullDescription: string;
  url?: string;
}

/* ──────────────────────── featured project data ────────────────────── */
const featuredProject: ProjectData = {
  name: "Soshanguve School of Specialisation",
  category: "Government / Education",
  categoryKey: "education",
  description:
    "A production-grade government-adjacent deployment serving the Soshanguve community. Built on Next.js with comprehensive school management features, parent communication tools, and an AI-powered admissions assistant.",
  tech: ["Next.js", "Vercel", "AI Chatbot", "CMS", "Mobile-First", "SEO Optimised"],
  gradient: "from-[#1a1a2e] to-[#16213e]",
  icon: GraduationCap,
  client: "Gauteng Department of Education",
  duration: "7 Days",
  year: "2024",
  results: [
    "45% increase in online enrolment within first 3 months",
    "200+ parent enquiries processed through the AI chatbot",
    "Google ranking improved from page 5 to top 3 results",
    "Zero downtime since launch with 99.9% uptime",
  ],
  fullDescription:
    "Soshanguve School of Specialisation needed a digital presence that matched its real-world impact. We built a comprehensive school website with an integrated AI admissions chatbot, parent communication portal, news management system, and a CMS for staff to update content independently. The site serves as both an information hub and a functional tool for the school community.",
  url: "https://sosha-automotive.org",
};

/* ──────────────────────── project cards data ─────────────────────── */
const projectCards: ProjectData[] = [
  {
    name: "Mogale & Associates Attorneys",
    category: "Legal",
    categoryKey: "legal",
    description: "Corporate website with case tracking, consultation booking, and document management portal.",
    tech: ["Next.js", "Stripe", "CMS"],
    gradient: "from-[#1a1a2e] to-[#16213e]",
    icon: Scale,
    client: "Private Client",
    duration: "5 Days",
    year: "2024",
    results: [
      "40% traffic increase in first 2 months",
      "100+ enquiries in first month via online booking",
      "Google My Business profile ranked #1 in Pretoria CBD",
    ],
    fullDescription:
      "Mogale & Associates needed a website that projected authority and trust — essential in the legal industry. We built a sleek corporate site with an integrated consultation booking system, secure document upload portal, and case progress tracker. The result: a digital presence that wins client confidence before the first meeting.",
  },
  {
    name: "Soshanguve Family Clinic",
    category: "Medical",
    categoryKey: "medical",
    description: "Patient portal with online booking, medical records access, and prescription refill requests.",
    tech: ["Next.js", "Auth", "Calendar"],
    gradient: "from-[#1a2e1a] to-[#162e21]",
    icon: HeartPulse,
    client: "Private Client",
    duration: "7 Days",
    year: "2024",
    results: [
      "60% reduction in no-show appointments",
      "150+ patients registered online in first month",
      "Prescription refill requests handled 100% digitally",
    ],
    fullDescription:
      "The clinic was drowning in phone calls for appointments and prescription refills. We built a patient portal with secure authentication, real-time calendar booking, and automated prescription request workflows. Patients can now manage their healthcare needs 24/7 without stepping foot in the waiting room for admin tasks.",
  },
  {
    name: "Pretoria Gateway Guesthouse",
    category: "Business",
    categoryKey: "business",
    description: "Booking engine with real-time availability, payment integration, and guest management dashboard.",
    tech: ["Next.js", "PayFast", "Maps"],
    gradient: "from-[#2e1a1a] to-[#2e1616]",
    icon: Building2,
    client: "Private Client",
    duration: "6 Days",
    year: "2023",
    results: [
      "85% increase in direct online bookings",
      "30% reduction in OTA commission costs",
      "Guest satisfaction score improved to 4.8/5",
    ],
    fullDescription:
      "Pretoria Gateway was losing revenue to online travel agencies and their commissions. We built a direct booking engine with PayFast integration, Google Maps integration, and a guest management dashboard. The guesthouse now owns its booking pipeline end-to-end, with real-time availability synced across all channels.",
  },
  {
    name: "Kasi Kitchen Catering",
    category: "Business",
    categoryKey: "business",
    description: "E-commerce platform with menu management, delivery tracking, and customer loyalty programme.",
    tech: ["Next.js", "E-commerce", "SMS"],
    gradient: "from-[#2e2a1a] to-[#2e2516]",
    icon: ShoppingCart,
    client: "Private Client",
    duration: "7 Days",
    year: "2024",
    results: [
      "340% increase in online sales within first quarter",
      "500+ orders processed through the platform monthly",
      "Customer loyalty programme grew to 800+ members",
    ],
    fullDescription:
      "Kasi Kitchen was running everything on WhatsApp and manual order tracking. We built a full e-commerce platform with dynamic menu management, real-time delivery tracking, and an integrated customer loyalty programme. Orders are now automated, tracked, and fulfilled through a single dashboard, freeing up the team to focus on what they do best — cooking.",
  },
  {
    name: "Thuto-Pele Secondary School",
    category: "Education",
    categoryKey: "education",
    description: "CMS-powered school website with news, events calendar, gallery, and parent communication tools.",
    tech: ["Next.js", "Sanity CMS", "SEO"],
    gradient: "from-[#1a1a2e] to-[#1c162e]",
    icon: GraduationCap,
    client: "Gauteng Department of Education",
    duration: "6 Days",
    year: "2024",
    results: [
      "Page 1 Google ranking for 12 key search terms",
      "Enrolment enquiries increased by 55%",
      "Staff can now update content independently via CMS",
    ],
    fullDescription:
      "Thuto-Pele Secondary needed a modern web presence that could be maintained by their own staff. We built a CMS-powered website using Sanity, giving teachers and administrators the ability to publish news, manage events, and update the school gallery without any developer involvement. SEO-optimised from day one, the site now ranks on page 1 for key educational search terms.",
  },
  {
    name: "Tshwane Youth Development",
    category: "Government",
    categoryKey: "business",
    description: "Community portal with event management, programme applications, and stakeholder dashboard.",
    tech: ["Next.js", "Auth", "Dashboard"],
    gradient: "from-[#1a2e2e] to-[#162e2e]",
    icon: Landmark,
    client: "City of Tshwane",
    duration: "10 Days",
    year: "2023",
    results: [
      "1,200+ youth programme applications processed online",
      "Stakeholder dashboard reduced reporting time by 70%",
      "Community events attendance increased by 45%",
    ],
    fullDescription:
      "The City of Tshwane needed a digital platform to manage youth development programmes at scale. We built a community portal with event management, online programme applications with document uploads, and a stakeholder dashboard for real-time reporting. The platform now serves as the primary digital touchpoint for youth development in the Tshwane region.",
  },
  {
    name: "Nkosi Financial Advisory",
    category: "Business",
    categoryKey: "business",
    description: "Lead generation website with CRM dashboard, appointment scheduling, and automated follow-ups.",
    tech: ["Next.js", "CRM", "Analytics"],
    gradient: "from-[#2e1a2e] to-[#2e162e]",
    icon: BarChart3,
    client: "Private Client",
    duration: "5 Days",
    year: "2024",
    results: [
      "Lead conversion rate improved by 65%",
      "Automated follow-ups saved 15 hours per week",
      "Client acquisition cost reduced by 40%",
    ],
    fullDescription:
      "Nkosi Financial Advisory was spending too much time on manual follow-ups and losing leads in the cracks. We built a lead generation website with an integrated CRM dashboard, automated email follow-up sequences, and appointment scheduling. The advisory firm now has a predictable pipeline with data-driven insights at every stage.",
  },
  {
    name: "Soweto Fresh Market",
    category: "Business",
    categoryKey: "business",
    description: "Multi-vendor marketplace platform with vendor onboarding, product listings, and order management.",
    tech: ["Next.js", "Multi-vendor", "Payments"],
    gradient: "from-[#2e2e1a] to-[#2e2e16]",
    icon: Store,
    client: "Private Client",
    duration: "12 Days",
    year: "2024",
    results: [
      "45 vendors onboarded within first month",
      "Marketplace processed R150K+ in orders in month 2",
      "Average delivery time reduced to under 2 hours",
    ],
    fullDescription:
      "Soweto Fresh Market needed to digitise its vendor ecosystem. We built a multi-vendor marketplace with vendor self-onboarding, product catalogue management, order tracking, and integrated payments. The platform empowers local vendors to reach customers beyond the physical market, creating a digital storefront for Soweto's vibrant informal economy.",
  },
];

/* ──────────────────────── mock project images ────────────────────── */
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function generateProjectImages(projectName: string, categoryKey: string): LightboxImage[] {
  /* Generate gradient placeholder images based on category */
  const gradients: Record<string, string[]> = {
    education: [
      "linear-gradient(135deg, #1a3a5c 0%, #0d7377 50%, #14a085 100%)",
      "linear-gradient(160deg, #0c2461 0%, #1e3799 50%, #4a69bd 100%)",
      "linear-gradient(145deg, #0a3d62 0%, #1289A7 50%, #38ada9 100%)",
      "linear-gradient(180deg, #2c3e50 0%, #3498db 50%, #1abc9c 100%)",
    ],
    business: [
      "linear-gradient(135deg, #4a1a0a 0%, #b85c1e 50%, #e67e22 100%)",
      "linear-gradient(160deg, #3d0c02 0%, #c0392b 50%, #e74c3c 100%)",
      "linear-gradient(145deg, #6b3a0a 0%, #d68910 50%, #f5b041 100%)",
      "linear-gradient(180deg, #5b2c0e 0%, #ca6f1e 50%, #eb984e 100%)",
    ],
    legal: [
      "linear-gradient(135deg, #2c3e50 0%, #4a5568 50%, #a0aec0 100%)",
      "linear-gradient(160deg, #1a202c 0%, #2d3748 50%, #718096 100%)",
      "linear-gradient(145deg, #37474f 0%, #607d8b 50%, #90a4ae 100%)",
      "linear-gradient(180deg, #263238 0%, #546e7a 50%, #78909c 100%)",
    ],
    medical: [
      "linear-gradient(135deg, #0a3d0c 0%, #1e8449 50%, #27ae60 100%)",
      "linear-gradient(160deg, #0b5345 0%, #148f77 50%, #1abc9c 100%)",
      "linear-gradient(145deg, #0e6655 0%, #117a65 50%, #48c9b0 100%)",
      "linear-gradient(180deg, #1e8449 0%, #28b463 50%, #82e0aa 100%)",
    ],
  };

  const categoryGradients = gradients[categoryKey] || gradients.business;
  const count = 3 + (simpleHash(projectName) % 3); // deterministic 3–5 images
  const captions = [
    `${projectName} — Homepage Design`,
    `${projectName} — Dashboard Interface`,
    `${projectName} — Mobile Responsive View`,
    `${projectName} — Feature Detail`,
    `${projectName} — Admin Panel`,
  ];

  /* We use SVG data URIs as placeholder images with the gradients */
  return Array.from({ length: count }, (_, i) => {
    const grad = categoryGradients[i % categoryGradients.length];
    const svg = encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
        <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${grad.includes('#') ? grad.match(/#[0-9a-fA-F]{6}/g)?.[0] || '#333' : '#333'};stop-opacity:1"/>
          <stop offset="100%" style="stop-color:${grad.includes('#') ? (grad.match(/#[0-9a-fA-F]{6}/g)?.[1] || grad.match(/#[0-9a-fA-F]{6}/g)?.[0] || '#666') : '#666'};stop-opacity:1"/>
        </linearGradient></defs>
        <rect fill="url(#g)" width="1200" height="800"/>
        <text x="600" y="380" text-anchor="middle" font-family="sans-serif" font-size="42" fill="rgba(255,255,255,0.15)" font-weight="bold">${projectName}</text>
        <text x="600" y="440" text-anchor="middle" font-family="sans-serif" font-size="20" fill="rgba(255,255,255,0.08)">Design Preview ${i + 1}</text>
        <rect x="200" y="500" width="800" height="4" rx="2" fill="rgba(255,255,255,0.05)"/>
        <rect x="200" y="520" width="600" height="4" rx="2" fill="rgba(255,255,255,0.03)"/>
        <rect x="200" y="540" width="700" height="4" rx="2" fill="rgba(255,255,255,0.03)"/>
        <circle cx="400" cy="300" r="40" fill="rgba(255,255,255,0.05)"/>
        <circle cx="600" cy="280" r="60" fill="rgba(255,255,255,0.03)"/>
        <circle cx="800" cy="310" r="35" fill="rgba(255,255,255,0.04)"/>
      </svg>`
    );
    return {
      src: `data:image/svg+xml,${svg}`,
      alt: `${projectName} — ${captions[i] || `Screenshot ${i + 1}`}`,
      caption: captions[i] || `Screenshot ${i + 1}`,
    };
  });
}

/* Pre-generate images for all projects */
const projectImageMap: Record<string, LightboxImage[]> = {};
function getProjectImages(name: string, categoryKey: string): LightboxImage[] {
  if (!projectImageMap[name]) {
    projectImageMap[name] = generateProjectImages(name, categoryKey);
  }
  return projectImageMap[name];
}

/* ──────────────────────── stats data ───────────────────────────────── */
const stats = [
  { target: 50, suffix: "+", label: "Projects Delivered", prefix: "" },
  { target: 99.9, suffix: "%", label: "Uptime Record", prefix: "", decimal: true },
  { target: 40, suffix: "%", label: "Average Traffic Increase", prefix: "" },
  { target: 7, suffix: "", label: "Day Average Delivery", prefix: "5-" },
];

/* ──────────────────────── category filter tabs ─────────────────────── */
const categoryTabs = [
  { key: "all", label: "All" },
  { key: "education", label: "Education" },
  { key: "business", label: "Business" },
  { key: "legal", label: "Legal" },
  { key: "medical", label: "Medical" },
];

/* ═══════════════════════════════════════════════════════════════════════
   PROJECT DETAIL DIALOG
   ═══════════════════════════════════════════════════════════════════════ */
function ProjectDetailDialog({
  project,
  open,
  onOpenChange,
}: {
  project: ProjectData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { navigate } = useNavigation();
  const [galleryOpen, setGalleryOpen] = useState(false);
  const projectImages = getProjectImages(project.name, project.categoryKey);

  const handleStartProject = () => {
    onOpenChange(false);
    navigate("contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewGallery = () => {
    setGalleryOpen(true);
  };

  return (
    <>
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-2xl bg-background border-[rgba(212,168,83,0.15)] p-0 overflow-hidden rounded-2xl"
        style={{
          backdropFilter: "blur(0px)",
        }}
        showCloseButton={false}
      >
        {/* Top section with gradient background */}
        <div className={`relative h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F12] via-transparent to-transparent" />
          <project.icon className="w-16 h-16 text-[rgba(212,168,83,0.2)] relative z-10" />

          {/* Category badge */}
          <div className="absolute top-4 left-4 z-10">
            <Badge className="bg-[rgba(10,10,11,0.7)] backdrop-blur-sm text-foreground/80 border-[rgba(255,255,255,0.1)] text-xs font-medium px-3 py-1">
              {project.category}
            </Badge>
          </div>

          {/* Close button */}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-[rgba(10,10,11,0.7)] backdrop-blur-sm border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-[rgba(10,10,11,0.9)] transition-all duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 md:px-8 pb-6 md:pb-8 -mt-4">
          {/* Title */}
          <h2
            className="text-2xl md:text-3xl font-bold text-foreground mb-3 leading-tight font-display"
          >
            {project.name}
          </h2>

          {/* Full description */}
          <p className="text-sm md:text-base text-foreground/60 leading-relaxed mb-6">
            {project.fullDescription}
          </p>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-4 mb-6 p-4 rounded-xl bg-muted border border-border">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1.5">
                <User className="w-3.5 h-3.5 text-[#D4A853] mr-1.5" />
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-semibold">Client</span>
              </div>
              <p className="text-xs md:text-sm font-medium text-foreground/80 leading-tight">
                {project.client}
              </p>
            </div>
            <div className="text-center border-x border-border">
              <div className="flex items-center justify-center mb-1.5">
                <Clock className="w-3.5 h-3.5 text-[#D4A853] mr-1.5" />
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-semibold">Duration</span>
              </div>
              <p className="text-xs md:text-sm font-medium text-foreground/80 leading-tight">
                {project.duration}
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#D4A853] mr-1.5" />
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-semibold">Year</span>
              </div>
              <p className="text-xs md:text-sm font-medium text-foreground/80 leading-tight">
                {project.year}
              </p>
            </div>
          </div>

          {/* Results */}
          <div className="mb-6">
            <h3
              className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 font-display"
            >
              Results
            </h3>
            <div className="space-y-2.5">
              {project.results.map((result) => (
                <div key={result} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#D4A853] shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/65 leading-relaxed">
                    {result}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech stack */}
          <div className="mb-6">
            <h3
              className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 font-display"
            >
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-[rgba(212,168,83,0.08)] text-[#E8C97A] border border-[rgba(212,168,83,0.12)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <Separator className="bg-muted/60 mb-6" />

          {/* Footer actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleStartProject}
              className="flex-1 bg-gradient-to-r from-[#D4A853] to-[#B8922F] hover:from-[#E8C97A] hover:to-[#D4A853] text-[#0A0A0B] font-semibold py-5 text-sm rounded-xl shadow-lg shadow-[rgba(212,168,83,0.2)] hover:shadow-[rgba(212,168,83,0.3)] transition-all duration-300 group"
            >
              Start a Similar Project
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </Button>
            {project.url && (
              <Button
                variant="outline"
                asChild
                className="flex-1 border-[rgba(255,255,255,0.12)] bg-transparent hover:bg-white/5 text-foreground font-semibold py-5 text-sm rounded-xl transition-all duration-300 group"
              >
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  View Live Site
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </Button>
            )}
          </div>

          {/* View Gallery button */}
          <div className="mt-4">
            <button
              onClick={handleViewGallery}
              className="w-full flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-xl
                         bg-[rgba(212,168,83,0.06)] border border-[rgba(212,168,83,0.12)]
                         text-[#D4A853] font-medium text-sm
                         hover:bg-[rgba(212,168,83,0.1)] hover:border-[rgba(212,168,83,0.25)]
                         hover:shadow-[0_0_20px_rgba(212,168,83,0.08)]
                         transition-all duration-200 group"
              aria-label="View project gallery"
            >
              <Camera className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>View Gallery</span>
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-[rgba(212,168,83,0.12)] text-[#E8C97A]">
                {projectImages.length}
              </span>
            </button>
          </div>
        </div>

      </DialogContent>
    </Dialog>
    <ImageLightbox
      images={projectImages}
      open={galleryOpen}
      onClose={() => setGalleryOpen(false)}
    />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   PORTFOLIO PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════════ */
export default function PortfolioPage() {
  const { navigate } = useNavigation();
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const handleNavClick = (page: "contact" | "packages") => {
    navigate(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="relative overflow-hidden">
      {/* ───────────────────── 1. PAGE HERO ───────────────────── */}
      <section className="relative py-28 md:py-40 bg-background">
        <CosmicDecorations variant="cosmic-ring" intensity="subtle" />
        {/* Background */}
        <div className="absolute inset-0 bg-grid pattern-grid-animated" />

        {/* ── Parallax background layers ── */}
        {/* Large gold glow orb — speed 0.15 */}
        <ParallaxSection speed={0.15} direction="up" className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[rgba(212,168,83,0.06)] rounded-full blur-[120px]" />
          <div className="absolute top-[50%] right-[15%] w-[250px] h-[250px] bg-[rgba(212,168,83,0.04)] rounded-full blur-[80px]" />
        </ParallaxSection>

        {/* Small floating geometric shapes — speed 0.08 */}
        <ParallaxSection speed={0.08} direction="up" className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ rotate: 45 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[22%] left-[12%] w-8 h-8 rounded-lg border border-[rgba(212,168,83,0.1)] bg-[rgba(212,168,83,0.03)]"
          />
          <motion.div
            animate={{ rotate: -30 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-[18%] right-[10%] w-6 h-6 rounded-full border border-[rgba(212,168,83,0.08)] bg-[rgba(212,168,83,0.02)]"
          />
          <motion.div
            animate={{ rotate: 60 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[28%] left-[18%] w-10 h-10 rounded-sm border border-[rgba(212,168,83,0.06)] bg-[rgba(212,168,83,0.02)]"
          />
          <motion.div
            animate={{ rotate: -45 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[22%] right-[14%] w-5 h-5 rounded border border-[rgba(212,168,83,0.1)] bg-[rgba(212,168,83,0.03)]"
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
                <Sparkles className="w-4 h-4 text-[#D4A853]" />
                <span className="text-sm font-medium text-[#D4A853]">
                  Case Studies & Work
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} direction="up">
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight font-display"
              >
                <span className="text-gradient-gold">Our Work</span>
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.35} direction="up">
              <p
                className="mt-4 text-xl md:text-2xl text-foreground/65 font-medium font-display"
              >
                Results That Speak Louder Than Pitches
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.5} direction="up">
              <p className="mt-6 text-base md:text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
                We don&apos;t just talk about what we can do — we show you. Browse our portfolio of real-world 
                projects built for South African schools, businesses, and organisations that needed 
                digital infrastructure that actually works.
              </p>
            </AnimatedSection>
          </div>
        </ParallaxSection>

        {/* Gold gradient fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0A0B] via-[rgba(10,10,11,0.6)] to-transparent pointer-events-none" />
      </section>

      <div className="section-divider-gold" />

      {/* ────────────────── 2. FEATURED PROJECT ─────────────────── */}
      <section className="relative py-20 md:py-28 bg-background section-gold-tint grain-texture">
        {/* Gold radial glow orb behind featured card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gold-gradient-radial pointer-events-none z-0" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-[rgba(212,168,83,0.05)] rounded-full blur-[100px] pointer-events-none z-0" />
        {/* Ambient orbs */}
        <div className="ambient-orb ambient-orb-float w-[300px] h-[300px] bg-[rgba(212,168,83,0.03)] top-[15%] left-[-5%]" style={{animationDelay: '2s'}} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up">
            <div
              className="relative overflow-hidden rounded-3xl border-gradient-gold glass-gold-premium cursor-pointer group"
              onClick={() => setSelectedProject(featuredProject)}
            >
              {/* Gold gradient accent line at top */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4A853] to-transparent" />

              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(212,168,83,0.08)] via-[#131316] to-[rgba(212,168,83,0.04)]" />
              <div className="absolute inset-0 bg-dots opacity-30" />

              {/* Decorative glows */}
              <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-[rgba(212,168,83,0.06)] rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-[rgba(212,168,83,0.04)] rounded-full blur-[100px] pointer-events-none" />

              {/* Gold shimmer overlay on hover */}
              <div className="absolute inset-0 animate-shimmer-gold opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-[1]" />

              <div className="relative z-10 p-6 md:p-10 lg:p-14">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  {/* Left: Info */}
                  <div>
                    <div className="flex flex-wrap gap-2 mb-5">
                      <Badge className="bg-[rgba(212,168,83,0.15)] text-[#D4A853] border-[rgba(212,168,83,0.25)] text-xs font-medium px-3 py-1">
                        <Building2 className="w-3 h-3 mr-1.5" />
                        {featuredProject.category}
                      </Badge>
                      <Badge className="bg-muted/60 text-foreground/70 border-[rgba(255,255,255,0.08)] text-xs font-medium px-3 py-1">
                        Featured Project
                      </Badge>
                    </div>

                    <h2
                      className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight font-display"
                    >
                      {featuredProject.name}
                    </h2>

                    <p className="text-base md:text-lg text-foreground/60 leading-relaxed mb-8">
                      {featuredProject.description}
                    </p>

                    {/* Tech features as badges */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {featuredProject.tech.map((feature) => (
                        <span
                          key={feature}
                          className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-[rgba(212,168,83,0.1)] text-[#E8C97A] border border-[rgba(212,168,83,0.15)]"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      <Button
                        asChild
                        size="lg"
                        className="bg-gradient-to-r from-[#D4A853] to-[#B8922F] hover:from-[#E8C97A] hover:to-[#D4A853] text-[#0A0A0B] font-semibold px-8 py-5 text-base rounded-xl shadow-lg shadow-[rgba(212,168,83,0.25)] hover:shadow-[rgba(212,168,83,0.35)] transition-all duration-300 group"
                      >
                        <a href={featuredProject.url} target="_blank" rel="noopener noreferrer">
                          View Live Site
                          <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                      </Button>
                      <span className="text-xs text-muted-foreground/40">
                        Click card for details →
                      </span>
                    </div>
                  </div>

                  {/* Right: Preview placeholder */}
                  <div className="relative">
                    <div className="rounded-2xl bg-gradient-to-br from-[#1A1A1F] to-[#131316] border border-border p-4">
                      <div className="rounded-xl bg-gradient-to-br from-[rgba(212,168,83,0.1)] via-[#131316] to-[rgba(212,168,83,0.05)] aspect-video flex flex-col items-center justify-center gap-4 overflow-hidden">
                        {/* Mock browser bar */}
                        <div className="w-full px-4 pt-3">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex gap-1.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-[rgba(255,255,255,0.1)]" />
                              <div className="w-2.5 h-2.5 rounded-full bg-[rgba(255,255,255,0.1)]" />
                              <div className="w-2.5 h-2.5 rounded-full bg-[rgba(255,255,255,0.1)]" />
                            </div>
                            <div className="flex-1 h-6 rounded-md bg-muted/50 flex items-center px-3">
                              <span className="text-[10px] text-[rgba(245,245,245,0.25)] font-mono">
                                sosha-automotive.org
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* Mock content */}
                        <div className="flex-1 w-full px-8 flex flex-col gap-3">
                          <div className="h-6 w-3/4 rounded bg-[rgba(212,168,83,0.12)]" />
                          <div className="h-3 w-full rounded bg-muted/50" />
                          <div className="h-3 w-5/6 rounded bg-muted/50" />
                          <div className="h-3 w-2/3 rounded bg-muted/50" />
                          <div className="mt-4 grid grid-cols-3 gap-3">
                            <div className="h-16 rounded-lg bg-[rgba(212,168,83,0.08)]" />
                            <div className="h-16 rounded-lg bg-[rgba(212,168,83,0.08)]" />
                            <div className="h-16 rounded-lg bg-[rgba(212,168,83,0.08)]" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating badge */}
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -top-4 -right-4 md:-top-6 md:-right-6"
                    >
                      <div className="px-3 py-2 rounded-xl bg-card border border-[rgba(212,168,83,0.2)] shadow-lg shadow-[rgba(0,0,0,0.3)]">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                          <span className="text-xs font-semibold text-[#D4A853]">Live</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="section-divider-gold" />

      {/* ──────────────────── 3. PROJECT GRID ───────────────────── */}
      <section className="relative py-20 md:py-28 bg-background section-gold-tint">
        <CosmicDecorations variant="stardust" intensity="subtle" />
        {/* Background glow orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[rgba(212,168,83,0.03)] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-[rgba(212,168,83,0.025)] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-[250px] h-[250px] bg-[rgba(212,168,83,0.02)] rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Portfolio"
            title="Recent"
            titleHighlight="Projects"
            description="From law firms to schools, medical practices to marketplaces — see how we've helped South African organisations level up their digital presence."
            align="center"
          />

          {/* Filter tabs */}
          <AnimatedSection delay={0.2} direction="up">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex justify-center mb-10 relative">
                <TabsList className="bg-muted/50 border border-border rounded-xl p-1 h-auto relative">
                  {categoryTabs.map((tab) => {
                    const count = tab.key === "all"
                      ? projectCards.length
                      : projectCards.filter((p) => p.categoryKey === tab.key).length;
                    return (
                      <TabsTrigger
                        key={tab.key}
                        value={tab.key}
                        className="data-[state=active]:bg-[rgba(212,168,83,0.1)] data-[state=active]:border-[rgba(212,168,83,0.3)] data-[state=active]:text-[#D4A853] text-muted-foreground px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative"
                      >
                        <span>{tab.label}</span>
                        <span className="ml-1.5 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-bold bg-[rgba(212,168,83,0.08)] text-[rgba(212,168,83,0.7)] data-[state=active]:bg-[rgba(212,168,83,0.2)] data-[state=active]:text-[#D4A853] transition-colors duration-200">
                          {count}
                        </span>
                      </TabsTrigger>
                    );
                  })}
                  {/* Animated gold underline indicator */}
                  <motion.div
                    layoutId="filterUnderline"
                    className="absolute bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4A853] to-transparent rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.2 }}
                    style={{ width: "60px" }}
                  />
                </TabsList>
              </div>

              {/* Tab contents with animated filter */}
              {categoryTabs.map((tab) => (
                <TabsContent key={tab.key} value={tab.key} className="mt-0">
                  <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    <AnimatePresence mode="popLayout">
                      {projectCards
                        .filter(
                          (p) =>
                            tab.key === "all" || p.categoryKey === tab.key
                        )
                        .map((project) => (
                          <motion.div
                            key={project.name}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                          >
                            <div
                              className="group relative h-full rounded-2xl bg-card border border-border overflow-hidden card-hover-gold hover-lift cursor-pointer hover:shadow-[0_0_30px_rgba(212,168,83,0.08)] transition-shadow duration-300 card-shine-sweep"
                              onClick={() => setSelectedProject(project)}
                            >
                              {/* Gold shimmer overlay on hover */}
                              <div className="absolute inset-0 z-20 animate-shimmer-gold opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                              {/* Gradient placeholder header */}
                              <div
                                className={`relative h-40 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}
                              >
                                <project.icon className="w-12 h-12 text-[rgba(212,168,83,0.25)] group-hover:text-[rgba(212,168,83,0.4)] transition-colors duration-300" />
                                {/* Subtle gradient overlay for depth */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#131316] via-[rgba(0,0,0,0.1)] to-transparent" />
                                {/* Category badge with gold-tinted background */}
                                <div className="absolute top-3 right-3">
                                  <Badge className="bg-[rgba(212,168,83,0.12)] backdrop-blur-sm text-[#E8C97A] border-[rgba(212,168,83,0.2)] text-[10px] font-medium px-2.5 py-0.5">
                                    {project.category}
                                  </Badge>
                                </div>
                              </div>

                              {/* Content */}
                              <div className="p-5">
                                <h3
                                  className="text-base font-semibold text-foreground mb-2 group-hover:text-[#E8C97A] transition-colors duration-300 font-display"
                                >
                                  {project.name}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                                  {project.description}
                                </p>
                                {/* Tech badges */}
                                <div className="flex flex-wrap gap-1.5">
                                  {project.tech.map((t) => (
                                    <span
                                      key={t}
                                      className="text-[10px] font-medium px-2 py-1 rounded-md bg-muted/50 text-muted-foreground/60 border border-border"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Hover gold top accent */}
                              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4A853] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                          </motion.div>
                        ))}
                    </AnimatePresence>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </AnimatedSection>
        </div>
      </section>

      <div className="section-divider-gold" />

      {/* ───────────────────── 4. RESULTS SECTION ───────────────── */}
      <section className="relative py-20 md:py-28 bg-background bg-dots section-gold-tint">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.2)] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.2)] to-transparent" />

        {/* Gold glow orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[rgba(212,168,83,0.04)] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/3 left-0 w-[350px] h-[250px] bg-[rgba(212,168,83,0.03)] rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-0 w-[300px] h-[250px] bg-[rgba(212,168,83,0.025)] rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Impact"
            title="The Numbers"
            titleHighlight="Don't Lie"
            description="Hard metrics from real projects. No fluff, no vanity stats — just the numbers that matter."
            align="center"
          />

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8" staggerDelay={0.15}>
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="text-center p-6 rounded-2xl bg-card border border-border card-hover">
                  <div
                    className="text-4xl md:text-5xl font-bold text-gradient-gold counter-glow mb-2 font-display"
                  >
                    {stat.prefix}
                    <AnimatedCounter
                      target={stat.decimal ? Math.round(stat.target * 10) : stat.target}
                      suffix={stat.suffix}
                      duration={stat.decimal ? 2500 : 2000}
                    />
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <div className="section-divider-gold" />

      {/* ──────────────────── 5. CTA SECTION ───────────────────── */}
      <section className="relative py-20 md:py-28 bg-background section-gold-tint">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up">
            <div className="relative overflow-hidden rounded-3xl gold-border-animated">
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(212,168,83,0.08)] via-[rgba(19,19,22,0.95)] to-[rgba(212,168,83,0.04)]" />
              <div className="absolute inset-0 bg-dots opacity-40" />

              {/* Noise texture overlay */}
              <div className="absolute inset-0 noise-gold" />

              {/* Decorative glows */}
              <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-[rgba(212,168,83,0.06)] rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-[rgba(212,168,83,0.04)] rounded-full blur-[100px] pointer-events-none" />

              {/* Decorative floating gold dots */}
              <div className="absolute top-12 left-[15%] w-1.5 h-1.5 rounded-full bg-[#D4A853] animate-gold-float pointer-events-none" style={{ animationDelay: "0s" }} />
              <div className="absolute top-24 right-[20%] w-1 h-1 rounded-full bg-[#E8C97A] animate-gold-float pointer-events-none" style={{ animationDelay: "1s" }} />
              <div className="absolute bottom-20 left-[25%] w-2 h-2 rounded-full bg-[#D4A853] animate-gold-float pointer-events-none" style={{ animationDelay: "2s" }} />
              <div className="absolute bottom-32 right-[30%] w-1 h-1 rounded-full bg-[#B8922F] animate-gold-float pointer-events-none" style={{ animationDelay: "0.5s" }} />
              <div className="absolute top-1/2 left-[10%] w-1.5 h-1.5 rounded-full bg-[#E8C97A] animate-gold-float pointer-events-none" style={{ animationDelay: "1.5s" }} />

              <div className="relative z-10 px-6 py-14 md:px-16 md:py-20 lg:px-24 lg:py-24 text-center">
                <h2
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight font-display text-glow-gold"
                >
                  Have a Project in Mind?
                </h2>

                <p className="text-base md:text-lg text-[rgba(245,245,245,0.55)] max-w-2xl mx-auto leading-relaxed mb-10">
                  Let&apos;s discuss how we can bring your vision to life. From a simple landing page 
                  to a full-scale digital platform — we&apos;ve got you covered.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    onClick={() => handleNavClick("contact")}
                    size="lg"
                    className="bg-gradient-to-r from-[#D4A853] to-[#B8922F] hover:from-[#E8C97A] hover:to-[#D4A853] text-[#0A0A0B] font-semibold px-10 py-6 text-base rounded-xl shadow-lg shadow-[rgba(212,168,83,0.25)] hover:shadow-[rgba(212,168,83,0.35)] transition-all duration-300 group"
                  >
                    Start a Conversation
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    onClick={() => handleNavClick("packages")}
                    size="lg"
                    variant="outline"
                    className="border-[rgba(255,255,255,0.15)] bg-transparent hover:bg-white/5 text-foreground font-semibold px-10 py-6 text-base rounded-xl transition-all duration-300 group"
                  >
                    View Packages
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                <p className="mt-6 text-xs text-muted-foreground/40">
                  Free 30-minute discovery call · No obligation · Response within 2 hours
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ──────────────── PROJECT DETAIL DIALOG ─────────────────── */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailDialog
            project={selectedProject}
            open={!!selectedProject}
            onOpenChange={(open) => {
              if (!open) setSelectedProject(null);
            }}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
