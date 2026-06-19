"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import FooterBackgroundText from "@/components/Client/FooterBackgroundText";
import FooterNewsletter from "@/components/Client/FooterNewsletter";
import SocialLogos from "@/components/SVGComponents/socials";

const akademiLinks = [
  ["Programlar", "/programlar"],
  ["Atölyeler", "/programlar"],
  ["Eğitmenler", "/egitmenler"],
  ["Hakkımızda", "/the-story"],
] as const;

const kaynaklarLinks = [
  ["Yazılar", "/blog"],
  ["Etkinlikler", "/community"],
  ["SSS", "/sss"],
  ["Ücretsiz İçerikler", "/programlar"],
] as const;

const legalLinks = [
  ["Gizlilik", "/privacy-terms"],
  ["Koşullar", "/privacy-terms"],
  ["KVKK", "/kvkk"],
  ["Mesafeli Satış Sözleşmesi", "/privacy-terms"],
  ["Şartlar ve Koşullar", "/privacy-terms"],
] as const;

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const footerLink =
  "w-fit text-sm leading-6 text-[#F3EFE6]/72 transition-colors duration-200 hover:text-[#F3EFE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D58D5D] motion-reduce:transition-none";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <footer
      id="site-footer"
      ref={footerRef}
      className="relative isolate overflow-hidden bg-[#293A32] px-5 pb-6 pt-20 text-[#F3EFE6] sm:px-8 md:px-12 md:pb-7 md:pt-24 lg:px-14 xl:px-[4.25rem]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_76%_38%,rgba(67,103,84,0.24),transparent_40%),linear-gradient(180deg,#27352f_0%,#2a3831_100%)]"
      />
      <FooterBackgroundText containerRef={footerRef} />

      <div className="relative z-10 mx-auto w-full max-w-[1360px]">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          transition={{ staggerChildren: 0.06 }}
          className="grid grid-cols-1 gap-y-14 md:grid-cols-2 md:gap-x-12 lg:grid-cols-12 lg:gap-x-0"
        >
          <motion.section
            variants={reveal}
            transition={{ duration: 0.55 }}
            className="relative md:pr-8 lg:col-span-3 lg:pr-12"
            aria-labelledby="footer-brand-title"
          >
            <div aria-hidden="true" className="absolute -left-3 -top-8 hidden h-[360px] w-px bg-gradient-to-b from-[#D58D5D]/70 via-[#D58D5D]/20 to-transparent sm:block" />
            <span aria-hidden="true" className="absolute -left-[0.925rem] -top-10 hidden text-sm text-[#D58D5D] sm:block">
              ×
            </span>
            <h2
              id="footer-brand-title"
              className="font-serif text-[2.35rem] font-medium uppercase leading-[0.92] tracking-[-0.02em] md:text-[2.7rem]"
            >
              Yaşama
              <br />
              Sanatı
            </h2>
            <p className="mt-7 max-w-[18rem] text-sm leading-7 text-[#F3EFE6]/72">
              Yaşamı daha bilinçli, sade ve derin kurmak için eğitimler, atölyeler ve içerikler.
            </p>
            <Link
              href="/programlar"
              className="group mt-8 flex h-12 w-full max-w-[13.75rem] items-center justify-between rounded-[0.65rem] border border-[#D58D5D]/85 px-5 text-xs font-medium tracking-[0.04em] text-[#E09A6C] transition-colors hover:bg-[#D58D5D] hover:text-[#203028] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F3EFE6] focus-visible:ring-offset-4 focus-visible:ring-offset-[#293A32] motion-reduce:transition-none"
            >
              <span>Programları Keşfet</span>
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none">
                →
              </span>
            </Link>

            <div className="mt-8 flex flex-wrap gap-2.5" aria-label="Sosyal medya hesapları">
              {SocialLogos.map((social) => (
                <Link
                  key={social.key}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.key}
                  className="grid size-9 place-items-center rounded-full border border-[#F3EFE6]/15 text-[#F3EFE6]/70 transition-colors hover:border-[#D58D5D]/70 hover:text-[#D58D5D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D58D5D] motion-reduce:transition-none [&>svg]:size-4 [&_path]:fill-current"
                >
                  {social.logo}
                </Link>
              ))}
            </div>

            <div className="mt-8 flex max-w-[18rem] flex-wrap items-center gap-x-3 gap-y-1 border-t border-[#F3EFE6]/12 pt-4 text-[10px] uppercase tracking-[0.1em] text-[#F3EFE6]/48">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-[#D58D5D]" />
              <span>38.4237° N · 27.1428° E</span>
              <span aria-hidden="true" className="h-3 w-px bg-[#D58D5D]/50" />
              <span className="text-[#D58D5D]/90">Online &amp; İzmir</span>
            </div>
          </motion.section>

          <motion.div
            variants={reveal}
            transition={{ duration: 0.55, delay: 0.04 }}
            className="grid grid-cols-2 gap-x-8 gap-y-12 md:col-span-2 md:grid-cols-3 lg:col-span-6 lg:border-l lg:border-[#F3EFE6]/12 lg:px-10 xl:px-12"
          >
            <FooterNav index="01" title="Akademi" links={akademiLinks} />
            <FooterNav index="02" title="Kaynaklar" links={kaynaklarLinks} />

            <section className="col-span-2 sm:col-span-1" aria-labelledby="footer-contact-title">
              <Eyebrow>03</Eyebrow>
              <h3 id="footer-contact-title" className="mt-2 font-serif text-xl font-medium">
                İletişim
              </h3>
              <ul className="mt-5 space-y-3.5">
                <li className="flex items-start gap-2">
                  <ContactGlyph kind="mail" />
                  <a className={footerLink} href="mailto:info@yasamasanati.com">
                    info@yasamasanati.com
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <ContactGlyph kind="phone" />
                  <a className={footerLink} href="tel:+905327893753">
                    +90 532 789 37 53
                  </a>
                </li>
                <li className="flex items-start gap-2 text-sm leading-6 text-[#F3EFE6]/68">
                  <ContactGlyph kind="location" />
                  <span>Online &amp; İzmir</span>
                </li>
              </ul>
            </section>
          </motion.div>

          <motion.section
            variants={reveal}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="md:col-span-2 lg:col-span-3 lg:border-l lg:border-[#F3EFE6]/12 lg:pl-10 xl:pl-12"
            aria-labelledby="footer-newsletter-title"
          >
            <Eyebrow>04</Eyebrow>
            <h3 id="footer-newsletter-title" className="mt-2 font-serif text-xl font-medium">
              Bülten
            </h3>
            <div className="mt-5 max-w-[27rem] lg:max-w-none">
              <FooterNewsletter />
            </div>
          </motion.section>
        </motion.div>

        <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-[#F3EFE6]/16 to-transparent lg:mt-20" />
        <div className="flex flex-col items-center gap-5 py-6 text-center text-xs text-[#F3EFE6]/52 lg:flex-row lg:justify-between lg:text-left">
          <p className="shrink-0">© 2026 Yaşama Sanatı</p>

          <nav aria-label="Yasal bağlantılar">
            <ul className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2">
              {legalLinks.map(([label, href], index) => (
                <li key={label} className="flex items-center gap-2.5">
                  {index > 0 && <span aria-hidden="true" className="size-1 rounded-full bg-[#D58D5D]/75" />}
                  <Link className="transition-colors hover:text-[#F3EFE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D58D5D] motion-reduce:transition-none" href={href}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-5">
            <button
              type="button"
              onClick={scrollToTop}
              className="transition-colors hover:text-[#F3EFE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D58D5D] motion-reduce:transition-none"
            >
              Yukarı Git ↑
            </button>
            <span>
              Yaşama Sanatı Akademisi <span aria-hidden="true" className="ml-1 text-[#D58D5D]">✦</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="text-[10px] font-medium tracking-[0.16em] text-[#D58D5D]">{children}</span>;
}

function FooterNav({
  index,
  title,
  links,
}: {
  index: string;
  title: string;
  links: ReadonlyArray<readonly [string, string]>;
}) {
  const titleId = `footer-${title.toLocaleLowerCase("tr-TR")}`;

  return (
    <nav aria-labelledby={titleId}>
      <Eyebrow>{index}</Eyebrow>
      <h3 id={titleId} className="mt-2 font-serif text-xl font-medium">
        {title}
      </h3>
      <ul className="mt-5 space-y-2.5">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link className={footerLink} href={href}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

type ContactGlyphKind = "mail" | "phone" | "location";

function ContactGlyph({ kind }: { kind: ContactGlyphKind }) {
  const common = "mt-0.5 size-4 shrink-0 text-[#D58D5D]";

  if (kind === "mail") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={common} fill="none">
        <path d="M4.5 6.5h15v11h-15z" stroke="currentColor" strokeWidth="1.4" />
        <path d="m5.75 7.75 6.25 5 6.25-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (kind === "phone") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={common} fill="none">
        <path d="M7.75 4.75 10 7.5 8.25 9.25c.65 1.43 1.7 2.79 3.15 4.24 1.45 1.45 2.81 2.5 4.24 3.15L17.5 15l2.75 2.25c-.35 1.5-1.43 2.75-2.75 3.25-1.92.73-4.18.25-6.68-1.42-2.07-1.38-3.96-3.27-5.34-5.34-1.67-2.5-2.15-4.76-1.42-6.68.5-1.32 1.75-2.4 3.25-2.75Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={common} fill="none">
      <path d="M12 20c2.8-2.9 6-6.4 6-10.2a6 6 0 1 0-12 0c0 3.8 3.2 7.3 6 10.2Z" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="12" cy="9.8" r="1.8" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
