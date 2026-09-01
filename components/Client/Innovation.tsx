"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import JourneyMobile from "@/components/Client/JourneyMobile";

/**
 * Şifa Yolculuğu — mobil/masaüstü yönlendiricisi.
 *
 * ÖNCEKİ YAPI VE NEDEN DEĞİŞTİ
 * Mobil ve masaüstü sürümler aynı client component ağacındaydı; ayrım yalnız
 * CSS ileydi (`md:hidden` / `hidden md:block`). CSS **görünürlüğü** değiştirir,
 * **bundle'ı** değil. Ölçüldü: mobil kullanıcı `page-*.js` içinde masaüstü
 * journey kodunu (ClipImageCard, mask makinesi, CustomCursor, NavigateSVG)
 * indirip hidrate ediyordu — hiç görmeyeceği bir deneyim için.
 *
 * ŞİMDİKİ YAPI
 *  • `JourneyMobile` her zaman SSR'da render edilir. Beş bölümün başlıkları,
 *    metinleri ve program bağlantıları HTML'de durur — SEO ve JS'siz okuma
 *    korunur. Masaüstünde CSS ile gizlenir.
 *  • `JourneyDesktop` ayrı bir chunk; yalnız masaüstü genişliğinde ve yalnız
 *    istemcide yüklenir.
 *
 * YERLEŞİM SIÇRAMASI
 * Masaüstünde dinamik bileşen yüklenene kadar aynı yüksekliği (360vh) tutan bir
 * yer tutucu render edilir. Böylece sayfa boyu yükleme öncesi ve sonrasında
 * aynı kalır; hidrasyon sonrası zıplama olmaz.
 *
 * Kırılım noktası Tailwind `md` ile aynı: 768px.
 */

const JourneyDesktop = dynamic(() => import("@/components/Client/JourneyDesktop"), {
  ssr: false,
  loading: () => (
    // Yer tutucu da `data-journey` taşır: QA ve ölçüm scriptleri bölümü bu
    // kararlı seçiciyle buluyor ve dinamik bileşen mount olmadan önceki
    // pencerede "bölüm bulunamadı" diye boşa düşmüyorlar.
    <div aria-hidden data-journey="desktop-placeholder" className="h-[500vh] bg-[#2b3530]" />
  ),
});

const DESKTOP_QUERY = "(min-width: 768px)";

function Innovation() {
  // `null` = henüz ölçülmedi. Bu durumda masaüstü sürüm mount EDİLMEZ ama yer
  // tutucu render edilir; sunucu ve ilk istemci render'ı aynı ağacı üretir.
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <>
      {/* Anlamsal içerik: her zaman SSR'da. Masaüstünde görsel olarak gizli. */}
      <div className="md:hidden">
        <JourneyMobile />
      </div>

      {/* Masaüstü deneyimi: ayrı chunk, yalnız istemcide, yükseklik rezerve. */}
      <div className="hidden md:block">
        {isDesktop ? (
          <JourneyDesktop />
        ) : (
          <div aria-hidden data-journey="desktop-placeholder" className="h-[500vh] bg-[#2b3530]" />
        )}
      </div>
    </>
  );
}

export default Innovation;
