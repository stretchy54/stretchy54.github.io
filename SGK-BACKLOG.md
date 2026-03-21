# SGK Website & Webapp — Project Reference & Feature Backlog

This file serves two purposes:
1. **Coding standards and project context** — reference for every work session
2. **Feature backlog** — living list of future ideas, improvements, and completed work

Upload this file at the start of every Claude session to restore full project context.

---

## 📋 Project Overview

A static bilingual (English / Italian) website and webapp for **Steven G Kukla (SGK)**,
a sculptor, author, and multimedia artist. Hosted on **GitHub Pages** at
`https://stretchy54.github.io` with no build system, no npm, no frameworks, and
no server-side code. Everything runs directly in the browser.

**Two distinct sections share some assets:**
- **SGK Website** — personal artist portfolio (7 HTML pages, English-first)
- **La Leonessa Webapp** — standalone cultural project landing page (3 HTML pages, Italian-first)

**Owner:** Steven G Kukla is not a programmer. He works iteratively with Claude in
conversational chat sessions. He uploads files to Claude, Claude edits them, Steve
downloads the results and manually commits to GitHub. There is no local repo, no
Claude Code, no command-line workflow.

---

## 📁 Repository Structure

```
/                          ← root (GitHub Pages serves from here)
├── CLAUDE.md              ← legacy Claude Code file; ignore
├── SGK-BACKLOG.md         ← THIS FILE — upload at start of every session
├── .nojekyll              ← disables GitHub Pages Jekyll processing (never delete)
├── .gitignore             ← excludes .DS_Store and Mac artifacts

├── style.css              ← shared stylesheet for all SGK website pages
├── nav.js                 ← shared nav/header/language/contact modal (all SGK pages)
├── lang.js                ← shared bilingual language-switching utility (EN/IT)

├── sgk.html               ← SGK home page
├── about.html             ← About Steve
├── sculpture.html         ← Sculpture gallery with filter bar + lightbox
├── poses.html             ← Figurative poses gallery with lightbox
├── writing.html           ← Writing / books page
├── poems.html             ← Poems & stories page (loads from poems.json); accessed via Writing page, not main nav
├── poems.json             ← All 32 poems, newest first, with HTML formatting
├── sgk-music.html         ← Music page with per-album track dropdowns + audio players
├── sgkprojects.html       ← SGK Projects page with 7 collapsible project sections

├── index.html             ← La Leonessa webapp landing page (Italian-first)
├── music.html             ← La Leonessa webapp music player (31 tracks)
├── viewer.html            ← La Leonessa webapp PDF book viewer
├── project.html           ← La Leonessa project story page (replaces Project.pdf viewer)

├── media/                 ← images: covers, portrait, album art
├── sculpture/             ← sculpture photos (JPG/JPEG/PNG)
├── poses/                 ← pose study photos
├── books/                 ← PDF book files
├── music/
│   ├── vol1/              ← 19 x .m4a audio files, Volume 1
│   └── vol2/              ← 12 x .m4a audio files, Volume 2
```

---

## 🌐 Language System

- **SGK Website is English-first.** Default language is English; Italian is toggled by the visitor.
- **La Leonessa Webapp is Italian-first.** Default language is Italian.
- `lang.js` is the shared language utility used by all pages.
- All 7 SGK pages load `lang.js` then `nav.js` (in that order, always).
- Language is passed between pages via URL parameter (`?lang=it` or `?lang=en`).
- Bilingual text uses `data-en="..."` and `data-it="..."` attributes on elements,
  toggled by `nav.js`'s `applyLang()` function.
- Full section swaps use `<div class="lang-content" data-lang="en">` blocks.
- Never hard-code language state — always use `SGKLang.get()` / `SGKLang.set()`.
- Every page must have `<meta name="google" content="notranslate">` to suppress
  Chrome's auto-translate prompt.

---

## 🎨 Design & CSS

**Aesthetic:** Warm artisan / handcrafted — earthy, parchment, terracotta tones.

**One shared stylesheet:** `style.css` covers all SGK website pages.
La Leonessa webapp pages use inline `<style>` blocks (intentional separation — do not merge).

