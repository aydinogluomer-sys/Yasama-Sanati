import type { Metadata } from "next";
import Link from "next/link";
import ConsultationExperience from "@/components/Client/ConsultationExperience";
import LogoFull from "@/components/SVGComponents/LogoFull";
import {
  readConsultationSource,
  readProgramQuery,
} from "@/utils/consultation-context";
import styles from "./on-gorusme.module.css";

export const metadata: Metadata = {
  title: "Ücretsiz Ön Görüşme | Yaşama Sanatı",
  description:
    "İhtiyacını ve temponu paylaş; sana uygun başlangıç yolunu ücretsiz ön görüşmede birlikte netleştirelim.",
  alternates: { canonical: "/on-gorusme" },
};

type SearchParams = Promise<
  Record<string, string | string[] | undefined>
>;

export default async function ConsultationPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const query = await searchParams;
  const program = readProgramQuery(query.program);
  const sourcePath = readConsultationSource(query.from);

  return (
    <div className={styles.page} data-consultation-route>
      <header className={styles.focusedHeader}>
        <Link
          href="/"
          aria-label="Yaşama Sanatı ana sayfa"
          className={styles.logoLink}
        >
          <LogoFull className={styles.focusedLogo} />
        </Link>
        <Link href="/" className={styles.homeLink}>
          <span>Ana sayfaya dön</span>
          <svg aria-hidden="true" viewBox="0 0 20 20">
            <path d="M5 15 15 5M8 5h7v7" />
          </svg>
        </Link>
      </header>

      <main id="main-content" className={styles.main}>
        <ConsultationExperience
          initialProgram={program.slug ?? "together"}
          invalidProgramQuery={program.invalid}
          sourcePath={sourcePath}
        />
        <footer className={styles.compactFooter}>
          <span>© 2026 Yaşama Sanatı</span>
          <div>
            <a href="mailto:info@yasamasanati.com">info@yasamasanati.com</a>
            <a href="tel:+905327893753">+90 532 789 37 53</a>
            <a
              href="https://wa.me/905327893753"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
            <Link href="/kvkk">KVKK</Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
