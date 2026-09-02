"use client";
import Image from "next/image";
import heroMobile from "@/public/Hero/hero-mobile.jpg";

/**
 * Mobil hero karesi.
 *
 * YERLEŞME ANİMASYONU MOTION'DAN CSS'E ALINDI — geri almayın.
 * Hareket aynı (1.08 -> 1, 28s, easeOut) ama artık `.hero-settle` sınıfıyla
 * yapılıyor. Gerekçe ve ölçüm `app/globals.css` içindeki keyframe yorumunda:
 * 28 saniyelik bir Motion animasyonu, sayfa yüklenirken tüm o süre boyunca
 * ana iş parçacığında iş üretiyordu.
 *
 * Hareket azaltma artık JS hook'uyla değil `prefers-reduced-motion` medya
 * sorgusuyla ele alınıyor; SSR ile istemci arasında fark üretmiyor ve bu
 * bileşenin Motion'a bağımlılığı tamamen kalktı.
 */
export default function HeroMobileClient() {
  return (
    <div className="absolute inset-0 overflow-clip">
      {/* Masaüstüyle aynı yazılmış yerleşme, küçük karede okunsun diye bir tık geniş. */}
      <div className="hero-settle size-full">
        {/* Kalite 75 -> 60. ÖLÇÜLEREK seçildi, göz kararı değil: hero üç scrim
            katmanının altında ve tonal aralık zaten eziliyor. Sayfa üzerinde
            karşılaştırma (390x844, DPR 2, animasyonlar kapalı, pixelmatch):
            q=68 -> 0 farklı piksel · q=60 -> 0 · q=52 -> 22 (%0.002)
            Dosya 96 KB -> 49 KB; LCP ögesi bu görsel olduğu için doğrudan
            LCP'ye yazıyor. */}
        <Image
          src={heroMobile}
          alt=""
          aria-hidden
          priority
          quality={60}
          sizes="100vw"
          placeholder="blur"
          className="size-full object-cover"
        />
      </div>
    </div>
  );
}
