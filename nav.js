/* nav.js – mobile hamburger, active link, auto copyright year, language toggle
 * Requires lang.js to be loaded first (provides window.SGKLang)             */
(function () {

  // ── Inject lang buttons BEFORE the hamburger toggle ───────────────────
  const navInner = document.querySelector('.nav-inner');
  const toggle   = document.querySelector('.nav-toggle');
  if (navInner && toggle) {
    const langBar = document.createElement('div');
    langBar.className = 'nav-lang';
    langBar.innerHTML =
      '<button class="nav-lang-btn" data-lang="en">🇬🇧</button>' +
      '<button class="nav-lang-btn" data-lang="it">🇮🇹</button>';
    navInner.insertBefore(langBar, toggle);
  }

  // ── Mobile hamburger ──────────────────────────────────────────────────
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      const isOpen = links.classList.contains('open');
      toggle.setAttribute('aria-expanded', isOpen);
      const bars = toggle.querySelectorAll('span');
      if (isOpen) {
        bars[0].style.transform = 'translateY(7px) rotate(45deg)';
        bars[1].style.opacity   = '0';
        bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        bars[0].style.transform = '';
        bars[1].style.opacity   = '';
        bars[2].style.transform = '';
      }
    });
  }

  // ── Active nav link ───────────────────────────────────────────────────
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href').split('/').pop() === path) a.classList.add('active');
  });

  // ── Auto copyright year ───────────────────────────────────────────────
  document.querySelectorAll('.copyright-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // ── Language toggle ───────────────────────────────────────────────────
  function applyLang(lang) {
    document.querySelectorAll('[data-en]').forEach(el => {
      // Never touch the dynamically-populated gallery grids
      if (el.closest('#poses-grid') || el.closest('#gallery')) return;
      el.innerHTML = (lang === 'it' && el.dataset.it) ? el.dataset.it : el.dataset.en;
    });
    document.querySelectorAll('.lang-content').forEach(el => {
      el.style.display = el.dataset.lang === lang ? 'block' : 'none';
    });
    document.querySelectorAll('.nav-lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    // Delegate storage + html[lang] to SGKLang
    window.SGKLang.set(lang);
    document.documentElement.lang = lang;

    // Stamp ?lang= on every internal SGK link and cross-site webapp link
    document.querySelectorAll('a[href]').forEach(function(a) {
      var href = a.getAttribute('href');
      if (!href) return;
      // Internal relative links (SGK pages)
      if (!href.startsWith('http') && !href.startsWith('mailto') &&
          !href.startsWith('#') && !href.startsWith('javascript')) {
        try {
          var url = new URL(href, window.location.href);
          url.searchParams.set('lang', lang);
          // Store as relative path to avoid absolute URLs for same-origin links
          a.setAttribute('href', url.pathname + url.search + url.hash);
        } catch(e) { /* ignore unparseable hrefs */ }
      }
      // Cross-site: stretchy54.github.io webapp
      if (href.indexOf('stretchy54.github.io') !== -1) {
        try {
          var xurl = new URL(href);
          xurl.searchParams.set('lang', lang);
          a.setAttribute('href', xurl.toString());
        } catch(e) { /* ignore */ }
      }
    });

    // Update this page's own URL without reload
    window.SGKLang.pushURL(lang);
  }

  // SGK site is English-first; URL param overrides localStorage
  // SGKLang.get() reads ?lang= URL param; fall back to localStorage then 'en'
  let savedLang;
  try {
    savedLang = window.SGKLang.get(localStorage.getItem('sgk-lang') || 'en');
  } catch(e) {
    savedLang = 'en';
  }
  applyLang(savedLang);

  document.addEventListener('click', function(e) {
    const btn = e.target.closest('.nav-lang-btn');
    if (btn) applyLang(btn.dataset.lang);
  });

})();
