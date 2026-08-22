# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The primary audience is adults seeking depth, quality, and authenticity in holistic health education. They come either for personal transformation or to develop a professional practice through structured, accredited training.

## Product Purpose

Yaşama Sanatı is a holistic health academy that brings body, mind, and energy disciplines into one coherent educational path. It helps prospective participants understand the programs, establish trust in the academy, and choose the right path through a free preliminary consultation. Success means moving a well-matched visitor from exploration to an informed consultation rather than pushing an undifferentiated course purchase.

## Positioning

Yaşama Sanatı combines rooted healing disciplines, contemporary teaching, and internationally accredited certification within a single academy. Its structured learning paths and professional qualification distinguish it from generic wellness-content platforms and one-off workshops.

## Operating Context

The academy serves participants online and in İzmir. Its current program world includes breath coaching, Reiki, meridian therapy, hypnotherapy, life coaching, and A Course in Miracles, alongside one-to-one sessions and small-group formats. The primary conversion is a free preliminary consultation used to identify the most suitable program.

The site is published at `https://yasamasanati.com`, hard-coded in `app/layout.tsx`, `app/sitemap.ts`, and `app/robots.ts`; `robots.ts` currently allows all crawlers. Form submissions run on Supabase via `app/actions.ts`, with `.github/workflows/supabase-keepalive.yml` guarding against free-tier auto-pause. No hosting-platform config is committed, so the deployment target itself is not an established fact.

Published contact points are `info@yasamasanati.com` and `+90 532 789 3753`.

## Capabilities and Constraints

- The existing product is a Turkish-language web experience built with Next.js, React, TypeScript, and Tailwind CSS.
- Program discovery, detailed program pages, instructor information, FAQs, consultation/contact flows, certification details, testimonials, and academy-story content already exist.
- **Accreditation: UNVERIFIED BUSINESS CLAIM (2026-08-23).** The site previously published
  "IECCERT onaylı" as fact, expanded as *International Energy & Complementary Medicine
  Certification*. Two problems were verified against the registrar's own site:
  (1) that English expansion is **wrong** — ieccert.com's official name is
  **"İECCERT — ULUSLARARASI EĞİTİM KONSEYİ"** (International Education Council);
  (2) İECCERT accredits **conformity-assessment bodies**, not training courses, so
  "IECCERT-approved programme" is a category mismatch.
  No programme-specific certificate, registration number or verification link exists in this
  repository. All public "IECCERT onaylı" claims were therefore removed (metadata, Course
  schema, certification field, SSS, the-story, accreditation block) and the claim is tracked
  as `UNVERIFIED` in `docs/TRUST-PROOF-MATRIX.md`. It may be republished only with
  programme-specific proof. Unnamed "uluslararası akredite" style claims remain forbidden.

- **All pricing and enrollment terms currently on the site are placeholder, not committed.** The six TL figures (Reiki 9.000, Mucizeler Kursu 12.000, Nefes Koçluğu 15.000, Yaşam Koçluğu 16.000, Hipnoterapi 16.500, Meridyen Terapi 18.500), the "15 Eylül 2026" start dates, the 3/6/12-month installment terms, and the EFT discount policy in `app/sss/page.tsx` are all unconfirmed, and the live site is presently displaying them. Pricing, enrollment rules, cohort sizes, and payment terms must not be treated as truth or carried onto new surfaces until the academy confirms them.
- The experience must preserve functional keyboard navigation, focus behavior, readable contrast, reduced-motion parity, and progressive enhancement for motion and 3D content.
- Deployment and hosting claims must not be invented beyond the confirmed domain above.

## Brand Commitments

