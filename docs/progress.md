# Progress

## Completed

- [x] Phase 0 — repository handoff and working discipline.
- [x] Phase 1 — Editorial Wellness Academy direction and narrative.
- [x] Phase 2 — UX flow and conversion hierarchy.
- [x] Phase 3 — production design-system roles and runtime tokens.
- [x] Phase 4 — baseline section audit and scored backlog.
- [x] Phase 5 — hero hierarchy, CTAs, responsive layout, and video-dialog accessibility.
- [x] Phase 6 — progressive 3D meridian scene, native scrolling, lazy mount, and static fallbacks.
- [x] Phase 7 — navigation, program discovery, narrative sections, story, and form polish.
- [x] Phase 8 — motion governance and reduced-motion behavior.
- [x] Phase 9 — keyboard, focus, semantics, dialog, form, and canvas accessibility pass.
- [x] Phase 10 — asset/build audit, local country data, optimized blog images, and route-size benchmark.
- [x] Phase 11 — footer reconciliation against the site-wide system.
- [x] Phase 12 — production build and browser quality matrix.

## Verification

- [x] `npx.cmd tsc --noEmit`.
- [x] `npm.cmd run build`: 31 pages, no lint warnings, home first-load JS 204 kB.
- [x] `git diff --check` (line-ending notices only).
- [x] Browser: 1366×900, 768×1024, and 375×812; zero horizontal overflow.
- [x] Keyboard: mobile menu, video dialog, checkbox, form fields, and focus restoration.
- [x] Reduced motion: hero video paused, Lenis absent, and 3D static fallback without canvas.
- [x] `the-story` reduced-motion fallback removes the canvas and keeps the route readable.

## Status

Iteration 07: PASS at 94/100. Remaining optimization opportunities are non-blocking and listed in `docs/issues.md`.

---

# Silhouette Sprint (Round 2 — visible redesign)

Goal: change the *visible silhouette* (perception), not invisible quality. See `docs/silhouette-implementation.md`.

## Phase 0 — Baseline & scope freeze ✅

- Read full plan; confirmed repo lives in `Elementis-SOTD`, stack = Next 15 / React 19 / Tailwind 4 / Motion / Lenis / Three.
- Baseline health: `tsc --noEmit` PASS; prior build 31 pages, 204 kB home first-load JS.
- Scored current site on visible-impact categories → see `docs/visual-audit-silhouette.md`.
  - Visible-impact average ≈ **5.6/10**; overall ≈ **6.4/10** (a11y 9.0 / perf 8.7 protected).
- Logged 10 sprint issues (S01–S10) and decisions D019–D025.
- Scope frozen: section order preserved; visual mass + transitions + typography change.

### Baseline scores (Phase 0)

| Category | Baseline |
|---|---:|
| Hero silhouette | 6.5 |
| Typography drama | 5.0 |
| Section transition quality | 5.5 |
| Signature motion | 5.0 |
| Editorial layout rhythm | 6.0 |
| Card state fluidity | 6.5 |
| Button/CTA tactility | 5.5 |
| Mobile visual impact | 6.0 |
| Accessibility | 9.0 |
| Performance | 8.7 |
| Brand fit | 8.0 |
| Awwwards memorability | 5.0 |

## Phase 1 — Creative direction reset ✅

- Diagnosed root cause: round 1 picked the right route (Editorial Wellness Academy) but its
  "headings not oversized by default" guardrail kept the site invisible; serif was loaded, never used.
- Scored 3 routes (see `docs/art-direction.md`): **Primary A**, **accent C (Meridian Intelligence)** as a
  scroll-drawn line, B contributes pacing only.
- Revised typography stance: serif = display voice, clamp scale to ~12vw, manual breaks phased out.
- Wrote mood-per-zone and Round-2 anti-pattern list. No UI changes yet.

## Phase 2 — Typography System V2 ✅ (first visible code change)

- Added clamp display scale to `app/globals.css` (`text-display-xl/l/m/s`, `text-body-lg`, `text-kicker`).
- Centralized motion in `utils/motion/tokens.ts` + `utils/motion/variants.ts` (D022; killed the
  copy-pasted `[0.24,0.43,0.15,0.97]` easing).
