/**
 * Motion tokens — easing, süre ve stagger için tek kaynak.
 *
 * Kural (decisions.md D022): aynı TÜR animasyon her yerde aynı süre ve eğriyi
 * kullanır. Cubic-bezier'i yeniden yazmak yerine buradan içe aktar.
 *
 * 2026-09-01 denetimi (docs/AWWWARDS-90-BLOCKERS.md A7): kural yazılıydı ama
 * uyulmuyordu. `[0.24, 0.43, 0.15, 0.97]` 24 kez elle yazılmış, token yalnız
 * 12 kez kullanılmıştı. Süre tarafı daha kötüydü: buradaki beş değer neredeyse
 * hiç kullanılmıyor, onun yerine YİRMİ farklı ham sayı geziyordu.
 *
 * Bu turda iki şey yapıldı:
 *   1. Ham eğriler token'a bağlandı (değer aynı, görsel değişiklik yok).
 *   2. Süre ölçeği GERÇEĞE göre yeniden yazıldı. Önceki set aspirasyoneldi —
 *      koddaki hiçbir değere karşılık gelmiyordu, o yüzden kimse kullanmıyordu.
 *      Yeni ölçek fiilen kullanılan değerlerden türetildi; her ham değer en
 *      yakın adıma yuvarlandı (fark <0.1s, algılanmıyor) ve böylece ölçek
 *      kurgusal olmaktan çıkıp uygulanabilir hale geldi.
 */

export const easing = {
  /** İmza editoryal eğri — açılımların tamamı. */
  editorial: [0.24, 0.43, 0.15, 0.97] as const,
  /** Uzun mesafe kateden öğeler için yumuşak yerleşme. */
  softOut: [0.16, 1, 0.3, 1] as const,
  /** Küçük UI / mikro etkileşim için net eğri. */
  precise: [0.22, 1, 0.36, 1] as const,
  /**
   * Aç/kapa (akordeon, SSS) — CSS `ease` ile aynı eğri.
   * Yükseklik animasyonunda simetrik giriş/çıkış istendiği için ayrı durur;
   * editorial eğri açılırken doğru, kapanırken aceleci hissettiriyor.
   */
  accordion: [0.25, 0.1, 0.25, 1] as const,
} as const;

/**
 * Süre ölçeği. Adımı sayıya değil ANLAMA göre seç.
 *
 * Zaten benimsenmiş adlar (`hover`, `buttonStroke`, `textLine`, `section`,
 * `hero`) korundu — on çağrı yerinde kullanılıyorlar ve yeniden adlandırmak
 * hiçbir şey kazandırmadan hepsini kırardı. Eksik olan, ham sayıların
 * doldurduğu ARA adımlardı; onlar eklendi.
 *
 * Ham değerlerin yuvarlanma tablosu:
 *   0.2  0.22 0.25       → hover        (0.22)
 *   0.3  0.32 0.35       → quick        (0.32)
 *   0.4  0.45            → ui           (0.42)
 *   0.5  0.52 0.55       → buttonStroke (0.52)
 *   0.6  0.7  0.72 0.75  → textLine     (0.72)
 *   0.8  0.9  0.95       → section      (0.9)
 *   1.2  1.5             → hero         (1.2)
 *
 * Bunların dışındakiler (4.5s, 6s, 24s, 28s) ortam hareketidir — marquee,
 * yavaş hero yakınlaşması — ve ölçeğe girmez; onlar `ambient` altında.
 */
export const duration = {
  /** Hover, focus, renk geçişi. */
  hover: 0.22,
  /** Küçük durum değişimi — ikon dönmesi, rozet. */
  quick: 0.32,
  /** Arayüz öğesi — akordeon yüksekliği, filtre. */
  ui: 0.42,
  /** Buton konturu ve kart açılımı. */
  buttonStroke: 0.52,
  /** Satır satır metin açılımı. */
  textLine: 0.72,
  /** Bölüm girişi. */
  section: 0.9,
  /** Hero ve sayfa açılışı. */
  hero: 1.2,
} as const;

/** Ortam hareketi — ölçeğin dışında, kasıtlı olarak çok yavaş. */
export const ambient = {
  /** Hero görselinin yavaş yerleşmesi. */
  heroSettle: 24,
  /** Kayan şerit (marquee) tur süresi. */
  marquee: 28,
  /** Nefes ritmi. */
  breath: 6,
} as const;

export const stagger = {
  word: 0.025,
  line: 0.08,
  section: 0.12,
} as const;

export const motionTokens = { ease: easing, duration, ambient, stagger } as const;

export default motionTokens;
