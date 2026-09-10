# Iteration 04 - Reference Alignment Plan

## Goal

Bring the footer as close as possible to `site_footer_1781825006195.png` while preserving the responsive and accessible behavior already in place.

## Scope

- `sections/Footer/Server.tsx`
- `components/Client/FooterNewsletter.tsx`
- `components/Client/FooterBackgroundText.tsx`
- `app/layout.tsx`
- `app/globals.css`
- `awwwards-loop/reports/footer-gap-list.md`

## Phases

1. Remove the extra halo and flatten the footer background.
2. Match the newsletter block to the reference with a horizontal desktop form row.
3. Restore contact glyphs and tighten spacing/alignment.
4. Rebuild with local fonts and verify the live render at desktop, tablet, and mobile.

## Exit criteria

- Build passes.
- Desktop, tablet, and mobile renders are inspectable.
- Newsletter focus and success states still work.
- Remaining visual differences are reduced to minor reference-only chrome outside the footer block.
