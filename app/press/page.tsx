import React from "react";
import SubPageLayout from "@/components/Server/SubPageLayout";

export default function PressRoomPage() {
  return (
    <SubPageLayout
      title="Basın Odası"
      description="ELEMENTIS dünyasından en son haberler, basın bültenleri ve güncellemeler"
    >
      <div className="max-w-5xl mx-auto space-y-16">
        {[
          {
            date: "2 Eylül 2024",
            title: "ELEMENTIS Geliştirme Grubu, Sürdürülebilir Yaşam ve Esenliğin Geleceğine Öncülük Ediyor",
            desc: "'Uzun Ömürlülüğün Mimarları' olarak ELEMENTIS, çevre dostu lüks resort ve akıllı konaklama tasarımlarıyla geleceğin sağlıklı yaşam standartlarını yeniden tanımlıyor."
          },
          {
            date: "14 Eylül 2024",
            title: "Bir Vizyonu İnşa Etmek: ELEMENTIS Kurucu Ortağı ve İnşaat Başkanı Andrey Skripachev ile Söyleşi",
            desc: "Lamine ahşap (glulam) yapıların tropikal iklim dayanıklılığı ve sismik mukavemeti üzerine detaylı teknik bilgiler ve mühendislik vizyonu paylaşılıyor."
          },
          {
            date: "22 Eylül 2024",
            title: "ELEMENTIS Kurucu Ortağı Anton Titov'un Esenlik ve Sürdürülebilirlik Yolculuğu",
            desc: "Zihin, beden ve ruh dengesini kurma tutkusuyla yola çıkan Anton Titov, ELEMENTIS'in bütünsel sağlık (Integrative Wellness) yaklaşımının felsefesini anlatıyor."
          },
          {
            date: "3 Ekim 2024",
            title: "ELEMENTIS Geliştirme Grubu, Sürdürülebilir Yaşam ve Esenlik Vizyonunu Yansıtan Yeni Web Sitesini Yayına Aldı",
            desc: "Kullanıcı deneyimini en üst seviyeye çıkaran yeni interaktif web sitemiz, sürdürülebilirlik ilkelerimizi ve inovasyonlarımızı tüm dünyaya tanıtıyor."
          },
          {
            date: "15 Ekim 2024",
            title: "ELEMENTIS Geliştirme Grubu, Geleceğin Yaşam Modellerini İnceleyen 'ELEMENTIS Yolu' Podcast Yayınını Başlattı",
            desc: "Esenlik, mental sağlık, bütünsel şifa, beslenme ve çevre dostu tasarım uzmanlarıyla yapılan söyleşilerin yer aldığı podcast serisi Spotify ve YouTube'da yayında."
          }
        ].map((article, i) => (
          <article key={i} className="p-8 bg-[#ced1bf]/5 rounded border border-[#ced1bf]/10 space-y-4 hover:bg-[#ced1bf]/10 transition-colors">
            <span className="text-sm font-light text-[#ca7d57] uppercase tracking-widest">{article.date}</span>
            <h3 className="text-xl md:text-2xl font-light text-white">{article.title}</h3>
            <p className="text-base font-light leading-relaxed text-[#ced1bf]/70">{article.desc}</p>
            <div className="pt-2">
              <span className="text-sm font-medium text-white hover:underline cursor-pointer">Detayları Gör →</span>
            </div>
          </article>
        ))}
      </div>
    </SubPageLayout>
  );
}
