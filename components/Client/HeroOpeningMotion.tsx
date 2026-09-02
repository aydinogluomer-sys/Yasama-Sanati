"use client";
import Link from "next/link";
import HandwritingMark from "@/components/Client/HandwritingMark";
import OutlineTypographyLayer from "@/components/Client/OutlineTypographyLayer";
import NavigateSVG from "@/components/SVGComponents/NavigateSVG";
import { consultationHref } from "@/utils/consultation-context";
import { ink } from "@/utils/palette";

/**
 * Hero açılışı — sitenin imza anı. Dev serif başlık satır satır açılıyor,
 * altında el çizimi bir alt çizgi ve sakin bir CTA hiyerarşisi var.
 *
 * KOREOGRAFİ MOTION'DAN CSS'E ALINDI (Faz 4). GERİ ALMAYIN.
 *
 * Önceden `<motion.div initial="hidden" animate="show">` ve `variants` vardı.
 * Motion'ın `initial` prop'u SUNUCU HTML'İNE yazılır: paragrafa `opacity:0`,
 * başlık satırlarına `translateY(115%)`. Sonuç: hero metni — ve sayfanın LCP
 * ögesi — 691 KB JS inip hidrasyon bitene kadar görünmüyordu.
 *
 * Mobil Slow 4G ölçümü (4× CPU, soğuk önbellek), düzeltmeden önce:
 *   fontlar 3402 ms · CSS 3451 ms · JS 5697 ms · **LCP 12152 ms**
 * Metnin boyanması için gereken her şey 3,5 sn'de hazırdı; kalan sekiz buçuk
 * saniye yalnızca JavaScript bekleniyordu.
 *
 * Artık açılım `app/globals.css` içindeki `.hero-line*` / `.hero-fade*` /
 * `.hero-outline-out` sınıflarıyla yapılıyor: stil yüklendiği anda, JS'ten
 * bağımsız çalışır ve `both` ile son durumda kalır. Gecikmeler, süreler ve
 * eğriler `utils/motion/tokens.ts` ile birebir aynı bırakıldı — görünen
 * koreografi değişmedi, yalnız neye bağlı olduğu değişti.
 *
 * Hareket azaltma artık JS hook'uyla değil `prefers-reduced-motion` medya
 * sorgusuyla ele alınıyor; bu da SSR ile istemci arasında fark üretmiyor.
 */
export default function HeroOpeningMotion() {
  return (
    <div className="relative z-10 flex min-h-[100svh] flex-col justify-between gap-10 px-5 pt-24 pb-8 md:px-8 md:pt-28 md:pb-12 lg:px-12 xl:px-16">
      {/* Arkadaki "ŞİFA" konturu, metin açılırken çekiliyor. */}
      <div className="hero-outline-out pointer-events-none absolute inset-0 z-0">
        <OutlineTypographyLayer
          word="ŞİFA"
          strokeColor="rgba(243,239,230,0.24)"
        />
      </div>
      {/* Üstteki hizmet marquee'si kaldırıldı: metni başlığın altındaki paragrafla birebir
          aynı disiplin listesiydi ve masaüstünde 2,86:1 ölçülüyordu (4,5:1 tabanına karşı).
          Scrim'i daha fazla itmek fotoğrafı matlaştıracaktı; eyebrow'la aynı teşhis. */}
      <div />

      {/* ALT — editoryal blok */}
      {/* Başlığın üstünde kicker yok. Logonun ("AKADEMİ") ve başlığın altındaki
          satırın zaten söylediğini tekrar ediyordu; 10px bakırla parlak Ege
          karesi üzerinde 3,4:1 ölçülüyordu. Kurtarmak fotoğrafı yarı yarıya
          koyulaştırmak demekti. Açılışı başlık tek başına taşıyor. */}
      <div className="relative z-10 flex flex-col gap-7 md:gap-9">
        <h1 className="font-serif text-display-l font-normal leading-[0.94] tracking-[-0.02em] text-paper">
          <span className="block overflow-hidden">
            <span className="hero-line hero-line-1 block">Beden, zihin </span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line hero-line-2 block">ve enerji, </span>
          </span>
          <span className="relative inline-block">
            <span className="block overflow-hidden">
              <span className="hero-line hero-line-3 block italic">
                tek bütün.
              </span>
            </span>
            <HandwritingMark
              preserveAspectRatio="none"
              variant="long"
              className="absolute -bottom-2 left-0 h-auto w-[112%] md:-bottom-3"
              style={{ aspectRatio: "620 / 28" }}
              delay={1.05}
            />
          </span>
        </h1>

        <p className="hero-fade hero-fade-1 max-w-[19rem] text-body-lg font-light text-white/72 sm:max-w-[34rem] md:max-w-[40rem]">
          Nefes, Reiki, Meridyen Terapi, Hipnoterapi ve Yaşam Koçluğu; köklü
          disiplinler, çağdaş yöntemle bir arada.
        </p>

        <div className="hero-fade hero-fade-2 pointer-events-auto flex flex-col gap-4 pt-1 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href={consultationHref({ from: "/" })}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-copper px-5 text-3xs font-medium uppercase tracking-[0.14em] text-[#231c16] transition-[background-color,transform] duration-200 hover:bg-copper-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper/50 focus-visible:ring-offset-2 focus-visible:ring-offset-deep motion-reduce:transition-none sm:px-6"
            >
              Ön Görüşme
              <NavigateSVG
                fill={ink.deep}
                className="size-2.5 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              href="/programlar"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-5 text-3xs font-medium uppercase tracking-[0.14em] text-white/85 transition-colors duration-200 hover:border-white/45 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-deep motion-reduce:transition-none sm:px-6"
            >
              Programları İncele
            </Link>
          </div>
          <p className="text-4xs uppercase tracking-[0.18em] text-white/60 md:text-right">
            Online ve İzmir&rsquo;de
          </p>
        </div>
      </div>

      {/* Wave 1B — "Opening Breath": Karşılanma → Merak arasını kuran, nefes
          temposunda bakır halka. Tıklayınca ziyaretçiyi Introduction'a taşır.
          Hareket azaltmada halka durağan. */}
      <HeroBreathButton />
    </div>
  );
}

/**
 * Nefes düğmesi — `onClick` gerektirdiği için ayrı bir istemci adası.
 * Hero metninden ayrı tutuldu: LCP yolunda değil, kaydırma davranışı için
 * JavaScript zaten şart.
 */
function HeroBreathButton() {
  return (
    <button
      type="button"
      onClick={() => {
        const reduce = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        document.getElementById("tanisma")?.scrollIntoView({
          behavior: reduce ? "auto" : "smooth",
        });
      }}
      aria-label="Tanışma bölümüne geç"
      className="hero-fade-center hero-fade-3 group pointer-events-auto absolute bottom-7 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent lg:flex"
    >
      <span className="relative flex size-11 items-center justify-center">
        <span
          aria-hidden
          className="absolute inset-0 rounded-full border border-copper/50 motion-safe:animate-[breath_4.8s_ease-in-out_infinite]"
        />
        <span
          aria-hidden
          className="absolute inset-1 rounded-full border border-copper/25 motion-safe:animate-[breath_4.8s_ease-in-out_infinite_-2.4s]"
        />
        <span
          aria-hidden
          className="size-1.5 rounded-full bg-copper-text transition-transform duration-500 group-hover:scale-125"
        />
      </span>
      <span className="text-5xs font-medium uppercase tracking-[0.3em] text-white/70 transition-colors duration-300 group-hover:text-white">
        Bir nefes al
      </span>
    </button>
  );
}
