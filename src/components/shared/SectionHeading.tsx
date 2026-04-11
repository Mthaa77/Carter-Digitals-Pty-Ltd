"use client";

import { AnimatedSection } from "./AnimatedSection";

interface SectionHeadingProps {
  label?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function SectionHeading({
  label,
  title,
  titleHighlight,
  description,
  align = "center",
  className = "",
  size = "lg",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  const sizeClasses = {
    sm: {
      heading: "text-2xl md:text-3xl lg:text-4xl",
    },
    md: {
      heading: "text-3xl md:text-4xl lg:text-[2.75rem]",
    },
    lg: {
      heading: "text-3xl md:text-[2.75rem] lg:text-[3.25rem]",
    },
    xl: {
      heading: "text-4xl md:text-5xl lg:text-[3.5rem]",
    },
  };

  const headingClass = sizeClasses[size].heading;

  return (
    <div className={`max-w-3xl mb-12 md:mb-16 ${alignClass} ${className}`}>
      {label && (
        <AnimatedSection delay={0} direction="up">
          <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase bg-[rgba(212,168,83,0.08)] text-[#D4A853] border border-[rgba(212,168,83,0.15)] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A853] animate-pulse" />
            {label}
          </span>
        </AnimatedSection>
      )}
      <AnimatedSection delay={0.1} direction="up">
        <h2
          className={`${headingClass} font-extrabold tracking-[-0.02em] leading-[1.1]`}
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {titleHighlight ? (
            <>
              {title}{" "}
              <span className="text-gradient-gold font-serif-accent">{titleHighlight}</span>
            </>
          ) : (
            title
          )}
        </h2>
      </AnimatedSection>
      {description && (
        <AnimatedSection delay={0.2} direction="up">
          <div className="relative">
            <div className="mx-auto w-[60px] h-[3px] bg-gradient-to-r from-[#D4A853] to-[#E8C97A] rounded-full mb-6" />
            <p className="text-base md:text-lg text-[rgba(245,245,245,0.55)] leading-[1.8] font-light">
              {description}
            </p>
          </div>
        </AnimatedSection>
      )}
    </div>
  );
}
