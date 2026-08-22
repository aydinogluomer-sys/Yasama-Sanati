"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

import SectionTitle from "@/components/Server/SectionTitle";
import { JOURNEY_CHAPTERS } from "@/data/journey-chapters";
import { easing } from "@/utils/motion/tokens";

/**
 * Şifa Yolculuğu — mobil akış.
 *
 * Masaüstündeki 3,6 ekranlık sticky dizi mobilde küçültülerek kullanılıyordu.
 * Bu, mobil için tasarlanmış bir deneyim değil, masaüstünün daraltılmışıydı:
 * parmakla 3,6 ekran kaydırmak, scroll ele geçirilmişken yön kaybı, ve her
 * bölümün kendi programına gitmek için ayrı bir yol olmaması.
 *
 * Burada bölümler belge akışında duruyor:
 *  • kaydırma yüksekliği bölüm başına bir ekran, toplam ~5 ekran yerine doğal akış
 *  • her bölüm kendi programına giden gerçek bir bağlantı (keşif kısalıyor)
 *  • scroll-snap ile bölümler parmağın altında oturuyor, ama scroll ele geçmiyor
 *  • hareket yalnız görünürlüğe giriş; scroll'a bağlı sürekli hesap yok
 *
 * reduced-motion: snap ve giriş hareketi kapanır, sıradan bir liste kalır.
 */
export default function JourneyMobile() {
  return (
    <section
      id="sifa-yolculugu-mobil"
      aria-label="Şifa Yolculuğu"
      // Metin rengi bölümde veriliyor: SectionTitle kendi rengini taşımıyor ve
      // renksiz bırakıldığında koyu zeminde siyah kalıyordu (ölçüldü: 1.65:1).
      // Masaüstü sürümde bu rengi ClipImageCard'ın sarmalayıcısı veriyor.
      className="bg-[#2b3530] px-5 py-16 text-[#D1CCBF]"
    >
      <SectionTitle className="mb-8">Şifa Yolculuğu</SectionTitle>

      <ol
        className="flex snap-y snap-mandatory flex-col gap-12 motion-reduce:snap-none"
        aria-label="Şifa Yolculuğu bölümleri"
      >
        {JOURNEY_CHAPTERS.map((chapter, i) => (
          <motion.li
            key={chapter.href}
            className="snap-start motion-reduce:snap-align-none"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: easing.editorial }}
          >
            <Link
              href={chapter.href}
              className="group block rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2b3530]"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[0.95rem] tabular-nums text-[var(--accent-copper-on-dark)] [line-height:1]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span aria-hidden className="h-px w-8 bg-[#D1CCBF]/30" />
                <span className="font-mono text-[0.7rem] tabular-nums tracking-[0.14em] text-[#D1CCBF]/70">
                  {String(JOURNEY_CHAPTERS.length).padStart(2, "0")}
                </span>
              </div>

              <div className="relative mt-4 aspect-[1.62] w-full overflow-hidden">
                <Image
                  src={chapter.image}
                  alt={chapter.alt}
                  sizes="(min-width: 768px) 50vw, 90vw"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </div>

              <h3 className="mt-5 font-serif text-[1.55rem] leading-[1.08] font-normal tracking-[-0.01em] text-[#f3efe6]">
                {chapter.title.join(" ")}
              </h3>

              <p className="mt-3 text-body-sm leading-relaxed text-[#D1CCBF]/85">
                {chapter.lines.join(" ")}
              </p>

              <span className="mt-4 inline-flex items-center gap-2 font-mono text-3xs tracking-[0.16em] text-[var(--accent-copper-on-dark)] uppercase">
                Programı incele
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  className="size-3 fill-none stroke-current stroke-[1.5]"
                >
                  <path d="M5 15 15 5M8 5h7v7" />
                </svg>
              </span>
            </Link>
          </motion.li>
        ))}
      </ol>

      <Link
        href="/programlar"
        className="mt-12 inline-flex w-full items-center justify-center rounded-full border border-[#D1CCBF]/30 px-6 py-3 font-mono text-3xs tracking-[0.16em] text-[#D1CCBF] uppercase transition-colors hover:bg-[#D1CCBF]/10 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:outline-none"
      >
        Tüm programları gör
      </Link>
    </section>
  );
}
