# Yaşama Sanatı Footer Redesign — Antigravity Implementation Plan

## 0. Mission

This implementation plan is for **Antigravity** to perform the final high-end polish pass on the **Yaşama Sanatı footer**.

Current estimated quality: **84–86 / 100**  
Target after this pass: **88–91 / 100**  
Long-term Awwwards-level target: **90+ / 100**

The footer is already clean, premium, and usable. This pass must not rebuild the footer from scratch. The goal is to fix the remaining “almost premium but still slightly template-like” areas:

1. Watermark is still slightly too obvious and not integrated enough.
2. The lifeline/signature detail exists but feels added rather than inevitable.
3. Newsletter card is functional but not yet a premium editorial invite module.
4. Dividers are clean but do not yet carry enough design character.
5. Micro text contrast is still too low in several places.
6. Left brand stage needs stronger “closing scene” energy.
7. Bottom bar is organized but too safe.

This plan is intentionally strict, specific, and scoped. Do not creatively expand beyond the footer.

---

## 1. Hard Scope

### Allowed files

Only modify footer-related files:

```txt
sections/Footer/**
components/Client/FooterBackgroundText.tsx
components/Client/FooterNewsletter.tsx
```

You may create a new footer-only decorative component if needed:

```txt
components/Client/FooterLifeline.tsx
components/Client/FooterDecorativeLayer.tsx
```

or a local footer-only utility inside:

```txt
sections/Footer/components/**
```

### Forbidden changes

Do not modify:

```txt
global.css
tailwind.config.*
app/layout.*
app/page.*
Header
Hero
Other sections
Shared Button components
Global typography tokens
Global color tokens
Site-wide theme files
Unrelated client components
```

If a shared component blocks the footer polish, do not edit it. Create a footer-local version or apply local className overrides inside the footer only.

### Required implementation discipline

- Keep the existing **4 - 5 - 3** desktop composition.
- Preserve the core gradient direction and color character: `#2B3530 → #30493D`.
- Preserve the editorial numbering system: `01`, `02`, `03`, `04`.
- Preserve the coordinate signature idea.
- Preserve the premium calm tone. Do not add neon, aggressive glow, excessive animation, or boho/spiritual ornamentation.
- Footer should feel like a refined editorial closing scene, not a generic SaaS footer.

---

## 2. Current Visual Diagnosis

Based on the latest screenshot, the footer is strong but not finished.

### Working well

- The layout is stable.
- The phone number no longer wraps.
- The newsletter input no longer gets crushed.
- The background gradient is coherent.
- The social icons are aligned.
- The nav group is readable.
- The footer feels premium enough for production.

### Remaining weaknesses

#### 2.1 Watermark still feels like a background text layer
It is improved, but it still reads as “large text placed behind the layout.” It needs to become a more integrated typographic atmosphere.

#### 2.2 Lifeline/signature detail does not fully justify itself
The top-left star and curved hairline are promising, but the line currently does not strongly connect to the rest of the composition. It should either become more intentional or quieter.

#### 2.3 Newsletter card is useful but not exceptional
The card works. The form works. But it still feels slightly like a standard subscription block. It needs more typographic rhythm, better visual hierarchy, more precise contrast, and a stronger sense of invitation.

#### 2.4 Dividers are too neutral
They separate content, but they do not feel like part of the visual language.

#### 2.5 Micro text is too faint
The newsletter security note, coordinate signature, and bottom-bar text are close to unreadable in a screenshot.

#### 2.6 Left brand stage needs more drama
The logo, paragraph, CTA, socials, and coordinate signature are correct. The issue is rhythm. It still feels slightly assembled instead of composed.

#### 2.7 Bottom bar is too safe
It is clean but not memorable. It should close the page with more refinement.

---

## 3. Design Tokens for This Pass

Use local footer classes / inline style objects where needed. Do not edit global tokens.

### 3.1 Core colors

