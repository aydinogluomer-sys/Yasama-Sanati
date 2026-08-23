"use client";
/**
 * Şifa Yolculuğu — masaüstü sticky sürümü.
 *
 * Innovation.tsx'ten AYRI BİR DOSYAYA çıkarıldı. Öncesinde mobil ve masaüstü
 * sürümler aynı client component ağacındaydı ve yalnız CSS ile (md:hidden /
 * hidden md:block) gizleniyorlardı. CSS görünürlüğü değiştirir, BUNDLE'ı değil:
 * ölçüldü ki mobil kullanıcı `page-*.js` içinde masaüstü journey kodunu
 * (ClipImageCard, mask makinesi, CustomCursor) indirip hidrate ediyordu.
 *
 * Bu dosya artık yalnız masaüstünde `next/dynamic` ile yükleniyor.
 */
import React, { useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import ClipImageCard from "./ClipImageCard";
import { JOURNEY_CHAPTERS } from "@/data/journey-chapters";
import useMaskImage from "@/hooks/useMaskImage";
import CustomCursor from "./Cursor";
import { useCursor } from "@/hooks/useCursor";
import NavigateSVG from "@/components/SVGComponents/NavigateSVG";
import { useRouter } from "next/navigation";
import { cubicBezier } from "motion";
import { useIsMobile } from "@/app/providers";

function JourneyDesktop() {
  const isMobile = useIsMobile();
  const router = useRouter();
  const [state, setState] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { handlers, cursorProps } = useCursor();

  const { scrollYProgress: parentProgress } = useScroll({
    target: ref,
    offset: ["15vh 0", "485vh end"],
  });
  // Görseller bölüm verisinden geliyor — ayrı import listesi tutulmuyor.
  // Böylece bölüm eklenip çıkarıldığında tek yer güncelleniyor ve sıra
  // metinle görselin eşleşmesi garanti oluyor.
  const imgs = JOURNEY_CHAPTERS.map((c) => c.image);

  // Kart penceresi de bölüm sayısından türetilir (bkz. ClipImageCard).
  // `state` ve `state + 1` render edildiği için üst sınır N-2'dir.
  useMotionValueEvent(parentProgress, "change", (latest) => {
    const total = imgs.length;
    if (total < 2) return;
    const next = Math.floor(latest * (total - 1));
    setState(Math.min(total - 2, Math.max(0, next)));
  });
  return (
    <div
      className="relative h-[360vh] cursor-pointer overflow-clip bg-[#2b3530] motion-reduce:h-auto motion-reduce:min-h-[100svh]"
      ref={ref}
    >
      {/* Pinned bir bölümü 3,6 ekran boyunca kaydırmak zorunda kalmak bir çıkmazdır.
          Klavye ve fare için görünür bir çıkış: bölümü atlayıp bir sonrakine geç. */}
      <a
        href="#alti-disiplin"
        className="absolute top-4 right-4 z-30 rounded-full border border-[#D1CCBF]/30 bg-[#2b3530]/70 px-4 py-2 text-3xs uppercase tracking-[0.16em] text-[#D1CCBF]/80 opacity-0 backdrop-blur-sm transition-opacity focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] hover:opacity-100 motion-reduce:hidden"
      >
        Bölümü geç
      </a>
      <motion.div
        {...handlers}
        onClick={() => {
          if (!isMobile) {
            router.push("/programlar");
          }
        }}
        className="sticky -top-[5vh] h-[110vh] motion-reduce:relative motion-reduce:top-auto motion-reduce:h-auto motion-reduce:min-h-[100svh] md:-top-[15vh] md:h-[130vh]"
      >
        <ClipImageCard
          scrollYProgress={parentProgress}
          images={imgs}
          className="relative z-10"
        />
        {Array.from({ length: 2 }, (_, i) => state + i)
          .filter((elementIndex) => elementIndex < imgs.length)
          .map((validElementIndex, i) => {
            return (
              <JourneyDesktop.Container
                key={"JourneyDesktop.Container-" + (i + 1)}
                isMobile={isMobile}
                scrollYProgress={parentProgress}
                index={validElementIndex}
              >
                {imgs[validElementIndex]}
              </JourneyDesktop.Container>
            );
          })}
      </motion.div>
      {!isMobile && (
        <CustomCursor
          {...cursorProps}
          className="font-mono text-4xs tracking-[0.16em] uppercase flex -translate-x-1/2 translate-y-1/4 items-center justify-center gap-2 rounded-full px-5 py-2 text-white"
        >
          Daha Fazlasını Keşfet
          <NavigateSVG style={{ fill: "white" }} className="size-2.5" />
        </CustomCursor>
      )}
    </div>
  );
}

JourneyDesktop.Container = function Container({
  scrollYProgress,
  index,
  children,
  isMobile,
}: {
  scrollYProgress: MotionValue<number>;
  index: number;
  children: StaticImageData;
  isMobile: boolean | null;
}) {
  // The plate behind the card wipes to the next discipline exactly when the card itself flips
  // (ClipImageCard changes state at the .125 midpoint of each quarter). Keeping the wipe short and
  // centred on that moment means the background always shows the discipline the card is naming —
  // and the rest of the window is a composed dwell instead of a long half-striped state.
  const localScrollYProgress = useTransform(
    scrollYProgress,
    [index * 0.25 + 0.09, index * 0.25 + 0.16],
    [0, 1],
    {
      ease: cubicBezier(0, 0, 1, 1),
    },
  );
  const maskImage = useMaskImage(localScrollYProgress, isMobile);
  const scaleProgress = useTransform(
    scrollYProgress,
    [(index - 1) * 0.25, (index + 1) * 0.25],
    [1.075, 1],
  );
  return (
    <motion.div
      className="absolute inset-0 grid place-items-center text-white"
      style={{ zIndex: -index, maskImage, scale: scaleProgress }}
    >
      <Image
        src={children}
        alt=""
        aria-hidden="true"
        sizes="100vw"
        className="h-full w-full origin-bottom object-cover"
      />
    </motion.div>
  );
};
export default JourneyDesktop;
