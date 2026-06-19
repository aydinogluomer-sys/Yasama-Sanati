# Yasama Sanati - Butunsel Sifa ve Egitim Akademisi

This repository contains the Next.js site for Yasama Sanati Akademisi. The current focus is the premium footer experience, responsive behavior, and the supporting Awwwards quality loop artifacts used to verify the work.

## Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Motion
- React Lenis

## Project Layout

```txt
app/                  Next.js App Router pages, layouts, and global styles
components/           Shared Client and Server components
sections/             Page sections and composed blocks
public/               Static assets
utils/                Shared helpers
types/                TypeScript type definitions
awwwards-loop/        Iteration plans, reports, and quality-loop state
```

## Current Focus

- Footer redesign and reference matching
- Responsive desktop, tablet, and mobile verification
- Newsletter interaction states
- Local-font stability so the build does not depend on remote font fetches

## Development

```bash
npm run dev
```

## Production Build

```bash
npm run build
```

## Start Production Server

```bash
npm run start
```

## GitHub

The repository is currently tracked on GitHub under:

`https://github.com/aydinogluomer-sys/Yasama-Sanati.git`

## Notes

- Footer work is documented in `awwwards-loop/`.
- The repo includes several existing untracked local folders outside the main app scope; those are intentionally left untouched.
