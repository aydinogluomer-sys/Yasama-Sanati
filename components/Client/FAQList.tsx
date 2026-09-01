"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import NavigateSVG from "@/components/SVGComponents/NavigateSVG";
import { easing, duration } from "@/utils/motion/tokens";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQListProps {
  items: FAQItem[];
}

export default function FAQList({ items }: FAQListProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openIndexes, setOpenIndexes] = useState<Record<number, boolean>>({});

  const toggleItem = (index: number) => {
    setOpenIndexes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const visibleItems = isExpanded ? items : items.slice(0, 2);
  const hasMore = items.length > 2;

  return (
    <div className="w-full space-y-4">
      <div className="border-t border-cream/15 divide-y divide-cream/15">
        {visibleItems.map((item, index) => {
          const isOpen = !!openIndexes[index];
          return (
            <div key={index} className="py-5 md:py-7">
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between text-left group cursor-pointer py-1"
                aria-expanded={isOpen}
              >
                <span className="text-base md:text-lg lg:text-xl font-light text-white group-hover:text-[var(--accent-copper-on-dark)] transition-colors duration-300 tracking-wide pr-6">
                  {item.question}
                </span>
                <span className="flex-shrink-0 flex items-center justify-center size-7 border border-cream/20 rounded-full group-hover:border-copper group-hover:bg-copper/10 transition-all duration-300">
                  <span className={`text-base text-cream group-hover:text-[var(--accent-copper-on-dark)] transform transition-transform duration-300 leading-none ${isOpen ? "rotate-45" : ""}`}>
                    +
                  </span>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: duration.quick, ease: easing.accordion }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pb-2 text-base md:text-lg font-normal leading-[1.75] text-[#F5F2EB] whitespace-pre-line max-w-3xl pr-6">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {hasMore && (
        <div className="pt-6 flex justify-center lg:justify-start">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group cursor-pointer inline-flex items-center gap-3 px-6 py-4 bg-transparent border border-cream/20 hover:border-cream/60 rounded text-sm text-cream hover:text-white transition-all duration-300 font-normal tracking-wider"
          >
            {isExpanded ? "Daha Az Soru Göster" : `Diğer Soruları Gör (${items.length - 2})`}
            <span className={`transform transition-transform duration-300 ${isExpanded ? "-rotate-90" : "rotate-90"}`}>
              <NavigateSVG fill="#FFFFFF" className="size-2.5" />
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
