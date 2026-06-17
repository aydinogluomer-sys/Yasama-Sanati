import React from "react";
import SubPageLayout from "@/components/Server/SubPageLayout";
import CourseDetailTemplate from "@/components/Server/CourseDetailTemplate";

export default function YasamKocuPage() {
  const data = {
    duration: "10 Hafta",
    format: "Çevrimiçi / Canlı (Zoom)",
    prerequisites: "Yok",
    certification: "Uluslararası Standartlarda Profesyonel Yaşam Koçluğu Sertifikası",
    price: "16.000 TL",
    startDate: "05 Ekim 2026",
    introTitle: "Potansiyeli Performansa Dönüştürün",
    introText: "Yaşam Koçluğu, bireylerin kişisel ve profesyonel hayatlarında arzuladıkları hedeflere ulaşmalarına rehberlik etme sanatıdır. Bu eğitimle profesyonel koçluk becerilerini en üst seviyede kazanacak, etkin dinleme ve güçlü soru sorma tekniklerini öğrenecek ve kendi koçluk uygulamanızı güvenle başlatacaksınız.",
    curriculum: [
      {
        title: "Modül 1: Koçluğun Felsefesi ve Temel Beceriler",
        content: "Koçluk nedir, ne değildir? Mentorluk ve terapiden farkları. Aktif dinleme ve empati kurma becerisi.",
      },
      {
        title: "Modül 2: Güçlü Sorular ve Farkındalık Süreci",
        content: "Danışanda içgörü uyandıracak, hedeflerini berraklaştıracak ve inanç kalıplarını dönüştürecek soru sorma modelleri.",
      },
      {
        title: "Modül 3: GROW Modeli ve Eylem Adımları",
        content: "Hedef, Gerçeklik, Seçenekler ve İrade (GROW) modeliyle seans akışlarını tasarlama ve eylem planı oluşturma.",
      },
      {
        title: "Modül 4: Süpervizyon ve Profesyonel İmaj",
        content: "Eğitmen gözetiminde uygulamalı seans pratikleri, seans analizi ve kendi koçluk işini kurma kılavuzu.",
      },
    ],
    instructor: {
      name: "Ayşegül Koç",
      role: "Profesyonel Master Koç & Mentor",
      bio: "Uluslararası standartlarda koçluk ve liderlik eğitimleri almış, yüzlerce danışan ve öğrenciye rehberlik etmiş kıdemli mentor koç.",
    },
    testimonials: [
      {
        quote: "Eğitimden sonra profesyonel olarak koçluk seansları yapmaya başladım. Hayatımda aldığım en verimli karardı.",
        author: "S. O., Mezun & Profesyonel Koç",
      },
    ],
    faqs: [
      {
        question: "Koçluk eğitimini tamamladıktan sonra ünvanlanma süreci nasıl işliyor?",
        answer: "Eğitim sonrasında tamamlamanız gereken pratik seans saatleri ve süpervizyon oturumları hakkında akademi olarak size yol gösteriyoruz.",
      },
      {
        question: "Dersler uygulamalı pratik içeriyor mu?",
        answer: "Evet, her teorik modülden sonra katılımcılar kendi aralarında akran koçluğu pratikleri yaparak teoriyi pratiğe dönüştürürler.",
      },
      {
        question: "Yaşam koçu ne yapar?",
        answer: "Yaşam koçu, bir tür performans koçudur. Danışanla birlikte hayatında iyi işlemeyen alanları tespit eder; danışanın istediği sonuca ulaşmasının önündeki engelleri belirler ve bu engelleri nasıl aşacağı konusunda farkındalığını artırır.",
      },
      {
        question: "Yaşam koçluğu ile terapi arasındaki fark nedir?",
        answer: "Yaşam koçluğu geleceğe odaklanırken, terapi genellikle geçmişteki sorunların çözülmesine odaklanır. Terapi, duygusal ve psikolojik iyileşme sürecine yardımcı olurken, yaşam koçluğu bireylerin hedeflerine ulaşmalarını ve potansiyellerini gerçekleştirmelerini sağlar.",
      },
      {
        question: "Yaşam koçluğu hangi konularda yardımcı olabilir?",
        answer: "Yaşam koçluğu; kariyer planlaması, ilişkiler, kişisel gelişim, zaman yönetimi, sağlık ve iyi yaşam gibi birçok konuda yardımcı olabilir. Koçlar, bireylerin bu alanlarda belirledikleri hedeflere ulaşmalarına destek olur.",
      },
      {
        question: "Yaşam koçluğu ne kadar sürer?",
        answer: "Yaşam koçluğunun süresi, bireyin hedeflerine ve ihtiyaçlarına bağlı olarak değişir. Bazı danışanlar birkaç ay içinde hedeflerine ulaşabilirken, bazıları için süreç daha uzun sürebilir.",
      },
      {
        question: "Yaşam koçluğunun faydaları nelerdir?",
        answer: "Yaşam koçluğu; bireylerin daha net hedefler belirlemelerine, içlerindeki potansiyeli ortaya çıkarmalarına, kişisel ve profesyonel gelişimlerini hızlandırmalarına ve yaşam kalitelerini iyileştirmelerine yardımcı olur.",
      },
      {
        question: "Yaşam koçluğuna kimler başvurmalı?",
        answer: "Hedeflerine ulaşmakta zorlanan, hayatında dönüşüm yaratmak isteyen ve yaşam kalitesini artırmak isteyen herkes yaşam koçluğuna başvurabilir.",
      },
      {
        question: "Online yaşam koçluğu mümkün mü?",
        answer: "Evet, yaşam koçluğu online olarak da yapılabilir. Çoğu yaşam koçu; telefon, video görüşmesi veya e-posta yoluyla danışanlarına destek sağlar.",
      },
      {
        question: "Yaşam koçluğu seansları ne kadar sürer?",
        answer: "Bireysel yaşam koçluğu seansları genellikle 45 dakika ile 1 saat arasında sürer. Grup seansları veya atölye çalışmaları daha uzun olabilir.",
      },
      {
        question: "Yaşam koçluğunun etkileri ne zaman görülmeye başlanır?",
        answer: "Yaşam koçluğunun etkileri kişiden kişiye değişir; ancak genellikle birkaç hafta içinde belirgin bir fark gözlemlenebilir. Hedeflere tümüyle ulaşmak ise daha uzun sürebilir.",
      },
      {
        question: "Yaşam koçluğu gizliliği nasıl sağlar?",
        answer: "Yaşam koçları, danışanlarıyla olan tüm etkileşimlerin gizliliğini korur. Profesyonel etik kurallarına uyarak danışanların paylaştığı bilgileri üçüncü kişilerle paylaşmaz.",
      },
      {
        question: "Yaşam koçluğu gençler için uygun mudur?",
        answer: "Evet, yaşam koçluğu gençlere de yardımcı olabilir. Eğitim, kariyer planlaması, özgüven geliştirme ve kişisel hedef belirleme gibi konularda gençlere rehberlik edebilir.",
      },
    ],
  };

  return (
    <SubPageLayout
      title="Yaşam Koçluğu"
      description="Bireysel potansiyeli keşfetme, etkin iletişim, hedef yönetimi ve uluslararası standartlarda koçluk sertifikasyonu."
    >
      <CourseDetailTemplate {...data} />
    </SubPageLayout>
  );
}
