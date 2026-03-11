# CLAUDE.md - Astro CV Portfolio Boilerplate

## Project Overview
Modern portfolio/CV boilerplate built with **Astro 5** + **React 19** + **Tailwind CSS v4**.
Zero JS by default with selective hydration for interactive islands.

## Tech Stack
- **Framework:** Astro 5 (SSR mode via `output: "server"`)
- **Adapter:** `@astrojs/node` (standalone) — swap for `@astrojs/vercel`, `@astrojs/netlify`, etc. for deployment
- **UI:** React 19 (island architecture via `client:load` / `client:only="react"`)
- **Styling:** Tailwind CSS v4 (Vite plugin) + CSS custom properties for theming
- **Fonts:** Google Fonts (Space Grotesk + Syne) loaded via `<link>` in `<head>`
- **Image Processing:** Sharp (built-in Astro `<Image>`)
- **Package Manager:** pnpm

## Commands
```bash
pnpm dev        # Start dev server (localhost:4321)
pnpm build      # Production build
pnpm preview    # Preview production build
```

## Project Structure
```
src/
├── assets/          # Images (WebP format preferred)
├── components/
│   ├── analytics/   # AnalyticsBanner (cookie consent + GA + Clarity)
│   ├── buttons/     # ButtonBasic, ThemeToggle, LanguageSwitcher, SileoNotify
│   ├── layout/      # vertical_menu (sidebar navigation)
│   └── ui/          # Modal (Headless UI Dialog)
├── data/            # Content & config (configProject, Profile, CV, Proyectos)
├── i18n/            # Translations (ES/EN) via cookie-based language
├── layouts/         # Layout.astro, Header.astro, Footer.astro
├── libs/            # Utilities (cn = clsx + tailwind-merge)
├── pages/           # File-based routing (index, CV, projects/[pageID], 404)
└── styles/          # global.css (Tailwind + CSS custom properties)
```

## Architecture Decisions

### Theming System
- CSS custom properties defined in `:root` (light) and `html.dark` (dark)
- `@theme` block in global.css bridges CSS vars to Tailwind tokens
- **Important:** Raw CSS vars use `--raw-*` or `--color-*` prefixes in `:root` to avoid circular references with `@theme` tokens of the same name
- Theme toggle persists to `localStorage`

### Internationalization (i18n)
- Language stored in a cookie (`lang=es|en`)
- Server-side: `Astro.cookies.get("lang")` reads the cookie per request
- Client-side: `LanguageSwitcher` component sets the cookie and reloads
- All translations in `src/i18n/ui.ts`
- **Note:** SSR is required because cookies are read at request time

### CSS Variable Naming Convention
In `global.css`:
- `@theme` tokens: `--foreground-color`, `--highlight-one`, `--btn-primary`, etc.
- `:root`/`html.dark` source vars: `--color-foreground`, `--highlight-1`, `--raw-btn-primary`, etc.
- Always use `text-[var(--foreground-color)]` syntax in Tailwind classes (NOT `var(--foreground-color)` alone)

### Hydration Directives
- `client:only="react"` — Components that don't need SSR (ThemeToggle, LanguageSwitcher, Toaster)
- `client:load` — Components that need immediate interactivity (SileoNotify)
- No directive — Pure Astro components (static HTML, zero JS)

## Key Files to Customize
1. `src/data/configProject.ts` — App name, description, SEO metadata
2. `src/data/Profile.ts` — Name, bio, social links
3. `src/data/CV.ts` — Work experience and education
4. `src/data/Proyectos.ts` — Portfolio projects
5. `src/styles/global.css` — Colors, fonts, theme variables
6. `src/assets/` — Logo, profile photo, project images
7. `.env` (from `.env.example`) — API keys, analytics IDs

## Common Patterns

### Adding a New Page
1. Create `src/pages/NewPage.astro`
2. Import `Layout` and wrap content
3. Read language cookie: `const lang = (Astro.cookies.get("lang")?.value as "es" | "en") || "es";`
4. Add translations to `src/i18n/ui.ts`

### Adding a New Project
1. Add images to `src/assets/Projects/pN/`
2. Add cover image to `src/assets/Portadas/`
3. Add entry to `src/data/Proyectos.ts`

### Using CSS Variables in Tailwind
```html
<!-- Correct -->
<h1 class="text-[var(--foreground-color)]">Title</h1>
<div class="bg-[var(--highlight-one)]">Accent</div>

<!-- WRONG - does nothing -->
<h1 class="var(--foreground-color)">Title</h1>
```

## External Links
Always include `rel="noopener noreferrer"` on `target="_blank"` links for security.

## Analytics
- Google Analytics + Microsoft Clarity loaded only after user cookie consent
- Vercel Speed Insights loaded automatically
- Partytown offloads analytics scripts to web workers

## Scripts (in `/scripts/`)
- `convert-images-to-webp.js` — Batch convert images to WebP
- `convert-audio-to-webm.js` — Convert audio to WebM Opus (requires FFmpeg)
- `convert-video-to-webm.js` — Convert video to WebM (requires FFmpeg)
- `convert_pdf_to_jpg.js` — Convert PDF to JPG (requires Ghostscript)
- `rename_files_from_x_to_numberSerie.js` — Rename files to sequential numbers
