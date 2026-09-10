# CONTENT CREDIBILITY AUDIT

> Her riskli iddia: dosya · orijinal metin · risk · aksiyon · son metin · çerçeve.
> Tarih: **2026-08-23** · Yöntem: `app components data utils sections hooks` altındaki
> tüm `.ts`/`.tsx` dosyalarında terim taraması + her blog yazısının anlamsal okunması.

## NEDEN İKİNCİ TUR GEREKTİ

Önceki turda "sağlık iddiaları temiz" raporladım. **Değildi.** Taramalarım
`app components data` yollarını geziyordu; blog içeriği `utils/blogData.ts` altında
duruyor ve **hiç kapsamda değildi**. Bu, `/blog` görsel regresyonuyla birebir aynı
sınıf hata: kod kusurlu değildi, taramanın kapsamı yanlıştı.

İkinci bir kapsam boşluğu daha çıktı: QA rota listesinde 5 blog yazısından yalnız 1'i
vardı, yani 4 yazı hiç test edilmemişti. Rota keşfi otomatikleştirildikten sonra o
yazılarda da iddia bulundu.

---

## A. BLOG — `utils/blogData.ts`

| # | Orijinal | Risk | Aksiyon | Son metin / çerçeve |
|---|---|---|---|---|
| 1 | "kortizol (stres) seviyenizi **yarı yarıya indirecektir**" | **D** — nicel, kaynaksız fizyolojik iddia | Yeniden yazıldı | "…pek çok kişinin fark edilir bir sakinleşme olarak tarif ettiği basit bir alışkanlıktır." |
| 2 | "hücresel düzeyde **toksin atımını hızlandırır**" | **D** | Kaldırıldı | "Yavaş ve bilinçli nefes çalışmaları, gevşeme ve dikkat üzerine en çok araştırılan uygulamalardan biridir." |
| 3 | "Qi'yi dengeleyerek **organların fonksiyonlarını düzenler**" | **D** | Geleneksel çerçeve | "Geleneksel Çin tıbbı … bedeni bütünsel bir harita olarak okur." |
| 4 | "kendi kendini iyileştirme gücünü (**homeostazis**) harekete geçirmek" | **D** | Yeniden yazıldı | "…kişinin kendi bedenine ve zihnine dikkatini yöneltmesi." |
| 5 | travma → "meridyen kanallarında **blokajlara** yol açar" → "**kronik ağrılar** baş gösterir" | **D** — nedensellik | Geleneksel benzetme | "…bedeni bir akarsu gibi düşünen kadim bir benzetmedir; modern anatomik bir mekanizma tarifi değildir." |
| 6 | "**Her fiziksel semptom**, enerjetik bir tıkanıklığın dışa vurulmuş çığlığıdır." | **D** — mutlak nedensellik | Kaldırıldı | "Geleneksel öğreti bedeni bir bütün olarak okur; duygusal yaşantıyla bedensel duyum arasında bir bağ kurar." |
| 7 | "bedenin **kronik ağrılardan arındığı**, **uyku kalitesinin arttığı** … görülür" | **D** | Deneyim aktarımı | "Katılımcılar çoğunlukla derin bir gevşeme ve zihinsel berraklık hissi bildirir. Bunlar kişisel deneyim aktarımlarıdır; tıbbi bir sonuç vaadi değildir." |
| 8 | "**Modern tıp semptomları bastırmaya** odaklanırken…" (2 yer) | **E** — desteksiz karşıtlık | Kaldırıldı | Bütünsel yaklaşımın kendi tanımıyla değiştirildi |
| 9 | "tıkanıklık … er ya da geç fiziksel bedende **ağrı veya hastalık** olarak kendini gösterir" | **D** | Geleneksel çerçeve | "…zihinsel yorgunluğun bedende de hissedildiğini söyleyen kadim bir bakıştır. Bu, bir hastalık nedeni açıklaması değildir." |
| 10 | "çakralarımıza aktararak … dinlenme **sağlar**" | **C/D** | Çerçeve + deneyim | "Geleneksel öğretide … tarif edilir; katılımcılar çoğunlukla derin bir dinlenme hissi bildirir." |
| 11 | "tıkanıklıkların **fiziksel / duygusal rahatsızlıklara olan etkileri**" (2 yer) | **D** | Geleneksel tema | "geleneksel öğretinin bu hatlarla ilişkilendirdiği fiziksel / duygusal temalar" |
| 12 | "enerjisel korumanızı **güçlendirir**" | **B/C** | Geleneksel ilke | "geleneksel Reiki öğretisinde bu 5 ilke günlük bir pratik olarak önerilir" |

---

## B. MERİDYEN CİHAZI — `app/programlar/meridyen-terapi/page.tsx`

Bu blok üreticinin (Fohow) tanıtım broşürü diliydi. **Üreticinin kendi belgesi
bağımsız tıbbi kanıt değildir** ve bir eğitim sağlayıcısı bu dili aynen taşıyamaz.

