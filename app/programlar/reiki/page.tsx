import React from "react";
import SubPageLayout from "@/components/Server/SubPageLayout";
import CourseDetailTemplate from "@/components/Server/CourseDetailTemplate";

export default function ReikiPage() {
  const data = {
    duration: "4 Hafta (Seviye 1 & 2)",
    format: "Karma (Online Teorik + Bireysel Uyumlanma Seansı)",
    prerequisites: "Yok",
    certification: "Usui Reiki 1. ve 2. Derece Uygulayıcı Sertifikası",
    price: "9.000 TL",
    startDate: "01 Kasım 2026",
    introTitle: "İçinizdeki Şifa Gücünü Uyandırın",
    introText: "Reiki, evrensel şifa enerjisinin eller vasıtasıyla aktarılmasına dayanan geleneksel bir Japon enerji dengeleme tekniğidir. Bu eğitimle şifa enerjisine uyumlanacak (inisiyasyon), kendi çakra sisteminizi dengelemeyi öğrenecek ve başkalarına şifa enerjisi aktarma yeteneği kazanacaksınız.",
    curriculum: [
      {
        title: "Modül 1: Reiki Tarihçesi ve Enerji Anatomisi",
        content: "Mikao Usui ekolü, Reiki prensipleri, insan enerji bedeni, çakralar ve auranın yapısı.",
      },
      {
        title: "Modül 2: Reiki 1. Aşama Uyumlaması (İnisiyasyon)",
        content: "Eğitmen tarafından şifa kanallarının açılması, el pozisyonları ve kendi kendine şifa pratikleri.",
      },
      {
        title: "Modül 3: Reiki 2. Aşama ve Kutsal Semboller",
        content: "Zihinsel/duygusal şifa sembolleri, gücü artırma sembolü ve uzaktan şifa gönderme metodolojisi.",
      },
      {
        title: "Modül 4: Sean Yönetimi ve Korunma Teknikleri",
        content: "Başkalarına Reiki seansı yapma adımları, mekan temizliği, kristallerin kullanımı ve enerjisel korunma.",
      },
    ],
    instructor: {
      name: "Zeynep Elmas",
      role: "Usui Reiki Grandmaster / Teacher",
      bio: "Usui Reiki ekolünde 15 yılı aşkın süredir binlerce öğrenci ve yüzlerce master yetiştirmiş enerji şifası uzmanı.",
    },
    testimonials: [
      {
        quote: "Uyumlanmadan sonra bedenimdeki ve zihnimdeki hafiflemeyi kelimelerle tarif edemem. Günlük meditasyonumun vazgeçilmezi oldu.",
        author: "D. S., Mimar",
      },
    ],
    faqs: [
      {
        question: "Uyumlanma (İnisiyasyon) uzaktan yapılabilir mi?",
        author: "Sistem",
        answer: "Evet, Reiki enerjisi zaman ve mekan sınırlarının ötesinde çalışır. Uzaktan uyumlanma seansları, eğitmeninizle kararlaştırılan saatte birebir canlı rehberlikle gerçekleştirilir.",
      },
      {
        question: "Reiki eğitimi sonrasında Master (Öğretmen) olabilir miyim?",
        author: "Sistem",
        answer: "Bu eğitim Seviye 1 ve 2'yi kapsar (Uygulayıcı seviyesi). Master/Teacher seviyesine geçmek için bu dereceleri tamamladıktan sonra ileri seviye eğitimlerimize katılabilirsiniz.",
      },
    ],
  };

  return (
    <SubPageLayout
      title="Reiki"
      description="Evrensel yaşam enerjisi (Ki) kanallarını açma, çakra dengeleme ve ellerle şifa aktarma dereceleri."
    >
      <CourseDetailTemplate {...data} />
    </SubPageLayout>
  );
}
