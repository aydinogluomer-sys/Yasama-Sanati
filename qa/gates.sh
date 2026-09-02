#!/usr/bin/env bash
#
# Bütün çalışma zamanı kapılarını TEK TEK, sırayla koşar.
#
# NEDEN VAR — bu bir kolaylık scripti değil, bir DOĞRULUK scripti.
#
# `npm run verify:runtime` kapıları `&&` ile zincirler. İki sorunu var:
#
#  1. Çıktı kaybı. Zincirdeki her `npm run` kendi çıktısını basar ama arka planda
#     tamponlandığı için pratikte yalnız SON komutun çıktısı okunabiliyor.
#     Hangi kapının ne bulduğu görünmüyor.
#
#  2. Yanlış alarm. Aynı sunucuya aynı anda birden çok Playwright oturumu
#     binerse kapılar birbirini bozar. Bu ölçülerek görüldü — iki ayrı turda
#     şunlar "hata" verdi ve temiz koşuda hepsi GEÇTİ:
#
#       test:viewports  → /the-story'de 30 sn zaman aşımı
#       test:keyboard   → mobil menü açılamadı (3 bulgu)
#       test:reveal     → webkit'te açılım görünmedi
#       test:transition → JS kapalı h1 opaklığı 0.9848 (animasyon bitmemişti)
#
#     Hiçbiri gerçek değildi. `docs/RELEASE-READINESS.md` "ÖLÇÜM HİJYENİ"
#     bölümü bunu zaten söylüyor; bu script o kuralı uygulanabilir hale getirir.
#
# KULLANIM
#   npm run build && npx next start -p 3400   # ayrı bir terminalde
#   bash qa/gates.sh [log-dosyasi]
#
# Koşarken başka hiçbir şey sunucuya dokunmamalı — ekran görüntüsü scriptleri,
# ikinci bir kapı turu, `npm run build` dahil. Aksi halde ölçtüğün şey sitenin
# değil makinenin durumu olur.
#
# Aynı anda İKİ tur çalıştırma. Bir turu yarıda kesersen artıklarının bittiğinden
# emin ol; iki tur aynı sunucuya binince ürettiği hatalar gerçek değildir.

LOG="${1:-qa-gates.log}"
: > "$LOG"

GATES="test:e2e test:links test:images test:seo test:fonts test:a11y test:hero-contrast test:viewports test:keyboard test:zoom test:browsers test:reveal test:transition test:selection"
FAIL=0

for g in $GATES; do
  out=$(npm run "$g" 2>&1)
  code=$?
  last=$(printf '%s\n' "$out" | grep -vE '^\s*$' | tail -1)
  if [ $code -ne 0 ]; then
    FAIL=$((FAIL + 1))
    status="KALDI"
  else
    status="GECTI"
  fi
  printf '%-22s %-6s %s\n' "$g" "$status" "$last" | tee -a "$LOG"
  if [ $code -ne 0 ]; then
    printf '  --- %s cikti (son 30 satir) ---\n' "$g" >> "$LOG"
    printf '%s\n' "$out" | tail -30 | sed 's/^/  /' >> "$LOG"
  fi
  # NOT: burada eskiden `taskkill //F //IM chrome.exe` vardı — KALDIRILDI.
  #
  # Amacı "bir sonraki kapı temiz başlasın" idi ama çakışmayı zaten SIRALI
  # çalıştırma çözüyor; Playwright kendi tarayıcısını kapatıyor. Global bir
  # chrome katliamı ise ters tepti: yarıda kesilmiş bir tur artığı döngüde
  # kalınca ÇALIŞAN turun tarayıcısını öldürüyor ve şu hatayı üretiyordu:
  #     page.goto: Target page, context or browser has been closed
  # Yani kapıyı korumak için konan satır, kapının kendisini bozuyordu.
done

printf '\nKALAN KAPI SAYISI: %d\n' "$FAIL" | tee -a "$LOG"
exit $FAIL
