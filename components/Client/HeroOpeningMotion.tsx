"use client";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import ResponsiveMarquee from "@/components/Client/ResponsiveMarquee";
import HandwritingMark from "@/components/Client/HandwritingMark";
import OutlineTypographyLayer from "@/components/Client/OutlineTypographyLayer";
import { easing, duration } from "@/utils/motion/tokens";

/** Masked line reveal (used inside an overflow-hidden wrapper). */
const maskLine = (delay: number): Variants => ({
  hidden: { y: "115%" },
  show: { y: "0%", transition: { ease: easing.editorial, duration: duration.textLine, delay } },
});

/** Soft fade + lift for supporting elements. */
const fadeUp = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { ease: easing.softOut, duration: 0.7, delay } },
});

/**
 * Hero opening — the signature moment. Giant serif headline reveals line by line over an
 * asymmetric editorial composition, with a hand-drawn underline and a calm CTA hierarchy.
 * Reduced motion: MotionConfig (layout) collapses the transforms to their final state.
 */
export default function HeroOpeningMotion() {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      className="relative z-10 flex min-h-[100svh] flex-col justify-between gap-10 px-5 pt-24 pb-8 md:px-12 md:pt-28 md:pb-12"
    >
      {/* Background outline "ŞİFA" that fades out as text reveals */}
      <motion.div
        variants={{
          hidden: { opacity: 1 },
          show: {
            opacity: 0,
            transition: {
              ease: [0.24, 0.43, 0.15, 0.97],
              duration: 1.2,
              delay: 0.35,
            },
          },
        }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <OutlineTypographyLayer
          word="ŞİFA"
          strokeColor="rgba(243,239,230,0.24)"
        />
      </motion.div>
      {/* TOP — quiet service marquee */}
      <motion.div variants={fadeUp(0.15)} className="relative z-10 overflow-hidden">
        <ResponsiveMarquee
          animationConfig={{
            mobile: { max: "-1482px", speed: 50 },
            desktop: { max: "-148.2%", speed: 5 },
          }}
          className="font-mono text-[11px] font-medium uppercase tracking-[0.32em] text-white/55 md:text-[12px]"
        >
          {"Nefes • Reiki • Meridyen Terapi • Hipnoterapi • Yaşam Koçluğu • "}
        </ResponsiveMarquee>
      </motion.div>

      {/* BOTTOM — editorial block */}
      <div className="relative z-10 flex flex-col gap-7 md:gap-9">
        <motion.p
          variants={fadeUp(0.25)}
          className="text-kicker font-medium uppercase tracking-[0.34em] text-[#E0A878]"
        >
          Bütünsel Şifa &amp; Eğitim Akademisi
        </motion.p>

        <h1 className="font-serif text-display-l font-normal leading-[0.94] tracking-[-0.02em] text-[#F4EFE4]">
          <span className="block overflow-hidden">
            <motion.span variants={maskLine(0.3)} className="block">
              Beden, zihin
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span variants={maskLine(0.4)} className="block">
              ve enerji,
            </motion.span>
          </span>
          <span className="relative inline-block">
            <span className="block overflow-hidden">
              <motion.span variants={maskLine(0.52)} className="block italic">
                tek bütün.
              </motion.span>
            </span>
            <HandwritingMark
              preserveAspectRatio="none"
              variant="long"
              className="absolute -bottom-2 left-0 h-auto w-[112%] md:-bottom-3"
              style={{ aspectRatio: "620 / 28" }}
              delay={1.05}
            />
          </span>
        </h1>

        <motion.p
          variants={fadeUp(0.7)}
          className="max-w-[19rem] text-body-lg font-light text-white/72 sm:max-w-[34rem] md:max-w-[40rem]"
        >
          Nefes, Reiki, Meridyen Terapi, Hipnoterapi ve Yaşam Koçluğu; köklü
          disiplinler, çağdaş yöntemle bir arada.
        </motion.p>

        <motion.div
          variants={fadeUp(0.9)}
          className="pointer-events-auto flex flex-col gap-4 pt-1 md:flex-row md:items-end md:justify-between"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/#on-kayit"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#C9875B] px-5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#231c16] transition-[background-color,transform] duration-200 hover:bg-[#d79a70] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9875B]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2B3530] motion-reduce:transition-none sm:px-6"
            >
              Ön Görüşme
              <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href="/programlar"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-5 text-[11px] font-medium uppercase tracking-[0.14em] text-white/85 transition-colors duration-200 hover:border-white/45 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2B3530] motion-reduce:transition-none sm:px-6"
            >
              Programları İncele
            </Link>
          </div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/60 md:text-right">
            Editorial wellness academy · İstanbul
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
