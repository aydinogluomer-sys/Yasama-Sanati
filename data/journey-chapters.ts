/**
 * Şifa Yolculuğu bölümleri — masaüstü ve mobil deneyimin ORTAK kaynağı.
 *
 * Metin eskiden `ClipImageCard.tsx` içine JSX parçaları olarak gömülüydü ve
 * yalnız masaüstü sticky deneyimi tarafından kullanılabiliyordu. Mobil için
 * ayrı bir akış kurulunca aynı cümlelerin iki yerde kopyalanması gerekecekti;
 * ayrışmasınlar diye buraya alındı.
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
    href: "/programlar/nefes-koclugu",
    title: ["Nefes Koçluğu", "Eğitimi"],
    lines: [
      "Doğru nefes alarak zihinsel berraklık, duygusal",
      "denge ve daha derin bir nefes kapasitesi.",
      "Yaşama Sanatı Akademisi eğitmenlik programı.",
    ],
    image: Image1,
    alt: "Gözleri kapalı, sakin bir nefes anında duran kişi",
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
    image: Image2,
    alt: "Meridyen terapi seansında omuz ve sırt bölgesine uygulanan dokunuş",
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
    alt: "Açık bir defter ve yanında duran seramik fincan",
  },
  {
    href: "/programlar/reiki",
    title: ["Reiki Enerji", "Eğitimleri"],
    lines: [
      "Evrensel yaşam enerjisini yönlendirerek",
      "enerji çalışmasının geleneksel yolunu öğrenin.",
      "Birinci aşamadan master seviyesine uzanan yol.",
    ],
    image: Image4,
    alt: "Mum ışığında, baş bölgesinin üzerinde duran eller",
  },
  {
    href: "/programlar/hipnoterapi",
    title: ["Hipnoterapi &", "Yaşam Koçluğu"],
    lines: [
      "Bilinçaltı kalıplarını fark ederek",
      "kendi ritminizde ilerleyin ve bireysel",
      "potansiyelinizi gerçeğe dönüştürün.",
    ],
    image: Image5,
    alt: "Pencere kenarında sohbet eden iki kişi",
  },
];
