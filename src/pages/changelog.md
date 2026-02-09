---
title: 'Changelog - Javascript Cheatsheet'
description: See what is new, what got fixed, and what is coming.
date: July 19, 2022
updated: February 25, 2023
---

<base-title :title="frontmatter.title" :description="frontmatter.description">
Changelog
</base-title>

## 2026-02-09

- We can now run code examples in the documentation! The output will be displayed in the bellow of the code block.
- Added code runner utilities and console formatting helpers for runnable examples.
- Refactored code structure for readability and maintainability.
- Redesigned the homepage with new hero content, learning paths, and topic highlights.
- Expanded reader mode with reading progress, time-to-read, font size controls, and bookmarks.
- Refreshed navigation and theme toggle styling for better clarity.
- Added reader stats and bookmark hooks to support the new reader UI.

## 2026-02-08

- Updated to React 19.
- Improved SEO metadata with normalized canonical URLs, richer Open Graph/Twitter tags, and a social image.
- Added sitemap generation and updated robots.txt to reference it.
- Reduced initial bundle size by lazy-loading docs content and the contributors section.
- Adjusted prerender readiness to fire when page content is ready.
- Removed PWA support and manifest generation.
- Added reduced-motion handling for smooth scrolling and corrected analytics domain.

## 2024-09-22

- Added Javascript Map Objects. Thanks [@Harish-clb](https://github.com/Harish-clb)
- Updated changelog.
- Updated contributors.
- Updated packages and dependencies.

## 2024-07-11

- Added a missing operator in Bitwise operators. Thanks [@Kishore007raj](https://github.com/Kishore007raj)
- Fixed missing style (DocSearch-VisuallyHiddenForAccessibility). Thanks [@gritgary101](https://github.com/gritgary101)

## 2024-01-29

The release of the new **www.javascriptcheatsheet.org** website:

- Complete re-design with **Vue 3** and **Tailwind CSS**.
- The site is now a **PWA** and can be installed in any platform that has a compatible web browser.
- Added a **dark mode**.
- Added a **reader mode**.
- Added **Algolia search**.
- Added contributors to the index page 🥰
- Added, fixed and removed code examples.
- Added an **Edit this page on GitHub** link to make it easier to contribute.
- Changed hosting to **Netlify** with an OSS plan 🎉
- Removed and joined cheatsheet sections.
- Fixed grammar and spelling mistakes.
