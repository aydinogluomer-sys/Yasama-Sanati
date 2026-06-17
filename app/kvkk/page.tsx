import React from "react";
import SubPageLayout from "@/components/Server/SubPageLayout";

export default function KVKKPage() {
  return (
    <SubPageLayout
      title="KVKK ve Gizlilik"
      description="Kişisel Verilerin Korunması Kanunu Aydınlatma Metni"
    >
      <div className="max-w-4xl mx-auto space-y-12 text-[#ced1bf]/80 font-light leading-relaxed">
        <p className="text-sm italic">Son güncelleme: 10 Haziran 2026</p>
        
        <p>
          Yaşama Sanatı Akademisi olarak, kişisel verilerinizin güvenliği ve gizliliği hususuna azami hassasiyet göstermekteyiz. Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında, web sitemiz üzerindeki ön başvuru formu aracılığıyla toplanan kişisel verilerinizin işlenme amaçları, hukuki sebepleri ve haklarınız konusunda sizi bilgilendirmek amacıyla hazırlanmıştır.
        </p>

        <hr className="border-[#ced1bf]/15" />

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light text-white">1. Veri Sorumlusu</h2>
          <p>
            KVKK uyarınca kişisel verileriniz, veri sorumlusu olarak <strong>Yaşama Sanatı Akademisi</strong> (İzmir, Türkiye) tarafından aşağıda açıklanan kapsamda işlenecektir.
          </p>
        </section>

        <hr className="border-[#ced1bf]/15" />

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light text-white">2. İşlenen Kişisel Verileriniz ve Toplama Yöntemleri</h2>
          <div className="space-y-3">
            <p>
              Web sitemizdeki ön kayıt formunu doldurarak bizimle paylaştığınız veya form gönderimi sırasında otomatik olarak kaydedilen aşağıdaki verileriniz işlenmektedir:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li><strong>Kimlik Bilgisi:</strong> Adınız ve soyadınız.</li>
              <li><strong>İletişim Bilgisi:</strong> E-posta adresiniz ve telefon numaranız.</li>
              <li><strong>Lokasyon Bilgisi:</strong> Yaşadığınız şehir.</li>
              <li><strong>Tercih Bilgisi:</strong> İlgi duyduğunuz eğitim programları.</li>
              <li><strong>Güvenlik ve Cihaz Bilgisi:</strong> Formun gönderildiği IP adresi, gönderim zamanı ve kaynak sayfa URL'si.</li>
            </ul>
          </div>
        </section>

        <hr className="border-[#ced1bf]/15" />

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light text-white">3. Kişisel Verilerin İşlenme Amacı ve Hukuki Sebepleri</h2>
          <div className="space-y-3">
            <p>
              Kişisel verileriniz aşağıdaki amaçlarla ve kanuni sebepler doğrultusunda işlenmektedir:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>
                <strong>Hizmet Ön Hazırlığı ve İletişim:</strong> Ön kayıt başvurunuzun alınması, size uygun eğitim ve seans tempomuzun planlanması amacıyla sizinle iletişime geçilmesi (KVKK m. 5/2-c: Sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması).
              </li>
              <li>
                <strong>Güvenlik ve Spam Önleme:</strong> Formun kötü niyetli botlar veya spam saldırıları tarafından suistimal edilmesini önlemek ve web sitemizin güvenliğini sağlamak amacıyla <strong>IP adresiniz</strong> işlenmektedir (KVKK m. 5/2-f: Veri sorumlusunun meşru menfaati).
              </li>
            </ul>
            <div className="p-4 bg-[#ca7d57]/10 rounded border border-[#ca7d57]/30 text-sm text-[#ca7d57] font-medium">
              💡 <strong>Kritik Bilgi:</strong> Güvenlik ve sahtecilik önleme amacıyla kaydedilen IP adresiniz, veritabanımızda en fazla 90 gün süreyle saklanır ve bu sürenin sonunda otomatik sistemler tarafından kalıcı olarak silinir (pruned).
            </div>
          </div>
        </section>

        <hr className="border-[#ced1bf]/15" />

        {/* Section 4 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light text-white">4. Kişisel Verilerin Aktarılması ve Saklanması</h2>
          <p>
            Toplanan kişisel verileriniz, kesinlikle üçüncü şahıslarla, reklam ağlarıyla veya ticari kuruluşlarla paylaşılmaz ve satılmaz. Verileriniz, güvenliği uluslararası standartlarda sağlanan şifreli bulut altyapımızda (Supabase) saklanmaktadır. Veri tabanımıza erişim yetkileri sadece akademinin ilgili eğitim koordinatörleri ile sınırlandırılmıştır.
          </p>
        </section>

        <hr className="border-[#ced1bf]/15" />

        {/* Section 5 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light text-white">5. Haklarınız</h2>
          <p>
            KVKK'nın 11. maddesi uyarınca bize başvurarak kişisel verilerinizin; işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, işlenme amacını ve uygun kullanılıp kullanılmadığını öğrenme, yurt içinde aktarıldığı kişileri bilme, eksik veya yanlış işlenmişse düzeltilmesini isteme, silinmesini veya yok edilmesini talep etme haklarına sahipsiniz.
          </p>
          <div className="p-6 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 space-y-2 mt-4">
            <h3 className="text-lg font-medium text-white">İrtibat ve Başvuru</h3>
            <p className="text-sm">Haklarınızı kullanmak veya veri işleme süreçlerimiz hakkında bilgi almak için bizimle iletişime geçebilirsiniz:</p>
            <ul className="list-none space-y-1 text-sm pt-2">
              <li><strong>E-posta:</strong> merhaba@yasamasanati.com</li>
              <li><strong>Adres:</strong> İzmir, Türkiye</li>
            </ul>
          </div>
        </section>
      </div>
    </SubPageLayout>
  );
}