| # | Orijinal | Risk | Aksiyon | Son metin |
|---|---|---|---|---|
| 13 | "Meridyen Terapi Cihazı **tamamen güvenli** bir üründür" | **D** — mutlak güvenlik | Yeniden yazıldı | "Hiçbir uygulama için 'tamamen güvenli' denemez. … kontrendikasyon listesi bağlayıcıdır." |
| 14 | "kalite uygunluk belgesi ile **tasdiklidir**" | **E** — doğrulanamaz | Kaldırıldı | — |
| 15 | "Sertifikalı bir **fizyoterapi cihazı** mıdır?" cevabı | **E** | Yeniden yazıldı | "Programımız cihazın tıbbi cihaz sınıflandırması hakkında bir iddiada bulunmaz… üreticiden ve ilgili resmî kurumdan doğrulanmalıdır." |
| 16 | "özel **fizyoterapi etkisi**" (2 yer) | **D** | Nötrleştirildi | "düşük voltajlı uyarım ve bası" |
| 17 | "**biyoakım** dalgaları" | **D** — sözde-teknik | Nötrleştirildi | "cihazın verdiği elektriksel uyarım" |
| 18 | "üst teknoloji … bioinformatik, nöroloji … son başarıları kendinde toplamıştır" | **E** — pazarlama | Kaldırıldı | Eğitim bağlamında ne olduğu anlatılıyor |

**Kontrendikasyon listesine DOKUNULMADI.** Hastalık adı içeriyor ama cihazın ne zaman
*kullanılmaması* gerektiğini anlatıyor — iddia değil, güvenlik bilgisi.

---

## C. DİĞER YÜZEYLER

| # | Dosya | Orijinal | Aksiyon |
|---|---|---|---|
| 19 | `sections/Introduction` | "şifa … dengenin **kökten ve kalıcı** olarak yeniden kurulması" + örtük "modern tıp semptom bastırır" | "kişinin kendi ritmini ve dengesini tanımasına alan açan bir çalışma biçimi" |
| 20 | `components/Client/TherapyScene3D` | "Travma iyileştirme", "Duygusal iyileşmenin merkezi" — hiç çerçevesi yoktu | Sınır notu eklendi (Meridian3D ve AcupointPanel ile aynı) |
| 21 | `app/programlar/page.tsx` | "blokajları kaldırma", "hücresel düzeyde canlanma" | Önceki turda düzeltildi, doğrulandı |
| 22 | `app/programlar/meridyen-terapi` introText | "enerji dengesizliklerini **teşhis** etmeyi ve hücresel düzeyde **şifa vermeyi** öğreneceksiniz" | Önceki turda düzeltildi |

---

## DEĞİŞTİRİLMEYENLER — ve nedenleri

| Metin | Neden bırakıldı |
|---|---|
| "zihinsel arınma" (Mucizeler Kursu) | ACIM'in kendi tanımı; spiritüel pratik, fizyolojik iddia değil |
| "Modül 2: Doğal Nefes Analizi ve Blokajlar" | Nefes alışkanlığındaki kısıtı **tespit etme** yöntemi; kaldırma vaadi değil |
| Meridian3D `physical` alanları | Zaten görünür disclaimer altında, geleneksel eşleştirme olarak sunuluyor |
| Kontrendikasyon listeleri, `acupoints.ts` `caution` alanları | Güvenlik bilgisi — kullanıcıyı korur |
| Burun/diyafram anatomisi anlatımı | Temel fizyoloji, tartışmalı değil (kategori A) |

---

## DOĞRULAMA

Son tarama (`app components data utils sections hooks`, `.ts`/`.tsx`):

```
kortizol 0 · toksin 0 · homeostaz 0 · organ fonksiyon 0 · kronik ağrı 0
tasdiklidir 0 · fizyoterapi etkisi 0 · biyoakım 0 · hücresel düzeyde 0
"Her fiziksel semptom" 0 · "semptomları bastır" 0 · "kökten ve kalıcı" 0
"hastalık olarak kendini göster" 0 · "rahatsızlıklara olan etki" 0
```

Tek kalan "tamamen güvenli" eşleşmesi, o ifadeyi **reddeden** yeni cümledir.

## KAYNAK POLİTİKASI

Bu turda hiçbir iddia bilimsel kaynakla desteklenmedi; desteklenemeyenler daraltıldı
veya kaldırıldı. İleride kaynak eklenecekse öncelik sırası:
sistematik derleme → hakemli derleme → kılavuz/tanınmış tıbbi kurum → birincil
hakemli araştırma → geleneksel çerçeve kaynağı (açıkça "geleneksel" etiketiyle).
Wellness blogu, eğitim/ürün satıcısı, SEO makalesi ve testimonial kaynak sayılmaz.
Bir çalışma bulunsa bile popülasyonu/müdahalesi genellenmez ve programın kendi
metodu o kanıta eşitlenmez.
