import Image from "next/image";
import FormImage from "@/public/FormImage.png";
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
    <section aria-labelledby="form-title" className="flex flex-col bg-[#CED1BF] md:grid md:grid-cols-2" id="on-kayit">
      <ParallaxContainer parallaxAmount={20}>
        <Image src={FormImage} alt="Yaşama Sanatı'nda birebir görüşme için hazırlanmış huzurlu alan" className="h-auto w-full" />
      </ParallaxContainer>
      <div className="col-start-2 flex flex-col items-center justify-center">
        <FormContainer>
          <h2 id="form-title" className="w-full text-24 font-light leading-tight md:text-30">
            İlk Adımı At
          </h2>
          <div className="mt-6 mb-10 max-w-[42ch] text-base leading-relaxed text-[#2b3530]/80 md:text-lg">
            Kısa bir ön kayıt bırak; 48 saat içinde seni arayalım. Sana uygun programı ve tempoyu birlikte netleştirelim.
          </div>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                <Input type="tel" name="telefon" placeholder="Telefon numaranızı yazın" required />
              </div>
            </Label>
            <Label label="Şehir">
              <Select options="cities" name="sehir" />
            </Label>
          </div>
          <div className="mt-10 space-y-5 text-sm text-[#2b3530] md:text-base">
            <p>Hangi alanlar ilgini çekiyor?</p>
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => (
                <Checkbox key={category} name="ilgi_alanlari" value={category}>
                  {category}
                </Checkbox>
              ))}
            </div>
          </div>
          <Checkbox className="mt-8-75" required={true} name="kvkk_onay" value="true">
            Kişisel verilerimin{" "}
            <Link href="/kvkk" className="underline-[#2b3530] underline">
              KVKK Aydınlatma Metni
            </Link>{" "}
            kapsamında işlenmesini kabul ediyorum.
          </Checkbox>
          <div className="mt-6 text-xs text-[#2b3530]/70">
            Bilgilerin yalnızca seninle iletişim kurmak için kullanılır; üçüncü kişilerle paylaşılmaz.
          </div>
          <SubmitButton />
        </FormContainer>
      </div>
    </section>
  );
}
