# 5% Diff — D1 · Global Film Grain

> Spec only. **No implementation.** This document follows the 5% Diff contract in
> `awwwards-loop/implementation.md` (§20.1). It proposes one isolated, reversible,
> measurable refinement to **one dimension of the whole site** (atmosphere), and nothing else.
> Nothing in this file changes source, CSS, app, layout, components, palette, typography,
> motion, storytelling, or Innovation.

---

## 1. DIFF
`global_grain_atmosphere`

## 2. DIMENSION
`atmosphere`

## 3. CHANGE
Introduce a single, whisper-faint, monochrome, static film-grain layer over the entire site so the page gains print-like tactility without altering one pixel of layout, color, type, or content.

## 4. RATIONALE
- **Atmosphere System (§12):** Atmosphere is the most under-used lever at the 84-band and the cheapest credible "premium" jump. §12.2 names grain as *"usually the highest-impact, lowest-risk single change,"* giving the page *"the tactility of print (Cereal/Kinfolk)."* This diff is the literal first move of the Atmosphere Bible.
- **90/10 Doctrine (§2):** Preserves 100% of the existing structure, copy, palette, and rhythm; spends effort only on the felt finishing layer. Grain adds *air*, not features — exactly the 10% that separates "clean" from "considered."
- **Blind Premium Test (§22.3 / §23.3):** The success definition is that users perceive *more premium / more considered / calmer* yet **cannot name what changed.** A 3–6% monochrome static grain is the canonical "felt, not seen" change — it is engineered to pass this test.
- **Golden Master screenshot baseline:** The committed `awwwards-loop/golden-master/*.png` set (desktop + mobile, captured at the frozen baseline `9f495cf`) is the immutable "before." Every after-state for D1 is diffed against these exact frames, making the refinement reviewable and reversible.
- **D1 = lowest-risk proof-of-lift:** Grain is global, visual-only, non-layout, instantly toggleable, and carries no motion or palette risk. It is the safest possible first diff to validate the whole 84→92 pipeline (propose → review → implement-behind-toggle → measure → decide) before any higher-risk diff is attempted.

## 5. BEFORE
The committed Golden Master visual baseline (frozen code commit `9f495cf`):

**Desktop (1366 × 900):**
- `awwwards-loop/golden-master/hero.png`
- `awwwards-loop/golden-master/intro.png`
- `awwwards-loop/golden-master/wellness.png`
- `awwwards-loop/golden-master/innovation.png`
- `awwwards-loop/golden-master/story.png`
- `awwwards-loop/golden-master/footer.png`

**Mobile (375 × 812):**
- `awwwards-loop/golden-master/hero-mobile.png`
- `awwwards-loop/golden-master/intro-mobile.png`
- `awwwards-loop/golden-master/wellness-mobile.png`
- `awwwards-loop/golden-master/innovation-mobile.png`
- `awwwards-loop/golden-master/story-mobile.png`
- `awwwards-loop/golden-master/footer-mobile.png`

Observed "before" character: clean, tasteful, flat — slightly clinical, no tactile "air."

## 6. AFTER
Intended **perceptual** result only (no layout/measurement change):
- Slightly more **tactile** — the surface reads like fine paper/film rather than flat digital.
- Slightly more **editorial** — closer to the Cereal/Kinfolk/Monocle print feeling.
- Slightly less **clinical** — depth and warmth of material without any new color or element.
- Still fully **deniable** — within the §12.3 guardrail: turning it *off* should make the page feel a touch flat; turning it *on* must never read as an "effect."
- Should be **noticed only when toggled off.** If a returning user can point to "grain," the diff has failed (§1.1).

## 7. FREEZE TEST
Why this passes the §3.1 Freeze Test and violates no frozen element:
- **Color palette:** No new hue; grain is monochrome and near-transparent (3–6%). It modulates perceived *texture*, not the green/beige identity. Frozen palette intact (§3.2).
- **Typography:** No font, size, scale, tracking, or leading touched. Grain sits above as a non-interactive wash; it must not reduce legibility (see guardrails).
- **Layout:** A fixed/root overlay with no layout participation — zero reflow, zero measurement change.
- **Storytelling:** No copy, section, or narrative change.
- **MaskText:** The reveal grammar and timing are untouched; grain neither animates with nor alters MaskText.
- **Innovation Protection Clause:** No layout, concept, visual, interaction, or storytelling change to Innovation. A global, content-agnostic texture passing over a section is not a redesign of it — Innovation's structure, cards, scroll stage, and cursor are byte-for-byte unchanged.
- **Section order / navigation / content:** Unchanged. Grain adds nothing to the DOM flow, nav, or routes.

**Verdict:** Felt, not seen → "this is exactly the work" (§3.1). Allowed as a diff.

