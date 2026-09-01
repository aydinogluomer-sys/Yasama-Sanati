import type { Metadata } from "next";
import React from "react";
import SubPageLayout from "@/components/Server/SubPageLayout";
import {
  LegalShell,
  LegalSection,
  LegalSubheading,
  type LegalTocItem,
} from "@/components/Server/LegalPage";

export const metadata: Metadata = {
  title: "Politikalar ve Şartlar | Yaşama Sanatı",
  description:
    "Gizlilik politikası, çerez kullanımı ve kullanım şartlarına ilişkin bilgilendirme.",
  alternates: { canonical: "/privacy-terms" },
  openGraph: {
    title: "Politikalar ve Şartlar | Yaşama Sanatı",
    description:
      "Gizlilik politikası, çerez kullanımı ve kullanım şartlarına ilişkin bilgilendirme.",
    url: "/privacy-terms",
  },
};

const TOC: LegalTocItem[] = [
  { id: "yorumlama-tanimlar", title: "Yorumlama ve Tanımlar" },
  { id: "toplama-kullanma", title: "Kişisel Verilerinizin Toplanması ve Kullanılması" },
  { id: "cerezler", title: "Çerezler ve Takip Teknolojileri" },
  { id: "guvenlik-irtibat", title: "Verilerinizin Güvenliği ve İrtibat" },
];

