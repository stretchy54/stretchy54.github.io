/* nav.js – mobile hamburger, active link, auto copyright year, language toggle */
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
    try { localStorage.setItem('sgk-lang', lang); } catch(e) {}
    document.documentElement.lang = lang;
  }

  let savedLang = 'en';
  try {
    // URL param takes priority (e.g. arriving from webapp with ?lang=it)
    const urlLang = new URLSearchParams(window.location.search).get('lang');
    if (urlLang === 'it' || urlLang === 'en') {
      savedLang = urlLang;
    } else {
      savedLang = localStorage.getItem('sgk-lang') || 'en';
    }
  } catch(e) {}
  applyLang(savedLang);

  document.addEventListener('click', function(e) {
    const btn = e.target.closest('.nav-lang-btn');
    if (btn) applyLang(btn.dataset.lang);
  });

})();
