"use client";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import LogoFull from "@/components/SVGComponents/LogoFull";
import BorderedButton from "../Server/BorderedButton";
import NavigateSVG from "../SVGComponents/NavigateSVG";
import AnimatedBurger from "../SVGComponents/AnimatedBurger";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/app/providers";
import ResponsiveSideBar from "./ResponsiveSideBar";
import CloseIcon from "../SVGComponents/CloseIcon";
import cn from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { consultationHref } from "@/utils/consultation-context";
import { easing, duration } from "@/utils/motion/tokens";

export default function NavBar() {
  const pathname = usePathname();
  const consultationUrl = consultationHref({ from: pathname });
  const isMobile = useIsMobile();
  const [openSideBar, setOpenSideBar] = useState(false);
  const [state, setState] = useState(false);
  const [y, setY] = useState("0%");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);
  const { scrollY } = useScroll();
  useEffect(() => {
    if (!openSideBar) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenSideBar(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [openSideBar]);
  useEffect(() => {
    if (!openSideBar) return;

    const backgroundElements = [
      document.getElementById("main-content"),
      document.getElementById("site-footer"),
    ].filter((element): element is HTMLElement => element instanceof HTMLElement);
    const bodyOverflow = document.body.style.overflow;
    const inertState = backgroundElements.map((element) => element.hasAttribute("inert"));

    document.body.style.overflow = "hidden";
    backgroundElements.forEach((element) => element.setAttribute("inert", ""));

    return () => {
      document.body.style.overflow = bodyOverflow;
      backgroundElements.forEach((element, index) => {
        if (!inertState[index]) element.removeAttribute("inert");
      });
    };
  }, [openSideBar]);
  useEffect(() => {
    if (wasOpenRef.current && !openSideBar) menuButtonRef.current?.focus();
    wasOpenRef.current = openSideBar;
  }, [openSideBar]);
  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrollValue = latest / window.innerHeight;
    setState(scrollValue > 0.5);
    if (latest > 50) {
      const prev = scrollY.getPrevious() ?? 0;
      if (prev < latest) {
        setY("-100%");
      } else {
        setY("0%");
      }
    } else {
      setY("0%");
    }
  });
  return (
    <>
      <motion.header
        className="fixed top-0 z-[50] flex w-full items-center justify-between border-b border-transparent px-5 py-10 md:px-8 lg:px-12 xl:px-16"
        initial="initial"
        animate={state ? "animate" : "initial"}
        transition={{
          default: {
            ease: easing.editorial,
            duration: duration.textLine,
          },
          y: {
            ease: easing.editorial,
            duration: duration.section,
          },
        }}
        variants={{
          initial: {
            paddingBlock: isMobile
              ? "calc(40 * var(--multiplier))"
              : "calc(33 * var(--multiplier))",
            backgroundColor: "rgba(206, 209, 191,0)",
            y,
          },
          animate: {
            paddingBlock: isMobile
              ? "calc(18 * var(--multiplier))"
              : "calc(8 * var(--multiplier))",
            backgroundColor: "rgba(206, 209, 191,1)",
            y,
          },
        }}
      >
        <Link href="/" aria-label="Yaşama Sanatı ana sayfa" className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]">
          <LogoFull
            className="h-auto w-full max-w-[calc(210*var(--multiplier))] origin-left md:max-w-[calc(270*var(--multiplier))]"
            variants={{
              initial: { color: "#FFFFFF" },
              animate: { color: "#2B3530" },
            }}
          />
        </Link>
        <div className="flex items-center gap-8">
          {/* Buton yalnız lg+ görünür; bağlantıyı da aynı kırılımda tutuyoruz, yoksa mobilde
              içeriği gizli boş bir <a> kalıyor ve erişilebilirlik ağacında adsız link oluyor. */}
          <Link href={consultationUrl} className="hidden lg:block">
            <BorderedButton
              className={cn(
                "relative hidden w-fit cursor-pointer items-center gap-4 px-5 py-4.5 text-base [line-height:0.8] font-normal lg:flex",
                state
                  ? "text-deep [&_svg]:[stroke:#2b3530]"
                  : "text-white [&_svg]:[stroke:white]"
              )}
            >
              Ön Görüşme
              <NavigateSVG
                style={{ fill: state ? "#ffffff" : "#2b3530" }}
                className="mr-2.5 size-2.5"
              />
            </BorderedButton>
          </Link>
          <motion.button
            ref={menuButtonRef}
            initial="initial"
            whileHover="whileHover"
            onClick={() => {
              const isOpen = openSideBar;
              if (isMobile) {
                if (!isOpen) {
                  //about to open
                  setState(true);
                } else {
                  //about to close -> the variant of the nav should be based on the scrollY
                  const scrollValue = scrollY.get() / window.innerHeight;
                  setState(scrollValue > 0.5);
                }
              }
              setOpenSideBar(!isOpen);
            }}
            className="grid min-h-11 min-w-11 cursor-pointer place-items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
            disabled={isMobile == null}
            type="button"
            aria-label={openSideBar ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={openSideBar}
            aria-controls="site-navigation-panel"
          >
            {isMobile && openSideBar ? (
              <CloseIcon className="size-7 [&_path]:[stroke-width:1px]" />
            ) : (
              <AnimatedBurger
                className={cn(state ? "[stroke:#2b3530]" : "[stroke:white]")}
              />
            )}
          </motion.button>
        </div>
      </motion.header>
      <div id="site-navigation-panel">
        <ResponsiveSideBar
          isMobile={isMobile}
          openSideBar={openSideBar}
          setOpenSideBar={setOpenSideBar}
        />
      </div>
    </>
  );
}
