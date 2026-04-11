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
  "B-BBEE Level 1",
  "100% Black-Owned",
  "POPIA Compliant",
  "CSD Registered",
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
      <section className="relative py-28 md:py-40 bg-[#0A0A0B]">
        {/* Background */}
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B] via-transparent to-[#0A0A0B]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(212,168,83,0.03)] via-transparent to-[rgba(212,168,83,0.02)]" />

        {/* Radial glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[rgba(212,168,83,0.04)] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection delay={0.1} direction="up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(212,168,83,0.08)] border border-[rgba(212,168,83,0.15)] mb-8">
              <MessageCircle className="w-4 h-4 text-[#D4A853]" />
              <span className="text-sm font-medium text-[#D4A853]">
                Get in Touch
              </span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2} direction="up">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight" font-display
            >
              <span className="text-gradient-gold">Let&apos;s Talk</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.35} direction="up">
            <p
              className="mt-4 text-xl md:text-2xl text-[rgba(245,245,245,0.5)] font-medium font-display"
            >
              Ready When You Are
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.5} direction="up">
            <p className="mt-6 text-base md:text-lg text-[rgba(245,245,245,0.6)] max-w-2xl mx-auto leading-relaxed">
              Book a free 30-minute discovery call with no pressure and no obligation. 
              We&apos;ll learn about your vision, answer your questions, and outline a 
              clear path forward — whether you work with us or not.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.2)] to-transparent" />

      {/* ────────────────── 2. CONTACT GRID ─────────────────────── */}
      <section className="relative py-20 md:py-28 bg-[#0A0A0B]">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.2)] to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[600px] bg-[rgba(212,168,83,0.03)] rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Left column - Contact Form (3 cols) */}
            <div className="lg:col-span-3">
              <AnimatedSection delay={0.1} direction="left">
                <div className="rounded-2xl bg-[#131316] border border-[rgba(212,168,83,0.1)] p-6 md:p-8 shadow-[0_0_40px_rgba(212,168,83,0.05)]">
                  <h2
                    className="text-2xl md:text-3xl font-bold text-white mb-2 font-display"
                  >
                    Send Us a Message
                  </h2>
                  <p className="text-sm text-[rgba(245,245,245,0.5)] mb-8">
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
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(245,245,245,0.3)] pointer-events-none" />
                          <Input
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            placeholder="Your full name"
                            className="pl-10 bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] text-white placeholder:text-[rgba(245,245,245,0.25)] focus:border-[rgba(212,168,83,0.5)] focus:ring-1 focus:ring-[rgba(212,168,83,0.2)] focus:shadow-[0_0_20px_rgba(212,168,83,0.05)] rounded-xl h-11"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-[rgba(245,245,245,0.7)]">
                          Email Address <span className="text-[#D4A853]">*</span>
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(245,245,255,0.3)] pointer-events-none" />
                          <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            placeholder="you@company.co.za"
                            className="pl-10 bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] text-white placeholder:text-[rgba(245,245,245,0.25)] focus:border-[rgba(212,168,83,0.5)] focus:ring-1 focus:ring-[rgba(212,168,83,0.2)] focus:shadow-[0_0_20px_rgba(212,168,83,0.05)] rounded-xl h-11"
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
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(245,245,245,0.3)] pointer-events-none" />
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            placeholder="072 402 6893"
                            className="pl-10 bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] text-white placeholder:text-[rgba(245,245,245,0.25)] focus:border-[rgba(212,168,83,0.5)] focus:ring-1 focus:ring-[rgba(212,168,83,0.2)] focus:shadow-[0_0_20px_rgba(212,168,83,0.05)] rounded-xl h-11"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-sm font-medium text-[rgba(245,245,245,0.7)]">
                          Company / Organisation
                        </Label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(245,245,245,0.3)] pointer-events-none" />
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) => handleChange("company", e.target.value)}
                            placeholder="Your company name"
                            className="pl-10 bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] text-white placeholder:text-[rgba(245,245,245,0.25)] focus:border-[rgba(212,168,83,0.5)] focus:ring-1 focus:ring-[rgba(212,168,83,0.2)] focus:shadow-[0_0_20px_rgba(212,168,83,0.05)] rounded-xl h-11"
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
                          <SelectTrigger className="bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] text-white focus:border-[rgba(212,168,83,0.5)] focus:ring-1 focus:ring-[rgba(212,168,83,0.2)] focus:shadow-[0_0_20px_rgba(212,168,83,0.05)] rounded-xl h-11">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1A1A1F] border-[rgba(255,255,255,0.08)]">
                            {serviceOptions.map((option) => (
                              <SelectItem
                                key={option}
                                value={option}
                                className="text-[rgba(245,245,245,0.7)] focus:bg-[rgba(212,168,83,0.1)] focus:text-white"
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
                          <SelectTrigger className="bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] text-white focus:border-[rgba(212,168,83,0.5)] focus:ring-1 focus:ring-[rgba(212,168,83,0.2)] focus:shadow-[0_0_20px_rgba(212,168,83,0.05)] rounded-xl h-11">
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1A1A1F] border-[rgba(255,255,255,0.08)]">
                            {budgetOptions.map((option) => (
                              <SelectItem
                                key={option}
                                value={option}
                                className="text-[rgba(245,245,245,0.7)] focus:bg-[rgba(212,168,83,0.1)] focus:text-white"
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
                        className="bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] text-white placeholder:text-[rgba(245,245,245,0.25)] focus:border-[rgba(212,168,83,0.5)] focus:ring-1 focus:ring-[rgba(212,168,83,0.2)] focus:shadow-[0_0_20px_rgba(212,168,83,0.05)] rounded-xl resize-none"
                      />
                    </div>

                    {/* Submit button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      size="lg"
                      className="w-full bg-gradient-to-r from-[#D4A853] to-[#B8922F] hover:from-[#E8C97A] hover:to-[#D4A853] text-[#0A0A0B] font-semibold py-5 text-base rounded-xl shadow-lg shadow-[rgba(212,168,83,0.25)] hover:shadow-[rgba(212,168,83,0.35)] transition-all duration-300 group disabled:opacity-60 disabled:cursor-not-allowed"
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
                    <h2
                      className="text-2xl md:text-3xl font-bold text-white mb-2 font-display"
                    >
                      Get in Touch
                    </h2>
                    <p className="text-sm text-[rgba(245,245,245,0.5)]">
                      Reach out directly through any of these channels.
                    </p>
                  </div>

                  {/* Contact method cards */}
                  <StaggerContainer className="space-y-3" staggerDelay={0.08}>
                    {contactMethods.map((method) => (
                      <StaggerItem key={method.label}>
                        {method.href ? (
                          <a
                            href={method.href}
                            target={method.href.startsWith("http") ? "_blank" : undefined}
                            rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          >
                            <div className="group flex items-start gap-4 p-4 rounded-xl bg-[#131316] border border-[rgba(255,255,255,0.06)] card-hover-gold cursor-pointer">
                              <div className="w-10 h-10 shrink-0 rounded-lg bg-[rgba(212,168,83,0.1)] border border-[rgba(212,168,83,0.15)] flex items-center justify-center group-hover:bg-[rgba(212,168,83,0.15)] transition-colors duration-300">
                                <method.icon className="w-5 h-5 text-[#D4A853]" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-medium text-[rgba(245,245,245,0.4)] mb-0.5">
                                  {method.label}
                                </p>
                                <p className="text-sm font-medium text-white group-hover:text-[#E8C97A] transition-colors duration-200 break-all">
                                  {method.value}
                                </p>
                              </div>
                            </div>
                          </a>
                        ) : (
                          <div className="flex items-start gap-4 p-4 rounded-xl bg-[#131316] border border-[rgba(255,255,255,0.06)]">
                            <div className="w-10 h-10 shrink-0 rounded-lg bg-[rgba(212,168,83,0.1)] border border-[rgba(212,168,83,0.15)] flex items-center justify-center">
                              <method.icon className="w-5 h-5 text-[#D4A853]" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-medium text-[rgba(245,245,245,0.4)] mb-0.5">
                                {method.label}
                              </p>
                              <p className="text-sm font-medium text-white break-all">
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
                    <div className="rounded-xl bg-gradient-to-br from-[rgba(212,168,83,0.03)] to-[#131316] border border-[rgba(212,168,83,0.1)] p-5 shadow-[0_0_20px_rgba(212,168,83,0.04)]">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 shrink-0 rounded-lg bg-[rgba(212,168,83,0.1)] border border-[rgba(212,168,83,0.15)] flex items-center justify-center">
                          <Clock className="w-5 h-5 text-[#D4A853]" />
                        </div>
                        <h3
                          className="text-base font-semibold text-white font-display"
                        >
                          Business Hours
                        </h3>
                      </div>
                      <div className="space-y-2.5">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-[rgba(245,245,245,0.5)]">Monday – Friday</span>
                          <span className="text-white font-medium">08:00 – 18:00</span>
                        </div>
                        <Separator className="bg-[rgba(255,255,255,0.06)]" />
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-[rgba(245,245,245,0.5)]">Saturday</span>
                          <span className="text-white font-medium">09:00 – 14:00</span>
                        </div>
                        <Separator className="bg-[rgba(255,255,255,0.06)]" />
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-[rgba(245,245,245,0.5)]">Sunday</span>
                          <span className="text-[rgba(245,245,245,0.3)] font-medium">Closed</span>
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

      <div className="h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.2)] to-transparent" />

      {/* ───────────────── 3. MAP / LOCATION SECTION ─────────────── */}
      <section className="relative py-20 md:py-28 bg-[#0A0A0B] section-gold-tint">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Our Location"
            title="Find Us in"
            titleHighlight="Soshanguve"
            description="Based in Pretoria, serving clients nationwide across South Africa."
            align="center"
          />

          <AnimatedSection delay={0.2} direction="up">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              {/* Map placeholder */}
              <div className="relative rounded-2xl bg-[#131316] border border-[rgba(255,255,255,0.06)] overflow-hidden min-h-[320px]">
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(212,168,83,0.06)] via-[#131316] to-[rgba(212,168,83,0.03)]" />
                <div className="absolute inset-0 bg-dots opacity-40" />

                {/* Grid lines to simulate a map */}
                <div className="absolute inset-0 opacity-[0.06]">
                  <div className="absolute left-1/4 top-0 bottom-0 w-px bg-white" />
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white" />
                  <div className="absolute left-3/4 top-0 bottom-0 w-px bg-white" />
                  <div className="absolute top-1/4 left-0 right-0 h-px bg-white" />
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-white" />
                  <div className="absolute top-3/4 left-0 right-0 h-px bg-white" />
                </div>

                {/* Road lines */}
                <div className="absolute inset-0 opacity-[0.04]">
                  <div className="absolute top-[45%] left-0 right-0 h-[2px] bg-[#D4A853]" />
                  <div className="absolute top-0 bottom-0 left-[55%] w-[2px] bg-[#D4A853]" />
                  <div className="absolute top-[30%] left-[20%] right-[30%] h-[1px] bg-white rotate-12 origin-left" />
                </div>

                {/* Location pin */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="relative"
                  >
                    <div className="w-16 h-16 rounded-full bg-[rgba(212,168,83,0.15)] flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-[rgba(212,168,83,0.25)] flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-[#D4A853]" />
                      </div>
                    </div>
                    {/* Pulse ring */}
                    <motion.div
                      animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                      className="absolute inset-0 w-16 h-16 rounded-full border-2 border-[rgba(212,168,83,0.3)]"
                    />
                  </motion.div>
                </div>

                {/* Label */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="px-4 py-3 rounded-xl bg-[rgba(10,10,11,0.8)] backdrop-blur-sm border border-[rgba(255,255,255,0.06)]">
                    <p className="text-sm font-semibold text-white font-display">
                      Carter Digitals (Pty) Ltd
                    </p>
                    <p className="text-xs text-[rgba(245,245,245,0.5)] mt-0.5">
                      1457 Block L, Soshanguve, Pretoria
                    </p>
                  </div>
                </div>
              </div>

              {/* Address details */}
              <div className="flex flex-col justify-center gap-6">
                <div className="rounded-2xl bg-[#131316] border border-[rgba(255,255,255,0.06)] p-6">
                  <h3
                    className="text-lg font-semibold text-white mb-4 font-display"
                  >
                    Address Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#D4A853] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-white">Physical Address</p>
                        <p className="text-sm text-[rgba(245,245,245,0.5)]">
                          1457 Block L, Soshanguve
                        </p>
                        <p className="text-sm text-[rgba(245,245,245,0.5)]">
                          Pretoria, Gauteng, South Africa
                        </p>
                      </div>
                    </div>
                    <Separator className="bg-[rgba(255,255,255,0.06)]" />
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-[#D4A853] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-white">Email</p>
                        <p className="text-sm text-[rgba(245,245,245,0.5)]">
                          kabelokadiaka4@gmail.com
                        </p>
                      </div>
                    </div>
                    <Separator className="bg-[rgba(255,255,255,0.06)]" />
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-[#D4A853] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-white">Phone</p>
                        <p className="text-sm text-[rgba(245,245,245,0.5)]">
                          072 402 6893
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Nationwide note */}
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[rgba(212,168,83,0.06)] border border-[rgba(212,168,83,0.12)]">
                  <MapPin className="w-5 h-5 text-[#D4A853] shrink-0" />
                  <p className="text-sm text-[rgba(245,245,245,0.6)]">
                    <span className="text-white font-medium">Nationwide coverage.</span>{" "}
                    We serve clients across South Africa — our process is fully remote-friendly.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.2)] to-transparent" />

      {/* ──────────────────── 4. TRUST SECTION ──────────────────── */}
      <section className="relative py-12 md:py-16 bg-[#0A0A0B] section-gold-tint">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up">
            <div className="flex flex-col items-center text-center">
              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 mb-4">
                {trustBadges.map((badge) => (
                  <div
                    key={badge}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(212,168,83,0.06)] border border-[rgba(212,168,83,0.12)]"
                  >
                    <CheckCircle className="w-4 h-4 text-[#D4A853] shrink-0" />
                    <span className="text-xs md:text-sm font-medium text-[rgba(245,245,245,0.7)] whitespace-nowrap">
                      {badge}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-[rgba(245,245,245,0.4)]">
                Registered, compliant, and ready to serve
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.2)] to-transparent" />

      {/* ─────────────── 5. RESPONSE PROMISE SECTION ─────────────── */}
      <section className="relative py-20 md:py-28 bg-[#0A0A0B] section-gold-tint">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[rgba(212,168,83,0.03)] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[rgba(212,168,83,0.04)] via-[#131316] to-[rgba(212,168,83,0.02)] border border-[rgba(212,168,83,0.12)] p-8 md:p-10 shadow-[0_0_30px_rgba(212,168,83,0.06)]">
              {/* Background accents */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-[rgba(212,168,83,0.04)] rounded-full blur-[60px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[rgba(212,168,83,0.03)] rounded-full blur-[50px] pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[rgba(212,168,83,0.15)] to-[rgba(212,168,83,0.05)] border border-[rgba(212,168,83,0.15)] flex items-center justify-center">
                    <Heart className="w-6 h-6 text-[#D4A853]" />
                  </div>
                  <h2
                    className="text-2xl md:text-3xl font-bold text-white font-display"
                  >
                    Our Response Promise
                  </h2>
                </div>

                <p className="text-base md:text-lg text-[rgba(245,245,245,0.6)] leading-relaxed mb-4">
                  We respond to all enquiries within <span className="text-[#D4A853] font-semibold">2 business hours</span> during 
                  operating days. For urgent requests, reach us directly on WhatsApp.
                </p>

                <Separator className="bg-[rgba(255,255,255,0.06)] my-5" />

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 shrink-0 rounded-lg bg-[rgba(212,168,83,0.1)] flex items-center justify-center mt-0.5">
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
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[rgba(37,211,102,0.1)] border border-[rgba(37,211,102,0.2)] text-[#25D366] font-medium text-sm hover:bg-[rgba(37,211,102,0.15)] transition-colors duration-200"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp Us Now
                  </a>
                  <a
                    href="mailto:kabelokadiaka4@gmail.com"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[rgba(245,245,245,0.7)] font-medium text-sm hover:bg-[rgba(255,255,255,0.06)] transition-colors duration-200"
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
