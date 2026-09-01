"use client";

import { useEffect } from "react";

/**
 * Alt sayfa bölüm açılımını `animation-timeline: view()` DESTEKLEMEYEN
 * tarayıcılarda da çalıştıran köprü.
 *
 * SORUN (docs/AWWWARDS-90-BLOCKERS.md A4)
 * Alt sayfaların tek hareketi saf CSS'ti: `animation-timeline: view()` ile
 * 14px'lik bir yükselme. O API bugün yalnız Chromium'da var. Yani Safari ve
 * Firefox'ta on dört sayfada hareket TAMAMEN SIFIRDI — jürinin büyük ihtimalle
 * kullanacağı tarayıcılarda site, ana sayfa dışında hareketsiz duruyordu.
 *
 * ÇÖZÜM VE NEDEN BÖYLE
 * CSS yolu birincil kalıyor (sıfır JS, sıfır bayt). Bu bileşen yalnız CSS
 * desteklenmiyorsa devreye giriyor ve aynı hareketi IntersectionObserver ile
 * veriyor.
 *
 * KORUNAN KURALLAR — ikisi de daha önce ölçümle konmuştu, bozulmadı:
 *
 *  1. İÇERİK SSR'DA ASLA GİZLENMEZ. Opaklık animasyonu yok; yalnız `transform`.
 *     Sunucudan gelen metin JS hiç çalışmasa da tam görünür ve tam okunur.
 *     (Eski bir sürüm 0.6->1 opaklık animasyonluyordu; ölçünce açılışta görünür
 *     alandaki bölüm 0.75 opaklıkta kalıyordu ve mevcut metin opaklıklarıyla
 *     çarpışıp kontrastı 4.5:1 tabanının altına indirebiliyordu.)
 *
 *  2. AÇILIŞTA GÖRÜNÜR OLAN ÖĞE OYNAMAZ. Sayfa yüklendiğinde ekranda olan
 *     bölümlere başlangıç kaydırması UYGULANMAZ. Aksi halde JS geldiği anda
 *     22px'lik bir sıçrama görünürdü — düzeltmeye çalıştığımız şeyden daha
 *     kötü bir şey.
 *
 *  3. `prefers-reduced-motion` seçiliyse hiç çalışmaz.
 *
 * NEDEN IntersectionObserver DEĞİL  ← ölçümle bulundu
 * İlk sürüm IntersectionObserver kullanıyordu ve Firefox'ta ÇALIŞMADI.
 * Probe (qa/reveal-probe.mjs) şunu gösterdi: gözlemci ilk çağrısını yapıyor
 * (`isIntersecting: false`), sonra sayfa 3344px kaydırılmasına ve öğeler
 * görüş alanından geçmesine rağmen BİR DAHA HİÇ tetiklenmiyor.
 *
 * Sebep kök öğedeki `overflow: clip` (app/layout.tsx'teki `overflow-x-clip`,
 * hesaplanan değer "clip visible"). Firefox'ta bu, gözlemcinin örtük kökünü
 * (viewport) bozuyor ve kesişim hep 0 kalıyor.
 *
 * Bu yüzden ölçüme dayalı yol kullanılıyor: rAF ile sınırlandırılmış bir
 * scroll dinleyicisi `getBoundingClientRect()` okuyor. Maliyet sınırlı —
 * yalnız CSS'i desteklemeyen tarayıcıda çalışır, gösterilen öğeyi listeden
 * çıkarır ve hepsi bittiğinde dinleyiciyi tamamen kaldırır.
 *
 * AYRICA ÖLÇÜLDÜ: `animation-timeline: view()` yalnız Chromium'da sanılıyordu;
 * probe WebKit'in de DESTEKLEDİĞİNİ gösterdi. Yani bu köprü bugün pratikte
 * yalnız Firefox'ta devreye giriyor.
 */

const REVEAL_ROOT = ".reveal-sections";

export default function ScrollRevealBridge() {
  useEffect(() => {
    // 1 — CSS zaten hallediyorsa çekil.
    if (
      typeof CSS !== "undefined" &&
      CSS.supports?.("animation-timeline", "view()")
    ) {
      return;
    }
    // 2 — Hareket azaltma tercihi varsa hiç başlama.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.querySelector(REVEAL_ROOT);
    if (!root) return;

    // CSS seçicisiyle AYNI hedef: `.reveal-sections > * > *`.
    const targets: HTMLElement[] = [];
    for (const child of Array.from(root.children)) {
      for (const grandchild of Array.from(child.children)) {
        targets.push(grandchild as HTMLElement);
      }
    }
    if (!targets.length) return;

    // Köprü aktif — CSS bu sınıf altında başlangıç konumunu tanımlıyor.
    root.classList.add("reveal-js");

    const fold = window.innerHeight * 0.9;
    const pending: HTMLElement[] = [];
    for (const el of targets) {
      // Açılışta görünür olan öğe hiç kaydırılmaz (kural 2).
      if (el.getBoundingClientRect().top < fold) {
        el.dataset.reveal = "shown";
      } else {
        el.dataset.reveal = "hidden";
        pending.push(el);
      }
    }
    if (!pending.length) {
      root.classList.remove("reveal-js");
      return;
    }

    let queue = pending;
    let frame = 0;

    const check = () => {
      frame = 0;
      // CSS `animation-range: entry 0% entry 30%` ile aynı his: öğe alt
      // kenardan biraz girince açılsın.
      const trigger = window.innerHeight * 0.88;
      const still: HTMLElement[] = [];
      for (const el of queue) {
        if (el.getBoundingClientRect().top < trigger) el.dataset.reveal = "shown";
        else still.push(el);
      }
      queue = still;
      if (!queue.length) teardown();
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(check);
    };

    const teardown = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return teardown;
  }, []);

  return null;
}
