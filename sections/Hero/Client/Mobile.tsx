"use client";
import { motion } from "motion/react";
import Image from "next/image";
import useMountedReducedMotion from "@/hooks/useMountedReducedMotion";
import heroMobile from "@/public/Hero/hero-mobile.jpg";

export default function HeroMobileClient() {
  const reduceMotion = useMountedReducedMotion();
  return (
    <div className="absolute inset-0 overflow-clip">
      {/* Same authored settle as desktop, a touch wider so it reads on a small frame. */}
      <motion.div
        className="size-full"
        animate={reduceMotion ? { scale: 1 } : { scale: [1.08, 1] }}
        transition={reduceMotion ? { duration: 0 } : { duration: 28, ease: "easeOut" }}
      >
        {/* Kalite 75 -> 60. ÖLÇÜLEREK seçildi, göz kararı değil: hero üç scrim
        katmanının altında ve tonal aralık zaten eziliyor. Sayfa üzerinde
        karşılaştırma (390x844, DPR 2, animasyonlar kapalı, pixelmatch):
        q=68 -> 0 farklı piksel · q=60 -> 0 · q=52 -> 22 (%0.002)
        Dosya 96 KB -> 49 KB; LCP ögesi bu görsel olduğu için doğrudan
        LCP'ye yazıyor. */}
        <Image
          src={heroMobile}
          alt=""
          aria-hidden
          priority
          quality={60}
          sizes="100vw"
          placeholder="blur"
          className="size-full object-cover"
        />
      </motion.div>
    </div>
  );
}
