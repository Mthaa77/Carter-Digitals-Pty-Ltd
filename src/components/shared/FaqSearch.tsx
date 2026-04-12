"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, RotateCcw } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

/* ──────────────────────────── TYPES ──────────────────────────── */
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqSearchProps {
  items: FaqItem[];
  className?: string;
}

/* ──────────────────── TEXT HIGHLIGHT UTILITY ──────────────────── */
function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark
            key={i}
            className="bg-[rgba(212,168,83,0.25)] text-[#E8C97A] rounded-sm px-0.5"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

/* ──────────────────── FAQ SEARCH COMPONENT ────────────────────── */
export default function FaqSearch({ items, className = "" }: FaqSearchProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounce search (300ms)
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query]);

  // Filter items
  const filteredItems = useMemo(() => {
    if (!debouncedQuery.trim()) return items;
    const lower = debouncedQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.question.toLowerCase().includes(lower) ||
        item.answer.toLowerCase().includes(lower)
    );
  }, [debouncedQuery, items]);

  const hasQuery = debouncedQuery.trim().length > 0;

  const handleClear = useCallback(() => {
    setQuery("");
    setDebouncedQuery("");
    inputRef.current?.focus();
  }, []);

  return (
    <div role="search" className={className}>
      {/* Search Input */}
      <motion.div
        animate={{
          boxShadow: isFocused
            ? "0 0 0 1px rgba(212,168,83,0.4), 0 0 20px rgba(212,168,83,0.08)"
            : "0 0 0 1px rgba(255,255,255,0.08), 0 0 0px rgba(212,168,83,0)",
        }}
        transition={{ duration: 0.3 }}
        className="relative mb-4"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(212,168,83,0.5)] pointer-events-none" />

        <input
          ref={inputRef}
          type="text"
          placeholder="Search questions..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label="Search frequently asked questions"
          className="w-full pl-11 pr-10 py-3.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-white placeholder:text-[rgba(245,245,245,0.25)] focus:outline-none transition-colors duration-300 text-sm backdrop-blur-sm"
        />

        {/* Clear button */}
        <AnimatePresence>
          {query.length > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.15)] flex items-center justify-center transition-colors duration-200"
              aria-label="Clear search"
            >
              <X className="w-3 h-3 text-[rgba(245,245,245,0.5)]" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Results counter */}
      <AnimatePresence mode="wait">
        <motion.p
          key={hasQuery ? `count-${filteredItems.length}` : "all"}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.2 }}
          className="text-xs text-[rgba(245,245,245,0.35)] mb-4"
        >
          {hasQuery
            ? `${filteredItems.length} result${filteredItems.length !== 1 ? "s" : ""} found`
            : `${items.length} questions`}
        </motion.p>
      </AnimatePresence>

      {/* FAQ Accordion */}
      <div className="rounded-2xl bg-[#131316] border border-[rgba(212,168,83,0.1)] p-4 md:p-6 shadow-[0_0_40px_rgba(212,168,83,0.05)]">
        <AnimatePresence mode="wait">
          {filteredItems.length > 0 ? (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <Accordion type="multiple" className="w-full">
                {filteredItems.map((item) => (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className="border-[rgba(255,255,255,0.06)] accordion-gold data-[state=open]:border-[rgba(212,168,83,0.2)] data-[state=open]:bg-[rgba(212,168,83,0.02)] transition-colors duration-300"
                  >
                    <AccordionTrigger className="text-left text-sm md:text-base font-medium text-[rgba(245,245,245,0.8)] hover:text-white hover:no-underline py-4 transition-colors duration-200">
                      <HighlightText text={item.question} query={debouncedQuery} />
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-[rgba(245,245,245,0.5)] leading-relaxed">
                      <HighlightText text={item.answer} query={debouncedQuery} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="py-12 text-center"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[rgba(212,168,83,0.08)] border border-[rgba(212,168,83,0.15)] flex items-center justify-center">
                <Search className="w-5 h-5 text-[rgba(212,168,83,0.4)]" />
              </div>
              <p className="text-sm text-[rgba(245,245,245,0.5)] mb-4">
                No questions match your search
              </p>
              <button
                onClick={handleClear}
                className="inline-flex items-center gap-2 text-xs font-medium text-[#D4A853] hover:text-[#E8C97A] transition-colors duration-200"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset search
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
