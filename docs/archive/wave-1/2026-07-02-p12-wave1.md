# P12 — Wave 1 Implementation Plan

**Status:** PLAN ONLY — no implementation authorized
**Scope:** Hero · Hero-to-Introduction bridge · Introduction
**Emotional movement:** Karşılanma → Merak
**Signature moment:** Opening Breath
**Governance:** R1 (creative) → R2 (sequencing) → R3 (toolchain) → P07–P10 (accepted proof) → **P12 (this plan)**

> This document plans *how* Wave 1 could be implemented in a future, separately-authorized Phase 13. It writes no code, edits no source/CSS/assets/config, adds no dependencies, and authorizes nothing. Implementation remains forbidden until Phase 13 is explicitly authorized.

---

## 1. Phase 12 Status

- **Plan only.** This is a planning artifact, not implementation.
- **No implementation authorized.**
- **No code changes authorized.**
- **No dependency changes authorized** (no GSAP, Three.js, R3F, drei, Spline; no package/config edits).
- **Phase 13 required before implementation.** No Hero, bridge, or Introduction code may begin until Phase 13 is explicitly authorized (after Agent 02 read-only verification of this plan).

## 2. Inputs Read

The following were reviewed to author this plan (read-only):

- ✅ `docs/R1-Creative-Direction-Constitution.md` — Editorial Wellness Academy + Restrained Meridian Intelligence; Hero/Introduction budgets 20–30%; protections; six-stage journey.
- ✅ `docs/R2-Awwwards-90-Roadmap.md` — Phase 12 = Implementation Plan; Phase 13 = Narrow Implementation; sequencing rules (no code before proof; no Innovation redesign).
- ✅ `docs/R3-Creative-Toolchain-and-Reference-System.md` — Motion default; GSAP conditional; 3D deferred; AI proof-only; anti-pattern-only clone repos.
- ✅ `docs/P07-P10-Wave-1-Proof-Packet.md` — accepted Opening Breath direction (Phase 07/08/09) + Phase 10 verdict `APPROVE WITH WATCHLIST`.
- ✅ **Phase 11 Technical Risk Review result** — Wave 1 architecturally feasible with existing Next.js + Motion; **no new motion/effect layer needed**; Opening Breath to be achieved by *reducing / stabilizing / simplifying* existing motion & media load; 8-item technical watchlist carried forward (see §4-mapping below and each plan section).

## 3. Scope Boundary

**Allowed planning scope (Wave 1 only):**

- Hero (wrapper, media, editorial/motion content)
- Hero-to-Introduction bridge / boundary (compositional handoff)
- Introduction (first inquiry)

**Explicitly excluded (out of scope — plan must not touch, and Phase 13 must not either):**

- Innovation (structure, interaction, cards, storytelling, internal visual language) — **hard-protected**
- SignatureTypeScene (brand-memory role) — **hard-protected**
- Footer (emotional closure) — **hard-protected**
- Form
- SEO (robots/sitemap/metadata)
- Supabase / backend / actions
- global redesign / site-wide systems (e.g. `ScrollMeridian`, shared `SectionSeam` rhythm beyond the Hero→Introduction boundary)
- package / config / dependency work
- core olive/cream/copper palette identity (may be *used*, not redefined)

## 4. Relevant File Discovery

Likely-relevant surfaces for a future Phase 13, discovered read-only. **None edited.** This list scopes *where* narrow changes would land; it does not authorize any of them.

