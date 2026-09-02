"use client";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import useMountedReducedMotion from "@/hooks/useMountedReducedMotion";
import { useRef } from "react";
import useMaskImage from "@/hooks/useMaskImage";
import heroDesktop from "@/public/Hero/hero-desktop.jpg";

export default function HeroDesktopClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "50vh start"],
  });
  const maskImage = useMaskImage(scrollYProgress, false, {
    divisions: 24,
    inset: 0.15,
    gap: 0.3,
    vh: 100,
  });
  const reduceMotion = useMountedReducedMotion();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  return (
    <div className="absolute inset-0 overflow-clip" ref={containerRef}>
      <motion.div
        style={{ y: reduceMotion ? "0%" : y, maskImage: reduceMotion ? "none" : maskImage }}
        className="h-full"
      >
        {/* Hareket burada yazıldı, çekilmedi: gelişte kare boyunca tek ve yavaş
            bir yerleşme. Tek seferlik, döngü değil — bu bir giriş jesti; sonsuz
            bir sürüklenme ziyaret boyunca compositor katmanını canlı tutardı.

            MOTION'DAN CSS'E ALINDI: 28 saniyelik bir Motion animasyonu, sayfa
            yüklenirken o süre boyunca ana iş parçacığında iş üretiyordu.
            Ölçüm ve gerekçe app/globals.css `heroSettle` yorumunda. Dıştaki
            kaydırmaya bağlı maske Motion'da kaldı — o gerçekten scroll'a bağlı.
            Hareket azaltma artık medya sorgusuyla. */}
        <div className="hero-settle-desktop h-full">
          {/* Kalite 75 -> 60. ÖLÇÜLEREK seçildi, göz kararı değil: hero üç scrim
          katmanının altında ve tonal aralık zaten eziliyor. Sayfa üzerinde
          karşılaştırma (390x844, DPR 2, animasyonlar kapalı, pixelmatch):
          q=68 -> 0 farklı piksel · q=60 -> 0 · q=52 -> 22 (%0.002)
          Dosya 96 KB -> 49 KB; LCP ögesi bu görsel olduğu için doğrudan
          LCP'ye yazıyor. */}
          <Image
            src={heroDesktop}
            alt=""
            aria-hidden
            priority
            quality={60}
            sizes="100vw"
            placeholder="blur"
            className="size-full object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
}
