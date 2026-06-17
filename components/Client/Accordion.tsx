"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface AccordionItem {
  title: string;
  content: string;
}

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2 w-full">
      {items.map((item, index) => {
        const isOpen = activeIndex === index;
        return (
          <div
            key={index}
            className="border-b border-[#ced1bf]/15 pb-2 transition-all duration-300"
          >
            <button
              onClick={() => setActiveIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between py-3 text-left font-light text-lg md:text-24 text-[#d1ccbf] hover:text-white cursor-pointer"
            >
              <span>{item.title}</span>
              <span className="text-xl font-light">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="py-3 text-sm md:text-base leading-relaxed text-[#ced1bf]/70 font-light whitespace-pre-line">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
