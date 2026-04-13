"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Shield,
  CheckCircle,
  Send,
  ArrowRight,
  Sparkles,
  Heart,
  User,
  Building,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ParallaxSection } from "@/components/shared/ParallaxSection";
import CosmicDecorations from "@/components/shared/CosmicDecorations";

/* ──────────────────────── contact methods ──────────────────────── */
const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "kabelokadiaka4@gmail.com",
    href: "mailto:kabelokadiaka4@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "072 402 6893",
    href: "tel:+27724026893",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat on WhatsApp",
    href: "https://wa.me/27724026893",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "1457 Block L, Soshanguve, Pretoria, Gauteng",
    href: null,
  },
];

/* ──────────────────────── service options ──────────────────────── */
const serviceOptions = [
  "Website Development",
  "Web Application",
  "Brand Identity",
  "AI Solutions",
  "Internal Tools",
  "Other",
];

/* ──────────────────────── budget options ───────────────────────── */
const budgetOptions = [
  "Under R5,000",
  "R5,000-R10,000",
  "R10,000-R20,000",
  "R20,000-R50,000",
  "R50,000+",
];

/* ──────────────────────── trust badges ─────────────────────────── */
const trustBadges = [
  { label: "B-BBEE Level 1", icon: Shield },
  { label: "100% Black-Owned", icon: CheckCircle },
  { label: "POPIA Compliant", icon: Shield },
  { label: "CSD Registered", icon: CheckCircle },
  { label: "CIPC: 2025/907839/07", icon: CheckCircle },
];

