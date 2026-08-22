"use client";
import { useRef, useState, useEffect, ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform, MotionValue } from "motion/react";
import cn from "@/utils/cn";

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  shouldReduceMotion: boolean;
}

function Word({ children, progress, range, shouldReduceMotion }: WordProps) {
  // Opaklık tabanı bir zevk kararı değil, ölçüm sonucu.
  //
  // Eski taban 0.45'ti ve gerekçesi "3:1 büyük metin tabanını geçiyor" idi. İki
  // yönden yanlıştı: (1) bu paragraf mobilde 18px NORMAL ağırlıkta render ediliyor,
  // yani büyük metin değil — gereken 4.5:1; (2) 0.45 ölçüldüğünde #2B3530 üzerinde
  // 2.86:1 veriyor, 3:1 büyük-metin eşiğini bile geçmiyor.
  //
  // #D1CCBF'nin #2B3530 üzerinde ölçülen değerleri:
  //   α 0.45 -> 2.86:1   (AA'nın altında, büyük metin için bile)
  //   α 0.55 -> 3.53:1   (yalnız büyük metin için yeterdi)
  //   α 0.70 -> 4.74:1   (18px normal metin için AA)
  //
  // Açılım etkisi 0.70 -> 1.0 aralığında daha ince kalıyor; okunabilirlik tabanı
  // etkiye feda edilmiyor. Paragrafta duraklayan bir okur bu tabanda oturuyor.
  const opacity = useTransform(progress, range, [0.7, 1]);
  return (
    <motion.span style={{ opacity: shouldReduceMotion ? 1 : opacity }} className="inline-block">
      {children}
    </motion.span>
  );
}

export default function ScrollRevealText({ text, className }: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  // Hydration-safe reduced-motion gate (D5): SSR and first client render both take the
  // default (scroll-linked) path; the reduced-motion opacity override is applied only after
  // mount, so server and client markup match. Reduced-motion users still settle to opacity 1.
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const shouldReduceMotion = mounted && prefersReducedMotion === true;

  // As the container scrolls from 90% of the viewport (near bottom)
  // to 35% of the viewport, we reveal the words from left to right.
  // Widened from the original 85%->60% (25% of viewport) to 90%->35% (55% of
  // viewport) so the reveal reads at a comfortable pace instead of flashing by.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "start 35%"],
  });

  const words = text.split(/\s+/).filter(Boolean);
  const total = words.length;

  return (
    <p ref={containerRef} className={cn("flex flex-wrap gap-x-[0.22em] gap-y-0", className)}>
      {words.map((word, i) => {
        const start = i / total;
        const end = Math.min(1, (i + 1.2) / total); // Slightly overlapping transitions for smoothness
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]} shouldReduceMotion={shouldReduceMotion}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}
