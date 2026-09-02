/** Sayfada görünen SSS listesi. Hem sayfa hem FAQPage şeması bu tek kaynaktan beslenir,
 *  böylece şema ile ekrandaki metin bir daha ayrışamaz. */
export interface FAQ {
  q: string;
  a: string;
  /**
   * Ayırıcı başlığı (docs/AWWWARDS-90-BLOCKERS.md plan 13).
   *
   * Sayfa altı soruluk tek bir düz listeydi; ziyaretçi "benim sorum hangi
   * aşamayla ilgili" ayrımını yapamıyordu. Sorular karar anına göre ikiye
   * bölündü: kayıttan ÖNCE merak edilenler ve kayıttan SONRASI.
   *
   * Kategori yalnız görsel gruplamadır; `FaqSchema` bu alanı okumaz, şema
   * çıktısı değişmez. Dizi sırası grupların sırasıdır — sayfa `category`
   * değiştiği yere ayırıcı koyar, ayrıca bir sıralama yapmaz.
   */
  category: string;
}

export const FAQS: FAQ[] = [
  {
    category: "Başlamadan Önce",
    q: "Eğitim programlarına katılmak için bir ön koşul var mıdır?",
    a: "Eğitimlerimizin büyük çoğunluğu başlangıç seviyesinden başladığı için herhangi bir ön koşul aranmamaktadır. Ancak ileri seviye modüller veya uzmanlık programları için ilgili giriş eğitimini tamamlamış olmanız gerekebilir. Detaylar her eğitimin kendi sayfasında açıkça belirtilmiştir.",
  },
  {
    category: "Başlamadan Önce",
    q: "Ön görüşme süreci nasıl işler ve ücretli midir?",
    a: "Sitemizdeki form üzerinden ücretsiz ön görüşme talebini iletebilirsiniz. Görüşmede ihtiyacınızı, sorularınızı ve size uygun çalışma temposunu birlikte netleştiririz.",
  },
  {
    category: "Başlamadan Önce",
    q: "Eğitim ücretlerini ve ödeme seçeneklerini nasıl öğrenebilirim?",
    a: "Güncel eğitim ücretleri ve ödeme seçenekleri, ihtiyacınıza en uygun program birlikte belirlendikten sonra ücretsiz ön görüşmede paylaşılır. Böylece yalnızca sizin için doğru olan programın koşullarını konuşmuş oluruz.",
  },
  {
    category: "Eğitim ve Sonrası",
    q: "Eğitimler online mı yoksa yüz yüze mi gerçekleşiyor?",
    a: "Programlarımızın yapısına göre formatlar değişkenlik gösterir. Örneğin, Mucizeler Kursu tamamen çevrimiçi (online) olarak Zoom üzerinden yürütülürken; Meridyen Terapi ve Nefes Koçluğu gibi fiziksel uygulama gerektiren eğitimler, online teorik dersler ve yüz yüze yoğun pratik atölye çalışmaları (workshop) içeren karma (hibrit) bir formatta düzenlenir.",
  },
  {
    category: "Eğitim ve Sonrası",
    q: "Sertifikalarınız uluslararası geçerliliğe sahip midir?",
    a: "Programlarımızı tamamlayan katılımcılara Yaşama Sanatı Akademisi'nin kendi uzmanlık sertifikası verilir. Sertifika, tamamlanan modülleri ve uygulama değerlendirmesini belgeler; tıbbi tanı veya tedavi yetkisi vermez.",
  },
  {
    category: "Eğitim ve Sonrası",
    q: "Eğitimlerin ardından süpervizyon veya mentorluk desteği veriyor musunuz?",
    a: "Kesinlikle. Sertifikalı uzmanlık eğitimlerimizin ardından katılımcılarımızı yalnız bırakmıyoruz. Belirli aralıklarla düzenlenen süpervizyon çemberleri, vaka analizi toplantıları ve topluluk içi grup paylaşımları ile pratik yetkinliğinizi pekiştirmenize ve profesyonel hayata adım atmanıza destek oluyoruz.",
  },
];