```css
--footer-green-start: #2B3530;
--footer-green-end: #30493D;
--footer-warm-white: #F3EFE6;
--footer-accent: #C9875B;
--footer-accent-hover: #D79A70;
--footer-ink: #1D261F;
```

### 3.2 Text opacity targets

Use these as practical opacity tiers:

```css
primary: rgba(243, 239, 230, 0.92)
secondary: rgba(243, 239, 230, 0.70)
body: rgba(243, 239, 230, 0.64)
muted: rgba(243, 239, 230, 0.54)
micro-minimum: rgba(243, 239, 230, 0.48)
very-subtle: rgba(243, 239, 230, 0.32)
```

Do not use micro text below `0.46` opacity unless it is purely decorative and not meant to be read.

### 3.3 Accent opacity targets

```css
accent-strong: rgba(201, 135, 91, 0.95)
accent-medium: rgba(201, 135, 91, 0.62)
accent-muted: rgba(201, 135, 91, 0.38)
accent-faint: rgba(201, 135, 91, 0.18)
```

### 3.4 Border opacity targets

```css
border-subtle: rgba(243, 239, 230, 0.08)
border-default: rgba(243, 239, 230, 0.10)
border-visible: rgba(243, 239, 230, 0.14)
border-accent: rgba(201, 135, 91, 0.45)
```

### 3.5 Motion rules

All movement must be restrained.

Allowed:
- `translateX(2px–6px)`
- `translateY(-1px to -2px)`
- opacity changes
- border color changes
- subtle background tint

Forbidden:
- bounce
- elastic easing
- large movement
- scale above `1.02`
- heavy glow
- looping animation in footer unless already present and extremely subtle

Use reduced motion support where possible:

```txt
motion-reduce:transform-none
motion-reduce:transition-none
```

---

## 4. File-by-File Implementation Plan

---

# 4A. `sections/Footer/Server.tsx`

## Objective

Refine the main footer composition, dividers, brand stage, coordinate signature, bottom bar, and decorative lifeline integration.

Do not rewrite the whole component. Make targeted changes.

---

## 4A.1 Preserve the 4 - 5 - 3 desktop layout

### Required desktop composition

```txt
Brand Stage:       lg:col-span-4
Nav Group:         lg:col-span-5
Newsletter Card:   lg:col-span-3
```

### Required responsive behavior

Desktop:
```txt
Brand | Nav Group | Newsletter
```

Tablet:
```txt
Brand full width
Nav Group full width
Newsletter full width or balanced block
```

Mobile:
```txt
Brand
CTA
Socials
Coordinate signature
Akademi
Kaynaklar
İletişim
Newsletter
Bottom bar
```

### Acceptance criteria

- Desktop layout must remain balanced.
- Newsletter must not feel crushed.
- Contact email and phone must not wrap.
- No horizontal overflow at 1366, 768, or 375 widths.

---

## 4A.2 Fix and refine vertical dividers

### Problem

Current dividers still feel like layout borders instead of editorial hairlines.

### Required change

Replace hard `border-l` style dividers with gradient-based hairline dividers.

### Implementation pattern

Create a local reusable divider element or class-like block:

```tsx
<div
  aria-hidden="true"
  className="hidden lg:block absolute left-0 top-0 h-full w-px"
  style={{
    background:
      "linear-gradient(to bottom, transparent 0%, rgba(243,239,230,0.03) 6%, rgba(243,239,230,0.12) 30%, rgba(243,239,230,0.09) 68%, rgba(243,239,230,0.025) 90%, transparent 100%)",
  }}
/>
```

### Exact visual rules

- Divider must fade at top and bottom.
- Divider must not run visually as a solid line from top to bottom.
- Divider should be slightly shorter than the content height if absolute positioning allows it.
- Use `pointer-events-none`.
- Use `aria-hidden="true"`.

### Where to apply

- Between Brand Stage and Nav Group.
- Between Nav Group and Newsletter.
- Horizontal divider above bottom bar.

### Horizontal divider

Use a fade line, not a hard border:

```tsx
<div
  aria-hidden="true"
  className="h-px w-full"
  style={{
    background:
      "linear-gradient(to right, transparent 0%, rgba(243,239,230,0.12) 12%, rgba(243,239,230,0.10) 72%, transparent 100%)",
  }}
/>
```

### Acceptance criteria

- Dividers look like editorial composition lines.
- They should be visible enough to structure the footer but never dominate.
- No hard mechanical full-height grid line.

---

## 4A.3 Make the top-left lifeline intentional

### Problem

The lifeline currently feels slightly pasted on. It needs visual logic.

### Required behavior

The lifeline should behave as a signature layer connected to the brand stage.

### Visual structure

- Start near the small accent star.
- Drop vertically for a short distance.
- Curve gently into the left brand zone.
- Fade out before reaching the nav group.
- It must not cross readable text aggressively.
- It must not look like a random decorative squiggle.

### Implementation option A: inline SVG in `Server.tsx`

Use an absolute SVG layer:

```tsx
<svg
  aria-hidden="true"
  className="pointer-events-none absolute left-0 top-0 hidden h-full w-full lg:block"
  viewBox="0 0 1366 620"
  preserveAspectRatio="none"
>
  <path
    d="M55 118 C58 170, 62 210, 130 225 C220 250, 330 268, 470 252 C590 238, 690 242, 785 260"
    fill="none"
    stroke="rgba(201,135,91,0.24)"
    strokeWidth="1"
    strokeLinecap="round"
    opacity="0.22"
  />
</svg>
```

Adjust the path to match real layout. Do not blindly use this path if it crosses text badly.

### Implementation option B: create `FooterLifeline.tsx`

Create a decorative component if cleaner:

```txt
components/Client/FooterLifeline.tsx
```

But avoid unnecessary client component unless interactivity is needed. Static SVG can stay server-side.

### Required styling

```txt
opacity target: 0.16–0.28
stroke: rgba(201,135,91,0.18–0.28)
stroke width: 1px
```

### Hard restrictions

- Do not use bright orange.
- Do not use thick stroke.
- Do not make it look like a spiritual symbol.
- Do not overlap the brand paragraph in a distracting way.
- Do not place it above interactive controls.

### Acceptance criteria

- The lifeline should be noticeable only on second look.
- It should connect the top-left star to the brand stage.
- It should feel like a designed signature, not an added decoration.

---

## 4A.4 Rework the Brand Stage rhythm

### Problem

The brand stage is good but slightly mechanical.

### Required changes

Adjust vertical rhythm:

```txt
Star / lifeline start → Logo: intentional relationship
Logo → paragraph: 22–28px
Paragraph → CTA: 28–34px
CTA → socials: 30–36px
Socials → coordinate signature: 34–42px
```

### Logo block

Ensure the logo has enough presence:

```txt
Desktop logo target:
font-size: visually equivalent to 30–36px
line-height: tight but not cramped
letter spacing: slightly refined, not overly wide
```

### Paragraph

Increase readability slightly:

```txt
color: rgba(243, 239, 230, 0.68–0.72)
line-height: 1.75–1.85
max-width: 260–300px
```

Avoid a very narrow paragraph column if it creates too many line breaks.

### CTA relationship

The CTA should feel like part of the brand stage, not just a button.

Required CTA rules:
- Keep accent border.
- Keep modest width.
- Ensure text does not wrap awkwardly unless intended.
- Arrow must align optically with the text baseline.

### Acceptance criteria

- The left block feels like a composed brand scene.
- No element feels randomly stacked.
- The coordinate signature feels connected to the brand area.

---

## 4A.5 Polish coordinate signature

### Problem

The coordinate signature is a good idea but needs more deliberate treatment.

### Required structure

Use two micro clusters:

```txt
[accent dot] 38.4237° N · 27.1428° E    |    ONLINE & İZMİR
```

### Recommended implementation

