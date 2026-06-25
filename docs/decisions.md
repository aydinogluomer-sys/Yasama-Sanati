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
