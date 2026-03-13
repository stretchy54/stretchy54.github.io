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

  // ── Contact modal ─────────────────────────────────────────────────────

  // Inject modal HTML once into the page
  const modalHTML = `
<div class="contact-modal-backdrop" id="contactModalBackdrop" role="dialog" aria-modal="true" aria-labelledby="contactModalTitle">
  <div class="contact-modal">
    <button class="contact-modal-close" id="contactModalClose" aria-label="Close">&times;</button>
    <h2 id="contactModalTitle" data-en="Contact Steve" data-it="Contatta Steve">Contact Steve</h2>
    <p class="contact-modal-sub" data-en="Send a message — Steve will reply by email." data-it="Invia un messaggio — Steve risponderà via email.">Send a message — Steve will reply by email.</p>

    <div id="contactFormWrap">
      <form id="contactForm" action="https://formspree.io/f/xgonzewl" method="POST">
        <label for="contactName" data-en="Your Name" data-it="Il tuo Nome">Your Name</label>
        <input type="text" id="contactName" name="name" required autocomplete="name">

        <label for="contactEmail" data-en="Your Email" data-it="La tua Email">Your Email</label>
        <input type="email" id="contactEmail" name="email" required autocomplete="email">

        <label for="contactMessage" data-en="Your Message" data-it="Il tuo Messaggio">Your Message</label>
        <textarea id="contactMessage" name="message" required></textarea>

        <div class="contact-modal-error" id="contactError" data-en="Something went wrong. Please try again." data-it="Qualcosa è andato storto. Riprova.">Something went wrong. Please try again.</div>
        <button type="submit" class="contact-modal-submit" id="contactSubmit" data-en="Send Message" data-it="Invia Messaggio">Send Message</button>
      </form>
    </div>

    <div class="contact-modal-success" id="contactSuccess">
      <div class="success-icon">✉️</div>
      <p data-en="Thank you! Your message has been sent.<br>Steve will be in touch soon." data-it="Grazie! Il tuo messaggio è stato inviato.<br>Steve ti contatterà presto.">Thank you! Your message has been sent.<br>Steve will be in touch soon.</p>
    </div>
  </div>
</div>`;

  document.body.insertAdjacentHTML('beforeend', modalHTML);

  const backdrop = document.getElementById('contactModalBackdrop');
  const closeBtn = document.getElementById('contactModalClose');
  const form     = document.getElementById('contactForm');
  const submitBtn = document.getElementById('contactSubmit');
  const errorMsg  = document.getElementById('contactError');
  const successDiv = document.getElementById('contactSuccess');
  const formWrap   = document.getElementById('contactFormWrap');

  function openModal() {
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    // Apply current language to modal elements
    const lang = (window.SGKLang ? window.SGKLang.get('en') : 'en');
    backdrop.querySelectorAll('[data-en]').forEach(el => {
      el.innerHTML = (lang === 'it' && el.dataset.it) ? el.dataset.it : el.dataset.en;
    });
  }

  function closeModal() {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
    // Reset form state after a short delay
    setTimeout(function() {
      form.reset();
      errorMsg.style.display = 'none';
      successDiv.style.display = 'none';
      formWrap.style.display = 'block';
      submitBtn.disabled = false;
    }, 300);
  }

  // Open on any .contact-trigger click
  document.addEventListener('click', function(e) {
    if (e.target.closest('.contact-trigger')) {
      e.preventDefault();
      openModal();
    }
  });

  // Close on X button or backdrop click
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', function(e) {
    if (e.target === backdrop) closeModal();
  });

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && backdrop.classList.contains('open')) closeModal();
  });

  // AJAX submit to Formspree
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    submitBtn.disabled = true;
    errorMsg.style.display = 'none';
    const lang = (window.SGKLang ? window.SGKLang.get('en') : 'en');
    submitBtn.textContent = lang === 'it' ? 'Invio in corso…' : 'Sending…';

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
    .then(function(res) {
      if (res.ok) {
        formWrap.style.display = 'none';
        successDiv.style.display = 'block';
      } else {
        errorMsg.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = lang === 'it' ? 'Invia Messaggio' : 'Send Message';
      }
    })
    .catch(function() {
      errorMsg.style.display = 'block';
      submitBtn.disabled = false;
      submitBtn.textContent = lang === 'it' ? 'Invia Messaggio' : 'Send Message';
    });
  });

})();