```tsx
<div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] uppercase tracking-[0.12em]">
  <span className="h-1 w-1 rounded-full bg-[#C9875B]" aria-hidden="true" />
  <span className="text-[#F3EFE6]/50">38.4237° N · 27.1428° E</span>
  <span className="h-3 w-px bg-[#C9875B]/45" aria-hidden="true" />
  <span className="font-medium text-[#C9875B]/85">ONLINE & İZMİR</span>
</div>
```

### Visual rules

- Coordinates can be muted.
- `ONLINE & İZMİR` should be slightly warmer.
- Dot and separator should be accent but not loud.
- Keep it readable at desktop.
- On mobile, allow wrapping but keep the relationship clear.

### Acceptance criteria

- Coordinate detail reads as an intentional brand signature.
- It does not look like random metadata.

---

## 4A.6 Social icon static and hover polish

### Current issue

Icons are clean but still template-like.

### Required static style

```txt
size: 34–38px
border: rgba(243, 239, 230, 0.10–0.14)
icon color: rgba(243, 239, 230, 0.62–0.70)
background: transparent or rgba(243, 239, 230, 0.015)
```

### Required hover style

```txt
border-color: rgba(201, 135, 91, 0.55)
color: #C9875B
background: rgba(201, 135, 91, 0.07)
transform: translateY(-2px)
transition: all 300ms ease-out
```

Add reduced motion fallback:

```txt
motion-reduce:transform-none
motion-reduce:transition-none
```

### Acceptance criteria

- Socials are still calm.
- Hover feels premium.
- Static state is not overly faint.

---

## 4A.7 CTA final interaction polish

### Required static style

- Border accent visible but not loud.
- Text in accent.
- Warm hover background.
- Arrow aligned and animated.

### Suggested class behavior

```txt
group
hover:bg-[#C9875B]/[0.08]
hover:border-[#C9875B]/90
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-[#C9875B]/45
focus-visible:ring-offset-2
focus-visible:ring-offset-[#2B3530]
```

Arrow:

```txt
transition-transform duration-300 ease-out
group-hover:translate-x-1.5
motion-reduce:transform-none
```

### Acceptance criteria

- CTA still feels quiet, not loud.
- Focus-visible state is clearly accessible.
- Arrow motion is subtle and refined.

---

## 4A.8 Bottom bar final polish

### Problem

Bottom bar is clean but too safe and slightly low-contrast.

### Required structure

Desktop:

```txt
Left: © 2026 Yaşama Sanatı
Center: Legal links with accent dot separators
Right: Yukarı Git  ^   Yaşama Sanatı Akademisi  *
```

Mobile:

```txt
Copyright
Legal links wrapped
Yukarı Git / Brand signature
```

### Text opacity

Use:

```txt
copyright: rgba(243,239,230,0.56)
legal links: rgba(243,239,230,0.56)
legal hover: rgba(243,239,230,0.86)
right meta: rgba(243,239,230,0.58)
accent dots: rgba(201,135,91,0.60)
```

### “Yukarı Git” behavior

If it is a link:
- Use `href="#top"` if top anchor exists.
- If no top anchor exists, avoid broken behavior.
- Add hover color and arrow movement.

Recommended hover:

```txt
hover:text-[#F3EFE6]/85
group-hover:-translate-y-0.5 for arrow
```

### Acceptance criteria

- Bottom bar remains quiet but readable.
- It closes the footer elegantly.
- It does not look like default legal text.

---

# 4B. `components/Client/FooterBackgroundText.tsx`

## Objective

Make the watermark feel like editorial atmosphere rather than a background label.

---

## 4B.1 Reduce visual dirtiness

### Current problem

The watermark is still readable in a way that can feel slightly dirty/heavy, especially at the top.

### Required target

The watermark should:
- be visible enough to add depth,
- be subtle enough to not compete,
- fade unevenly and elegantly,
- never reduce readability.

### Recommended opacity

```txt
stroke/fill opacity range: 0.025–0.045
hover accent opacity if present: max 0.08–0.12
```

If the watermark has hover interaction, keep it extremely subtle or disable it if it distracts.

