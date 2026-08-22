"use server";
import { getConsultationProgram } from "@/data/consultation-programs";
import type { ConsultationActionState } from "@/data/consultation-form";
import { readConsultationSource } from "@/utils/consultation-context";
import { getSupabase } from "@/utils/supabase";
import { headers } from "next/headers";
import {
  allowRequest,
  isDuplicateSubmission,
  markSubmission,
  normalizePhone,
} from "@/utils/rate-limit";

const SERVICE_UNAVAILABLE =
  "Form şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.";
const ON_KAYIT_FAILED =
  "Görüşme talebin şu anda alınamadı. Bilgilerini koruduk; lütfen tekrar dene.";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TOO_MANY =
  "Çok fazla deneme yapıldı. Lütfen birkaç dakika sonra tekrar dene.";
/** IP başına 10 dakikada en fazla 5 görüşme talebi. */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
/** Bülten için IP başına 10 dakikada en fazla 3 kayıt. */
const NEWSLETTER_RATE_LIMIT = 3;
/** Aynı e-posta 10 dakika içinde tekrar gönderilirse sessizce başarı döner. */
const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;
const DIAL_CODE_PATTERN = /^\+\d{1,4}$/;

function cleanText(value: FormDataEntryValue | null | undefined, maxLength: number): string {
  return typeof value === "string"
    ? value.trim().replace(/\s+/g, " ").slice(0, maxLength)
    : "";
}

export async function submitConsultationRequest(
  _prevState: ConsultationActionState,
  formData: FormData,
): Promise<ConsultationActionState> {
  try {
    const ad = cleanText(formData.get("ad"), 80);
    const soyad = cleanText(formData.get("soyad"), 80);
    const eposta = cleanText(formData.get("eposta"), 160).toLocaleLowerCase("tr-TR");
    const telefonKodu = cleanText(formData.get("telefon_kod"), 8);
    const telefon = cleanText(formData.get("telefon"), 32);
    const sehir = cleanText(formData.get("sehir"), 80);
    const programChoice = cleanText(formData.get("program"), 40);
    const kvkkOnay = formData.get("kvkk_onay") === "true";
    const website = cleanText(formData.get("website"), 120);
    const sourceUrl = readConsultationSource(
      cleanText(formData.get("source_url"), 160) || undefined,
    );

    const reqHeaders = await headers();
    const ipAddress = (
      reqHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      reqHeaders.get("x-real-ip") ||
      "unknown"
    ).slice(0, 64);

    if (!allowRequest(`consultation:${ipAddress}`, RATE_LIMIT, RATE_WINDOW_MS)) {
      return { success: false, error: TOO_MANY };
    }

    const program = getConsultationProgram(programChoice);
    const choseTogether = programChoice === "together";
    const phoneDigits = telefon.replace(/\D/g, "");
    const fieldErrors: ConsultationActionState["fieldErrors"] = {};

    if (!program && !choseTogether) {
      fieldErrors.program = "Bir program seç veya birlikte seçelim seçeneğini işaretle.";
    }
    if (ad.length < 2) fieldErrors.ad = "Adını en az iki karakterle yaz.";
    if (soyad.length < 2) fieldErrors.soyad = "Soyadını en az iki karakterle yaz.";
    if (!EMAIL_PATTERN.test(eposta)) fieldErrors.eposta = "Geçerli bir e-posta adresi yaz.";
    if (!DIAL_CODE_PATTERN.test(telefonKodu) || phoneDigits.length < 7 || phoneDigits.length > 15) {
      fieldErrors.telefon = "Geçerli bir telefon numarası yaz.";
    }
    if (!kvkkOnay) fieldErrors.kvkk_onay = "Devam etmek için KVKK onayını vermelisin.";

    if (Object.keys(fieldErrors).length > 0) {
      return {
        success: false,
        error: "Bazı alanları tamamlamamız gerekiyor. İşaretlenen alanları kontrol et.",
        fieldErrors,
      };
    }

    // Honeypot: bots receive the same neutral success response without writing data.
    if (website) {
      return {
        success: true,
        message: "Talebini aldık. Seninle iletişime geçeceğiz.",
      };
    }

    const supabase = getSupabase();
    if (!supabase) {
      return { success: false, error: SERVICE_UNAVAILABLE };
    }

    // Çift tıklama / geri tuşu tekrarı: kullanıcıya hata göstermeden, ikinci kaydı yazmadan geç.
    if (isDuplicateSubmission(eposta, DUPLICATE_WINDOW_MS)) {
      return {
        success: true,
        message: "Talebini aldık. Seninle iletişime geçeceğiz.",
      };
    }

    const { error } = await supabase.from("on_kayit").insert([
      {
        ad,
        soyad,
        eposta,
        telefon: normalizePhone(telefonKodu, telefon),
        sehir,
        ilgi_alanlari: program ? [program.databaseValue] : [],
        kvkk_onay: kvkkOnay,
        ip_address: ipAddress,
        status: "yeni",
        source_url: sourceUrl,
      },
    ]);

    if (error) {
      console.error("Supabase görüşme talebi hatası:", error);
      return { success: false, error: ON_KAYIT_FAILED };
    }

    markSubmission(eposta);

    return {
      success: true,
      message: "Talebini aldık. Seninle iletişime geçeceğiz.",
    };
  } catch (error) {
    console.error("Görüşme talebi gönderim hatası:", error);
    return {
      success: false,
      error: "Beklenmeyen bir sorun oluştu. Bilgilerini kontrol edip tekrar deneyebilirsin.",
    };
  }
}

