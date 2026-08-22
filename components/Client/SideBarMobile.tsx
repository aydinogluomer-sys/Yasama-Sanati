"use client";

import StyledLink from "@/components/Server/StyledLink";
import * as motion from "motion/react-client";
import NavigateSVG from "@/components/SVGComponents/NavigateSVG";
import ContactUs from "../Server/ContactUs";
import StayConnected from "../Server/StayConnected";
import { AnimatePresence } from "motion/react";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import CloseIcon from "@/components/SVGComponents/CloseIcon";
import { usePathname } from "next/navigation";
import { consultationHref } from "@/utils/consultation-context";
interface LinkItem {
  href: string;
  link: string;
}
export default function SideBarMobile({
  setOpenSideBar,
}: {
  setOpenSideBar: Dispatch<SetStateAction<boolean>>;
}) {
  const pathname = usePathname();
  const consultationUrl = consultationHref({ from: pathname });
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const focusable = Array.from(panel.querySelectorAll<HTMLElement>("a, button"));
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
  const links: LinkItem[] = [
    { href: "/", link: "Ana Sayfa" },
    { href: "/programlar", link: "Programlarımız" },
    { href: "/community", link: "Topluluk" },
    { href: "/blog", link: "Blog" },
    { href: "/sss", link: "Sık Kullanılan Sorular" },
    { href: "/programlar/yasam-kocu", link: "Yaşam Koçluğu" },
    { href: "/programlar/nefes-koclugu", link: "Nefes Koçluğu" },
    { href: "/programlar/mucizeler-kursu", link: "Mucizeler Kursu" },
    { href: "/programlar/hipnoterapi", link: "Hipnoterapi" },
    { href: "/programlar/meridyen-terapi", link: "Meridyen Terapi" },
    { href: "/programlar/reiki", link: "Reiki" },
  ];
  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site menüsü"
      className="fixed top-0 z-[200] h-screen w-full overflow-x-hidden"
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("a")) setOpenSideBar(false);
      }}
    >
      <AnimatePresence>
        <motion.div
          variants={{
            initial: { x: "100%" },
            exit: { x: "100%" },
            animate: { x: "0%" },
          }}
          initial="initial"
          animate="animate"
          transition={{
            ease: [0.24, 0.43, 0.15, 0.97],
            duration: 0.8,
          }}
          className="relative h-screen overflow-y-scroll bg-[#CED1BF] px-3-75 pt-12000svh"
        >
          <button
            type="button"
            aria-label="Menüyü kapat"
            onClick={() => setOpenSideBar(false)}
            className="absolute top-7 right-4 grid min-h-11 min-w-11 place-items-center rounded-sm text-[#2B3530] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
          >
            <CloseIcon className="size-7 [&_path]:[stroke-width:1px]" />
          </button>
          <span className="text-sm text-[#2b353080]">Sayfaları Keşfedin</span>
          <nav aria-label="Mobil navigasyon" className="my-3200svh text-[#2b3530]">
            {links.map(({ link, href }, i) => (
              <StyledLink
                className="mb-750svh text-lg font-light"
                key={link}
                href={href}
                underlineColor="#2b3530"
                arrowFill="#2B3530"
                active={i == 0}
              >
                {link}
              </StyledLink>
            ))}
            <Link
              href={consultationUrl}
              className="mt-14 flex min-h-14 w-full items-center justify-between bg-[#2b3530] px-6 py-5 text-lg font-light text-[#d1ccbf] transition-colors duration-300 hover:bg-[#304d3d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] motion-reduce:transition-none"
            >
              <span>Ön Görüşme</span>
              <NavigateSVG fill="#D1CCBF" />
            </Link>
          </nav>
          <ContactUs className="gap-y-8 text-base text-[#2b3530] max-md:mt-16 md:hidden [&>:first-child]:text-sm [&>:first-child]:text-[#2b3530]/80 [&>div]:gap-x-5" />
          <StayConnected className="mt-4800svh gap-y-6 text-sm [line-height:1] text-[#2b3530]/80 [&_div]:gap-x-8 [&_svg]:h-2400svh [&_svg]:w-auto" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
