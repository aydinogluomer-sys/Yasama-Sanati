# Decisions

## D001 — Phase order is mandatory

Reason: The implementation plan explicitly prohibits skipping or reordering phases. This prevents isolated visual fixes from drifting away from the intended creative direction.

## D002 — Documentation first, UI second

Reason: The project needs a stable operating model before more visual work begins. Phase 0 creates the shared context needed for later design and engineering decisions.

## D003 — Local docs mirror the implementation plan

Reason: The workflow needs a repo-local copy of the plan and progress files so subsequent passes can update state without depending on external notes.

## D004 — No UI edits during phase 0

Reason: The current step is establishing discipline, inventory, and decision logs. Visual edits are deferred until the current phase is complete.

## D005 — Editorial Wellness Academy is the selected direction

Reason: This direction fits the current product story, keeps the site premium rather than mystical, and gives all sections a shared language.

## D006 — Primary conversion is contact or session request

Reason: The site needs one clear action that aligns with trust-building content and reduces cognitive load.

## D007 — The home page should follow promise -> clarify -> prove -> deepen -> convert -> close

Reason: The current section sequence needs an editorial flow, not just a list of blocks.

## D008 — Narrative repetition must be minimized

Reason: Intro, story, wellness, and retreat sections must support one another instead of repeating the same claim in different wording.

## D009 — The design system must be authored before UI tweaks

Reason: The section-level polish work needs shared vocabulary and reusable rules before any code-level visual changes begin.

## D010 — Motion remains restrained and utility-driven

Reason: Premium calm depends on movement that helps orientation, not movement that calls attention to itself.

## D011 — Sections below 8.8 must be tracked explicitly

Reason: Quietly patching weak sections hides the actual quality gaps and makes the loop harder to manage.

## D012 — Footer quality should not mask the rest of the page

Reason: The footer is already ahead of most sections, so it should be treated as a reference point rather than a reason to stop.

## D013 — The hero should trade some poetry for clarity

Reason: The first screen must explain the offer fast enough to support conversion while preserving the calm premium tone.

## D014 — Native scrolling wins over cinematic snap

Reason: Automatic Lenis section snapping made users fight the page. Lenis remains optional smooth scrolling and is not mounted for reduced-motion users.

## D015 — 3D is desktop progressive enhancement

Reason: WebGL supports the meridian story but is deferred until near the viewport. Mobile and reduced-motion users receive a complete static explanation.

## D016 — Native video controls are the accessible film interface

Reason: Browser controls provide reliable play, pause, seek, volume, fullscreen, and keyboard semantics without recreating a media player.

## D017 — Build-critical data stays local

Reason: The lead form must not depend on a third-party gist during static generation. Its relevant country/dial-code set is repository-owned.

## D018 — Tablet navigation collapses before crowding

Reason: Six navigation links plus actions were compressed at 768px. Full navigation now appears at the wide-desktop breakpoint while the menu remains available below it.

---

# Silhouette Sprint (Round 2 — visible redesign)

## D019 — Round 2 success = visible silhouette change, not polish

Reason: Round 1 reached 94/100 quality but the user perceives no change. Any work that only improves invisible quality is secondary this sprint. Every phase must pass the screenshot-diff test.

## D020 — Section order preserved, visual mass changed

Reason: Content order (Hero → Introduction → WellnessSanctuary → Innovation → ElementisStory → SustainableRetreat → Form → Footer) stays; proportion, scale, rhythm and transitions change.

## D021 — Editorial typography is the highest-leverage first move

Reason: The largest gap is typography drama (5.0). A clamp-based display scale using the already-loaded Cormorant serif changes perception fastest, before hero/section work depends on it. Implemented in Phase 2 before Phase 3 hero.

## D022 — Centralize motion tokens before scattering more motion

Reason: The `[0.24,0.43,0.15,0.97]` easing and durations are copy-pasted across components. A single `utils/motion/tokens.ts` + `variants.ts` is created so new motion stays consistent and the "one motion language" rule holds.

## D023 — No external text-split dependency (SplitType etc.) without justification here

Reason: Plan §3.2.4 — prefer an internal ResizeObserver-based `DynamicLineReveal`. An external dep would only be added if the internal one proves unstable, and only after a logged reason.

## D024 — No new runtime dependency by default; GSAP only on proven need

Reason: Plan §5.5 dependency budget. Motion + Lenis + Three must be tried first. GSAP is added only if a hero/section timeline genuinely cannot be expressed cleanly in Motion, logged before install.

## D025 — Accessibility and performance from Round 1 are a floor, not a ceiling

Reason: a11y (9.0) and perf (8.7) must not regress while motion becomes more expressive. Every new motion layer ships with a reduced-motion fallback and stays transform/opacity-based.

## D026 — Word-level reveal instead of ResizeObserver line-grouping

Reason: `DynamicLineReveal` reveals per word (each word owns its clip + rises from its baseline). This is responsive by construction — no manual line arrays, no resize recompute/flicker, and deterministic markup so there is no hydration mismatch. Reduced motion is handled globally by the layout MotionConfig (transforms collapse to final). Satisfies the Phase 6 acceptance (no overlapping lines at intermediate widths, no hydration warnings) more robustly than measuring lines.

## D027 — `min-w-0` on flex/grid text items is the standard overflow fix

Reason: Wide paragraphs (`text-body-lg`) overflowed on mobile because flex/grid items default to `min-width: auto` and won't shrink below content. Fixed with `min-w-0` on the item plus a viewport-relative readability cap (`max-w-[86vw] sm:max-w-[…]`), not by shrinking content. Applied to the hero proposition and Introduction body.

## D028 — SOTD pass loop opened (awwwards-loop iteration 08+)

Reason: After re-testing all 12 silhouette phases (tsc + build + 3-viewport screenshots, all PASS), the site is in the "well-polished" band. A self-paced improvement loop now targets the Awwwards SOTD band against the official weighting (Design 40 / Usability 30 / Creativity 20 / Content 10) and the 12 project-critical parameters. Backlog tracked in `awwwards-loop/state.json`; per-iteration evidence in `awwwards-loop/reports/iteration-NN.md`.

## D029 — Mobile hero play glyph moved off dead-centre

Reason: The legacy full-screen mobile film button centred its play glyph, which collided with the new editorial headline (`Beden, zihin / ve enerji, / tek bütün.`). The glyph moved to upper-centre with a discreet `bg-black/20 ring-1 ring-white/40 backdrop-blur-sm` pill; the full-hero tap-to-play target is preserved and desktop/tablet are untouched. Fixes a visible Usability/Responsive defect found in the phase re-test.

## D030 — Footer opens with an editorial closing scene (parameter #12)

Reason: The footer was a competent sitemap but not a "closing scene." A closing band now precedes the practical columns: kicker + giant serif `Başlamak için bir nefes yeter.` (`text-display-m`, `bir nefes` italic + HandwritingMark underline) + supporting copy + hero-grammar CTAs. This makes the page end on an art-directed, screenshot-worthy finale that ties to the breath/meridian motif and routes to conversion, instead of dropping straight into a link grid. The faint brand watermark is kept (different sentence → editorial layering, no doubling). Reuses the existing `--text-display-m` token; no new dependency.

## D031 — Reveal-gated QA is captured on the production build

Reason: `whileInView` reveals (footer columns/newsletter/closing scene) do not fire reliably under headless **dev**-server jump-scroll (Lenis + IntersectionObserver), and forcing `prefers-reduced-motion` does not flip this footer's `whileInView` to visible. The production server reproduces real-scroll reveals, so screenshots for reveal-gated content use the prod build (e.g. port 3301). `qa/shot.mjs`/`qa/probe.mjs` gained an `RM=1` flag and footer-position fields to support this.

## D032 — OG image route uses the edge runtime; submission-polish baseline added

Reason: User approved `awwwards-sotd-implementation.md`. Phase 15 (Submission Polish) added a custom branded 404 (`app/not-found.tsx`), a dynamic branded OG card (`app/opengraph-image.tsx` via `next/og`), and `metadataBase`/`openGraph`/`twitter` metadata. The OG route **must** run on the edge runtime: node static prerender of `/opengraph-image` fails `next build` with `TypeError: Invalid URL` (Next 15 metadata-image static-gen issue); `export const runtime = "edge"` is the canonical `next/og` path and builds + serves under `next start`. Turkish uppercase in the OG is written literally because satori's `textTransform: uppercase` produces dotless-I mis-casing (ŞIFA/EĞITIM instead of ŞİFA/EĞİTİM).

## D033 — Sub-page hero headlines use the serif display voice

Reason: The home established serif (Cormorant) as the editorial *display* voice, but every sub-page hero in `SubPageLayout` used the giant sans (`text-144`), breaking site-wide design-system consistency (a Design criterion). Changed the shared `SubPageLayout` hero `<h1>` to `font-serif text-display-l font-normal` (viewport-fluid clamp) so all sub-pages (programlar listing + detail, egitmenler, the-story, sss, placeholders) match the home. Description copy stays sans (consistent with the home body). One-component change; verified on the prod build at desktop + mobile. Extended in iteration 15 to the blog article `<h1>` (`components/Client/BlogDetailContent.tsx` → `font-serif text-display-s`), so display typography is now unified to the serif voice across the entire site (home + sub-pages + blog).

## D035 — Cormorant Garamond *italic* is the permanent accent/signature voice (Kisthe dropped) — RESOLVED

Reason: Phase 2 assigned the logo/accent/signature role to **Kisthe**, but the file was not in the repo and its commercial license + Turkish glyph coverage (ş ğ ı İ ç) were unverified. **User decision (approved): keep Cormorant Garamond italic as the permanent accent voice — do not add Kisthe.** Rationale: handwriting/signature display fonts frequently lack Turkish glyphs (e.g. "Şifa" would drop "Ş" to a system font and look broken); Cormorant loads with full `latin-ext` Turkish, is more elegant, removes a font from the budget, and improves consistency + performance. The role stays routed through the `--font-kisthe` token (`app/globals.css`) which resolves to Cormorant; `SignatureWordmark` applies italic. Font budget is therefore **3 active faces** (Cormorant, Basis Grotesque Pro, Space Mono) with Cormorant covering both display and the italic signature voice. The NavBar logo stays the existing designed SVG `LogoFull`.

## D036 — Phase 2 typographic system: outline layer, Space Mono micro-labels, Katya stage, ODDWORKS scene

Reason: Implemented the Phase 2 visible silhouette shift as additive, token-driven layers (no regression to verified sections): Space Mono micro-label voice (`TypographyLabel`, and `EditorialSectionTitle` index changed serif-italic → Space Mono); an atmospheric outline-serif layer (`OutlineTypographyLayer`, hero "ŞİFA"); a Katya manifesto stage (`TypographyStage`) that replaced the Introduction's fragile manual mobile/desktop line arrays with a responsive-safe word reveal + selected-word accent; and one ODDWORKS signature scene (`SignatureTypeScene`/`RotatedTypeMass` — "Altı Disiplin" oversized NEFES ✦ ZİHİN ✦ ENERJİ mass with solid/outline mix and a vertical accent), inserted between Innovation and the cream Story with matching `SectionSeam` tones (`#222B27`). All decorative type is aria-hidden with reduced-motion fallbacks; verified prod build, `overflowX` 0 at 1440/768/390, single `<h1>`, Turkish glyphs correct, shared JS unchanged.

## D038 — Mobile ODDWORKS header stacking + micro-label legibility

