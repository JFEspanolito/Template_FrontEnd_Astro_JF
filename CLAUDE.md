# CLAUDE.md - Astro Frontend Boilerplate

## Project Overview
Astro 5 + React 19 boilerplate template for SaaS, portfolios, and web apps. Uses Island Architecture for optimal performance — zero JS by default, hydrate only when needed.

## Tech Stack
- **Framework**: Astro 5 (Static/SSR)
- **UI Islands**: React 19 (only for interactive components)
- **Styling**: Tailwind CSS v4 (Vite plugin, no config file — configured in `global.css` via `@theme`)
- **Icons**: lucide-react
- **Toasts**: sileo
- **Modals**: @headlessui/react
- **Animations**: framer-motion
- **Validation**: zod
- **Analytics**: Google Analytics + Microsoft Clarity (via Partytown web worker)
- **Speed**: Vercel Speed Insights (anonymous, no consent needed)
- **Package Manager**: pnpm

## Commands
```
pnpm dev        # Dev server (localhost:4321)
pnpm build      # Production build
pnpm preview    # Preview production build
```

## Project Structure
```
src/
├── assets/          # Static assets (SVGs, images) — processed by Astro
├── components/
│   ├── analytics/   # AnalyticsBanner.tsx — GDPR consent + GA/Clarity loader
│   ├── buttons/     # ButtonBasic.astro, ThemeToggle.tsx, LanguageSwitcher.tsx
│   ├── pages/       # React view components (for DDD page pattern)
│   └── ui/          # Reusable UI: Modal.tsx, CtaButton.tsx
├── core/            # Domain logic (DDD pattern)
├── data/            # configProject.ts — centralized app metadata + SEO
├── i18n/            # LanguageContext.tsx + ui.ts (es/en translations)
├── layouts/         # Layout.astro, Header.astro, Footer.astro
├── libs/            # Utilities — cn() helper (clsx + tailwind-merge)
├── middleware.ts    # Security headers (X-Frame-Options, CSP, etc.)
├── pages/           # Astro file-based routing
└── styles/          # global.css — Tailwind @theme tokens + dark mode + UI vars
```

## Key Architecture Patterns

### Island Architecture
- `.astro` components = zero JS shipped (static HTML)
- React components need `client:*` directives for interactivity:
  - `client:load` — hydrate immediately (critical interactive UI like Toaster)
  - `client:idle` — hydrate when browser is idle (non-critical like AnalyticsBanner)
  - `client:visible` — hydrate when scrolled into viewport
  - `client:only="react"` — client-only, no SSR (ThemeToggle, LanguageSwitcher — needs localStorage/cookies)
- **Rule**: Prefer `.astro` for static content. Only use React when interactivity is required.
- **Rule**: NEVER add `"use client"` — that's Next.js, not Astro. Use `client:*` directives on the component tag instead.

### DDD Page Pattern
Route (Astro) → View (React). Pages in `src/pages/` are Astro files that import React view components from `src/components/pages/`.

### Dark Mode
- Class-based: `.dark` class on `<html>` element
- **FOUC prevention**: Inline `<script is:inline>` in `<head>` reads localStorage before first paint
- ThemeToggle syncs both `.dark` class AND `data-theme` attribute
- CSS: `@custom-variant dark (&:where(.dark, .dark *))` in global.css enables Tailwind `dark:` variants
- No-JS fallback: `@media (prefers-color-scheme: dark)` applies when `[data-theme]` isn't set yet
- Three modes: Light / Dark / System (follows OS preference)

### Styling
- Tailwind v4 via Vite plugin — `@theme` tokens in `global.css` (NO tailwind.config.js)
- `cn()` utility in `src/libs/utils.ts` for conditional class merging (clsx + tailwind-merge)
- CSS custom properties for UI controls: `--btn-primary`, `--btn-secondary`, `--btn-text-*`, `--shadow-soft`
- Theme colors defined in `@theme`: `--color-primary`, `--color-background`, `--color-foreground`
- Dark variants for UI vars auto-applied via `.dark { ... }` in global.css
- **Rule**: Use Tailwind utilities (`bg-background`, `text-foreground`, `text-primary`) — NOT raw `var()` in class attributes

### Configuration
- **Client config**: `src/data/configProject.ts` — app name, SEO, socials, branding (uses `PUBLIC_SITE_URL` env var)
- **Server config**: `src/env.d.ts` — typed env vars (API keys, secrets, DB URIs)
- **Astro config**: `astro.config.mjs` — site URL (from `PUBLIC_SITE_URL`), integrations, Vite plugins
- **IMPORTANT**: Set `PUBLIC_SITE_URL` in `.env` before deploying (affects sitemap + canonical URLs + OG images)

## Coding Conventions

### File Naming
- Astro components: `PascalCase.astro`
- React components: `PascalCase.tsx`
- Utilities/data: `camelCase.ts`
- Pages: `lowercase.astro` (Astro routing convention)

### Imports
- Use `@/` path alias (maps to `src/`)
- Import order: styles → data → components → types

### TypeScript
- Strict mode (`astro/tsconfigs/strict`)
- Define component props with `interface Props`
- Astro components use `Astro.props` destructuring

### React Components
- NO `"use client"` directive (Astro ignores it — use `client:*` on the component tag)
- Keep components small — each hydrated island adds to JS bundle
- Use `client:only="react"` for components that access `localStorage`, `document.cookie`, or other browser APIs during init

### Environment Variables
- `PUBLIC_*` prefix = available in client-side code
- No prefix = server-side only (never exposed to browser)
- Types defined in `src/env.d.ts`
- Template values in `.env.example`

### i18n
- Translations in `src/i18n/ui.ts` (es/en dictionaries)
- `useTranslations(lang)` returns a `t()` function for key lookups
- Language persistence via cookie (`lang`) + localStorage (`pref-lang`)
- LanguageContext.tsx provides React context for language state in islands

## Security
- Security headers via `src/middleware.ts`:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: SAMEORIGIN`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- For static deploys, replicate headers in platform config (Vercel `vercel.json`, Netlify `_headers`)
- Analytics loaded ONLY after user consent (GDPR-compliant cookie banner)
- Partytown offloads analytics scripts to web worker (off main thread)
- Cookies: `SameSite=Lax` + conditional `Secure` flag (auto-detects HTTPS)
- All secrets via server-side env vars (never `PUBLIC_*`)
- No hardcoded secrets in source code

## Performance Guidelines
- Prefer `client:idle` over `client:load` for non-critical components
- Use `client:only="react"` only when SSR would break (browser-API-dependent code)
- Images: use Astro's `<Image>` component for automatic optimization (sharp installed)
- Keep React islands small — each hydrated component adds to JS bundle
- Analytics scripts run in Partytown web worker (zero main-thread impact)
- `<audio preload="none">` — never preload media unless user interaction is imminent
- Inline dark mode script prevents layout shift (FOUC) on page load

## Utility Scripts (scripts/)
Node.js helper scripts for asset optimization (run with `node scripts/<name>`):
- `convert-images-to-webp.js` — Sharp-based image conversion
- `convert-audio-to-webm.js` — FFmpeg audio conversion
- `convert-video-to-webm.js` — FFmpeg video conversion
- `normalize-names.js` — File name normalization

## Deploy Checklist
1. Set `PUBLIC_SITE_URL` in `.env` (e.g. `https://mysite.com`)
2. Update `configProject.ts` — appName, appDescription, socials, support email
3. Replace placeholder images in `public/images/`
4. Replace `public/favicon.svg`
5. For static hosting: add security headers via platform config
6. Run `pnpm build` and verify no warnings
