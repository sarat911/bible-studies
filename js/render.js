
// ── Renderer ───────────────────────────────────────────────
// Builds HTML for each view from JSON data

const Renderer = (() => {

  // ── Helpers ──────────────────────────────────────────────

  function esc(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function youtubeId(url) {
    if (!url) return null;
    const m = url.match(/(?:youtu\.be\/|v=|\/embed\/)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : null;
  }

  function youtubeThumbnail(url) {
    const id = youtubeId(url);
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
  }

  function stars() {
    let html = '';
    const positions = [
      [10,15],[25,40],[40,10],[60,25],[75,50],[85,15],[90,70],
      [15,65],[50,80],[70,8],[30,90],[5,50],[95,40],[45,5],[80,90],
    ];
    positions.forEach(([top, left], i) => {
      const size = Math.random() * 2 + 1;
      const delay = (i * 0.4) % 4;
      const dur = 3 + (i % 3);
      html += `<div class="hero__star" style="top:${top}%;left:${left}%;width:${size.toFixed(1)}px;height:${size.toFixed(1)}px;animation-delay:${delay}s;animation-duration:${dur}s"></div>`;
    });
    return html;
  }

  // ── HOME PAGE ─────────────────────────────────────────────

  function renderHome(parables, miracles) {
    return `
      <section class="hero fade-in" id="home">
        <div class="hero__bg"></div>
        <div class="hero__orb hero__orb--1"></div>
        <div class="hero__orb hero__orb--2"></div>
        <div class="hero__orb hero__orb--3"></div>
        <div class="hero__stars">${stars()}</div>
        <div class="hero__content">
          <div class="hero__badge">✦ A Personal Study of the Word ✦</div>
          <h1 class="hero__title">Bible Studies<br>by P.D.V. Prasad</h1>
          <p class="hero__subtitle">Meditations on the Parables and Miracles of Jesus Christ</p>
          <p class="hero__author">Written by <strong>Palukurty Deva Vara Prasad</strong> &nbsp;·&nbsp; Visakhapatnam, India</p>

          <blockquote class="hero__verse">
            "Your word is a lamp to guide me and a light for my path."
            <cite>— Psalm 119:105</cite>
          </blockquote>

          <div class="hero__books stagger">
            <div class="book-card" id="card-parables" onclick="App.navigate('parables')">
              <div class="book-card__icon">📖</div>
              <div class="book-card__label">Book One</div>
              <div class="book-card__title">Parables by Jesus Christ</div>
              <p class="book-card__desc">A meditative study of the stories Jesus told — each revealing a deep truth about the Kingdom of God and how to live in His love.</p>
              <div class="book-card__meta">
                <span class="badge">📜 ${parables.parables.length} Parables</span>
                <span class="badge">▶ With Video</span>
              </div>
              <div class="book-card__arrow">→</div>
            </div>

            <div class="book-card" id="card-miracles" onclick="App.navigate('miracles')">
              <div class="book-card__icon">✨</div>
              <div class="book-card__label">Book Two</div>
              <div class="book-card__title">Miracles & Healings by Jesus Christ</div>
              <p class="book-card__desc">An inspiring study of the 34 miracles performed by Jesus, and 18 timeless spiritual lessons drawn from these acts of grace.</p>
              <div class="book-card__meta">
                <span class="badge">✦ ${miracles.miracles.length} Miracles</span>
                <span class="badge">💡 18 Lessons</span>
                <span class="badge">▶ With Video</span>
              </div>
              <div class="book-card__arrow">→</div>
            </div>
          </div>
        </div>
      </section>

      <section class="about" id="about">
        <div class="container">
          <div class="section-header slide-up">
            <div class="section-header__eyebrow">About the Author</div>
            <h2 class="section-header__title">Palukurty Deva Vara Prasad</h2>
            <p class="section-header__sub">A brother in the Holy Spirit, writing from Visakhapatnam, India</p>
          </div>

          <div class="author-card slide-up">
            <div class="author-card__avatar">P</div>
            <div>
              <div class="author-card__name">Palukurty Deva Vara Prasad</div>
              <div class="author-card__location">📍 2-47-2, Sector 11, MVP Colony, Visakhapatnam - 530017</div>
              <p class="author-card__bio">
                "While meditating the Word of God every day in the Bible, I felt an inspiration to list out and meditate on the parables and their meanings taught by Jesus Christ in the four Gospels, and to make a small effort to place them before the readers."
                <br><br>
                "While meditating on the parables and preparing this small book, I realized a wonderful change in my own attitude, that helped me to be happy, with peace and contentment, and enjoy the Word of God. I thank God for giving me such inspiration, in the name of Jesus Christ."
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer class="footer">
        <p class="footer__text">Bible Studies by <strong>P.D.V. Prasad</strong> · Visakhapatnam, India</p>
        <div class="footer__divider"></div>
        <p class="footer__verse">"The Word already existed; He was with God, and He was the same as God." — John 1:1</p>
      </footer>
    `;
  }

  // ── BOOK INDEX PAGE ───────────────────────────────────────

  function renderBookIndex(book, type) {
    const isParables = type === 'parables';
    const items = isParables ? book.parables : book.miracles;
    const lessons = !isParables ? book.thematic_lessons : [];

    const itemCards = items.map((item, idx) => {
      const ytId = youtubeId(item.youtube);
      return `
        <div class="chapter-card slide-up" id="chapter-card-${type}-${item.number}"
          onclick="App.navigate('${type}', ${item.number})"
          style="animation-delay:${(idx % 6) * 0.05}s">
          <div class="chapter-card__num">${item.number}</div>
          <div class="chapter-card__body">
            <div class="chapter-card__title">${esc(item.title)}</div>
            <div class="chapter-card__ref">${esc(item.scripture_refs)}</div>
          </div>
          ${ytId ? `<div class="chapter-card__yt" title="Video available">▶</div>` : ''}
        </div>
      `;
    }).join('');

    const lessonCards = lessons.map((item, idx) => `
      <div class="chapter-card slide-up" id="lesson-card-${item.number}"
        onclick="App.navigate('lesson', ${item.number})"
        style="animation-delay:${(idx % 6) * 0.05}s">
        <div class="chapter-card__num">${item.number}</div>
        <div class="chapter-card__body">
          <div class="chapter-card__title">${esc(item.title)}</div>
          <div class="chapter-card__ref">Thematic lesson from the miracles</div>
        </div>
      </div>
    `).join('');

    const preambleSnippet = (book.preamble || []).slice(0, 3).join(' ').substring(0, 280) + '...';

    return `
      <div class="page fade-in" id="page-${type}">
        <div class="page-hero">
          <div class="page-hero__inner">
            <div class="page-hero__back" onclick="App.navigate('home')">← Back to Home</div>
            <h1 class="page-hero__title">${esc(book.book)}</h1>
            <p class="page-hero__desc">${esc(preambleSnippet)}</p>
            <div class="page-hero__stats">
              <div class="stat-pill">
                <span class="stat-pill__num">${items.length}</span>
                ${isParables ? 'Parables' : 'Miracles & Healings'}
              </div>
              ${!isParables ? `<div class="stat-pill"><span class="stat-pill__num">${lessons.length - 1}</span> Thematic Lessons</div>` : ''}
              <div class="stat-pill">📖 ${esc(book.author)}</div>
            </div>
          </div>
        </div>

        <div class="chapter-grid">
          <div class="chapter-grid__section-title">${isParables ? 'All Parables' : 'Miracles & Healings'}</div>
          <div class="chapter-grid__items">${itemCards}</div>

          ${!isParables && lessonCards ? `
            <div class="chapter-grid__section-title">Thematic Lessons from the Miracles</div>
            <div class="chapter-grid__items">${lessonCards}</div>
          ` : ''}
        </div>

        <footer class="footer">
          <p class="footer__text">Bible Studies by <strong>P.D.V. Prasad</strong> · Visakhapatnam, India</p>
          <div class="footer__divider"></div>
          <p class="footer__verse">"Your word is a lamp to guide me and a light for my path." — Psalm 119:105</p>
        </footer>
      </div>
    `;
  }

  // ── CHAPTER DETAIL PAGE ───────────────────────────────────

  function renderChapter(book, type, number) {
    const isParables = type === 'parables';
    const isLesson = type === 'lesson';
    const items = isLesson ? book.thematic_lessons : (isParables ? book.parables : book.miracles);
    const item = items.find(i => i.number === number);
    if (!item) return `<div class="page"><div class="container" style="padding-top:120px;color:var(--text-muted)">Chapter not found.</div></div>`;

    const itemIndex = items.indexOf(item);
    const prev = items[itemIndex - 1];
    const next = items[itemIndex + 1];

    // Split body: first paragraph(s) that look like scripture vs explanation
    // Scripture is usually the first few paragraphs with quotes
    const bodyParas = item.body || [];

    // Identify scripture paragraphs (contain quotation marks and are near the start)
    let scriptureParas = [];
    let explanationParas = [];
    let inScripture = true;
    bodyParas.forEach((para, i) => {
      const hasQuote = para.includes('"') || para.includes('\u201C') || para.includes('\u201D');
      const isLong = para.length > 100;
      if (inScripture && i < 8 && hasQuote) {
        scriptureParas.push(para);
      } else {
        inScripture = false;
        explanationParas.push(para);
      }
    });

    // If no scripture detected, treat all as explanation
    if (scriptureParas.length === 0) {
      explanationParas = bodyParas;
    }

    const ytId = youtubeId(item.youtube);
    const ytThumb = ytId ? youtubeThumbnail(item.youtube) : null;

    const scriptureHtml = scriptureParas.length > 0 ? `
      <div class="content-section">
        <div class="content-section__label">Scripture</div>
        <div class="scripture-block">
          ${scriptureParas.map(p => `<p>${esc(p)}</p>`).join('')}
        </div>
      </div>
    ` : '';

    const explanationHtml = explanationParas.length > 0 ? `
      <div class="content-section">
        <div class="content-section__label">Meditation & Reflection</div>
        <div class="body-text">
          ${explanationParas.map(p => `<p>${esc(p)}</p>`).join('')}
        </div>
      </div>
    ` : '';

    const prayerHtml = item.prayer ? `
      <div class="content-section">
        <div class="content-section__label">Prayer</div>
        <div class="prayer-box">
          <p>${esc(item.prayer)}</p>
        </div>
      </div>
    ` : '';

    const videoHtml = ytId ? `
      <div class="content-section">
        <div class="content-section__label">Video Teaching</div>
        <a href="${esc(item.youtube)}" target="_blank" rel="noopener" class="video-thumb-link" style="display:block;text-decoration:none;">
          <div style="position:relative;border-radius:12px;overflow:hidden;aspect-ratio:16/9;background:#111;border:1px solid var(--border);transition:border-color 0.3s;" onmouseover="this.style.borderColor='rgba(245,200,66,0.4)'" onmouseout="this.style.borderColor='var(--border)'">
            <img src="${ytThumb}" alt="Video thumbnail" style="width:100%;height:100%;object-fit:cover;opacity:0.85;display:block;" onerror="this.style.display='none'">
            <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;">
              <div style="width:72px;height:72px;border-radius:50%;background:rgba(255,30,30,0.92);display:flex;align-items:center;justify-content:center;font-size:28px;color:#fff;box-shadow:0 4px 24px rgba(0,0,0,0.6);transition:transform 0.2s,box-shadow 0.2s;" onmouseover="this.style.transform='scale(1.1)';this.style.boxShadow='0 6px 32px rgba(0,0,0,0.8)'" onmouseout="this.style.transform='scale(1)';this.style.boxShadow='0 4px 24px rgba(0,0,0,0.6)'">▶</div>
            </div>
            <div style="position:absolute;bottom:0;left:0;right:0;padding:16px 16px 12px;background:linear-gradient(transparent,rgba(0,0,0,0.8));display:flex;align-items:center;justify-content:space-between;">
              <span style="color:#fff;font-size:0.78rem;opacity:0.9;">Opens on YouTube</span>
              <span style="background:rgba(255,30,30,0.9);color:#fff;font-size:0.7rem;font-weight:600;padding:3px 8px;border-radius:3px;letter-spacing:0.03em;">▶ YOUTUBE</span>
            </div>
          </div>
        </a>
        <a href="${esc(item.youtube)}" class="youtube-btn" target="_blank" rel="noopener" style="margin-top:12px;display:inline-flex;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/></svg>
          Watch on YouTube
        </a>
      </div>
    ` : '';

    const bookType = isLesson ? 'miracles' : type;
    const bookLabel = isParables ? 'Parables' : 'Miracles & Healings';
    const sectionLabel = isLesson ? 'Thematic Lessons' : bookLabel;

    const prevBtn = prev ? `
      <div class="chapter-nav__btn chapter-nav__btn--prev" onclick="App.navigate('${type}', ${prev.number})">
        <span class="chapter-nav__btn-icon">←</span>
        <div class="chapter-nav__btn-texts">
          <span class="chapter-nav__btn-label">Previous</span>
          <span class="chapter-nav__btn-title">${esc(prev.title)}</span>
        </div>
      </div>
    ` : '<div></div>';

    const nextBtn = next ? `
      <div class="chapter-nav__btn chapter-nav__btn--next" onclick="App.navigate('${type}', ${next.number})">
        <span class="chapter-nav__btn-icon">→</span>
        <div class="chapter-nav__btn-texts">
          <span class="chapter-nav__btn-label">Next</span>
          <span class="chapter-nav__btn-title">${esc(next.title)}</span>
        </div>
      </div>
    ` : '<div></div>';

    return `
      <div class="chapter-page fade-in" id="chapter-page-${type}-${number}">
        <div class="chapter-header">
          <div class="chapter-header__inner">
            <div class="chapter-header__num-bg">${item.number}</div>
            <div class="chapter-header__breadcrumb">
              <span onclick="App.navigate('home')">Home</span>
              <span class="sep">›</span>
              <span onclick="App.navigate('${bookType}')">${sectionLabel}</span>
              <span class="sep">›</span>
              <span style="color:var(--text-secondary)">#${item.number}</span>
            </div>
            <h1 class="chapter-header__title">${esc(item.title)}</h1>
            ${item.scripture_refs ? `<div class="chapter-header__ref">📖 ${esc(item.scripture_refs)}</div>` : ''}
          </div>
        </div>

        <div class="chapter-content">
          ${scriptureHtml}
          ${explanationHtml}
          ${prayerHtml}
          ${videoHtml}

          <div class="chapter-nav">
            ${prevBtn}
            ${nextBtn}
          </div>
        </div>

        <footer class="footer">
          <p class="footer__text">Bible Studies by <strong>P.D.V. Prasad</strong> · Visakhapatnam, India</p>
          <div class="footer__divider"></div>
          <p class="footer__verse">"Your word is a lamp to guide me and a light for my path." — Psalm 119:105</p>
        </footer>
      </div>
    `;
  }

  return { renderHome, renderBookIndex, renderChapter };
})();
