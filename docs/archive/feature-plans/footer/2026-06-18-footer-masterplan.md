# Yaşama Sanatı Footer — Awwwards-Level Master Plan

## 0. Execution Contract

This document is the implementation contract for the final footer pass. Work is limited to the footer and its footer-only client components. The goal is not “more effects”; the goal is a controlled editorial closing scene with strong typography, atmosphere, rhythm, accessibility, and responsive integrity.

### Non-negotiable outcome

- The footer must feel authored, not assembled from generic columns.
- Every decorative element must have compositional logic.
- Functional text must remain readable at normal viewing distance.
- Motion must reward attention without demanding it.
- Desktop, tablet, and mobile must each look intentionally designed.
- Production build must pass before visual approval.

### Scope

Allowed implementation files:

```txt
sections/Footer/**
components/Client/FooterBackgroundText.tsx
components/Client/FooterNewsletter.tsx
```

Allowed documentation and QA artifacts:

```txt
footer_awwwards_masterplan.md
temporary screenshots outside the repository
```

Forbidden:

```txt
global theme changes
global typography changes
header or hero changes
new runtime dependencies
copied third-party footer implementations
decorative WebGL added only for spectacle
```

## 1. Evidence Review

### 1.1 Reference image sequence

The local `Footer/Footer*.png` sequence documents the design evolution:

- `Footer.png`: broad five-column baseline; clean but generic.
- `Footer2.png`: cardified newsletter; clearer hierarchy but disconnected module.
- `Footer3.png`: editorial numbering and coordinate signature introduced.
- `Footer4.png`: annotated failure state; watermark residue, contact wrapping, newsletter compression, weak card bottom rhythm.
- `Footer5.png`: stacked newsletter form fixes compression; trust note remains too faint.
- `Footer6.png`: lifeline and signature hierarchy improve; watermark becomes too explicit.
- `Footer7.png`: strong balance; still slightly template-like because all columns have similar visual weight.
- `Footer8.png`: best spatial calm; brand mark becomes too small and the closing scene loses some emotional authority.

### 1.2 Current implementation strengths

- Correct 4–5–3 desktop grid.
- Deep green gradient is coherent with the brand.
- Editorial section numbers are established.
- Newsletter card is isolated without becoming a SaaS block.
- Coordinate signature and lifeline provide a distinct visual vocabulary.
- Motion and reduced-motion primitives already exist.

### 1.3 Current implementation risks

- Fixed-height layouts can crop tablet content; footer must use content-driven height.
- Watermark hover motion can turn atmosphere into a gimmick.
- Magnetic ranges can be too large for calm editorial UI.
- Contact details must never wrap at desktop.
- Trust note must not drop below readable contrast.
- Footer-wide entrance motion must respect reduced-motion preference.
- Decorative SVGs must remain outside the accessibility tree.
- Bottom legal row must wrap cleanly instead of shrinking into unreadability.

## 2. Quality Model

The footer is approved only if all gates pass.

### 2.1 Composition gate — 25 points

- 4–5–3 grid feels balanced at 1366 px: 6
- Brand stage has a clear focal hierarchy: 5
- Newsletter is distinct but not detached: 5
- Lifeline and watermark support the composition: 5
- Bottom bar closes the scene deliberately: 4

### 2.2 Typography gate — 20 points

- Brand title has sufficient authority: 5
- Serif/sans contrast is clear: 4
- Microcopy is readable: 5
- Section numbering feels editorial: 3
- Line lengths and wrapping are controlled: 3

### 2.3 Interaction gate — 15 points

- CTA hover/focus is polished: 4
- Social hover/focus is polished: 3
- Navigation interaction remains calm: 3
- Newsletter states are coherent: 3
- Reduced-motion mode removes nonessential transforms: 2

### 2.4 Atmosphere gate — 15 points

- Gradient retains depth without mud: 4
- Noise is perceptual, not visible: 3
- Watermark is discovered on second look: 4
- Accent color is used as punctuation: 4

### 2.5 Responsive gate — 15 points

- Desktop 1366 px: 5
- Tablet 768 px: 5
- Mobile 375 px: 5

### 2.6 Engineering gate — 10 points