---

## 4B.2 Use radial + linear masking

### Required support

Use both standard and WebKit mask properties:

```tsx
style={{
  maskImage:
    "radial-gradient(ellipse at 42% 18%, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.46) 38%, rgba(0,0,0,0.16) 68%, transparent 100%)",
  WebkitMaskImage:
    "radial-gradient(ellipse at 42% 18%, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.46) 38%, rgba(0,0,0,0.16) 68%, transparent 100%)",
}}
```

If this makes the watermark too faint, slightly increase the middle stop. Do not increase the base text opacity first.

### Alternative layered mask

If radial alone is not enough, combine with a linear fade via wrapper hierarchy:

Outer wrapper:
```tsx
style={{
  maskImage:
    "linear-gradient(to bottom, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.38) 48%, transparent 100%)",
  WebkitMaskImage:
    "linear-gradient(to bottom, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.38) 48%, transparent 100%)",
}}
```

Inner text:
```tsx
style={{
  opacity: 0.04,
}}
```

### Acceptance criteria

- Top watermark does not look like accidental text residue.
- It should feel like a controlled typographic layer.
- It must not become invisible; it should still add depth.

---

## 4B.3 Desktop and mobile behavior

### Desktop

Watermark can be present, large, subtle.

### Tablet

Reduce opacity slightly or lower its visual weight.

### Mobile

Either:
- hide watermark, or
- keep it ultra faint and away from primary text.

### Acceptance criteria

- No mobile readability issue.
- No text collision with footer links.
- No horizontal overflow caused by huge text.

---

# 4C. `components/Client/FooterNewsletter.tsx`

## Objective

Turn the newsletter card from a functional form card into a premium editorial invitation module.

---

## 4C.1 Card visual treatment

### Required card style

If the card wrapper is controlled inside this component, use:

```txt
rounded-[20px]
bg-[#F3EFE6]/[0.035]
border border-[#F3EFE6]/[0.085]
shadow-[inset_0_1px_1px_rgba(243,239,230,0.045),0_24px_80px_rgba(0,0,0,0.08)]
```

If the outer card wrapper remains in `Server.tsx`, only style the inner content here and do not duplicate card borders.

### Important

Avoid double borders:
- If `Server.tsx` adds card border, do not add another card border here.
- If `FooterNewsletter.tsx` owns the card, `Server.tsx` should only place the column.

### Acceptance criteria

- Newsletter card has one clean border system.
- No double-outline effect.
- Card looks light, calm, and premium.

---

## 4C.2 Internal rhythm

Use precise spacing:

```txt
04 number → Bülten title: 8–10px
Bülten title → description: 16–18px
description → form: 22–24px
form input → button: 12–14px if stacked
form → trust note: 14–16px
```

### If form remains stacked

Recommended:

```txt
input height: 42–46px
button height: 44–48px
gap between input and button: 12px
```

### If form returns inline on wide card

Only use inline layout if input placeholder can fully display and button does not crush it.

Rule:

```txt
If available card width < 300px, stacked is better than inline.
```

### Acceptance criteria

- Nothing feels cramped.
- The card does not look oversized.
- The trust note is visually connected to the form.

---

## 4C.3 Input styling

### Required input

```txt
height: 44–46px
border-radius: 9–11px
background: rgba(20, 28, 24, 0.42)
border: 1px solid rgba(243, 239, 230, 0.08)
placeholder: rgba(243, 239, 230, 0.54–0.62)
text: rgba(243, 239, 230, 0.88)
```

### Focus visible

```txt
outline: none
border-color: rgba(201, 135, 91, 0.55)
box-shadow: 0 0 0 3px rgba(201, 135, 91, 0.08)
```

If using Tailwind:

```txt
focus-visible:ring-2
focus-visible:ring-[#C9875B]/25
focus-visible:border-[#C9875B]/55
```

### Acceptance criteria

- Placeholder “E-posta adresiniz” must be readable.
- Input must not look like a black hole.
- Focus state must be visible and premium.

