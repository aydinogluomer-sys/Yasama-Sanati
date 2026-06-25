# Yaşama Sanatı — Bütünsel Şifa ve Eğitim Akademisi

Bu proje, **Yaşama Sanatı Akademisi** için modern, premium ve Awwwards standartlarında tasarlanmış bir Next.js web uygulamasıdır. Nefes koçluğu, reiki, meridyen terapi, hipnoterapi ve bütünsel şifa eğitimleri için dijital bir platform sunar.

## Teknolojik Altyapı
- **Core:** Next.js 15+ (App Router), React 19, TypeScript
- **Styling:** TailwindCSS (Premium HSL tabanlı renk paleti ve özel şablonlar)
- **3D Render:** Three.js / React Three Fiber / @react-three/drei (Meridyen ve anatomi canlandırmaları için interaktif 3D sahne entegrasyonu)
- **Animasyon:** Motion (Framer Motion) ile yumuşak mikro-etkileşimler, Scroll Parallax ve sayfa geçişleri
- **Pürüzsüz Kaydırma:** React Lenis pürüzsüz kaydırma motoru

## Proje Yapısı
```txt
├── app/                  # Next.js App Router (Sayfalar ve API route'ları)
├── components/           # Yeniden kullanılabilir Server ve Client bileşenleri
│   ├── Client/           # Client-side (interaktif, motion, 3D) bileşenler
│   ├── Server/           # Server-side (statik, optimize) bileşenler
│   └── SVGComponents/    # Optimize edilmiş inline SVG çizim ve logoları
├── sections/             # Sayfa bazlı görsel bölümler ve grid kompozisyonları
├── public/               # Statik varlıklar, 3D modeller (.glb/.gltf) ve resimler
├── utils/                # Yardımcı kütüphaneler, kamera odaklama ve veri yönetimi
└── types/                # TypeScript tip tanımlamaları
```

## Öne Çıkan Özellikler & Son Güncellemeler

### 1. 3D Meridyen ve Anatomi Görselleştirici
- Etkileşimli 3D insan anatomisi modeli üzerinden bedenin meridyen kanallarını ve enerji noktalarını görselleştirme imkanı.
- Akıcı kamera geçişleri (`utils/cameraFocus.ts`) ve materyal optimizasyonları (`utils/materials.ts`).

### 2. Awwwards Seviye Footer Tasarımı (Antigravity Redesign)
- **4 - 5 - 3 Grid Yapısı:** Premium ve dengeli görsel kompozisyon.
- **Hizalama Bütünlüğü:** Tüm sayfalarda geçerli olan sol kenar (Header "Y" harfi cetveli) ve sağ kenar (Header Hamburger Menü cetveli) hizasına sıfır hata ile entegre edilmiş yerleşim.
- **Dekoratif Yaşam Çizgisi (Lifeline):**commit  Sol üst parlayan yıldızdan süzülerek arka planda hafifçe akan ve sonrasında sönen cila çizgisi.
- **Gelişmiş Bülten Kartı (Newsletter):** 44px input yüksekliği, premium placeholder renkleri, kilit güvenlik simgesi ve üst seviye hover efektleri.
- **Mikro-Animasyonlu Nokta:** Canlı durumu simgeleyen `animate-ping` ve `animate-pulse` efektli mikro konum imza alanı.

## Çalıştırma ve Canlı Geliştirme
Geliştirme sunucusunu başlatmak için:
```bash
npm run dev
```
Üretim derlemesi oluşturmak için:
```bash
npm run build
```
Derlenmiş projeyi başlatmak için:
```bash
npm run start
```
