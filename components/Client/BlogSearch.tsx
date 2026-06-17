"use client";

import React from "react";

interface BlogSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function BlogSearch({ searchQuery, onSearchChange }: BlogSearchProps) {
  return (
    <div className="relative w-full max-w-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="size-4 text-[#ced1bf]/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Makale ara..."
        className="w-full pl-9 pr-9 py-2 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/15 text-[#d1ccbf] text-xs placeholder-[#ced1bf]/40 focus:outline-none focus:border-[#ced1bf]/40 focus:bg-[#ced1bf]/8 transition-all duration-300"
      />
      {searchQuery && (
        <button
          onClick={() => onSearchChange("")}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#ced1bf]/50 hover:text-white transition-colors cursor-pointer"
        >
          <svg
            className="size-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