- Product name: Yaşama Sanatı.
- Voice: calm, knowledgeable, humane, trustworthy, and academically grounded; spiritual without becoming vague or sensational.
- The academy framing, holistic body–mind–energy model, and free “Ön Görüşme” conversion path are durable commitments.
- Existing source material establishes an editorial, premium presentation and a meridian/breath motif as recognizable brand assets. Visual specifications remain governed by the existing implementation and design-system documentation, not this product record.
- **WhatsApp (`https://wa.me/905327893753`) is currently the only social channel the academy owns on this site.** Official Instagram, Facebook, TikTok, and YouTube URLs are not yet established and must not be invented or inferred.

## Evidence on Hand

- Product strategy and positioning: `docs/strategy.md`, `docs/positioning.md`, and `docs/conversion-strategy.md`.
- Program and certification content: `app/programlar/` and `components/Server/CourseDetailTemplate.tsx`.
- Academy and accreditation-partner narrative: `app/the-story/page.tsx`.
- Instructor, FAQ, consultation, and social-proof content: `app/egitmenler/page.tsx`, `app/sss/page.tsx`, and the individual program pages.
- Accessibility and quality evidence: `docs/accessibility-checklist.md`, `docs/qa-checklist.md`, `docs/qa-report.md`, and `docs/progress.md`.
- Existing claims and testimonials are source material, not independently verified proof; future work must not fabricate additional customers, outcomes, credentials, benchmarks, or partnerships.

### Inherited template content (Elementis) — never product truth

This codebase began as a clone of the Elementis luxury-resort template (`package.json` name: `elementis-clone`). Anything inherited from it describes a different company.

Removed on 2026-08-17: the `/destinations`, `/new-developments`, `/press`, `/careers`, `/sustainability`, `/innovation`, and `/wellness` routes, which published Elementis resort and partnership claims (Bali, Chile, Australia) in Turkish and were still submitted to search engines through `sitemap.ts`; and the borrowed `instagram.com/elementis.co`, `facebook.com`, `tiktok.com/@elementis.co`, and `youtube.com/@elementis-co` links plus an Indonesian `+62` WhatsApp number in `components/SVGComponents/socials/index.tsx`.

Still outstanding, and none of it may be resolved by invention:

- `app/privacy-terms/page.tsx` names "ELEMENTIS Development Group" as the contracting company, defines the Service as `elementis.co`, and gives `info@elementis.co` as the legal contact. The real legal entity, its registered details, and the correct contact address are undetermined. The footer links this page four times.
- `components/meridian-3d/MeridianSidebar.tsx` renders the literal wordmark "ELEMENTIS" in the 3D meridian sidebar.
- `app/community/page.tsx` links "YouTube Kanalımızı Ziyaret Edin" to bare `https://youtube.com`, and claims a podcast is "Spotify ve YouTube'da yayında". Whether that podcast exists is unconfirmed.
- Hero video assets remain named `elementis-*` under `public/Hero/`. Filenames only, with no visitor-facing claim.

## Product Principles

1. Guide before selling: help each visitor understand fit and choose a credible next step.
2. Treat transformation as structured education, not disposable wellness content.
3. Unite body, mind, and energy while keeping every program concrete and comprehensible.
4. Earn trust through precise claims, visible expertise, and real evidence.
5. Preserve calm, inclusive access across devices, input methods, and motion preferences.

## Accessibility & Inclusion

Accessibility is a non-negotiable product requirement. Maintain semantic structure, keyboard and focus support, sufficient contrast, readable typography, accessible forms and dialogs, reduced-motion equivalents, and non-3D fallbacks where relevant.

Open obligation: the promotional film played by `components/VideoPlayer/VideoPlayer.tsx` (`/Hero/elementis-fullmp4.mp4`) is prerecorded, unmuted, content-bearing video with no `<track>` element, no caption file, and no transcript anywhere in the project. WCAG 2.1 Level A requires captions (1.2.2) and a media alternative or audio description (1.2.3) for it. The Hero background videos in `sections/Hero/Client/` are `muted`, `loop`, and `aria-hidden`, so they are decorative and exempt. Caption text and the transcript must come from the academy; neither may be generated from assumption.
