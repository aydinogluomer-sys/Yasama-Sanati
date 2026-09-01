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
      className="w-full overflow-x-auto no-scrollbar py-2 border-b border-cream/10"
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
              className="relative min-h-11 cursor-pointer rounded px-4 py-2 text-2xs font-light uppercase tracking-wider text-white transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-text focus-visible:ring-offset-2 focus-visible:ring-offset-deep md:text-xs"
            >
              {/* Background capsule animation */}
              {isActive && (
                <motion.div
                  layoutId="activeCategoryBg"
                  className="absolute inset-0 bg-cream rounded"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              {/* Text with dynamic color depending on active state */}
              <span
                className={`relative z-10 font-medium transition-colors duration-300 ${
                  isActive ? "text-deep" : "text-cream/85 hover:text-white"
                }`}
              >
                {category}
                <span
                  className={`ml-1.5 text-4xs ${
                    isActive ? "text-deep/85" : "text-cream/85"
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