Reason: Post-review found the `SignatureTypeScene` header (`TypographyLabel` + rule + serif heading) used a single `flex items-center` row that, on 390px, forced both the "ALTI DİSİPLİN" label and the "Tek bütün, altı yol." heading to wrap and crowd side by side. Changed to `flex-col … md:flex-row` so on mobile the label+rule sit on one line with the heading stacked full-width below (desktop row preserved). Also bumped `TypographyLabel` from `text-[0.68rem]` (~10.9px) to `text-[0.72rem]` with slightly tighter tracking, and the ODDWORKS vertical accent word from `0.7rem` to `0.78rem`, for legibility. Verified prod at 390/1440: no cramped overlap, `overflowX` 0, single `<h1>`.

## D037 — Editorial reading-measure + CLS font-fallback hardening

Reason: Post-Phase-2 review flagged two real typography gaps. (1) **Line length:** program detail prose (`CourseDetailTemplate` intro + instructor bio) ran the full ~800px column on wide screens (~90+ chars), hurting the editorial premium feel; capped to `max-w-[42rem]` (~65–70ch). Legal pages already use `max-w-4xl`; home/section prose already capped (`max-w-[44rem]`/`[40rem]`). (2) **CLS:** the local Basis Grotesque Pro and Cormorant `next/font` declarations now set `display: "swap"` + an explicit `fallback` stack (Basis also `adjustFontFallback: "Arial"`) so the swap from the fallback metrics does not shift layout. Body contrast verified: `#ced1bf`/0.7 over `#2B3530` ≈ 4.75:1 (passes WCAG AA for normal text). Build green; no layout regression.

## D034 — Blog articles lead with the article (SubPageLayout `hideHero`)

Reason: Blog article pages rendered the giant "Blog & Bilgi Bankası" section hero before the article, burying the actual content. Added an opt-in `hideHero` prop to `SubPageLayout` (skips the section hero, adds `pt-32 md:pt-44` so content clears the fixed NavBar); `app/blog/[slug]/page.tsx` opts in so the article (back-nav + category + serif title + meta + cover) is the page hero. Default `false` keeps every other sub-page unchanged (verified via a `/programlar` regression check). Improves the reading flow without touching other routes.

## D038 — human.glb ships lean; therapy scene breathes skeletally

