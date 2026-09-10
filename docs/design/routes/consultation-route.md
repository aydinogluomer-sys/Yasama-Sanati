---
name: "Yaşama Sanatı — Meridyen Eşiği"
description: "The established Yaşama Sanatı editorial world extended into a focused, flat consultation route."
colors:
  deep-olive: "#2b3530"
  warm-parchment: "#f0ebe2"
  copper-path: "#c6754a"
  copper-hover: "#d79a70"
  focus-copper: "#e1a37a"
  warm-ivory: "#f4efe4"
  olive-ink: "#26332d"
  action-ink: "#231c16"
  mobile-progress-sage: "#d9d8c9"
  status-error: "#651f1f"
  status-success: "#173d2d"
typography:
  display:
    fontFamily: "Ogg, Georgia, serif"
    fontSize: "clamp(3.35rem, 5.3vw, 5.35rem)"
    fontWeight: 400
    lineHeight: 0.96
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Ogg, Georgia, serif"
    fontSize: "clamp(2.2rem, 3.4vw, 3.6rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Basis Grotesque Pro, system-ui, -apple-system, Segoe UI, Arial, sans-serif"
    fontSize: "clamp(1rem, 1.3vw, 1.22rem)"
    fontWeight: 300
    lineHeight: 1.55
  label:
    fontFamily: "Basis Grotesque Pro, system-ui, -apple-system, Segoe UI, Arial, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: "0.08em"
  progress-label:
    fontFamily: "Space Mono, ui-monospace, monospace"
    fontSize: "0.72rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.13em"
rounded:
  none: "0px"
  focus-soft: "3px"
  circle: "50%"
spacing:
  route-gutter: "clamp(1.25rem, 3.4vw, 4rem)"
  touch-target: "44px"
  control-height: "54px"
  header-desktop: "92px"
  header-mobile: "64px"
  progress-mobile: "68px"
components:
  consultation-action:
    backgroundColor: "{colors.copper-path}"
    textColor: "{colors.action-ink}"
    rounded: "{rounded.none}"
    padding: "0.95rem 1.5rem"
    height: "{spacing.control-height}"
  consultation-action-hover:
    backgroundColor: "{colors.copper-hover}"
    textColor: "{colors.action-ink}"
    rounded: "{rounded.none}"
  consultation-field:
    backgroundColor: "transparent"
    textColor: "{colors.olive-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    height: "{spacing.control-height}"
  progress-node:
    backgroundColor: "{colors.warm-parchment}"
    textColor: "{colors.copper-path}"
    typography: "{typography.progress-label}"
    rounded: "{rounded.circle}"
    size: "52px"
  progress-node-mobile:
    backgroundColor: "{colors.warm-parchment}"
    textColor: "{colors.copper-path}"
    typography: "{typography.progress-label}"
    rounded: "{rounded.circle}"
    size: "28px"
---

# Design System: Yaşama Sanatı — Meridyen Eşiği

## Overview

**Creative North Star: "Meridyen Eşiği"**

The `/on-gorusme` route is a focused extension of Yaşama Sanatı’s established editorial world, not a replacement identity. A flat warm-parchment work surface crosses the deep-olive field through a concave meridian threshold; one copper seam acts as both boundary and live three-step progress path.

Calm comes from large Ogg typography, practical Basis interface text, negative space, and disciplined rules rather than cards or elevation. The focused header and compact footer remove ambient navigation so the consultation task remains the only journey.

**Key Characteristics:**

- Deep olive and warm parchment form one page-scale composition.
- A concave copper meridian joins identity, progress, and form state.
- Ogg leads; Basis carries instructions, controls, and supporting copy.
- Surfaces are flat, flush, and untextured on this route.
- Mobile preserves the sequence by translating the curve into a horizontal progress strip.

## Colors

Deep olive provides the contemplative ground, warm parchment the working field, and copper the single directional accent. Warm ivory and olive ink maintain readable polarity across the two fields.

### Primary

- **Deep Olive** (`{colors.deep-olive}`): route shell, focused header, intro field, and compact footer.

### Secondary

- **Copper Path** (`{colors.copper-path}`): threshold seam, active progress, selection rules, and primary action.
- **Copper Hover** (`{colors.copper-hover}`): the primary action’s restrained hover response.

### Neutral

- **Warm Parchment** (`{colors.warm-parchment}`): flat form work surface and progress-node fill.
- **Warm Ivory** (`{colors.warm-ivory}`): display copy and identity on deep olive.
- **Olive Ink** (`{colors.olive-ink}`): headings and form content on parchment.
- **Mobile Progress Sage** (`{colors.mobile-progress-sage}`): the compact horizontal progress field.