**Typography (SGK site):**
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,800;1,400;1,600&family=Lora:ital,wght@0,400;0,500;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap" rel="stylesheet">
```
- **Playfair Display** (`--font-display`) — headings, titles, section labels
- **Lora** (`--font-body`) — body text, navigation, buttons
- **Cormorant Garamond** (`--font-accent`) — captions, subtitles, italic accents

**Typography (La Leonessa webapp only):**
- **Cinzel** — headings and buttons (loaded inline on webapp pages only)

**Color palette (CSS custom properties in `:root`):**
```css
--sand:       #f5efe4;
--parchment:  #ede3d0;
--warm-white: #faf7f2;
--stone:      #c8b89a;
--clay:       #a0735a;
--terracotta: #b85c38;
--umber:      #6b4c2a;
--charcoal:   #2e2416;
--smoke:      #9e9186;
```

**Rules:**
- Use CSS custom properties for all colors — never hard-code hex values in HTML.
- Do not create additional `.css` files. Add new styles to `style.css` in a commented section.
- `body::before` texture overlay is neutralised on webapp pages — never re-add it there.
- Responsive layout uses CSS Flexbox and media queries already in `style.css`.

---

## 💻 HTML Conventions

- Vanilla HTML5 only — no templating engines, no frameworks.
- Navigation is injected by `nav.js` — do not duplicate nav markup manually.
- Every SGK page `<head>` must include:
  - `<meta charset="UTF-8">`
  - `<meta name="google" content="notranslate">`
  - `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
  - `<link rel="stylesheet" href="style.css">`
  - Google Fonts link (see Typography above)
  - Google Analytics snippet (GA4 — see Analytics section below)
- Script load order at bottom of `<body>`: `lang.js` first, then `nav.js`, then page scripts.
- Exception: `lang.js` may load in `<head>` on pages where language flicker is a concern.

---

## ⚙️ JavaScript Conventions

- Vanilla JavaScript only — no jQuery, no React, no build tools, no npm.
- Use `const` and `let`; never use `var`.
- Keep functions small and clearly commented.
- No `console.log` statements in production code.
- Audio players use the native HTML5 `<audio>` element — no third-party players.
- `preload="none"` on all `<audio>` elements so 31 tracks don't load simultaneously.
- Auto-pause logic (pause other tracks when a new one plays) is implemented in
  `music.html` and `sgk-music.html` — preserve this pattern.

---

## 📬 Contact Form

- Implemented via **Formspree** endpoint `https://formspree.io/f/xgonzewl`.
- Contact modal is injected by `nav.js` into every SGK page automatically.
- Triggered by any element with class `contact-trigger`.
- The email address `alkuk23@gmail.com` must **never** appear in any HTML source file.
- Modal is bilingual (EN/IT), with AJAX submit and "Thank you / Grazie" success state.

---

## 📊 Google Analytics (GA4)

Two separate GA4 properties under Google account **Steven G Kukla** (387635517):

| Property | Measurement ID | Pages |
|---|---|---|
| SGK Website (528439226) | G-FSH461958Y | all 7 SGK pages |
| La Leonessa Webapp (528385271) | G-H006E6GDXT | index.html, music.html, viewer.html |

GA4 snippet (replace `G-XXXXXXXXXX` with correct ID for each page set):
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🚫 Things to Never Do

- Do not introduce npm, Node.js, webpack, or any build system.
- Do not add database calls, backend APIs, or server-side code.
- Do not use `var` in JavaScript.
- Do not hard-code the email address `alkuk23@gmail.com` anywhere in HTML source.
- Do not add `body::before` texture overlay to webapp pages.
- Do not remove the `notranslate` meta tag from any page.
- Do not delete `.nojekyll` or `.gitignore` from the repo root.
- Do not leave `.DS_Store` files in the repository.
- Do not create separate `.css` files — add to `style.css` only.

---

## 🔄 Collaborative Workflow

- Steve uploads current file(s) from GitHub to Claude at the start of each session.
- Claude edits files and presents download links.
- Steve downloads, reviews, and uploads/commits to GitHub manually.
- This file (`SGK-BACKLOG.md`) should be uploaded at the start of every session
  so Claude has full project context without needing to re-establish it from scratch.