---

## 4C.4 Button styling

### Required button

```txt
height: 44–48px
border-radius: 9–11px
background: #C9875B
text color: #1D261F
font-size: 11–12px
letter-spacing: 0.08–0.12em
font-weight: 600
```

### Text

Keep:

```txt
ABONE OL →
```

or, if the current component uses sentence case, preserve existing site tone. Do not switch tone globally.

### Hover

```txt
background: #D79A70
transform: translateY(-1px) optional
arrow translateX: 2–3px
```

### Reduced motion

```txt
motion-reduce:transform-none
```

### Acceptance criteria

- Button is strong but not cheap.
- It does not dominate the whole card excessively.
- Arrow is optically centered.

---

## 4C.5 Trust note visibility

### Current problem

The lock note is still too faint.

### Required style

```txt
icon: rgba(201, 135, 91, 0.78)
text: rgba(243, 239, 230, 0.50–0.58)
font-size: 9.5–10.5px desktop
line-height: 1.45–1.55
```

### Layout

```txt
display: flex
align-items: flex-start
gap: 8px
```

Do not align the lock vertically center if the note wraps into 2 lines. Use `items-start`.

### Acceptance criteria

- The note is readable in screenshot.
- It does not overpower the form.
- The lock icon does not float awkwardly.

---

# 5. Background and Atmosphere

## 5.1 Preserve core gradient

Do not change the core gradient direction unless absolutely necessary.

Required:

```css
linear-gradient(135deg, #2B3530 0%, #30493D 100%)
```

Additional overlays can exist, but the footer must still read as a deep green editorial surface.

---

## 5.2 Adjust noise/glow only subtly

### Noise

If noise exists:
```txt
opacity: 0.01–0.018
```

If it is not visible at all:
- Increase slightly.
- But it must never look like dirt or compression artifact.

### Accent glow

```txt
opacity: 0.018–0.032
```

### Sage glow

```txt
opacity: 0.04–0.07
```

### Vignette

Use subtle edge darkening. Do not make corners muddy.

### Acceptance criteria

- User should not say “there is noise/glow.”
- User should feel “the background has depth.”

---

# 6. Accessibility Requirements

## 6.1 Focus states

All interactive elements must have visible focus states:

```txt
CTA
social links
nav links if focusable
email input
newsletter button
bottom legal links
Yukarı Git
```

### Focus style target

Use accent ring or underline, but keep it elegant.

Example:

```txt
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-[#C9875B]/40
focus-visible:ring-offset-2
focus-visible:ring-offset-[#2B3530]
```

For text links, underline or color shift is acceptable.

---

## 6.2 Reduced motion

For all hover transforms:

```txt
motion-reduce:transform-none
motion-reduce:transition-none
```

---

## 6.3 Decorative elements

All decorative elements must be hidden from assistive tech:

```tsx
aria-hidden="true"
```

and:

```txt
pointer-events-none
```

Examples:
- watermark
- lifeline SVG
- decorative stars
- decorative dividers

---

# 7. Responsive Requirements

## 7.1 Desktop — 1366px

Must verify:

- Footer does not feel empty.
- Brand stage has strong rhythm.
- Nav group is readable.
- Contact email and phone fit one line.
- Newsletter card looks premium, not cramped.
- Watermark is subtle.
- Lifeline does not distract.
- Bottom bar is readable.

---

## 7.2 Tablet — 768px

Must verify:

- No horizontal overflow.
- Footer stack order feels intentional.
- Nav columns remain readable.
- Newsletter card not too wide/awkward.
- Watermark does not collide with text.
- Lifeline can be hidden if it causes clutter.

Recommended:
```txt
Hide lifeline on tablet/mobile if composition gets messy.
```

---

## 7.3 Mobile — 375px

Must verify stack order:

```txt
1. Brand Stage
2. CTA
3. Socials
4. Coordinate signature
5. Akademi
6. Kaynaklar
7. İletişim
8. Newsletter
9. Bottom bar
```