## 8. IMPLEMENTATION GUARDRAILS FOR LATER
> Future handoff to Agent 03 (Codex). **Not implementation.** These are the hard bounds the eventual build must obey.
- Fixed-viewport overlay (or equivalent single root-level overlay), one element only.
- `pointer-events: none` — never intercepts input.
- **No layout participation** — must not affect flow, scroll height, or any element's box.
- **Static by default** — no animation, no drift.
- **Static under `prefers-reduced-motion`** — and since static-by-default, this is automatically satisfied; verify regardless.
- Target opacity range: **3–6%** (start at the low end; raise only if review proves it imperceptible).
- **Monochrome only** — no chromatic noise.
- **No visible patterning** — fine, even, non-tiling-artifact texture; no repeating motif.
- **No visible effect** — must survive the deniability guardrail (§12.3).
- **No full-screen animation** unless explicitly approved in a later, separate diff.
- **z-index below** the navigation, sidebar, and skip-link — grain never overlays interactive chrome.
- **Must not reduce text legibility** — AA contrast preserved everywhere (§16.4).
- **Must not alter page measurements** — no CLS, no scroll-height delta.
- CSS-only is preferred; **no new asset required** unless implementation proves CSS-only grain is insufficient (then raise a follow-up asset diff, do not improvise).
- **No image generation** — D1 requires no generated or AI-authored image of any kind; if CSS-only grain ever proves insufficient, that triggers a separate, explicitly-approved asset diff, never improvised image generation here.
- **No Golden Master screenshot regeneration** — the existing committed `awwwards-loop/golden-master/*.png` frames are the immutable "before"; D1 must not regenerate, overwrite, or alter them. New "after" captures (if taken at implementation time) are written elsewhere and never replace the Golden Master baseline.

## 9. TOGGLE
Future toggle strategy (naming suggestions only — **no code here**):
- A **single on/off switch** controlling the entire grain layer.
- **Easy rollback** — flipping the switch fully removes the visual with no side effects.
- **D1 must be removable independently** of any future diff.
- Suggested attribute switch: `data-d1-grain="on"` (or equivalent) on a root element.
- Suggested CSS variable for tuning: `--d1-grain-opacity` (so opacity is adjustable without structural change).
- Off-state must return the page to a pixel match with the Golden Master baseline.

## 10. MEASUREMENT
How D1 will be judged when later implemented:
- **Visual diff vs. Golden Master** screenshots — all six sections, **desktop and mobile**.
- **Normal and reduced-motion** comparison (capture reduced-motion frames at implementation time if not already).
- **lint / build / typecheck** all green after implementation.
- **Pointer-event sanity** — overlay never blocks hover, click, focus, or scroll.
- **z-index sanity** — nav, sidebar, skip-link, and cursor remain above the grain.
- **No CLS / LCP regression** — overlay must not delay LCP or shift layout (§16.3 budgets are gates).
- **Blind Premium Test note:** *"Candidate feels more premium / tactile / editorial, but the user cannot name the change."* Pass = preference + inability to locate; fail = user names "grain."

## 11. ROLLBACK
- **Disable the toggle** (`data-d1-grain="off"` or equivalent) → instant visual revert.
- **Revert the D1 commit** → complete removal.
- **No dependency on other diffs** — D1 stands alone.
- **No source-architecture dependency** — removing it leaves the codebase exactly at the pre-D1 state; the Golden Master remains the reference.

## 12. RISK ASSESSMENT
| Risk | Description | Mitigation |
|---|---|---|
| **Visual over-noise** | Grain too strong reads as an "effect," breaking deniability. | Start at 3% opacity; raise only on review; enforce §12.3 deniability guardrail; reject if nameable. |
| **Contrast / legibility** | Texture over text could lower readability/AA contrast. | `pointer-events:none`, low opacity, monochrome, AA re-verified on all text surfaces; abort if any pairing drops below AA. |
| **z-index** | Grain could overlay nav/sidebar/skip-link/cursor. | Hard rule: grain z-index below all interactive chrome; verify focus ring + cursor remain on top. |
| **Performance (if animated)** | Animated grain would burn main thread / battery. | Static by default; no animation in D1; no full-screen animation without separate approval; verify no CLS/LCP regression. |
| **Innovation screenshot perceptual risk** | Grain over Innovation's photography could be misread as touching the protected section. | Grain is global and content-agnostic — no Innovation DOM/layout/interaction change; compare `innovation.png`/`innovation-mobile.png` before/after to confirm only texture differs, structure identical. |

## 13. ACCEPTANCE CRITERIA
D1 may later be implemented **only if all** hold:
- Grain is **felt, not seen**.
- **No user can identify it** as a "grain effect" (Blind Premium Test passes).
- **No source drift** beyond the approved implementation file(s) for this single diff.
- **No layout / typography / color / content** changes.
- **No Innovation** layout / concept / interaction changes.
- **All technical gates pass** — lint, typecheck, build, pointer/z-index sanity, no CLS/LCP regression, reduced-motion parity.

## 14. DECISION
`pending`
