# 5% Diff — D6 · StyledLink Micro-Interaction Timing Tokenization

> Spec only. **No implementation.** Follows the 5% Diff contract in
> `awwwards-loop/implementation.md` (§20.1). One isolated, reversible, measurable
> refinement to **one dimension** (micro-interaction timing) of **one file**
> (`components/Server/StyledLink.tsx`). Nothing else changes. Mirrors the proven
> D4 pattern (replace hardcoded motion literals with existing tokens).

---

## 1. DIFF
`D6 — StyledLink micro-interaction timing tokenization`

## 2. DIMENSION
`Micro-interaction timing / Motion token consistency`
Explicitly **not** layout, **not** typography, **not** color, **not** copy, **not** interaction redesign.

## 3. CHANGE
In `components/Server/StyledLink.tsx`, consume the existing motion tokens for the underline hover transition:
- Replace `duration: 0.4` → `duration.hover` (= 0.22).
- Replace `ease: "circInOut"` → `easing.editorial`.
- Import the existing tokens from `@/utils/motion/tokens` (repo convention, e.g. `import { easing, duration } from "@/utils/motion/tokens";`).
- **Preserve** the underline draw grammar `x: ["-100%", "0%"]` and the base underline structure exactly.
- **No** markup, class, prop, copy, color, layout, or usage-site changes.

## 4. RATIONALE
- `StyledLink` is a homepage-relevant hover underline component (used by Wellness and Story links).
- Its underline timing is **hardcoded** and **slower** than the site's existing hover token family (`duration.hover = 0.22` vs the hardcoded `0.4`).
- `"circInOut"` is a **named string easing outside the local editorial grammar** — every other reveal/interaction uses `easing.editorial` (`[0.24,0.43,0.15,0.97]`), the single-source motion language (`decisions.md` D022).
- The existing tokens already encode the intended motion language; this diff simply makes `StyledLink` consume them.
- This is a **felt-not-seen** micro-polish: the underline draws a touch quicker and on-family, with **no layout or final-frame drift** (the rest state is unchanged; only the hover transition timing/curve change).

## 5. BEFORE
Current state of `components/Server/StyledLink.tsx`:
- Underline hover `MotionConfig` transition uses `duration: 0.4`.
- Underline hover `MotionConfig` transition uses `ease: "circInOut"`.
- Underline animation uses the existing slide/draw behavior (`x: ["-100%", "0%"]`).
- Component is used in homepage-relevant sections (Wellness "Programları Keşfet"; Story "Hikayenin Tamamı" / "Eğitmenlerle Tanış").
- No tokenized duration/easing in this component (literals only).

## 6. AFTER
Intended state:
- StyledLink underline hover uses `duration.hover`.
- StyledLink underline hover uses `easing.editorial`.
- Interaction feels **slightly quicker and more on-family**.
- Final hover end-state remains the **same** (underline fully drawn at `x: 0%`).
- No layout, copy, typography, color, section-order, D1, D4, or D5 change.
- No new interaction concept.

## 7. FREEZE TEST
The following must remain **frozen** (D6 changes none of them):
- Underline grammar and `x: ["-100%", "0%"]` draw
- Base underline structure (the static `h-px` base line + opacity)
- Markup / DOM structure
- Class names / `className` passthrough
- Props / public API of `StyledLink`
- Usage sites (Wellness, Story, and any other callers)
- Copy / content · colors · layout / spacing · typography
- Focus behavior · mobile/touch behavior
- D1 (`app/globals.css` grain) · D4 (`MaskText.tsx`) · D5 (`ScrollRevealText.tsx`)
- Hero · Innovation
- `StyledLinkClient` · `CustomLink` · `DashedLink` · `BorderedButton`
- Golden Master + D1 after-screenshots · public assets · section order

Verdict: timing-only token substitution on one component → felt, not seen → allowed as a diff (§3.1).

