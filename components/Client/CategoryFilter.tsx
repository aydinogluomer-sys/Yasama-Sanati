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
    <div className="w-full overflow-x-auto no-scrollbar py-2 border-b border-[#ced1bf]/10">
      <div className="flex space-x-2 md:space-x-4 min-w-max pb-1 px-1">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          const count = categoryCounts[category] || 0;

          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className="relative px-4 py-2 rounded text-2xs md:text-xs font-light uppercase tracking-wider transition-colors duration-300 focus:outline-none cursor-pointer text-white"
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
                  isActive ? "text-[#2b3530]" : "text-[#ced1bf]/70 hover:text-white"
                }`}
              >
                {category}
                <span
                  className={`ml-1.5 text-[10px] ${
                    isActive ? "text-[#2b3530]/60" : "text-[#ced1bf]/40"
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
