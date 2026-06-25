import ResponsiveMaskText from "@/components/Client/ResponsiveMaskTextVariant";
import EditorialSectionTitle from "@/components/Server/EditorialSectionTitle";
import HandwritingMark from "@/components/Client/HandwritingMark";
import StyledLink from "@/components/Server/StyledLink";
import { Fragment } from "react";

export default function ElementisStoryServer() {
  const textLines = {
    mobile: [
      <Fragment key="m-1">Bu akademi, yıllar içinde ayrı</Fragment>,
      <Fragment key="m-2">ayrı öğrenilen disiplinlerin</Fragment>,
      <Fragment key="m-3">
        <span className="text-[#ca7d57] font-serif italic">tek bir soruda</span> birleşmesiyle
      </Fragment>,
      <Fragment key="m-4">doğdu: insan kendine</Fragment>,
      <Fragment key="m-5">nasıl geri döner?</Fragment>,
    ],
    desktop: [
      <Fragment key="d-1">Bu akademi, yıllar içinde ayrı</Fragment>,
      <Fragment key="d-2">ayrı öğrenilen disiplinlerin</Fragment>,
      <Fragment key="d-3">
        <span className="text-[#ca7d57] font-serif italic">tek bir soruda</span> birleşmesiyle
      </Fragment>,
      <Fragment key="d-4">doğdu: insan kendine</Fragment>,
      <Fragment key="d-5">nasıl geri döner?</Fragment>,
    ],
  };
  return (
    <>
      <EditorialSectionTitle index="04" tone="dark" className="md:col-span-3">
        Yaşama Sanatı Hikayesi
      </EditorialSectionTitle>
      <div className="text-[#2B3530] max-md:mt-12 md:col-span-6 md:col-start-6">
        <div className="relative inline-block">
          <ResponsiveMaskText
            {...textLines}
            className="font-serif font-normal text-display-s tracking-[-0.01em] text-wrap [&_span]:text-[#A85F33] [&>:first-child]:indent-23"
          />
          <HandwritingMark
            trigger="inView"
            className="mt-3 h-3 w-[min(60vw,22rem)] md:h-4"
            color="#B06A3F"
          />
        </div>
        <div className="mt-12 flex flex-col gap-1 max-md:mb-16 md:gap-4">
          <StyledLink href="/the-story" arrowFill="#2B3530" underlineColor="#C9875B">
            Hikayenin Tamamı
          </StyledLink>
          <StyledLink href="/egitmenler" arrowFill="#2B3530" underlineColor="#C9875B">
            Eğitmenlerle Tanış
          </StyledLink>
        </div>
      </div>
    </>
  );
}
