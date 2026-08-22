/**
 * Süreç-içi sliding-window limitleyici ve mükerrer gönderim koruması.
 *
 * Neden bellek içi: harici bir servis (Redis/Upstash) eklemeden, şema varsayımı yapmadan ve
 * her gönderime bir veritabanı turu bindirmeden çalışır. Sınırı açıkça yazıyorum: **sayaç
 * sunucu örneği başınadır ve yeniden başlatmada sıfırlanır.** Tek örnekli bir dağıtımda
 * (`next start`) gerçek koruma sağlar; çok örnekli/serverless bir dağıtıma geçilirse paylaşımlı
 * bir sayaca taşınmalıdır — bu, botu tamamen durdurmaz, ucuz kötüye kullanımı durdurur.
 */

type Stamp = number;

const HOUR = 60 * 60 * 1000;

/** IP başına pencere içindeki gönderim zamanları. */
const ipHits = new Map<string, Stamp[]>();
/** E-posta başına son başarılı gönderim zamanı. */
const recentSubmissions = new Map<string, Stamp>();

/** Map'lerin sınırsız büyümesini engeller; her çağrıda ucuz bir süpürme yapar. */
function sweep(now: Stamp, windowMs: number) {
  for (const [key, stamps] of ipHits) {
    const fresh = stamps.filter((t) => now - t < windowMs);
    if (fresh.length === 0) ipHits.delete(key);
    else ipHits.set(key, fresh);
  }
  for (const [key, t] of recentSubmissions) {
    if (now - t > HOUR) recentSubmissions.delete(key);
  }
}

/**
 * `key` (genelde IP) için pencere içinde `limit` adetten fazla istek varsa false döner.
 * Kayıt her çağrıda tutulur, yani reddedilen istek de sayılır — ısrarcı bot hızlanamaz.
 */
export function allowRequest(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  sweep(now, windowMs);
  const stamps = (ipHits.get(key) ?? []).filter((t) => now - t < windowMs);
  stamps.push(now);
  ipHits.set(key, stamps);
  return stamps.length <= limit;
}

/**
 * Aynı e-postanın `windowMs` içinde ikinci kez gönderilip gönderilmediğini söyler.
 * Çift tıklama ve geri-tuşu tekrarları için; kullanıcıya hata göstermek yerine
 * çağıran taraf sessizce başarı döndürür.
 */
export function isDuplicateSubmission(email: string, windowMs: number): boolean {
  const now = Date.now();
  const previous = recentSubmissions.get(email);
  return previous !== undefined && now - previous < windowMs;
}

export function markSubmission(email: string): void {
  recentSubmissions.set(email, Date.now());
}

/** Telefonu tek biçime indirir: `+90 5327893753` → `+905327893753`. */
export function normalizePhone(dialCode: string, phone: string): string {
  const code = dialCode.replace(/[^\d+]/g, "");
  const digits = phone.replace(/\D/g, "").replace(/^0+/, "");
  return `${code}${digits}`;
}
