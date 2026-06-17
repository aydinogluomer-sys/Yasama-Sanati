import { Fragment } from "react";
import ResponsiveMaskText from "@/components/Client/ResponsiveMaskTextVariant";
import MaskText from "@/components/Server/MaskText";
import SectionTitle from "@/components/Server/SectionTitle";
import IntroductionImage from "@/public/Introduction.png";
import * as motion from "motion/react-client";
import Image from "next/image";
import ResponsiveImage from "@/components/Client/ResponsiveImage";

export default function IntroductionServer() {
  return (
    <div className="grid grid-rows-[auto_auto_auto] gap-y-12 bg-[#2B3530] px-3-75 pt-42-5 pb-35 text-[#D1CCBF] md:grid-cols-[1fr_1.9fr] md:grid-rows-[auto_auto] md:gap-y-32 md:px-15 md:pt-56-25 md:pb-50">
      <motion.div className="mb-2 md:col-span-2 md:col-start-2 md:mb-0">
        <ResponsiveImage parallaxAmount={8}>
          <Image
            src={IntroductionImage}
            alt="introduction-image"
            className="w-full object-cover max-md:aspect-[1.18] md:h-auto"
          />
        </ResponsiveImage>
      </motion.div>

      <SectionTitle className="md:col-start-1 md:row-start-2">
        Tanışma
      </SectionTitle>

      <div className="flex flex-col gap-12 md:col-span-2 md:col-start-2 md:gap-20">
        <ResponsiveMaskText
          mobile={[
            <Fragment key="m-1">Yaşama Sanatı'na</Fragment>,
            <Fragment key="m-2">hoş geldin. Burası;</Fragment>,
            <Fragment key="m-3">nefesin, enerjinin ve</Fragment>,
            <Fragment key="m-4">
              zihnin <span className="text-[#ca7d57]">tek bir bütün</span>
            </Fragment>,
            <Fragment key="m-5">olarak ele alındığı, altı</Fragment>,
            <Fragment key="m-6">köklü disiplini aynı çatı</Fragment>,
            <Fragment key="m-7">altında buluşturan bir</Fragment>,
            <Fragment key="m-8">şifa ve eğitim akademisi.</Fragment>,
          ]}
          desktop={[
            <Fragment key="d-1">Yaşama Sanatı'na hoş geldin.</Fragment>,
            <Fragment key="d-2">
              Burası; nefesin, enerjinin ve zihnin
            </Fragment>,
            <Fragment key="d-3">
              <span className="text-[#ca7d57]">tek bir bütün</span> olarak ele alındığı,
            </Fragment>,
            <Fragment key="d-4">
              altı köklü disiplini aynı çatı altında
            </Fragment>,
            <Fragment key="d-5">
              buluşturan bir şifa ve eğitim
            </Fragment>,
            <Fragment key="d-6">
              akademisi.
            </Fragment>,
          ]}
          className="text-24 [line-height:1] md:text-40 [&>:first-child]:indent-23"
        />

        <MaskText
          lines={[
            <Fragment key="l-1">Bütünsel yaklaşımımız; zihinsel,</Fragment>,
            <Fragment key="l-2">bedensel ve enerjetik düzeyleri</Fragment>,
            <Fragment key="l-3">
              birlikte ele alır. Amaç semptomu
            </Fragment>,
            <Fragment key="l-4">
              bastırmak değil, dengenin yeniden
            </Fragment>,
            <Fragment key="l-5">
              kurulmasına alan açmaktır.
            </Fragment>,
          ]}
          className="text-base [line-height:1.3] font-normal md:text-lg"
        />
      </div>
    </div>
  );
}