- When the GitHub project knowledge connection is lagging, upload the specific files
  being worked on directly — Claude will work from those.

### ⚠️ File version rule — critical
Within a session, Claude must **always work from the most recently edited version**
of any file, not the original upload. Specifically:

- Files uploaded by Steve land in `/mnt/user-data/uploads/` — these are the **session-start**
  versions and must only be used as the source for the **first** edit of that file.
- After any edit, the working version lives in `/home/claude/` — all subsequent edits
  to that file **must** use this working copy, never re-copy from `/mnt/user-data/uploads/`.
- Before editing any file, Claude must check: has this file already been edited this session?
  If yes → read from `/home/claude/`. If no → copy fresh from `/mnt/user-data/uploads/`.
- This prevents Claude from silently overwriting its own in-session work with a stale upload.

---

## 🟡 Deferred

Nothing currently deferred.

---

## 🟢 Ideas / Nice-to-Have

### Wix website retirement
`https://stretchy54.wixsite.com/sgk-stone-sculptures` is superseded by the SGK website.
Steve plans to keep it active for approximately one year then delete it.
No action needed until then.

### Blogspot retirement
`sgkpoems.blogspot.com` is superseded by `poems.html`. Steve plans to keep it
active for approximately one year then delete it. No action needed until then.

---

## ✅ Completed (for reference)

- `writing.html`: book description text updated for Strong Roots, Good Fruit:
  - New bilingual `book-desc` paragraph honouring Monteleone's women, emigration,
    La Leonessa legend, poems/songs per chapter, and dedication to grandmother
    Maria Assunta Capobianco (born 1900); fully bilingual EN/IT
- `writing.html`: book cover images updated to 3rd edition files:
  - English: `media/COVER_ENG_MdP_3rd_Edition.jpg` (replaces `MdP_Eng_8Aug2024.png`)
  - Italian: `media/COVER_ITA_MdP_3a_Edizione.jpg` (replaces `COVER_ITA_MdP_1Nov2025.png`)
  - Both the default `src` on load and the `syncBookToLang()` swap logic updated
- `sgkprojects.html` accordion close button (Option 1):
  - A "✕ Close" / "✕ Chiudi" button is injected via JS at the bottom of every
    top-level accordion body (all 7 blocks) when the page loads
  - Clicking it collapses the open block and scrolls its header back into view
  - Works for all 7 blocks including Vibe Coding with its nested sub-accordions
  - La Leonessa retains its "← Back to Projects" and "Explore La Leonessa →" buttons;
    the Close button appears below them for consistency
  - All browser history manipulation (pushState/popstate/pageshow) removed entirely
  - Bilingual: EN "✕ Close" / IT "✕ Chiudi" via SGKLang
- `sgkprojects.html` Vibe Coding section: inline SVG cycle diagram added below prose
  showing the 5-node manually-driven AI dev cycle (Backlog + codebase → Claude codes →
  Steve validates → GitHub commit → Request changes → back to context); styled using
  site CSS variables; strengths and challenges summarised below a divider line
- `sgkprojects.html` Vibe Coding section: full content added from PDF source —
  three headed sections (My Projects, My Approach, Strengths & Challenges);
  condensed and restated; fully bilingual EN/IT
- `sgk-music.html`: "Flag icons indicate Italian-language songs" line added below
  hero subtitle; bilingual (IT: "Le icone bandiera indicano le canzoni in italiano")
- `sgk-music.html`: "Ci scusiamo: solo tre canzoni" bolded in Italian apology note
- `nav.js`: removed `#gallery` from `applyLang()` exclusion — fixes Italian sculpture
  captions not translating; guard was intended only for `#poses-grid`
- Sculpture page Italian captions: confirmed working — all `gallery-meta` divs already
  had correct `data-en`/`data-it` attributes; root fix was in `nav.js`
