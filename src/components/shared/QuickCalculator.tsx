"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/lib/navigation";

const projectTypes = [
  { id: "website", label: "Website", basePrice: 3999 },
  { id: "webapp", label: "Web Application", basePrice: 7999 },
  { id: "ecommerce", label: "E-Commerce Platform", basePrice: 9999 },
  { id: "ai-solution", label: "AI-Powered Solution", basePrice: 14999 },
];

const featureOptions = [
  { id: "cms", label: "CMS / Content Management", price: 1500 },
  { id: "analytics", label: "Advanced Analytics", price: 800 },
  { id: "chatbot", label: "AI Chatbot", price: 3500 },
  { id: "branding", label: "Brand Identity Pack", price: 2500 },
  { id: "seo", label: "Premium SEO Package", price: 2000 },
  { id: "integration", label: "Third-Party Integration", price: 1800 },
  { id: "hosting", label: "1-Year Hosting + Domain", price: 1200 },
  { id: "training", label: "Team Training", price: 1500 },
];

export function QuickCalculator() {
  const { navigate } = useNavigation();
  const [selectedType, setSelectedType] = useState("website");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  const base = projectTypes.find((t) => t.id === selectedType)?.basePrice ?? 0;
  const featuresCost = selectedFeatures.reduce(
    (sum, id) => sum + (featureOptions.find((f) => f.id === id)?.price ?? 0),
    0
  );
  const total = base + featuresCost;

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const formatPrice = (price: number) =>
    `R${price.toLocaleString("en-ZA")}`;

  return (
    <div className="relative rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#111114] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[rgba(212,168,83,0.4)] to-transparent" />

      <div className="p-6 md:p-8 lg:p-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[rgba(212,168,83,0.1)] border border-[rgba(212,168,83,0.15)] flex items-center justify-center">
            <Calculator className="w-5 h-5 text-[#D4A853]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Quick Cost Estimator
            </h3>
            <p className="text-xs text-[rgba(245,245,245,0.4)]">Get an instant ballpark figure for your project</p>
          </div>
        </div>

        {/* Project Type Selection */}
        <div className="mb-6">
          <label className="text-xs font-semibold text-[rgba(245,245,245,0.5)] tracking-[0.1em] uppercase mb-3 block">
            Project Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {projectTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 text-left ${
                  selectedType === type.id
                    ? "bg-[rgba(212,168,83,0.1)] border border-[rgba(212,168,83,0.25)] text-[#D4A853]"
                    : "bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-[rgba(245,245,245,0.5)] hover:border-[rgba(255,255,255,0.12)] hover:text-[rgba(245,245,245,0.7)]"
                }`}
              >
                {type.label}
                <div className={`text-xs mt-1 ${selectedType === type.id ? "text-[rgba(212,168,83,0.7)]" : "text-[rgba(245,245,245,0.3)]"}`}>
                  From {formatPrice(type.basePrice)}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Feature Toggles */}
        <div className="mb-8">
          <label className="text-xs font-semibold text-[rgba(245,245,245,0.5)] tracking-[0.1em] uppercase mb-3 block">
            Add-Ons <span className="text-[rgba(245,245,245,0.3)] normal-case tracking-normal">(optional)</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {featureOptions.map((feature) => (
              <button
                key={feature.id}
                onClick={() => toggleFeature(feature.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-300 text-left ${
                  selectedFeatures.includes(feature.id)
                    ? "bg-[rgba(212,168,83,0.06)] border border-[rgba(212,168,83,0.15)]"
                    : "bg-transparent border border-transparent hover:bg-[rgba(255,255,255,0.02)]"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all duration-300 ${
                    selectedFeatures.includes(feature.id)
                      ? "bg-[#D4A853] border-[#D4A853]"
                      : "border-[rgba(255,255,255,0.15)]"
                  }`}
                >
                  {selectedFeatures.includes(feature.id) && (
                    <CheckCircle className="w-3 h-3 text-[#0A0A0B]" />
                  )}
                </div>
                <span className={`flex-1 ${selectedFeatures.includes(feature.id) ? "text-white" : "text-[rgba(245,245,245,0.5)]"}`}>
                  {feature.label}
                </span>
                <span className="text-xs text-[rgba(245,245,245,0.3)] shrink-0">
                  +{formatPrice(feature.price)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Total */}
        <motion.div
          className="relative rounded-xl bg-gradient-to-br from-[rgba(212,168,83,0.08)] to-[rgba(212,168,83,0.02)] border border-[rgba(212,168,83,0.15)] p-5"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-[rgba(245,245,245,0.5)]">Estimated Investment</span>
            <span className="text-xs text-[rgba(245,245,245,0.3)]">Indicative only</span>
          </div>
          <motion.div
            className="text-3xl md:text-4xl font-extrabold text-gradient-gold counter-glow"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            key={total}
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.02 : 1 }}
          >
            {formatPrice(total)}
          </motion.div>
          <p className="text-xs text-[rgba(245,245,245,0.35)] mt-2">
            Base {formatPrice(base)}
            {selectedFeatures.length > 0 &&
              ` + ${selectedFeatures.length} add-on${selectedFeatures.length > 1 ? "s" : ""}`}
          </p>
          <Button
            onClick={() => { navigate("contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="w-full mt-5 bg-gradient-to-r from-[#D4A853] to-[#B8922F] hover:from-[#E8C97A] hover:to-[#D4A853] text-[#0A0A0B] font-semibold py-3 rounded-xl transition-all duration-300 group"
          >
            Get Accurate Quote <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
