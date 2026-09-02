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

      {/* 1 — genel scrim.
             ÖNCEKİ DENGE ÖLÇÜLDÜ VE DEĞİŞTİRİLDİ (AWWWARDS-90-BLOCKERS A8).
             `from-[18%] via-72/[48%] to-18` dağılımında fotoğraf hero'nun
             ortasında tükeniyordu; /community'de piksel okuması:
               y=120 (89,85,75) → y=400 (48,54,47) → y=550 (46,55,51)
             y=550 saf zemin rengi. Yani 612px'lik hero'nun alt %40'ı ölü
             alandı ve "fotoğraflı hero" fiilen düz bir bloktu.

             Genel katman artık çok daha hafif: fotoğrafın yaşaması için.
             Okunabilirliği 1b sağlıyor. */}
      <div className="absolute inset-0 bg-gradient-to-t from-deep from-[8%] via-deep/42 via-[42%] to-deep/12" />
      {/* 1b — metin şeridi. Başlık ve açıklama YALNIZ burada oturuyor, o yüzden
             koyuluk tüm kareye değil sadece bu banda uygulanıyor. Kontrast
             tabanı böyle korunuyor: metnin arkası eskisi kadar koyu, fotoğrafın
             üst üçte ikisi ise açık kalıyor.
             (axe bunu doğrulayamaz — fotoğraf üzerindeki metnin kontrastını
             hesaplamaz; ölçüm piksel okumasıyla yapılıyor.) */}
      <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-deep from-[12%] via-deep/74 via-[46%] to-transparent" />
      {/* 1c — metin SÜTUNU scrim'i.
             Dikey bant tek başına yetmiyor: bazı karelerde metnin tam arkasına
             parlak bir bölge düşüyor. Ölçüldü — `/programlar`de fotoğrafın o
             noktasında krem bir defter ve keten var ve açıklama 2.42:1'e
             düşüyordu (diğer yedi rota 4.56–4.68 arasındaydı).

             Çözüm tüm kareyi koyulaştırmak DEĞİL — o, 1 ve 1b ile kazanılan
             fotoğrafı geri verirdi. Metin sola hizalı ve sınırlı genişlikte
             olduğu için koyuluk yalnız sol sütuna uygulanıyor; sağ taraf açık
             kalıyor. Ölçüm: qa/hero-contrast.mjs */}
      <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-deep/78 via-deep/34 via-[38%] to-transparent to-[62%]" />
      {/* 2 — NavBar şeridi */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-deep/85 via-deep/45 to-transparent md:h-52" />
      {/* 3 — alt geçiş */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-deep" />
    </div>
  );
}
