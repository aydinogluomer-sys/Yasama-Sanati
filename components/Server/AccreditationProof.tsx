/**
 * Akreditasyon kanıt bloğu.
 *
 * Tasarım ilkesi: **yalnız verilen alan render edilir.** Eksik alan için
 * "belirtilmemiş", "yakında" veya boş satır gösterilmez — eksikliği görünür
 * kılmak, uydurmakla aynı kapıya çıkan bir baskı yaratır. Alan yoksa satır yoktur.
 *
 * `PRODUCT.md`'nin kuralı: bu projede yayınlanabilir TEK akreditasyon gerçeği
 * IECCERT'in Meridyen Terapi'yi kapsamasıdır. Başka bir kurum adı, sicil numarası,
 * "uluslararası akredite" gibi kapsamı belirsiz ifade veya doğrulama linki,
 * kullanıcıdan doğrulanmış olarak gelmeden eklenmez.
 *
 * Doldurulmayı bekleyen alanlar (REQUIRES VERIFIED BUSINESS DATA):
 *   registrationNumber · verificationUrl · trainingHours · assessment ·
 *   certificateSampleUrl
 * Bunlar prop olarak tanımlı; değerleri geldiğinde tek yerde açılırlar.
 */

export interface AccreditationProofProps {
  /** Akredite eden kurum. Yalnız doğrulanmış kurum adı. */
  body: string;
  /** Kurumun açık adı / ne olduğu. */
  bodyFullName?: string;
  /** Akreditasyonun kapsadığı program. */
  program: string;
  /** Kapsamın sınırı — neyi kapsıyor, neyi kapsamıyor. */
  scope?: string;
  /** Sertifika türü / seviyesi. */
  certificateType?: string;
  /** Eğitim saati. */
  trainingHours?: string;
  /** Değerlendirme yöntemi. */
  assessment?: string;
  /** Sicil / referans numarası. */
  registrationNumber?: string;
  /** Kurumun kendi doğrulama sayfası. */
  verificationUrl?: string;
  /** Örnek sertifika görseli. */
  certificateSampleUrl?: string;
}

export default function AccreditationProof({
  body,
  bodyFullName,
  program,
  scope,
  certificateType,
  trainingHours,
  assessment,
  registrationNumber,
  verificationUrl,
  certificateSampleUrl,
}: AccreditationProofProps) {
  const rows: { label: string; value: string }[] = [
    { label: "Akredite eden", value: bodyFullName ? `${body} — ${bodyFullName}` : body },
    { label: "Kapsanan program", value: program },
    ...(scope ? [{ label: "Kapsam", value: scope }] : []),
    ...(certificateType ? [{ label: "Sertifika türü", value: certificateType }] : []),
    ...(trainingHours ? [{ label: "Eğitim saati", value: trainingHours }] : []),
    ...(assessment ? [{ label: "Değerlendirme", value: assessment }] : []),
    ...(registrationNumber ? [{ label: "Sicil no", value: registrationNumber }] : []),
  ];

  return (
    <section
      aria-labelledby="akreditasyon-basligi"
      className="border-t border-cream/15 pt-8"
    >
      <h2
        id="akreditasyon-basligi"
        className="font-mono text-3xs tracking-[0.16em] text-copper-text uppercase"
      >
        Akreditasyon
      </h2>

      <dl className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-[minmax(9rem,auto)_1fr]">
        {rows.map((row) => (
          <div key={row.label} className="contents">
            <dt className="text-body-sm text-cream/70">{row.label}</dt>
            <dd className="text-body-sm text-paper">{row.value}</dd>
          </div>
        ))}
      </dl>

      {(verificationUrl || certificateSampleUrl) && (
        <div className="mt-6 flex flex-wrap gap-4">
          {verificationUrl && (
            <a
              href={verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-3xs tracking-[0.16em] text-copper-text uppercase underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:outline-none"
            >
              Kurumdan doğrula
            </a>
          )}
          {certificateSampleUrl && (
            <a
              href={certificateSampleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-3xs tracking-[0.16em] text-copper-text uppercase underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:outline-none"
            >
              Örnek sertifikayı gör
            </a>
          )}
        </div>
      )}

      {/* Opaklık /75: tasarım sisteminin koyu yüzey tabanı 70, ama bu metin 11px
          (text-3xs) olduğu için büyük-metin muafiyeti yok ve 4.5:1 gerekiyor.
          Ölçüldü: /60 -> 4.01:1 (düşüyor), /75 -> taban üstü. */}
      <p className="mt-6 max-w-prose text-3xs leading-relaxed text-cream/75">
        Bu program tamamlayıcı bir eğitim programıdır; tıbbi tanı veya tedavi
        yetkisi vermez. Tanı ve tedavi yalnızca hekimler tarafından yapılır.
      </p>
    </section>
  );
}
