
// ── App Router ─────────────────────────────────────────────
// SPA navigation controller with Bilingual Support (English / Telugu)

const App = (() => {
  let parables = null;
  let miracles = null;
  let currentLang = localStorage.getItem('bibleStudiesLang') || 'en';
  let currentView = 'home';
  let currentNumber = null;

  const root = () => document.getElementById('app-root');

  // ── Init ──────────────────────────────────────────────────
  async function init() {
    await loadData();
    syncNavLabels();

    // Parse URL hash for deep linking
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const parts = hash.split('/');
      navigateInternal(parts[0], parts[1] ? parseInt(parts[1]) : null, false);
    } else {
      navigateInternal('home', null, false);
    }

    // Listen for hash changes (browser back/forward)
    window.addEventListener('hashchange', () => {
      const h = window.location.hash.replace('#', '');
      if (h) {
        const parts = h.split('/');
        navigateInternal(parts[0], parts[1] ? parseInt(parts[1]) : null, false);
      } else {
        navigateInternal('home', null, false);
      }
    });
  }

  async function loadData() {
    [parables, miracles] = await Promise.all([
      DataStore.getParables(currentLang),
      DataStore.getMiracles(currentLang)
    ]);
  }

  // ── Navigate ──────────────────────────────────────────────
  function navigate(view, number) {
    navigateInternal(view, number, true);
  }

  function navigateInternal(view, number, updateHash) {
    currentView = view;
    currentNumber = number;

    if (updateHash) {
      const hash = number != null ? `${view}/${number}` : view;
      window.location.hash = hash === 'home' ? '' : hash;
    }

    let html = '';

    if (view === 'home') {
      html = Renderer.renderHome(parables, miracles, currentLang);
      setActiveNav('home');
    } else if (view === 'parables') {
      if (number != null) {
        html = Renderer.renderChapter(parables, 'parables', number, currentLang);
      } else {
        html = Renderer.renderBookIndex(parables, 'parables', currentLang);
      }
      setActiveNav('parables');
    } else if (view === 'miracles') {
      if (number != null) {
        html = Renderer.renderChapter(miracles, 'miracles', number, currentLang);
      } else {
        html = Renderer.renderBookIndex(miracles, 'miracles', currentLang);
      }
      setActiveNav('miracles');
    } else if (view === 'lesson') {
      if (number != null) {
        html = Renderer.renderChapter(miracles, 'lesson', number, currentLang);
      } else {
        html = Renderer.renderBookIndex(miracles, 'miracles', currentLang);
      }
      setActiveNav('miracles');
    }

    root().innerHTML = html;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    syncThemeIcon();
  }

  function setActiveNav(view) {
    document.querySelectorAll('.nav__link').forEach(el => {
      el.classList.toggle('active', el.dataset.view === view);
    });
  }

  function syncNavLabels() {
    const isTe = currentLang === 'te';
    const logo = document.getElementById('nav-logo');
    if (logo) {
      logo.innerHTML = `<div class="nav__logo-icon">✦</div><span class="nav__logo-text"><span class="nav__logo-title">${isTe ? 'బైబిలు ధ్యానములు' : 'Bible Studies'}</span><span class="nav__logo-author">${isTe ? ' · పి.డి.వి. ప్రసాద్' : ' · P.D.V. Prasad'}</span></span>`;
    }
    const homeBtn = document.getElementById('nav-home');
    if (homeBtn) homeBtn.textContent = isTe ? 'హోమ్' : 'Home';

    const parablesBtn = document.getElementById('nav-parables');
    if (parablesBtn) parablesBtn.textContent = isTe ? 'ఉపమానములు' : 'Parables';

    const miraclesBtn = document.getElementById('nav-miracles');
    if (miraclesBtn) miraclesBtn.textContent = isTe ? 'అద్భుతములు' : 'Miracles';

    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
      langBtn.textContent = isTe ? '🌐 English' : '🌐 తెలుగు';
      langBtn.title = isTe ? 'Switch to English' : 'తెలుగులోకి మార్చండి';
    }
  }

  // ── Language Toggle ───────────────────────────────────────
  async function toggleLang() {
    currentLang = currentLang === 'en' ? 'te' : 'en';
    localStorage.setItem('bibleStudiesLang', currentLang);
    await loadData();
    syncNavLabels();
    navigateInternal(currentView, currentNumber, false);
  }

  // ── Theme Toggle ──────────────────────────────────────────
  function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.setAttribute('data-theme', '');
      localStorage.setItem('bibleStudiesTheme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('bibleStudiesTheme', 'dark');
    }
    syncThemeIcon();
  }

  function syncThemeIcon() {
    const icon = document.getElementById('theme-icon');
    if (!icon) return;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    icon.textContent = isDark ? '☀️' : '🌙';
  }

  function getLang() {
    return currentLang;
  }

  return { init, navigate, toggleLang, toggleTheme, getLang };
})();

// ── Preamble toggle ───────────────────────────────────────
function togglePreamble(type, lang) {
  const text = document.getElementById('preamble-text-' + type);
  const btn  = document.getElementById('preamble-btn-' + type);
  if (!text || !btn) return;
  const expanded = text.classList.toggle('expanded');
  const isTe = (lang || App.getLang()) === 'te';
  if (isTe) {
    btn.textContent = expanded ? 'తక్కువ చూపు ▲' : 'మరింత చూపు ▼';
  } else {
    btn.textContent = expanded ? 'Show less ▲' : 'Show more ▼';
  }
}

// ── Start ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', App.init);
