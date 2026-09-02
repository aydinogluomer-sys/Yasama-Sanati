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
import { duration } from "@/utils/motion/tokens";
import useMountedReducedMotion from "@/hooks/useMountedReducedMotion";
import { ink } from "@/utils/palette";

interface BlogPageContentProps {
  posts: BlogPost[];
}

export default function BlogPageContent({ posts }: BlogPageContentProps) {
  /* Hareket azaltma: `MotionConfig reducedMotion="user"` opaklığı kapatmaz,
     bu yüzden burada açıkça ele alınıyor. Aynı gerekçe BlogCard'da da yazılı. */
  const reduce = useMountedReducedMotion();
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
    <div className="max-w-wide space-y-16">
      {/* Featured Post Card - Hide when filtering or searching */}
      <AnimatePresence>
        {showFeaturedCard && featuredPost && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0, overflow: "hidden" }}
            transition={{ duration: duration.buttonStroke }}
            /* ÖNE ÇIKAN YAZI — kutu değil, editoryal açılış.
               Öncesi: `rounded border` bir kart ve arkasında %10 opaklıkta,
               yani fiilen görünmeyen bir kapak görseli. Hem jenerik kart
               dilinin (AWWWARDS-90-BLOCKERS A9) örneğiydi hem de elde bir
               fotoğraf varken onu ziyan ediyordu.
               Şimdi: iki sütunlu bölünme, kapak görseli TAM opaklıkta ve
               kendi alanında. Kart çerçevesi yok; ayrım ince bir kuralla. */
            className="group grid grid-cols-1 gap-x-12 gap-y-8 border-t border-cream/20 pt-10 lg:grid-cols-12"
          >
            <Link
              href={`/blog/${featuredPost.slug}`}
              aria-hidden
              tabIndex={-1}
              className="relative block aspect-[4/3] overflow-hidden lg:col-span-6 lg:aspect-[5/4]"
            >
              <Image
                src={featuredPost.coverImage}
                alt=""
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
              />
            </Link>

            <div className="flex flex-col justify-center gap-5 lg:col-span-6">
              <span className="font-mono text-3xs font-medium tracking-[0.24em] text-copper-text uppercase">
                Öne Çıkan Makale
              </span>
              <h2 className="font-serif text-display-m font-normal leading-[1.02] tracking-[-0.01em] text-white">
                {featuredPost.title}
              </h2>
              <p className="max-w-editorial text-base font-light leading-relaxed text-cream/80">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center gap-4 font-mono text-3xs tracking-[0.12em] text-cream/70 uppercase">
                <span>{featuredPost.date}</span>
                <span aria-hidden>·</span>
                <span>{featuredPost.readTime} Okuma Süresi</span>
              </div>
              <div className="pt-2">
                <Link href={`/blog/${featuredPost.slug}`}>
                  <BorderedButton className="inline-flex cursor-pointer items-center gap-4 px-6 py-4 text-sm text-white [&_path]:[stroke:white] [&_svg]:[stroke:white]">
                    Okumaya Başla
                    <NavigateSVG fill={ink.white} className="size-2.5 mr-2.5" />
                  </BorderedButton>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter and Search controls */}
      <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-6 border-b border-cream/10 pb-4">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          categoryCounts={categoryCounts}
        />
        <BlogSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      </div>

      {/* Grid List */}
      <p role="status" aria-live="polite" className="sr-only">
        {filteredPosts.length} makale gösteriliyor.
      </p>
      <motion.div layout className="grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post) => (
            <motion.div
              layout
              key={post.slug}
              initial={reduce ? false : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: duration.quick }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 space-y-4"
        >
          <svg
            className="mx-auto h-12 w-12 text-cream/85"
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
          <h3 className="font-serif text-24 font-normal text-white">Aramanızla eşleşen makale bulunamadı</h3>
          <p className="text-xs text-cream/85">
            Lütfen farklı kelimelerle arama yapmayı veya filtreyi sıfırlamayı deneyin.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory("TÜMÜ");
              setSearchQuery("");
            }}
            className="min-h-11 rounded px-3 text-xs text-copper-text underline underline-offset-4 hover:text-copper-text/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-text"
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
