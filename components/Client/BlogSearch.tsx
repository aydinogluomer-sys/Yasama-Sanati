"use client";

import React from "react";

interface BlogSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function BlogSearch({ searchQuery, onSearchChange }: BlogSearchProps) {
  return (
    <div className="relative w-full max-w-sm">
      <label htmlFor="blog-search" className="sr-only">
        Makalelerde ara
      </label>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          aria-hidden="true"
          className="size-4 text-cream/85"
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
        id="blog-search"
        name="blog-search"
        type="search"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Makale ara..."
        className="min-h-11 w-full rounded border border-cream/15 bg-cream/5 py-2 pr-11 pl-9 text-xs text-cream transition-colors duration-300 placeholder:text-cream/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-text focus-visible:ring-offset-2 focus-visible:ring-offset-deep [&::-webkit-search-cancel-button]:hidden"
      />
      {searchQuery && (
        <button
          type="button"
          aria-label="Aramayı temizle"
          onClick={() => onSearchChange("")}
          className="absolute inset-y-0 right-0 flex min-h-11 min-w-11 cursor-pointer items-center justify-center text-cream/85 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-copper-text"
        >
          <svg
            aria-hidden="true"
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