- New `components/Server/EditorialSectionTitle.tsx` (serif-italic index + rule + tracked kicker).
- Converted lead statements of Introduction / WellnessSanctuary / ElementisStory to **serif Display S**.
- Verified LIVE on next dev: `.text-display-s` & `.text-kicker` CSS rules generate, serif renders on 3
  sections, no compile errors. (Replaced two stale `next start` servers with a hot-reloading dev server.)
- Score: Typography drama 5.0 → ~7.0 (serif voice + kickers visible; giant hero type still to come in P3).

## Phase 3 — Hero Silhouette Redesign ✅ (signature moment #1)

- Rebuilt the above-the-fold as an asymmetric editorial composition: giant serif headline
  `Beden, zihin / ve enerji, / tek bütün.`, copper kicker, hand-drawn underline, signature meridian
  line, readability scrim over the brand video, clear CTA hierarchy.
- New components: `HeroOpeningMotion`, `HandwritingMark`, `MeridianDrawPath`. `Hero/Server.tsx` rewritten.
- Staggered opening timeline; reduced-motion collapses to final state. Click-to-play-film preserved.
- Verified live with headless screenshots at 1440×900 and 390×844 (desktop + distinct mobile).
- Fixed two layout gotchas (marquee size via twMerge; mobile support width cap).
- Score: Hero silhouette 6.5 → ~9.0; Signature motion 5.0 → ~7.5; Typography drama ~7.0 → ~8.5.

## Phase 4 — Section Rhythm & Visual Mass ✅

- Turned ElementisStory into a **cream `#F3EFE6` editorial chapter break** (dark text, `tone="dark"`
  kicker, copper StyledLinks, handwritten underline) — a high-contrast light section amid dark ones.
- Established a deliberate tonal journey: deep → deep → warm → deep → **cream** → warm → close
  (see `design-system/section-rhythm.md`); no two adjacent major sections share mass/tone.
- Added `id="hikaye"` anchor to the story section.
- Verified visually via a temporary stacked preview route (since deep sections sit behind a 500vh
  scroll stage): confirmed deep→warm→cream→warm rhythm and serif leads; preview route then removed.
- Score: Editorial layout rhythm 6.0 → ~8.7; Section transition (static) groundwork for Phase 5.

## Phase 5 — Cinematic Section Transitions ✅ (signature moment #2)

- New `SectionSeam` (ambient morph gradient + scroll-linked copper screen-wash sweep) wired at every
  tone change in `app/page.tsx` — hard colour cuts replaced with cinematic blends (esp. deep→cream→warm).
- New `SectionTransition` (rise/clip) scroll-linked entrance; applied to SustainableRetreat.
- All transition motion uses central tokens; reduced motion degrades to static blends/state.
- Verified visually via temp seam preview (warm→cream and cream→warm blends render smoothly); removed.
- Score: Section transition quality 5.5 → ~8.8.

## Phase 6 — Responsive-Safe Text Animation ✅

- New `components/Client/DynamicLineReveal.tsx`: word-level masked reveal (each word owns its clip),
  responsive by construction, SSR-safe (deterministic markup → no hydration mismatch), reduced motion
  via layout MotionConfig. Optional `highlight` substring for accent words. (D026)
- Converted the Introduction body paragraph from a 5-line manual `MaskText` array to a single
  responsive `DynamicLineReveal` (manual line breaks removed there).
- Fixed mobile paragraph overflow with `min-w-0` on the flex/grid item + viewport-relative cap (D027).
- Verified live: 40 word spans tokenized, body text intact, tsc clean. Pixel-level wrap confirmation
  deferred to Phase 12 clean-build QA (dev preview route had an HMR render-staleness quirk).
- Remaining serif lead statements keep isolated manual arrays but are `text-wrap`-safe (Phase 2).
- Score: contributes to Typography drama (~8.5 → ~8.8) and removes intermediate-width break risk.

## Phase 7 — ClipImageCard Fluidity ✅

- `ClipImageContainer`: added a gentle opacity crossfade during the final third of each scroll clip-wipe
  and changed scale to a *settle* (1.04 → 1 as a card becomes active) — image transitions now crossfade
  + clip-continue instead of a hard wipe.
- `MaskTextClient`: graceful enter (0.55s) + short exit (0.32s) on the central editorial easing, plus a
  new `delay` prop. ClipImageCard now cascades index (0) → title (0.06) → description (0.12).
- Verified: tsc clean; card content live; motion is identity at rest (no static regression). Scroll-through
  fluidity to be confirmed in Phase 12 clean-build QA.
