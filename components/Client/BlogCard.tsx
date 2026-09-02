"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { BlogPost } from "@/utils/blogData";
import Image from "next/image";
import { duration } from "@/utils/motion/tokens";
import useMountedReducedMotion from "@/hooks/useMountedReducedMotion";

interface BlogCardProps {
  post: BlogPost;
}

/**
 * Blog kartı — kutu değil, editoryal giriş.
 *
 * ÖNCESİ (docs/AWWWARDS-90-BLOCKERS.md A9 + plan 12):
 * `p-6 bg-cream/5 rounded border border-cream/10` — sitede 23 kez tekrarlanan
 * jenerik kart kalıbının en görünür örneğiydi. İçinde ayrıca fotoğrafın ÜSTÜNE
 * mutlak konumlanmış bir kategori rozeti vardı (`bg-deep/90 backdrop-blur`);
 * fotoğraf üzerindeki metin hem sanat yönetimi hem kontrast açısından en kırılgan
 * çözümdür ve otomatik tarayıcı bunu güvenilir ölçemez.
 *
 * ŞİMDİ: çerçeve yok. Fotoğraf kendi alanında tam opaklıkta duruyor; onun altında
 * mono kicker (kategori), serif başlık, özet ve ince bir kural. Öne çıkan kartla
 * (BlogPageContent) aynı dil, yalnız ölçek küçük. Kategori artık fotoğrafın
 * üstünde değil, metin sütununda.
 */
export default function BlogCard({ post }: BlogCardProps) {
  /* Hareket azaltma AÇIKÇA ele alınıyor.
     `MotionConfig reducedMotion="user"` dönüşüm ve layout animasyonlarını kapatır
     ama OPAKLIĞI kapatmaz — yani reduced-motion tercihi olan kullanıcı yine de
     kartların belirmesini bekliyordu. Ayrıca kart görünüş alanına geç girdiğinde
     `opacity: 0` durumu ölçülebilir bir duruma dönüşüyor ve otomatik kontrast
     taraması yarı saydam metni ihlal olarak okuyabiliyor.
     `initial={false}` ile bu tercih son duruma oturuyor. */
  const reduce = useMountedReducedMotion();
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <motion.article
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: duration.buttonStroke, ease: "easeOut" }}
        className="flex h-full flex-col border-t border-cream/20 pt-6 transition-colors duration-500 group-hover:border-copper/60"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-deep/40">
          <Image
            src={post.coverImage}
            alt=""
            fill
            sizes="(min-width: 768px) 46vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
          />
        </div>

        <div className="mt-6 flex flex-1 flex-col gap-3">
          <span className="font-mono text-3xs font-medium tracking-[0.24em] text-copper-text uppercase">
            {post.category}
          </span>

          <h3 className="font-serif text-24 leading-snug font-normal text-white transition-colors duration-300 group-hover:text-copper-text md:text-26">
            {post.title}
          </h3>

          <p className="line-clamp-3 text-xs leading-relaxed font-light text-cream/85 md:text-sm">
            {post.excerpt}
          </p>

          <div className="mt-auto flex items-center gap-3 pt-5 font-mono text-3xs tracking-[0.12em] text-cream/70 uppercase">
            <span>{post.date}</span>
            <span aria-hidden>·</span>
            <span>{post.readTime} Okuma</span>
            <span
              aria-hidden
              className="ml-auto text-copper-text transition-transform duration-300 group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