Mobile rules:
- Watermark can be hidden.
- Lifeline should likely be hidden.
- Dividers should not create awkward long lines.
- Newsletter input and button should be full width.
- Bottom legal links should wrap cleanly.

---

# 8. QA Checklist

## 8.1 Visual QA

- [ ] Main gradient remains `#2B3530 → #30493D`.
- [ ] Footer does not look flat.
- [ ] Watermark is subtle and integrated.
- [ ] Lifeline feels intentional, not pasted.
- [ ] Dividers are fade-based, not mechanical.
- [ ] Brand stage has stronger vertical rhythm.
- [ ] CTA looks premium and accessible.
- [ ] Social icons are not template-like.
- [ ] Nav group remains readable and editorial.
- [ ] Contact phone and email never wrap awkwardly.
- [ ] Newsletter card looks like a premium invite module.
- [ ] Input is readable.
- [ ] Button is strong but not too blocky.
- [ ] Trust note is readable.
- [ ] Coordinate signature feels intentional.
- [ ] Bottom bar is readable and refined.

## 8.2 Accessibility QA

- [ ] All interactive elements have focus-visible states.
- [ ] Reduced motion is respected for transforms.
- [ ] Decorative SVGs are `aria-hidden`.
- [ ] Decorative layers are `pointer-events-none`.
- [ ] Newsletter input has a proper accessible label or aria-label.
- [ ] Email button is keyboard reachable.
- [ ] Color contrast is not sacrificed for aesthetics.

## 8.3 Responsive QA

- [ ] 1366px screenshot passes.
- [ ] 768px screenshot passes.
- [ ] 375px screenshot passes.
- [ ] No horizontal overflow.
- [ ] No broken contact lines.
- [ ] Newsletter does not crush.
- [ ] Bottom links wrap cleanly.

---

# 9. Verification Plan

## 9.1 Build

Run:

```bash
npm run build
```

Expected:
- No TypeScript errors.
- No Tailwind arbitrary value errors.
- No hydration errors introduced.
- No ESLint-blocking issues if build runs lint.

## 9.2 Local screenshots

Run local dev server:

```bash
npm run dev
```

Capture:

```txt
footer-final-desktop-1366.png
footer-final-tablet-768.png
footer-final-mobile-375.png
```

At:

```txt
1366px width
768px width
375px width
```

## 9.3 Final scoring target

After implementation, footer should score approximately:

```txt
Corporate quality: 91+
Premium brand feel: 88+
Awwwards editorial feel: 85+
UI/UX cleanliness: 90+
Originality / memorability: 82+
Overall footer score: 88–91
```

---

# 10. Do Not Do These

Do not:

- Rebuild the footer completely.
- Change the site’s global visual identity.
- Add bright orange glows.
- Add heavy patterns.
- Add animations that call attention to themselves.
- Make the lifeline look like a spiritual symbol.
- Make text unreadable for the sake of subtlety.
- Use opacity below readable levels for functional text.
- Allow phone number to wrap.
- Allow email to overflow.
- Duplicate newsletter card borders.
- Add new dependencies.
- Modify unrelated components.
- Leave without running build.

---

# 11. Final Done Definition

The task is complete only when all are true:

- [ ] Only footer-scope files changed.
- [ ] `npm run build` passes.
- [ ] Desktop screenshot captured at 1366px.
- [ ] Tablet screenshot captured at 768px.
- [ ] Mobile screenshot captured at 375px.
- [ ] Contact phone remains one line.
- [ ] Email remains visually stable.
- [ ] Newsletter card no longer feels generic.
- [ ] Newsletter trust note is readable.
- [ ] Watermark feels integrated.
- [ ] Lifeline feels intentional or is reduced until it does.
- [ ] Dividers are editorial/fade-based.
- [ ] Coordinate signature feels like brand language.
- [ ] Bottom bar is readable and refined.
- [ ] Footer visually reaches at least 88/100 quality.
