# Yaşama Sanatı — Developer / Agent Handoff (claude.md)

Bu dosya, projede çalışan yapay zeka ajanları (Claude, Gemini, Antigravity vb.) ve geliştiriciler için mimari notları ve son yapılan güncellemeleri barındırır.

## En Son Tamamlanan İşlemler (Footer Redesign & Alignment Pass)

Footer alanı, kullanıcı deneyimini ve marka prestijini en üst düzeye çıkarmak için **Awwwards standardında** bir cila geçişine (polish pass) tabi tutulmuştur.

### Yapılan Düzenlemeler:
1. **Dikey Hizalama (Ruler Alignment):**
   - Sayfanın en üstünde yer alan header'ın `"YAŞAMA SANATI"` metninin başlangıç `"Y"` harfi ile dikey bir cetvel düşünülerek, footer'daki tüm içeriklerin sol sınırları `pl-0` olacak şekilde sıfırlanmış ve bu hizaya tam olarak oturtulmuştur.
   - Sol kenardaki dekoratif dikey çizgi, desktop görünümde `left-[-32px]` konumuna (sayfa padding alanına) ötelenmiş ve logo yazısının üstüne binmesi engellenmiştir.
   - Sol üstteki sparkle yıldızı (`lg:-left-[37px]`) ve yaşam çizgisi (`left-[-37px]`) bu dikey cila çizgisine göre konumlandırılmıştır.
   - Sağdaki bülten kartı ve legal linkler, en sağdaki hamburger menü butonunun dikey hizasına göre sonlandırılmıştır.

2. **Dikey/Yatay Gradyanlı Bölücüler:**
   - Kolonlar arası dikey ayrım çizgileri kısaltılmış (`top-20 bottom-20`), düz ve sert çizgiler yerine uçları tamamen şeffaflıkla eriyen linear-gradient çizgiler kullanılmıştır.

3. **Mikro Konum İmza Alanı:**
   - Koordinat satırı (`38.4237° N · 27.1428° E`) üzerinde yer alan geçersiz Tailwind opaklık sınıfı (`border-[#F3EFE6]/06`) standart `border-[#F3EFE6]/[0.06]` olarak düzeltilmiştir.
   - Lokasyon bilgisinin başına, aktifliği simgeleyen animasyonlu bir mikro nokta (`animate-pulse` ve `animate-ping`) yerleştirilmiştir.

4. **Bülten Kartı Kontrolleri:**
   - E-posta input'u, kilit simgeli güvenlik notu (`items-start`), hover animasyonlu abone ol butonu (`hover:bg-[#D79A70]`) ve premium renklendirmeler tamamlanmıştır.

## Kritik Dosyalar ve Değişiklik İzinleri
- **Düzenlenebilir Alanlar:** Yalnızca footer ile ilişkili olan `sections/Footer/**`, `components/Client/FooterBackgroundText.tsx` ve `components/Client/FooterNewsletter.tsx` dosyalarıdır.
- **Değiştirilmemesi Gerekenler:** Global tema, header, hero ve site geneli diğer paylaşımlı bileşenlerdir.

## Geliştirici İpuçları
- Tailwind CSS sınıflarında köşeli parantez içindeki opaklık veya özel değer tanımlamalarına dikkat edilmelidir (Örn: `border-[#F3EFE6]/[0.06]`).
- Animasyonlar `motion/react` kütüphanesi üzerinden yürütülmekte olup, kullanıcıların `reduced-motion` ayarları her zaman göz önünde bulundurulmalıdır (`motion-reduce:transform-none` vb.).
