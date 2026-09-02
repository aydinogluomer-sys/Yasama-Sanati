"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Site geneli imleç yoldaşı — bakır saç teli halka.
 *
 * NEDEN VAR (docs/AWWWARDS-90-BLOCKERS.md A6, plan maddesi 7)
 * Sitenin en karakterli etkileşimi `Cursor.tsx` idi ama YALNIZ `JourneyDesktop`
 * içinde yaşıyordu: kullanıcı menüden bir sayfaya gittiğinde imleç işletim
 * sistemi varsayılanına dönüyordu. Plan bunu "imleci siteye yay" diye
 * yazmıştı; bu bileşen o maddedir.
 *
 * NEDEN MOTION KULLANMIYOR — bu bir tercih değil, ölçüm sonucu.
 * Bileşen `app/layout.tsx`e bağlanıyor, yani HER rotada var. Motion'lı bir
 * çözüm Motion'ı her sayfanın kritik yoluna sokardı; oysa bu turda tam tersi
 * yapıldı (D079/D081: hero koreografisi ve yerleşmesi Motion'dan CSS'e alındı,
 * çünkü ana iş parçacığı darboğazdı — TBT ~2362 ms). Burada Motion yerine tek
 * bir rAF döngüsü ve doğrudan `transform` yazımı var: kare başına iki sayı
 * güncellemesi, sıfır ek kütüphane.
 *
 * NE YAPMIYOR — bilerek
 *  • Yerli imleci GİZLEMİYOR. `cursor: none` verilseydi JS yüklenmediğinde ya
 *    da hata verdiğinde kullanıcı işaretçisiz kalırdı. Halka yalnız eşlik eder.
 *  • Dokunmatik/kaba işaretçide hiç render edilmez (`pointer: fine` şartı).
 *  • Hareket azaltma tercihinde hiç render edilmez — sürekli takip eden bir
 *    öge o tercihe aykırıdır.
 *  • `pointer-events: none` — hiçbir tıklamayı yakalamaz.
 */

/** Halkanın büyüdüğü etkileşimli ögeler. */
const ETKILESIMLI =
  'a, button, [role="button"], input, select, textarea, summary, [tabindex]:not([tabindex="-1"])';

export default function SiteCursor() {
  // Sunucuda ve ilk istemci render'ında KAPALI: `matchMedia` sonucu SSR'da
  // bilinemez, doğrudan ona dallanmak hidrasyon uyuşmazlığı üretir.
  const [aktif, setAktif] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ince = window.matchMedia("(pointer: fine)");
    const azHareket = window.matchMedia("(prefers-reduced-motion: reduce)");
    const uygun = () => ince.matches && !azHareket.matches;

    setAktif(uygun());
    const izle = () => setAktif(uygun());
    ince.addEventListener("change", izle);
    azHareket.addEventListener("change", izle);
    return () => {
      ince.removeEventListener("change", izle);
      azHareket.removeEventListener("change", izle);
    };
  }, []);

  useEffect(() => {
    if (!aktif) return;
    const el = ref.current;
    if (!el) return;

    // Hedef (fare) ve mevcut (halka) konum. Aradaki fark her karede bir miktar
    // kapatılıyor — yay hissini veren bu; kütüphane gerekmiyor.
    let hedefX = 0;
    let hedefY = 0;
    let x = 0;
    let y = 0;
    let olcek = 1;
    let hedefOlcek = 1;
    let gorunur = false;
    let rafId = 0;

    const YUMUSAMA = 0.18;

    const kare = () => {
      x += (hedefX - x) * YUMUSAMA;
      y += (hedefY - y) * YUMUSAMA;
      olcek += (hedefOlcek - olcek) * YUMUSAMA;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${olcek.toFixed(3)})`;
      rafId = requestAnimationFrame(kare);
    };

    const hareket = (e: PointerEvent) => {
      // Yalnız gerçek fare. Kalem/dokunuş halkayı uyandırmaz.
      if (e.pointerType !== "mouse") return;
      hedefX = e.clientX;
      hedefY = e.clientY;
      if (!gorunur) {
        // İlk harekette halka fareye ışınlanır; ekranın köşesinden süzülerek
        // gelmesi dikkat dağıtıcı olurdu.
        x = hedefX;
        y = hedefY;
        gorunur = true;
        el.dataset.gorunur = "evet";
      }
      const hedef = e.target as Element | null;
      hedefOlcek = hedef?.closest?.(ETKILESIMLI) ? 1.75 : 1;
    };

    const cikis = () => {
      gorunur = false;
      delete el.dataset.gorunur;
    };

    window.addEventListener("pointermove", hareket, { passive: true });
    document.addEventListener("pointerleave", cikis);
    window.addEventListener("blur", cikis);
    rafId = requestAnimationFrame(kare);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", hareket);
      document.removeEventListener("pointerleave", cikis);
      window.removeEventListener("blur", cikis);
    };
  }, [aktif]);

  if (!aktif) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[60] size-7 rounded-full border border-copper-text/70 opacity-0 transition-opacity duration-300 data-[gorunur]:opacity-100 motion-reduce:hidden"
    />
  );
}
