# Bible Studies Website — Complete Technical & Content Documentation

**Live URL:** [https://prasadbiblestudy.com](https://prasadbiblestudy.com)  
**Backup URL:** [https://bible-studies.pages.dev](https://bible-studies.pages.dev)  
**GitHub Repository:** [https://github.com/sarat911/bible-studies](https://github.com/sarat911/bible-studies)  
**Author:** Palukurty Deva Vara Prasad, Visakhapatnam - 530017  

---

## 1. Project Overview

A modern, fast, bilingual (English & Telugu) web application dedicated to presenting the Bible Studies authored by **Palukurty Deva Vara Prasad**:
1. **Book One: Parables by Jesus Christ (ఉపమానములు)** — 28 Parable chapters with Scripture passages, Spiritual Meditations, Prayers, and YouTube video teachings.
2. **Book Two: Miracles & Healings by Jesus Christ (అద్భుతములు మరియు స్వస్థత కార్యములు)** — 34 Miracles (Part 1) and 18/19 Thematic Lessons from the Miracles (Part 2) with prayers and YouTube video links.

---

## 2. Architecture & File Structure

```
Bible Works/
├── parables.docx               # Original English Word Document (Parables)
├── Miracles-part-1&2..docx     # Original English Word Document (Miracles & Lessons)
├── Upamaanamulu  (1).docx      # Original Telugu Word Document (Parables)
├── adbutamulu (1&2).docx       # Original Telugu Word Document (Miracles & Lessons)
├── data/                       # Backup JSON source files
│   ├── parables.json           # English Parables JSON (28 chapters)
│   ├── parables_te.json        # Telugu Parables JSON (28 chapters)
│   ├── miracles.json           # English Miracles & Lessons JSON (34 + 19 chapters)
│   └── miracles_te.json        # Telugu Miracles & Lessons JSON (34 + 18 chapters)
└── website/                    # Production Website Root (Deployed to Cloudflare)
    ├── index.html              # Single Page Application Entry Point
    ├── css/
    │   └── style.css           # Vanilla CSS Design System (Light/Dark themes + Telugu fonts)
    ├── js/
    │   ├── data.js             # Inlined Data Bundle (English & Telugu DataStore)
    │   ├── render.js           # Bilingual Renderer & Localized Templates (i18n)
    │   └── app.js              # SPA Router, Theme Switcher & Language Switcher
    ├── data/                   # Production JSON data files
    │   ├── parables.json
    │   ├── parables_te.json
    │   ├── miracles.json
    │   └── miracles_te.json
    ├── README.md               # Quick overview
    ├── DOCUMENTATION.md        # Comprehensive technical guide
    └── MAINTENANCE_GUIDE.md    # Guide for future updates & IDE sessions
```

---

## 3. Data Schema & Separation Principles

Each chapter follows a strict, deterministic 4-part structure preserving 100% fidelity to the original Word documents:

```json
{
  "number": 1,
  "title": "House built on Rock - House built on Sand",
  "scripture_refs": "(Matthew 7:24-27) (Luke 6:47-49)",
  "scripture": [
    "“Anyone who hears these words of mine and obeys them is like a wise man who built his house on rock...",
    "“And anyone who hears these words of mine and does not obey them is like a foolish man who built his house on sand...”"
  ],
  "meditation": [
    "Jesus Christ concluded his long teaching (from chapter 5 to chapter 7 of Matthew) with this parable...",
    "Building a house signifies long-term vision, stability, and character..."
  ],
  "prayer": "Our heavenly Father, through faith in Jesus Christ we are marked as your children...",
  "youtube": "https://youtu.be/reyFJIMCeR0"
}
```

### Strict Content Segregation Rules:
1. **`scripture` (వాక్య భాగము)**:
   - Contains **only** the Gospel Bible passages, words of Jesus Christ, and the miracle/healing narratives.
   - Dialogue, actions, and concluding words of Jesus are fully retained in Scripture.
2. **`meditation` (ధ్యానము & భావము)**:
   - Begins **strictly** where the author's spiritual explanation, reflections, cross-references, and spiritual lessons start (e.g., *"In this parable..."*, *"ఈ ఉపమానములో..."*).
3. **`prayer` (ప్రార్థన)**:
   - The concluding prayer of each chapter.
4. **`youtube` (వీడియో బోధన)**:
   - The verified direct link to the corresponding video teaching on YouTube.

---

## 4. Bilingual Language Switcher (`🌐 తెలుగు` / `🌐 English`)

- **Instant Switching:** Clicking `🌐 తెలుగు` / `🌐 English` toggles the entire website instantly without reloading.
- **Smart Navigation:** Switching language while reading a specific chapter remains on the same chapter in the selected language.
- **Persistence:** Selected language is saved in `localStorage.getItem('bibleStudiesLang')`.
- **Typography:** Custom Telugu Google Fonts (`Noto Sans Telugu` and `Tiro Telugu`) with generous line-height (`1.9`) for maximum legibility.

---

## 5. Summary of Verified Chapters

| Section | English Chapters | Telugu Chapters | Status |
|---|:---:|:---:|:---:|
| **Parables (Book 1)** | 28 | 28 | ✅ 100% Complete & Verified |
| **Miracles (Book 2, Part 1)** | 34 | 34 | ✅ 100% Complete & Verified |
| **Thematic Lessons (Book 2, Part 2)** | 19 | 18 | ✅ 100% Complete & Verified |
| **Total Chapters** | **81** | **80** | **161 / 161 Chapters Live** |

---

## 6. Hosting, Domain & Deployment

- **Custom Domain:** `prasadbiblestudy.com` (Configured with Cloudflare DNS and automatic SSL).
- **Hosting:** Cloudflare Pages connected to `sarat911/bible-studies` GitHub repository.
- **Auto-Deployment:** Every `git push origin main` triggers an automatic build and deploys worldwide within ~30 seconds.
- **Offline / Local Support:** All data is inlined in `js/data.js` so double-clicking `index.html` locally in any browser works with zero setup and no local web server needed.

---

## 7. How to Update in the Future

### To edit text or fix typos:
1. Edit the corresponding JSON file in `website/data/`:
   - `parables.json` (English Parables)
   - `parables_te.json` (Telugu Parables)
   - `miracles.json` (English Miracles & Lessons)
   - `miracles_te.json` (Telugu Miracles & Lessons)
2. Re-bundle `data.js` using Python or the update script.
3. Commit and push:
   ```bash
   git add -A
   git commit -m "Update content"
   git push origin main
   ```
