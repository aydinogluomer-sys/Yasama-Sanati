# 5% Diff — D4 · MaskText Timing Unification

> Spec only. **No implementation.** Follows the 5% Diff contract in
> `awwwards-loop/implementation.md` (§20.1). One isolated, reversible, measurable
> refinement to **one dimension** (cadence / motion timing) of **one file**
> (`components/Server/MaskText.tsx`). Nothing else changes.

---

## 1. DIFF
`D4 — MaskText timing unification`

## 2. DIMENSION
`Cadence / Motion timing`
Explicitly **not** typography, **not** layout, **not** copy, **not** color.

## 3. CHANGE
In `components/Server/MaskText.tsx`, replace the three locally hardcoded motion values with the existing shared motion tokens:

| Current (hardcoded) | Future (token) |
|---|---|
| `staggerChildren: 0.1` | `stagger.line` (= 0.08) |
| `duration: 0.8` | `duration.textLine` (= 0.72) |
| `ease: [0.24, 0.43, 0.15, 0.97]` (literal) | `easing.editorial` |

Import `{ easing, duration, stagger }` from `@/utils/motion/tokens` and substitute. **Preserve everything else** — animation shape, variant structure, markup, class names, props, and viewport config.

## 4. RATIONALE
- **Only safe reusable outlier:** `Server/MaskText` is the single line-mask reveal that bypasses the token system. Every other token-clean reveal (`TypographyStage`, `DynamicLineReveal`, `variants.lineReveal`) already sources timing from `utils/motion/tokens.ts`. Unifying this one file completes the single-source-of-truth rule (`decisions.md` D022) without touching anything shared.
- **Easing is identical but duplicated:** the literal `[0.24, 0.43, 0.15, 0.97]` **is** `easing.editorial` — a copy-paste, not a different curve. Substitution is byte-equivalent in feel and removes the duplication.
- **Stagger/duration are slightly slower than canon:** `0.1`/`0.8` vs the canon `stagger.line 0.08` / `duration.textLine 0.72`. Unifying brings the reveal into the shared cadence (and closer to the §9.4 per-line 40–70ms intent) — a small tightening, never a slowdown.
- **Consistency, not redesign:** token substitution makes the signature reveal's *timing* consistent across its call sites while the reveal *grammar* (clip-path mask, y-direction, once) is preserved exactly. This is the §9.4-sanctioned "change timing, never grammar."

## 5. BEFORE
Current state of `components/Server/MaskText.tsx`:
- `staggerChildren: 0.1` (hardcoded)
- `duration: 0.8` (hardcoded)
- `ease: [0.24, 0.43, 0.15, 0.97]` (literal array)
- viewport config: `viewport={{ once: true }}` (no margin)
- component behavior, markup, props, and class passthrough as-is.
- Drives (unchanged by this diff): WellnessSanctuary, ElementisStory, SustainableRetreat (via `ResponsiveMaskTextVariant`) and WellnessSanctuary's direct second block.

## 6. AFTER
Intended state:
- Timing values come from `utils/motion/tokens.ts`:
  - `easing.editorial`
  - `duration.textLine`
  - `stagger.line`
- **No visual grammar change** (same mask reveal, same direction, same once).
- **No markup / class / props change.**
- **No viewport margin change** — `viewport={{ once: true }}` stays exactly as-is; **do not** add `margin: "0px 0px -12% 0px"`.

## 7. FREEZE TEST
The following must remain **frozen** (D4 changes none of them):
- Reveal grammar (line mask, rise direction, stagger concept)
- Clip / mask behavior (`clipPath` insets, `y` values)
- Markup / DOM structure
- Class names / `className` passthrough
- Props / public API of the component
- Viewport config (`once: true`, no margin)
- `once` behavior (no replay)
- Call sites (Wellness, Story, SustainableRetreat) — untouched
- Innovation (and its `MaskTextClient`/`ClipImageCard` path)
- Hero (`HeroOpeningMotion`)
- D1 (`app/globals.css` grain)
- Golden Master + D1 after screenshots
- Colors · typography · content/copy · section order

Verdict: timing-only token substitution → felt, not seen → allowed as a diff (§3.1).

## 8. IMPLEMENTATION GUARDRAILS FOR LATER
> Future handoff. **Not implementation.**
- Future implementation may touch **only** `components/Server/MaskText.tsx`.
- **No call-site edits** (propagation is automatic via the component).
- **No token edits** (`utils/motion/tokens.ts` and `variants.ts` stay frozen).
- **No viewport margin parity** — do not add `margin: "0px 0px -12% 0px"`.
- **No new animation**, no new variant, no new motion concept.
- **No new props**, no signature change.
- **No refactor** beyond the three value substitutions + one token import.
- **No cleanup of unrelated dead code** (e.g., the unused `DynamicLineReveal` is out of scope).
- **No `ScrollRevealText` reduced-motion work** in D4 (separate candidate).
- **No Innovation path changes** (`MaskTextClient`, `ClipImageCard`, Innovation).
- **No screenshots** unless explicitly requested after implementation.

## 9. MEASUREMENT
How D4 is validated when implemented:
- **Final-state screenshots show no layout/pixel drift** — but note motion timing **cannot be proven statically**; identical final frames are the expected, correct result.
- **Live desktop + mobile motion review** required (Wellness, Story, SustainableRetreat) to judge the reveal cadence.
- **Reduced-motion check** required (reveals still collapse to final state via `MotionConfig reducedMotion="user"`).
- **No Innovation structural drift** (Innovation file + `MaskTextClient` untouched).
- **No section layout drift.**
- **No D1 drift** (`app/globals.css` grain unchanged).

## 10. ROLLBACK
- **One commit revert** of the D4 implementation commit, **or**
- Restore the three hardcoded values (`staggerChildren: 0.1`, `duration: 0.8`, literal easing array) in `components/Server/MaskText.tsx`.
- No dependency on any other diff; isolated to one file.

## 11. RISK ASSESSMENT
| Risk | Mitigation |
|---|---|
| Rhythm becomes too mechanical | Keep `easing.editorial` (decelerating settle); Hero/Innovation tempos remain distinct, so the page is not uniformly paced. |
| Reveal too fast | Change is a marginal tighten (0.8→0.72, 0.1→0.08); review live and confirm it still reads calm; values never exceed today's. |
| Static screenshots don't prove motion quality | Mandate live motion review; treat identical final frames as a *pass* (no layout drift), judge cadence in-browser. |
| Reduced-motion regression | RM path is untouched; re-test that reveals collapse to final state under `prefers-reduced-motion`. |
| Accidental Innovation-path edit | Hard scope: only `Server/MaskText.tsx`; `MaskTextClient`/`ClipImageCard`/Innovation explicitly off-limits; verify they stay clean. |
| Token ripple if tokens are edited | **Do not edit tokens** — only consume them; editing `tokens.ts` would ripple to `variants.ts` consumers (out of scope). |
| Viewport trigger drift if margin added | **Do not add** `margin`; preserve `viewport={{ once: true }}` exactly to avoid changing where reveals fire. |

## 12. ACCEPTANCE CRITERIA
D4 may later be implemented only if **all** hold:
- Future diff touches **only** `components/Server/MaskText.tsx`.
- **No visible layout / final-frame drift.**
- Motion feels **slightly more consistent** (one cadence with the rest of the reveal system).
- **No one can identify** the change as a new animation.
- **Innovation untouched** · **D1 untouched** · **tokens untouched.**
- `build` / `lint` / `typecheck` pass; `git diff --check` clean.
- **Rollback is isolated** (one file / one commit).

## 13. DECISION
`pending`
