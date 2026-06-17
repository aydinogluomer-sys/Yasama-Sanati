import React from "react";
import SubPageLayout from "@/components/Server/SubPageLayout";

export default function SustainabilityPage() {
  return (
    <SubPageLayout
      title="Sürdürülebilirlik"
      description="Sürdürülebilir ve tatmin edici bir gelecek için yaşam tarzı devrimi"
    >
      <div className="max-w-5xl mx-auto space-y-24">
        {/* Mission & Vision Section */}
        <section id="mission-vision" className="space-y-12">
          <h2 className="text-3xl md:text-52 font-light text-white border-b border-[#ced1bf]/15 pb-4">
            Misyonumuz & Vizyonumuz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-light text-white">Vizyonumuz</h3>
              <p className="text-base font-light leading-relaxed text-[#ced1bf]/80">
                Sosyal ve duygusal açıdan bilinçli bir yaşama tutkuyla bağlı, küresel bir topluluğa ilham vermek. Zihin, beden ve ruhun uyumlu bir denge içinde geliştiği, destekleyici ortamlar ve birbirimizle ve doğal dünyayla kurulan derin bağlarla beslenen bir dünya hayal ediyoruz.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-light text-white">Misyonumuz</h3>
              <p className="text-base font-light leading-relaxed text-[#ced1bf]/80">
                Doğanın uyumunu yenilikçi yaşam tasarımlarıyla harmanlayarak, esenlik ve sağlığa odaklanan yeni bir lüks yaşam tarzı çağını başlatmayı amaçlıyoruz. En son teknolojiyi kullanan çözümler aracılığıyla, esenliği, güvenliği ve zamansız zarafeti besleyen ortamlar yaratıyor; zihin, beden, ruh ve topluluk arasındaki bağları güçlendiriyoruz.
              </p>
            </div>
          </div>
        </section>

        {/* Our Commitment Section */}
        <section id="our-comitment" className="space-y-12">
          <h2 className="text-3xl md:text-52 font-light text-white border-b border-[#ced1bf]/15 pb-4">
            Taahhüdümüz
          </h2>
          <div className="space-y-6 text-lg font-light leading-relaxed text-[#ced1bf]/80">
            <p>
              Ortaklık, topluluk, sürdürülebilirlik ve çevre sağlığına inanıyor, ayrıcalıklı hizmet ve sürdürülebilirlik aracılığıyla hayatları zenginleştiriyoruz. Zihin, beden ve ruhun geliştiği uyumlu bir dünya yaratarak, tatmin kavramını maddi başarının ötesinde yeniden tanımlıyoruz.
            </p>
            <p>
              Yenilikçi tasarımımız, doğa ve teknolojiyi harmanlayarak sosyal ve duygusal esenliğe, genel sağlığı optimize eden ve sınırsız olasılıkların kapılarını açan dünya standartlarında tesislere ve programlara öncelik verir.
            </p>
          </div>
        </section>

        {/* Our Pillars Section */}
        <section id="our-pillars" className="space-y-12 pb-12">
          <h2 className="text-3xl md:text-52 font-light text-white border-b border-[#ced1bf]/15 pb-4">
            Temel Direklerimiz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 space-y-4">
              <h3 className="text-xl font-medium text-white">Esenlik (Wellness)</h3>
              <p className="text-base font-light leading-relaxed text-[#ced1bf]/70">
                Fiziksel, zihinsel ve ruhsal sağlığı besleyen kapsamlı bir esenlik yaklaşımını benimsiyoruz. Dünya standartlarında esenlik tesislerine ve programlarına erişim sağlayarak eğitim ve destek yoluyla sağlıklı yaşam tarzlarını teşvik ediyoruz. Ortamımız, bütünsel sağlığa bağlı canlı bir topluluğu besleyerek rahatlama, farkındalık (mindfulness) ve genel esenliği destekler.
              </p>
            </div>
            
            <div className="p-6 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 space-y-4">
              <h3 className="text-xl font-medium text-white">İnovasyon (Innovation)</h3>
              <p className="text-base font-light leading-relaxed text-[#ced1bf]/70">
                İnovasyon, ELEMENTIS deneyimini sürekli olarak geliştirmemiz için temel taşımızdır. Sektörün önde gelen uzmanlarıyla iş birliğini destekliyor, yaratıcılığı teşvik ediyor ve ileriye dönük bir zihniyeti benimsiyoruz. En son teknoloji ve çözümleri uygulayarak, her zaman sektör trendlerinin ve gelişmelerinin ön saflarında yer alan, gerçekten benzersiz bir yaşam tarzı yaratıyoruz.
              </p>
            </div>
            
            <div className="p-6 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 space-y-4">
              <h3 className="text-xl font-medium text-white">Doğa (Nature)</h3>
              <p className="text-base font-light leading-relaxed text-[#ced1bf]/70">
                Çevreyle olan derin bağımızı önceliklendiriyor ve doğayla derin bir bağ geliştiriyoruz. Sürdürülebilir uygulamalar ve sorumlu kaynak yönetimi yoluyla doğal güzelliği korumaya odaklanıyoruz. Doğayı topluluk tasarımımıza ve geliştirmelerimize entegre ederek, yaşam tarzımızı doğal çevreyle uyumlu bir şekilde harmanlıyoruz.
              </p>
            </div>
            
            <div className="p-6 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 space-y-4">
              <h3 className="text-xl font-medium text-white">Topluluk (Community)</h3>
              <p className="text-base font-light leading-relaxed text-[#ced1bf]/70">
                Doğa ile sürdürülebilir bir uyum içinde, kişisel sağlık ve esenliğe adanmışlık yoluyla daha iyi bir gelecek yaratmanın yolunun sofistike inovasyondan geçtiğine inanan ve değerlerimizi paylaşan bireyleri bir araya getiriyoruz. Amacımız, ELEMENTIS'in sürekli gelişimini destekleyen ve vizyonumuzu gerçekleştirmemize yardımcı olan, gelişen bir topluluk oluşturmaktır.
              </p>
            </div>
          </div>
        </section>
      </div>
    </SubPageLayout>
  );
}