/* ──────────────────────── location info cards ──────────────────── */
const locationCards = [
  {
    icon: MapPin,
    title: "Physical Address",
    lines: ["1457 Block L, Soshanguve", "Pretoria, Gauteng, South Africa"],
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["kabelokadiaka4@gmail.com", "We reply within 2 hours"],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["072 402 6893", "Mon–Fri, 08:00–18:00"],
  },
  {
    icon: Clock,
    title: "Operating Hours",
    lines: ["Mon–Fri: 08:00–18:00", "Sat: 09:00–14:00"],
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   CONTACT PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════════ */
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.success) {
        toast.success("Message sent successfully!", {
          description: "We'll get back to you within 2 business hours.",
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          budget: "",
          message: "",
        });
      } else {
        toast.error("Submission failed", {
          description: "Please check your inputs and try again.",
        });
      }
    } catch {
      toast.error("Network error", {
        description: "Could not reach the server. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative overflow-hidden">
      {/* ───────────────────── 1. PAGE HERO ───────────────────── */}
      <section className="relative py-28 md:py-40 bg-background">
        {/* Background */}
        <div className="absolute inset-0 bg-grid pattern-grid-animated" />

        {/* ── Parallax background layers ── */}
        {/* Large gold glow orb — speed 0.15 */}
        <ParallaxSection speed={0.15} direction="up" className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[rgba(212,168,83,0.06)] rounded-full blur-[120px]" />
          <div className="absolute top-[60%] right-[18%] w-[250px] h-[250px] bg-[rgba(212,168,83,0.04)] rounded-full blur-[80px]" />
        </ParallaxSection>

        {/* Small floating geometric shapes — speed 0.08 */}
        <ParallaxSection speed={0.08} direction="up" className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ rotate: 45 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[22%] left-[10%] w-8 h-8 rounded-lg border border-[rgba(212,168,83,0.1)] bg-[rgba(212,168,83,0.03)]"
          />
          <motion.div
            animate={{ rotate: -30 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-[18%] right-[12%] w-6 h-6 rounded-full border border-[rgba(212,168,83,0.08)] bg-[rgba(212,168,83,0.02)]"
          />
          <motion.div
            animate={{ rotate: 60 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[28%] left-[20%] w-10 h-10 rounded-sm border border-[rgba(212,168,83,0.06)] bg-[rgba(212,168,83,0.02)]"
          />
          <motion.div
            animate={{ rotate: -45 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[22%] right-[10%] w-5 h-5 rounded border border-[rgba(212,168,83,0.1)] bg-[rgba(212,168,83,0.03)]"
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(212,168,83,0.08)] border border-[rgba(212,168,83,0.15)] mb-8 label-badge">
                <MessageCircle className="w-4 h-4 text-[#D4A853]" />
                <span className="text-sm font-medium text-[#D4A853]">
                  Get in Touch
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} direction="up">
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight font-display"
              >
                <span className="text-gradient-gold">Let&apos;s Talk</span>
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.35} direction="up">
              <p
                className="mt-4 text-xl md:text-2xl text-[rgba(245,245,245,0.65)] font-medium font-display"
              >
                Ready When You Are
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.5} direction="up">
              <p className="mt-6 text-base md:text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
                Book a free 30-minute discovery call with no pressure and no obligation. 
                We&apos;ll learn about your vision, answer your questions, and outline a 
                clear path forward — whether you work with us or not.
              </p>
            </AnimatedSection>
          </div>
        </ParallaxSection>

        {/* Gold gradient fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0A0B] via-[rgba(10,10,11,0.6)] to-transparent pointer-events-none" />
      </section>

      <div className="section-divider-gold" />

      {/* ────────────────── 2. CONTACT GRID ─────────────────────── */}
      <section className="relative py-20 md:py-28 bg-background section-gold-tint grain-texture">
        <CosmicDecorations variant="constellation" intensity="subtle" />
        {/* Gold glow orbs */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[rgba(212,168,83,0.04)] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-[rgba(212,168,83,0.03)] rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Left column - Contact Form (3 cols) */}
            <div className="lg:col-span-3">
              <AnimatedSection delay={0.1} direction="left">
                {/* Gold radial glow behind form */}
                <div className="absolute -inset-4 bg-gold-gradient-radial opacity-60 pointer-events-none hidden lg:block" />
                <div className="relative rounded-2xl glass-gold border-l-[3px] border-l-[#D4A853] p-6 md:p-8 shadow-[0_0_40px_rgba(212,168,83,0.08)]">
                  {/* Heading */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-[rgba(212,168,83,0.2)] to-[rgba(212,168,83,0.05)] border border-[rgba(212,168,83,0.15)] flex items-center justify-center">
                      <Send className="w-5 h-5 text-[#D4A853]" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground font-display">
                      Send Us a Message
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground mb-8">
                    Fill out the form below and we&apos;ll get back to you within 2 business hours.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name & Email row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium text-[rgba(245,245,245,0.7)]">
                          Full Name <span className="text-[#D4A853]">*</span>
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40 pointer-events-none" />
                          <Input
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            placeholder="Your full name"
                            className="pl-10 bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] text-foreground placeholder:text-[rgba(245,245,245,0.25)] rounded-xl h-11 input-gold"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-[rgba(245,245,245,0.7)]">
                          Email Address <span className="text-[#D4A853]">*</span>
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40 pointer-events-none" />
                          <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            placeholder="you@company.co.za"
                            className="pl-10 bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] text-foreground placeholder:text-[rgba(245,245,245,0.25)] rounded-xl h-11 input-gold"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Phone & Company row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium text-[rgba(245,245,245,0.7)]">
                          Phone Number
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40 pointer-events-none" />
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            placeholder="072 402 6893"
                            className="pl-10 bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] text-foreground placeholder:text-[rgba(245,245,245,0.25)] rounded-xl h-11 input-gold"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-sm font-medium text-[rgba(245,245,245,0.7)]">
                          Company / Organisation
                        </Label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40 pointer-events-none" />
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) => handleChange("company", e.target.value)}
                            placeholder="Your company name"
                            className="pl-10 bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] text-foreground placeholder:text-[rgba(245,245,245,0.25)] rounded-xl h-11 input-gold"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Service & Budget row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-[rgba(245,245,245,0.7)]">
                          Service Interest
                        </Label>
                        <Select
                          value={formData.service}
                          onValueChange={(value) => handleChange("service", value)}
                        >
                          <SelectTrigger className="bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] text-foreground rounded-xl h-11 input-gold">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1A1A1F] border-[rgba(255,255,255,0.08)]">
                            {serviceOptions.map((option) => (
                              <SelectItem
                                key={option}
                                value={option}
                                className="text-[rgba(245,245,245,0.7)] focus:bg-[rgba(212,168,83,0.1)] focus:text-foreground"
                              >
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-[rgba(245,245,245,0.7)]">
                          Budget Range
                        </Label>
                        <Select
                          value={formData.budget}
                          onValueChange={(value) => handleChange("budget", value)}
                        >
                          <SelectTrigger className="bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] text-foreground rounded-xl h-11 input-gold">
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1A1A1F] border-[rgba(255,255,255,0.08)]">
                            {budgetOptions.map((option) => (
                              <SelectItem
                                key={option}
                                value={option}
                                className="text-[rgba(245,245,245,0.7)] focus:bg-[rgba(212,168,83,0.1)] focus:text-foreground"
                              >
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium text-[rgba(245,245,245,0.7)]">
                        Your Message <span className="text-[#D4A853]">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        placeholder="Tell us about your project, goals, and timeline..."
                        rows={5}
                        className="bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] text-foreground placeholder:text-[rgba(245,245,245,0.25)] rounded-xl resize-none input-gold"
                      />
                    </div>

                    {/* Submit button - enhanced with glow */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      size="lg"
                      className="w-full bg-gradient-to-r from-[#D4A853] via-[#E8C97A] to-[#D4A853] hover:from-[#E8C97A] hover:via-[#D4A853] hover:to-[#B8922F] text-[#0A0A0B] font-semibold py-5 text-base rounded-xl shadow-[0_0_30px_rgba(212,168,83,0.3),0_0_60px_rgba(212,168,83,0.1)] hover:shadow-[0_0_40px_rgba(212,168,83,0.45),0_0_80px_rgba(212,168,83,0.15)] transition-all duration-300 group disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Send className="w-5 h-5" />
                          </motion.div>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Send Message
                          <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </span>
                      )}
                    </Button>
                  </form>
                </div>
              </AnimatedSection>
            </div>

            {/* Right column - Contact Info (2 cols) */}
            <div className="lg:col-span-2">
              <AnimatedSection delay={0.2} direction="right">
                <div className="space-y-6">
                  {/* Get in Touch heading */}
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 font-display">
                      Get in Touch
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Reach out directly through any of these channels.
                    </p>
                  </div>

                  {/* Contact method cards */}
                  <StaggerContainer className="space-y-3" staggerDelay={0.08}>
                    {contactMethods.map((method, index) => (
                      <StaggerItem key={method.label}>
                        {method.href ? (
                          <a
                            href={method.href}
                            target={method.href.startsWith("http") ? "_blank" : undefined}
                            rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          >
                            <div
                              className="group flex items-start gap-4 p-4 rounded-xl bg-card border border-border card-hover-gold cursor-pointer card-idle-pulse"
                              style={{ transitionDelay: `${index * 50}ms` }}
                            >
                              <div className="w-10 h-10 shrink-0 rounded-lg bg-[rgba(212,168,83,0.1)] border border-[rgba(212,168,83,0.15)] flex items-center justify-center group-hover:bg-[rgba(212,168,83,0.15)] group-hover:shadow-[0_0_20px_rgba(212,168,83,0.2)] transition-all duration-300">
                                <method.icon className="w-5 h-5 text-[#D4A853] group-hover:text-[#E8C97A] transition-colors duration-300" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-medium text-muted-foreground/60 mb-0.5">
                                  {method.label}
                                </p>
                                <p className="text-sm font-medium text-foreground group-hover:text-[#E8C97A] transition-colors duration-200 break-all">
                                  {method.value}
                                </p>
                              </div>
                              <ArrowRight className="w-4 h-4 text-[rgba(245,245,245,0.2)] shrink-0 mt-1 ml-auto group-hover:text-[#D4A853] group-hover:translate-x-1 transition-all duration-300" />
                            </div>
                          </a>
                        ) : (
                          <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border card-idle-pulse">
                            <div className="w-10 h-10 shrink-0 rounded-lg bg-[rgba(212,168,83,0.1)] border border-[rgba(212,168,83,0.15)] flex items-center justify-center">
                              <method.icon className="w-5 h-5 text-[#D4A853]" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-medium text-muted-foreground/60 mb-0.5">
                                {method.label}
                              </p>
                              <p className="text-sm font-medium text-foreground break-all">
                                {method.value}
                              </p>
                            </div>
                          </div>
                        )}
                      </StaggerItem>
                    ))}
                  </StaggerContainer>

                  {/* Business hours card */}
                  <AnimatedSection delay={0.4} direction="right">
                    <div className="rounded-xl glass-gold p-5 shadow-[0_0_20px_rgba(212,168,83,0.06)]">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 shrink-0 rounded-lg bg-[rgba(212,168,83,0.1)] border border-[rgba(212,168,83,0.15)] flex items-center justify-center">
                          <Clock className="w-5 h-5 text-[#D4A853]" />
                        </div>
                        <h3 className="text-base font-semibold text-foreground font-display">
                          Business Hours
                        </h3>
                      </div>
                      <div className="space-y-2.5">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Monday – Friday</span>
                          <span className="text-foreground font-medium">08:00 – 18:00</span>
                        </div>
                        <Separator className="bg-[rgba(255,255,255,0.06)]" />
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Saturday</span>
                          <span className="text-foreground font-medium">09:00 – 14:00</span>
                        </div>
                        <Separator className="bg-[rgba(255,255,255,0.06)]" />
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Sunday</span>
                          <span className="text-muted-foreground/40 font-medium">Closed</span>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider-gold" />

      {/* ───────────────── 3. MAP / LOCATION SECTION ─────────────── */}
      <section className="relative py-20 md:py-28 bg-background section-gold-tint grain-texture">
        {/* Gold glow orbs */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[rgba(212,168,83,0.04)] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-[rgba(212,168,83,0.03)] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Our Location"
            title="Find Us in"
            titleHighlight="Soshanguve"
            description="Based in Pretoria, serving clients nationwide across South Africa."
            align="center"
          />

          <AnimatedSection delay={0.2} direction="up">
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
              {/* Stylized Map Area - spans 3 cols */}
              <div className="lg:col-span-3 relative rounded-2xl overflow-hidden min-h-[380px] lg:min-h-[440px] border border-[rgba(212,168,83,0.12)] shadow-[0_0_40px_rgba(212,168,83,0.06)]">
                {/* Dark base */}
                <div className="absolute inset-0 bg-background" />
                {/* Grid pattern background */}
                <div className="absolute inset-0 bg-grid" />
                {/* Gold gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(212,168,83,0.08)] via-[rgba(10,10,11,0.95)] to-[rgba(184,146,47,0.05)]" />
                {/* Dot pattern */}
                <div className="absolute inset-0 bg-dots opacity-30" />

                {/* Decorative grid lines - roads */}
                <div className="absolute inset-0 opacity-[0.05]">
                  {/* Vertical roads */}
                  <div className="absolute left-[15%] top-0 bottom-0 w-[2px] bg-white" />
                  <div className="absolute left-[35%] top-0 bottom-0 w-[2px] bg-white" />
                  <div className="absolute left-[50%] top-0 bottom-0 w-[3px] bg-[#D4A853] opacity-80" />
                  <div className="absolute left-[65%] top-0 bottom-0 w-[2px] bg-white" />
                  <div className="absolute left-[85%] top-0 bottom-0 w-[2px] bg-white" />
                  {/* Horizontal roads */}
                  <div className="absolute top-[15%] left-0 right-0 h-[2px] bg-white" />
                  <div className="absolute top-[35%] left-0 right-0 h-[2px] bg-white" />
                  <div className="absolute top-[55%] left-0 right-0 h-[3px] bg-[#D4A853] opacity-80" />
                  <div className="absolute top-[75%] left-0 right-0 h-[2px] bg-white" />
                  <div className="absolute top-[90%] left-0 right-0 h-[2px] bg-white" />
                  {/* Diagonal road */}
                  <div className="absolute top-[20%] left-[10%] w-[60%] h-[2px] bg-white rotate-[25deg] origin-left" />
                  {/* Block shapes */}
                  <div className="absolute top-[18%] left-[18%] w-[14%] h-[14%] border border-white/40 rounded-sm" />
                  <div className="absolute top-[40%] left-[55%] w-[8%] h-[12%] border border-white/30 rounded-sm" />
                  <div className="absolute top-[60%] left-[20%] w-[12%] h-[10%] border border-white/30 rounded-sm" />
                  <div className="absolute top-[25%] left-[68%] w-[10%] h-[16%] border border-white/25 rounded-sm" />
                </div>

                {/* Subtle gold road lines */}
                <div className="absolute inset-0 opacity-[0.06]">
                  <div className="absolute top-[55%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4A853] to-transparent" />
                  <div className="absolute top-0 bottom-0 left-[50%] w-[1px] bg-gradient-to-b from-transparent via-[#D4A853] to-transparent" />
                </div>

                {/* SVG Map Pin Marker - centered */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="relative"
                  >
                    {/* Outer pulse ring */}
                    <motion.div
                      animate={{ scale: [1, 2.2], opacity: [0.35, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                      className="absolute -inset-4 rounded-full border-2 border-[rgba(212,168,83,0.3)]"
                    />
                    {/* Mid pulse ring */}
                    <motion.div
                      animate={{ scale: [1, 1.6], opacity: [0.25, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
                      className="absolute -inset-2 rounded-full border border-[rgba(212,168,83,0.2)]"
                    />
                    {/* Pin glow background */}
                    <div className="absolute -inset-6 bg-[rgba(212,168,83,0.08)] rounded-full blur-[20px]" />
                    {/* SVG Pin Icon */}
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="relative z-10 drop-shadow-[0_0_12px_rgba(212,168,83,0.5)]"
                    >
                      <path
                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                        fill="rgba(212,168,83,0.2)"
                        stroke="#D4A853"
                        strokeWidth="1.5"
                      />
                      <circle cx="12" cy="9" r="3" fill="#D4A853" />
                    </svg>
                  </motion.div>
                </div>

                {/* Label overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[rgba(10,10,11,0.9)] via-[rgba(10,10,11,0.5)] to-transparent pt-12 pb-5 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4A853] to-[#B8922F] flex items-center justify-center shadow-[0_0_15px_rgba(212,168,83,0.3)]">
                      <MapPin className="w-4 h-4 text-[#0A0A0B]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground font-display tracking-wide">
                        Carter Digitals (Pty) Ltd
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        1457 Block L, Soshanguve, Pretoria, Gauteng
                      </p>
                    </div>
                  </div>
                </div>

                {/* Corner gold accents */}
                <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-[rgba(212,168,83,0.3)] rounded-tl-sm" />
                <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-[rgba(212,168,83,0.3)] rounded-tr-sm" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-[rgba(212,168,83,0.3)] rounded-bl-sm" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-[rgba(212,168,83,0.3)] rounded-br-sm" />
              </div>

              {/* Location Info Cards - spans 2 cols */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4" staggerDelay={0.1}>
                  {locationCards.map((card) => (
                    <StaggerItem key={card.title}>
                      <div className="glass-gold rounded-xl p-5 hover-lift group cursor-default">
                        <div className="flex items-start gap-4">
                          <div className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-[rgba(212,168,83,0.15)] to-[rgba(212,168,83,0.05)] border border-[rgba(212,168,83,0.12)] flex items-center justify-center group-hover:shadow-[0_0_16px_rgba(212,168,83,0.15)] transition-all duration-300">
                            <card.icon className="w-5 h-5 text-[#D4A853] group-hover:text-[#E8C97A] transition-colors duration-300" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground mb-1.5 font-display">
                              {card.title}
                            </p>
                            {card.lines.map((line, i) => (
                              <p
                                key={i}
                                className={`text-xs leading-relaxed ${
                                  i === 0
                                    ? "text-foreground/60"
                                    : "text-muted-foreground/60"
                                }`}
                              >
                                {line}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>

                {/* Nationwide coverage note */}
                <AnimatedSection delay={0.5} direction="up">
                  <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-gradient-to-r from-[rgba(212,168,83,0.08)] to-[rgba(212,168,83,0.03)] border border-[rgba(212,168,83,0.15)] shadow-[0_0_20px_rgba(212,168,83,0.04)]">
                    <div className="w-9 h-9 shrink-0 rounded-lg bg-[rgba(212,168,83,0.1)] border border-[rgba(212,168,83,0.12)] flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-[#D4A853]" />
                    </div>
                    <p className="text-sm text-foreground/60">
                      <span className="text-foreground font-medium">Nationwide coverage.</span>{" "}
                      We serve clients across South Africa — fully remote-friendly.
                    </p>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="section-divider-gold" />

      {/* ──────────────────── 4. TRUST SECTION ──────────────────── */}
      <section className="relative py-14 md:py-18 bg-background section-gold-tint">
        {/* Gold glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-[rgba(212,168,83,0.03)] rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up">
            <div className="flex flex-col items-center text-center">
              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-5">
                {trustBadges.map((badge, index) => (
                  <motion.div
                    key={badge.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[rgba(212,168,83,0.08)] to-[rgba(212,168,83,0.03)] border border-[rgba(212,168,83,0.18)] shadow-[0_0_20px_rgba(212,168,83,0.04)] hover:border-[rgba(212,168,83,0.3)] hover:shadow-[0_0_25px_rgba(212,168,83,0.08)] transition-all duration-300">
                      <badge.icon className="w-4 h-4 text-[#D4A853] shrink-0" />
                      <span className="text-xs md:text-sm font-medium text-[rgba(245,245,245,0.75)] whitespace-nowrap">
                        {badge.label}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground/60">
                Registered, compliant, and ready to serve
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="section-divider-gold" />

      {/* ─────────────── 5. RESPONSE PROMISE SECTION ─────────────── */}
      <section className="relative py-20 md:py-28 bg-background section-gold-tint grain-texture">
        <CosmicDecorations variant="stardust" intensity="subtle" />
        {/* Background glow orbs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[rgba(212,168,83,0.04)] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-[rgba(184,146,47,0.03)] rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up">
            <div className="relative overflow-hidden rounded-2xl glass-gold-premium border-l-[3px] border-l-[#D4A853] p-8 md:p-10 shadow-[0_0_50px_rgba(212,168,83,0.08)]">
              {/* Background accents */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[rgba(212,168,83,0.05)] rounded-full blur-[70px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-[rgba(212,168,83,0.04)] rounded-full blur-[60px] pointer-events-none" />

              {/* Floating gold decorative dots */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-8 right-8 w-2 h-2 rounded-full bg-[#D4A853] opacity-40"
              />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-16 right-20 w-1.5 h-1.5 rounded-full bg-[#E8C97A] opacity-30"
              />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-12 left-12 w-2 h-2 rounded-full bg-[#D4A853] opacity-35"
              />
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute bottom-20 right-16 w-1 h-1 rounded-full bg-[#E8C97A] opacity-25"
              />
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute top-1/2 right-6 w-1.5 h-1.5 rounded-full bg-[#D4A853] opacity-20"
              />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[rgba(212,168,83,0.2)] to-[rgba(212,168,83,0.05)] border border-[rgba(212,168,83,0.18)] flex items-center justify-center shadow-[0_0_16px_rgba(212,168,83,0.1)]">
                    <Heart className="w-6 h-6 text-[#D4A853]" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground font-display">
                    Our Response Promise
                  </h2>
                </div>

                <p className="text-base md:text-lg text-foreground/60 leading-relaxed mb-4">
                  We respond to all enquiries within <span className="text-[#D4A853] font-semibold text-glow-gold">2 business hours</span> during 
                  operating days. For urgent requests, reach us directly on WhatsApp.
                </p>

                <Separator className="bg-[rgba(212,168,83,0.1)] my-5" />

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 shrink-0 rounded-lg bg-[rgba(212,168,83,0.1)] border border-[rgba(212,168,83,0.12)] flex items-center justify-center mt-0.5">
                    <Sparkles className="w-4 h-4 text-[#D4A853]" />
                  </div>
                  <p className="text-base text-[rgba(245,245,245,0.55)] leading-relaxed italic">
                    No bots. No auto-replies. A real person who cares about your project.
                  </p>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://wa.me/27724026893"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[rgba(37,211,102,0.1)] border border-[rgba(37,211,102,0.2)] text-[#25D366] font-medium text-sm hover:bg-[rgba(37,211,102,0.15)] hover:shadow-[0_0_20px_rgba(37,211,102,0.1)] transition-all duration-300"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp Us Now
                  </a>
                  <a
                    href="mailto:kabelokadiaka4@gmail.com"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl glass-gold text-[rgba(245,245,245,0.7)] font-medium text-sm hover:text-foreground hover:border-[rgba(212,168,83,0.25)] hover:shadow-[0_0_20px_rgba(212,168,83,0.08)] transition-all duration-300"
                  >
                    <Mail className="w-4 h-4" />
                    Send an Email
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
