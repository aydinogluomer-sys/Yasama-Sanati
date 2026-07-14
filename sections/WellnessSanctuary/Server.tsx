import Image from "next/image";
import { Fragment } from "react";
import WellnessSanctuaryImage from "@/public/WellnessSanctuaryImage.jpg";
import ResponsiveMaskText from "@/components/Client/ResponsiveMaskTextVariant";
import EditorialSectionTitle from "@/components/Server/EditorialSectionTitle";
import MaskText from "@/components/Server/MaskText";
import StyledLink from "@/components/Server/StyledLink";
import ResponsiveImage from "@/components/Client/ResponsiveImage";
export default function WellnessSanctuary() {
  const textLines = {
    desktop: [
      <Fragment key="desktop-1">
        <span className="text-[#ca7d57]">Kadim bilgelik</span>, çağdaş
      </Fragment>,
      <Fragment key="desktop-2">yöntem ve sen; hepsi</Fragment>,
      <Fragment key="desktop-3">aynı seansta buluşur</Fragment>,
    ],
    mobile: [
      <Fragment key="mobile-1">
        <span className="text-[#ca7d57]">Kadim bilgelik</span>, çağdaş
      </Fragment>,
      <Fragment key="mobile-2">yöntem ve sen; hepsi</Fragment>,
      <Fragment key="mobile-3">aynı seansta buluşur</Fragment>,
    ],
  };

  return (
    <section aria-label="Yaklaşımımız" className="flex flex-col bg-[#30493D] text-[#D1CCBF] md:grid md:grid-cols-2" id="yaklasimimiz">
      <ResponsiveImage parallaxAmount={20}>
        <Image
          src={WellnessSanctuaryImage}
          alt="Kişiye özel yaklaşımı temsil eden dingin bir iç mekân"
          className="h-auto w-full"
        />
      </ResponsiveImage>
      <div className="flex flex-col justify-center px-3-75 py-40 md:py-0">
        <div className="flex max-w-[38rem] flex-col gap-12 md:ml-24 md:mr-16 md:w-fit md:gap-16 xl:ml-36">
          <EditorialSectionTitle index="02">Yaklaşımımız</EditorialSectionTitle>
          <ResponsiveMaskText
            {...textLines}
            className="font-serif font-normal text-display-s tracking-[-0.01em] text-wrap"
          />
          <MaskText
            lines={[
              <>Her yolculuk kısa bir ön görüşmeyle</>,
              <>başlar. İhtiyacını birlikte haritalar,</>,
              <>sana uygun disiplini ve tempoyu</>,
              <>birlikte seçeriz. Hazır şablon yok;</>,
              <>senin ritmin var.</>,
            ]}
            className="text-lg [line-height:1.3] font-normal"
          />
          <StyledLink href="/programlar">
            Programları Keşfet
          </StyledLink>
        </div>
      </div>
    </section>
  );
}
