"use client";

import { useRef, useState } from "react";
import DashedLink from "@/components/Server/DashedLink";
import FooterNewsletter from "@/components/Client/FooterNewsletter";
import SocialLogos from "@/components/SVGComponents/socials";
import Link from "next/link";
import FooterBackgroundText from "@/components/Client/FooterBackgroundText";
import { motion } from "motion/react";
import Magnetic from "@/components/Client/Magnetic";

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] as const },
  },
};

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const akademiLinks = [
    { href: "/programlar", link: "Programlar" },
    { href: "/programlar", link: "Atölyeler" },
    { href: "/egitmenler", link: "Eğitmenler" },
    { href: "/the-story", link: "Hakkımızda" },
  ];

  const kaynaklarLinks = [
    { href: "/blog", link: "Yazılar" },
    { href: "/community", link: "Etkinlikler" },
    { href: "/sss", link: "SSS" },
    { href: "/programlar", link: "Ücretsiz İçerikler" },
  ];

  return (
    <div
      ref={footerRef}
      className="relative bg-[linear-gradient(135deg,_#2B3530_0%,_#30493D_100%)] px-5 md:px-16 pt-20 md:pt-28 pb-8 overflow-hidden min-h-screen md:h-screen md:min-h-0 flex flex-col justify-between"
    >
      {/* Background Typography */}
      <FooterBackgroundText containerRef={footerRef} />

      {/* Atmospheric Overlays */}
      {/* 1. Soft Radial Glows for Editorial Depth (Accent is ultra-subtle at 2.5% to maintain green base) */}
      <div 
        className="absolute inset-0 pointer-events-none z-0" 
        style={{
          background: "radial-gradient(circle at 15% 25%, rgba(201, 135, 91, 0.025) 0%, transparent 60%), radial-gradient(circle at 85% 75%, rgba(48, 73, 61, 0.35) 0%, transparent 70%)"
        }}
      />
      {/* 2. Soft Edge Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 shadow-[inset_0_0_120px_rgba(17,21,19,0.45)]"
      />
      {/* 3. Subtle Film Grain SVG Noise Overlay (Very low visibility at 1.2% for depth) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.012] mix-blend-overlay z-0" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      <motion.div
        className="w-full relative z-10 flex-1 flex flex-col justify-between mt-0 pointer-events-none"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      >
        {/* Centered container for the grid */}
        <div className="flex-1 flex flex-col justify-center py-6 md:py-10 w-full">
          {/* Main Grid Layout (12 Columns on Desktop) */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12 pb-0 text-[#F3EFE6]/72"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Column 1: Marka Alanı & Manifesto / CTA combined (4 columns) */}
            <motion.div
              className="md:col-span-12 lg:col-span-4 relative lg:pr-8 flex flex-col justify-start pointer-events-auto"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
            >
              {/* Custom elegant vertical divider on the right */}
              <div
                aria-hidden="true"
                className="hidden lg:block absolute right-0 top-0 h-full w-px pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 0%, rgba(243,239,230,0.03) 6%, rgba(243,239,230,0.12) 30%, rgba(243,239,230,0.09) 68%, rgba(243,239,230,0.025) 90%, transparent 100%)",
                }}
              />

              {/* Left side decorative border line */}
              <div className="hidden lg:block absolute left-[-32px] top-[-24px] bottom-0 w-px bg-gradient-to-b from-[#C9875B]/40 via-[#C9875B]/10 to-transparent" />

              {/* Top left sparkle icon with slow infinite rotation */}
              <div className="absolute lg:-left-[37px] -left-[5px] -top-11 text-[#C9875B] select-none pointer-events-none animate-[spin_8s_linear_infinite]">
                <svg className="size-2.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
                </svg>
              </div>

              {/* Decorative Lifeline signature for desktop */}
              <div className="absolute left-[-37px] -top-11 w-[500px] h-[400px] pointer-events-none z-0 hidden lg:block overflow-visible" aria-hidden="true">
                <svg className="w-full h-full" viewBox="0 0 500 400" fill="none">
                  <path
                    d="M 5 5 C 8 70, 12 130, 60 170 C 110 200, 180 215, 270 205 C 330 195, 370 200, 420 215"
                    stroke="url(#lifeline-grad-desktop)"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="lifeline-grad-desktop" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#C9875B" stopOpacity="0.26" />
                      <stop offset="30%" stopColor="#C9875B" stopOpacity="0.20" />
                      <stop offset="60%" stopColor="#C9875B" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="#C9875B" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Decorative Lifeline signature for mobile/tablet */}
              <div className="absolute left-[-5px] top-[-30px] w-[150px] h-[300px] pointer-events-none z-0 lg:hidden overflow-visible" aria-hidden="true">
                <svg className="w-full h-full" viewBox="0 0 150 300" fill="none">
                  <path
                    d="M 5 15 C 25 80 -5 150 20 220 C 35 260 50 270 65 295"
                    stroke="url(#lifeline-grad-mobile)"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="lifeline-grad-mobile" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#C9875B" stopOpacity="0.20" />
                      <stop offset="60%" stopColor="#C9875B" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="#C9875B" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              {/* Stacked vertical brand title with Serif typography and roll-up reveal */}
              <h2 className="text-3xl md:text-4xl font-bold tracking-[0.03em] uppercase text-[#F3EFE6] leading-[1.1] font-serif mt-2 flex flex-col">
                <span className="block overflow-hidden relative">
                  <motion.span
                    className="block"
                    variants={{
                      hidden: { y: "100%" },
                      visible: {
                        y: "0%",
                        transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] },
                      },
                    }}
                  >
                    YAŞAMA
                  </motion.span>
                </span>
                <span className="block overflow-hidden relative">
                  <motion.span
                    className="block"
                    variants={{
                      hidden: { y: "100%" },
                      visible: {
                        y: "0%",
                        transition: {
                          duration: 0.8,
                          delay: 0.08,
                          ease: [0.215, 0.61, 0.355, 1],
                        },
                      },
                    }}
                  >
                    SANATI
                  </motion.span>
                </span>
              </h2>

              <p className="mt-6 text-xs md:text-sm font-light text-[#F3EFE6]/70 leading-[1.75] md:leading-[1.8] max-w-[280px]">
                Yaşamı daha bilinçli, sade ve derin kurmak için eğitimler, atölyeler ve içerikler.
              </p>

              {/* Outlined CTA Button with Magnetic effect */}
              <motion.div
                className="mt-8 w-fit"
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, delay: 0.15, ease: "easeOut" },
                  },
                }}
              >
                <Magnetic range={150} strength={0.25}>
                  <Link
                    href="/programlar"
                    className="group flex items-center justify-between w-[220px] h-12 md:h-[52px] border border-[#C9875B]/60 hover:border-[#C9875B]/90 text-[#C9875B] hover:bg-[#C9875B]/[0.08] px-6 rounded-xl text-xs font-sans tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9875B]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2B3530]"
                  >
                    <span className="font-medium tracking-wide font-sans">
                      Programları Keşfet
                    </span>
                    <svg
                      className="size-3.5 transform group-hover:translate-x-1.5 transition-transform duration-300 ease-out text-[#C9875B] motion-reduce:transform-none"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </Link>
                </Magnetic>
              </motion.div>

              {/* Social media links row with Magnetic effects */}
              <motion.div
                className="flex items-center gap-3.5 mt-8"
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, delay: 0.25, ease: "easeOut" },
                  },
                }}
              >
                {SocialLogos.map((social) => (
                  <Magnetic key={social.key} range={35} strength={0.4}>
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="size-9 rounded-full border border-[#F3EFE6]/12 flex items-center justify-center text-[#F3EFE6]/70 hover:text-[#C9875B] hover:bg-[#C9875B]/[0.07] hover:border-[#C9875B]/55 transition-all duration-300 ease-out hover:-translate-y-0.5 motion-reduce:hover:translate-none motion-reduce:transition-none [&>svg]:size-4 [&_path]:fill-[#F3EFE6]/70 hover:[&_path]:fill-[#C9875B]"
                    >
                      {social.logo}
                    </Link>
                  </Magnetic>
                ))}
              </motion.div>

              {/* Editorial Coordinate Detail Signature */}
              <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] font-sans tracking-[0.14em] uppercase text-[#F3EFE6]/75 select-none border-t border-[#F3EFE6]/[0.06] pt-4 w-full max-w-[280px]">
                <span className="relative flex h-1.5 w-1.5 shrink-0" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9875B] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#C9875B]"></span>
                </span>
                <span className="text-[#F3EFE6]/50">38.4237° N · 27.1428° E</span>
                <span className="h-3 w-px bg-[#C9875B]/45 pointer-events-none" aria-hidden="true" />
                <span className="font-medium text-[#C9875B]/85">ONLINE &amp; İZMİR</span>
              </div>
            </motion.div>

            {/* Columns 2-4: Nested Navigation Group Container (5 columns total) */}
            <motion.div
              className="md:col-span-12 lg:col-span-5 relative grid grid-cols-1 sm:grid-cols-3 gap-8 lg:pr-8 pointer-events-auto"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
            >
              {/* Custom elegant vertical divider on the right */}
              <div
                aria-hidden="true"
                className="hidden lg:block absolute right-0 top-0 h-full w-px pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 0%, rgba(243,239,230,0.03) 6%, rgba(243,239,230,0.12) 30%, rgba(243,239,230,0.09) 68%, rgba(243,239,230,0.025) 90%, transparent 100%)",
                }}
              />

              {/* Column 2: Akademi Navigation */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: "easeOut" },
                  },
                }}
              >
                <span className="block text-[10px] font-sans tracking-widest text-[#C9875B]/90 uppercase mb-2">01</span>
                <h3 className="text-lg md:text-xl font-serif font-medium text-[#F3EFE6] mb-[18px]">
                  Akademi
                </h3>
                <motion.ul className="mt-4 space-y-3.5" variants={listVariants}>
                  {akademiLinks.map((item, idx) => {
                    const linkId = `akademi-${idx}`;
                    const isDimmed = hoveredLink !== null && hoveredLink !== linkId;
                    return (
                      <motion.li 
                        key={idx} 
                        variants={itemVariants} 
                        className="transition-all duration-300 hover:translate-x-[2px]"
                        style={{ opacity: isDimmed ? 0.45 : 1 }}
                        onMouseEnter={() => setHoveredLink(linkId)}
                        onMouseLeave={() => setHoveredLink(null)}
                      >
                        <Link href={item.href}>
                          <DashedLink className="w-fit text-sm [line-height:1.2] [&_.animated-underline]:bg-[#C9875B] font-light text-[#F3EFE6]/72 hover:text-[#F3EFE6] transition-colors duration-300">
                            {item.link}
                          </DashedLink>
                        </Link>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </motion.div>

              {/* Column 3: Kaynaklar Navigation */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: "easeOut" },
                  },
                }}
              >
                <span className="block text-[10px] font-sans tracking-widest text-[#C9875B]/90 uppercase mb-2">02</span>
                <h3 className="text-lg md:text-xl font-serif font-medium text-[#F3EFE6] mb-[18px]">
                  Kaynaklar
                </h3>
                <motion.ul className="mt-4 space-y-3.5" variants={listVariants}>
                  {kaynaklarLinks.map((item, idx) => {
                    const linkId = `kaynaklar-${idx}`;
                    const isDimmed = hoveredLink !== null && hoveredLink !== linkId;
                    return (
                      <motion.li 
                        key={idx} 
                        variants={itemVariants} 
                        className="transition-all duration-300 hover:translate-x-[2px]"
                        style={{ opacity: isDimmed ? 0.45 : 1 }}
                        onMouseEnter={() => setHoveredLink(linkId)}
                        onMouseLeave={() => setHoveredLink(null)}
                      >
                        <Link href={item.href}>
                          <DashedLink className="w-fit text-sm [line-height:1.2] [&_.animated-underline]:bg-[#C9875B] font-light text-[#F3EFE6]/72 hover:text-[#F3EFE6] transition-colors duration-300">
                            {item.link}
                          </DashedLink>
                        </Link>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </motion.div>

              {/* Column 4: İletişim */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: "easeOut" },
                  },
                }}
              >
                <span className="block text-[10px] font-sans tracking-widest text-[#C9875B]/90 uppercase mb-2">03</span>
                <h3 className="text-lg md:text-xl font-serif font-medium text-[#F3EFE6] mb-[18px]">
                  İletişim
                </h3>
                <motion.ul
                  className="mt-4 space-y-4 text-sm font-light text-[#F3EFE6]/72"
                  variants={listVariants}
                >
                  <motion.li 
                    className="flex items-center gap-3 transition-all duration-300 hover:translate-x-[2px]" 
                    variants={itemVariants}
                    style={{ opacity: hoveredLink !== null && hoveredLink !== 'email' ? 0.45 : 1 }}
                    onMouseEnter={() => setHoveredLink('email')}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <svg
                      className="size-4 shrink-0 text-[#F3EFE6]/48"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <Link
                      href="mailto:info@yasamasanati.com"
                      className="hover:text-[#F3EFE6] transition-colors duration-300"
                    >
                      <DashedLink className="w-fit [line-height:1] [&_.animated-underline]:bg-[#C9875B] font-light whitespace-nowrap">
                        info@yasamasanati.com
                      </DashedLink>
                    </Link>
                  </motion.li>
                  <motion.li 
                    className="flex items-center gap-3 transition-all duration-300 hover:translate-x-[2px]" 
                    variants={itemVariants}
                    style={{ opacity: hoveredLink !== null && hoveredLink !== 'tel' ? 0.45 : 1 }}
                    onMouseEnter={() => setHoveredLink('tel')}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <svg
                      className="size-4 shrink-0 text-[#F3EFE6]/48"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <Link
                      href="tel:+905327893753"
                      className="hover:text-[#F3EFE6] transition-colors duration-300"
                    >
                      <DashedLink className="w-fit [line-height:1] [&_.animated-underline]:bg-[#C9875B] font-light whitespace-nowrap">
                        +90 532 789 37 53
                      </DashedLink>
                    </Link>
                  </motion.li>
                  <motion.li 
                    className="flex items-center gap-3 transition-all duration-300 hover:translate-x-[2px]" 
                    variants={itemVariants}
                    style={{ opacity: hoveredLink !== null && hoveredLink !== 'loc' ? 0.45 : 1 }}
                    onMouseEnter={() => setHoveredLink('loc')}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <svg
                      className="size-4 shrink-0 text-[#F3EFE6]/48"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="font-light">Online & İzmir</span>
                  </motion.li>
                </motion.ul>
              </motion.div>
            </motion.div>

            {/* Column 5: Bülten Subscriptions (3 columns, cardified) */}
            <motion.div
              className="md:col-span-12 lg:col-span-3 lg:pl-8 pointer-events-auto"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
            >
              {/* Cardified Newsletter Wrapper */}
              <div className="w-full bg-[rgba(243,239,230,0.035)] border border-[rgba(243,239,230,0.085)] rounded-[20px] p-6 md:p-7 shadow-[inset_0_1px_1px_rgba(243,239,230,0.045),_0_24px_80px_rgba(0,0,0,0.08)] relative overflow-hidden backdrop-blur-sm">
                <span className="block text-[10px] font-sans tracking-widest text-[#C9875B]/90 uppercase mb-2">04</span>
                <h3 className="text-lg md:text-xl font-serif font-medium text-[#F3EFE6] mb-[18px]">
                  Bülten
                </h3>
                <FooterNewsletter />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Soft Divider Line above alt bar */}
        <div
          aria-hidden="true"
          className="h-px w-full pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, rgba(243, 239, 230, 0.12) 12%, rgba(243, 239, 230, 0.10) 72%, transparent 100%)",
          }}
        />

        {/* Copyright Divider Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full pt-7 pb-4 text-xs gap-y-4 pointer-events-auto">
          {/* Left Section */}
          <div className="text-center md:text-left flex-1 font-light text-[#F3EFE6]/56">
            © 2026 Yaşama Sanatı
          </div>

          {/* Middle Section (Combined Bullet points) */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 text-xs flex-[2] text-center">
            <Link href="/privacy-terms">
              <DashedLink className="w-fit cursor-pointer text-xs text-[#F3EFE6]/56 hover:text-[#F3EFE6]/86 transition-colors duration-300 [&_.animated-underline]:bg-[#C9875B]/60">
                Gizlilik
              </DashedLink>
            </Link>
            <span className="text-[#C9875B]/60 select-none mx-1.5 font-bold" aria-hidden="true">•</span>
            <Link href="/privacy-terms">
              <DashedLink className="w-fit cursor-pointer text-xs text-[#F3EFE6]/56 hover:text-[#F3EFE6]/86 transition-colors duration-300 [&_.animated-underline]:bg-[#C9875B]/60">
                Koşullar
              </DashedLink>
            </Link>
            <span className="text-[#C9875B]/60 select-none mx-1.5 font-bold" aria-hidden="true">•</span>
            <Link href="/kvkk">
              <DashedLink className="w-fit cursor-pointer text-xs text-[#F3EFE6]/56 hover:text-[#F3EFE6]/86 transition-colors duration-300 [&_.animated-underline]:bg-[#C9875B]/60">
                KVKK
              </DashedLink>
            </Link>
            <span className="text-[#C9875B]/60 select-none mx-1.5 font-bold" aria-hidden="true">•</span>
            <Link href="/privacy-terms">
              <DashedLink className="w-fit cursor-pointer text-xs text-[#F3EFE6]/56 hover:text-[#F3EFE6]/86 transition-colors duration-300 [&_.animated-underline]:bg-[#C9875B]/60">
                Mesafeli Satış Sözleşmesi
              </DashedLink>
            </Link>
            <span className="text-[#C9875B]/60 select-none mx-1.5 font-bold" aria-hidden="true">•</span>
            <Link href="/privacy-terms">
              <DashedLink className="w-fit cursor-pointer text-xs text-[#F3EFE6]/56 hover:text-[#F3EFE6]/86 transition-colors duration-300 [&_.animated-underline]:bg-[#C9875B]/60">
                Şartlar ve Koşullar
              </DashedLink>
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6 justify-center md:justify-end flex-1 text-[#F3EFE6]/58">
            {/* Elegant Back to Top Button */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center gap-1.5 cursor-pointer text-xs text-[#F3EFE6]/58 hover:text-[#F3EFE6]/85 transition-colors duration-300"
            >
              <span>Yukarı Git</span>
              <svg 
                className="size-3.5 transform group-hover:-translate-y-0.5 transition-transform duration-300 text-[#F3EFE6]/40 group-hover:text-[#F3EFE6]/85" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
            </button>

            <div className="flex items-center gap-2">
              <span className="font-light">Yaşama Sanatı Akademisi</span>
              <svg
                className="size-3 text-[#C9875B] shrink-0 ml-0.5 animate-[spin_8s_linear_infinite_reverse]"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
