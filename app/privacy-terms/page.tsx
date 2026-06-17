import React from "react";
import SubPageLayout from "@/components/Server/SubPageLayout";

export default function PrivacyTermsPage() {
  return (
    <SubPageLayout
      title="Politikalar ve Şartlar"
      description="Gizlilik Politikası ve Kullanım Şartları"
    >
      <div className="max-w-4xl mx-auto space-y-12 text-[#ced1bf]/80 font-light leading-relaxed">
        <p className="text-sm italic">Son güncelleme: 23 Ağustos 2024</p>
        
        <p>
          Bu Gizlilik Politikası, Hizmeti kullandığınızda bilgilerinizin toplanması, kullanılması ve ifşa edilmesine ilişkin politika ve prosedürlerimizi açıklar; gizlilik haklarınız ve yasaların sizi nasıl koruduğu hakkında bilgi verir. Kişisel verilerinizi Hizmeti sağlamak ve geliştirmek amacıyla kullanırız. Hizmeti kullanarak, bilgilerin bu Gizlilik Politikasına uygun olarak toplanmasını ve kullanılmasını kabul etmiş olursunuz.
        </p>

        <hr className="border-[#ced1bf]/15" />

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light text-white">1. Yorumlama ve Tanımlar</h2>
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-white">Yorumlama</h3>
            <p>
              İlk harfi büyük olan kelimeler, aşağıdaki koşullar altında tanımlanan anlamlara sahiptir. Aşağıdaki tanımlar, tekil veya çoğul olarak görünüp görünmediklerine bakılmaksızın aynı anlama gelecektir.
            </p>
            <h3 className="text-lg font-medium text-white">Tanımlar</h3>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li><strong>Hesap:</strong> Hizmetimize veya Hizmetimizin bölümlerine erişmeniz için sizin adınıza oluşturulan benzersiz bir hesaptır.</li>
              <li><strong>Şirket:</strong> ELEMENTIS Development Group (bu Sözleşmede "Şirket", "Biz", "Bize" veya "Bizim" olarak anılacaktır).</li>
              <li><strong>Hizmet:</strong> Web sitesini ifade eder (elementis.co).</li>
              <li><strong>Ülke:</strong> Endonezya'yı ifade eder.</li>
              <li><strong>Kişisel Veri:</strong> Kimliği belirlenmiş veya belirlenebilir bir gerçek kişiye ilişkin her türlü bilgidir.</li>
            </ul>
          </div>
        </section>

        <hr className="border-[#ced1bf]/15" />

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light text-white">2. Kişisel Verilerinizin Toplanması ve Kullanılması</h2>
          <div className="space-y-3">
            <p>
              Hizmetimizi kullanırken, sizinle iletişim kurmak veya kimliğinizi belirlemek için kullanılabilecek belirli kişisel olarak tanımlanabilir bilgileri bize sağlamanızı isteyebiliriz. Bu bilgiler aşağıdakileri içerebilir, ancak bunlarla sınırlı değildir:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>E-posta adresi</li>
              <li>Adı ve soyadı</li>
              <li>Telefon numarası</li>
              <li>Kullanım Verileri (otomatik olarak toplanan tarayıcı türü, IP adresi, ziyaret saati ve sayfaları)</li>
            </ul>
          </div>
        </section>

        <hr className="border-[#ced1bf]/15" />

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light text-white">3. Çerezler ve Takip Teknolojileri</h2>
          <p>
            Hizmetimizdeki aktiviteyi izlemek ve belirli bilgileri depolamak için Çerezler ve benzeri takip teknolojilerini kullanıyoruz. Kullanılan takip teknolojileri, bilgileri toplamak/izlemek ve Hizmetimizi geliştirmek ve analiz etmek amacıyla kullanılan web işaretçileri (beacons), etiketler (tags) ve komut dosyalarıdır (scripts).
          </p>
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-white">Kullandığımız Çerez Türleri</h3>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li><strong>Oturum Çerezleri (Session Cookies):</strong> Sadece web tarayıcınızı kapatana kadar saklanır ve web sitesindeki temel işlevleri yerine getirmek için gereklidir.</li>
              <li><strong>Kalıcı Çerezler (Persistent Cookies):</strong> Tarayıcı kapatılsa bile cihazınızda kalır. Dil tercihlerinizi veya oturum detaylarınızı hatırlamak gibi size daha kişisel bir deneyim sunmak amacıyla kullanılır.</li>
            </ul>
          </div>
        </section>

        <hr className="border-[#ced1bf]/15" />

        {/* Section 4 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light text-white">4. Verilerinizin Güvenliği ve İrtibat</h2>
          <p>
            Kişisel Verilerinizin güvenliği bizim için önemlidir, ancak İnternet üzerinden hiçbir iletim yönteminin veya elektronik depolama yönteminin %100 güvenli olmadığını unutmayın. Kişisel Verilerinizi korumak için ticari olarak kabul edilebilir araçları kullanmaya çalışsak da, mutlak güvenliğini garanti edemeyiz.
          </p>
          <div className="p-6 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 space-y-2 mt-4">
            <h3 className="text-lg font-medium text-white">Bizimle İletişime Geçin</h3>
            <p className="text-sm">Bu Gizlilik Politikası hakkında herhangi bir sorunuz varsa, bizimle iletişime geçebilirsiniz:</p>
            <ul className="list-none space-y-1 text-sm pt-2">
              <li><strong>E-posta:</strong> info@elementis.co</li>
              <li><strong>Telefon:</strong> +62 823 4078 1817</li>
            </ul>
          </div>
        </section>
      </div>
    </SubPageLayout>
  );
}
