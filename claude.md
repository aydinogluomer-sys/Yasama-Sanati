# Yasama Sanati - Agent Handoff

This file is for AI agents and developers working on the Yasama Sanati site.

## Current State

- The project lives in `Elementis-SOTD`.
- The GitHub remote is `https://github.com/aydinogluomer-sys/Yasama-Sanati.git`.
- Main focus is the footer polish pass and the Awwwards quality loop artifacts under `awwwards-loop/`.
- Local fonts are used so the build does not depend on remote Google Fonts.

## What Was Changed Recently

- Footer layout was tuned to match the provided reference image more closely.
- Newsletter layout was switched to a compact horizontal desktop form row.
- Contact items now use small inline glyphs.
- The footer background is flatter and less saturated than earlier revisions.
- The main content container was widened to reduce left and right crowding.

## Editable Areas

- `sections/Footer/**`
- `components/Client/FooterBackgroundText.tsx`
- `components/Client/FooterNewsletter.tsx`
- `app/layout.tsx`
- `app/globals.css`
- `awwwards-loop/**`

## Do Not Change Without Scope Expansion

- Header, hero, and unrelated page sections
- Shared app-wide design decisions
- User-owned untracked folders outside the main app flow

## Verification Expectations

- Run `npm run build` after code changes.
- Check the footer at desktop, tablet, and mobile widths.
- Confirm newsletter focus and success states.
- Keep `awwwards-loop/implementation.md`, iteration files, and reports in sync with the latest pass.

## Working Notes

- The repo already has a committed history of the footer loop.
- Keep changes scoped and avoid broad rewrites unless the reference or tests require them.