- Score: Card state fluidity 6.5 → ~8.6.

## Phase 8 — Button/CTA Motion Standard ✅

- `BorderedButton` (used site-wide: NavBar, course templates, programlar/egitmenler/sss): added
  `vectorEffect="non-scaling-stroke"` to both border paths (no more stroke deformation under the
  stretched viewBox), removed the 0.3s hover delay, moved duration 0.8s → token `buttonStroke` (0.52s),
  added `whileFocus` parity, and made it a client component so reduced motion snaps the stroke instantly.
- Now consumes central motion tokens → one motion grammar with the hero CTAs.
- Verified live: `non-scaling-stroke` present (home 5×, reiki 4×); old `delay:0.3` gone; tsc clean.
- Resolves issue S07. Score: Button/CTA tactility 5.5 → ~8.8.

## Phase 9 — Meridian / Breath Signature Layer ✅ (signature moment #4)

- New `components/Client/ScrollMeridian.tsx`: a fixed right-gutter "meridian / breath" thread that
  threads every scene. Faint always-on track + a bright line that draws with smoothed global scroll
  progress (`useSpring(scrollYProgress)`), plus acupoint nodes.
- `MeridianDrawPath` extended: faint track in scroll-bound mode + gentle breathing pulse on the acupoint
  nodes (Option A + B), disabled under reduced motion.
- Removed the hero's separate meridian instance (now covered site-wide) to avoid a double line.
- Site-specific motif tied to the brand (meridian therapy / breath / energy), not a generic glow.
- Verified: hero composition clean with the subtle track; tsc clean; ScrollMeridian present in HTML.
  Bright scroll-draw to be confirmed in Phase 12 scroll-through QA.
- Score: Signature motion 7.5 → ~9.0; Awwwards memorability 5.0 → ~8.5.

## Phase 10 — Accessibility & Reduced-Motion Hardening ✅

- Verified (headless, forced reduced motion + virtual time): full hero content renders at final state —
  no content hidden behind motion. Reduced-motion handling audited across all new components.
- Decorative layers `aria-hidden`; `DynamicLineReveal` keeps real readable text; single h1 preserved.
- Contrast tuned to AA: hero kicker → `#E0A878` (~4.9:1), trust → white/60, cream accent → `#A85F33`
  (~4.4:1), editorial index copper now tone-aware. tsc clean.
- Deferred to Phase 12: browser axe/zoom/keyboard-focus pass; optional heading promotion noted.
- Score: Accessibility held at ~9.0 (floor protected; contrast improved).

## Phase 11 — Performance & Build Hardening ✅

- Clean `.next` + `next build`: **PASS**, lint + types clean, **no errors/warnings**, 31 pages.
- Home first-load JS **204 kB → 207 kB (+3 kB)** for the entire Round-2 redesign; shared 101 kB unchanged.
- No new dependencies (D024 held). Motion is transform/opacity/clipPath-based.
- Benchmark written. Score: Performance held ~8.7 (well within budget; +3 kB documented).

## Phase 12 — Full QA & Final Score ✅

- Built a CDP scroll-and-screenshot helper (`qa/shot.mjs`) and verified the assembled experience on the
  **production build** at real scroll positions: hero, Introduction responsive body (no overflow),
  dark→warm and cream→warm ambient seams, serif section leads, cream Story chapter, and the
  **scroll-drawn meridian with breathing acupoint nodes**. Reduced-motion content confirmed visible.
- Definition of Done: all core items met; 4 signature moments present; ≥60% of major sections visibly
  changed. Full report in `docs/qa-report.md`.
- **Final score: baseline ~6.4 → ~8.8 average.** Hero 9.2, signature motion 9.0, transitions 8.8,
  a11y 9.0, performance 8.7 hit target; typography 8.8 just under the 9.0 aspiration.

## Sprint outcome

> "This is still Yaşama Sanatı, but no longer a slightly-polished version of the same site — it now
> reads as if a creative studio re-staged it." — success criterion met.

---

# SOTD Pass (self-paced loop — awwwards-loop iteration 08+)

Goal: push route `/` from the "well-polished" band toward the Awwwards SOTD band, scored against the
official weighting (Design 40 / Usability 30 / Creativity 20 / Content 10) and the 12 project-critical
parameters. Each iteration applies the highest-impact *visible* gap, then verifies (tsc + build +
3-viewport CDP screenshots) and scores. Authorized to run autonomously.