**The One Copper Line Rule.** Copper is a path, seam, selection, or action signal; it is not a decorative wash.

## Typography

**Display Font:** Ogg (with Georgia and serif fallbacks)  
**Body Font:** Basis Grotesque Pro (with system sans fallbacks)  
**Progress Numerals:** Space Mono, reserved for compact step indices

**Character:** Ogg makes the invitation feel editorial and humane; Basis keeps the multi-step task direct and legible. Space Mono is a quiet indexing tool, never a competing voice.

### Hierarchy

- **Display** (400, `clamp(3.35rem, 5.3vw, 5.35rem)`, 0.96): the short intro statement, capped near eight characters per line.
- **Headline** (400, `clamp(2.2rem, 3.4vw, 3.6rem)`, 1): one question per form step.
- **Body** (300, `clamp(1rem, 1.3vw, 1.22rem)`, 1.55): concise explanation on the dark field.
- **Label** (500, `0.78rem`, `0.08em`): fields and practical metadata.
- **Progress label** (400, `0.72rem`, `0.13em`): tabular step counts and short uppercase labels only.

**The Two-Voice Rule.** Ogg carries invitation and hierarchy; Basis carries the task. Monospace appears only where sequencing benefits from it.

## Layout

Desktop uses a focused header (92px) above a viewport-height composition. The intro occupies roughly 39% of the left field; the parchment form begins around 53.5%, while an authored SVG creates the concave threshold and places three progress nodes along it. The form is flush with the parchment rather than contained in a card.

At 900px and below, the header contracts to 64px, the intro becomes a 300px stacked region, the authored curve is removed, and progress becomes a three-column horizontal strip (68px). The form then flows in one column with a 1.25rem gutter and controls at least 54px high. The route uses its focused header and compact recovery footer rather than the full site navigation shell.

**The Translation Rule.** Responsive adaptation preserves the three-step journey; it does not squeeze the desktop curve into a narrow viewport.

## Elevation & Depth

This route uses zero elevation. There are no floating cards or decorative shadows; hierarchy comes from large color fields, the concave silhouette, hairline rules, and spacing. Box-shadow is reserved for visible keyboard focus and never implies surface depth.

**The Flat Paper Rule.** Parchment is the work surface itself, never a raised panel placed on another surface.

## Shapes

The signature silhouette is the concave meridian threshold. Circular progress and radio nodes sit against rectangular buttons, square checkboxes, and underline-only fields. Corners remain square by default; tiny soft radii are allowed only where a focus treatment needs a clean contour.

## Components

### Focused Header & Compact Footer

- The header keeps the identity on the left and one escape action on the right.
- The footer is a single hairline-separated recovery row for contact and required links; it stacks compactly on mobile.

### Meridian Progress

- Desktop progress follows the copper SVG threshold; the active path advances with state and the current circular node scales slightly.
- Mobile progress uses the same three nodes on one horizontal copper rule.
- Motion is restrained: path drawing lasts 750ms and step replacement 360ms with an ease-out curve. Under reduced motion both resolve immediately to their final states.

### Fields & Choices

- Program choices are broad ruled bands with circular radio marks and a copper selected rule.
- Text fields are full-bleed, transparent, square, and underline-led; focus adds a copper lower rule and subtle tonal fill.
- Controls retain 44px minimum targets, clear labels, visible focus, error association, and focused headings or summaries after state changes.

### Primary Action

- The primary action is a rectangular copper control, at least 54px high, aligned to the work surface’s lower edge.
- Hover may lift by 1px; reduced motion removes the transform. Focus uses the established copper ring with a parchment separation halo.

## Do's and Don'ts

### Do:

- **Do** preserve the deep-olive/parchment split and let the copper seam carry progress.
- **Do** use Ogg for the invitation and Basis for the task.
- **Do** translate the desktop meridian into horizontal progress on mobile.
- **Do** preserve semantic controls, visible focus, 44px targets, focus transfer, error recovery, and reduced-motion parity.
- **Do** disable the site’s global grain only on the consultation route so its working surfaces remain paper-flat.

### Don't:

- **Don't** wrap the form or its steps in floating cards.
- **Don't** add decorative shadows, rounded panels, glossy gradients, or texture to this route.
- **Don't** replace the focused header or compact footer with the full ambient site shell.
- **Don't** make progress or understanding depend on animation.
- **Don't** apply the consultation route’s no-grain exception to the rest of the established visual world.
