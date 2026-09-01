"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { BlogPost } from "@/utils/blogData";
import Image from "next/image";
import { duration } from "@/utils/motion/tokens";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: duration.buttonStroke, ease: "easeOut" }}
        className="h-full flex flex-col justify-between p-6 bg-cream/5 rounded border border-cream/10 hover:border-cream/35 hover:bg-cream/8 transition-all duration-500 overflow-hidden relative"
      >
        <div className="space-y-4">
          {/* Card Image Container */}
          <div className="relative h-48 md:h-56 w-full overflow-hidden rounded bg-deep/40">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Category Tag Overlay */}
            <span className="absolute top-4 left-4 bg-deep/90 backdrop-blur-md text-copper-text px-3 py-1 rounded-sm text-2xs font-medium border border-copper/20 uppercase tracking-widest">
              {post.category}
            </span>
          </div>

          {/* Text Content */}
          <div className="space-y-3">
            <div className="flex items-center text-2xs text-cream/85 space-x-2">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime} Okuma</span>
            </div>
            
            <h3 className="font-serif text-24 font-normal leading-snug text-white transition-colors duration-300 group-hover:text-copper-text md:text-26">
              {post.title}
            </h3>
            
            <p className="text-xs md:text-sm font-light text-cream/85 leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
          </div>
        </div>

        {/* Footer Area */}
        <div className="pt-4 mt-6 border-t border-cream/10 flex items-center justify-between text-2xs">
          <div className="flex items-center space-x-2">
            {/* Stok portre kaldırıldı: yazar atfı kurumsal (bkz. utils/blogData.ts).
                Yerine nötr bir marka işareti — uydurma kimlik taşımıyor. */}
            <span
              aria-hidden
              className="size-6 shrink-0 rounded-full border border-cream/25 bg-cream/10"
            />
            <span className="text-cream/85 font-light">{post.author.name}</span>
          </div>
          <span className="text-copper-text font-medium flex items-center group-hover:translate-x-1 transition-transform duration-300">
            Devamını Oku 
            <span className="ml-1 opacity-70 group-hover:opacity-100 transition-opacity">&rarr;</span>
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
