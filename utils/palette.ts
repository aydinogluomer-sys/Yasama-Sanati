/**
 * Palet — JavaScript'ten okunan renkler.
 *
 * NEDEN AYRI BİR DOSYA
 * Renklerin asıl kaynağı `app/globals.css` içindeki `@theme` bloğudur; sınıf
 * yazarken `bg-deep`, `text-cream` gibi yardımcılar oradan gelir. Ama üç yerde
 * CSS sınıfı kullanılamıyor:
 *
 *   1. three.js malzemeleri — `new THREE.Color("#…")` bir CSS değişkeni
 *      çözemez, gerçek bir değer ister.
 *   2. Renk alan bileşen props'ları — `<SectionSeam from={…} to={…} />`
 *   3. `next/og` ile üretilen OG görseli — tarayıcı CSS'i çalışmaz.
 *
 * Bu dosya o üç durum için TEK kaynaktır. Değerler `@theme` ile birebir aynı
 * olmak zorundadır; birini değiştirirken diğerini de değiştir.
 *
 * Öncesinde bu değerler 764 kez tek tek elle yazılıyordu ve bakır ailesinde
 * birbirine çok yakın yedi ton oluşmuştu (bkz. docs/AWWWARDS-90-BLOCKERS.md A1).
 */

export const palette = {
  /** Ana zemin — sayfa gövdesi, hero, footer. */
  deep: "#2b3530",
  /** Sıcak yeşil yüzey — vurgulu bölümler. */
  warm: "#30493d",
  /** Koyu mürekkep — derinlik bandı. */
  ink: "#222b27",
  /** Footer zemini. `deep`e çok yakın ama aynı değil; footer bilerek daha düz
   *  ayarlanmıştı (bkz. app/globals.css `--color-footer`). `SectionSeam` gibi
   *  rengi prop olarak alan bileşenler buradan okur. */
  footer: "#293a32",
  /** Ana krem — gövde metni ve açık kart yüzeyi. */
  cream: "#ced1bf",
  /** Açık kâğıt MÜREKKEBİ — koyu zeminde metin ve çizgi. */
  paper: "#f3efe6",
  /** Açık YÜZEY — "warm parchment". Zemin olarak kullanılır; `paper` ile
   *  karıştırma, gerekçe app/globals.css'teki token yorumunda. */
  parchment: "#f0ebe2",
  /** Solgun adaçayı — ikincil metin. */
  sage: "#a7c0b0",
  /** Marka bakırı — dolgu, çizgi, ikon. Küçük metinde KULLANILMAZ (4.29:1). */
  copper: "#c9875b",
  /** Etkileşim durumu. */
  copperHover: "#d79a70",
  /** Koyu zeminde metin için ölçülmüş bakır (6.07:1). */
  copperText: "#e0a878",
} as const;

export type PaletteKey = keyof typeof palette;

/**
 * SVG prop mürekkepleri.
 *
 * NEDEN AYRICA GEREKLİ
 * `NavigateSVG`, `StyledLink`, `BurgerSVG` gibi bileşenler rengi CSS sınıfıyla
 * değil **prop olarak** alıyor. Faz 1'in renk birleştirmesi sınıfları taradığı
 * için bu katmanı hiç görmedi ve şunlar hayatta kaldı:
 *
 *   #D1CCBF  11 kullanım  — `--color-cream` altında birleştiği İLAN EDİLEN,
 *                           ama JS prop'larında yaşamaya devam eden eski krem
 *   #d0cbbe   1 kullanım  — denetim listesinde bile olmayan üçüncü krem
 *
 * Üçü de aynı rengin farklı yazımıydı. Kanonik değere taşındılar; bu aynı
 * zamanda kontrast YÜKSELTMESİ (#d1ccbf 7.92:1 → #ced1bf 8.16:1) ve gözle
 * ayırt edilemez bir kayma (255 üzerinden −3/+5/0).
 */
export const ink = {
  deep: palette.deep,
  cream: palette.cream,
  white: "#ffffff",
} as const;

/** `fill` / `stroke` / `arrowFill` prop'larının kabul ettiği değerler. */
export type Ink = (typeof ink)[keyof typeof ink];

export default palette;
