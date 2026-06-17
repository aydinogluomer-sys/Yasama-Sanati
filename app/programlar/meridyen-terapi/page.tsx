import React from "react";
import SubPageLayout from "@/components/Server/SubPageLayout";
import CourseDetailTemplate from "@/components/Server/CourseDetailTemplate";
import MeridianParallaxContainer from "@/components/meridian-3d/MeridianParallaxContainer";

export default function MeridyenTerapiPage() {
  const data = {
    duration: "8 Hafta",
    format: "Karma (Online Teorik + Yüz yüze Uygulama)",
    prerequisites: "Yok",
    certification: "IECCERT Onaylı Meridyen Terapi Uzmanlık Sertifikası",
    price: "18.500 TL",
    startDate: "10 Ekim 2026",
    introTitle: "Bedenin Enerji Ağlarını Keşfedin",
    introText: "Meridyen Terapisi, vücudun yaşam energisinin aktığı gizli kanalları uyararak enerjisel tıkanıklıkları çözer. Bütünsel kinesiyoloji pratikleriyle zenginleştirilen bu programda, enerji dengesizliklerini teşhis etmeyi ve beden zihnine hücresel düzeyde şifa vermeyi öğreneceksiniz.",
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
        answer: "Enerji (meridyen) kanalları ve iç organlar hakkında geleneksel Çin tıbbı teorisi temelinde geliştirilen üst teknoloji cihazıdır. Bu cihaz bioinformatik, enerji, nöroloji ve diğer alanlarda son başarıları kendinde toplamıştır. Akupunktur, guasha masajı, tuina masajı, dağlama ve vakum terapisine benzer kapsamlı bir fizyoterapi etkisi göstermektedir. Enerji kanallarına ve biyolojik olarak aktif noktalara özel fizyoterapi etkisi sayesinde, hızla enerji kanallarının temizliği sağlanmaktadır. Bu da chi enerjisi ve kan dolaşımının iyileşmesine, yin-yang dengesinin yenilenmesine ve organizmanın biyolojik enerji seviyesinin yükselmesine yardımcı olmaktadır. Cihazın düzenli kullanımı genel profilaktik ve iyileştirici etkinin elde edilmesini sağlamaktadır.",
      },
      {
        question: "Meridyen Terapi Cihazı Sertifikalı Bir Fizyoterapi Cihazı Mıdır?",
        answer: "Bu cihaz Fohow kuruluşunun en iyi ürünlerinden biridir. Ürünün tasarımı ve geliştirilmesi sırasında, yasallık, güvenlik ve etkinlik, doğal malzeme ve çevreyi koruma, geleneksel Çin tıbbı sağlığı destekleme kültürü ön planda tutulmuştur. Cihaz yasal ve normatif düzenlemelere uygun olmalı, ayrıca gerekli tüm izinlere sahip olmalıdır; ancak bundan sonra piyasaya sürülmesine izin verilmektedir. Bu yüzden cihaz uygunluk belgesi ve satış izni alınmış tamamen yasal bir üründür.",
      },
      {
        question: "Cihaz Güvenli Midir? Yan Etkisi Mevcut Mudur?",
        answer: "Meridyen Terapi Cihazı tamamen güvenli bir üründür. Bu da kalite uygunluk belgesi ile tasdiklidir. Cihazın çıkış voltajı 8 volt olup, organizmanın hücre biyoakımıyla uyumludur. Cihaz, onu kullanan danışan ve uzman için son derece güvenlidir. Elektrik darbelerini insan hücresinin elektrik yükü ile uyumlu biyoakımlara dönüştürmektedir. Cihaz, hücrelerin enerjisini yenilemekte ve enerji kanallarını serbest bırakmaktadır.",
      },
      {
        question: "Cihazın Çalışma Prensibi Nasıldır?",
        answer: "Cihaz temel bir ünite ve özel eldivenlerden oluşmaktadır. Enerji kanallarına ve biyolojik olarak aktif noktalara özel fizyoterapi etkisi sayesinde bunların aktif temizliği yapılmakta ve içlerinde bulunan birincil chi enerjisi yenilenmektedir. Serbest chi sirkülasyonu kan dolaşımını iyileştirmekte ve organizmanın biyoenerji seviyesini artırmaktadır. Böylece yin-yang enerji dengesi oluşmakta ve genel profilaktik iyileştirici etki elde edilmektedir.",
      },
      {
        question: "Hangi Amaçlarla Cihazın Kullanımı Tavsiye Edilmektedir?",
        answer: "Cihaz çok geniş bir yelpazeye hitap eder. Geleneksel Çin tıbbının 'Durgunluğun olmadığı yerde ağrı olmaz, durgunluk olan yerde ağrı ortaya çıkar' temel teorisine dayanır. Enerji kanallarındaki durgunluklar chi sirkülasyonuna engel olur ve birçok rahatsızlığın ortaya çıkma nedenidir. Enerji kanalları, insan yaşamının, vücudun iç organları ve tüm bölümleriyle bağlantılı olan hayati hatlarıdır. Geleneksel Çin tıbbında meridyenlerdeki problemler rahatsızlıkların temel kaynağı olarak ele alınır. Buna uygun olarak iyileşmenin ve sağlığı sürdürmenin anahtarı, enerji kanallarının serbest olmasıdır.",
      },
      {
        question: "Meridyen Terapi Kimlere Tavsiye Edilmektedir?",
        answer: "Uykusuzluk problemi olan, mide-bağırsak sisteminde işlev bozukluğu yaşayan, romatizma, hipertansiyon, hiperglisemi, şeker hastalığı, iskemik rahatsızlıkları bulunan ve kronik yorgunluğu olan kişilere özellikle tavsiye edilmektedir. Ayrıca cihazın, yoğun iş veya spor temposuna sahip genç ve yaşlı insanlarda uygulanması önerilir.",
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
        question: "İyileşme Olması İçin İşleme Ne Kadar Süreyle Devam Edilmesi Gerekmektedir?",
        answer: "Meridyen Terapi cihazı önleyici ve sağlığı destekleyicidir. Kullanım sürecinde organizma toksinlerden temizlenir, kan dolaşımı ve metabolizma iyileşir, enerji kanalları serbest kalır, iç organların yin-yang enerjileri düzenlenir, hücreler aktive olur ve bağışıklık güçlenir. Bu sayede organizmanın kendi kendini yenileme yeteneği gelişir. Kısa kür 10 gün sürerken, uzun kür kişinin yaşı kadar gün sürebilir. Şüphesiz ki kür süresi kişinin genel sağlık durumuna göre belirlenmektedir. Cihazın düzenli kullanımı sağlığı ve güzelliği destekler.",
      },
    ],
  };

  return (
    <SubPageLayout
      title="Meridyen Terapi"
      description="Vücudun enerji kanallarını (meridyenler) dengeleme, blokajları kaldırma ve bütünsel şifa metodolojisi."
      noPadding={true}
      heroFullScreen={true}
    >
      <div className="space-y-0">
        <MeridianParallaxContainer />
        <div className="px-6 py-16 md:px-16 md:py-28">
          <CourseDetailTemplate {...data} />
        </div>
      </div>
    </SubPageLayout>
  );
}

