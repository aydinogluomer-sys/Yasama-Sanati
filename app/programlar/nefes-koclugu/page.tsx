import React from "react";
import SubPageLayout from "@/components/Server/SubPageLayout";
import CourseDetailTemplate from "@/components/Server/CourseDetailTemplate";

export default function NefesKocluguPage() {
  const data = {
    duration: "6 Hafta",
    format: "Çevrimiçi / Canlı (Zoom)",
    prerequisites: "Yok",
    certification: "Uluslararası Akredite Nefes Koçluğu Sertifikası",
    price: "15.000 TL",
    startDate: "15 Eylül 2026",
    introTitle: "Nefes, Yaşamın Kendisidir",
    introText: "Doğru nefes alarak zihinsel karmaşayı durdurun, duygusal tıkanıklıkları aşın ve vücudunuzun oksijen kapasitesini artırın. Bu eğitim hem kendiniz için derin bir dönüşüm süreci sunar hem de uluslararası standartlarda nefes koçluğu yapma yetisi kazandırır.",
    curriculum: [
      {
        title: "Modül 1: Nefes Anatomisi ve Fizyolojisi",
        content: "Nefes sisteminin biyolojik yapısı, akciğer kapasitesinin doğru kullanımı ve diyafram kasının aktivasyonu.",
      },
      {
        title: "Modül 2: Doğal Nefes Analizi ve Blokajlar",
        content: "Vücuttaki nefes sınırlandırmalarını ve nefes alışkanlıklarındaki blokajları tespit etme yöntemleri.",
      },
      {
        title: "Modül 3: Zihinsel ve Duygusal Dönüşüm",
        content: "Nefes egzersizleri vasıtasıyla zihinsel karmaşayı yatıştırma ve duygusal yükleri serbest bırakma.",
      },
      {
        title: "Modül 4: Koçluk Metodolojisi ve Uygulama seansları",
        content: "Nefes koçu olarak seans yönetimi, danışan ilişkileri ve pratik vaka analizleri.",
      },
    ],
    instructor: {
      name: "Nevşah F. Karamehmet",
      role: "Nefes Terapisti & Bütünsel Gelişim Uzmanı",
      bio: "Nefes çalışmaları ve zihinsel dönüşüm alanında 20 yılı aşkın süredir binlerce kişiye rehberlik etmiş, uluslararası akreditasyona sahip öncü uzman.",
    },
    testimonials: [
      {
        quote: "Nefes koçluğu programı sayesinde sınırlarımla yüzleştim. Hayatımın en büyük dönüşüm deneyimiydi.",
        author: "Z. A., Mezun",
      },
    ],
    faqs: [
      {
        question: "Eğitime katılmak için bir sağlık veya deneyim ön koşulu var mı?",
        answer: "Hayır, eğitim temel seviyeden başlar ve herkesin katılımına uygundur."
      },
      {
        question: "Sertifika uluslararası alanda geçerli midir?",
        answer: "Evet, mezuniyet sonrası verilen sertifikalar uluslararası tamamlayıcı tıp ve koçluk federasyonları tarafından akredite edilmiştir."
      },
      {
        question: "Nefes sadece doğru nefes almak için mi yapılır?",
        answer: "Hayır. Nasıl nefes alıyorsak hayatı da öyle yaşarız; nefes alma alışkanlıklarımız, hayatı deneyimleme şeklimize denk düşer. Bu nedenle nefes alma şeklimiz değiştikçe hayatımız da dönüşüme uğrar. Ayrıca Transformasyonel Nefes bir nefes tekniği değil, bir dönüşüm aracıdır."
      },
      {
        question: "Transformasyonel Nefes yapmak hayatımı nasıl etkiler?",
        answer: "Transformasyonel Nefes hayatınızı dört seviyede etkiler:\n\nFiziksel olarak: Vücudumuzdaki oksijen seviyesi yükselir; daha sağlıklı, daha canlı ve enerjik oluruz; bağışıklık sistemimiz güçlenir.\n\nZihinsel olarak: Daha kolay odaklanır, stres seviyemizi kontrol altına alırız; yaratıcılığımız ve verimliliğimiz artar.\n\nDuygusal olarak: Negatif duygulardan özgürleşir, duygusal dayanıklılığımızı artırırız.\n\nRuhsal olarak: Kendi hakikatimizle bağlantı kurar, farkındalık düzeyimizi yükseltiriz."
      },
      {
        question: "Birçok kişiden \"Nefes terapisi aldım, hayatım değişti\" gibi sözler duyuyoruz. Gerçekten de hayatımız değişiyor mu?",
        answer: "\"Hayatım ikiye ayrılıyor: nefesten önce ve nefesten sonra\" diyenler bile var. Evet, Transformasyonel Nefes çalışanlar arasında bu tür sözleri sıkça duyuyoruz. Bunun nedeni, yaşamı deneyimleme şeklimizi kökten değiştiren bir deneyim yaşamamızdır; bu da hayatımızı dönüştürür."
      },
      {
        question: "Nefes kaç seans yapılmalıdır?",
        answer: "Bu; kişiye, kişinin durumuna ve yaratmak istediği farka bağlıdır. Yine de hayatında kalıcı bir fark yaratmak isteyenlere başlangıç olarak 8 seans öneriyoruz. Devamında koç ve danışan, süreci birlikte belirler. Seansların süresi kişinin ihtiyaç ve hedeflerine göre değişir; bazı danışanlar birkaç seansta önemli fayda görürken, bazıları daha uzun süreli bir destek almayı tercih edebilir."
      },
      {
        question: "Nefes koçluğunun faydaları nelerdir?",
        answer: "Nefes koçluğunun başlıca faydaları şunlardır:\n\n• Stres ve anksiyetenin azalması\n• Daha iyi uyku kalitesi\n• Artan enerji seviyesi\n• Daha iyi odaklanma ve zihinsel berraklık\n• Solunum sistemi sağlığının iyileşmesi\n• Spor performansının artması\n• Bağışıklık sisteminin güçlenmesi\n• Farkındalığın artması\n• Zihinsel ve duygusal özgürleşme"
      },
      {
        question: "Nefes koçluğuna kimler başvurabilir?",
        answer: "Her yaştan birey nefes koçluğundan yararlanabilir. Özellikle yoğun ve stresli bir yaşam tarzına sahip olanlar, sporcular, uyku problemi yaşayanlar, genel sağlığını iyileştirmek isteyenler ve hayatında kalıcı bir fark yaratmak isteyenler nefes koçluğuna başvurabilir."
      },
      {
        question: "Nefes koçluğu seansları nasıl gerçekleşir?",
        answer: "Seanslar bire bir veya grup halinde yapılabilir. İlk seans, kişinin nefes alışkanlıklarını değerlendirmek ve bireysel ihtiyaçlarına göre bir plan oluşturmak amacıyla bir değerlendirmeyle başlar. Danışan yaklaşık 40 dakika bağlantılı nefes alır; bu sırada koç, danışanın nefes analizini yapar ve gerekli gördüğü teknikleri uygulayarak danışanı yönlendirir. Seans sonunda 10 dakikalık bir meditasyonla dinlenmesi sağlanır."
      },
      {
        question: "Nefes koçluğunun bilimsel temeli var mı?",
        answer: "Evet. Nefes tekniklerinin sağlık üzerindeki yararlarına dair birçok araştırma mevcuttur. Doğru nefes almanın stres hormonu kortizol seviyesini düşürdüğü, kan basıncını düzenlediği ve genel duygusal sağlığı iyileştirdiği araştırmalarla gösterilmiştir. Kandaki oksijen miktarının artması da bağışıklığı destekler."
      },
      {
        question: "Nefes koçluğu online olarak yapılabilir mi?",
        answer: "Evet. Nefes koçluğu online platformlar aracılığıyla da yapılabilir. Video görüşmeleri ve çevrim içi rehberlik ile seanslar yürütülebilir ve süreç takip edilebilir."
      }
    ],
  };

  return (
    <SubPageLayout
      title="Nefes Koçluğu"
      description="Doğru nefes teknikleriyle zihinsel arınma, duygusal özgürleşme ve hücresel düzeyde canlanma."
    >
      <CourseDetailTemplate {...data} />
    </SubPageLayout>
  );
}
