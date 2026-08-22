"use client";

import React from "react";
import { motion } from "motion/react";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  categoryCounts: Record<string, number>;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onSelectCategory,
  categoryCounts,
}: CategoryFilterProps) {
  return (
    <div
      role="group"
      aria-label="Makale kategorileri"
      className="w-full overflow-x-auto no-scrollbar py-2 border-b border-[#ced1bf]/10"
    >
      <div className="flex space-x-2 md:space-x-4 min-w-max pb-1 px-1">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          const count = categoryCounts[category] || 0;

          return (
            <button
              type="button"
              key={category}
              onClick={() => onSelectCategory(category)}
              aria-pressed={isActive}
              className="relative min-h-11 cursor-pointer rounded px-4 py-2 text-2xs font-light uppercase tracking-wider text-white transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E09A6C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2B3530] md:text-xs"
            >
              {/* Background capsule animation */}
              {isActive && (
                <motion.div
                  layoutId="activeCategoryBg"
                  className="absolute inset-0 bg-[#ced1bf] rounded"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              {/* Text with dynamic color depending on active state */}
              <span
                className={`relative z-10 font-medium transition-colors duration-300 ${
                  isActive ? "text-[#2b3530]" : "text-[#ced1bf]/85 hover:text-white"
                }`}
              >
                {category}
                <span
                  className={`ml-1.5 text-4xs ${
                    isActive ? "text-[#2b3530]/85" : "text-[#ced1bf]/85"
                  }`}
                >
                  ({count})
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
