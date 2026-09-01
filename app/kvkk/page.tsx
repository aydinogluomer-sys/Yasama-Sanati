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
  title: "KVKK ve Gizlilik | Yaşama Sanatı",
  description:
    "Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni ve veri işleme esaslarımız.",
  alternates: { canonical: "/kvkk" },
  openGraph: {
    title: "KVKK ve Gizlilik | Yaşama Sanatı",
    description:
      "Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni ve veri işleme esaslarımız.",
    url: "/kvkk",
  },
};

const TOC: LegalTocItem[] = [
  { id: "veri-sorumlusu", title: "Veri Sorumlusu" },
  { id: "islenen-veriler", title: "İşlenen Kişisel Verileriniz ve Toplama Yöntemleri" },
  { id: "islenme-amaci", title: "Kişisel Verilerin İşlenme Amacı ve Hukuki Sebepleri" },
  { id: "aktarim-saklama", title: "Kişisel Verilerin Aktarılması ve Saklanması" },
  { id: "haklariniz", title: "Haklarınız" },
];

export default function KVKKPage() {
  return (
    <SubPageLayout
      title="KVKK ve Gizlilik"
      description="Kişisel Verilerin Korunması Kanunu Aydınlatma Metni"
    >
      <LegalShell
        updatedAt="10 Haziran 2026"
        toc={TOC}
        intro={
          <>
            Yaşama Sanatı Akademisi olarak, kişisel verilerinizin güvenliği ve
            gizliliği hususuna azami hassasiyet göstermekteyiz. Bu aydınlatma
            metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;)
            kapsamında, web sitemiz üzerindeki ön başvuru formu aracılığıyla
            toplanan kişisel verilerinizin işlenme amaçları, hukuki sebepleri ve
            haklarınız konusunda sizi bilgilendirmek amacıyla hazırlanmıştır.
          </>
        }
      >
        <LegalSection id="veri-sorumlusu" index="01" title="Veri Sorumlusu">
          <p>
            KVKK uyarınca kişisel verileriniz, veri sorumlusu olarak{" "}
            <strong>Yaşama Sanatı Akademisi</strong> (İzmir, Türkiye) tarafından
            aşağıda açıklanan kapsamda işlenecektir.
          </p>
        </LegalSection>

        <LegalSection
          id="islenen-veriler"
          index="02"
          title="İşlenen Kişisel Verileriniz ve Toplama Yöntemleri"
        >
          <p>
            Web sitemizdeki ön kayıt formunu doldurarak bizimle paylaştığınız veya
            form gönderimi sırasında otomatik olarak kaydedilen aşağıdaki
            verileriniz işlenmektedir:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-sm">
            <li>
              <strong>Kimlik Bilgisi:</strong> Adınız ve soyadınız.
            </li>
            <li>
              <strong>İletişim Bilgisi:</strong> E-posta adresiniz ve telefon
              numaranız.
            </li>
            <li>
              <strong>Lokasyon Bilgisi:</strong> Yaşadığınız şehir.
            </li>
            <li>
              <strong>Tercih Bilgisi:</strong> İlgi duyduğunuz eğitim programları.
            </li>
            <li>
              <strong>Güvenlik ve Cihaz Bilgisi:</strong> Formun gönderildiği IP
              adresi, gönderim zamanı ve kaynak sayfa URL&apos;si.
            </li>
          </ul>
        </LegalSection>

        <LegalSection
          id="islenme-amaci"
          index="03"
          title="Kişisel Verilerin İşlenme Amacı ve Hukuki Sebepleri"
        >
          <p>
            Kişisel verileriniz aşağıdaki amaçlarla ve kanuni sebepler
            doğrultusunda işlenmektedir:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-sm">
            <li>
              <strong>Hizmet Ön Hazırlığı ve İletişim:</strong> Ön kayıt
              başvurunuzun alınması, size uygun eğitim ve seans tempomuzun
              planlanması amacıyla sizinle iletişime geçilmesi (KVKK m. 5/2-c:
              Sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması).
            </li>
            <li>
              <strong>Güvenlik ve Spam Önleme:</strong> Formun kötü niyetli botlar
              veya spam saldırıları tarafından suistimal edilmesini önlemek ve web
              sitemizin güvenliğini sağlamak amacıyla <strong>IP adresiniz</strong>{" "}
              işlenmektedir (KVKK m. 5/2-f: Veri sorumlusunun meşru menfaati).
            </li>
          </ul>
          {/* Kritik saklama süresi bilgisi — kutu değil, bakır dikey kural.
              Sayfadaki tek vurgu öğesi olduğu için ağırlığını koruyor. */}
          <div className="border-l-2 border-copper py-1 pl-5 text-sm text-copper-text">
            <strong>Kritik Bilgi:</strong> Güvenlik ve sahtecilik önleme amacıyla
            kaydedilen IP adresiniz, veritabanımızda en fazla 90 gün süreyle
            saklanır ve bu sürenin sonunda otomatik sistemler tarafından kalıcı
            olarak silinir (pruned).
          </div>
        </LegalSection>

        <LegalSection
          id="aktarim-saklama"
          index="04"
          title="Kişisel Verilerin Aktarılması ve Saklanması"
        >
          <p>
            Toplanan kişisel verileriniz, kesinlikle üçüncü şahıslarla, reklam
            ağlarıyla veya ticari kuruluşlarla paylaşılmaz ve satılmaz. Verileriniz,
            güvenliği uluslararası standartlarda sağlanan şifreli bulut altyapımızda
            (Supabase) saklanmaktadır. Veri tabanımıza erişim yetkileri sadece
            akademinin ilgili eğitim koordinatörleri ile sınırlandırılmıştır.
          </p>
        </LegalSection>

        <LegalSection id="haklariniz" index="05" title="Haklarınız">
          <p>
            KVKK&apos;nın 11. maddesi uyarınca bize başvurarak kişisel
            verilerinizin; işlenip işlenmediğini öğrenme, işlenmişse bilgi talep
            etme, işlenme amacını ve uygun kullanılıp kullanılmadığını öğrenme, yurt
            içinde aktarıldığı kişileri bilme, eksik veya yanlış işlenmişse
            düzeltilmesini isteme, silinmesini veya yok edilmesini talep etme
            haklarına sahipsiniz.
          </p>
          <div className="mt-8 border-t border-cream/15 pt-6">
            <LegalSubheading>İrtibat ve Başvuru</LegalSubheading>
            <p className="mt-3 text-sm">
              Haklarınızı kullanmak veya veri işleme süreçlerimiz hakkında bilgi
              almak için bizimle iletişime geçebilirsiniz:
            </p>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 font-mono text-3xs uppercase tracking-[0.16em] text-cream/70">
                  E-posta
                </dt>
                <dd className="text-cream/85">merhaba@yasamasanati.com</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 font-mono text-3xs uppercase tracking-[0.16em] text-cream/70">
                  Adres
                </dt>
                <dd className="text-cream/85">İzmir, Türkiye</dd>
              </div>
            </dl>
          </div>
        </LegalSection>
      </LegalShell>
    </SubPageLayout>
  );
}
