"use client";

import Image, { type StaticImageData } from "next/image";
import { motion, useReducedMotion } from "motion/react";

/**
 * Alt sayfa hero medyası.
 *
 * Menüden gidilen sayfaların hepsi düz koyu yeşil bir bloktu: aynı başlık, aynı
 * iki satır, hiç görsel, hiç derinlik. Ana sayfanın tam genişlik hero'su varken
 * alt sayfalar çıplak kalıyordu ve altısı birbirinden ayırt edilemiyordu.
 *
 * Görseller YENİ ÜRETİLMEDİ: `public/SideBar/` altındaki kareler zaten her menü
 * öğesi için vardı ve yalnız menü hover'ında görünüyordu. Aynı kareyi sayfanın
 * hero'suna taşımak hem boşluğu dolduruyor hem de menüde gördüğün görselin seni
 * sayfaya taşıması gibi bir süreklilik kuruyor.
 *
 * Hareket dili ana sayfa hero'suyla aynı: tek seferlik uzun yerleşme
 * (scale 1.06 -> 1), reduced-motion'da tamamen kapalı.
 *
 * Üç katman:
 *  1. dikey scrim — başlığın okunabilirliği
 *  2. üst şerit    — NavBar'ın görsel üzerinde okunabilmesi
 *  3. alt geçiş    — görselin sayfa zeminine (#2B3530) erimesi; kesik kenar
 *                    "yapıştırılmış" hissi verirdi
 */
export default function SubPageHeroMedia({
  image,
  alt,
}: {
  image: StaticImageData;
  alt: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden={alt === ""} className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={reduce ? { scale: 1 } : { scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={reduce ? { duration: 0 } : { duration: 24, ease: "easeOut" }}
      >
        <Image
          src={image}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* 1 — dikey scrim. Alt banda ağırlık veriyor: başlık ve açıklama orada
             oturuyor, fotoğrafın üst yarısı ise aydınlık kalıyor. Ölçümle
             ayarlandı — önceki (92/55/25) dağılımında açıklama metni dört
             sayfada 3.99–4.34:1'e düşüyordu (gereken 4.5:1). axe bunu
             yakalayamaz: fotoğraf üzerindeki metnin kontrastını hesaplamaz. */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#2B3530] from-[18%] via-[#2B3530]/72 via-[48%] to-[#2B3530]/18" />
      {/* 2 — NavBar şeridi */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#2B3530]/85 via-[#2B3530]/45 to-transparent md:h-52" />
      {/* 3 — alt geçiş */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[#2B3530]" />
    </div>
  );
}
