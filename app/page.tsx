import NavBar from "@/components/Client/NavBar";
import SustainableRetreat from "@/components/Client/SustainableRetreat";
import AkademiHikayesi from "@/sections/AkademiHikayesi";
import WellnessSanctuary from "@/sections/WellnessSanctuary";
import Footer from "@/sections/Footer/Server";
import Form from "@/sections/Form";
import Innovation from "@/components/Client/Innovation";
import Hero from "@/sections/Hero";
import Introduction from "@/sections/Introduction";
import SectionSeam from "@/components/Client/SectionSeam";
import ScrollMeridian from "@/components/Client/ScrollMeridian";
import SignatureTypeScene from "@/components/Client/SignatureTypeScene";
import type { Metadata } from "next";
import { palette } from "@/utils/palette";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <NavBar />
      <main id="main-content">
        <ScrollMeridian />
        <Hero />
        <Introduction />
        <SectionSeam from={palette.deep} to={palette.warm} label="Yaklaşımımız" />
        <WellnessSanctuary />
        <SectionSeam from={palette.warm} to={palette.deep} label="Şifa Yolculuğu" />
        <Innovation />
        <SectionSeam from={palette.deep} to={palette.ink} label="Altı Disiplin" />
        <SignatureTypeScene />
        <SectionSeam from={palette.ink} to={palette.paper} label="Yaşama Sanatı Hikayesi" />
        <AkademiHikayesi />
        <SectionSeam from={palette.paper} to={palette.ink} label="Çalışma Alanları" />
        <SustainableRetreat />
        <SectionSeam from={palette.warm} to={palette.cream} label="Ön Görüşme" />
        <Form />
      </main>
      <Footer />
    </>
  );
}