export default function PrivacyTermsPage() {
  return (
    <SubPageLayout
      title="Politikalar ve Şartlar"
      description="Gizlilik Politikası ve Kullanım Şartları"
    >
      <LegalShell
        updatedAt="23 Ağustos 2024"
        toc={TOC}
        intro={
          <>
            Bu Gizlilik Politikası, Hizmeti kullandığınızda bilgilerinizin
            toplanması, kullanılması ve ifşa edilmesine ilişkin politika ve
            prosedürlerimizi açıklar; gizlilik haklarınız ve yasaların sizi nasıl
            koruduğu hakkında bilgi verir. Kişisel verilerinizi Hizmeti sağlamak ve
            geliştirmek amacıyla kullanırız. Hizmeti kullanarak, bilgilerin bu
            Gizlilik Politikasına uygun olarak toplanmasını ve kullanılmasını kabul
            etmiş olursunuz.
          </>
        }
      >
        <LegalSection
          id="yorumlama-tanimlar"
          index="01"
          title="Yorumlama ve Tanımlar"
        >
          <LegalSubheading>Yorumlama</LegalSubheading>
          <p>
            İlk harfi büyük olan kelimeler, aşağıdaki koşullar altında tanımlanan
            anlamlara sahiptir. Aşağıdaki tanımlar, tekil veya çoğul olarak görünüp
            görünmediklerine bakılmaksızın aynı anlama gelecektir.
          </p>
          <LegalSubheading>Tanımlar</LegalSubheading>
          <ul className="list-disc space-y-2 pl-6 text-sm">
            <li>
              <strong>Hesap:</strong> Hizmetimize veya Hizmetimizin bölümlerine
              erişmeniz için sizin adınıza oluşturulan benzersiz bir hesaptır.
            </li>
            {/* TODO (hukuk): tescilli ticaret unvanı, merkez adresi, vergi dairesi ve numarası
                buraya eklenmeli. Aşağıdaki ticari ad doğrulanmış (PRODUCT.md), tescil
                bilgileri değil — uydurulmadı, eksik bırakıldı. */}
            <li>
              <strong>Şirket:</strong> Yaşama Sanatı (bu Sözleşmede
              &quot;Şirket&quot;, &quot;Biz&quot;, &quot;Bize&quot; veya
              &quot;Bizim&quot; olarak anılacaktır).
            </li>
            <li>
              <strong>Hizmet:</strong> Web sitesini ifade eder (yasamasanati.com).
            </li>
            <li>
              <strong>Ülke:</strong> Türkiye&apos;yi ifade eder.
            </li>
            <li>
              <strong>Kişisel Veri:</strong> Kimliği belirlenmiş veya belirlenebilir
              bir gerçek kişiye ilişkin her türlü bilgidir.
            </li>
          </ul>
        </LegalSection>

        <LegalSection
          id="toplama-kullanma"
          index="02"
          title="Kişisel Verilerinizin Toplanması ve Kullanılması"
        >
          <p>
            Hizmetimizi kullanırken, sizinle iletişim kurmak veya kimliğinizi
            belirlemek için kullanılabilecek belirli kişisel olarak tanımlanabilir
            bilgileri bize sağlamanızı isteyebiliriz. Bu bilgiler aşağıdakileri
            içerebilir, ancak bunlarla sınırlı değildir:
          </p>
          <ul className="list-disc space-y-1 pl-6 text-sm">
            <li>E-posta adresi</li>
            <li>Adı ve soyadı</li>
            <li>Telefon numarası</li>
            <li>
              Kullanım Verileri (otomatik olarak toplanan tarayıcı türü, IP adresi,
              ziyaret saati ve sayfaları)
            </li>
          </ul>
        </LegalSection>

        <LegalSection id="cerezler" index="03" title="Çerezler ve Takip Teknolojileri">
          <p>
            Hizmetimizdeki aktiviteyi izlemek ve belirli bilgileri depolamak için
            Çerezler ve benzeri takip teknolojilerini kullanıyoruz. Kullanılan takip
            teknolojileri, bilgileri toplamak/izlemek ve Hizmetimizi geliştirmek ve
            analiz etmek amacıyla kullanılan web işaretçileri (beacons), etiketler
            (tags) ve komut dosyalarıdır (scripts).
          </p>
          <LegalSubheading>Kullandığımız Çerez Türleri</LegalSubheading>
          <ul className="list-disc space-y-2 pl-6 text-sm">
            <li>
              <strong>Oturum Çerezleri (Session Cookies):</strong> Sadece web
              tarayıcınızı kapatana kadar saklanır ve web sitesindeki temel işlevleri
              yerine getirmek için gereklidir.
            </li>
            <li>
              <strong>Kalıcı Çerezler (Persistent Cookies):</strong> Tarayıcı
              kapatılsa bile cihazınızda kalır. Dil tercihlerinizi veya oturum
              detaylarınızı hatırlamak gibi size daha kişisel bir deneyim sunmak
              amacıyla kullanılır.
            </li>
          </ul>
        </LegalSection>

        <LegalSection
          id="guvenlik-irtibat"
          index="04"
          title="Verilerinizin Güvenliği ve İrtibat"
        >
          <p>
            Kişisel Verilerinizin güvenliği bizim için önemlidir, ancak İnternet
            üzerinden hiçbir iletim yönteminin veya elektronik depolama yönteminin
            %100 güvenli olmadığını unutmayın. Kişisel Verilerinizi korumak için
            ticari olarak kabul edilebilir araçları kullanmaya çalışsak da, mutlak
            güvenliğini garanti edemeyiz.
          </p>
          <div className="mt-8 border-t border-cream/15 pt-6">
            <LegalSubheading>Bizimle İletişime Geçin</LegalSubheading>
            <p className="mt-3 text-sm">
              Bu Gizlilik Politikası hakkında herhangi bir sorunuz varsa, bizimle
              iletişime geçebilirsiniz:
            </p>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 font-mono text-3xs uppercase tracking-[0.16em] text-cream/70">
                  E-posta
                </dt>
                <dd className="text-cream/85">info@yasamasanati.com</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 font-mono text-3xs uppercase tracking-[0.16em] text-cream/70">
                  Telefon
                </dt>
                <dd className="text-cream/85">+90 532 789 37 53</dd>
              </div>
            </dl>
          </div>
        </LegalSection>
      </LegalShell>
    </SubPageLayout>
  );
}
