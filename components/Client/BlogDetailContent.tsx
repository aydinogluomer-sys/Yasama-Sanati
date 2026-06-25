"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "motion/react";
import { BlogPost } from "@/utils/blogData";
import BlogCard from "./BlogCard";
import NewsletterForm from "./NewsletterForm";
import Image from "next/image";

interface BlogDetailContentProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogDetailContent({ post, relatedPosts }: BlogDetailContentProps) {
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Spring smooth progress bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareUrl = typeof window !== "undefined" ? encodeURIComponent(window.location.href) : "";
  const shareText = encodeURIComponent(post.title);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Top Floating Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#ca7d57] origin-left z-[9999]"
        style={{ scaleX }}
      />

      <article className="space-y-10 md:space-y-14">
        {/* Back navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/blog"
            className="group inline-flex items-center text-xs md:text-sm font-medium text-[#ced1bf] hover:text-[#ca7d57] transition-colors duration-300"
          >
            <span className="mr-2 transform group-hover:-translate-x-1 transition-transform duration-300">
              &larr;
            </span>
            Bloga Geri Dön
          </Link>
          
          <span className="bg-[#ca7d57]/10 text-[#ca7d57] px-3 py-1 rounded text-2xs font-semibold uppercase tracking-widest border border-[#ca7d57]/20">
            {post.category}
          </span>
        </div>

        {/* Article Title and Metadata */}
        <div className="space-y-6">
          <h1 className="font-serif text-display-s font-normal tracking-[-0.01em] text-white [line-height:1.15]">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-b border-[#ced1bf]/10 pb-6">
            <div className="flex items-center space-x-3">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={40}
                height={40}
                className="size-10 rounded-full border border-[#ced1bf]/20 object-cover"
              />
              <div>
                <p className="text-xs md:text-sm font-medium text-white">{post.author.name}</p>
                <p className="text-2xs text-[#ced1bf]/60">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-2xs text-[#ced1bf]/60">
              <span>Yayınlanma: {post.date}</span>
              <span>•</span>
              <span>{post.readTime} Okuma</span>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative h-64 md:h-[450px] w-full overflow-hidden rounded bg-[#ced1bf]/5">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(min-width: 768px) 896px, 100vw"
            priority
            className="object-cover"
          />
        </div>

        {/* Content & Sharing Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Social Share Toolbar (Desktop) */}
          <div className="lg:col-span-1 space-y-4 lg:sticky lg:top-32 h-fit">
            <p className="text-2xs font-semibold uppercase tracking-widest text-[#ced1bf]/40 hidden lg:block">
              Paylaş
            </p>
            <div className="flex lg:flex-col gap-3">
              {/* Copy link */}
              <button
                onClick={handleCopyLink}
                className="flex items-center justify-center size-9 bg-[#ced1bf]/5 border border-[#ced1bf]/15 rounded hover:border-[#ca7d57] hover:bg-[#ca7d57]/5 transition-all text-[#ced1bf] hover:text-white cursor-pointer relative"
                title="Linki Kopyala"
              >
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 10.742s-1.077 1.341-1.077 2.99c0 1.647 1.372 2.99 3.064 2.99 1.69 0 3.063-1.343 3.063-2.99M15.316 13.258s1.078-1.342 1.078-2.99c0-1.647-1.372-2.99-3.064-2.99-1.69 0-3.063 1.343-3.063 2.99" />
                </svg>
                {copied && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#30493D] border border-[#ced1bf]/10 text-2xs text-[#ced1bf] px-2 py-0.5 rounded shadow whitespace-nowrap">
                    Kopyalandı!
                  </span>
                )}
              </button>

              {/* Twitter Share */}
              <a
                href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center size-9 bg-[#ced1bf]/5 border border-[#ced1bf]/15 rounded hover:border-[#ca7d57] hover:bg-[#ca7d57]/5 transition-all text-[#ced1bf] hover:text-white"
                title="X'te Paylaş"
              >
                <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* WhatsApp Share */}
              <a
                href={`https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center size-9 bg-[#ced1bf]/5 border border-[#ced1bf]/15 rounded hover:border-[#ca7d57] hover:bg-[#ca7d57]/5 transition-all text-[#ced1bf] hover:text-white"
                title="WhatsApp'ta Paylaş"
              >
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Main Body text */}
          <div className="lg:col-span-3">
            <div 
              className="prose prose-invert prose-headings:font-light prose-headings:text-white prose-p:text-[#ced1bf]/80 prose-p:font-light prose-p:leading-relaxed prose-a:text-[#ca7d57] prose-a:no-underline hover:prose-a:underline font-light text-sm md:text-base leading-relaxed text-[#ced1bf]/80 space-y-6"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-10 border-t border-[#ced1bf]/10 mt-10">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-[#ced1bf]/5 hover:bg-[#ced1bf]/10 text-2xs text-[#ced1bf]/60 hover:text-white rounded border border-[#ced1bf]/10 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles Footer */}
      {relatedPosts.length > 0 && (
        <section className="pt-16 mt-16 border-t border-[#ced1bf]/10 space-y-8">
          <h3 className="text-xl md:text-26 font-light text-white">İlginizi Çekebilecek Diğer Makaleler</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedPosts.map((relatedPost) => (
              <BlogCard key={relatedPost.slug} post={relatedPost} />
            ))}
          </div>
        </section>
      )}

      {/* Embedded Newsletter */}
      <div className="pt-16 mt-16">
        <NewsletterForm />
      </div>
    </div>
  );
}