- `sgkprojects.html` created — new SGK Projects page:
  - 7 collapsible accordion sections, all collapsed on load, one-at-a-time expand
  - Projects: La Leonessa, Vibe Coding, FaceProj Webapp, SRGF Movie Trailer,
    SRGF Projection Mapping, Vizi Video, SGK Genealogy
  - La Leonessa section: lioness photo, bilingual summary, "Explore La Leonessa →"
    button linking to `project.html?lang=` (language-aware handoff)
  - Assunta Capobianco and Mayor/Sindaco Giovanni Campese bolded in La Leonessa text
  - All other 6 sections: bilingual "Content coming soon" placeholder
  - SGK site aesthetic (style.css, Playfair/Lora/Cormorant, terracotta palette)
  - GA4 G-FSH461958Y, OG tags, standard nav + footer
  - Fully bilingual EN/IT throughout
- "SGK Projects" added to main nav on all 7 SGK pages (between Writing and Music):
  - EN: "SGK Projects" / IT: "Progetti SGK"
  - Nav now: Home · About · Sculpture · Poses · Writing · SGK Projects · Music
- Music — Sticky volume header for Play All mode (`sgk-music.html` and `music.html`):
  - Each volume has a persistent `.vol-sticky-header` pinned below the nav/back-bar
  - Header contains: album cover thumbnail, volume label, title, and Play All/Skip/Stop/Now Playing controls
  - `is-playing` CSS class adds coloured border and shadow when Play All is active
  - Fully bilingual (EN/IT) on both pages
- Poems moved from main nav to Writing sub-page:
  - "Poems" nav item removed from all 7 SGK pages — nav is now Home · About · Sculpture · Poses · Writing · Music
  - `writing.html`: poems banner enhanced with eyebrow label and "📜 Read the Poems →" button as clear entry point
  - `poems.html`: "← Back to Writing" / "← Torna a Scritti" link added at top
  - `poems.html` still accessible directly via URL and from Home page Poem of the Month card
  - Nav slot freed for future SGK Projects item
- Music — Play All bug fixes (v2):
  - `sgk.html` Track of the Month: restored missing `audioEl.src = t.url` assignment
  - `sgk-music.html` and `music.html`: fixed `style.display = ''` → explicit `'inline-flex'`
    so Skip/Stop buttons correctly appear on Safari iOS after clicking Play All
  - `music.html`: rewrote `setupPlayAll` track-finding logic using `bar.parentNode`
    instead of fragile `closest()` chain that failed on Safari iOS
- Music — "Play All" playlist mode added to `sgk-music.html` and `music.html` (webapp):
  - ▶ Play All button above each volume's track list (Vol 1 and Vol 2)
  - Tracks play in sequence; when one ends the next starts automatically
  - ♪ Now Playing highlight on the active track row
  - ⏭ Skip button advances to next track immediately
  - ⏹ Stop button exits playlist mode entirely
  - Bilingual labels on webapp (EN: Play All/Skip, IT: Riproduci Tutti/Salta)
  - Auto-pause preserved throughout
- `writing.html`: Blurb links updated to 3rd edition (book IDs 12813442 EN / 12813453 IT)

- PDF book filenames updated across `writing.html` and `index.html`:
  - English: `SRGF_3ed_ENG_17Mar2026.pdf`
  - Italian: `SRGF_3ed_ITA_17Mar2026.pdf`
- `Project.pdf` updated: old Wix URL replaced with `https://stretchy54.github.io/sgk.html` (both IT and EN sections)
- `project.html` created — replaces PDF viewer for "About La Leonessa Project" button on webapp:
  - Bilingual (IT/EN) controlled by `?lang=` parameter
  - 5 collapsible accordion sections (all collapsed on load): Project Origin / My Roots / Looking Ahead / La Leonessa / Acknowledgements
  - Italian titles: Origine del Progetto / Le Mie Radici / Visione Futura / La Leonessa / Ringraziamenti
  - Includes wedding photo, lioness image, gesture poem, gratitude box, portrait
  - Sticky back bar returns to `index.html` in correct language
  - GA4 (G-H006E6GDXT) and OG meta tags included
- `index.html` updated: project button points to `project.html` (not PDF viewer); confirmation modal removed from project button; icon changed to 📖

