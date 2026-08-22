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
        <SectionSeam from="#2b3530" to="#30493D" label="Yaklaşımımız" />
        <WellnessSanctuary />
        <SectionSeam from="#30493D" to="#2b3530" label="Şifa Yolculuğu" />
        <Innovation />
        <SectionSeam from="#2b3530" to="#222B27" label="Altı Disiplin" />
        <SignatureTypeScene />
        <SectionSeam from="#222B27" to="#F3EFE6" label="Yaşama Sanatı Hikayesi" />
        <AkademiHikayesi />
        <SectionSeam from="#F3EFE6" to="#222B27" label="Çalışma Alanları" />
        <SustainableRetreat />
        <SectionSeam from="#30493D" to="#CED1BF" label="Ön Görüşme" />
        <Form />
      </main>
      <Footer />
    </>
  );
}