export async function submitOnKayit(
  prevState: ConsultationActionState,
  formData: FormData,
): Promise<ConsultationActionState> {
  if (!formData.has("program")) formData.set("program", "together");
  if (!formData.has("source_url")) formData.set("source_url", "/");
  return submitConsultationRequest(prevState, formData);
}

export interface NewsletterResult {
  success: boolean;
  error?: string;
}

/**
 * Persists a newsletter signup into `public.newsletter_signups`. Real persistence —
 * no simulated success. Returns a clear, user-safe error when Supabase is unconfigured
 * or the insert fails (e.g. missing table / RLS policy).
 */
export async function submitNewsletter(email: string): Promise<NewsletterResult> {
  try {
    // Görüşme formuyla aynı sertleştirme: biçim doğrulaması, uzunluk sınırı, IP başına
    // hız sınırı ve mükerrer kayıt koruması. Önceden yalnızca boşluk kontrolü vardı.
    const normalized = cleanText(email ?? "", 160).toLocaleLowerCase("tr-TR");
    if (!EMAIL_PATTERN.test(normalized)) {
      return { success: false, error: "Lütfen geçerli bir e-posta adresi girin." };
    }

    const reqHeaders = await headers();
    const ipAddress = (
      reqHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      reqHeaders.get("x-real-ip") ||
      "unknown"
    ).slice(0, 64);

    if (!allowRequest(`newsletter:${ipAddress}`, NEWSLETTER_RATE_LIMIT, RATE_WINDOW_MS)) {
      return { success: false, error: TOO_MANY };
    }

    // Zaten kayıtlı bir adresi tekrar göndermek hata değildir; sessizce başarı döner.
    if (isDuplicateSubmission(`newsletter:${normalized}`, DUPLICATE_WINDOW_MS)) {
      return { success: true };
    }

    const supabase = getSupabase();
    if (!supabase) {
      return { success: false, error: SERVICE_UNAVAILABLE };
    }

    const { error } = await supabase
      .from("newsletter_signups")
      .insert([{ email: normalized }]);

    if (error) {
      // Benzersizlik ihlali (aynı e-posta) kullanıcı için hata değil.
      if (error.code === "23505") {
        markSubmission(`newsletter:${normalized}`);
        return { success: true };
      }
      console.error("Newsletter kayıt hatası:", error);
      return { success: false, error: "Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin." };
    }

    markSubmission(`newsletter:${normalized}`);
    return { success: true };
  } catch (err) {
    console.error("Newsletter gönderim hatası:", err);
    return { success: false, error: "Beklenmeyen bir hata oluştu." };
  }
}
