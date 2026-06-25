"use client";
import { motion, MotionValue, useMotionValueEvent } from "motion/react";
import Image, { StaticImageData } from "next/image";
import { CSSProperties, ReactNode, useState } from "react";
import AnimatedMaskText from "@/components/Client/MaskTextClient";
import ClipImageContainer from "@/components/Client/ClipImageContainer";
import SectionTitle from "../Server/SectionTitle";
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
        className="relative z-20 my-[5vh] flex h-[70vh] min-h-fit w-[90%] flex-col items-center gap-8 bg-[#D1CCBF] p-5-75 text-[#2B3530] md:h-full md:max-h-172 md:w-full md:max-w-118 md:px-8 md:py-4"
      >
        <div className="flex items-center gap-1 text-2xs md:text-sm">
          <AnimatedMaskText
            state={currentState}
            delay={0}
            lines={[<>{prependZero(currentState)}</>]}
            className="[line-height:1]"
          />
          <span className="opacity-60">-</span>
          <span className="opacity-60">{prependZero(images.length)}</span>
        </div>
        <AnimatedMaskText
          state={currentState}
          delay={0.06}
          lines={data[currentState - 1].title}
          className="-space-y-1 text-center text-lg [line-height:1] font-light md:text-28"
        />

        <div className="relative aspect-[1.62] w-full overflow-hidden md:aspect-[1.85]">
          {images.map((eachImage: StaticImageData, index: number) => (
            <ClipImageContainer
              key={"card-image-container-" + (index + 1)}
              index={index}
              scrollYProgress={scrollYProgress}
            >
              <Image
                src={eachImage}
                alt={"card-image-" + (index + 1)}
                className="size-full object-cover"
              />
            </ClipImageContainer>
          ))}
        </div>
        <AnimatedMaskText
          state={currentState}
          delay={0.12}
          lines={data[currentState - 1].description["desktop"]} //change this
          className="text-center text-sm [line-height:1.25] md:text-base"
        />
      </motion.div>
      <span className="text-base [line-height:1] md:text-xl">
        ( Kaydırmaya Devam Edin ){" "}
      </span>
    </motion.div>
  );
}