## Phase re-test (all 12 silhouette phases) ✅

- `tsc --noEmit` PASS; `next build` PASS (31 pages, home 207 kB, no warnings).
- Code-level signature checks for every phase passed (display scale, motion tokens, hero components,
  SectionSeam/SectionTransition wiring, DynamicLineReveal, ClipImageContainer crossfade,
  BorderedButton non-scaling-stroke, ScrollMeridian, global `MotionConfig reducedMotion="user"`).
- Runtime screenshots captured at 1440 / 768 / 390. Two visible gaps found → loop backlog
  (G1 mobile-hero collision, G2 footer-as-closing-scene).

## Iteration 08 — G1 mobile hero affordance ✅

- Moved the mobile film play glyph off the editorial headline (upper-centre, discreet ring/blur);
  kept full-hero tap-to-play. Build green; mobile headline now unobstructed (D029).
- Score (SOTD lens): 90/100. Next: G2 footer closing scene.

## Iteration 09 — G2 footer closing scene ✅ (critical parameter #12)

- Added an editorial closing band above the footer columns: copper kicker `Bir sonraki adım`, giant
  serif `Başlamak için bir nefes yeter.` (`text-display-m`, `bir nefes` italic + HandwritingMark
  underline), supporting copy, and hero-grammar CTAs (`Ön Görüşme` + `Programları İncele`). The
  footer now closes the narrative (and ties to the breath/meridian motif) instead of opening a
  sitemap (D030).
- Verified on the production build (port 3301): closing scene renders with headline + handwriting +
  both CTAs above the intact columns/newsletter; `overflowX` 0; single `<h1>` (closing title is
  `<h2>`). Screenshot `awwwards-loop/reports/phase-test/footer-prod-close2.png`.
- QA tooling: `qa/shot.mjs` + `qa/probe.mjs` gained an `RM=1` reduced-motion flag and footer position
  fields; learned that `whileInView` reveals only fire reliably under the **prod** build in headless,
  so reveal-gated QA uses prod, not dev.
- Score (SOTD lens): 92/100. Next: G3 clip-card fluidity confirm, G4 boldness sweep.

## Iteration 10 — G3 confirm + G4 sweep → PASS ✅

