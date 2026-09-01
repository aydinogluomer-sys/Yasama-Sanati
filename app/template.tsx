/**
 * Sayfa geçişi.
 *
 * SORUN (docs/AWWWARDS-90-BLOCKERS.md A5)
 * Sitede hiç sayfa geçişi yoktu: ne `template.tsx`, ne route seviyesinde
 * `AnimatePresence`, ne View Transitions. Her menü tıklaması sert bir kesmeydi.
 * Lenis yumuşak kaydırma ve sticky şifa yolculuğuyla kurulan "akış" hissi ilk
 * navigasyonda kırılıyordu.
 *
 * NEDEN `template.tsx`, `layout.tsx` DEĞİL
 * Next App Router'da `layout` navigasyonlar arasında KORUNUR; `template` her
 * rotada yeniden monte edilir. Yeni bir DOM düğümü oluştuğu için CSS animasyonu
 * her sayfada kendiliğinden yeniden çalışır.
 *
 * NEDEN MOTION DEĞİL, SAF CSS  ← bu turda düzeltilen hata
 * İlk yazımda `<motion.div initial={{ opacity: 0 }}>` kullanmıştım. Motion
 * `initial` stillerini SUNUCUDA da basar: yani HTML'e `opacity:0` gömülür ve
 * hidrasyon herhangi bir sebeple çalışmazsa sayfa TAMAMEN BOŞ kalır. Bu, bu
 * kod tabanında daha önce ölçülüp yasaklanmış bir hata sınıfı
 * (bkz. ScrollRevealBridge ve RELEASE-READINESS'taki ScrollRevealText kaydı).
 *
 * CSS animasyonunda böyle bir risk yok: stil sayfası yüklendiği anda animasyon
 * JavaScript'ten bağımsız olarak çalışır ve `both` ile son durumda kalır.
 * JS hiç gelmese bile içerik görünür olur.
 *
 * NEDEN ÇIKIŞ ANİMASYONU YOK
 * App Router bir çıkış animasyonunu beklemez; `AnimatePresence` ile çıkış
 * kurgulamak gidilen sayfanın gösterimini geciktirir, yani navigasyonu
 * YAVAŞLATIR. Awwwards'ta Usability %30 ile Design'dan sonraki en ağır kalem;
 * geçişi güzelleştirmek için tıklamayı bekletmek net kayıptır.
 *
 * Süre ve ölçek kasıtlı olarak küçük: 520ms ve 10px. Daha büyük bir kayma
 * sayfa başındaki hero görselini kaydırıyormuş gibi gösterip Lenis'in kendi
 * hareketiyle karışıyordu.
 *
 * `prefers-reduced-motion` altında animasyon tamamen kapalı (globals.css).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
