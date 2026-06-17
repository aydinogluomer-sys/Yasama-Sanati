import React from "react";
import SubPageLayout from "@/components/Server/SubPageLayout";
import CourseDetailTemplate from "@/components/Server/CourseDetailTemplate";

export default function HipnoterapiPage() {
  const data = {
    duration: "8 Hafta",
    format: "Çevrimiçi / Canlı (Zoom)",
    prerequisites: "Yok",
    certification: "Uluslararası Onaylı Hipnoterapi Uzmanlık Sertifikası",
    price: "16.500 TL",
    startDate: "12 Kasım 2026",
    introTitle: "Bilinçaltının Gücünü Yönetin",
    introText: "Hipnoterapi, bilinçli zihnin filtrelerini aşarak doğrudan bilinçaltı düzeyde köklü ve kalıcı dönüşümler gerçekleştirme sanatıdır. Bu eğitimle bilinçaltının çalışma prensiplerini kavrayacak, telkin kalıpları yazmayı ve etik sınırlar dahilinde indüksiyon (hipnoza geçiş) tekniklerini uygulamayı öğreneceksiniz.",
    curriculum: [
      {
        title: "Modül 1: Bilinçaltı Yapısı ve Hipnoz Teorisi",
        content: "Bilinç ile bilinçaltı arasındaki farklar, hipnozun tarihi, mitler ve bilimsel gerçekler.",
      },
      {
        title: "Modül 2: İndüksiyon ve Derinleştirme Yöntemleri",
        content: "Kullanıcıyı güvenli bir şekilde trans (hipnoz) durumuna geçirme, gevşetme ve derinleştirme metotları.",
      },
      {
        title: "Modül 3: Telkin Yazımı ve Ses Tonu Eğitimi",
        content: "Kalıcı değişim sağlayacak hipnotik dil kalıpları oluşturma, olumlama tasarımı ve ses frekansı kontrolü.",
      },
      {
        title: "Modül 4: Regresyon ve Uygulama Protokolleri",
        content: "Fobiler, kilo kontrolü, sigara bırakma ve stres yönetimi gibi alanlarda seans akışları ve etik çerçeve.",
      },
    ],
    instructor: {
      name: "Dr. Cenk Öztürk",
      role: "Klinik Hipnoterapist & Psikiyatrist",
      bio: "Bilinçaltı terapileri, telkin dil kalıpları ve trans indüksiyonları alanında uluslararası çalışmalar yürüten hekim.",
    },
    testimonials: [
      {
        quote: "Eğitim sayesinde hipnotik dil kalıplarını seanslarıma entegre ettim ve danışanlarımda çok daha hızlı ilerleme kaydettik.",
        author: "E. T., Klinik Psikolog",
      },
    ],
    faqs: [
      {
        question: "Hipnoterapi eğitimi almak için psikolog olmak şart mı?",
        author: "Sistem",
        answer: "Hayır, eğitim temel seviyeden başlar ve kendini geliştirmek ya da koçluk araçlarına eklemek isteyen herkese açıktır. Ancak klinik uygulamalar sadece lisanslı profesyonellerin yetkisindedir.",
      },
      {
        question: "Canlı seans pratikleri yapılacak mı?",
        author: "Sistem",
        answer: "Evet, eğitim süresince eğitmen eşliğinde ve katılımcılar arasında güvenli trans pratikleri yapılacaktır.",
      },
    ],
  };

  return (
    <SubPageLayout
      title="Hipnoterapi"
      description="Bilinçaltı kalıplarını dönüştürme, hipnotik dil ve telkin teknikleriyle derin gelişim uzmanlığı."
    >
      <CourseDetailTemplate {...data} />
    </SubPageLayout>
  );
}