| Surface | File | Role (observed) |
|---|---|---|
| Hero wrapper | [sections/Hero/index.tsx](sections/Hero/index.tsx) | Wraps `HeroClient` + `HeroServer`; sets `bg-[#2b3530]`. |
| Hero server frame | [sections/Hero/Server.tsx](sections/Hero/Server.tsx) | Readability scrim gradient + renders `HeroOpeningMotion`. |
| Hero client split | [sections/Hero/Client/index.tsx](sections/Hero/Client/index.tsx) | `useIsMobile()` ternary → Desktop/Mobile; mounts `VideoPlayer` modal. **Primary mobile risk:** `isMobile` starts `null`, so the ternary renders **Desktop first** and swaps to Mobile after viewport resolution → wrong-layout flash + duplicate media load (see §9/§10). |
| Hero desktop media | [sections/Hero/Client/Desktop.tsx](sections/Hero/Client/Desktop.tsx) | `useScroll` + `useMaskImage({divisions:24})` mask + parallax `y`; autoplay video; uses `useMountedReducedMotion`. |
| Hero mobile media | [sections/Hero/Client/Mobile.tsx](sections/Hero/Client/Mobile.tsx) | Mobile video; uses raw `useReducedMotion()` (SSR-null) — a *related but secondary* reduced-motion hydration concern (the primary mobile risk is the swap above). |
| Hero editorial/motion content | [components/Client/HeroOpeningMotion.tsx](components/Client/HeroOpeningMotion.tsx) | Marquee, `OutlineTypographyLayer` "ŞİFA", masked-line H1, `HandwritingMark`, CTAs; variant-driven. |
| Introduction section | [sections/Introduction/Server.tsx](sections/Introduction/Server.tsx) | `TypographyStage` + `ScrollRevealText` + `EditorialSectionTitle` + `ResponsiveImage`; `bg-[#2B3530]`; D9 spacing already applied. |
| Introduction wrapper | [sections/Introduction/index.tsx](sections/Introduction/index.tsx) | Section export. |
| Homepage boundary | [app/page.tsx](app/page.tsx) | Order: `<Hero />` → `<Introduction />` (**no `SectionSeam` between them**; first seam is Introduction→WellnessSanctuary). |
| Shared media/motion utils (reference only) | [components/Client/ResponsiveMarquee.tsx](components/Client/ResponsiveMarquee.tsx), [hooks/useMaskImage.ts](hooks/useMaskImage.ts), [hooks/useMountedReducedMotion.ts](hooks/useMountedReducedMotion.ts), [components/Client/ResponsiveImage.tsx](components/Client/ResponsiveImage.tsx), [utils/motion/tokens.ts](utils/motion/tokens.ts) | Shared — touch only if strictly necessary and Wave-1-local; changes here have blast radius and need extra risk review. |
| Marquee engine (risk/reference only) | [components/Client/Marquee.tsx](components/Client/Marquee.tsx) | Continuous marquee driver: runs `useAnimationFrame` **unconditionally** (no reduced-motion gate). Reference for the static/disabled-marquee reduced-motion requirement (§9). Not an authorization to edit. |
| Parallax engine (risk/reference only) | [components/Client/ParallaxContainer.tsx](components/Client/ParallaxContainer.tsx) | Scroll `useTransform` translate with **no reduced-motion gate**; reached via Introduction's `ResponsiveImage parallaxAmount={8}`. Reference for the disabled-Introduction-parallax requirement (§9). Not an authorization to edit. |
| Viewport provider (risk/reference only) | [app/providers.tsx](app/providers.tsx) | `WindowSizeProvider`: `isMobile` initializes `null`, set post-mount in `useEffect`. Root cause of the desktop→mobile swap / wrong-layout flash. Not an authorization to edit. |
| Root layout (risk/reference only) | [app/layout.tsx](app/layout.tsx) | Hosts `MotionConfig reducedMotion="user"` + provider tree that governs reduced-motion + `useIsMobile` behavior. Reference for reduced-motion/hydration reasoning. Not an authorization to edit. |

