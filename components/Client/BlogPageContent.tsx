"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { BlogPost } from "@/utils/blogData";
import BlogCard from "./BlogCard";
import CategoryFilter from "./CategoryFilter";
import BlogSearch from "./BlogSearch";
import NewsletterForm from "./NewsletterForm";
import BorderedButton from "@/components/Server/BorderedButton";
import NavigateSVG from "@/components/SVGComponents/NavigateSVG";
import Image from "next/image";

interface BlogPageContentProps {
  posts: BlogPost[];
}

export default function BlogPageContent({ posts }: BlogPageContentProps) {
  const [activeCategory, setActiveCategory] = useState("TÜMÜ");
  const [searchQuery, setSearchQuery] = useState("");

  // Find the featured post (the first one)
  const featuredPost = useMemo(() => {
    return posts.find((p) => p.slug === "sifa-bir-teknik-degildir-butunsel-saglik") || posts[0];
  }, [posts]);

  // Compute unique categories and counts
  const categories = useMemo(() => {
    const cats = new Set<string>();
    cats.add("TÜMÜ");
    posts.forEach((post) => cats.add(post.category.toUpperCase()));
    return Array.from(cats);
  }, [posts]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { TÜMÜ: posts.length };
    posts.forEach((post) => {
      const cat = post.category.toUpperCase();
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [posts]);

  // Filtered posts (excluding the featured one if no query/filter is active, or searching all)
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Don't show featured post in the general list on the initial page load to avoid duplication
      const isInitialPageLoad = activeCategory === "TÜMÜ" && searchQuery === "";
      if (isInitialPageLoad && post.slug === featuredPost?.slug) {
        return false;
      }

      const matchesCategory =
        activeCategory === "TÜMÜ" || post.category.toUpperCase() === activeCategory;
      
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, searchQuery, featuredPost]);

  const showFeaturedCard = activeCategory === "TÜMÜ" && searchQuery === "";

  return (
    <div className="max-w-5xl mx-auto space-y-16">
      {/* Featured Post Card - Hide when filtering or searching */}
      <AnimatePresence>
        {showFeaturedCard && featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0, overflow: "hidden" }}
            transition={{ duration: 0.5 }}
            className="p-8 md:p-12 bg-[#30493D] rounded border border-[#ced1bf]/15 space-y-6 relative overflow-hidden group"
          >
            {/* Background Image Overlay */}
            <div className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity duration-700 pointer-events-none">
              <Image
                src={featuredPost.coverImage}
                alt=""
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
              />
            </div>

            <div className="relative z-10 space-y-4">
              <span className="text-xs text-[#E8A87C] font-semibold tracking-widest uppercase">
                Öne Çıkan Makale
              </span>
              <h2 className="text-28 md:text-40 font-light text-white leading-tight">
                {featuredPost.title}
              </h2>
              <p className="text-sm md:text-base font-light text-[#ced1bf]/80 leading-relaxed max-w-3xl">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center text-xs text-[#ced1bf]/50 space-x-4">
                <span>{featuredPost.date}</span>
                <span>•</span>
                <span>{featuredPost.readTime} Okuma Süresi</span>
              </div>
              <div className="pt-2">
                <Link href={`/blog/${featuredPost.slug}`}>
                  <BorderedButton className="inline-flex cursor-pointer items-center gap-4 px-6 py-4 text-sm text-white [&_path]:[stroke:white] [&_svg]:[stroke:white]">
                    Okumaya Başla
                    <NavigateSVG fill="#FFFFFF" className="size-2.5 mr-2.5" />
                  </BorderedButton>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter and Search controls */}
      <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-6 border-b border-[#ced1bf]/10 pb-4">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          categoryCounts={categoryCounts}
        />
        <BlogSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      </div>

      {/* Grid List */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post) => (
            <motion.div
              layout
              key={post.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 space-y-4"
        >
          <svg
            className="mx-auto h-12 w-12 text-[#ced1bf]/20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <h3 className="text-lg text-white font-light">Aramanızla eşleşen makale bulunamadı</h3>
          <p className="text-xs text-[#ced1bf]/50">
            Lütfen farklı kelimelerle arama yapmayı veya filtreyi sıfırlamayı deneyin.
          </p>
          <button
            onClick={() => {
              setActiveCategory("TÜMÜ");
              setSearchQuery("");
            }}
            className="text-xs text-[#E09A6C] underline hover:text-[#E09A6C]/80"
          >
            Filtreleri Sıfırla
          </button>
        </motion.div>
      )}

      {/* Newsletter signup form */}
      <NewsletterForm />
    </div>
  );
}
