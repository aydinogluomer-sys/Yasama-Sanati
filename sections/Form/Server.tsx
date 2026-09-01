import Image from "next/image";
import FormImage from "@/public/FormImage.jpg";
import ParallaxContainer from "@/components/Client/ParallaxContainer";
import Input from "@/components/Server/Input";
import Checkbox from "@/components/Client/Checkbox";
import Select from "@/components/Server/Select";
import Label from "@/components/Server/Label";
import Link from "next/link";
import FormContainer from "@/components/Client/FormContainer";
import SubmitButton from "@/components/Client/SubmitButton";

export default function FormServer() {
  const categories = [
    "Nefes Koçluğu",
    "Reiki Enerji Şifası",
    "Meridyen Terapi",
    "Mucizeler Kursu",
    "Hipnoterapi",
    "Yaşam Koçluğu",
  ];

  return (
    <section aria-labelledby="form-title" className="flex flex-col bg-cream md:grid md:grid-cols-2" id="on-kayit">
      <ParallaxContainer parallaxAmount={20} className="md:h-full">
        <Image src={FormImage}
          sizes="(min-width: 768px) 50vw, 100vw" alt="Yaşama Sanatı'nda birebir görüşme için hazırlanmış huzurlu alan" className="h-auto w-full md:h-full md:object-cover" />
      </ParallaxContainer>
      <div className="col-start-2 flex flex-col items-center justify-center">
        <FormContainer>
          <h2 id="form-title" className="w-full text-24 font-light leading-tight md:text-30">
            Ücretsiz Ön Görüşme
          </h2>
          <div className="mt-8 mb-14 max-w-[42ch] text-base leading-relaxed text-deep/80 md:text-lg">
            İhtiyacını ve temponu kısaca paylaş; nereden başlayacağını ön görüşmede birlikte belirleyelim.
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Label label="Ad">
                <Input type="text" name="ad" placeholder="Adını yaz" required />
              </Label>
              <Label label="Soyad">
                <Input type="text" name="soyad" placeholder="Soyadını yaz" required />
              </Label>
            </div>
            <Label label="E-posta Adresi">
              <Input type="email" name="eposta" placeholder="E-posta adresini yaz" required />
            </Label>
            <Label label="Telefon Numarası">
              <div className="flex -space-x-4 md:-space-x-6">
                <Select options="dial code" name="telefon_kod" />
                <Input type="tel" name="telefon" aria-label="Telefon numarası" placeholder="Telefon numaranızı yazın" required />
              </div>
            </Label>
            <Label label="Şehir">
              <Select options="cities" name="sehir" />
            </Label>
          </div>
          <div className="mt-14 space-y-6 text-sm text-deep md:text-base">
            <p>Hangi alanlar ilgini çekiyor?</p>
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => (
                <Checkbox key={category} name="ilgi_alanlari" value={category}>
                  {category}
                </Checkbox>
              ))}
            </div>
          </div>
          <Checkbox className="mt-12" required={true} name="kvkk_onay" value="true">
            Kişisel verilerimin{" "}
            <Link href="/kvkk" className="underline-deep underline">
              KVKK Aydınlatma Metni
            </Link>{" "}
            kapsamında işlenmesini kabul ediyorum.
          </Checkbox>
          <div className="mt-8 text-xs text-deep/85">
            Ayrıntılar KVKK Aydınlatma Metni’nde yer alır.
          </div>
          <SubmitButton />
        </FormContainer>
      </div>
    </section>
  );
}