- SEO & Open Graph meta tags added to all 10 pages (7 SGK + 3 webapp):
  - `<meta name="description">` on all pages
  - Full Open Graph tags (`og:type`, `og:site_name`, `og:url`, `og:title`, `og:description`, `og:image`)
  - Twitter/X card tags (`summary_large_image`) on all pages
  - SGK pages: portrait for Home/About, sculpture for Sculpture/Poses, book cover for Writing/Poems, album cover for Music
  - Webapp pages: `assets/lioness.jpg` as preview image for all 3 pages
- Google Analytics (GA4) added to all pages — two separate properties under account **Steven G Kukla** (387635517):
  - **SGK Website** — property ID 528439226, Measurement ID G-FSH461958Y → all 7 SGK pages
  - **La Leonessa Webapp** — property ID 528385271, Measurement ID G-H006E6GDXT → index.html, music.html, viewer.html, project.html
- Full static site built: `sgk.html`, `about.html`, `sculpture.html`, `poses.html`,
  `writing.html`, `sgk-music.html`, `style.css`, `nav.js`, `lang.js`
- Shared `lang.js` utility created; all SGK pages updated to use it
- EN/IT language toggle wired across all pages; cross-site language handoff working
- `music.html` and `viewer.html` migrated to import `style.css`; CSS collisions resolved
- `viewer.html` duplicate if/else bug fixed
- `notranslate` meta added to all pages
- `body::before` texture overlay neutralised on webapp pages
- Track of the Month on home page: plays directly from GitHub `.m4a` files
- `music.html` (webapp): all 31 tracks replaced with inline `<audio>` players; auto-pause added
- Asset consolidation: `assets/` folder eliminated, duplicates deleted, unreferenced files deleted
- Language system bugs 1–8 fixed across `index.html`, `nav.js`, `writing.html`
- `.gitignore` added; stray `.DS_Store` files deleted
- `.nojekyll` added to root — GitHub Pages Jekyll build disabled; deployment failures fixed
- `outbound.html` deleted (orphan); stray files deleted from `music/vol1/`
- Track 1-9 "Song of Babin" filename trailing space encoded correctly in `sgk-music.html`
- Contact form via Formspree (xgonzewl): modal popup on all SGK website pages + webapp
  landing page; email removed from all HTML source; ✉ Contact Me / ✉ Contattami footer
  link (terracotta, bold); bilingual; "Thank you" / "Grazie" success state; AJAX submit
- LinkedIn button removed from `sgk.html` and `about.html`
- Webapp landing page footer added: ✉ Contattami / Contact Me + © auto-year copyright
- Sculpture page: gallery reordered newest → oldest (2025 → 2012); paired works kept together
- Sculpture page: image corrections — Ancient King → IMG_7176, Nude Lady → IMG_6308,
  Halloween Cat added (IMG_6624), Greek Guy deleted, Horse of Torino → TurinoHorse file,
  Athtar → Ibex_Final_4 only (Detail entry deleted), Marble Gal (Rear) deleted
- `sgk-music.html`: YouTube links and outbound navigation removed; per-album track
  dropdowns added inside Vol 1 and Vol 2 album cards (19 and 12 songs respectively);
  auto-pause across all 31 players
- `sgk-music.html`: "About the Songs & Music" collapsible added below "The Albums" heading;
  "New to the music?" / How to Listen banner removed
- `how-to-listen.html` deleted from site; all navigation links removed from all pages
- Mobile whitespace tightened across all pages (Claude Desktop session)
- `poems.json` created: all 32 poems from sgkpoems.blogspot.com, newest first, with
  line breaks and inline HTML formatting (bold, italic) preserved
- `poems.html` created: dedicated Poems page with collapsible panels, bilingual chrome,
  added to nav between Writing and Music on all 6 SGK pages
- Home page: Poem of the Month card added to Featured Work section (now 2×2 grid);
  "Read this Poem →" link passes poem title as URL param to auto-open on poems.html
- `writing.html`: Blogspot link replaced with card linking to poems.html
- Home page sculpture list corrected: stale filenames replaced with current correct filenames
- `about.html`: SGK Poems Blog link replaced with "📜 Read the Poems" → poems.html
