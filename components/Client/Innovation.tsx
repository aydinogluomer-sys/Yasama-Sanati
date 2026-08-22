"use client";
import React, { useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import Image1 from "@/public/ImageContainer/image-1.jpg";
import Image2 from "@/public/ImageContainer/image-2.jpg";
import Image3 from "@/public/ImageContainer/image-3.jpg";
import Image4 from "@/public/ImageContainer/image-4.jpg";
import Image5 from "@/public/ImageContainer/image-5.jpg";
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import ClipImageCard from "./ClipImageCard";
import useMaskImage from "@/hooks/useMaskImage";
import CustomCursor from "./Cursor";
import { useCursor } from "@/hooks/useCursor";
import NavigateSVG from "@/components/SVGComponents/NavigateSVG";
import { useRouter } from "next/navigation";
import { cubicBezier } from "motion";
import { useIsMobile } from "@/app/providers";
import JourneyMobile from "@/components/Client/JourneyMobile";

function Innovation() {
  const isMobile = useIsMobile();
  const router = useRouter();
  const [state, setState] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { handlers, cursorProps } = useCursor();

  const { scrollYProgress: parentProgress } = useScroll({
    target: ref,
    offset: ["15vh 0", "485vh end"],
  });
  useMotionValueEvent(parentProgress, "change", (latest) => {
    if (latest <= 0.25) {
      setState(0);
    } else if (latest <= 0.5) {
      setState(1);
    } else if (latest <= 0.75) {
      setState(2);
    } else if (latest <= 1) {
      setState(3);
    }
  });
  const imgs = [Image1, Image2, Image3, Image4, Image5];

  // Mobilde masaüstünün daraltılmışı yerine kendi akışı. `isMobile` null iken
  // (henüz ölçülmedi) sticky sürüm mount EDİLMEZ: aksi halde mobil cihazda önce
  // 3,6 ekranlık kapsayıcı kurulur, sonra sökülür — hem yerleşim sıçraması hem
  // boşuna scroll hesabı. null durumunda mobil akış gösteriliyor; daha hafif
  // olan ve her iki cihazda da doğru okunan sürüm bu.
  if (isMobile !== false) {
    return <JourneyMobile />;
  }

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
              <Innovation.Container
                key={"Innovation.Container-" + (i + 1)}
                isMobile={isMobile}
                scrollYProgress={parentProgress}
                index={validElementIndex}
              >
                {imgs[validElementIndex]}
              </Innovation.Container>
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

Innovation.Container = function Container({
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
export default Innovation;
