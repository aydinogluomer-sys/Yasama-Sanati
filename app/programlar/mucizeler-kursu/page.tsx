import type { Metadata } from "next";
import { CourseSchema } from "@/components/Server/StructuredData";
import React from "react";
import SubPageLayout from "@/components/Server/SubPageLayout";
import CourseDetailTemplate from "@/components/Server/CourseDetailTemplate";

export const metadata: Metadata = {
  title: "Mucizeler Kursu (ACIM) | Yaşama Sanatı",
  description:
    "Bir yıllık zihinsel arınma çalışması; haftalık canlı dersler ve günlük bireysel pratik.",
  alternates: { canonical: "/programlar/mucizeler-kursu" },
  openGraph: {
    title: "Mucizeler Kursu (ACIM) | Yaşama Sanatı",
    description:
      "Bir yıllık zihinsel arınma çalışması; haftalık canlı dersler ve günlük bireysel pratik.",
    url: "/programlar/mucizeler-kursu",
  },
};

export default function MucizelerKursuPage() {
  const data = {
    duration: "1 Yıl (52 Hafta)",
    format: "Online (Haftalık Zoom Dersleri + Günlük Pratik Takibi)",
    prerequisites: "Yok",
    certification: "Yaşama Sanatı Akademisi Mucizeler Kursu Katılım Belgesi",
    introTitle: "Zihninizi Sevgiye Hizalayın",
    introText: "Mucizeler Kursu (A Course in Miracles), köklü bir zihinsel arınma sürecidir. Korku temelli düşünce kalıplarını geride bırakarak, bağışlama ve koşulsuz sevgi bilincini hayatınızın merkezine yerleştirmenizi hedefler. Yıllık program, haftalık canlı dersler ve günlük bireysel pratiklerle desteklenir.",
    curriculum: [
      {
        title: "Modül 1: Algı Temizliği ve İllüzyonlar",
        content: "Dış dünyayı egonun yargılarından arınmış olarak görme, projeksiyonları fark etme ve algının dönüşümü.",
      },
      {
        title: "Modül 2: Egonun Çözülmesi ve Gerçek Bağışlama",
        content: "Öfke, suçluluk ve kırgınlık kalıplarının ego mekanizmasıyla ilişkisi ve bunları serbest bırakma metotları.",
      },
      {
        title: "Modül 3: İçsel Rehberlik ve Mucize Bilinci",
        content: "Zihnin sessizleşmesi, içsel rehber sesle bağlantı kurma ve hayat olaylarında mucizelere alan açma.",
      },
      {
        title: "Modül 4: Kutsal İlişkiler ve Birlik Bilinci",
        content: "İlişkileri bir çatışma aracı olmaktan çıkarıp uyanış ve yansıtma vasıtasına dönüştürme süreci.",
      },
    ],
    instructor: {
      name: "Neslihan Yavuzcan",
      role: "Kişisel Dönüşüm Danışmanı & ACIM Kolaylaştırıcısı",
      bio: "Mucizeler Kursu metinleri üzerine uzun yıllardır derinlemesine çalışmalar yürüten, uyanış ve spiritüel farkındalık mentoru.",
    },
    testimonials: [
      {
        quote: "Huzursuzluğumun ve korkularımın kaynağını zihnimde buldum. Bu kurs bana kendime dönmeyi öğretti.",
        author: "M. Y., Akademisyen",
      },
    ],
    faqs: [
      {
        question: "52 haftalık sürecin tamamına katılmak zorunlu mu?",
        author: "Sistem",
        answer: "Kursun tam etki gösterebilmesi için müfredatın ve günlük çalışmaların kesintisiz takibi önerilir, ancak kaçırdığınız canlı dersleri arşivden izleyebilirsiniz.",
      },
      {
        question: "Eğitim materyalleri fiyata dahil midir?",
        author: "Sistem",
        answer: "Evet, tüm dijital çalışma kitapçıkları, ses kayıtları ve kaynak metin kılavuzları eğitim içeriğine dahildir.",
      },
    ],
  };
  return (
    <>
      <CourseSchema
        name="Mucizeler Kursu (ACIM)"
        description="Bir yıllık zihinsel arınma çalışması; haftalık canlı dersler ve günlük pratik."
        path="/programlar/mucizeler-kursu"
      />
      <SubPageLayout
      title="Mucizeler Kursu"
      description="Korkudan sevgiye geçişi, zihinsel arınmayı ve evrensel spiritüel uyanışı hedefleyen yıllık çalışma grubu."
    >
      <CourseDetailTemplate {...data} programSlug="mucizeler-kursu" />
    </SubPageLayout>
    </>
  );
}