**Key architectural facts that shape the plan:**
1. Hero and Introduction **already share `#2b3530`** → tonal continuity for the bridge exists; the bridge is compositional, not a transition effect.
2. There is **no pinned/animated section** between Hero and Introduction — good; the plan preserves that.
3. The heaviest scroll-linked work is the **24-division mask + parallax** in Desktop.tsx (Phase 11's "24-band mask workload" / "scroll-linked motion").
4. **Primary mobile risk is the viewport-driven desktop/mobile swap**, not the reduced-motion hook: `useIsMobile()` starts `null` and the Hero client ternary renders Desktop first, then swaps to Mobile once the viewport resolves — causing wrong-layout flash and duplicate media loading. Mobile's raw `useReducedMotion()` is a *related but separate* reduced-motion hydration concern.

## 5. Technical Strategy

- **Reuse existing architecture** (Next.js App Router + Motion). No new framework or effect system.
- **No new dependency.** No `package.json`/lockfile changes.
- **No GSAP. No 3D** (Three.js / R3F / drei / Spline).
- **Reduce or stabilize motion where necessary** — the lever is *subtraction*, not addition (e.g. calmer mask, calmer parallax, fewer competing simultaneous motions during the opening).
- **Avoid stacking new scroll effects** — no new `useScroll`/global scroll listener/`MotionValue` unless strictly required and justified.
- **Preserve a static final-state composition** — the opening must read as authored even with zero motion.
- **Treat motion as optional enhancement only** — Opening Breath is delivered by composition, spacing, hierarchy, and image/crop discipline; motion merely softens it.

This directly executes Phase 11: *achieve Opening Breath by reducing/stabilizing/simplifying the existing motion & media load, not by adding an effect chain.*

## 6. Hero Plan

Goal: make the Hero read as an authored editorial opening (within the R1 20–30% budget) **without** adding heavy effects.

- **Hierarchy:** keep the single `<h1>` ("Beden, zihin / ve enerji, / tek bütün.") as the primary anchor; keep kicker ("Bütünsel Şifa & Eğitim Akademisi") and supporting paragraph subordinate; ensure the CTA cluster reads tertiary. Refine spacing/scale relationships rather than adding elements.
- **Typography:** preserve serif display voice; tune measure, tracking, and line-height for editorial gravity (avoid fashion-editorial / luxury-resort serif drift per Phase 10 watchlist). No new type systems.
- **Desktop composition:** strengthen asymmetry and negative-space intent already present in `HeroOpeningMotion` (marquee top / editorial block bottom); make whitespace read as *breathing structure*, not emptiness. Composition-level spacing only.
- **Mobile composition:** independently composed (see §10); protect first-viewport clarity and readable type; do not let media dominate.
- **Media / crop strategy:** retain existing video/poster (`elementismp4.mp4` desktop, `elementis-mmp4.mp4` mobile, `elementis-cover-mjpg.png` poster) if crop/scrim keep it non-generic (see §11); the scrim in `Server.tsx` supports contrast.
- **Motion simplification / stabilization:** consider calming the 24-division mask and 25% parallax so the opening "settles" rather than performs; keep it breath-like. No scrub-heavy behavior.
- **Reduced-motion fallback:** final authored composition must be fully visible with motion collapsed (Desktop already gates `maskImage`/`y` on `reduceMotion`; ensure any refinement keeps that).
- **Overflow & hydration safeguards:** preserve `overflow-hidden`/`overflow-clip` wrappers; keep transforms from causing horizontal overflow; keep reduced-motion mounting hydration-safe (see §9).

## 7. Hero-to-Introduction Bridge Plan

Plan the bridge as a **compositional handoff**, matching the accepted proof ("continuity of attention", "the opening is unfolding") — not an effect.

- **Same-color / tonal continuity:** exploit the existing shared `#2b3530` between Hero and Introduction; keep the seam invisible so Introduction reads as a continuation, not a new block.
- **No pinned section.** Do not introduce sticky/pinned scroll pinning.
- **No 3D. No GSAP showcase.**
- **No new global scroll listener / no new `MotionValue`** for the bridge.
- **No theatrical transition** — at most a restrained existing-Motion reveal on Introduction's first elements; the handoff should be felt, not noticed.
- **Avoid z-index and pointer-event conflicts:** note Hero wrapper is `pointer-events-none` with a `pointer-events-auto` CTA row and a full-height play button; any bridge spacing must not trap clicks or overlap the Introduction. Keep stacking contexts simple.
- **Readable as a static composition:** with motion off, the Hero→Introduction boundary must still look like one deliberate editorial descent (spacing/rhythm only).

The likely Phase 13 surface is **boundary spacing/continuity** in `HeroOpeningMotion` (bottom padding), `sections/Introduction/Server.tsx` (top padding — already tuned in D9), and confirming `app/page.tsx` keeps no seam between them.

## 8. Introduction Plan

Plan Introduction as the **first inquiry** (Merak), consistent with the accepted "editorial inquiry panel" direction.

- **Editorial grid stabilization (the current grid is NOT stable — do not preserve as-is):** `sections/Introduction/Server.tsx` declares two explicit columns (`md:grid-cols-[1fr_1.9fr]`) while children start at `md:col-start-2` and `md:col-span-2`, which reaches into an **implicit third track**. Phase 13 planning must therefore **stabilize the layout with an explicit responsive grid definition (explicit column count or `grid-template-areas` / equivalent)** so column placement is fully defined — not merely "keep the grid unchanged." This is a layout-correctness requirement, not a re-architecture license.
- **Explicit responsive layout:** ensure desktop asymmetry and mobile single-column are both explicitly composed against a defined grid (no reliance on implicit tracks, no accidental reflow).
- **Real semantic heading required (`EditorialSectionTitle` is NOT a heading):** [components/Server/EditorialSectionTitle.tsx](components/Server/EditorialSectionTitle.tsx) renders a `<div>` with `<span>`s, so "Tanışma" is not a semantic heading. Phase 13 must give Introduction a **genuine subordinate heading (normally `h2`)** while preserving the single Hero `h1`. (Requirement only — no implementation code prescribed here; carried as a Phase 13 verification criterion in §16.)
- **Image / crop treatment:** `Introduction.png` via `ResponsiveImage`; audit crop for resort/stock drift (see §11), continue Hero's world rather than restarting it.
- **No resort drift / no generic text block:** preserve the `TypographyStage` manifesto + `ScrollRevealText` structure so it reads as an essay opening, not a plain copy block.
- **Mobile reading order:** verify source order yields image → title → manifesto → body in a deliberate vertical rhythm; no cramped image/text.
- **Image loading & layout-shift safeguards:** confirm intrinsic dimensions / `sizes` so the image reserves space (avoid CLS); keep `max-md:aspect-[1.18]` behavior stable.

## 9. Motion / Reduced-Motion Plan

- **Motion remains default** (per R3); no alternative motion engine. **Motion is an optional enhancement, not a structural dependency** — the opening must be fully understandable with all motion disabled.
- **Opening Breath must remain fully understandable as a static final composition** — with motion off, Hero + bridge + Introduction still read as one authored editorial opening. This is the acceptance floor.
- **Reduced-motion must show the final authored composition** — all content visible, no hidden/off-screen/near-zero-opacity final states.
- **Static or disabled marquee under reduced motion** — the marquee ([components/Client/Marquee.tsx](components/Client/Marquee.tsx) / `ResponsiveMarquee` in `HeroOpeningMotion`) runs `useAnimationFrame` unconditionally today. Under reduced motion the marquee must render **static (or fully disabled), not continuously scrolling**; its `useAnimationFrame` loop must be explicitly gated.
- **No delayed Hero opacity sequence under reduced motion** — `HeroOpeningMotion`'s `fadeUp`/`maskLine` variants (staggered `delay`s; `maskLine` hidden `y:115%`; outline "ŞİFA" fade) must collapse to their **shown** state immediately, with no delayed reveal that leaves content hidden. Opacity/mask timing must be explicitly handled for reduced motion (not merely inherited).
- **Explicitly disabled Introduction parallax under reduced motion** — Introduction's image parallax (`ResponsiveImage parallaxAmount={8}` → [components/Client/ParallaxContainer.tsx](components/Client/ParallaxContainer.tsx), which applies a scroll transform with **no reduced-motion gate**) must be **explicitly disabled** under reduced motion so the image sits in its final static position.
- **No first-frame video movement dependency** — the opening must not depend on video playback/motion to be legible. Autoplay video (Desktop + Mobile) must be safe to pause under reduced motion with the composition still authored (poster/first frame + scrim must carry it).
- **Explicit handling required for the four motion surfaces:** manual parallax (Desktop `y` + `ParallaxContainer`), autoplay video, opacity/mask timing (`HeroOpeningMotion` variants), and `useAnimationFrame` behavior (`Marquee`) each need **explicit reduced-motion handling** — none may be left to implicit inheritance.
- **Hydration-safe reduced-motion handling (separate from the mobile swap risk in §10):** Desktop uses `useMountedReducedMotion`; Mobile uses raw `useReducedMotion()` (SSR-null → possible first-paint mismatch). Phase 13 may align Mobile to the mounted-safe hook *if* risk review confirms it is Wave-1-local and low-risk. Treat this as a reduced-motion hydration concern **distinct from** the desktop/mobile swap wrong-layout flash.
- **Avoid adding new MotionValues unless absolutely necessary** — prefer removing/among existing ones.
- **Avoid scrub-heavy effects** — no new scroll-scrubbed timelines; if the 24-division mask is calmed, it should reduce scrub load, not increase it.

## 10. Mobile Plan

- **Independent mobile composition** — re-authored for vertical reading, not a scaled desktop.
- **No squeezed desktop** — verify mobile Hero/Introduction are composed for the small screen.
- **Width checks: 320 / 375 / 430** — confirm no overflow, no fragile wrapping at each.
- **Tablet check: 768 × 1024** — validate the tablet breakpoint alongside mobile and desktop (768 is the `md` boundary where `useIsMobile` flips and the Introduction grid switches to `md:grid-cols`); confirm layout, hierarchy, and no overflow at tablet.
- **Short-height checks** — verify `min-h-[100svh]` opening and CTA cluster behave on short viewports (e.g. ~640–700px tall).
- **Readable line breaks** — H1 and supporting copy must not break awkwardly (Phase 10 mobile watchlist).
- **Safe supporting text size** — supporting/kicker copy must remain legible, not tiny/faint.
- **No first-viewport media domination** — media supports type; type keeps authority.
- **Viewport-driven desktop/mobile swap is the primary mobile risk** — because `useIsMobile()` starts `null` ([app/providers.tsx](app/providers.tsx)), the Hero client ternary renders **Desktop first, then swaps to Mobile** once the viewport resolves. Phase 13 must verify this does **not** cause a wrong-layout flash or **duplicate media loading** (both desktop `elementismp4.mp4` and mobile `elementis-mmp4.mp4` fetched). This is the named hydration-sensitive surface; treat mobile's raw `useReducedMotion()` (§9) as a separate, secondary concern.

## 11. Asset / Image Plan

- **Audit Hero video/poster continuity** — confirm `elementismp4.mp4` / `elementis-mmp4.mp4` / `elementis-cover-mjpg.png` present a coherent, non-generic opening under the current scrim. (For Hero media, crop/scrim reuse over replacement is reasonable to protect LCP, subject to the drift audit.)
- **Introduction image (`Introduction.png`) is technically viable but visually resort-oriented** — the plan must **not** state or imply that retaining it is preferred by default. It reads toward stock-wellness/resort and is a live drift risk (Phase 10 watchlist).
- **Introduction image retention is CONDITIONAL on explicit creative acceptance** — Agent 01 must explicitly accept the current image as on-direction; absent that acceptance, retention is not assumed.
- **If replacement is required → separate asset approval + license/provenance clearance** — no silent asset swap in Phase 13; any new asset needs explicit approval and documented license/provenance (R3 IP rules).
- **Accurate Next/Image `sizes` strategy required for the Introduction image** — plan an accurate `sizes` (matching the `md:grid-cols-[1fr_1.9fr]` / mobile-full layout) so the browser does not fetch an oversized source; avoid LCP waste and oversized downloads. Keep intrinsic dimensions / `max-md:aspect-[1.18]` to reserve space (CLS).
- **No AI asset as final production asset without approval** — AI output stays proof-only (R3 §10).
- **Preserve performance / LCP** — the Hero media is the likely LCP element; any change must not regress load; keep poster + `object-cover`.

## 12. Accessibility Plan

- **One H1 preserved** — Hero keeps the single `<h1>`; Introduction uses subordinate heading semantics.
- **Meaningful Introduction heading** — retain a real, labelled heading for the section.
- **Contrast verification over media** — verify text-over-video contrast (scrim gradient in `Server.tsx`) meets AA at desktop + mobile.
- **CTA focus order** — "Ön Görüşme" then "Programları İncele" logical order; verify tab sequence with the full-height play button.
- **Video button accessibility** — the `aria-label="Tanıtım filmini oynat"` play affordance remains reachable and labelled; keep the video `aria-hidden`.
- **Focus rings preserved** — keep existing `focus-visible:ring-*` styles on CTAs and play buttons.
- **Reduced-motion parity** — reduced-motion users get the same authored composition (see §9).
- **Keyboard / screen-reader sanity checks** — tab through Hero → Introduction; confirm reading order and no keyboard trap in the play button overlay.

## 13. Performance / Runtime Plan

- **No new dependency.**
- **No additional heavy scroll system** — reuse/reduce existing `useScroll`; no new global listeners.
- **Avoid stacking filters / masks / parallax** — do not add to the existing mask+parallax; prefer calming it.
- **Image `sizes` / loading strategy** — verify Hero media priority and Introduction image `sizes`/lazy behavior to protect LCP and avoid CLS.
- **CLS / LCP guardrails** — reserve media space; keep the LCP element stable.
- **Hydration & overflow checks** — 0 hydration errors; `overflowX = 0` at all widths.
- **Build / lint / typecheck / browser verification later** — full gate in Phase 13 (see §16), not now.

## 14. Allowed Changes for Future Phase 13

Narrow categories only — **listed, not authorized** (authorization is a separate Phase 13 step):

- Hero composition refinements (hierarchy, spacing, whitespace, typographic scale/measure).
- Hero media/crop refinements (crop, scrim, object-position — reusing existing assets).
- Reduced-motion-safe motion simplification, including **explicit reduced-motion gating of the marquee (`useAnimationFrame`), the Introduction parallax (`ParallaxContainer`), and Hero opacity/mask timing**, plus calming/stabilizing the existing mask/parallax; align the mobile reduced-motion hook if risk-reviewed.
- Mobile swap stabilization (address the Desktop→Mobile wrong-layout flash / duplicate-media-load without a global redesign; provider-behavior change only if narrowly risk-reviewed).
- Introduction layout stabilization + semantics: **explicit responsive grid definition (explicit columns or `grid-template-areas`/equivalent — not the current implicit third track)** and a **genuine subordinate heading (normally `h2`)**, plus image treatment, accurate `sizes`, and mobile reading order.
- Boundary spacing / continuity refinements (Hero→Introduction handoff via spacing/tonal continuity; no seam, no pinning).

Each, if later authorized, must stay within the R1 Hero/Introduction 20–30% budgets and remain reversible.

## 15. Forbidden Changes

Explicitly forbidden in this plan and in any future Phase 13 under this plan:

- Innovation edits (any).
- SignatureTypeScene edits (any).
- Footer edits (any).
- Form edits (any).
- Backend / Supabase / actions edits.
- SEO edits (robots/sitemap/metadata/canonical).
- Package / config / dependency changes.
- GSAP / Three.js / Spline / R3F / drei (adding any).
- AI production assets (AI stays proof-only).
- Clone / tutorial-derived implementation.
- Global motion redesign / new global scroll or effect layer.
- `git add .` (only explicit, path-scoped staging).

## 16. Verification Plan for Phase 13

Required after any future authorized implementation, before/at commit:

- **Git diff scope** — only Wave 1 files changed; no protected/excluded files; `git diff --check` clean.
- **Lint** — `npm.cmd run lint` (0 errors).
- **Typecheck** — `npx.cmd tsc --noEmit` (exit 0).
- **Build** — `npm.cmd run build` (all pages compile).
- **Desktop screenshot / review** — authored opening vs accepted proof; no dev/error/issue badges.
- **Tablet screenshot / review (768 × 1024)** — layout, hierarchy, grid switch, and no overflow at the `md` boundary.
- **Mobile screenshot / review** — independently composed; **320 / 375 / 430** widths; no squeeze.
- **Reduced-motion check (explicit, per surface)** — final composition fully visible and authored with motion off; **marquee static/disabled** (no `useAnimationFrame` scroll); **Introduction parallax disabled** (image in final static position); **no delayed Hero opacity/mask sequence** (content shown, not hidden); **no dependence on video movement** for legibility; Introduction opacity parity preserved.
- **Mobile swap check** — no wrong-layout flash from the Desktop→Mobile swap; **no duplicate media loading** (only the appropriate video source fetched).
- **Hydration console check** — 0 hydration errors (desktop + tablet + mobile), incl. `useIsMobile` swap path and mobile reduced-motion path.
- **Overflow check** — `overflowX = 0` at all target widths (320/375/430/768/desktop).
- **Semantic heading check** — Introduction exposes a genuine subordinate heading (normally `h2`); exactly one Hero `h1` remains; `EditorialSectionTitle` is not counted as the heading.
- **Grid stabilization check** — Introduction uses an explicit responsive grid (no reliance on the implicit third track); column placement fully defined.
- **Introduction `sizes` check** — image `sizes` is accurate for the layout; no oversized download; no LCP/CLS regression.
- **Basic a11y / focus check** — single H1 + Introduction h2, focus order, focus rings, contrast over media, play-button label.
- **Performance sanity check** — no LCP/CLS regression; no new heavy scroll work.
- **Protected-area untouched check** — Innovation, SignatureTypeScene, Footer, Form, SEO, backend, palette identity unchanged; `golden-master` intact.

## 17. Rollback Plan

- **Allowed rollback to the pre-Phase-13 commit** (current HEAD family) if implementation regresses — revert the isolated Wave 1 commit(s) only.
- **No `golden-master` movement** — tag stays at `9f495cf0d76a7785345cc09396d8781e538a8e20`.
- **No tag movement** of any kind.
- **Isolated commit only** — each Phase 13 change is a single-purpose, path-scoped commit (no bundling).
- **Known excluded file remains untouched** — `implementation_footer_antigravity.md` stays unstaged and unmodified throughout.

## 18. Phase 12 Acceptance Criteria

Phase 12 is acceptable only if:

- It is **plan-only** (no code, no edits, no dependency changes). ✅
- It stays within **Wave 1** (Hero, bridge, Introduction). ✅
- It **incorporates the Phase 11 watchlist** (all 8 items mapped across §6–§13). ✅
- It **avoids new effects / dependencies** (no GSAP/3D; reduce-or-stabilize strategy). ✅
- It **protects mobile / reduced-motion / performance / a11y** (§9–§13). ✅
- It **defines narrow Phase 13 boundaries** (§14 allowed / §15 forbidden). ✅
- It **does not authorize implementation** (Phase 13 gate explicit). ✅

**Phase 11 watchlist → plan-section mapping:** reduced-motion interpretation → §6/§9; bridge-as-effect → §7; mobile typography fragility → §6/§8/§10; whitespace implementation → §6/§8; image/crop asset risk → §11; performance/hydration → §9/§13; accessibility → §12; scope creep → §3/§15.

## 19. Final Line

P12 READY — Wave 1 implementation plan prepared for Agent 02 read-only verification
