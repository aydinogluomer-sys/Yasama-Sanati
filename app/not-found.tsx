import Link from "next/link";
import type { Metadata } from "next";
import NavBar from "@/components/Client/NavBar";
import Footer from "@/sections/Footer/Server";
import BorderedButton from "@/components/Server/BorderedButton";
import NavigateSVG from "@/components/SVGComponents/NavigateSVG";
import { ink } from "@/utils/palette";

export const metadata: Metadata = {
  title: "Sayfa bulunamadı — Yaşama Sanatı",
};

/**
 * 404.
 *
 * DENETİMDE ÇIKAN İKİ SORUN (docs/AWWWARDS-90-BLOCKERS.md A10):
 *
 *  1. Kendi paleti vardı (#F3EFE6, #E0A878, #C9875B, #F4EFE4 elle yazılmış) ve
 *     sitenin hiçbir yerinde olmayan `rounded-full` hap düğmeler kullanıyordu.
 *     Sayfa başka bir siteden gelmiş gibi duruyordu. Renkler Faz 1'de token'a
 *     bağlandı; düğmeler artık sitenin kendi `BorderedButton` dilini kullanıyor.
 *
 *  2. NavBar ve Footer YOKTU. 404'e düşen kullanıcının iki bağlantı dışında
 *     hiçbir çıkışı kalmıyordu — menüye, programlara, iletişime erişemiyordu.
 *     İkisi de eklendi.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-deep font-sans text-cream selection:bg-cream selection:text-deep">
      <NavBar />
      <main
        id="main-content"
        className="relative flex min-h-[76svh] flex-col items-center justify-center overflow-hidden px-6 py-32 text-center"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_30%,rgba(67,103,84,0.28),transparent_55%)]"
        />
        <p className="text-kicker font-mono font-medium tracking-[0.34em] text-copper-text uppercase">
          404 — Kayıp bir patika
        </p>
        <h1 className="mt-6 max-w-[18ch] font-serif text-display-m font-normal leading-[1.04] tracking-[-0.015em] text-paper">
          Aradığın sayfa <span className="italic">burada değil.</span>
        </h1>
        <p className="mt-6 max-w-[42ch] text-body-lg font-light text-cream/80">
          Bazı yollar kapanır ki yenileri açılsın. Seni tanıdık bir başlangıca
          götürelim.
        </p>
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <Link href="/">
            <BorderedButton className="inline-flex cursor-pointer items-center gap-4 px-6 py-4 text-sm text-white [&_path]:[stroke:white] [&_svg]:[stroke:white]">
              Ana Sayfa
              <NavigateSVG fill={ink.white} className="mr-2.5 size-2.5" />
            </BorderedButton>
          </Link>
          <Link
            href="/programlar"
            className="text-sm font-light text-cream/80 underline decoration-copper/50 underline-offset-8 transition-colors duration-200 hover:text-white hover:decoration-copper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)] motion-reduce:transition-none"
          >
            Programları İncele
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
