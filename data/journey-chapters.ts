/**
 * Şifa Yolculuğu bölümleri — masaüstü ve mobil deneyimin ORTAK kaynağı.
 *
 * Metin eskiden `ClipImageCard.tsx` içine JSX parçaları olarak gömülüydü ve
 * yalnız masaüstü sticky deneyimi tarafından kullanılabiliyordu. Mobil için
 * ayrı bir akış kurulunca aynı cümlelerin iki yerde kopyalanması gerekecekti;
 * ayrışmasınlar diye buraya alındı.
 *
 * SIRA ANLAMLIDIR ve altı programın tamamını kapsar (2026-08-23):
 *   01 Yaşam Koçluğu · 02 Nefes Koçluğu · 03 Mucizeler Kursu
 *   04 Hipnoterapi   · 05 Meridyen Terapi · 06 Reiki
 *
 * Öncesinde beş bölüm vardı ve Hipnoterapi ile Yaşam Koçluğu tek karede
 * birleştirilmişti; artık her programın kendi bölümü var. Sayaç ve eşikler bu
 * dizinin UZUNLUĞUNDAN türetilir — bölüm eklenip çıkarıldığında elle sayı
 * düzeltmek gerekmez (bkz. ClipImageCard ve JourneyDesktop).
 *
 * Satırlar dizi olarak duruyor çünkü masaüstündeki maskeli açılım satır satır
 * çalışıyor. Mobilde satırlar birleştirilip tek paragraf olarak akıtılır.
 */
import type { StaticImageData } from "next/image";

import Image1 from "@/public/ImageContainer/image-1.jpg";
import Image2 from "@/public/ImageContainer/image-2.jpg";
import Image3 from "@/public/ImageContainer/image-3.jpg";
import Image4 from "@/public/ImageContainer/image-4.jpg";
import Image5 from "@/public/ImageContainer/image-5.jpg";
import Image6 from "@/public/ImageContainer/image-6.jpg";

export interface JourneyChapter {
  /** Program rotası — bölümden doğrudan o programa gidilir. */
  href: string;
  /** Başlık satırları (maskeli açılım satır satır). */
  title: string[];
  /** Gövde satırları. */
  lines: string[];
  image: StaticImageData;
  /** Görselin alt metni; dekoratif değil, bölümü tarif eder. */
  alt: string;
}

export const JOURNEY_CHAPTERS: JourneyChapter[] = [
  {
    href: "/programlar/yasam-kocu",
    title: ["Yaşam Koçluğu", "Eğitimi"],
    lines: [
      "Hedeflerinizi netleştirin, etkin iletişim ve",
      "kendi ritminizde ilerleme üzerine çalışın.",
      "Profesyonel koçluk sertifikasyon programı.",
    ],
    image: Image1,
    alt: "Zeytin ağacı altındaki taş terasta karşılıklı oturup sohbet eden iki kişi",
  },
  {
    href: "/programlar/nefes-koclugu",
    title: ["Nefes Koçluğu", "Eğitimi"],
    lines: [
      "Doğru nefes alarak zihinsel berraklık, duygusal",
      "denge ve daha derin bir nefes kapasitesi.",
      "Yaşama Sanatı Akademisi eğitmenlik programı.",
    ],
    image: Image2,
    alt: "Deniz manzaralı taş duvarın önünde gözleri kapalı, sakin bir nefes anı",
  },
  {
    href: "/programlar/mucizeler-kursu",
    title: ["Mucizeler Kursu", "(ACIM)"],
    lines: [
      "Korkudan sevgiye geçişi hedefleyen,",
      "zihinsel arınma ve spiritüel uyanış. Yıllık",
      "çevrimiçi rehberlik ve çalışma programı.",
    ],
    image: Image3,
    alt: "Açık bir defter, seramik fincan ve gözlük; pencereden taş köy ve deniz",
  },
  {
    href: "/programlar/hipnoterapi",
    title: ["Hipnoterapi", "Uzmanlığı"],
    lines: [
      "Bilinçaltı kalıplarını fark ederek",
      "hipnotik dil ve telkin tekniklerini öğrenin.",
      "Derin gelişim üzerine uzmanlık programı.",
    ],
    image: Image4,
    alt: "Sıcak lamba ışığında keten örtülü divanda uzanmış, gözleri kapalı kişi",
  },
  {
    href: "/programlar/meridyen-terapi",
    title: ["Meridyen Terapisi", "ve Kinesiyoloji"],
    lines: [
      // Eski metin "enerji kanallarını bloke eden engelleri kaldırın" diyordu:
      // fizyolojik bir sonuç vaadi. Geleneksel çerçeveye taşındı (D069 kuralı).
      "Geleneksel öğretide enerji kanallarıyla ilişkilendirilen",
      "bölgeler üzerinde, bütünsel kinesiyoloji",
      "teknikleriyle yürütülen bir çalışma.",
    ],
    image: Image5,
    alt: "Keten üzerine uzanan kola uygulanan bası; yakın planda eller",
  },
  {
    href: "/programlar/reiki",
    title: ["Reiki Enerji", "Eğitimleri"],
    lines: [
      "Evrensel yaşam enerjisini yönlendirerek",
      "enerji çalışmasının geleneksel yolunu öğrenin.",
      "Birinci aşamadan master seviyesine uzanan yol.",
    ],
    image: Image6,
    alt: "Mum ışığında, baş bölgesinin üzerinde duran eller",
  },
];
