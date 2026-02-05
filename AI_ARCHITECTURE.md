# AI Engineering & Architecture Guide (Astro 5 Edition)

## 1. Design Philosophy

High-performance boilerplate based on Astro 5 + React 19, optimized for speed, SEO, and developer experience.

**Goal:** Minimize setup time for Analytics, UI, and Backend while preserving a *Zero JS by default* footprint.

**Island Architecture:** Selective hydration. Content is static by default; JavaScript is shipped only for interactive *islands*.

**Rule:** Architecture follows Domain-Driven Design (DDD) to decouple business logic from framework-specific code.

---

## 2. Configuration Strategy

Strict separation between client-side branding and server-side secrets via a **Dual-Config Pattern**.

### A. Client / UI Config (`src/data/configProject.ts`)

- **Purpose:** Public values, SEO metadata, branding, UI text.
- **Security:** Safe for client bundles.
- **Usage:** Imported in Layouts, SEO components, UI blocks.
- **Environment:** Uses `import.meta.env.PUBLIC_*` for browser-exposed variables.

### B. Server / API Config (`src/env.d.ts`)

- **Purpose:** Strict typing for all environment variables (Secrets, API Keys).
- **Security:** Variables without `PUBLIC_` are server-only.
- **Validation:** Every env var must be registered in `src/env.d.ts` for autocomplete and type safety.

---

## 3. Routing & View Architecture

Route definition is separated from view logic (Next.js–friendly migration pattern).

### Routes (`src/pages/*.astro`)

- Define URL structure.
- Handle SSR / SSG.
- Manage SEO.

### Views (`src/components/pages/*.tsx`)

- Page UI + React logic.
- Imported by Astro pages as interactive islands.

### Hydration

- `client:load` → immediate interactivity.
- `client:visible` → performance-optimized hydration.

---

## 4. Data Layer Architecture (DDD)

Core logic lives in a framework-agnostic `core/` directory (when applicable), following DDD.

### Database (`src/libs/db.ts`)

- Singleton pattern for Mongoose/MongoDB.
- Prevents connection exhaustion in serverless environments.

### Models (`models/*.js`)

- Written in JavaScript to avoid hydration typing complexity.
- TypeScript interfaces provide safety at the application layer.

### Utility

- Use `cn()` from `@/libs/utils.ts` for clean conditional Tailwind class merging.

---

## 5. UI System (Tailwind v4)

- **Engine:** Tailwind CSS v4 Vite Plugin.
- **Theming:** No `tailwind.config.js`.

All tokens, colors (e.g. Cyberpunk themes), and variables live in:

`src/styles/global.css`

```
@theme {
  /* design tokens here */
}
```
-   **Interactive UI:** React 19 + Headless UI for accessible, stateful components (Modals, Banners).

----------

## 6. Analytics & Privacy

### Consent Management
- Handled by `AnalyticsBanner.tsx` island.

### Performance
- Partytown offloads GA + Clarity to a Web Worker, keeping the main thread free.

### Insights
- Integrated with `@vercel/speed-insights` for real-time performance monitoring.