Reason: the shared anatomical model carried a 44-clip game-animation library (6.4MB total) of which nothing rendered. Kept only `A_TPose` (meridian bind pose) + `Idle_Loop`, then dedup/weld/quantize → 0.49MB. `TherapyScene3D` plays `Idle_Loop` via AnimationMixer (spec's "breathing idle"), with a procedural micro-scale fallback if the clip is ever absent. Both 3D scenes visually verified after the swap.

## D039 — Video assets: 1080p CRF-based re-encode with SSIM gate

Reason: hero autoplay videos (every visitor) and the opt-in film shipped at 1440p with generous bitrates. Policy: re-encode to display-appropriate resolution (1080p desktop / 810px mobile portrait), CRF 24-25 preset slow, faststart, drop muted streams' audio; accept only if SSIM ≥ 0.99 vs source. Result: hero -35%, film -24%, no visible quality change (SSIM 0.992-0.993).

## D040 — Wave 1B opens with the "Opening Breath" cue, not a hero rebuild

Reason: Agent-01's Wave 1 verdict reopened creative work on Hero/Introduction, but the hardened hero already scores 92. The visible jump is delivered as a nameable signature detail — a breath-rhythm copper ring bridging hero → Introduction — instead of re-staging the composition. Calm, on-brand (breath = core brand line), accessible (motion-safe static, instant scroll, focus ring), and md+-only so the mobile composition stays untouched.

## D041 — `--font-serif` silently moved from Cormorant Garamond to Ogg — CLOSED: keep Ogg, license purchase deliberately deferred

Reason: this decision is being written after the fact (2026-07-20) because the change it describes shipped with no decision record at the time.

**User decision (2026-07-20): keep Ogg, license purchase/verification deliberately deferred.** No
revert to Cormorant Garamond. The user has knowingly accepted the unverified-commercial-license
risk rather than resolving it now; a proper web-embedding license for Ogg will be obtained/confirmed
only if prompted (a notice/takedown) or a concrete need arises — this is a conscious business
decision, not a gap to keep flagging. The footer's Georgia fallback (`#footer-brand-title`) stays
as-is regardless: that fix addresses a confirmed rendering defect in the font file itself,
independent of the license question, and is unrelated to whether/when a license gets purchased.

**What happened:** D035 (above) named Cormorant Garamond italic the *permanent* accent/signature voice specifically because Cormorant's license and Turkish glyph coverage (ş ğ ı İ ç) were known-good, while Kisthe was rejected for the opposite reason (license + glyph coverage unverified). Sometime before `awwwards-loop/reports/iteration-17.md` (no iteration report or decision covers the change itself — git history has it squashed into the single `9f495cf` "Golden Master baseline" commit, so the exact step is not recoverable), `--font-serif` was repointed from Cormorant Garamond to two local files, `app/fonts/Ogg-Roman.otf` / `Ogg-Italic.otf`. Iteration 22 then went further: rerouted `--font-kisthe` to Ogg too, deleted the Cormorant Garamond and Great Vibes loaders from `layout.tsx`, and dropped the font budget from 5 to 3 families (Ogg, Basis Grotesque Pro, Space Mono).

**Why this matters:** Ogg is a commercial display serif in the exact same unverified category D035 used to *reject* Kisthe — no license file, purchase record, or `docs/decisions.md` entry exists anywhere in this repo for it (checked `app/fonts/`, repo root, and all `*.md`/`*.json` files on 2026-07-20; nothing found). This is not a theoretical risk: on 2026-07-19 the footer brand wordmark (`#footer-brand-title`, "YAŞAMA SANATI") was found rendering a stray mark over the letter N — a genuine Turkish-glyph-adjacent rendering defect in `Ogg-Roman.otf` under Chromium/Windows, root-caused via ~20 isolated tests plus a `fontTools` dump of the font's own tables (see `docs/issues.md`, "Typography — resolved (2026-07-19)"). That one instance was fixed locally with a Georgia fallback for just that element, but Ogg is still `--font-serif`/`--font-kisthe` everywhere else on the site.

**Status: CLOSED (2026-07-20).** Keep Ogg. Commercial license verification/purchase is explicitly
deferred, not abandoned — the user has accepted this risk knowingly and will obtain/confirm a
proper web-embedding license for Ogg (Schick Toikka / OH no Type Co) only if prompted (e.g. a
notice or takedown) or if a concrete need arises otherwise. This is a deliberate business call, not
an oversight — do not re-raise it as an open question in future passes; only surface it again if
one of those trigger conditions actually occurs. The rendering-defect lesson still stands
independent of licensing: treat any new tight multi-line uppercase Ogg composition as carrying the
same unverified-glyph-behavior risk as the footer bug, and re-test rather than assume it renders
correctly.

## D042 — Accreditation is IECCERT-only; on-site pricing is removed, not corrected

Reason: the site claimed "uluslararası akredite", "uluslararası standartlarda" and "federasyonlar tarafından akredite edilmiştir" across seven files, while only one accreditor was ever named anywhere: IECCERT, for Meridyen Terapi. The user confirmed (2026-08-17) that IECCERT genuinely covers Meridyen Terapi **only**. Every unnamed accreditation claim was therefore narrowed, and program certificates now follow one rule: either a named external accreditor (IECCERT, Meridyen Terapi alone) or the academy's own certificate ("Yaşama Sanatı Akademisi … Sertifikası"). Reiki keeps its "Usui Reiki 1. ve 2. Derece" designation — that is a lineage name, not an accreditation claim.

In the same round the user confirmed that **all** pricing on the site was placeholder: the six TL figures (Reiki 9.000 → Meridyen 18.500), the per-program start dates, the 3/6/12-month installment terms and the EFT discount. These were removed from the UI rather than left visible, because a placeholder price presented as fact is the same category of defect as an unsupported accreditation claim. The program card now leads with "Yatırım Bedeli / Ön Görüşmede" plus one line explaining that fee, start date and payment options are settled in the free consultation — which is also what PRODUCT.md records as the primary conversion.

The `price` and `startDate` fields were deleted from `CourseDetailProps` and all six program pages **on purpose**, so the numbers cannot quietly reappear through a prop that still exists. The figures survive in `PRODUCT.md`, explicitly labelled unconfirmed. Do not re-add prices, dates or installment terms to the UI until the academy confirms them; do not name any accrediting body other than IECCERT.

## D043 — Landing chapter numbering runs 01–03, and only the section prints it

Reason: the page showed `01 Tanışma`, `02 Yaklaşımımız` and `04 Yaşama Sanatı Hikayesi`. Nothing was ever `03`, so a reader following the count registered a missing chapter. The system underneath was sound and deliberate — **numbered editorial chapters** (Tanışma, Yaklaşımımız, Hikâye) alternating with **unnumbered interludes** (Şifa Yolculuğu, Altı Disiplin, Çalışma Alanları) — only the counter was wrong. It was repaired rather than removed: `ElementisStory` is now `03`.

`SectionSeam` also mirrored the number (`index="02"`, `index="04"`), which is where the duplication came from. That prop was deleted outright. If a fourth numbered chapter is ever added, give it `04` on its own `EditorialSectionTitle`; do not reintroduce an index on the seam.

## D044 — The seam hands off; the section says its own name

Reason: each stage seam printed the incoming section's kicker (`02 —— YAKLAŞIMIMIZ`), and roughly 400px later the section printed the same words in the same type and colour. At a 900px viewport both were on screen at once, so the transition restated what it had just handed off and the rhythm stalled.

The text was removed from the seam, **not** from the section — the direction matters. `SectionSeam`'s root element is `aria-hidden`, so its label never reached assistive technology; the section's `EditorialSectionTitle` is the semantic heading. Removing the section's copy would have deleted a real heading to fix a visual repeat. The seam keeps its Breathing Thread stage (copper meridian path + 4.8s breath node); `label` now only triggers that stage and is deliberately not rendered. Do not re-add the kicker text to the seam.

## D045 — The landing page has one left spine: 64px

Reason: measured content left edges were hero 48px, Tanışma 60px, Ön Görüşme 64px, footer 64px. On a page whose whole identity is editorial precision, the most visible vertical alignment was off by 4–16px depending on the section. The hero sat on `md:px-12` and never reached the shared `xl:px-16`; Introduction used `md:px-15` (60px), one step below on the same `--spacing` scale.

Hero now joins the shared ladder (`px-5 md:px-8 lg:px-12 xl:px-16`) and Introduction moved to `px-5 … md:px-16`. All spine-anchored headings now measure 64px at 1440. The two headings that measure 238px and 280px are horizontally centred marquee elements and are not on the spine — leave them.

## D046 — The intro film is removed: it was Elementis footage presented as ours

Reason: every file in `public/Hero/` traces to `first commit` and has only ever been re-encoded since. The modal player was labelled "Yaşama Sanatı tanıtım filmi" but played `elementis-fullmp4.mp4` — the template's own promotional film for a different company. Publishing another brand's promo as the academy's own film is the same defect class as the Elementis resort routes and social accounts removed on 2026-08-17, and it is worse than having no film at all.

Removed: `components/VideoPlayer/`, the desktop full-hero play trigger, the mobile play button, `public/Hero/elementis-fullmp4.mp4` (28.8 MB) and `elementis-posterjpg.png`. This also closes the open WCAG 2.1 A obligation recorded in `PRODUCT.md` — that film was prerecorded, unmuted, content-bearing video with no `<track>`, no caption file and no transcript. If a real film is commissioned later, it ships **with** captions and a transcript, or it does not ship.

**Hero arka planı kapandı (2026-08-20).** İki Ege karesi Midjourney ile üretildi
(`docs/midjourney-prompts.md` 1A/1B) ve videoların yerine geçti: `hero-desktop.jpg` (2560×1434,
498 KB) ve `hero-mobile.jpg` (927×1648, 232 KB). Mobil kare 16:9 geldiği için tam çözünürlükten
merkez 9:16 kırpma yapıldı — büyütme kaybı yok. `elementis-cover-mjpg.png`, `elementis-mmp4.mp4`
ve `elementismp4.mp4` silindi; `public/Hero/` artık yalnızca bu iki dosyayı içeriyor. 15 MB'lık
PNG orijinalleri `assets-source/hero/` altına taşındı — public/ altında kalsalardı canlıda
servis edileceklerdi.

Sinematik hareket artık **koddan** geliyor: varışta 28 sn'lik tek seferlik `scale` oturması
(masaüstü 1.06→1, mobil 1.08→1), 24 dilimli scroll maskesi ve %25 parallax korundu. Döngü
değil — sonsuz drift, ziyaret boyunca bir compositor katmanını canlı tutardı. `prefers-reduced-motion`
altında kare sabit.

## D047 — Hero kicker'ı kaldırıldı; scrim ona göre yeniden dengelendi

Reason: Ege karesi, yerini aldığı Bali footage'ından belirgin şekilde aydınlık. Ölçümde başlık ve
paragraf rahat geçerken kicker düştü: masaüstü 3,54:1, mobil 3,27:1 (4,5:1 tabanına karşı).
Scrim'i kurtaracak seviyeye itmek fotoğrafı yaklaşık yarı yarıya karartmayı gerektiriyordu — yanlış
takas. Kicker zaten logodaki "AKADEMİ" ile ve hemen altındaki disiplin cümlesiyle aynı şeyi
söylüyordu; craft-floor eyebrow'u koşulsuz yasaklıyor. **Kullanıcı onayıyla kaldırıldı (2026-08-20).**

Kicker gidince güçlendirilmiş scrim'in tek gerekçesi de kalktı, o yüzden ana dikey wash orijinal
değerine geri alındı (`from-88 via-30 to-10`) — fotoğraf ışığını koruyor.

Yerine **kapsamı dar bir üst şerit washi** eklendi (`top-0 h-44 md:h-56`, `from-86 via-46 to-transparent`).
Sebebi ayrı bir bulgu: sabit header bu karede soluk gökyüzüne oturuyor ve kalan üç düşük değerin
(logo alt etiketi "AKADEMİ", nav CTA'sı, üstteki marquee) hepsi o 130px'lik şeritteydi. Tek katman
üçünü birden çözdü ve karartmanın bedeli en düşük olduğu yere — gökyüzüne — düştü.
`Bir nefes al` etiketi de `text-white/50` → `/70`, marquee `/55` → `/78` yapıldı.

Son ölçüm — **mobil: taban altında 0 öğe.** Masaüstünde tek kalan: üstteki marquee, 2,86:1
(1,36'dan yükseldi). Marquee'nin metni 400px altındaki paragrafla **birebir aynı** disiplin
listesi ve kayan dekoratif bir şerit — yani kicker'la aynı teşhis. Daha fazla scrim itmek gökyüzünü
yemeye başlar. Kaldırılması önerildi, kullanıcı kararına bırakıldı.

## D048 — Ana sayfadaki form geri getirildi; site CTA'ları hâlâ `/on-gorusme`'ye bakıyor

Reason: 2026-08-18 05:38–06:06 arasında ana sayfanın son bölümü `<Form />`'dan
`<ConsultationGateway />`'e çevrilmiş, dönüşüm ayrı bir `/on-gorusme` rotasına taşınmıştı.
Kullanıcı 2026-08-20'de formun ana sayfaya geri gelmesini istedi. `app/page.tsx` içinde
`<ConsultationGateway />` → `<Form />` yapıldı.

`sections/Form/Server.tsx` sağlam çıktı — taşıma sırasında yalnızca kopyası değişmişti
(başlık "İlk Adımı At" → "Ücretsiz Ön Görüşme", açıklama yeniden yazılmış, ve **"48 saat içinde
seni arayalım" vaadi kaldırılmış**). Yapı, alanlar ve `FormContainer`/Supabase action'ı yerindeydi;
bu yüzden geri getirmek tek satırlık bir iş oldu. Doğrulandı: `id="on-kayit"` sayfada tek kez
geçiyor (ConsultationGateway artık render edilmediği için çift id yok), 13 görünür alan, gönder
butonu çalışıyor, masaüstü + mobil taşma yok, konsol temiz.

**Çözülmemiş çakışma — bilinçli olarak açık bırakıldı.** `/on-gorusme` taşıması yalnızca ana
sayfa bölümünü değil, **sitedeki her ön görüşme CTA'sını** kapsıyordu. Şu an hiçbir bağlantı
`/#on-kayit`'e gitmiyor; hepsi `consultationHref()` üzerinden `/on-gorusme`'ye gidiyor:
`HeroOpeningMotion`, `NavBar`, `SideBar`, `SideBarMobile`, `Footer/Server`,
`CourseDetailTemplate`, `app/egitmenler`, `app/sss`. Yani ana sayfada artık bir form var ama
ona hiçbir düğme yönlendirmiyor — ziyaretçi yalnızca sona kadar kaydırırsa görüyor; hero'daki
"Ön Görüşme" düğmesi onu sayfadan çıkarıp başka bir forma götürüyor.

İki dönüşüm yüzeyi aynı anda ayakta. `/on-gorusme` daha gelişmiş (program ön-seçimi için radio
grubu, `program` + `source_url` gizli alanları, `website` honeypot'u). Hangisinin kanonik olacağı
kullanıcı kararı: ya CTA'lar `/#on-kayit`'e döndürülür ve `/on-gorusme` emekliye ayrılır, ya da
ana sayfa formu ikincil kalır. Karar verilene kadar `sections/ConsultationGateway/` silinmedi —
izlenmeyen bir dosya olduğu için silinmesi geri alınamazdı.

**Ayrıca hâlâ açık:** `/on-gorusme` `app/sitemap.ts` içinde yok.


## D049 — Ön Görüşme bölümü dikeyde açıldı; görsel artık sütunu dolduruyor

Reason: kullanıcı bölümün başı ile sonu arasındaki mesafeyi çok sıkışık buldu. Ölçüm doğruladı:
masaüstünde 1237px (1,37 ekran) ile sayfadaki **en kısa içerik bölümüydü** — Introduction 2,03,
Hikâye 2,21, Retreat 3,47 iken dönüşüm anı en dar alandı. `section-rhythm.md` "son bölüm
kurgulanmış bir kapanış gibi hissettirmeli" diyor; 1,37 ekran bunu vermiyordu.

İki katmanda açıldı, ikisi de projenin kendi `--spacing` ölçeğinde (elle piksel yok):
`FormContainer` dış boşluğu `py-24 md:py-28` → `py-32 md:py-42-5` (96→128 / 112→170), ve iç ritim
bir adım büyütüldü — açıklama `mt-6 mb-10` → `mt-8 mb-14`, alan aralıkları `gap-4` → `gap-6`,
ilgi alanları bloğu `mt-10 space-y-5` → `mt-14 space-y-6`, KVKK onayı `mt-8-75` → `mt-12`,
dipnot `mt-6` → `mt-8`.

**Bağlı düzeltme:** form uzayınca sol sütundaki foto boşluğu büyüyecekti. Görsel `h-auto` idi,
yani 962px'te kalıp altında 275px boş adaçayı bırakıyordu; form 1442'ye çıkınca bu ~500px olacaktı.
`ParallaxContainer`'a `md:h-full`, görsele `md:h-full md:object-cover` verildi. `ParallaxContainer`
zaten `scale(1.2)` uyguladığı için parallax hareketine pay var, kenar açılmıyor. Mobil `flex-col`
olduğu için değişiklik `md:` ile sınırlandı.

Sonuç — masaüstü 1237 → **1442px (1,60 ekran)**, görsel 962 → **1442px (boşluk 0)**;
mobil 1744 → **1905px (2,26 ekran)**. 13 görünür alan, taşma yok, konsol temiz, build exit 0.


## D050 — Menü hover seti Elementis'ten çıkıp yazılmış 12 kareye geçti

Reason: `SideBar.tsx` menü görsellerinin **tamamı** Elementis şablonundan geliyordu ve etiketlerle
eşleşmeleri rastgeleydi (Blog → `press-room.png`, SSS → `new-developments.png`, Ön Görüşme →
`careers.png`, Reiki → `the-story.png`). Üstelik iki dosya çift kullanılıyordu: `community.png`
hem Topluluk hem Hipnoterapi'de, `destination.png` hem Programlarımız hem Meridyen Terapi'de —
yani 12 menü öğesi 10 görseli paylaşıyordu.

Ayrı bir kusur: dosyalar ≈3:4 (0,758) idi, canlıda ölçülen kapsayıcı ise **566×900 → 0,628**.
`object-fit: cover` olduğu için kenarlardan ~%16 kırpılıyorlardı. Yeni set `docs/midjourney-prompts.md`
bölüm 8'deki promptlarla **5:8** üretildi ve gelen kareler 1744×2784 (0,626) — kapsayıcıyla birebir.

**Ağırlık:** gelen PNG'ler toplam 77 MB idi (tek dosya 6–8 MB). `public/` altındaki her şey canlıda
servis edildiği için bu kabul edilemezdi. Hepsi 1200×1916 JPEG'e indirildi — kapsayıcı 2x ekranda
1132px istiyor, 1200 yeterli. **Toplam 3,3 MB.** PNG orijinalleri silinmedi, `assets-source/sidebar/`
altına taşındı (servis edilmiyor, git'te izlenmiyor).

Dosya adları artık semantik (`ana-sayfa.jpg`, `nefes-koclugu.jpg` …), Elementis rota adları gitti.
Doğrulandı: menüde 12 link → 12 görsel → **12 benzersiz dosya**, konsol temiz, build exit 0.

**Geçici — `on-gorusme.jpg`:** 12 promptun 11'i üretildi, Ön Görüşme karesi gelmedi. Slot boş
kalırsa build kırılacağı için `public/FormImage.jpg`'den (form bölümünün Ege oturma odası: iki
koltuk, çaydanlık, zeytin dalı) 5:8 merkez kırpma alındı. Semantik olarak isabetli ve menü içinde
tekrar yaratmıyor, ama **kendi karesi değil** — aynı fotoğraf form bölümünde de görünüyor.
Bölüm 8.6 promptu üretilip yerine konmalı.


## D051 — Dokümantasyon tek kaynağa indirildi

Reason: depoda "implementation"/"plan" adı taşıyan **11 dosya** vardı — kök, `docs/` ve
`awwwards-loop/` arasına dağılmış, adları birbirine karışıyordu
(`implementation.md`, `awwwards-sotd-implementation.md`,
`yasama-sanati-awwwards-polish-implementation.md`, `implementation_footer_antigravity.md` …).
Üstüne tarayıcı indirmesi `IMPLEMENTATION(10).md` geldi.

Yapılan: 10 tarihsel dosya `docs/archive/` altına **tarihli, benzersiz** adlarla taşındı
(`2026-06-18-footer-masterplan.md`, `2026-07-11-unified-record.md` …). Yeni plan depoya
`docs/RELEASE-PLAN.md` olarak alındı — depoda başka hiçbir dosyada "RELEASE" geçmiyor, karışma
imkânı yok. Downloads'taki kopya silindi ki iki kaynak ayrışmasın. `claude.md` tek aktif planı
işaret edecek şekilde güncellendi. `awwwards-loop/implementation.md` yerinde bırakıldı: o bir
plan değil, döngünün kendi çalışma dosyası ve klasörüyle kapsamlanmış durumda.

## D052 — Sağlık iddiaları geleneksel çerçeveye çevrildi

Reason: `docs/RELEASE-PLAN.md` §9.1'in iddiası doğrulandı ve gerçek çıktı. Canlıda tedavi vaadi
niteliğinde ifadeler vardı: "astım ve öksürük krizlerini hafifletir", "vücuttaki tüm ağrıları
yatıştırır", "bağışıklığı güçlendirir", "Tüm Hastalıkların Şifa Noktası", "en güçlü ağrı kesici
noktadır", "grip semptomlarını azaltır", "regl sancılarını hafifletir", "hücresel düzeyde detoks".
Türkiye'de sağlık beyanı mevzuatı kapsamına giren ifadeler ve `PRODUCT.md`'nin kendi ilkesiyle
("Earn trust through precise claims") doğrudan çelişiyorlardı.

**Not:** 2026-08-17/18'deki akreditasyon ve fiyat temizliği (D042) bu katmana hiç bakmamıştı —
3D meridyen veri dosyaları ve kart metinleri denetim dışında kalmıştı.

Değiştirilen: 70 metin. `Meridian3D.tsx` 22 (+2 `physical` alanı), `data/acupoints.ts` 42,
`data/meridians.ts` 2, `ClipImageCard.tsx` 6. Kural: sonuç vaat etmek yerine geleneksel
çerçeveyi anlat — "X'i iyileştirir" değil, "geleneksel öğretide X ile ilişkilendirilir".
Ölçülebilir fizyolojik iddia ("detoks", "bağışıklık", "hücresel") hiç kullanılmıyor.
`caution` alanları **korundu** — onlar güvenlik uyarısı, iddia değil.

3D meridyen paneline görünür bir disclaimer eklendi: açıklamaların geleneksel öğretiyi tanıttığı,
teşhis/tedavi vaadi içermediği. `ClipImageCard`'daki "Uluslararası sertifikalı eğitmenlik
programı" ifadesi de D042'ye uygun olarak "Yaşama Sanatı Akademisi eğitmenlik programı" yapıldı.

Beş element renk kodlaması (`#e2e8f0` Metal, `#ef4444` Ateş, `#eab308` Toprak, `#3b82f6` Su,
`#10b981` Ahşap, `#64748b`) detector'da `ignore-value` olarak kayıtlandı: bunlar marka paleti
değil, geleneksel Çin tıbbının kendi şeması. `text-[11px]` değerleri `text-3xs`'e taşındı.

## D053 — Form sertleştirmesi: hız sınırı, mükerrer koruma, telefon normalizasyonu

Reason: görüşme formu zaten iyi korunuyordu (sunucu doğrulaması, honeypot, uzunluk sınırı, ham
veritabanı hatası sızdırmama) ama **hız sınırı ve mükerrer gönderim koruması yoktu**; bülten
formunda ise bunların hiçbiri yoktu — yalnızca boşluk kontrolü vardı.

Eklenen (`utils/rate-limit.ts`): süreç-içi sliding-window limitleyici (görüşme: IP başına 10 dk /
5 istek, bülten: 10 dk / 3 istek), 10 dakikalık mükerrer gönderim penceresi (çift tıklama ve
geri-tuşu tekrarı kullanıcıya hata göstermeden yutulur), ve telefon normalizasyonu
(`+90 532 789 3753` → `+905327893753`).

Bülten ayrıca görüşme formuyla aynı e-posta biçim doğrulamasını, 160 karakter sınırını ve
`tr-TR` küçültmesini aldı; Postgres benzersizlik ihlali (`23505`) artık kullanıcıya hata değil
sessiz başarı olarak dönüyor.

**Bilinen sınır, bilerek kabul edildi:** sayaçlar bellek içi, yani sunucu örneği başına ve
yeniden başlatmada sıfırlanıyor. Tek örnekli `next start` dağıtımında gerçek koruma sağlar;
çok örnekli/serverless bir dağıtıma geçilirse paylaşımlı bir sayaca (Redis/Upstash) taşınmalı.
Harici servis bağımlılığı eklememek ve her gönderime veritabanı turu bindirmemek için bu seçildi.

## D054 — Dönüşüm yüzeyi: ana sayfada kaydır, diğer sayfalarda özel sayfaya git

Reason: D048'de ana sayfa formu geri getirilmişti ama sitedeki **hiçbir CTA ona gitmiyordu** —
hepsi `consultationHref()` ile `/on-gorusme`'ye yönleniyordu. İki dönüşüm yüzeyi vardı ve biri
erişilemezdi.

Çözüm `consultationHref` içinde tek kuralla verildi: **program seçimi yoksa ve kaynak `/` ise
`/#on-kayit` dön.** Yani ana sayfadaki genel "Ön Görüşme" çağrıları ziyaretçiyi sayfadan
çıkarmadan aynı sayfadaki forma kaydırır; diğer rotalardan gelen çağrılar ve program seçimli
çağrılar `/on-gorusme`'ye gider (program orada ön-seçili gelir).

Canlı doğrulama: `/` → üç genel CTA da `/#on-kayit`; `/sss` → `/on-gorusme?from=%2Fsss`;
`/programlar/reiki` → genel `?from=...`, program çağrısı `?program=reiki&from=...`.
`#on-kayit` hedefi ana sayfada mevcut.

`/on-gorusme` `app/sitemap.ts`'e eklendi (zaten eklenmiş olduğu görülünce kopya kaldırıldı).

## D055 — Çalışma Alanları artık program değil format listeliyor

Reason: altı program landing page'de iki kez sunuluyordu — Şifa Yolculuğu (5,0 ekran) ve Çalışma
Alanları (3,47 ekran). Aynı katalog, aynı `/programlar/*` rotaları. Oysa bölümün kendi başlığı
"Üç farklı katılım yolu" ve paragrafı birebir seans / küçük grup / sertifikalı eğitim ayrımını
anlatıyordu — bu bilgi sitede **başka hiçbir yerde yoktu** ve bölüm onu göstermiyordu.

Grid altı programdan üç formata çevrildi. `grid-rows-6` yerine `auto-rows-fr` kullanıldı, böylece
satır sayısı bir daha sabit kalmıyor. Marquee, rise geçişi ve image-mass kompozisyonu **korundu** —
denetim o bölümü "Strong" olarak puanlıyor, görsel showpiece kaybı yok.

Görseller **geçici**: her formatın kendi karesi üretilmedi, en yakın mevcut Ege kareleri
kullanılıyor (`group/meridyen-terapi` → Birebir, `group/yasam-koclugu` → Grup,
`group/mucizeler-kursu` → Sertifikalı). `docs/midjourney-prompts.md` §6 artık 6 değil 3 kare
istiyor.

**Ölçüm uyarısı — kayda geçsin:** bu değişikliğin sayfayı %27 kısalttığı görüldü, sonra bunun
ölçüm hatası olduğu anlaşıldı. O ölçüm `reducedMotion: reduce` ile alınmıştı ve o modda sticky
bölümler tasarım gereği çöküyor. Aynı motion ayarında gerçek sonuç: 20.860 → 21.040px, yani
sayfa **hafifçe uzadı** (üç uzun başlık altı kısa başlıktan fazla yer tutuyor). Bu maddenin
kazancı Usability/Content tarafında; uzunluk kazancı §8'in (500vh retiming) işidir.


## D056 — Hero sadeleştirildi: marquee kaldırıldı, iç jargon temizlendi

Reason: hero'nun tepesindeki hizmet marquee'si (`Nefes • Reiki • Meridyen Terapi • …`) başlığın
altındaki paragrafla **birebir aynı** disiplin listesiydi ve masaüstünde 2,86:1 ölçülüyordu
(4,5:1 tabanına karşı). Scrim'i daha fazla itmek yeni Ege karesini matlaştıracaktı — eyebrow'la
(D047) aynı teşhis, aynı çözüm. `RELEASE-PLAN` §7'nin "rakip katmanlar" listesindeki maddelerden
biri kapandı.

`Editorial wellness academy · İzmir` satırı da kaldırıldı: bu, `docs/art-direction.md`'de seçilmiş
**iç yön adının** ekrana sızmış hâliydi, müşteriye dönük kopya değil. Yerine PRODUCT.md'nin
kaydettiği gerçek geldi: "Online ve İzmir'de".

Sonuç — hero **ilk kez taban altında hiçbir öğe barındırmıyor**: masaüstü 0, mobil 0.
(Logo 5,93/8,60 · AKADEMİ 5,10/4,73 · nav CTA 5,08 · başlık 6,86/5,58 · paragraf 6,22/5,93 ·
CTA'lar 5,49-8,50 · konum satırı 5,47/5,23 · nefes etiketi 6,40.)

## D057 — Elementis soyadı koddan tamamen kaldırıldı

Reason: `RELEASE-PLAN` §6.1. Yapılanlar: `package.json` adı `elementis-clone` → `yasama-sanati`
(lockfile'da 2 yerde), `sections/ElementisStory` → `sections/AkademiHikayesi` (bileşen adlarıyla
birlikte), `public/elementis-stories` → `public/akademi-hikayesi`, 3D meridyen kenar çubuğundaki
`ELEMENTIS` kelimesi → `YAŞAMA SANATI`.

`app/privacy-terms/page.tsx` daha ağır çıktı: yasal metin şirketi **ELEMENTIS Development Group**,
hizmeti **elementis.co**, ülkeyi **Endonezya**, iletişimi **+62** olarak tanımlıyordu. KVKK
kapsamında çalışan bir akademi için ciddi bir hata. PRODUCT.md'de doğrulanmış olan her şey
düzeltildi (ticari ad, alan adı, ülke, e-posta, telefon). **Tescilli ticaret unvanı, merkez adresi
ve vergi bilgileri uydurulmadı** — dosyada `TODO (hukuk)` yorumu olarak açıkça eksik bırakıldı.

Koddaki tek "elementis" kalıntısı `socials/index.tsx` içindeki açıklama yorumu; o, neyin neden
kaldırıldığını anlatan kayıt.

## D058 — Şifa Yolculuğu 500vh → 360vh, çıkış yolu eklendi

Reason: `RELEASE-PLAN` §8, önerilen aralık 320–400vh. Ortası seçildi. İlerleme haritası normalize
(0–1) olduğu için yükseklik değişimi zamanlamayı bozmuyor, yalnızca sıkıştırıyor —
**beş kartın beşinin de döndüğü ölçülerek doğrulandı** (Nefes → Meridyen → Mucizeler → Reiki →
Hipnoterapi&Yaşam).

Pinned bir bölümde mahsur kalmamak için klavyeyle erişilebilir bir **"Bölümü geç"** bağlantısı
eklendi; hedef `#alti-disiplin` olarak SignatureTypeScene'e verildi.

Sayfa 21.040 → **19.399px** (23,38 → 21,55 ekran). Bu, D055'te elde edilemeyen uzunluk
kazancının geldiği yer — orada doğru teşhis edilmişti.

## D059 — Erişilebilirlik: axe ile ölçüldü, sıfıra indirildi

Reason: `RELEASE-PLAN` §13 "Axe serious/critical = 0" istiyordu ama ölçen bir araç yoktu.
`@axe-core/playwright` kuruldu ve `qa/a11y.mjs` yazıldı: 11 rota × 2 viewport, WCAG 2.0/2.1 A+AA,
serious/critical varsa çıkış kodu 1 (CI'da kapı olarak kullanılabilir).

**İlk ölçüm ~180 ciddi bulgu verdi.** Üç sınıf ve çözümleri:

1. **link-name (8):** `NavBar`'daki ön görüşme bağlantısı `lg:flex` olan bir butonu sarıyordu;
   mobilde içerik gizli olduğu için `<a>` adsız kalıyordu. Bağlantının kendisi `hidden lg:block`
   yapıldı — render etmeyen bir anchor erişilebilirlik ağacında hiç bulunmamalı.
2. **scrollable-region-focusable (1):** Hikâye bölümünün yatay kaydırma şeridi klavyeyle
   gezilemiyordu; `role="group"`, `aria-label` ve `tabIndex={0}` eklendi. Klavye kullanıcısı
   ikinci görsele artık ulaşabiliyor.
3. **color-contrast (~170):** sistematikti. `globals.css`'e **ölçülerek seçilmiş** iki metin
   varyantı eklendi — `--accent-copper-on-dark: #E0A878` (koyu yüzeyde 6,07:1, sıcak yeşilde
   4,68:1) ve `--accent-copper-on-light: #7A3F1C` (açık sage üzerinde 5,13:1). Marka bakırı
   `#C9875B` **dolgu, çizgi ve ikonda korunuyor**; kısıt yalnızca metinde, çünkü sorun orada.
   Ayrıca düşük metin opaklıkları kademeli yükseltildi (117 sınıf): sıcak yeşil `#30493d`
   yüzeyi `#2b3530`'dan açık olduğu için `/70` orada 4,32'de kalıyordu.

**Son durum: toplam bulgu 0** (yalnız serious değil, hepsi). Görsel kontrol yapıldı — başlık/gövde/
indeks ayrımı korundu, tonal hiyerarşi düzleşmedi.

## D060 — Kalite kapısı: script'ler ve CI

Reason: `RELEASE-PLAN` §3.2. `package.json`'a `typecheck`, `test:a11y` ve `verify` script'leri
eklendi. `.github/workflows/quality-gate.yml`: her PR ve main push'unda
kur → typecheck → lint → build → a11y.

`qa/a11y.mjs` CI uyumlu hâle getirildi (`PW_CHANNEL=chromium` ile paketli tarayıcı, yerelde
sistem Chrome). Lighthouse CI ve bundle budget **bilinçli olarak eklenmedi** — §22'de submission
sonrasına konuldu; jüri kriteri değiller.

## D061 — SEO: rota metadata'sı ve structured data

Reason: `RELEASE-PLAN` §12. 17 rotanın **11'inde metadata hiç yoktu** ve sitede hiç structured
data yoktu.

13 rotaya title/description/canonical/OpenGraph eklendi. `/egitmenler` ve `/sss` client component
olduğu için metadata **segment layout'una** taşındı (client component metadata export edemez).

`components/Server/StructuredData.tsx`: `EducationalOrganization` (layout, site geneli),
`Course` (6 program sayfası), `FAQPage` (/sss). Canlıda doğrulandı.

Şema **yalnız doğrulanmış ürün gerçeğini** taşıyor: fiyat/`offers` yok (D042 — fiyatlar teyitsiz),
tescilli unvan ve adres yok (D057 — belirlenmedi), FAQ şeması sayfadaki görünen sorularla aynı
kaynaktan besleniyor (`app/sss/faqs.ts`) — böylece şema ile ekrandaki metin bir daha ayrışamaz.

## D062 — Ölü bağımlılık ve görsel ağırlığı

Reason: `RELEASE-PLAN` §14. `@studio-freight/react-lenis` kaldırıldı — kod `lenis/react`
kullanıyordu, wrapper hiçbir yerden import edilmiyordu.

`public/` altındaki ağır PNG'ler JPEG'e çevrildi ve importları güncellendi:
`Introduction` 2204→302 KB, `picture-1` 1837→198 KB, `picture-2` 1966→257 KB.
Orijinaller `assets-source/misc/` altına taşındı (servis edilmiyor, silinmedi).
`public/` toplamı **11 MB**.


## D063 — Mikro punto adımları tokena çevrildi, tip/renk dokümanı runtime ile eşitlendi

Reason: hook `HeroOpeningMotion` içinde iki sabit punto (`10px`, `9px`) işaretledi. Site
genelinde bakınca bunlar sapma değildi: `text-[10px]` **51 yerde 13 dosyada**, `text-[9px]`
7 yerde kullanılıyordu — yani fiilen iki ölçek adımıydılar, ama ölçeğin dışında oldukları için
`--multiplier` ile ölçeklenmiyorlardı. Onları 11px'e zorlamak gerçek bir mikro-etiket
hiyerarşisini düzleştirirdi.

Çözüm ölçeği aşağı genişletmek oldu: `--text-5xs` (9×m) ve `--text-4xs` (10×m) eklendi,
65 kullanım tokena çevrildi. Sabit mikro punto kalmadı; hook'un dosyası 0 bulgu.

**İkinci bulgu — detector'ün ölçtüğü şey yanlıştı.** Site geneli tarama 74 bulgu veriyordu ve
bunlardan biri sitenin ana sage rengi `#ced1bf` idi. Sebep: `DESIGN.md` **tek bir yüzeyi**
belgeliyor — kendi frontmatter'ı "extended into a focused, flat consultation route" diyor ve
başlığı "Meridyen Eşiği". Detector tüm siteyi o dar palete karşı ölçüyor. Bu bir kod kusuru
değil, dokümantasyon kapsamı sorunu; site geneli bir DESIGN.md üretmek `/impeccable document`
işidir ve ayrı bir komuttur.

**Üçüncü bulgu — planın §11'de adını koyduğu sapma doğrulandı ve kapatıldı.**
`design-system/typography.md` display serifi **Cormorant Garamond** diye yazıyordu; runtime
2026-07'den beri **Ogg** kullanıyor (D041 ile kapatılmış karar). Space Mono ise dokümanda hiç
geçmiyordu. `design-system/colors.md` de iki değerde ayrışmıştı (`--text-muted` 0.56 yerine
0.58, `--focus-ring` eski rgba biçiminde).

İkisi de `app/globals.css` gerçeğine göre yeniden yazıldı: gerçek tip rampası (mikro/gövde +
display clamp'leri), üç font ailesi, yeni erişilebilirlik bakır varyantları, alan/durum
tokenları. Her iki dosyanın başına **"tek kaynak globals.css, ayrışma olursa kod doğrudur"**
kuralı ve son senkron tarihi konuldu. Ayrıca iki yeni kural yazıldı: sabit punto yazılmaz, ve
metin opaklığı 70'in (açık yüzeyde 85'in) altına inmez — `--surface-warm` yüzeyi `--surface-deep`
'ten açık olduğu için ayrı hesaplanmalı.

## D064 — Next.js 15.2.2 → 15.5.23: kritik açıklar kapatıldı, kalan 4 high major gerektiriyor

Reason: `RELEASE-PLAN` §3.1 "Next.js güvenlik upgrade" P0 işaretliydi ama revize sıralamada
13. sıraya konmuştu ("ya erken ya submission sonrası, jüri haftasında asla"). O erteleme
`npm audit` çalıştırılmadan yapılmıştı — çalıştırılınca gerekçesi değişti.

**Bulunan (prod bağımlılıkları, 15.2.2):** critical severity Next.js açıkları —
RCE in React flight protocol (GHSA-9qr9-h5gf-34mp), Server Actions Source Code Exposure
(GHSA-w37m-7fhw-fmv9), Improper Middleware Redirect → SSRF (GHSA-4342-x723-ch2f),
Image Optimization cache key confusion + content injection. Site formları **Server Actions**
kullanıyor ve gerçek kullanıcı verisi topluyor; bu açık bırakılamazdı.

`npm audit fix --force`'un önerdiği hedef **15.5.23** çıktı — yani **aynı major içinde**,
16'ya sıçrama değil. Ertelemenin dayandığı "breaking change riski" gerekçesi bu noktada
geçersizdi, o yüzden yapıldı.

**Doğrulama:** typecheck ✓ · lint ✓ · build exit 0 (27 sayfa) · dört kritik rota 200 ·
axe 0 bulgu · tam sayfa smoke: 21,55 ekran, taşma yok, tek h1, JSON-LD yerinde, konsol temiz.
Regression görülmedi.

**Kalan ve bilinçli açık bırakılan:** 4 high, hepsi Next'in transitive bağımlılıkları —
`sharp` <0.35.0 (libvips CVE-2026-33327/33328/35590/35591) ve `postcss`. Bunların düzeltmesi
**next@16.3.2**, yani breaking major. Bu, submission öncesi yapılacak bir iş değil; kullanıcı
kararı olarak bırakıldı. Critical seviye temizlendiği için acil risk kalmadı.

## D065 — Ogg fontları WOFF2'ye çevrildi: LCP'nin asıl darboğazı buymuş

Reason: `RELEASE-PLAN` §4.3 için ana iş parçacığı profillendi. İlk ölçüm mobilde CLS 0,46 ve
17 uzun görev gösterdi — ama o ölçüm sayfayı zorla hızlı kaydırıyordu ve scroll-tetiklemeli
animasyonlar layout shift olarak sayılıyordu. **Yöntem düzeltildi** (kaydırmadan, yalnız yükleme
ve yerleşme): masaüstünde 200ms üstü uzun görev **0**, mobilde 7. CLS 0,0426 / 0,0001.

Doğru ölçüm asıl darboğazı gösterdi: **fontlar**. Dört font dosyası mobilde 2344–2358 ms
sürüyordu ve Ogg dosyaları `.otf` formatındaydı — yani web için sıkıştırılmamış.

`fontTools` + `brotli` ile WOFF2'ye çevrildi: **Ogg-Roman 107→33 KB (%69), Ogg-Italic
119→38 KB (%68).** Toplam font ağırlığı 226 → 71 KB.

Sonuç: masaüstü LCP **2552 → 2328 ms** (hedef <2500'ün altına indi), mobil 4× CPU kısıtı
altında **2164 → 1668 ms**. CLS her iki tarafta da hedefin (0,10) çok altında.

`.otf` orijinalleri silinmedi, `assets-source/fonts/` altına taşındı. `Kisthe.woff` de oraya
taşındı: D035'te reddedilmiş, koda hiç bağlanmamış ölü bir varlıktı (yalnız bir yorumda geçiyor).

**Not:** LCP öğesi hero fotoğrafı değil, hero'daki dekoratif "ŞİFA" kontur katmanı
(`OutlineTypographyLayer`). Bu katman açılıştan 0,35 sn sonra 1,2 sn'de silinerek kayboluyor —
yani LCP bir süs öğesine harcanıyor. Kaldırılması `RELEASE-PLAN` §7'nin açık maddelerinden biri
("Outline 'ŞİFA' A/B test"); ölçüm bu maddeye somut bir gerekçe kazandırdı.

## D066 — Viewport, klavye ve zoom denetimleri otomatikleştirildi

Reason: `RELEASE-PLAN` §18 sekiz viewport, §13 klavye/zoom istiyordu; ikisi de manuel liste
hâlindeydi ve ölçülmemişti. İki çalıştırılabilir denetim yazıldı:

`qa/viewports.mjs` — 8 boyut × 6 rota; yatay taşma, konsol hatası ve hydration uyarısı arar.
Sonuç: **sıfır sorun** (390×844'ten 1920×1080'e).

`qa/keyboard.mjs` — skip link ilk Tab'da geliyor mu ve `#main-content`'e gidiyor mu; ilk 25
odaklanabilir öğede görünür odak halkası var mı; mobil menü açılıyor / 30 Tab sonra odak hâlâ
içeride mi (trap) / ESC kapatıyor mu / odak düğmeye dönüyor mu; %200 ve %400 zoom'da yatay
taşma var mı. Sonuç: **sıfır sorun.**

Üçü de (`test:a11y`, `test:viewports`, `test:keyboard`) `package.json`'a script olarak ve
`quality-gate.yml`'a CI kapısı olarak eklendi. `qa/mainthread.mjs` performans profili için
`test:perf` olarak duruyor ama CI kapısı değil — ölçümü makineye bağlı.

## D067 — Görsel teslimi: AVIF/WebP açıldı, `sizes` tamamlandı

Reason: `RELEASE-PLAN` §14. `next.config.ts`'e `formats: ["image/avif", "image/webp"]` eklendi;
Next kaynak dosyayı istek anında dönüştürüyor, kaynakları elle AVIF'e çevirmeye gerek yok.
Canlı doğrulama (hero-mobile): **JPEG 80 KB → WebP 74 KB → AVIF 68 KB**, tarayıcı desteğine
göre otomatik.

`sizes` propu **10 `<Image>` kullanımında eksikti** — bu, tarayıcının gereğinden büyük varyant
indirmesi demek. Hepsi gerçek yerleşimlerine göre dolduruldu (avatar 24/40px, retreat hover
kutusu 440px/90vw, hikâye karuseli 45vw/85vw, yarım sütun görseller 50vw/100vw). Kalan 0.

`images.remotePatterns` içindeki `images.unsplash.com` izni kaldırıldı: kodda hiçbir yerde uzak
görsel kullanılmıyordu.

## D068 — §4.2 Video Strategy konusuz kaldı

Reason: bölümün 13 maddesi hero videoları ve tanıtım filmi üzerineydi. Bunlar D046/D047 ile
kaldırıldı; yerlerine still + koddan gelen hareket geldi. Doğrulandı: kodda `<video>` yok,
`public/` altında `.mp4`/`.webm` yok, `preload` direktifi yok. Bölüm bu durumu belirtecek
şekilde işaretlendi — ileride tekrar video eklenirse yeniden açılmalı.

## D069 - Program sayfalarindaki saglik iddialari temizlendi (D051'in kacan kismi)

Reason: D051'de `Meridian3D.tsx` (22) ve `data/acupoints.ts` (42) temizlendi ve
`RELEASE-PLAN` s9.1'de 11 konumluk bir tablo cikarildi. Ama **program sayfalarinin SSS
bloklari taranmamisti**. Disaridan gelen bir kod incelemesi bunu yakaladi; dogrulandi.

Temizlenen 11 metin, iki dosyada:

`app/programlar/meridyen-terapi/page.tsx` (7) - en agiri, cihaz ureticisinin pazarlama
dili. "Meridyen Terapi Kimlere Tavsiye Edilmektedir?" maddesi **hastalik adi sayiyordu**
(romatizma, hipertansiyon, hiperglisemi, seker hastaligi, iskemik rahatsizliklar). Madde
"Kimler Icin Uygundur?" olarak yeniden yazildi; endikasyon listesi yerine gerginlik
biriktiren yetiskinler tarif edildi ve hekime danisma uyarisi eklendi. "Iyilesme Olmasi
Icin..." baslikli madde de basligiyla birlikte degistirildi - soru cumlesinin kendisi
iyilesme vaat ediyordu. Kalan besi geleneksel ogretiye atif kalibina cevrildi
("Geleneksel ogreti bu etkiyi ... kavramlariyla aciklar").

`app/programlar/nefes-koclugu/page.tsx` (4) - "bagisiklik sistemimiz guclenir",
"solunum sistemi sagliginin iyilesmesi", "bagisikligi destekler" ifadeleri kalkti.
Fayda listesi, sonuc vaadi yerine katilimci deneyimi aktarimina cevrildi ve altina
"herkes icin gecerli bir sonuc ya da tibbi bir fayda vaadi degildir" notu eklendi.
"Bilimsel temeli var mi?" maddesi, atifsiz arastirma iddialarindan aritildi.

**Kontrendikasyon listesi bilerek korundu.** Hastalik adlari orada da geciyor ama o metin
cihazin ne zaman kullanilmamasi gerektigini anlatiyor - iddia degil, guvenlik bilgisi.
Ayni gerekce D051'de `acupoints.ts`'in `caution` alanlari icin de gecerliydi.

`app/programlar/yasam-kocu/page.tsx` tarandi, dokunulmadi: "yasam kalitesini iyilestirme"
bir kocluk ifadesi, saglik sonucu iddiasi degil.

## D070 - Innovation `485vh` offset'i DOGRU; degistirme denemesi geri alindi

Reason: kutu D0xx'te 500vh'den 360vh'ye indirilirken `useScroll` offset ucu 485vh'de
kalmisti. Bunu bayat bir sabit sanip 345vh'ye cektim. **Olcum bunun yanlis oldugunu
gosterdi.**

Iki degerin kart sayaci dagilimi (80 adimlik kaydirma taramasi, 1440x900):

| kart | 485vh (mevcut) | 345vh (denenen) |
|---|---|---|
| 01 | 24 adim | 21 |
| 02 | 16 | 9 |
| 03 | 15 | 10 |
| 04 | 17 | 10 |
| 05 | 9 | 31 |

Her iki degerde de sayac 05'e ulasiyor ve cikis koreografisi tam tamamlaniyor
(scale 0.96, opacity 0.85) - yani bolum bozuk degildi. `ClipImageCard`'daki esikler
(0.125 / 0.375 / 0.625 / 0.875) kart 1 ve 5'e %12,5, kart 2-4'e %25 pay veriyor; 485vh
dagilimi tam olarak bu tasarima oturuyor. 345vh ortadaki uc karti sikistirip sonuncuya
uzun bir olu alan biraktigi icin geri alindi.

Ders: Motion'in `offset` uc degeri kapsayici yuksekligine esit olmak zorunda degil -
viewport gecisini de kapsar. Sayisal "tutarsizlik" gorunumu tek basina kusur kaniti degil;
olcmeden degistirilmemeli.

## D071 - Form varsayilan sehri Izmir

Reason: marka konumu "Online ve Izmir'de" olarak netlestirildikten sonra
`components/Server/Select.tsx` hala `defaultSelection="Istanbul"` veriyordu. Izmir yapildi.
Sehir listesinin kendisi degismedi.

## D073 — Sitenin üç yazı tipinden ikisi hiç uygulanmıyormuş

Reason: `getComputedStyle` ile ölçüldü. Kod okuyarak görülemeyecek bir kaskad
hatasıydı; hiçbir kapı yakalamamıştı.

next/font değişkenleri (`--font-grotesque`, `--font-space-mono`, `--font-serif`)
`<body>`nin class'ıyla basılıyor. Tailwind v4'ün `@theme` bloğu ise `:root`
üzerinde değerlendiriliyor. `@theme` içinde `var(--font-space-mono)` yazılınca o
seviyede TANIMSIZ oluyor, tüm özellik "guaranteed-invalid" değere düşüyor ve
`.font-mono { font-family: var(--font-mono) }` kuralı **sessizce hiç
uygulanmıyor.** Hata yok, uyarı yok.

`--font-sans` ise hiç tanımlanmamıştı, yani `font-sans` utility'si Tailwind'in
varsayılan `ui-sans-serif, system-ui, …` yığınına düşüyordu. `SubPageLayout`in
kök div'inde `font-sans` var.

Ölçüm (production derlemesi, Chromium 1440×900), düzeltme öncesi:

| rota | `.font-mono` | gövde paragrafları |
|---|---|---|
| `/` | 31 eleman → basisGrotesque (SANS) | basisGrotesque ✅ |
| `/sss` | 9 eleman → ui-sans-serif | **ui-sans-serif** |
| `/the-story` | 11 → ui-sans-serif | **ui-sans-serif** |
| `/blog` | 3 → ui-sans-serif | **ui-sans-serif** |
| `/programlar/reiki` | 9 → ui-sans-serif | **ui-sans-serif** |

Yani: Space Mono indiriliyor ama HİÇBİR yerde render edilmiyordu; ve ana sayfa
ile menüden gidilen on bir sayfa **iki farklı sans fontuyla** yazılıyordu. Marka
yazı tipi yalnız ana sayfada görünüyordu.

Çözüm: token'lar `@theme` içinde geçerli yedek zincirlerle tanımlanıyor (utility
üretilsin diye), gerçek bağlama `body` seviyesinde — değişkenlerin tanımlı
olduğu yerde — yapılıyor. Bkz. `app/globals.css`.

Kapı: `qa/fonts.mjs` (`npm run test:fonts`) eklendi ve `verify:runtime` zincirine
alındı. Sınıf listesine değil **computed `font-family`** değerine bakar; ayrıca
sayfanın gerçek gövde paragraflarını örnekler, çünkü asıl hasar mirasta oluşuyordu.

Neden mevcut kapılar kaçırdı: `build` yakalamaz (CSS geçerli), `lint`/`typecheck`
yakalamaz (sorun kaskadda), `test:a11y` yakalamaz (yanlış font ihlal değil),
`test:visual` yakalamaz — **ilk referans görüntüler zaten bozuk halde alınmıştı,
yani bozukluk "doğru" kabul edilmişti.**

## D074 — `prose` sınıfları ölüymüş; makale tipografisi `.article-body` oldu

Reason: `BlogDetailContent` gövdeye `prose prose-invert prose-headings:font-light
prose-a:…` yığınını veriyordu. `@tailwindcss/typography` bu projede **kurulu
değil** (package.json'da yok, globals.css'te `@plugin` yok), yani o sınıfların
tamamı hiçbir stil üretmiyordu. Yazılar `utils/blogData.ts` içindeki HTML'e gömülü
utility sınıflarıyla ayakta duruyordu ve o sınıflarda başlıklar `font-light`
**sans**'tı — sitenin serif başlık sesi makalelerin içinde düşüyordu.

Ölü sınıflar kaldırıldı, yerine `app/globals.css` içinde eleman seçicili gerçek
bir sistem geldi: `.article-body h2/h3` Ogg serif, `blockquote` Ogg italik ve
gerçek bir pull-quote ölçeğinde (`clamp(1.375rem, …, 1.75rem)`; öncesi gövdeyle
aynı 18px'ti). Seçici özgüllüğü (0,1,1) gömülü utility'leri (0,1,0) yendiği için
beş makalenin metnine dokunulmadı.

## D075 — Uzak görsel izni kaldırıldı (D072'nin doğru şekilde kapatılması)

Reason: `images.remotePatterns` içindeki `images.unsplash.com` kaydı bir kez
"uzak görsel kullanılmıyor" varsayımıyla silinmiş ve /blog'da 7 kırık görsel +
7 kez HTTP 400 üretmişti (D072); optimizer izni istek anında doğruluyor, derlemede
değil.

Bu kez varsayım yok: beş blog kapağı `utils/blogData.ts` içinde yerel
`StaticImageData` importlarına taşındı (`public/ImageContainer/*.jpg`), kod
tabanında tek bir uzak görsel URL'i kalmadığı taranarak doğrulandı ve kaldırma
sonrası **21 rotanın tamamı** `npm run test:images` ile ölçüldü: kırık görsel 0,
optimizer ≥400 yanıtı 0. `remotePatterns: []` artık boş ve yorumu bunu doğru
anlatıyor.

Yan kazanç: kapaklar üçüncü taraf bir CDN'e bağlı olmaktan çıktı ve LCP yolundan
ayrı bir origin bağlantısı kalktı. Ayrıca öne çıkan yazının kapağı yoğun yeşil bir
orman fotoğrafıydı — `docs/ART-DIRECTION-GAPS.md`in "yanlış dil" dediği tam olarak
bu; kart %10 opaklıkta gösterdiği için görünmüyordu.

## D076 — `#D1CCBF` "birleştirildi" deniyordu, JS prop'larında yaşıyordu

Reason: Faz 1'in renk birleştirmesi CSS sınıflarını taradı; rengi **prop olarak**
alan bileşenleri (`NavigateSVG`, `StyledLink`, `BurgerSVG`, `CheckBoxIcon`, …)
hiç görmedi. Sonuç: `--color-cream` altında birleştiği ilan edilen `#D1CCBF`
11 yerde, denetim listesinde hiç olmayan üçüncü bir krem (`#d0cbbe`) 1 yerde
yaşamaya devam ediyordu.

`utils/palette.ts` içine `ink` (deep/cream/white) ve `Ink` tipi eklendi; prop
tipleri sabit dizgi birleşiminden bu tipe çevrildi. TypeScript kalan yedi çağrı
noktasını tek tek gösterdi. Değişim kontrast **yükseltmesi** (#d1ccbf 7.92:1 →
#ced1bf 8.16:1) ve gözle ayırt edilemez (255 üzerinden −3/+5/0).

Ölçüm: `.tsx` ham hex 764 → 119; 3D sahneler (chakra/meridyen renkleri, bunlar
marka sapması değil semantik) dışarıda tutulunca **68** — planın <80 hedefinin
altında. Not: planın ikinci ölçütü ("var(--…) > 600") YANLIŞ ölçüttü; Tailwind
v4'te benimseme `var()` ile değil üretilen yardımcı sınıflarla oluyor. Gerçek
benimseme: `.tsx` dosyalarında **609** token yardımcı sınıfı kullanımı.

## D077 — Blog kart ızgarası editoryal oldu; `whileInView` opaklığı hareket azaltmaya uymuyormuş

Reason: Plan 12'nin ilk yarısı (öne çıkan yazı) yapılmıştı, ikinci yarısı —
"diğerleri küçük" kart ızgarası — jenerik kutu olarak kalmıştı: `p-6 bg-cream/5
rounded border border-cream/10`, yani A9'un tarif ettiği kalıbın ta kendisi.
Kartın içinde ayrıca fotoğrafın ÜSTÜNE mutlak konumlanmış bir kategori rozeti
vardı (`bg-deep/90 backdrop-blur`).

Çerçeve kaldırıldı: üstte ince bir kural, altında tam opaklıkta 4:3 fotoğraf,
sonra mono kicker (kategori), serif başlık, özet ve mono meta satırı. Kategori
artık fotoğrafın üstünde değil. Aynı dil makale sayfasındaki kategori rozetine de
uygulandı. Izgara boşluğu `gap-8` yerine `gap-x-10 gap-y-14`: çerçeve kalkınca
eşit boşluk satırları birbirine yapıştırıyordu.

**Yan bulgu — ve asıl önemli olan bu.** `MotionConfig reducedMotion="user"`
dönüşüm ve layout animasyonlarını kapatır ama **opaklığı kapatmaz**. Yani
`initial={{ opacity: 0 }}` + `whileInView` kullanan kartlar, hareket azaltma
tercihi olan kullanıcıda da beliriyordu. İki sonucu vardı:

1. Erişilebilirlik tercihi fiilen uygulanmıyordu.
2. Otomatik kontrast taraması kartı yarı saydamken yakalayabiliyordu.

İkincisi ölçüldü: temiz bir koşuda `test:a11y`,
`/blog/meridyen-terapisi-bedenin-enerji-aglari` üzerinde 2 düğümlük bir
color-contrast ihlali bildirdi. **Aynı derleme üzerinde aynı rota 5 kez tek tek
tarandı ve ihlal HİÇ tekrarlamadı** — yani bulgu aralıklı; kaynağı sayfa içeriği
değil, tarama ile animasyonun yarışması. `qa/a11y.mjs` zaten `reducedMotion:
"reduce"` ile tarıyor, ama Motion opaklığı yine de canlandırdığı için bu koruma
işe yaramıyordu.

Çözüm test kaçamağı değil, davranışın düzeltilmesi: `BlogCard` ve
`BlogPageContent` artık `useMountedReducedMotion()` okuyup `initial={false}`
veriyor. Hareket azaltma tercihi olan kullanıcı içeriği son durumunda görüyor;
tarama da öyle.

## D078 — `::selection` token'a çevrildi; arada yanlış bir sonuca varıp geri dönüldü

Reason: `app/globals.css` içindeki `::selection` kuralı `--color-cream` ve
`--color-deep`in birebir kopyası olan ham hex kullanıyordu (A1'in CSS
tarafındaki hâli). Token'a çevrildi.

**Ama arada iki yanlış sonuca varıldı ve ikisi de ölçümle düzeltildi. Yöntem
dersi burada:**

1. İlk doğrulama ölçütü "seçim zemini TAM krem (#ced1bf) olmalı" idi. WebKit'te
   %0 okundu ve "WebKit `::selection` içinde `var()` çözmüyor" sonucuna varıldı.
   Kural ham hex'e geri alındı.
2. Ham hex'le de WebKit %0 verdi. Bu sefer "Safari'de marka seçim rengi hiç
   çalışmıyormuş" denip `<body>`, `SubPageLayout` ve `/404` üzerindeki
   `selection:bg-cream selection:text-deep` yardımcı sınıfları kaldırıldı.
3. Seçili bölgenin GERÇEKTE hangi rengi boyadığı okununca ikisinin de yanlış
   olduğu görüldü:

   ```
   webkit   seçimsiz 45,55,50  ->  seçili 122,129,109
   chromium seçimsiz 45,55,50  ->  seçili 205,208,191
   ```

   WebKit kuralı UYGULUYOR; yalnız highlight'ı ~%48 alfayla harmanlıyor, o
   yüzden tam renk hiç çıkmıyor. Ölçüt baştan yanlıştı.

4. Doğru ölçütle (renk kayması) yeniden test edildi:

   ```
   sabit hex ile            45,55,50 -> 122,129,109   kayma 122
   var(--color-cream) ile   45,55,50 -> 122,129,109   kayma 122
   var(--tanimsiz) ile      45,55,50 ->  45, 55, 50   kayma   0   (kontrol)
   ```

   İlk iki satır birebir aynı: **WebKit `var()`'ı sorunsuz çözüyor.** Üçüncü
   satır ölçümün gerçek başarısızlığı yakaladığını gösteriyor.

Sonuç: kural token'a çevrildi, kaldırılan üç yardımcı sınıf geri kondu (kaldırma
gerekçesi yanlıştı), kapı doğru ölçütle yazıldı. Üç motorda da geçiyor
(kayma 262 · 262 · 122).

**Ders:** bir tarayıcı farkı iddia etmeden önce, ölçümün o farkı gerçekten
ölçebildiğini kanıtlayan bir KONTROL koşusu gerekir. Burada kontrol (tanımsız
token) en sona bırakıldığı için iki tur yanlış iş yapıldı. Kapı:
`npm run test:selection` (qa/selection.mjs).

## D079 — Faz 4: hero açılışı JavaScript'ten alındı; LCP hedefi yine karşılanmadı

Reason: Planın 16. maddesi "mobil Slow 4G LCP 3244 → <2500 ms" diyordu ve çözüm
olarak **hero görsellerini** işaret ediyordu (`SideBar/` 3,3 MB, AVIF/WebP
üretimi, `sizes` daraltması). **Bu teşhis yanlıştı.** Ölçüldü:

```
mobil 4× CPU + Slow 4G, soğuk önbellek, istek dökümü:
  t=  414 ms  HTML     147 KB
  t=  473 ms  hero gorseli  97 KB      ← gorsel ZATEN erken geliyor
  t=  901 ms  CSS       97 KB
  t= 5200 ms  fontlar  191 KB (7 dosya)
  t= 7169 ms  JS       690 KB (170 + 169 + 138 + 53 + 52 + 35 …)
  tur toplami: js 690 · font 191 · img 180 · css 100 · html 147 KB
```

Mobilde görsel transferi **180 KB**; `next/image` istek anında zaten AVIF/WebP
üretiyor. Yani planın önerdiği iş neredeyse hiçbir şey kazandırmayacaktı.
Ağırlık **JS'te**.

**Bulunan gerçek sorun.** `HeroOpeningMotion` Motion ile `initial="hidden"`
kullanıyordu; Motion bu prop'u SUNUCU HTML'İNE yazar. Yani hero başlığına
`translateY(115%)`, paragrafına `opacity:0` gömülüyordu ve **görünür alanın
tamamı 690 KB JS inip hidrasyon bitene kadar boyanmıyordu.** Ölçüm: LCP
12152 ms, LCP ögesi hero paragrafı. Metnin boyanması için gereken her şey
(HTML + CSS + font) 3,5 saniyede hazırdı.

Bu, `app/template.tsx`te çözülen sorunun aynısı (D0xx / A5 notu). Koreografi
saf CSS'e taşındı: `app/globals.css` içindeki `.hero-line*`, `.hero-fade*`,
`.hero-fade-center`, `.hero-outline-out`. Gecikmeler, süreler ve eğriler
`utils/motion/tokens.ts` ile birebir aynı bırakıldı.

**Doğrulama — davranış korundu:**

* `test:visual` güncellemesiz koşuldu: `home` karelerinde değişen piksel
  **%0.000 / %0.000 / %0.003 / %0.000** (eşik %0.15). Görünen sonuç aynı.
* Sunucu HTML'inde hero paragrafından ÖNCEKİ bölgede `opacity:0` **0**,
  `translateY(115%)` **0** (öncesinde vardı). Kalan 27/15 kullanım ekran
  altındaki bölümlerde, LCP dışı.
* 14 kapının tamamı geçti.

**Yan düzeltmeler:**

* Hero görseli iki kez render ediliyordu. `HeroClient`, viewport çözülmeden
  ayrı bir `<Image>`, çözülünce `<HeroMobileClient>` basıyordu; aynı kare,
  farklı ağaç şekli → React ilk `<img>`i söküp yenisini takıyor → soğuk
  önbellekte üçüncü bir istek. Her iki durum aynı bileşene bağlandı; dökümde
  görsel toplamı **457 → 360 KB**.
* Space Mono ağırlık 700 bırakıldı. Tarandı: `font-mono` taşıyan hiçbir
  className bold istemiyordu; tek istisna 3D meridyen sahnesindeki 8px'lik bir
  etiketti (`font-semibold` → `font-medium`). Derlemedeki font varlıkları
  **217 KB / 11 dosya → 194 KB / 8 dosya**. Not: bu dosyalar ana sayfada
  zaten yüklenmiyordu, kazanç `/programlar/meridyen-terapi` tarafında.

**HEDEF KARŞILANMADI.** Slow 4G LCP medyanı 9764 → **9424 ms** (5 koşu,
yayılım 8880–9596). Hedef <2500 ms.

Neden bu kadar az oynadı: hero metni artık erken boyanıyor ama LCP ögesi hero
GÖRSELİ ve o da 1,6 Mbps'lik hattı 690 KB JS ile paylaşıyor. Kritik yoldaki
~1,3 MB'ın tamamı inmeden büyük ögenin sunumu tamamlanmıyor.

**Bundan sonrası bundle işidir, cila değil.** Somut adaylar (hiçbiri bu turda
yapılmadı, ölçülmedi):

1. Motion'ı `LazyMotion` + `m` bileşenine çevirmek. Şu an her sayfa tam
   `motion` paketini alıyor; `8962-*.js` (138 KB) ve `8148-*.js` (52 KB)
   yığınlarında motion imzası var.
2. Ekran altı istemci bileşenlerini `next/dynamic` ile ertelemek.
3. HTML'in kendisi 147 KB — SSR çıktısının küçültülmesi ayrı bir inceleme.

Bu üçü tahmindir; uygulanmadan önce ölçülmeli. Bu turun dersi tam olarak buydu:
planın "hero görselleri" teşhisi ölçülmediği için yanlıştı.

## D080 — Bundle işi: 138 KB kesildi, LCP oynamadı; darboğaz bant genişliği değil CPU

Reason: "Bundle işini de yap" talebiyle başlandı. Sonuç iki bölümde: ölçüm
yöntemimde bir HATA bulundu ve düzeltildi; ardından yapılan gerçek kesintiler
LCP'yi neredeyse hiç değiştirmedi — bu da asıl darboğazı gösterdi.

### 1. Önceki transfer rakamlarım YANLIŞTI (D079'daki dahil)

`response.body().length` **kod çözülmüş** boyutu verir. Sunucu gzip gönderiyor:

```
HTML     150.716 -> 25.715 bayt   (5,9x)
JS yigini 174.198 -> 46.216 bayt   (3,8x)
```

Yani D079'da yazdığım "ağırlık JS'te: 690 KB" **hatalıydı**. `request.sizes()
.responseBodySize` ile ölçülen gerçek (tel üzerindeki) dağılım:

```
img   360 KB   <- en buyuk kalem
js    213 KB   <- 690 degil
font  190 KB   <- woff2 zaten sikistirilmis, gzip kazandirmiyor
html   25 KB · css 19 KB        TOPLAM 812 KB
```

Fontlar, küçümsediğim kalem, ikinci sıradaydı. Ders: sıkıştırmayı doğrulamadan
transfer rakamı yazma. (`curl -I` de yanıltıyor — HEAD isteğinde
`Content-Encoding` başlığı görünmüyor; GET ile doğrulanmalı.)

### 2. Tavan ölçüldü — hedef bundle işiyle zaten ulaşılamaz

Uygulama yığınları ağ katmanında engellenerek (JS kapatılmadı, yoksa ölçüm
scripti de çalışmazdı) ulaşılabilecek en iyi sonuç bulundu:

```
JS acik  (bugunku)   FCP 5716 ms   LCP 11132 ms   1511 KB
JS engelli (tavan)   FCP 2852 ms   LCP  3128 ms    617 KB
```

**Tüm uygulama JavaScript'i sıfırlansa bile LCP 3128 ms.** Hedef <2500 ms
bundle çalışmasıyla tek başına ulaşılabilir değil.

### 3. Yapılan kesintiler (ikisi de piksel bazında doğrulandı)

**Yerel fontlar alt kümelendi: 172 -> 128 KB.** Aralıklar tahminle değil
ölçümle seçildi: 21 rotanın metni taranıp sitede fiilen kullanılan 100 karakter
çıkarıldı, sonra güvenlik payıyla Latin + Latin-Ext-A + genel noktalama + oklar
tutuldu. Orijinaller `app/fonts/original/` altında korundu.

> İlk deneme TİPOGRAFİYİ BOZDU. `--layout-features="kern,liga,clig,calt,tnum,onum"`
> diye elle liste verince Ogg'un kullandığı başka özellikler düştü ve
> `/the-story` başlığı kaydı: görsel regresyon 4 viewport'ta %0,854–1,574
> (eşik %0,15). `--layout-features='*'` ile yeniden üretildi; kazanç 67 -> 44 KB'a
> düştü ama **32 karşılaştırmanın hepsi %0,000**. Doğru takas bu.

**Hero görseli kalite 75 -> 60: 96 -> 49 KB.** Göz kararı değil: hero üç scrim
katmanının altında ve tonal aralık zaten eziliyor. Sayfa üzerinde pixelmatch
(390x844, DPR 2, animasyonlar kapalı): **q=68 -> 0 farklı piksel, q=60 -> 0,
q=52 -> 22 (%0,002).**

**Net: tel üzerinde 812 -> 674 KB (-138 KB, %17).**

### 4. Ve LCP oynamadı — asıl bulgu bu

```
Slow 4G LCP   9424 -> 9352 ms   (5 kosu medyani)
TBT           ~2362 ms
```

138 KB kesilmesine rağmen LCP sabit kaldı. Yani **darboğaz bant genişliği
değil, ana iş parçacığı.** 4x CPU kısıtı altında TBT ~2,4 saniye; büyük ögenin
sunumu bayt beklemiyor, hidrasyon bekliyor. Tavan ölçümündeki kazanç da
baytlardan değil, hidrasyonun tamamen ortadan kalkmasından geliyordu.

### 5. Sıradaki iş ve sınırı

Kazanç bayt kesmekten değil **çalışan istemci JavaScript'ini azaltmaktan**
gelir. Somut yön: 58 dosya Motion kullanıyor, ana sayfadaki her bölüm bir
istemci bileşeni. Seçenekler:

* Motion'ı `LazyMotion` + `m` ile bölmek (58 dosya, 188 kullanım; 12 dosya
  `motion/react-client` ile RSC tarafında — bu kombinasyonun davranışı
  doğrulanmalı).
* Ekran altı bölümleri istemci bileşeni olmaktan çıkarmak / ertelemek.

**Ama beklenti gerçekçi tutulmalı:** tavan 3128 ms. Hedef <2500 ms'e ulaşmak
için hidrasyonun yanında HTML/CSS/font kritik yolunun da kısalması gerekir.
Bu iş yapılmadan önce yukarıdaki tavan ölçümü tekrarlanmalı.

## D081 — Hidrasyon fazı: hero yerleşmesi CSS'e alındı; LazyMotion göçü ÖLÇÜMLE ELENDİ

Reason: D080 darboğazın ana iş parçacığı olduğunu göstermişti (TBT ~2362 ms).
Bu turda "istemci JS'ini azalt" yönü araştırıldı. Sonuç: bir değişiklik yapıldı,
bir büyük göç ise **ölçüme dayanarak yapılmadı.**

### Hidrasyon CPU'su nereye gidiyor (CDP örnekleme profili, 4× kısıt)

```
(program/GC — büyük ölçüde boşta)   7460 ms
8962 (Motion)                       1164 ms   %9,9
4bd1b696 (react-dom)                1121 ms   %9,5
webpack runtime                      541 ms
7097 (Motion)                        466 ms
1255 (react/router)                  449 ms
app/page                             324 ms
```

JS işinin toplamı ~4,3 sn; bunun **Motion'a düşeni ~1705 ms (%39)**, React/router
~1570 ms (%36).

### Ayırt edici test: bu CPU ayrıştırma mı, çalışan animasyon mu?

Aynı profil `reducedMotion: "reduce"` ile tekrarlandı:

```
                       normal    reduced-motion
Motion 8962            1545 ms      1030 ms
Motion 7097             606 ms       111 ms
react-dom              1700 ms      1226 ms
Motion toplam          2151 ms      1141 ms
```

**Motion CPU'sunun ~%47'si çalışan animasyon, ~%53'ü ayrıştırma/kurulum.**

### LazyMotion göçü NEDEN YAPILMADI

Tavan ölçüldü. Framer'ın kendi boyut derlemeleri:

```
size-rollup-dom-max.js        83 KB   <- bugun gonderilen (tam paket)
size-rollup-dom-animation.js  36 KB   <- LazyMotion + domAnimation
```

Yani göçün tavanı ~47 KB sıkıştırılmamış, tel üzerinde **~15 KB**. Buna karşılık
maliyet: **58 dosya, 188 `motion.*` kullanımı**, üstelik 12 dosya
`motion/react-client` kullanıyor ve o giriş noktası bileşenleri **tam özellik
paketiyle** üretiyor (`framer-motion/client` → `createMotionComponentWithFeatures`),
yani o 12 dosya dönüştürülmeden LazyMotion hiçbir şey kazandırmaz.

D080'de 138 KB kesilmesine rağmen LCP'nin oynamadığı zaten ölçülmüştü. 15 KB
için 58 dosyalık bir göç, ölçülen getirisiyle orantısız bir risktir. **Yapılmadı.**

### Yapılan: hero yerleşmesi Motion'dan CSS'e

Profildeki en uzun tek animasyon buydu: hero görselinin `scale 1.08 -> 1`
hareketi **28 SANİYE** sürüyor ve sayfa yüklenirken tüm o süre boyunca Motion'ın
her karede ana iş parçacığında çalışmasını gerektiriyordu. `app/globals.css`
içine `heroSettle` / `heroSettleDesktop` keyframe'leri eklendi; koreografi aynı
(1.08→1 mobil, 1.06→1 masaüstü, 28s, easeOut).

* `HeroMobileClient` artık **Motion'a hiç bağımlı değil**.
* `HeroDesktopClient`te yalnız kaydırmaya bağlı maske Motion'da kaldı — o
  gerçekten scroll'a bağlı, CSS karşılığı üç motorda güvenilir değil.
* Hareket azaltma JS hook'u yerine `prefers-reduced-motion` medya sorgusuyla.

**Doğrulama:** görsel regresyon 32/32 %0,000; 14 kapının tamamı geçti.

### PERF DELTASI ÖLÇÜLEMEDİ — dürüst kayıt

Bu değişikliğin LCP/TBT etkisi **bu makinede güvenilir biçimde ölçülemedi.**
Ölçüm sırasında boş RAM 7,9 GB'ın 1,0–1,2 GB'ına inmişti (kullanıcının kendi
Chrome'u 16 süreç, Spotify, Docker Desktop). Aynı derlemede masaüstü TBT'si
34 ms ile 489 ms arasında salındı — tek bir animasyonu CSS'e almanın
üretemeyeceği bir fark. Bu koşulda bir iyileşme İDDİA EDİLMİYOR.

Değişiklik yine de doğrudur ve yapısal gerekçeye dayanır: 28 saniyelik bir
JS animasyonu ana iş parçacığından kalkmıştır ve bir bileşenin Motion
bağımlılığı tamamen kesilmiştir. Sayısal etki, makine boştayken yeniden
ölçülmelidir.
