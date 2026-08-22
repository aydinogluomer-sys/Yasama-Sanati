import type { Metadata } from "next";
import Link from "next/link";
import ConsultationExperience from "@/components/Client/ConsultationExperience";
import LogoFull from "@/components/SVGComponents/LogoFull";
import {
  readConsultationSource,
  readProgramQuery,
} from "@/utils/consultation-context";
import styles from "./on-gorusme.module.css";

const DIRECTION_KEY = "on-gorusme-meridyen-esigi-c-v1";
const DIRECTION_CONTRACT = `
THESIS: Meridyen Eşiği, ücretsiz ön görüşmeyi bir pazarlama kartı değil sakin ve yön gösteren bir çalışma yüzeyi yapar.
OWN-WORLD: Derin zeytin alan, sıcak fildişi yüzey, bakır tek çizgi, Ogg başlık ve Basis arayüz metni; gölge ve yüzen kart yok.
STORY: Ziyaretçi teklifi anlar, üç kısa adımda konuyu ve iletişim bilgisini paylaşır, görüşme talebini gönderir.
FIRST VIEWPORT: 1440×900’de solda büyük başlık, sağda içbükey fildişi çalışma yüzeyi; bakır eşik üç adımlı ilerleme yoludur.
FORM: Curved Threshold, comp turundaki üçüncü seçenek; ${DIRECTION_KEY}.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
`.trim();

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
        <span
          hidden
          data-impeccable-contract={DIRECTION_KEY}
          dangerouslySetInnerHTML={{
            __html: `<!-- ${DIRECTION_CONTRACT.replaceAll("--", "—")} -->`,
          }}
        />
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