## 8. IMPLEMENTATION GUARDRAILS FOR LATER
> Future handoff. **Not implementation.**
- Future implementation may touch **only** `components/Server/StyledLink.tsx`.
- **No token-file edits** (`utils/motion/tokens.ts`).
- **No variant-file edits** (`utils/motion/variants.ts`).
- **No `StyledLinkClient` edits.**
- **No `CustomLink` / `DashedLink` / `BorderedButton` edits.**
- **No Hero edits.**
- **No Innovation edits.**
- **No Footer CTA / Newsletter / Form edits.**
- **No D1 / D4 / D5 edits.**
- **No CSS edits.**
- **No new duration literals** (use `duration.hover`).
- **No new easing literals** (use `easing.editorial`).
- **No new props**, no signature change.
- **No new interaction concept.**
- **No unrelated cleanup** (e.g., do not refactor surrounding markup or the `StyledLinkClient` easing literals — that is a separate, optional diff).
- **No screenshots** unless explicitly requested after implementation.

## 9. MEASUREMENT
How D6 is validated when implemented:
- **Hover review on the Wellness link** ("Programları Keşfet") — underline draws quicker, on-family.
- **Hover review on the Story link** ("Hikayenin Tamamı" / "Eğitmenlerle Tanış").
- **Mobile / touch sanity** — base underline + tap behavior unaffected.
- **Keyboard / focus sanity** — focus behavior unchanged (not expanded by D6).
- **Reduced-motion sanity** — underline transform collapses via the global `MotionConfig reducedMotion="user"` (no new guard).
- **No layout drift** · **no final-frame drift** (rest-state screenshots byte-identical — hover not captured).
- **No typography / copy / color drift.**
- **No D1 / D4 / D5 drift.**
- `git diff --check` clean; `lint` / `typecheck` / `build` pass.

## 10. ROLLBACK
- **One commit revert** of the D6 implementation commit, **or**
- Restore `duration: 0.4` and `ease: "circInOut"` in `components/Server/StyledLink.tsx`.
- No dependency on any other diff; isolated to one file.

## 11. RISK ASSESSMENT
| Risk | Mitigation |
|---|---|
| Hover may feel too fast after `0.4 → 0.22` | `0.22` is the site's existing hover token (used conceptually by the 200ms CSS CTAs); review hover live and confirm it reads premium, not abrupt; revert is one value if it feels rushed. |
| Easing feel changes (symmetric in-out → editorial deceleration) | `easing.editorial` is the site-wide curve; the change unifies feel rather than introducing a foreign one; confirm in hover review. |
| Reduced-motion behavior | Relies on the **existing** global `MotionConfig reducedMotion="user"` (transforms collapse); D6 adds no guard and changes no RM path — re-verify only. |
| Mobile / touch | Should be unaffected (hover is desktop-pointer); **sanity-check** the base underline + tap on mobile. |
| Keyboard / focus | **Do not expand** focus behavior in D6; leave focus states exactly as-is. |
| Final-frame drift | **None expected** — timing/curve only; the underline's rest state and fully-drawn state are unchanged. |
| Layout | **None** — the underline is absolutely positioned (`h-px`); no reflow. |
| Implementation risk | **Low** — mirrors the already-shipped D4 token-substitution pattern (one import + two value swaps). |

## 12. ACCEPTANCE CRITERIA
D6 may later be implemented only if **all** hold:
- Future diff touches **only** `components/Server/StyledLink.tsx`.
- `duration: 0.4` is replaced with `duration.hover`.
- `ease: "circInOut"` is replaced with `easing.editorial`.
- Underline grammar (`x: ["-100%", "0%"]`) unchanged.
- Markup / classes / props / copy / colors / layout unchanged.
- Usage sites unchanged.
- No D1 / D4 / D5 drift.
- No Hero / Innovation drift.
- No token / variant file edits.
- `lint` / `typecheck` / `build` pass.
- **Hover review passes** (quicker, on-family, premium).
- **Rollback is isolated** (one file / one commit).

## 13. DECISION
`pending`
