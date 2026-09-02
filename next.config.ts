import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "32kb",
    },
  },
  images: {
    // Next, kaynak dosyayı bu formatlara istek anında dönüştürür — kaynakları
    // elle AVIF'e çevirmeye gerek yok. AVIF önce denenir, desteklemeyen tarayıcı
    // WebP'ye, o da yoksa orijinale düşer.
    formats: ["image/avif", "image/webp"],
    // UZAK GÖRSEL İZNİ YOK — bilerek boş.
    //
    // Bir kez `images.unsplash.com` kalıbı "uzak görsel kullanılmıyor"
    // gerekçesiyle silinmişti ve /blog'da 7 kırık görsel + 7 kez HTTP 400
    // üretti: `utils/blogData.ts` hâlâ Unsplash'e hot-link ediyordu ve
    // optimizer izni İSTEK ANINDA doğruluyor, derlemede değil — bu yüzden
    // `npm run build` sorunu yakalamamıştı. Regresyon kaydı: D072.
    //
    // Bugün kalıbın kaldırılmasının nedeni farklı: blog kapakları artık
    // gerçekten yerel (`utils/blogData.ts` -> `public/ImageContainer/*.jpg`,
    // `StaticImageData`) ve kod tabanında tek bir uzak görsel URL'i kalmadı.
    // Yani listenin boş olması "kullanılmıyor sanıyorum" varsayımına değil,
    // 21 rotanın `npm run test:images` ile doğrulanmasına dayanıyor.
    //
    // Buraya yeniden uzak bir kaynak eklenecekse: önce kalıbı ekle, sonra
    // görseli; ters sırada 400 alınır.
    remotePatterns: [],
  },
};

export default nextConfig;
