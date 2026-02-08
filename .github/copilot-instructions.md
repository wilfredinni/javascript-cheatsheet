# Copilot instructions

## Project snapshot

- Vite + React 19 app with TanStack Router. Entry is src/main.tsx; routing is defined in src/router.tsx and mounted in components/layout/RootLayout.tsx.
- Content is markdown-driven: docs live in docs/cheatsheet/_.md and page markdown lives in src/pages/_.md. These are compiled into src/content/docs.json and src/content/routes.json.
- build-content transforms markdown with gray-matter, markdown-it, Prism, and custom tag replacement. See scripts/build-content.ts for the exact parsing and custom blocks.
- Static prerendering uses @prerenderer/renderer-puppeteer and waits for the "prerender-ready" event fired in RootLayout. See scripts/prerender.ts.

## Critical workflows

- Dev: bun run dev (runs build:content first, then Vite).
- Build: bun run build (build:content -> vite build -> prerender).
- Preview: bun run preview.
- Tests: bun run test (Vitest with jsdom).
- Lint/typecheck: bun run lint / bun run typecheck.

## Content and routing conventions

- Content updates should be made in docs/cheatsheet or src/pages markdown, never in src/content/\*.json (generated).
- Custom markdown tags supported in content: <base-disclaimer>, <base-disclaimer-title>, <base-disclaimer-content>, <base-warning>, <base-warning-title>, <base-warning-content> (see scripts/build-content.ts).
- Cheatsheet pages are rendered via src/pages/CheatsheetPage.tsx using docs.json. Marketing pages (contributing/changelog) use src/pages/MarkdownPage.tsx.
- Navigation labels/paths are centralized in src/content/navigation.ts; keep paths in sync with markdown slugs.

## Styling and UI patterns

- Tailwind CSS v4 with custom font families (Inter + Lexend) and prose styles. See tailwind.config.js and src/components/Prose.tsx.
- Reader mode is a cross-cutting UI state (src/context/reader.tsx) used by Prose and RootLayout layout decisions.

## Integrations and env

- /newsletter requests are proxied in dev to VITE_GRUDGET_ENDPOINT (vite.config.ts).
- PWA config lives in vite.config.ts (VitePWA).
