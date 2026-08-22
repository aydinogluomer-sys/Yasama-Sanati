"use client";

import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { motion } from "motion/react";
import Image, { StaticImageData } from "next/image";
import CustomLink from "@/components/Server/CustomLink";
import DashedLink from "@/components/Server/DashedLink";
import CloseIcon from "@/components/SVGComponents/CloseIcon";
// One authored frame per menu entry, named after the entry it belongs to. The set this replaced
// was the Elementis template's (careers / press-room / new-developments / destination …), mapped
// to Turkish labels at random, and two files were doing double duty: community.png served both
// Topluluk and Hipnoterapi, destination.png both Programlarımız and Meridyen Terapi.
import AnaSayfa from "@/public/SideBar/ana-sayfa.jpg";
import Programlar from "@/public/SideBar/programlar.jpg";
import Topluluk from "@/public/SideBar/topluluk.jpg";
import Blog from "@/public/SideBar/blog.jpg";
import Sss from "@/public/SideBar/sss.jpg";
import OnGorusme from "@/public/SideBar/on-gorusme.jpg";
import YasamKoclugu from "@/public/SideBar/yasam-koclugu.jpg";
import NefesKoclugu from "@/public/SideBar/nefes-koclugu.jpg";
import MucizelerKursu from "@/public/SideBar/mucizeler-kursu.jpg";
import Hipnoterapi from "@/public/SideBar/hipnoterapi.jpg";
import MeridyenTerapi from "@/public/SideBar/meridyen-terapi.jpg";
import Reiki from "@/public/SideBar/reiki.jpg";
import { useImageReveal } from "@/hooks/useImageReveal";
import StayConnected from "@/components//Server/StayConnected";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { consultationHref } from "@/utils/consultation-context";

interface LinkItem {
  href: string;
  link: string;
  src: StaticImageData;
}

