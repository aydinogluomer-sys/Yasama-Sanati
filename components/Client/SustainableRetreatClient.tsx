"use client";
import Image, { StaticImageData } from "next/image";
import { motion } from "motion/react";
import StyledLinkClient from "@/components/Client/StyledLinkClient";
// Bu bölüm artık programları değil **katılım formatlarını** listeler. Altı program burada
// tekrar ediliyordu; aynı katalog 8 ekran önce Şifa Yolculuğu sahnesinde zaten sunuluyor
// (RELEASE-PLAN §8B.1). Bölümün kendi başlığı "Üç farklı katılım yolu" diyor ve bu bilgi
// sitede başka hiçbir yerde yok — artık başlığın verdiği sözü tutuyor.
//
// GEÇİCİ görseller: her formatın kendi karesi henüz üretilmedi, en yakın mevcut Ege kareleri
// kullanılıyor. Üretilince aynı adla değiştirilecek (docs/midjourney-prompts.md §6).
import BirebirImage from "@/public/group/meridyen-terapi.jpg";
import GrupImage from "@/public/group/yasam-koclugu.jpg";
import SertifikaImage from "@/public/group/mucizeler-kursu.jpg";
import { useImageReveal } from "@/hooks/useImageReveal";

interface LinkType {
  title: string;
  href: string;
  img: StaticImageData;
}

export default function SustainableRetreatClient() {
  const { imgContainerRef, handleFocus } = useImageReveal();
  const links: LinkType[] = [
    {
      title: "Birebir Seanslar",
      href: "/on-gorusme",
      img: BirebirImage,
    },
    {
      title: "Küçük Grup Programları",
      href: "/programlar",
      img: GrupImage,
    },
    {
      title: "Sertifikalı Eğitimler",
      href: "/programlar",
      img: SertifikaImage,
    },
  ];

  return (
    <>
      <div ref={imgContainerRef} aria-hidden="true" className="relative overflow-hidden bg-deep/20 md:w-fit">
        <Image
          src={links[links.length - 1].img}
          sizes="(min-width: 768px) 440px, 90vw"
          alt=""
          aria-hidden={true}
          className="invisible w-full max-md:aspect-[0.82] md:h-full md:w-auto"
        />
        {links.map((eachLink, i) => (
          <motion.div
            key={`image-${i + 1}`}
            data-index={i}
            className="absolute inset-0"
            style={{ zIndex: -i }}
          >
            <Image
              src={eachLink.img}
              sizes="(min-width: 768px) 440px, 90vw"
              alt=""
              className="size-full object-cover md:w-auto"
            />
          </motion.div>
        ))}
      </div>
      <div className="-mx-8-25 grid auto-rows-fr divide-y divide-cream border-y border-cream md:col-span-2 md:col-start-2 md:row-start-2 md:mx-0">
        {links.map((eachLink, index) => (
          <StyledLinkClient
            handleFocus={handleFocus}
            sNo={index + 1}
            href={eachLink.href}
            key={`link-${index + 1}`}
          >
            {eachLink.title}
          </StyledLinkClient>
        ))}
      </div>
    </>
  );
}
