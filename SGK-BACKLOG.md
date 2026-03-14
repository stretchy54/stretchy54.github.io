# SGK Website & Webapp — Feature Backlog

A living list of future ideas, improvements, and pending tasks.
Add new items freely. Mark done items ✅ and leave them for reference.

---

## 🟡 Deferred

### Sculpture page — Italian translations of gallery-meta descriptions
All 27 sculpture captions (material, date, inspiration notes) currently stay in
English when Italian is selected. Add `data-en` / `data-it` attributes to every
`gallery-meta` div with full Italian translations.

---

## 🟢 Ideas / Nice-to-Have

### Google Analytics
Add Google Analytics tracking snippet to all SGK website pages and the La Leonessa
webapp pages. Free, requires a Google account to set up a GA4 property and obtain
a Measurement ID (G-XXXXXXXXXX). Shows visitor counts, page popularity, geography,
device types, and traffic sources across both the website and webapp.

### Writing page — add SGK Poems blog embed or preview
The blog at `sgkpoems.blogspot.com` is linked but not previewed. A recent-posts
widget or a few featured poems could enrich the Writing page.

### SEO & meta tags audit
Confirm all pages have meaningful `<meta description>` tags, Open Graph tags
(`og:title`, `og:image`), and that `sgk.html` has a Twitter card tag so links
shared on social media display a preview image.

---

## ✅ Completed (for reference)

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
- `how-to-listen.html` deleted from site; all navigation links removed from all pages;
  How to Listen nav item removed from all 6 remaining SGK pages;
  How to Listen button removed from `writing.html` content area
- Mobile whitespace tightened across all pages (Claude Desktop session)