interface SideBarProps {
  setOpenSideBar: Dispatch<SetStateAction<boolean>>;
}
export default function SideBar({ setOpenSideBar }: SideBarProps) {
  const pathname = usePathname();
  const consultationUrl = consultationHref({ from: pathname });
  const { imgContainerRef, handleFocus } = useImageReveal();
  const panelRef = useRef<HTMLDivElement>(null);
  const data: LinkItem[] = [
    { href: "/", link: "Ana Sayfa", src: AnaSayfa },
    { href: "/programlar", link: "Programlarımız", src: Programlar },
    { href: "/community", link: "Topluluk", src: Topluluk },
    { href: "/blog", link: "Blog", src: Blog },
    { href: "/sss", link: "Sık Kullanılan Sorular", src: Sss },
    { href: consultationUrl, link: "Ön Görüşme", src: OnGorusme },
    { href: "/programlar/yasam-kocu", link: "Yaşam Koçluğu", src: YasamKoclugu },
    { href: "/programlar/nefes-koclugu", link: "Nefes Koçluğu", src: NefesKoclugu },
    { href: "/programlar/mucizeler-kursu", link: "Mucizeler Kursu", src: MucizelerKursu },
    { href: "/programlar/hipnoterapi", link: "Hipnoterapi", src: Hipnoterapi },
    { href: "/programlar/meridyen-terapi", link: "Meridyen Terapi", src: MeridyenTerapi },
    { href: "/programlar/reiki", link: "Reiki", src: Reiki },
  ];

  const temp = {
    initialDelay: 0.8 * 0.4,
    delay: 0.05,
    duration: 0.5,
  };

  const variants = {
    initial: {
      y: "60%",
      opacity: 0,
    },
    animate: {
      y: "0%",
      opacity: 1,
    },
  };
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const focusable = Array.from(
      panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
    );
    focusable[0]?.focus();

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    panel.addEventListener("keydown", trapFocus);
    return () => panel.removeEventListener("keydown", trapFocus);
  }, []);
  return (
    <motion.div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site menüsü"
      key="Side-bar"
      initial={{ backgroundColor: "rgba(0,0,0,0)" }}
      animate={{
        backgroundColor: "rgba(0,0,0,0.35)",
        transition: {
          duration: 0.8,
          ease: [0.24, 0.43, 0.15, 0.97],
        },
      }}
      exit={{
        clipPath: "inset(0% 0% 100% 0%)",
        transition: {
          delay: 0.1,
          duration: 0.8,
          ease: [0.24, 0.43, 0.15, 0.97],
        },
      }}
      className="fixed top-0 z-[200] w-full"
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("a")) setOpenSideBar(false);
      }}
    >
      <motion.div
        className="flex h-screen overflow-y-auto bg-[#CED1BF]"
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{
          duration: 0.8,
          ease: [0.24, 0.43, 0.15, 0.97],
        }}
      >
        <motion.div
          initial={{
            clipPath: "inset(100% 0% 0% 0%)",
          }}
          animate={{
            clipPath: "inset(0% 0% 0% 0%)",
            transition: {
              delay: 0.1,
              ease: [0.24, 0.43, 0.15, 0.97],
              duration: 0.8,
            },
          }}
          exit={{
            clipPath: "inset(0% 0% 100% 0%)",
            transition: {
              ease: [0.24, 0.43, 0.15, 0.97],
              duration: 0.8,
            },
          }}
          className="relative flex-[0.9]"
          ref={imgContainerRef}
        >
          {data.map(({ src, link }, i) => (
            <motion.div
              key={link}
              data-index={i}
              style={{ zIndex: -i }}
              className="absolute inset-0"
            >
              <Image src={src} alt="" aria-hidden="true" fill sizes="45vw" style={{ objectFit: "cover" }} />
            </motion.div>
          ))}
        </motion.div>
        <div className="flex-1 pt-7000svh pr-16 pb-3500svh pl-48">
          <span className="text-1800svh text-[#2b3530]/80">Sayfaları keşfedin</span>
          <nav
            aria-label="Sayfalar"
            className="mt-6400svh mb-8000svh grid grid-flow-col-dense grid-cols-2 grid-rows-6"
          >
            {data.map((eachColData, i) => (
              <CustomLink
                {...temp}
                key={"link-" + (i + 1)}
                href={eachColData.href}
                sNo={i + 1}
                handleFocus={handleFocus}
              >
                {eachColData.link}
              </CustomLink>
            ))}
          </nav>
          <motion.div
            className="space-y-5600svh"
            initial="initial"
            animate="animate"
            variants={{
              animate: {
                transition: {
                  delayChildren: temp.initialDelay + 5 * temp.delay,
                  staggerChildren: temp.delay,
                  duration: temp.duration,
                },
              },
            }}
          >
            <motion.div
              variants={variants}
              transition={{
                duration: temp.duration,
                ease: [0.24, 0.43, 0.15, 0.97],
              }}
              id="contact-us"
              className="space-y-2400svh text-1800svh text-[#2b3530]"
            >
              <div className="text-[#2b3530]/80">Bize Ulaşın</div>
              <div className="flex items-center [&_.animated-underline]:h-[2px] [&_.animated-underline]:bg-[#2b3530]">
                <a href="mailto:info@yasamasanati.com">
                  <DashedLink>info@yasamasanati.com</DashedLink>
                </a>
                <div className="mx-5">|</div>
                <a href="tel:+905327893753">
                  <DashedLink>+90 532 789 37 53</DashedLink>
                </a>
              </div>
            </motion.div>
            <motion.div
              variants={variants}
              transition={{
                duration: temp.duration,
                ease: [0.24, 0.43, 0.15, 0.97],
              }}
            >
              <StayConnected
                style={{
                  fontSize: "var(--text-1800svh)",
                }}
                className="gap-y-2400svh text-1800svh text-[#2b3530]/80 [&_div]:gap-x-10 [&_svg]:h-2400svh [&_svg]:w-auto [&>:first-child]:text-[#2b3530]/80"
              />
            </motion.div>
            <motion.div
              variants={variants}
              transition={{
                duration: temp.duration,
                ease: [0.24, 0.43, 0.15, 0.97],
              }}
              className="text-1600svh"
            >
              <Link href="/privacy-terms">
                <DashedLink className="w-fit text-[#2b3530] [&_.animated-underline]:h-[2px] [&_.animated-underline]:bg-[#2b3530]">
                  Politikalar ve Şartlar
                </DashedLink>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <motion.button
          type="button"
          aria-label="Menüyü kapat"
          initial="initial"
          whileHover="whileHover"
          className="absolute top-6 right-14 grid min-h-11 min-w-11 cursor-pointer place-items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
          // p-2000svh
          onClick={() => setOpenSideBar((prev) => !prev)}
        >
          <CloseIcon className="size-4 [&_path]:[stroke-width:1px]" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
