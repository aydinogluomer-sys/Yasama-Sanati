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
    // `images.unsplash.com` remote pattern'i kaldırıldı: kodda hiçbir yerde
    // uzak görsel kullanılmıyor, açık bırakmanın faydası yok.
  },
};

export default nextConfig;
