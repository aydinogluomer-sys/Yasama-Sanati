"use client";
import { useState } from "react";

interface SelectClientProps {
  options: string[];
  defaultSelection: string;
  name?: string;
}

export default function SelectClient({
  defaultSelection,
  options,
  name,
}: SelectClientProps) {
  const [selectedOption, setSelectedOption] =
    useState<string>(defaultSelection);
  return (
    <div className="flex min-h-12 cursor-pointer items-center border-b border-[var(--field-border)] bg-[var(--field-surface)] px-4 md:px-6">
      <select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        name={name}
        className="min-h-12 w-full cursor-pointer bg-[var(--field-surface)] text-base text-[#2b3530] outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
      >
        {options.map((option, i) => (
          <option key={option + i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
