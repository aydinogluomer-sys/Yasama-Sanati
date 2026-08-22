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
    // Blog kapak görselleri ve yazar avatarları `utils/blogData.ts` içinde uzak
    // Unsplash URL'leri olarak duruyor ve `next/image` ile render ediliyor.
    // Bu izin kaldırıldığında optimizer istek anında 400 döner ve /blog ile
    // /blog/[slug] üzerindeki tüm görseller kırılır (build bunu yakalamaz —
    // doğrulama derleme değil istek anındadır). Regresyon kaydı: D072.
    // Görseller yerel varlıklara taşındığında bu izin tekrar kaldırılabilir.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
