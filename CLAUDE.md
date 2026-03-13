# CLAUDE.md — SGK Website & Webapp
## Coding Standards and Project Context for Claude Code

---

## Project Overview

This is a static bilingual (Italian / English) website and webapp for Steven G Kukla (SGK),
a sculptor, author, and multimedia artist. It is hosted on **GitHub Pages** at
`https://stretchy54.github.io` with no build system, no npm, no frameworks, and
no server-side code. Everything runs directly in the browser.

The project has two distinct sections that share some assets:

- **SGK Website** — a personal artist portfolio site (7 HTML pages)
- **La Leonessa Webapp** — a standalone cultural project page (3 HTML pages)

---

## Repository Structure

```
/                          ← root (GitHub Pages serves from here)
├── CLAUDE.md              ← this file
├── SGK-BACKLOG.md         ← feature backlog; keep updated as tasks complete
├── .nojekyll              ← disables GitHub Pages Jekyll processing (do not delete)
├── .gitignore             ← excludes .DS_Store and other Mac artifacts

├── style.css              ← shared stylesheet for all SGK website pages
├── nav.js                 ← shared navigation/header component (injected into all SGK pages)
├── lang.js                ← shared bilingual language-switching utility (EN/IT)

├── sgk.html               ← SGK home page
├── about.html             ← About Steve
├── sculpture.html         ← Sculpture gallery
├── poses.html             ← Life drawing / poses gallery
├── writing.html           ← Writing / books page
├── sgk-music.html         ← Music page (SGK site)
├── how-to-listen.html     ← Listening guide

├── index.html             ← La Leonessa webapp home
├── music.html             ← La Leonessa webapp music player
├── viewer.html            ← La Leonessa webapp book viewer

└── music/
    ├── vol1/              ← .m4a audio files, Volume 1
    └── vol2/              ← .m4a audio files, Volume 2
```

---

## Language System

**All pages are bilingual: Italian first, English second.**

- Italian is the default and primary language.
- The shared `lang.js` utility handles all language switching across the SGK website.
- All 7 SGK pages (`sgk.html` through `how-to-listen.html`) import and use `lang.js`.
- `index.html` (La Leonessa webapp) currently has its own language logic — migration
  to `lang.js` is a pending backlog item but is not urgent.
- Language is passed between pages via URL parameter (`?lang=it` or `?lang=en`).
- **Never hard-code language state** — always use the `lang.js` utility functions.
- Every page must have `<meta name="google" content="notranslate">` in the `<head>`
  to suppress Chrome's auto-translate prompt.

---

## HTML Conventions

- All pages use **vanilla HTML5** — no templating engines, no frameworks.
- Navigation and header are injected by `nav.js` — do not duplicate nav markup manually.
- `<head>` of every page must include:
  - `<meta charset="UTF-8">`
  - `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
  - `<meta name="google" content="notranslate">`
  - A link to `style.css` (SGK site pages) or inline styles (webapp pages)
  - Both Cinzel and Cormorant Garamond from Google Fonts (see Typography below)
- Bilingual text elements use `data-it="..."` and `data-en="..."` attributes,
  toggled by `lang.js`.
- Avoid inline styles wherever possible; use CSS classes or `style.css`.

---

## CSS Conventions

- **One shared stylesheet:** `style.css` covers all SGK website pages.
- The La Leonessa webapp pages use inline `<style>` blocks (intentional separation).
- **Do not create additional `.css` files** without a strong reason.
- `body::before` texture overlay is neutralised on webapp pages — do not re-add it there.
- Responsive layout is handled with CSS Flexbox and media queries already in `style.css`.
- When adding new styles, add them to `style.css` in a clearly commented section.
- Use CSS custom properties (variables) for repeated color values.

### Color Palette (warm parchment / terracotta)
```css
--parchment:   #f5f0e8;   /* main background */
--terracotta:  #c0622a;   /* primary accent, links, active states */
--dark-ink:    #2c1f0e;   /* body text */
--gold:        #b8902a;   /* secondary accent */
--border:      #d4c4a0;   /* dividers, borders */
```

---

## JavaScript Conventions

- **Vanilla JavaScript only** — no jQuery, no React, no build tools.
- Three shared JS files exist: `nav.js`, `lang.js`. Do not add framework dependencies.
- Keep functions small and clearly commented.
- All `<script>` tags go at the **bottom of `<body>`**, not in `<head>`,
  except for `lang.js` which loads early to prevent language flicker.
- No `console.log` statements left in production code.
- Use `const` and `let`; avoid `var`.
- Audio players use the native HTML5 `<audio>` element — no third-party players.
- Auto-pause logic (pause other tracks when a new one plays) is already implemented
  in `music.html` — preserve this pattern when adding new tracks.

---

## Typography

Both fonts load from Google Fonts and must appear on every page:

```html
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
```

- **Cinzel** — headings, titles, navigation, monogram (elegant Roman serif)
- **Cormorant Garamond** — body text, captions, bilingual content (refined, literary)

---

## Audio Files

- All `.m4a` audio files are stored in `music/vol1/` and `music/vol2/`.
- Files are served directly from GitHub Pages — no CDN, no streaming service.
- Do not add audio files to the repository root or to other subdirectories.
- New tracks follow the existing naming convention (check `music/vol1/` for examples).

---

## GitHub Pages Deployment

- The site deploys automatically from the `main` branch on every push.
- `.nojekyll` in the root disables Jekyll processing — **never delete this file**.
- `.gitignore` excludes `.DS_Store` and other Mac system files — keep it maintained.
- There is no build step — what you commit is exactly what deploys.
- Test changes locally by opening HTML files directly in Safari or Chrome before pushing.

---

## Backlog Management

- The file `SGK-BACKLOG.md` in the root is the living feature backlog.
- When a task is completed, mark it ✅ and move it to the "Completed" section.
- Do not delete completed items — they serve as a record of what was done and how.
- Add new ideas to the appropriate priority tier (🔴 / 🟡 / 🟢).

---

## Things to Never Do

- Do not introduce npm, Node.js, webpack, or any build system.
- Do not add database calls, backend APIs, or server-side code.
- Do not use `var` in JavaScript.
- Do not leave `.DS_Store` files in the repository.
- Do not delete `.nojekyll` or `.gitignore`.
- Do not hard-code the email address `alkuk23@gmail.com` anywhere in HTML source
  (pending Formspree contact form implementation — see backlog).
- Do not add `body::before` texture overlay to webapp pages (`index.html`, `music.html`, `viewer.html`).
- Do not remove the `notranslate` meta tag from any page.

---

## Owner Context

Steven G Kukla is a sculptor and multimedia artist, not a programmer. He works
iteratively with AI assistance (Claude) in conversational sessions. Code changes
should be explained clearly in plain language. Prefer explicit, readable code
over clever or compact code. When in doubt, add a comment.
