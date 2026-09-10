# Yaşama Sanatı Design System

## Brand Essence

Premium, calm, editorial, embodied, trustworthy.

## Visual Keywords

Breath, meridian, ritual, warmth, stillness, precision.

## Working Rules

- Prefer fewer, better elements over broad component expansion.
- Keep motion purposeful and restrained.
- Preserve readable contrast and visible focus states.
- Avoid template-like patterns unless they are materially improved.

## Production Tokens

The canonical runtime tokens live in `app/globals.css`. New UI must consume these roles rather than introduce unrelated hex values.

- Surfaces: deep, warm, card, muted.
- Text: primary, secondary, muted, inverse.
- Accents: copper for action/emphasis; sage for calm supporting surfaces.
- Layout: 90rem wide container, 48rem editorial measure, fluid 6–12rem section rhythm.
- Motion: 200ms interaction response, 600ms editorial reveal.

## Typography Roles

- Display XL: singular hero or closing statement.
- Display L: major section title.
- Section title: concise narrative transition.
- Body large: proposition or proof statement, limited editorial measure.
- Body: primary reading copy.
- Caption and microcopy: labels, trust details, coordinates, and states; never below readable contrast.

## Component Rules

- One primary CTA per viewport; secondary actions remain visually quieter.
- Interactive controls have a 44px minimum target and visible keyboard focus.
- Cards use content-driven height and restrained borders; decorative glow is not a component primitive.
- Sections follow promise → clarify → prove → deepen → convert → close.
- 3D and video are progressive enhancement with static/reduced-motion fallbacks.

## Quality Gate

A component is not complete until its desktop, tablet, mobile, keyboard, and reduced-motion states are verified. Build success alone is not visual acceptance.
