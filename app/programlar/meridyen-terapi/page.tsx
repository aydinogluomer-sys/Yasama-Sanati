import type { Metadata } from "next";
import { BreadcrumbSchema, CourseSchema } from "@/components/Server/StructuredData";
import AccreditationProof from "@/components/Server/AccreditationProof";
import React from "react";
import SubPageLayout from "@/components/Server/SubPageLayout";
import CourseDetailTemplate from "@/components/Server/CourseDetailTemplate";
import MeridianParallaxContainer from "@/components/meridian-3d/MeridianParallaxContainer";

export const metadata: Metadata = {
  title: "Meridyen Terapi Eğitimi | Yaşama Sanatı",
  description:
    "IECCERT onaylı meridyen terapi ve bütünsel kinesiyoloji uzmanlık programı; 8 hafta karma format.",
  alternates: { canonical: "/programlar/meridyen-terapi" },
  openGraph: {
    title: "Meridyen Terapi Eğitimi | Yaşama Sanatı",
    description:
      "IECCERT onaylı meridyen terapi ve bütünsel kinesiyoloji uzmanlık programı; 8 hafta karma format.",
    url: "/programlar/meridyen-terapi",
  },
};

export default function MeridyenTerapiPage() {
  const data = {
    duration: "8 Hafta",
    format: "Karma (Online Teorik + Yüz yüze Uygulama)",
    prerequisites: "Yok",
    certification: "IECCERT Onaylı Meridyen Terapi Uzmanlık Sertifikası",
    introTitle: "Bedenin Enerji Ağlarını Keşfedin",
    introText: "Meridyen Terapisi, vücudun yaşam enerjisinin aktığı gizli kanalları uyararak enerjisel tıkanıklıkları çözer. Bütünsel kinesiyoloji pratikleriyle zenginleştirilen bu programda, enerji dengesizliklerini teşhis etmeyi ve beden zihnine hücresel düzeyde şifa vermeyi öğreneceksiniz.",
    curriculum: [
      {
        title: "Modül 1: Geleneksel Çin Tıbbı ve Meridyen Teorisi",
        content: "Yin-Yang dengesi, beş element teorisi ve bedendeki 14 ana enerji kanalının yapısı.",
      },
      {
        title: "Modül 2: Bütünsel Kinesiyoloji ve Kas Testi",
        content: "Bilinçaltı ve bedensel geri bildirim mekanizması olan kas testlerinin temel uygulama yöntemleri.",
      },
      {
        title: "Modül 3: Akupresür Noktaları ve Enerji Uyarımı",
        content: "Meridyen kanalları üzerindeki şifa noktalarının elle, sıcaklıkla veya biyorezonansla uyarılması.",
      },
      {
        title: "Modül 4: Klinik Seans Tasarımı ve Uygulama",
        content: "Danışan üzerinde pratik meridyen dengeleme seansı, seans öncesi hazırlık ve etik kurallar.",
      },
    ],
    instructor: {
      name: "Dr. Nilgün Metin",
      role: "Akupunktur & Tamamlayıcı Tıp Uzmanı",
      bio: "Geleneksel Çin Tıbbı, bütünsel kinesiyoloji ve meridyen terapileri üzerine uluslararası klinik tecrübeye sahip hekim.",
    },
    testimonials: [
      {
        quote: "Kas testleri ve meridyen noktalarıyla çalışmak fizyoterapi pratiklerime yepyeni bir boyut kattı.",
        author: "A. K., Fizyoterapist",
      },
    ],
    faqs: [
      {
        question: "Uygulamalı atölye çalışmaları zorunlu mudur?",
        answer: "Sertifikasyon sürecini başarıyla tamamlamak için teorik derslerin ardından yapılacak yüz yüze uygulama workshop'una katılım zorunludur.",
      },
      {
        question: "Eğitim tıbbi bir tanı koyma yetkisi verir mi?",
        answer: "Hayır. Meridyen terapisi tamamlayıcı bir enerji dengeleme yöntemidir; tıbbi tanı ve tedavi sadece hekimler tarafından yapılır.",
      },
      {
        question: "Meridyen Terapi Cihazı Nedir?",
        answer: "Enerji (meridyen) kanalları ve iç organlar hakkında geleneksel Çin tıbbı teorisi temelinde geliştirilen üst teknoloji cihazıdır. Bu cihaz bioinformatik, enerji, nöroloji ve diğer alanlarda son başarıları kendinde toplamıştır. Akupunktur, guasha masajı, tuina masajı, dağlama ve vakum terapisine benzer kapsamlı bir fizyoterapi etkisi göstermektedir. Enerji kanallarına ve biyolojik olarak aktif noktalara özel fizyoterapi etkisi sayesinde, hızla enerji kanallarının temizliği sağlanmaktadır. Geleneksel öğreti bu etkiyi chi'nin serbest dolaşımı ve yin-yang dengesi kavramlarıyla açıklar. Bunlar geleneksel Çin tıbbının kendi terminolojisine ait kavramlardır; tıbbi bir tedavi ya da iyileşme vaadi taşımaz.",
      },
      {
        question: "Meridyen Terapi Cihazı Sertifikalı Bir Fizyoterapi Cihazı Mıdır?",
        answer: "Bu cihaz Fohow kuruluşunun en iyi ürünlerinden biridir. Ürünün tasarımı ve geliştirilmesi sırasında, yasallık, güvenlik ve etkinlik, doğal malzeme ve çevreyi koruma, geleneksel Çin tıbbı sağlığı destekleme kültürü ön planda tutulmuştur. Cihaz yasal ve normatif düzenlemelere uygun olmalı, ayrıca gerekli tüm izinlere sahip olmalıdır; ancak bundan sonra piyasaya sürülmesine izin verilmektedir. Bu yüzden cihaz uygunluk belgesi ve satış izni alınmış tamamen yasal bir üründür.",
      },
      {
        question: "Cihaz Güvenli Midir? Yan Etkisi Mevcut Mudur?",
        answer: "Meridyen Terapi Cihazı tamamen güvenli bir üründür. Bu da kalite uygunluk belgesi ile tasdiklidir. Cihazın çıkış voltajı 8 volt olup, organizmanın hücre biyoakımıyla uyumludur. Cihaz, onu kullanan danışan ve uzman için son derece güvenlidir. Elektrik darbelerini insan hücresinin elektrik yükü ile uyumlu biyoakımlara dönüştürmektedir. Geleneksel öğretide bu uygulama, enerji kanallarının serbestleşmesi olarak tanımlanır.",
      },
      {
        question: "Cihazın Çalışma Prensibi Nasıldır?",
        answer: "Cihaz temel bir ünite ve özel eldivenlerden oluşmaktadır. Enerji kanallarına ve biyolojik olarak aktif noktalara özel fizyoterapi etkisi sayesinde bunların aktif temizliği yapılmakta ve içlerinde bulunan birincil chi enerjisi yenilenmektedir. Geleneksel öğreti bu süreci, serbest chi sirkülasyonu ve yin-yang dengesinin kurulması olarak tanımlar. Bu tanım geleneksel bir çerçeveye aittir; tıbbi bir etki iddiası değildir.",
      },
      {
        question: "Hangi Amaçlarla Cihazın Kullanımı Tavsiye Edilmektedir?",
        answer: "Cihaz çok geniş bir yelpazeye hitap eder. Geleneksel Çin tıbbının 'Durgunluğun olmadığı yerde ağrı olmaz, durgunluk olan yerde ağrı ortaya çıkar' temel teorisine dayanır. Geleneksel öğretide enerji kanallarındaki durgunluklar chi sirkülasyonuna engel sayılır. Enerji kanalları, insan yaşamının, vücudun iç organları ve tüm bölümleriyle bağlantılı olan hayati hatlarıdır. Geleneksel Çin tıbbında meridyenlerdeki problemler rahatsızlıkların temel kaynağı olarak ele alınır. Buna uygun olarak geleneksel öğreti, enerji kanallarının serbest olmasını temel ilke kabul eder.",
      },
      {
        question: "Meridyen Terapi Kimler İçin Uygundur?",
        answer: "Meridyen terapi; yoğun iş temposu, uzun süre ayakta ya da masa başında çalışma, düzensiz uyku veya yoğun spor temposu nedeniyle bedensel gerginlik biriktiren yetişkinlere yönelik bir gevşeme ve farkındalık uygulamasıdır. Belirli bir rahatsızlığın tedavisi amacıyla önerilmez. Tanı konmuş bir sağlık sorununuz varsa uygulamadan önce hekiminize danışın; meridyen terapi tıbbi tedavinin yerine geçmez ve onun alternatifi değildir.",
      },
      {
        question: "Cihazın Kullanımında Kontrendikasyonlar ve İhtiyati Durumlar Var Mı?",
        answer: "Aşağıdaki durumlarda cihaz kullanımı tavsiye edilmez veya dikkatli olunmalıdır:\n\n• Danışanın işleme şüpheyle yaklaşması ve seansı yapan uzmanla iş birliği kurmak istememesi\n• Tümörler, hematolojik hastalıklar, enfeksiyon hastalıkları, ruhsal bozukluklar, ağır kalp rahatsızlıkları, beyin ve akciğer patolojileri\n• Kemik kırıkları, aktif kanamalar ve kanama tehlikeleri, kas-tendon ve bağ yırtılmaları, pürülan artrit, cilt bütünlüğünün bozulduğu alanlar, ülser, çıban ve apseler\n• Hamilelik, adet dönemi, doğum sonrası kanamalar\n• Omurganın malformasyonları, omurga kanalının kemik darlığı, intervertebral foramen stenozu\n• Yaşa bağlı aşırı halsizlikler, aşırı yorgunluk, aşırı açlık (en erken yemekten ve alkol alımından yarım saat sonra cihaz kullanımı önerilir)\n• Yüksek kan basıncı, geçirilmiş kalp ameliyatları, kalp pili mevcudiyeti ve diğer metal/elektronik implantların varlığı\n• 8 yaşından küçük çocuklar\n• Fırtınalı havalarda kullanımı önerilmemektedir.",
      },
      {
        question: "İşlem Sırasında Üzerinizde Cep Telefonu ve Metal Süs Eşyaları Bulundurmak Mümkün Mü?",
        answer: "Hayır. Metal ve elektronik cihazlar cihazın biyoakım dalgalarını etkileyebilir. Bu nedenle işlem sırasında tüm metal süs eşyalarının çıkarılması ve yakında cep telefonu bulundurulmaması gerekmektedir.",
      },
      {
        question: "Uygulamaya Ne Kadar Süreyle Devam Edilir?",
        answer: "Meridyen terapi kür mantığıyla uygulanır: kısa kür 10 gün sürerken, uzun kür kişinin yaşı kadar gün sürebilir. Süre kişinin genel durumuna ve uygulayıcının değerlendirmesine göre belirlenir. Geleneksel öğretide bu süreç, enerji kanallarının serbestleşmesi ve yin-yang dengesinin düzenlenmesi olarak tanımlanır. Uygulama bir rahatsızlığın tedavisi değildir ve tıbbi tedavinin yerine geçmez.",
      },
    ],
  };
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Ana Sayfa", path: "/" },
          { name: "Eğitim Programları", path: "/programlar" },
          { name: "Meridyen Terapi", path: "/programlar/meridyen-terapi" },
        ]}
      />
      <CourseSchema
        name="Meridyen Terapi Eğitimi"
        description="IECCERT onaylı meridyen terapi ve bütünsel kinesiyoloji uzmanlık programı."
        path="/programlar/meridyen-terapi"
      />
      <SubPageLayout
      title="Meridyen Terapi"
      description="Geleneksel öğretide meridyen olarak adlandırılan enerji kanalları ve bütünsel kinesiyoloji üzerine uzmanlık eğitimi."
      noPadding={true}
      heroFullScreen={true}
    >
      <div className="space-y-0">
        <MeridianParallaxContainer />
        <div className="space-y-16 px-6 py-16 md:px-16 md:py-28">
          <CourseDetailTemplate {...data} programSlug="meridyen-terapi" />
          {/* Akreditasyon kanıtı yalnız BU programda: PRODUCT.md'ye göre IECCERT'in
              Meridyen Terapi'yi kapsaması, projenin yayınlayabileceği tek doğrulanmış
              akreditasyon gerçeği. Sicil no, doğrulama linki, eğitim saati ve
              değerlendirme yöntemi alanları bileşende tanımlı ama BOŞ — değerleri
              doğrulanmış olarak gelene kadar render edilmiyorlar. */}
          <AccreditationProof
            body="IECCERT"
            bodyFullName="International Energy & Complementary Medicine Certification"
            program="Meridyen Terapi Uzmanlık Programı"
            certificateType="Meridyen Terapi Uzmanlık Sertifikası"
          />
        </div>
      </div>
    </SubPageLayout>
    </>
  );
}
