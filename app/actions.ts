"use server";
import { supabase } from "@/utils/supabase";
import { headers } from "next/headers";

export async function submitOnKayit(prevState: unknown, formData: FormData) {
  try {
    const ad = formData.get("ad") as string;
    const soyad = formData.get("soyad") as string;
    const eposta = formData.get("eposta") as string;
    const telefon_kod = formData.get("telefon_kod") as string;
    const telefon = formData.get("telefon") as string;
    const sehir = formData.get("sehir") as string;
    const ilgi_alanlari = formData.getAll("ilgi_alanlari") as string[];
    const kvkk_onay = formData.get("kvkk_onay") === "true";

    // Gerekli alanların doğrulanması
    if (!ad || !soyad || !eposta || !telefon || !kvkk_onay) {
      return { success: false, error: "Lütfen tüm zorunlu alanları doldurun." };
    }

    // IP adresinin ve User Agent'ın başlıklar üzerinden çekilmesi (Spam önleme & Güvenlik)
    const reqHeaders = await headers();
    const ip_address = reqHeaders.get("x-forwarded-for")?.split(",")[0] || reqHeaders.get("x-real-ip") || "unknown";

    // Supabase insert işlemi
    const { error } = await supabase
      .from("on_kayit")
      .insert([
        {
          ad,
          soyad,
          eposta,
          telefon: `${telefon_kod} ${telefon}`,
          sehir,
          ilgi_alanlari,
          kvkk_onay,
          ip_address,
          status: "yeni",
          source_url: "/",
        },
      ]);

    if (error) {
      console.error("Supabase insert hatası:", error);
      return { success: false, error: "Kayıt sırasında bir hata oluştu: " + error.message };
    }

    return { success: true, message: "Ön kaydınız başarıyla oluşturulmuştur. Sizinle en kısa sürede iletişime geçeceğiz." };
  } catch (err) {
    console.error("Form gönderim hatası:", err);
    return { success: false, error: "Beklenmeyen bir hata oluştu." };
  }
}
