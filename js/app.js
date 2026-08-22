
// ── App Router ─────────────────────────────────────────────
// SPA navigation controller

const App = (() => {
  let parables = null;
  let miracles = null;
  let currentLang = 'en';
  let currentView = 'home';

  const root = () => document.getElementById('app-root');

  // ── Init ──────────────────────────────────────────────────
  async function init() {
    [parables, miracles] = await Promise.all([
      DataStore.getParables(),
      DataStore.getMiracles()
    ]);

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

  // ── Navigate ──────────────────────────────────────────────
  function navigate(view, number) {
    navigateInternal(view, number, true);
  }

  function navigateInternal(view, number, updateHash) {
    currentView = view;

    if (updateHash) {
      const hash = number != null ? `${view}/${number}` : view;
      window.location.hash = hash === 'home' ? '' : hash;
    }

    let html = '';

    if (view === 'home') {
      html = Renderer.renderHome(parables, miracles);
      setActiveNav('home');
    } else if (view === 'parables') {
      if (number != null) {
        html = Renderer.renderChapter(parables, 'parables', number);
      } else {
        html = Renderer.renderBookIndex(parables, 'parables');
      }
      setActiveNav('parables');
    } else if (view === 'miracles') {
      if (number != null) {
        html = Renderer.renderChapter(miracles, 'miracles', number);
      } else {
        html = Renderer.renderBookIndex(miracles, 'miracles');
      }
      setActiveNav('miracles');
    } else if (view === 'lesson') {
      if (number != null) {
        html = Renderer.renderChapter(miracles, 'lesson', number);
      } else {
        html = Renderer.renderBookIndex(miracles, 'miracles');
      }
      setActiveNav('miracles');
    }

    root().innerHTML = html;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Re-sync theme icon after every render (it's in the nav, which is static)
    syncThemeIcon();
  }

  function setActiveNav(view) {
    document.querySelectorAll('.nav__link').forEach(el => {
      el.classList.toggle('active', el.dataset.view === view);
    });
  }

  // ── Theme Toggle ──────────────────────────────────────────
  function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? '' : 'dark');
    localStorage.setItem('bibleStudiesTheme', newTheme);
    const icon = document.getElementById('theme-icon');
    if (icon) icon.textContent = isDark ? '🌙' : '☀️';
  }

  function syncThemeIcon() {
    const icon = document.getElementById('theme-icon');
    if (!icon) return;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    icon.textContent = isDark ? '☀️' : '🌙';
  }

  // ── Language Toggle ───────────────────────────────────────
  function toggleLang() {
    currentLang = currentLang === 'en' ? 'te' : 'en';
    const btn = document.getElementById('lang-toggle');
    if (btn) {
      btn.textContent = currentLang === 'en' ? '🌐 తెలుగు' : '🌐 English';
    }
    if (currentLang === 'te') {
      showTeluguNotice();
    } else {
      navigateInternal(currentView, null, false);
    }
  }

  function showTeluguNotice() {
    root().innerHTML = `
      <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;padding-top:100px">
        <div style="max-width:500px;text-align:center">
          <div style="font-size:3rem;margin-bottom:16px">🙏</div>
          <h2 style="font-family:'Playfair Display',serif;color:var(--text-primary);margin-bottom:16px">Telugu Content Coming Soon</h2>
          <p style="color:var(--text-muted);line-height:1.7;margin-bottom:24px">
            తెలుగు పుస్తకాలు త్వరలో అందుబాటులోకి వస్తాయి.<br>
            Telugu books will be added soon. The site is fully prepared to support Telugu content.
          </p>
          <button onclick="App.toggleLang()" style="padding:12px 24px;background:var(--accent-soft);border:1.5px solid var(--border-active);border-radius:8px;color:var(--accent);font-size:0.9rem;cursor:pointer;font-family:'Inter',sans-serif;">
            ← Back to English
          </button>
        </div>
      </div>
    `;
  }

  return { init, navigate, toggleLang, toggleTheme };
})();

// ── Start ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', App.init);
