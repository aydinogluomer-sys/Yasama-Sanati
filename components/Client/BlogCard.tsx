"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { BlogPost } from "@/utils/blogData";

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
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="h-full flex flex-col justify-between p-6 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 hover:border-[#ced1bf]/35 hover:bg-[#ced1bf]/8 transition-all duration-500 overflow-hidden relative"
      >
        <div className="space-y-4">
          {/* Card Image Container */}
          <div className="relative h-48 md:h-56 w-full overflow-hidden rounded bg-[#2b3530]/40">
            <img
              src={post.coverImage}
              alt={post.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
            {/* Category Tag Overlay */}
            <span className="absolute top-4 left-4 bg-[#2b3530]/90 backdrop-blur-md text-[#ca7d57] px-3 py-1 rounded-sm text-2xs font-medium border border-[#ca7d57]/20 uppercase tracking-widest">
              {post.category}
            </span>
          </div>

          {/* Text Content */}
          <div className="space-y-3">
            <div className="flex items-center text-2xs text-[#ced1bf]/60 space-x-2">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime} Okuma</span>
            </div>
            
            <h3 className="text-xl md:text-24 font-light text-white leading-snug group-hover:text-[#ced1bf] transition-colors duration-300">
              {post.title}
            </h3>
            
            <p className="text-xs md:text-sm font-light text-[#ced1bf]/70 leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
          </div>
        </div>

        {/* Footer Area */}
        <div className="pt-4 mt-6 border-t border-[#ced1bf]/10 flex items-center justify-between text-2xs">
          <div className="flex items-center space-x-2">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="size-6 rounded-full object-cover border border-[#ced1bf]/20"
            />
            <span className="text-[#ced1bf]/60 font-light">{post.author.name}</span>
          </div>
          <span className="text-[#ca7d57] font-medium flex items-center group-hover:translate-x-1 transition-transform duration-300">
            Devamını Oku 
            <span className="ml-1 opacity-70 group-hover:opacity-100 transition-opacity">&rarr;</span>
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
