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
  /** Ana krem — gövde metni ve açık kart yüzeyi. */
  cream: "#ced1bf",
  /** Açık kâğıt — ters kontrastlı bölümler. */
  paper: "#f3efe6",
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

export default palette;
