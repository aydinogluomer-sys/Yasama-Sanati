import NavBar from "@/components/Client/NavBar";
import SustainableRetreat from "@/components/Client/SustainableRetreat";
import ElementisStory from "@/sections/ElementisStory";
import WellnessSanctuary from "@/sections/WellnessSanctuary";
import Footer from "@/sections/Footer/Server";
import Form from "@/sections/Form";
import Innovation from "@/components/Client/Innovation";
import Hero from "@/sections/Hero";
import Introduction from "@/sections/Introduction";
import SectionSeam from "@/components/Client/SectionSeam";
import ScrollMeridian from "@/components/Client/ScrollMeridian";
import SignatureTypeScene from "@/components/Client/SignatureTypeScene";

export default function Home() {
  return (
    <main>
      <ScrollMeridian />
      <Hero />
      <Introduction />
      <SectionSeam from="#2b3530" to="#30493D" />
      <WellnessSanctuary />
      <SectionSeam from="#30493D" to="#2b3530" />
      <Innovation />
      <SectionSeam from="#2b3530" to="#222B27" />
      <SignatureTypeScene />
      <SectionSeam from="#222B27" to="#F3EFE6" />
      <ElementisStory />
      <SectionSeam from="#F3EFE6" to="#222B27" />
      <SustainableRetreat />
      <SectionSeam from="#30493D" to="#CED1BF" />
      <Form />
      <Footer />
      <NavBar />
    </main>
  );
}
