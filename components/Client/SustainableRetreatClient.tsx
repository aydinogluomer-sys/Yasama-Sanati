"use client";
import Image, { StaticImageData } from "next/image";
import { motion } from "motion/react";
import StyledLinkClient from "@/components/Client/StyledLinkClient";
// One image per discipline, named after the program it belongs to. Replacing a program's hover
// image is a drop-in: overwrite the file of the same name (see docs/midjourney-prompts.md §6).
import MeridyenTerapiImage from "@/public/group/meridyen-terapi.png";
import NefesKoclugu from "@/public/group/nefes-koclugu.png";
import MucizelerKursuImage from "@/public/group/mucizeler-kursu.png";
import YasamKoclugu from "@/public/group/yasam-koclugu.png";
import HipnoterapiImage from "@/public/group/hipnoterapi.png";
import ReikiImage from "@/public/group/reiki.png";
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
      title: "Meridyen Terapi",
      href: "/programlar/meridyen-terapi",
      img: MeridyenTerapiImage,
    },
    {
      title: "Nefes Koçluğu",
      href: "/programlar/nefes-koclugu",
      img: NefesKoclugu,
    },
    {
      title: "Mucizeler Kursu",
      href: "/programlar/mucizeler-kursu",
      img: MucizelerKursuImage,
    },
    {
      title: "Yaşam Koçluğu",
      href: "/programlar/yasam-kocu",
      img: YasamKoclugu,
    },
    {
      title: "Hipnoterapi",
      href: "/programlar/hipnoterapi",
      img: HipnoterapiImage,
    },
    {
      title: "Reiki",
      href: "/programlar/reiki",
      img: ReikiImage,
    },
  ];

  return (
    <>
      <div ref={imgContainerRef} aria-hidden="true" className="relative overflow-hidden bg-[#2b3530]/20 md:w-fit">
        <Image
          src={links[links.length - 1].img}
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
              alt=""
              className="size-full object-cover md:w-auto"
            />
          </motion.div>
        ))}
      </div>
      <div className="-mx-8-25 grid grid-rows-6 divide-y divide-[#D1CCBF] border-y border-[#D1CCBF] md:col-span-2 md:col-start-2 md:row-start-2 md:mx-0">
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
