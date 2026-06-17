"use client";
import Image, { StaticImageData } from "next/image";
import { motion } from "motion/react";
import StyledLinkClient from "@/components/Client/StyledLinkClient";
import Image1 from "@/public/group/discover-elementis.png";
import Image2 from "@/public/group/our-vision-and-mission.png";
import Image3 from "@/public/group/our-commitment.png";
import Image4 from "@/public/group/our-pillars.png";
import Image5 from "@/public/group/sustainability.png";
import Image6 from "@/public/Introduction.png";
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
      img: Image1,
    },
    {
      title: "Nefes Koçluğu",
      href: "/programlar/nefes-koclugu",
      img: Image2,
    },
    {
      title: "Mucizeler Kursu",
      href: "/programlar/mucizeler-kursu",
      img: Image3,
    },
    {
      title: "Yaşam Koçluğu",
      href: "/programlar/yasam-kocu",
      img: Image4,
    },
    {
      title: "Hipnoterapi",
      href: "/programlar/hipnoterapi",
      img: Image5,
    },
    {
      title: "Reiki",
      href: "/programlar/reiki",
      img: Image6,
    },
  ];

  return (
    <>
      <div ref={imgContainerRef} className="relative overflow-hidden md:w-fit">
        <Image
          src={links[links.length - 1].img}
          alt="placeholder"
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
              alt={eachLink.title}
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