- Production build passes: 3
- No TypeScript errors: 2
- No footer-induced console/hydration errors: 2
- Accessibility names and focus states exist: 2
- Only scoped files change: 1

### Approval threshold

```txt
90–100: Awwwards-level candidate
85–89: premium production quality, one iteration required
80–84: visually strong but still template-like
below 80: reject and rework
```

No category may score below 70% of its available points even if the total exceeds 90.

## 3. Phase 1 — Structural Integrity

### Objective

Guarantee that the composition cannot crop, overflow, or collapse before visual polish begins.

### Tasks

- Preserve a 12-column desktop grid.
- Preserve spans `4 / 5 / 3` at `lg`.
- Use content-driven minimum height; never force tablet content into one viewport.
- Keep mobile order: brand, CTA, socials, signature, navigation, newsletter, legal bar.
- Keep email and phone on one line at desktop.
- Give the newsletter column enough internal width for a full-width stacked form.
- Add a stable `site-footer` anchor for QA and back-to-footer targeting.

### Exit criteria

- No `h-screen` constraint at tablet.
- No horizontal overflow at 375, 768, or 1366 px.
- No clipped legal content.
- No contact detail wraps at desktop.

## 4. Phase 2 — Editorial Brand Stage

### Objective

Make the left column the emotional anchor without overpowering the useful navigation.

### Tasks

- Keep brand title around 32–42 px depending on viewport.
- Keep title line-height near 1.1 and tracking restrained.
- Maintain paragraph width around 280 px and line-height near 1.8.
- Maintain vertical rhythm: title → body 24 px; body → CTA 32 px; CTA → socials 32 px; socials → signature 40 px.
- Keep CTA width modest and optically aligned with the copy block.
- Keep social controls at 36 px with visible but quiet borders.
- Use accent only for CTA, section punctuation, and signature emphasis.

### Lifeline rules

- Begin at the star.
- Descend before bending into the brand region.
- Fade before reaching primary navigation.
- Use one-pixel stroke and low opacity.
- Never cross interactive text with visible contrast.
- Hide on tablet/mobile.

### Exit criteria

- Brand title is the first focal point.
- Newsletter is the second focal point.
- Navigation is readable but not visually dominant.
- Lifeline is noticed only after the content.

## 5. Phase 3 — Watermark and Atmosphere

### Objective

Create depth without leaving visible “background text residue.”

### Tasks

- Use an outlined serif watermark only on large screens.
- Keep base stroke opacity between 0.025 and 0.04.
- Apply both standard and WebKit radial masks.
- Keep mouse parallax under ±25 px and vertical motion under ±15 px.
- Disable parallax when reduced motion is requested.
- Remove scale, rotation, glow, and hover color changes from watermark letters.
- Keep watermark noninteractive and outside the accessibility tree.
- Keep grain opacity between 0.01 and 0.018.
- Keep accent glow below 0.032.
- Keep vignette broad enough to avoid muddy corners.

### Exit criteria

- Watermark remains visible on deliberate inspection.
- Watermark never competes with the brand title or section headings.
- No decorative layer captures pointer events.

## 6. Phase 4 — Navigation and Contact Precision

### Objective

Convert generic footer link lists into a precise editorial index.

### Tasks

- Preserve section numbers `01`, `02`, `03`.
- Keep headings serif and links sans.
- Keep link spacing consistent at 14–16 px.
- Limit hover translation to 2 px.
- Dim sibling links only while a real pointer hover exists.
- Add visible focus rings to every anchor.
- Mark contact icons decorative.
- Keep email and phone `whitespace-nowrap`.
- Keep contact icon and baseline optically aligned.

### Exit criteria

- Keyboard focus is always visible.
- Pointer interaction is calm.
- Contact details do not wrap or overflow.

## 7. Phase 5 — Newsletter Invitation Module

### Objective

Make the newsletter feel like a private editorial invitation rather than a generic form card.

### Card rules

- One border only.
- Radius 20 px.
- Background near 3.5% warm white.
- Border near 8.5% warm white.
- Soft inset highlight and broad low-opacity shadow.
- No glassmorphism blur strong enough to look frosted.

### Type and spacing

- `04` → title: 8 px.
- Title → description: 16–18 px.
- Description → form: 22–24 px.
- Input → button: 12 px.
- Form → trust note: 16 px.

