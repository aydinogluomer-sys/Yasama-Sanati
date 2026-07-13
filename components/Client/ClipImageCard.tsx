"use client";
import { motion, MotionValue, useMotionValueEvent, useTransform } from "motion/react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { CSSProperties, ReactNode, useState } from "react";
import AnimatedMaskText from "@/components/Client/MaskTextClient";
import SectionTitle from "../Server/SectionTitle";
import { easing } from "@/utils/motion/tokens";
import cn from "@/utils/cn";
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
  const data: DataItem[] = [
    {
      title: [<>Nefes Koçluğu</>, <>Eğitimi</>],
      description: {
        mobile: [
          <>Doğru nefes alarak zihinsel berraklık, duygusal</>,
          <>denge ve hücresel düzeyde detoks sağlayın.</>,
          <>Uluslararası sertifikalı eğitmenlik programı.</>,
        ],
        desktop: [
          <>Doğru nefes alarak zihinsel berraklık, duygusal</>,
          <>denge ve hücresel düzeyde detoks sağlayın.</>,
          <>Uluslararası sertifikalı eğitmenlik programı.</>,
        ],
      },
    },
    {
      title: [<>Meridyen Terapisi</>, <>ve Kinesiyoloji</>],
      description: {
        mobile: [
          <>Vücudun enerji kanallarını bloke eden</>,
          <>engelleri kaldırın. Bütünsel kinesiyoloji</>,
          <>teknikleriyle derin hücresel şifa.</>,
        ],
        desktop: [
          <>Vücudun enerji kanallarını bloke eden</>,
          <>engelleri kaldırın. Bütünsel kinesiyoloji</>,
          <>teknikleriyle derin hücresel şifa.</>,
        ],
      },
    },
    {
      title: [<>Mucizeler Kursu</>, <>(ACIM)</>],
      description: {
        mobile: [
          <>Korkudan sevgiye geçişi hedefleyen,</>,
          <>zihinsel arınma ve spiritüel uyanış. Yıllık</>,
          <>çevrimiçi rehberlik ve çalışma programı.</>,
        ],
        desktop: [
          <>Korkudan sevgiye geçişi hedefleyen,</>,
          <>zihinsel arınma ve spiritüel uyanış. Yıllık</>,
          <>çevrimiçi rehberlik ve çalışma programı.</>,
        ],
      },
    },
    {
      title: [<>Reiki Enerji</>, <>Eğitimleri</>],
      description: {
        mobile: [
          <>Evrensel yaşam enerjisini yönlendirerek</>,
          <>çakraları dengeleyin ve şifa kanallarınızı açın.</>,
          <>Birinci aşamadan master seviyesine uzanan yol.</>,
        ],
        desktop: [
          <>Evrensel yaşam enerjisini yönlendirerek</>,
          <>çakraları dengeleyin ve şifa kanallarınızı açın.</>,
          <>Birinci aşamadan master seviyesine uzanan yol.</>,
        ],
      },
    },
    {
      title: [<>Hipnoterapi &</>, <>Yaşam Koçluğu</>],
      description: {
        mobile: [
          <>Bilinçaltının gücünü keşfederek köklü</>,
          <>davranış değişiklikleri sağlayın ve bireysel</>,
          <>potansiyelinizi gerçeğe dönüştürün.</>,
        ],
        desktop: [
          <>Bilinçaltının gücünü keşfederek köklü</>,
          <>davranış değişiklikleri sağlayın ve bireysel</>,
          <>potansiyelinizi gerçeğe dönüştürün.</>,
        ],
      },
    },
  ];

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.125) {
      setCurrentState(1);
    } else if (latest <= 0.375) {
      setCurrentState(2);
    } else if (latest <= 0.625) {
      setCurrentState(3);
    } else if (latest <= 0.875) {
      setCurrentState(4);
    } else {
      setCurrentState(5);
    }
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
        "relative z-10 flex h-full flex-col items-center justify-between py-[8vh] text-[#d1ccbf] backdrop-brightness-[60%] md:flex-row md:px-16 md:py-[15vh]",
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
          ease: [0.24, 0.43, 0.15, 0.97],
          duration: 0.8,
        }}
        style={{ scale: cardScale, y: cardY, opacity: cardOpacity }}
        className="relative z-20 my-[5vh] flex w-[90%] flex-col gap-5 bg-[#D1CCBF] p-6 text-[#2B3530] md:my-0 md:w-full md:max-w-118 md:gap-6 md:p-8"
      >
        {/* Editorial chapter marker — mono index, hairline, running count */}
        <div className="flex select-none items-center gap-3">
          <AnimatedMaskText
            state={currentState}
            delay={0}
            lines={[<>{prependZero(currentState)}</>]}
            className="font-mono text-[0.95rem] tracking-[0.06em] tabular-nums text-[#A85F33] [line-height:1]"
          />
          <span aria-hidden className="h-px w-10 bg-current opacity-30" />
          <span className="font-mono text-[0.7rem] tracking-[0.14em] text-[#2B3530]/55 tabular-nums">
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
              transition={{ duration: 0.55, ease: easing.editorial }}
            >
              <Image
                src={eachImage}
                alt={"card-image-" + (index + 1)}
                className="size-full object-cover"
              />
            </motion.div>
          ))}
        </div>

        <AnimatedMaskText
          state={currentState}
          delay={0.12}
          lines={data[currentState - 1].description["desktop"]}
          className="text-sm [line-height:1.45] text-[#2B3530]/85 md:text-[0.95rem]"
        />

        <Link
          href="/programlar"
          className="group mt-1 inline-flex w-fit items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[#A85F33] transition-colors hover:text-[#8a4c28] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A85F33]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#D1CCBF] motion-reduce:transition-none"
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
      <span className="text-base [line-height:1] md:text-xl">
        ( Kaydırmaya Devam Edin ){" "}
      </span>
    </motion.div>
  );
}
