"use client";

import { useIsMobile } from "@/app/providers";
import HeroDesktopClient from "./Desktop";
import HeroMobileClient from "@/sections/Hero/Client/Mobile";

/**
 * Hero medyası — viewport çözülene kadar mobil kareyi gösterir.
 *
 * Viewport henüz bilinmiyorken (`isMobile === null`) bilerek MOBİL kare
 * basılıyor: telefon 2560px'lik masaüstü karesini asla indirmesin ve
 * Desktop→Mobile yanlış-medya sıçraması olmasın.
 *
 * YİNELENEN İSTEK DÜZELTİLDİ (Faz 4).
 * Önce `null` durumunda ayrı bir `<Image>` render ediliyordu, `true` olunca da
 * `<HeroMobileClient>`. İkisi de AYNI görseli kullanıyordu ama farklı ağaç
 * şekilleri olduğu için React ilk `<img>`i söküp yenisini takıyordu — yani aynı
 * kare iki kez isteniyordu. Mobil Slow 4G dökümünde ölçüldü:
 *
 *     t= 4210ms  97 KB  hero-mobile w=828
 *     t=10705ms  97 KB  hero-mobile w=828   ← aynı dosya
 *     t=11904ms  97 KB  hero-mobile w=828   ← aynı dosya
 *
 * Gerçek kullanıcıda tekrar istekleri HTTP önbelleğinden dönebilir, ama DOM'da
 * gereksiz bir düğüm, ikinci bir kod çözme ve soğuk önbellekte gerçek bir bant
 * genişliği israfı vardı. Artık her iki durumda da aynı bileşen render ediliyor,
 * yani React aynı `<img>` düğümünü koruyor.
 */
export default function HeroClient() {
  const isMobile = useIsMobile();
  // `null` (henüz bilinmiyor) ve `true` aynı dalı paylaşıyor: aynı bileşen,
  // aynı DOM düğümü, tek istek.
  return isMobile === false ? <HeroDesktopClient /> : <HeroMobileClient />;
}
