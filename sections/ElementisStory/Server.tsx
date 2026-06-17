import ResponsiveMaskText from "@/components/Client/ResponsiveMaskTextVariant";
import SectionTitle from "@/components/Server/SectionTitle";
import StyledLink from "@/components/Server/StyledLink";
import { Fragment } from "react";

export default function ElementisStoryServer() {
  const textLines = {
    mobile: [
      <Fragment key="m-1">Bu akademi, yıllar içinde ayrı</Fragment>,
      <Fragment key="m-2">ayrı öğrenilen disiplinlerin</Fragment>,
      <Fragment key="m-3">
        <span className="text-[#ca7d57]">tek bir soruda</span> birleşmesiyle
      </Fragment>,
      <Fragment key="m-4">doğdu: insan kendine</Fragment>,
      <Fragment key="m-5">nasıl geri döner?</Fragment>,
    ],
    desktop: [
      <Fragment key="d-1">Bu akademi, yıllar içinde ayrı</Fragment>,
      <Fragment key="d-2">ayrı öğrenilen disiplinlerin</Fragment>,
      <Fragment key="d-3">
        <span className="text-[#ca7d57]">tek bir soruda</span> birleşmesiyle
      </Fragment>,
      <Fragment key="d-4">doğdu: insan kendine</Fragment>,
      <Fragment key="d-5">nasıl geri döner?</Fragment>,
    ],
  };
  return (
    <>
      <SectionTitle className="md:col-span-3">Yaşama Sanatı Hikayesi</SectionTitle>
      <div className="max-md:mt-12 md:col-span-6 md:col-start-6">
        <ResponsiveMaskText
          {...textLines}
          className="text-24 [line-height:1] md:text-40 [&>:first-child]:indent-23"
        />
        <div className="mt-12 flex flex-col gap-1 max-md:mb-16 md:gap-4">
          <StyledLink href="/the-story">
            Hikayenin Tamamı
          </StyledLink>
          <StyledLink href="/egitmenler">
            Eğitmenlerle Tanış
          </StyledLink>
        </div>
      </div>
    </>
  );
}
