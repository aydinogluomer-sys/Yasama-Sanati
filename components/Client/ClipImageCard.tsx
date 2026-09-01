"use client";
import { motion, MotionValue, useMotionValueEvent, useTransform } from "motion/react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { CSSProperties, ReactNode, useState } from "react";
import AnimatedMaskText from "@/components/Client/MaskTextClient";
import SectionTitle from "../Server/SectionTitle";
import { easing, duration } from "@/utils/motion/tokens";
import cn from "@/utils/cn";
import { JOURNEY_CHAPTERS } from "@/data/journey-chapters";
interface ClipImageCardProps {
  scrollYProgress: MotionValue<number>;
  images: StaticImageData[];
  className?: string;
  style?: CSSProperties;
}

interface DataItem {
  title: ReactNode[];
  description: {
    mobile: ReactNode[];
    desktop: ReactNode[];
  };
}

export default function ClipImageCard({
  scrollYProgress,
  images,
  className,
  style,
}: ClipImageCardProps) {
  const [currentState, setCurrentState] = useState(1);
  // Bölüm metinleri artık data/journey-chapters.ts'te — mobil akış (JourneyMobile)
  // ile ORTAK kaynak. Satırlar dizi olarak geliyor çünkü buradaki maskeli açılım
  // satır satır çalışıyor; mobilde aynı satırlar tek paragrafa birleştiriliyor.
  const data: DataItem[] = JOURNEY_CHAPTERS.map((c) => ({
    title: c.title.map((line, i) => <span key={i}>{line}</span>),
    description: {
      mobile: c.lines.map((line, i) => <span key={i}>{line}</span>),
      desktop: c.lines.map((line, i) => <span key={i}>{line}</span>),
    },
  }));

  // Sayaç eşikleri BÖLÜM SAYISINDAN türetilir; elle yazılı değil.
  //
  // Eskiden 0.125 / 0.375 / 0.625 / 0.875 diye sabitlenmişti ve beş bölüme
  // göreydi. Altıncı bölüm eklendiğinde sayaç 05'te takılı kalırdı — bu tür
  // sabitler bölüm sayısı değişince sessizce yanlışa döner.
  //
  // EŞİT BANT: her bölüm ilerlemenin 1/N'ini alır.
  //
  // Önceki formül (i - 0.5) / (N - 1) idi ve ilk ile son bölüme YARIM bant
  // veriyordu. Altı bölüme geçince bu, Reiki'yi (06) ilerlemenin son %10'una
  // sıkıştırıyordu: ölçüldü, 40 adımlık taramada yalnız 5 adım kalıyordu ve
  // gözden kaçabiliyordu. Eşit bantta altı bölüm de aynı süreyi alır ve bölüm
  // yüksekliğini (360vh) artırmak gerekmez — ek kaydırma yorgunluğu yok.
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const total = images.length;
    if (total < 1) return;
    const next = Math.floor(latest * total) + 1;
    setCurrentState(Math.min(total, Math.max(1, next)));
  });
  const prependZero = (num: number) => (num < 10 ? `0${num}` : `${num}`);

  // Exit choreography: at the end of the pinned journey the card shrinks slightly and hands the
  // stage to the seam thread instead of being cut mid-air by the section edge.
  const cardScale = useTransform(scrollYProgress, [0.94, 1], [1, 0.96]);
  const cardY = useTransform(scrollYProgress, [0.94, 1], [0, -18]);
  const cardOpacity = useTransform(scrollYProgress, [0.96, 1], [1, 0.85]);

  return (
    <motion.div
      initial="initial"
      whileInView="inView"
      viewport={{ amount: 0.5, once: true }}
      style={{ ...style }}
      className={cn(
        "relative z-10 flex h-full flex-col items-center justify-between py-[8vh] text-cream backdrop-brightness-[60%] md:flex-row md:px-16 md:py-[15vh]",
        className,
      )}
    >
      <SectionTitle className="">Şifa Yolculuğu</SectionTitle>
      <motion.div
        variants={{
          initial: { y: "50%" },
          inView: { y: "0%" },
        }}
        transition={{
          ease: easing.editorial,
          duration: duration.section,
        }}
        style={{ scale: cardScale, y: cardY, opacity: cardOpacity }}
        className="relative z-20 my-[5vh] flex w-[90%] flex-col gap-5 bg-cream p-6 text-deep md:my-0 md:w-full md:max-w-118 md:gap-6 md:p-8"
      >
        {/* Editorial chapter marker — mono index, hairline, running count */}
        <div className="flex select-none items-center gap-3">
          <AnimatedMaskText
            state={currentState}
            delay={0}
            lines={[<>{prependZero(currentState)}</>]}
            className="font-mono text-[0.95rem] tracking-[0.06em] tabular-nums text-[var(--accent-copper-on-light)] [line-height:1]"
          />
          <span aria-hidden className="h-px w-10 bg-current opacity-30" />
          <span className="font-mono text-[0.7rem] tracking-[0.14em] text-deep/85 tabular-nums">
            {prependZero(images.length)}
          </span>
        </div>

        <AnimatedMaskText
          state={currentState}
          delay={0.06}
          lines={data[currentState - 1].title}
          className="font-serif text-[1.55rem] font-normal tracking-[-0.01em] [line-height:1.08] md:text-[2.1rem]"
        />

        {/* Always-composed image window: state-keyed crossfade + settle (no in-card stripe wipe) */}
        <div className="relative aspect-[1.62] w-full overflow-hidden md:aspect-[1.7]">
          {images.map((eachImage: StaticImageData, index: number) => (
            <motion.div
              key={"card-image-" + (index + 1)}
              className="absolute inset-0"
              initial={false}
              animate={{
                opacity: currentState - 1 === index ? 1 : 0,
                scale: currentState - 1 === index ? 1 : 1.045,
              }}
              transition={{ duration: duration.buttonStroke, ease: easing.editorial }}
            >
              <Image
                src={eachImage}
                alt=""
                aria-hidden="true"
                sizes="(min-width: 768px) 472px, 90vw"
                className="size-full object-cover"
              />
            </motion.div>
          ))}
        </div>

        <AnimatedMaskText
          state={currentState}
          delay={0.12}
          lines={data[currentState - 1].description["desktop"]}
          className="text-sm [line-height:1.45] text-deep/85 md:text-[0.95rem]"
        />

        <Link
          href="/programlar"
          className="group mt-1 inline-flex w-fit items-center gap-2 text-3xs font-medium uppercase tracking-[0.18em] text-[var(--accent-copper-on-light)] transition-colors hover:text-[#8a4c28] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A85F33]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cream motion-reduce:transition-none"
        >
          Programı İncele
          <span
            aria-hidden
            className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
          >
            →
          </span>
        </Link>
      </motion.div>
      <span className="text-base [line-height:1] motion-reduce:hidden md:text-xl">
        ( Kaydırmaya Devam Edin ){" "}
      </span>
    </motion.div>
  );
}