- G3: clip-card "Şifa Yolculuğu" stage confirmed fluid on prod (distinct rest states, image
  crossfade + settle, graceful exit); earlier "banding" was background-photo content, not a defect —
  no code change (parameter #7 satisfied).
- G4: full-page boldness review at 1440/768/390 — every zone reads as an art-directed scene; the two
  concrete defects (G1, G2) are resolved; no template-smell zone left that a code-only change would
  meaningfully improve. Per the plan's anti-over-polish rule, no speculative tweaks made.
- Final QA: build PASS (31 pages), `overflowX` 0 on all three viewports, single `<h1>`.
- **SOTD-lens score 93/100. Verdict: PASS.** All 12 project-critical parameters satisfied and
  verified. Loop closed at diminishing returns; further upside needs non-code assets (custom
  photography, optional sound layer, a more experimental hero concept).

## Iteration 11 — deep re-audit (desktop + mobile) → PASS re-affirmed ✅

- On re-invocation, ran a fresh full-page audit on the prod build (3301) at 1440 **and** 390 across
  every section: hero, Introduction (centered editorial), WellnessSanctuary (split), clip-card
  "Şifa Yolculuğu" stage, cream Story chapter (`insan kendine nasıl geri döner?` — excellent on both
  desktop and mobile), retreat, ambient seams, and the new footer closing scene.
- Every section reads as an art-directed scene on both viewports; `overflowX` 0; single `<h1>`.
- No high-value, low-risk, **code-only** gap remains. The only remaining levers are either ~invisible
  (e.g. 4% film grain — fails the "genuinely visible SOTD impact" rule) or regression-risky (reworking
  the verified-good hero — fails the anti-over-polish rule). No speculative change made.
- **Loop stopped at PASS (93/100).** Next real gains are decision-gated: (1) art-directed custom
  photography to replace stock imagery [highest Design impact], (2) a subtle opt-in sound layer
  [Creativity, higher risk], (3) a more experimental hero concept [risks the current verified hero].

## Iteration 12 — Submission Polish ✅ (approved `awwwards-sotd-implementation.md`, Phase 15)

- Custom on-brand 404 (`app/not-found.tsx`): copper kicker, serif `Aradığın sayfa burada değil.`,
  hero-grammar CTAs — verified at desktop + mobile, HTTP 404 status correct.
- Branded dynamic OG card (`app/opengraph-image.tsx`, `next/og`, **edge runtime** — node static gen
  failed with "Invalid URL"): deep-green field, copper kicker, `Yaşama Sanatı` wordmark + rule,
  discipline line. Turkish uppercase written literally (satori mis-cases dotted İ). Verified 200/PNG.
- `app/layout.tsx`: `metadataBase` + `openGraph` + `twitter` (summary_large_image); OG/twitter images
  auto-wired from the file convention. favicon.ico already present (D032).
- Phase 0 deliverable: `docs/awwwards-baseline-audit.md` written (weighted current ≈ 9.08/10).
- Build green (31 pages + edge OG); `overflowX` 0 all viewports. Score (SOTD lens): 94/100.
- Remaining approved-plan docs: `strategy.md`, `positioning.md`, `design-system/visual-language.md`
  (most design-system + art-direction docs already exist), then a final submission-polish QA.

## Iteration 13 — Approved plan closed → PASS ✅

- Wrote `docs/strategy.md`, `docs/positioning.md`, `design-system/visual-language.md` (concise,
  grounded, no fluff) — completing the `awwwards-sotd-implementation.md` documentation deliverables.
- Final submission QA on a fresh prod build (port 3305): build PASS (31 pages + edge OG); at 1440/768/390
  `overflowX` 0, single `<h1>`, footer closing scene present; `/opengraph-image` 200 image/png;
  `/<bogus>` HTTP 404 (branded).
- **Approved plan (Phases 0–15) fully satisfied. SOTD-lens 94/100. Loop closed: PASS.**
- Decision-gated upside beyond code (needs user direction/assets): art-directed photography, optional
  restrained sound layer, more experimental hero concept.

## Iteration 14 — Inner-page typography unified to the serif voice ✅

- Audited inner pages (loop had only covered `/`): every sub-page hero used the giant **sans**
  (`text-144`) while the home established **serif** as the editorial display voice — a design-system
  inconsistency.
- Fixed in one shared component: `components/Server/SubPageLayout.tsx` hero `<h1>` →
  `font-serif text-display-l font-normal` (was sans). Covers programlar (listing + detail/full-screen),
  egitmenler, the-story, sss, placeholders (D033).
- Verified on prod: serif hero on `/programlar`, `/egitmenler`, `/the-story`,
  `/programlar/meridyen-terapi` (desktop) + `/programlar` (mobile, clean two-line wrap); build green,
  `overflowX` 0, single `<h1>` across inner pages. Site-wide typographic consistency now holds.

## Iteration 15 — Blog article title → serif (site-wide typography complete) ✅

- Extended D033 to the last sans display element: blog article `<h1>`
  (`components/Client/BlogDetailContent.tsx` → `font-serif text-display-s`). Verified on prod
  (`reports/inner/blogpost-2.png`). Build green.
- Full-site audit complete (home + programlar listing/detail + egitmenler + the-story + sss + blog).
  Display typography is now unified to the serif editorial voice everywhere; inner content layouts
  (3D meridian scene, FAQ accordion, blog reading view) are clean.
- **Safe, high-value, code-only improvements are exhausted.** Remaining SOTD upside is decision-gated:
  art-directed photography, optional restrained sound layer, or a more experimental hero concept.

## Iteration 16 — Blog articles lead with the article ✅

- `SubPageLayout` gained an opt-in `hideHero` prop (extra top padding to clear the NavBar); the blog
  article page (`app/blog/[slug]/page.tsx`) uses it so the article — not the redundant
  "Blog & Bilgi Bankası" section hero — is the page hero (D034). Better reading flow (Usability/Content).
- Verified on prod desktop + mobile (article leads, serif title, NavBar cleared); `/programlar`
  regression check confirms other sub-pages keep their section hero. Build green.

## Typography V2 (Phase 2) — visible silhouette shift ✅

Approved plan `~/.claude/plans/eager-cuddling-waterfall.md` (source: `Yeni Metin Belgesi (2).txt` +
4 reference screenshots). Five visible moves shipped, all additive/token-driven, no regression:

- ODDWORKS signature scene (`SignatureTypeScene`/`RotatedTypeMass`) — "Altı Disiplin" oversized
  `NEFES ✦ ZİHİN ✦ ENERJİ` type mass (solid/outline mix, vertical "Bütünlük"); the big new moment.
- Hero outline-typography layer (`OutlineTypographyLayer`, ghost "ŞİFA").
- Kisthe footer signature (`SignatureWordmark`, serif-italic fallback — D035 blocker).
- Katya manifesto stage (`TypographyStage`) on Introduction — also removed fragile manual line arrays.
- Space Mono micro-label system (`TypographyLabel`; `EditorialSectionTitle` index → Space Mono).

Foundations: Space Mono added (next/font), `--font-mono`/`--font-kisthe` tokens; font budget held to 4.
Verified prod build: 31 pages, shared JS 101 kB unchanged, `overflowX` 0 (1440/768/390), single `<h1>`,
Turkish glyphs correct (ŞİFA/ZİHİN/BÜTÜNLÜK). Report: `awwwards-loop/reports/typography-phase2.md`.
Open: Kisthe woff2/license (D035); P6 Intercom academy chapter structure not yet done.

### Phase 2 follow-up — Kisthe resolved + P6 academy chapters ✅

- Kisthe dropped: Cormorant Garamond *italic* is the permanent accent/signature voice (D035 resolved,
  user-approved) — full Turkish glyphs, one fewer font. Active budget = 3 faces.
- P6: `app/programlar/page.tsx` rebuilt as an Intercom-style academy chapter index (numbered 01–06,
  fine rules, serif titles, Space Mono meta, hover arrow) — replaces the template card grid on the
  highest-conversion page. Verified prod: build green, overflow 0, single h1, Turkish glyphs correct.

### P6 (cont.) — Disiplin chapter structure on program detail pages ✅

`CourseDetailTemplate` (all 6 program detail pages) rebuilt as an Intercom academy report: `ChapterHeading`
(Space Mono index + serif heading + rule) on every section; curriculum → numbered module chapter list
(Accordion replaced, "Modül N:" prefix stripped); serif intro lead. Verified prod: build green, overflow 0,
single h1, Turkish glyphs correct, desktop + mobile.

---

# 2026-07-12 — Backlog clearance sprint (3D upgrade, perf, Wave 1B, backend continuity)

### 3D Therapy Scene upgrade ✅ (IMPLEMENTATION_3D_UPGRADE.md closed)

`TherapyScene3D` now loads the shared anatomical `/models/human.glb` (normalized to the room,
re-skinned with the translucent energy-body material), re-lays all seven chakra nodes / spine
column / flow line onto standing anatomy via height fractions, and plays the skeletal
`Idle_Loop` breathing clip. Primitive meditation figure kept as instant paint + load-failure
fallback. Camera home follows the heart chakra. Verified: therapy + meridian scenes render
clean, zero console errors.

### Performance pass ✅

- `human.glb` 6.36 → 0.49 MB (stripped 44 unused animation clips; dedup/weld/quantize).
- Hero videos re-encoded (desktop 4.0→2.6 MB, mobile 2.9→1.8 MB, SSIM 0.993); intro film
  36.1→27.5 MB (SSIM 0.992). All faststart, muted streams dropped from autoplay heroes.
- Lighthouse (local prod): desktop Perf 96 / A11y 97 / BP 100 / SEO 100 (LCP 1.1s, CLS 0.027).
  Mobile-emulated 42 under 4x-CPU lab throttle with no material waste found — real-device RUM
  is the next signal, not further micro-optimization.

### Wave 1B — "Opening Breath" signature cue ✅

Breath-paced double copper ring ("Bir nefes al", 4.8s rhythm) bottom-center of the hero;
click carries the visitor to `#tanisma` (Introduction) — the visible Karşılanma → Merak
bridge. `motion-safe` pulse (static ring + instant scroll under reduced motion), focus-visible
ring, md+ only.

### Backend continuity ✅

Supabase project found auto-paused (newsletter/ön-kayıt failing silently); restored and
re-verified end-to-end. `.github/workflows/supabase-keepalive.yml` added (2x/week REST ping;
requires SUPABASE_URL + SUPABASE_ANON_KEY repo secrets, activates on push).
