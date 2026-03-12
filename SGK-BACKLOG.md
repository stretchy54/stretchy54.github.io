# SGK Website & Webapp — Feature Backlog

A living list of future ideas, improvements, and pending tasks.
Add new items freely. Mark done items ✅ and leave them for reference.

---

## 🔴 Higher Priority

### Contact Form (hide email address)
Replace all visible `alkuk23@gmail.com` occurrences across the SGK site with a
"Contact Me" link/button that opens a form. Use **Formspree** (free, no server needed)
so the email address is never exposed in source code.
- Appears in footer of all 7 SGK pages
- Appears as a button on `about.html`
- Decision needed: modal popup vs. dedicated `contact.html` page
- Decision needed: link style (text / icon+text / button)

---

## 🟡 Medium Priority

### Consolidate `index.html` language system to use `lang.js`
The La Leonessa webapp `index.html` still has its own hand-rolled `getLangFromURL` /
`setLang` functions. Migrating it to use the shared `lang.js` utility (which all SGK
pages already use) would reduce duplication and keep language-switching logic in one place.
- Low risk — `index.html` works fine as-is
- No user-facing change, purely a code quality improvement

### `outbound.html` — review whether still needed
Now that SGK site uses inline `<audio>` players for Track of the Month (home page)
and Full Track Listing (music page), `outbound.html` may only be needed by the
La Leonessa webapp's track links. Audit usage before deleting.

---

## 🟢 Ideas / Nice-to-Have

### Music page — auto-pause on new play
If a visitor opens the Full Track Listing and plays track 1, then clicks play on
track 3, both will play simultaneously. JavaScript could pause all other `<audio>`
elements when a new one starts.

### Music page — "Now Playing" indicator
Highlight the currently playing track row with a subtle terracotta left border
or animated ♪ icon while audio is active.

### Sculpture / Poses pages — real image lightbox captions
Currently the lightbox shows the image title. Could also show medium, year, and
dimensions once that metadata is available.

### Writing page — add SGK Poems blog embed or preview
The blog at `sgkpoems.blogspot.com` is linked but not previewed. A recent-posts
widget or a few featured poems could enrich the Writing page.

### About page — bilingual CV / timeline
A visual timeline of Steve's creative journey (stone carving, music, writing)
could make the About page richer, especially for Italian visitors.

### SEO & meta tags audit
Confirm all pages have meaningful `<meta description>` tags, Open Graph tags
(`og:title`, `og:image`), and that `sgk.html` has a Twitter card tag so links
shared on social media display a preview image.

### Favicon
Add a small `favicon.ico` or `favicon.svg` (perhaps the SGK monogram) so the
browser tab shows something distinctive rather than a blank page icon.

---

## ✅ Completed (for reference)

- Full static site built: `sgk.html`, `about.html`, `sculpture.html`, `poses.html`,
  `writing.html`, `sgk-music.html`, `how-to-listen.html`, `style.css`, `nav.js`, `lang.js`
- Shared `lang.js` utility created; all 7 SGK pages updated to use it
- EN/IT language toggle wired across all pages; cross-site language handoff working
- `music.html` and `viewer.html` migrated to import `style.css`; CSS collisions resolved
- `viewer.html` duplicate if/else bug fixed
- `notranslate` meta added to all pages
- `body::before` texture overlay neutralised on webapp pages
- Track of the Month on home page: plays directly from GitHub `.m4a` files via
  native `<audio>` player — no intermediate page
- Full Track Listing on Music page: all 31 tracks have inline `<audio>` players
  pointing to `music/vol1/` and `music/vol2/` `.m4a` files
- How to Listen page: image replaced with rich bilingual text content
- Music page: credits box removed, Track of the Month removed, layout reordered
- Italian-only apology note added to Music page (hidden on English)