### Input rules

- Accessible label.
- Height 44–46 px.
- Warm dark-green fill, not pure black.
- Placeholder opacity at least 0.54.
- Accent focus ring and border.

### Button rules

- Height 44–48 px.
- Accent background with dark ink text.
- Uppercase restrained tracking.
- Maximum hover movement 1 px.
- Arrow movement maximum 6 px.
- Disabled and loading states remain legible.

### Trust note rules

- Minimum 10.5 px.
- Minimum functional opacity 0.60 on this background.
- Lock icon uses muted accent.
- Copy may wrap to two or three readable lines.

### Exit criteria

- Placeholder is readable in screenshots.
- Trust note is readable at 100% scale.
- Card has no doubled border.
- Form never compresses horizontally.

## 8. Phase 6 — Bottom Closing Bar

### Objective

End the page with a quiet but memorable signature.

### Tasks

- Use a horizontal gradient hairline instead of a hard border.
- Keep copyright left, legal index center, back-to-top and brand signature right.
- Use accent dots as separators.
- Raise legal text opacity enough for real reading.
- Add focus states to legal links and back-to-top control.
- Keep right-side signature star static when reduced motion is enabled.
- Allow mobile legal links to wrap with generous row gaps.

### Exit criteria

- Bottom row is readable at 1366 px.
- Mobile wrapping looks designed, not accidental.
- Back-to-top interaction works and is keyboard accessible.

## 9. Phase 7 — Accessibility and Motion Audit

### Required checks

- Every interactive element has an accessible name.
- Newsletter email input has an explicit accessible label.
- All decorative SVGs use `aria-hidden="true"`.
- Decorative wrappers use `pointer-events-none`.
- Focus rings remain visible against the green background.
- Reduced-motion disables magnetic movement, transforms, spins, and nonessential entrance effects.
- Loading indicator does not rely solely on animation.
- Functional text does not use decorative opacity levels.

## 10. Phase 8 — Verification Loop

### Build gate

Run:

```bash
npm run build
```

Reject the iteration on any TypeScript, compilation, hydration, or footer lint failure.

### Responsive browser gate

Inspect:

```txt
1366 × 900 desktop
768 × 1024 tablet
375 × 812 mobile
```

For each viewport verify:

- horizontal overflow
- clipped content
- contact wrapping
- newsletter compression
- watermark collision
- lifeline collision
- legal wrapping
- focus visibility
- content order

### Interaction gate

Verify:

- CTA hover and keyboard focus
- each social link focus
- navigation link focus
- email input focus
- submit loading and success state
- back-to-top behavior
- reduced-motion presentation

### Iteration rule

1. Score the current result against Section 2.
2. List every failed criterion with evidence.
3. Change only the smallest footer-scoped implementation necessary.
4. Re-run production build.
5. Re-run all three viewport checks.
6. Continue until score is at least 90 and no category is below 70%.

## 11. Repository Decision

No external repository is required for this pass.

Rationale:

- Motion primitives already exist through `motion`.
- Smooth scrolling infrastructure already exists.
- The footer does not need a rendering engine or a component library.
- External footer repositories would introduce visual imitation, maintenance cost, and dependency risk.
- The highest-value work is proportion, contrast, rhythm, motion restraint, and QA—not additional tooling.

If a future iteration proves a real technical gap, the dependency must satisfy all of these conditions before download:

- solves a measured failure in this plan;
- has an active license compatible with the project;
- adds less implementation complexity than a footer-local solution;
- does not require global theme changes;
- survives production build and reduced-motion requirements.

## 12. Final Definition of Done

- [ ] Only footer-scoped source files changed.
- [ ] Master plan exists and matches implementation.
- [ ] Production build passes.
- [ ] 1366 px visual gate passes.
- [ ] 768 px visual gate passes.
- [ ] 375 px visual gate passes.
- [ ] No horizontal overflow.
- [ ] No clipped footer content.
- [ ] Contact details remain stable.
- [ ] Newsletter trust note is readable.
- [ ] Watermark is atmospheric, not dirty.
- [ ] Lifeline feels authored, not pasted.
- [ ] All focus states are visible.
- [ ] Reduced-motion mode is calm.
- [ ] Quality score is at least 90/100.
