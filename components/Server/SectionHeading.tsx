import React from "react";
import cn from "@/utils/cn";
import TypographyLabel from "@/components/Server/TypographyLabel";

/**
 * Bölüm başlığı — sitenin TEK editoryal başlık sistemi.
 *
 * NEDEN VAR
 * Denetimde sitede iki ayrı başlık dili çıktı (docs/AWWWARDS-90-BLOCKERS.md A2):
 *
 *   • Program sayfaları: Space Mono indeks + Ogg serif başlık + ince çizgi.
 *     Doğru olan buydu ama `CourseDetailTemplate` içine gömülüydü, dışarıdan
 *     kullanılamıyordu.
 *   • Diğer on sayfa: çıplak `text-30 font-light` sans başlık. Marka hikâyesi
 *     sayfasında (`/the-story`) dokuz başlık vardı ve HİÇBİRİ serif değildi —
 *     yani markanın kendi tipografisi kendi hikâyesinde kullanılmıyordu.
 *
 * `SubPageLayout` h1'i zaten `font-serif text-display-l` basıyor; gövde o sesi
 * bırakınca sayfa ikiye bölünmüş gibi okunuyordu. Bu bileşen o kopukluğu
 * kapatır: h1'den h2'ye geçerken ses değişmez, yalnız ölçek küçülür.
 *
 * `EditorialSectionTitle` ile karışmasın: o, tek başına duran bir KICKER
 * (yalnız etiket). Bu ise kicker + başlık + kural bütünü.
 */

export interface SectionHeadingProps {
  /** İki haneli bölüm indeksi ("01"). Space Mono ile, bakır tonda. */
  index?: string;
  /** İndeksin yanındaki küçük etiket ("PROGRAM · GENEL BAKIŞ"). */
  kicker?: string;
  children: React.ReactNode;
  /** Anlamsal düzey. Sayfa başlığı h1 olduğu için varsayılan h2. */
  as?: "h2" | "h3";
  /**
   * Ölçek. `m` bölüm başlıkları, `s` alt bölümler için.
   * İkisi de display rampasından gelir; sans'a düşmez.
   */
  size?: "m" | "s";
  /** Altına ince ayırıcı çizgi. Uzun listelerde ritmi kurar. */
  rule?: boolean;
  className?: string;
}

export default function SectionHeading({
  index,
  kicker,
  children,
  as: Tag = "h2",
  size = "m",
  rule = false,
  className,
}: SectionHeadingProps) {
  const hasEyebrow = Boolean(index || kicker);

  return (
    <div className={cn(rule && "border-b border-cream/15 pb-5", className)}>
      {hasEyebrow && (
        <div className="mb-4 flex items-center gap-4">
          {index && (
            <TypographyLabel className="shrink-0 text-copper-text">
              {index}
            </TypographyLabel>
          )}
          {index && kicker && (
            <span aria-hidden className="h-px w-8 shrink-0 bg-copper-text/40" />
          )}
          {kicker && (
            <span className="text-kicker font-medium uppercase tracking-[0.28em] text-cream/70">
              {kicker}
            </span>
          )}
        </div>
      )}
      <Tag
        className={cn(
          "font-serif font-normal tracking-[-0.01em] text-white",
          size === "m"
            ? "text-display-m leading-[1.02]"
            : "text-display-s leading-[1.05]",
        )}
      >
        {children}
      </Tag>
    </div>
  );
}
