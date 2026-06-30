"use client";

import { Fragment, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import useMountedReducedMotion from "@/hooks/useMountedReducedMotion";
import ResponsiveMaskTextVariant from "@/components/Client/ResponsiveMaskTextVariant";
import SustainableRetreatClient from "@/components/Client/SustainableRetreatClient";
import SectionTransition from "@/components/Client/SectionTransition";
import TypographyLabel from "@/components/Server/TypographyLabel";
import SectionSeam from "@/components/Client/SectionSeam";

export default function SustainableRetreat() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useMountedReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Drift the text to the right: x starts on the left (negative offset) and moves right
  const x = useTransform(scrollYProgress, [0, 1], ["-28%", "2%"]);

  return (
    <div className="text-[#D1CCBF]">
      {/* 1. Full-screen Sticky Scroll-locked Section for the "Çalışma Alanları" Marquee */}
      <div ref={containerRef} className="relative h-[220vh] bg-[#222B27]">
        <section
          aria-label="Çalışma alanları"
          className="sticky top-0 flex h-screen w-full flex-col justify-center gap-10 overflow-hidden bg-[#222B27]"
        >
          <div className="flex flex-col gap-3 px-5 md:flex-row md:items-center md:gap-4 md:px-12">
            <div className="flex items-center gap-3 text-[#D1CCBF]">
              <TypographyLabel className="text-[#C9875B]">Çalışma Alanları</TypographyLabel>
              <span aria-hidden className="h-px w-10 shrink-0 bg-[#D1CCBF] opacity-40 md:w-16" />
            </div>
            <h2 className="font-serif text-display-s font-normal tracking-[-0.01em] text-[#F4EFE4]">
              Üç farklı katılım yolu.
            </h2>
          </div>

          <motion.div
            style={{ x: reduce ? "0%" : x }}
            className="flex w-max items-center gap-[0.35em] whitespace-nowrap font-serif text-[clamp(4rem,18vw,15rem)] font-normal leading-[0.82] tracking-[-0.03em] text-[#F4EFE4]"
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <Fragment key={i}>
                <span
                  className="select-none"
                  style={
                    i % 2 === 1
                      ? {
                          color: "transparent",
                          WebkitTextStrokeWidth: "1.5px",
                          WebkitTextStrokeColor: "rgba(244,239,228,0.45)",
                        }
                      : undefined
                  }
                >
                  Çalışma Alanları
                </span>
                <span className="mx-[0.18em] text-[0.3em] text-[#C9875B] align-middle">✦</span>
              </Fragment>
            ))}
          </motion.div>

          <p className="max-w-[40rem] px-5 text-body-lg font-light text-[#D1CCBF]/72 md:px-12">
            Akademide üç formatta çalışıyoruz: Birebir seanslar, küçük grup programları ve sertifikalı
            eğitimler ile ihtiyacınıza en uygun derinleşme yollarını sunuyoruz.
          </p>
        </section>
      </div>

      {/* Seam between the sticky marquee background (#222B27) and the sitemap grid background (#30493D) */}
      <SectionSeam from="#222B27" to="#30493D" className="h-20 md:h-28" />

      {/* 2. Original content below, scrolling normally, wrapped in entrance transition */}
      <div className="bg-[#30493D] pb-36 pt-10 md:pb-60">
        <SectionTransition variant="rise">
          <div className="mt-18 flex flex-col gap-y-14 px-8-25 md:mt-26 md:grid md:grid-cols-3 md:grid-rows-[auto_auto] md:gap-y-24 md:px-16">
            <div className="flex flex-col gap-14 md:col-span-2 md:col-start-2 md:flex-row">
              <ResponsiveMaskTextVariant
                desktop={[
                  <Fragment key="d-0">
                    Akademide üç formatta çalışıyoruz:
                  </Fragment>,
                  <Fragment key="d-1">
                    birebir seanslar, küçük grup
                  </Fragment>,
                  <Fragment key="d-2">
                    programları ve sertifikalı eğitimler.
                  </Fragment>,
                  <Fragment key="d-3">
                    Her programın süresi, ön koşulu ve
                  </Fragment>,
                  <Fragment key="d-4">
                    kazanımı kendi sayfasında açıkça
                  </Fragment>,
                  <Fragment key="d-5">
                    yazar; sürpriz yok.
                  </Fragment>,
                ]}
                mobile={[
                  <Fragment key="m-0">
                    Akademide üç formatta çalışıyoruz:
                  </Fragment>,
                  <Fragment key="m-1">
                    birebir seanslar, küçük grup
                  </Fragment>,
                  <Fragment key="m-2">
                    programları ve sertifikalı eğitimler.
                  </Fragment>,
                  <Fragment key="m-3">
                    Her programın süresi, ön koşulu ve
                  </Fragment>,
                  <Fragment key="m-4">
                    kazanımı kendi sayfasında açıkça
                  </Fragment>,
                  <Fragment key="m-5">yazar; sürpriz yok.</Fragment>,
                ]}
                className="text-base [line-height:1.33] md:text-lg"
              />

              <ResponsiveMaskTextVariant
                desktop={[
                  <Fragment key="d2-0">
                    "Buraya uyku sorunum için
                  </Fragment>,
                  <Fragment key="d2-1">
                    geldim; nefesimle, sınırlarımla
                  </Fragment>,
                  <Fragment key="d2-2">
                    ve kendimle tanışıp çıktım.
                  </Fragment>,
                  <Fragment key="d2-3">
                    İyi ki."
                  </Fragment>,
                  <Fragment key="d2-4">
                    — Z. A., Nefes Koçluğu katılımcısı
                  </Fragment>,
                ]}
                mobile={[
                  <Fragment key="m2-0">
                    "Buraya uyku sorunum için
                  </Fragment>,
                  <Fragment key="m2-1">
                    geldim; nefesimle, sınırlarımla
                  </Fragment>,
                  <Fragment key="m2-2">
                    ve kendimle tanışıp çıktım.
                  </Fragment>,
                  <Fragment key="m2-3">
                    İyi ki."
                  </Fragment>,
                  <Fragment key="m2-4">
                    — Z. A., Nefes Koçluğu katılımcısı
                  </Fragment>,
                ]}
                className="text-base [line-height:1.33] md:text-lg italic"
              />
            </div>
            <SustainableRetreatClient />
          </div>
        </SectionTransition>
      </div>
    </div>
  );
}
