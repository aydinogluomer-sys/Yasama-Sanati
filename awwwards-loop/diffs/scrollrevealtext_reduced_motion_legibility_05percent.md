# 5% Diff — D5 · ScrollRevealText Reduced-Motion Legibility Fallback

> Spec only. **No implementation.** Follows the 5% Diff contract in
> `awwwards-loop/implementation.md` (§20.1). One isolated, reversible, measurable
> refinement to **one dimension** (accessibility / reduced-motion legibility) of
> **one file** (`components/Client/ScrollRevealText.tsx`). Nothing else changes.

---

## 1. DIFF
`D5 — ScrollRevealText reduced-motion legibility fallback`

## 2. DIMENSION
`Accessibility / Reduced-motion legibility`
Explicitly **not** layout, **not** typography, **not** color, **not** copy, **not** animation redesign.

## 3. CHANGE
In `components/Client/ScrollRevealText.tsx`, add an explicit **reduced-motion fallback**:
- Read `useReducedMotion()` inside the existing client component.
- **Normal-motion behavior remains unchanged** — the scroll-linked word opacity (0.25→1) stays exactly as today.
- **Reduced-motion users render words at full opacity immediately** (opacity 1, no scroll dependence).
- Likely implementation surface: a `useReducedMotion()` branch that, when reduced motion is preferred, bypasses the per-word scroll-derived opacity and renders static full-opacity words (e.g., the `Word` opacity is forced to `1` rather than driven by the `useTransform` range).
- **No call-site changes**; the component's public API and usage in Introduction are untouched.

## 4. RATIONALE
- `ScrollRevealText` currently drives word opacity from **0.25 → 1** via `useScroll` + `useTransform` over the range `["start 85%", "start 60%"]`.
- The global `MotionConfig reducedMotion="user"` collapses transform/animation transitions, but it does **not** necessarily force a *scroll-derived MotionValue* (a `useTransform` of `scrollYProgress`) to full opacity — so a reduced-motion user can still land on text sitting at ~0.25 opacity depending on scroll position.
- At `opacity: 0.25`, `text-[#D1CCBF]` on `bg-[#2B3530]` has **insufficient effective contrast** (full opacity is strong; quarter opacity is not). This is a genuine **legibility / accessibility** gap for reduced-motion users.
- A **local** fallback closes the gap without altering the art direction for normal-motion users — accessibility improvement, zero aesthetic cost.

## 5. BEFORE
Current state of `components/Client/ScrollRevealText.tsx`:
- Used **only** in `sections/Introduction/Server.tsx` (the long Introduction body copy).
- Word-level opacity driven by scroll progress (`useScroll` target the paragraph, `useTransform` per word).
- Initial / low-scroll opacity can be **0.25**.
- **No explicit `useReducedMotion()` branch.**
- Text may remain low-opacity depending on scroll position, including for reduced-motion users.

## 6. AFTER
Intended state:
- **Normal-motion users** keep the existing scroll-linked reveal (0.25→1) exactly.
- **Reduced-motion users** get **full-opacity text immediately** (no scroll dependence, no fade).
- **No** layout, typography, copy, color, section-order, D1, or D4 change.
- **No new animation concept** (the fallback removes motion for RM users; it does not add anything).

## 7. FREEZE TEST
The following must remain **frozen** (D5 changes none of them):
- Introduction copy / text content
- Typography classes (`className` passthrough, font, size, leading, tracking)
- Layout (paragraph flow, `flex flex-wrap`, gaps)
- Colors (`text-[#D1CCBF]`, `bg-[#2B3530]`, all palette values)
- **Scroll range for normal-motion users** (`["start 85%", "start 60%"]`, 0.25→1)
- Word-splitting behavior (`text.split(/\s+/)`, per-word ranges)
- Markup shape — unless an unavoidable minimal change is required to branch (keep it minimal)
- Call site (`sections/Introduction/Server.tsx`)
- D1 (`app/globals.css` grain) · D4 (`components/Server/MaskText.tsx`)
- Innovation · Hero · MaskText
- Golden Master + D1 after-screenshots
- Public assets · section order

Verdict: a reduced-motion-only legibility fallback is **invisible to normal-motion users** and improves a11y → allowed as a diff (§3.1).

## 8. IMPLEMENTATION GUARDRAILS FOR LATER
> Future handoff. **Not implementation.**
- Future implementation may touch **only** `components/Client/ScrollRevealText.tsx`.
- **No call-site edits** (`sections/Introduction/Server.tsx` stays frozen).
- **No CSS edits.**
- **No token edits** (`utils/motion/tokens.ts`).
- **No variant edits** (`utils/motion/variants.ts`).
- **No new props** unless absolutely necessary (prefer an internal `useReducedMotion()` branch over a new prop).
- **No new animation concept** (RM path is *less* motion, never more).
- **No D1 / D4 edits.**
- **No screenshot artifacts** unless explicitly requested after implementation.
- **No unrelated cleanup** (e.g., leave surrounding code, comments, imports as-is except the minimal hook addition).
- **No body-leading / D2 work** inside D5 (separate candidate).

## 9. MEASUREMENT
How D5 is validated when implemented:
- **Normal-motion desktop + mobile review:** Introduction looks **unchanged** (scroll-linked reveal still 0.25→1).
- **Reduced-motion desktop + mobile review:** Introduction body text is **full opacity and legible immediately**, regardless of scroll position.
- **No layout drift** (paragraph wrapping/spacing unchanged).
- **No typography drift** · **no copy drift** · **no color drift.**
- **No D1 / D4 drift** (grain present; MaskText timing unchanged).
- `lint` / `typecheck` / `build` pass.

## 10. ROLLBACK
- **One commit revert** of the D5 implementation commit, **or**
- Remove the local reduced-motion branch and restore the unconditional scroll-linked opacity behavior.
- No dependency on any other diff; isolated to one file.

## 11. RISK ASSESSMENT
| Risk | Mitigation |
|---|---|
| Hydration / client-hook risk | `ScrollRevealText` is already `"use client"`; `useReducedMotion()` is a standard Motion client hook (used elsewhere, e.g. Hero Desktop, SectionSeam). Add it at the top level, not conditionally, to respect hook rules — no SSR/hydration mismatch (initial render is deterministic). |
| Normal-motion regression | Branch must be **gated strictly** on `useReducedMotion() === true`; the `false` path is the existing code unchanged. Verify normal-motion frames are byte-identical to current. |
| RM branch accidentally affecting all users | Confirm the condition only forces opacity for reduced-motion; never alter the default branch. Test both media states explicitly. |
| Visual drift in Introduction | No layout/markup change beyond the opacity source for the RM branch; verify normal-motion Intro is unchanged. |
| Contrast still insufficient if implemented wrong | The fallback target is **opacity: 1** (full strength `#D1CCBF` on `#2B3530`, already AA-strong); verify the RM path actually reaches 1, not an intermediate value. |
| Over-broad CSS / call-site changes | Hard scope: one component file; **no CSS, no call sites, no tokens/variants.** |

## 12. ACCEPTANCE CRITERIA
D5 may later be implemented only if **all** hold:
- Future diff touches **only** `components/Client/ScrollRevealText.tsx`.
- **Normal-motion behavior unchanged** (scroll-linked 0.25→1 intact).
- **Reduced-motion text full opacity immediately** and legible.
- **No layout / typography / copy / color drift.**
- **No D1 / D4 / Innovation / Hero / MaskText drift.**
- `lint` / `typecheck` / `build` pass; `git diff --check` clean.
- **Rollback is isolated** (one file / one commit).

## 13. DECISION
`pending`
