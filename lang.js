/* lang.js – shared language utility
 *
 * Used by:
 *   - Webapp pages (index.html, music.html, viewer.html) — reads ?lang= URL param,
 *     defaults to 'it' (webapp is Italian-first)
 *   - SGK site nav.js — calls window.SGKLang.get() then overlays its own
 *     localStorage + data-en/data-it system on top
 *
 * API:
 *   window.SGKLang.get(defaultLang?)  → 'en' | 'it'
 *     Reads ?lang= URL param. Falls back to defaultLang (default: 'it').
 *
 *   window.SGKLang.set(lang)
 *     Persists lang to localStorage under key 'sgk-lang'.
 *
 *   window.SGKLang.pushURL(lang)
 *     Updates the URL ?lang= param without a page reload (safe to call anywhere).
 */

(function () {
  'use strict';

  var STORAGE_KEY = 'sgk-lang';

  function get(defaultLang) {
    var fallback = defaultLang || 'it';
    try {
      var p = new URLSearchParams(window.location.search);
      var v = p.get('lang');
      if (v === 'en' || v === 'it') return v;
    } catch (e) { /* sandboxed preview */ }
    return fallback;
  }

  function set(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* private mode */ }
  }

  function pushURL(lang) {
    try {
      var url = new URL(window.location.href);
      url.searchParams.set('lang', lang);
      history.replaceState(null, '', url);
    } catch (e) { /* sandboxed preview — safe to ignore */ }
  }

  window.SGKLang = { get: get, set: set, pushURL: pushURL };
})();
