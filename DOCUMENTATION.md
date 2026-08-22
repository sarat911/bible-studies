# Bible Studies by P.D.V. Prasad — Documentation

> A complete reference for understanding, maintaining, and extending this website.

| | |
|---|---|
| 🌐 **Live URL** | https://prasadbiblestudy.com |
| ☁️ **Backup URL** | https://bible-studies.pages.dev |
| 📦 **Source code** | https://github.com/sarat911/bible-studies |
| 🏠 **Hosting** | Cloudflare Pages (free) |
| 🔒 **SSL** | Automatic via Cloudflare |

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [File Structure](#2-file-structure)
3. [How the Site Works](#3-how-the-site-works)
4. [Opening the Site Locally](#4-opening-the-site-locally)
5. [How Content is Structured](#5-how-content-is-structured)
6. [Adding or Editing Content](#6-adding-or-editing-content)
7. [Adding Telugu Content](#7-adding-telugu-content)
8. [Dark Mode & Theming](#8-dark-mode--theming)
9. [Deploying to GitHub Pages](#9-deploying-to-github-pages)
10. [YouTube Videos](#10-youtube-videos)
11. [Troubleshooting](#11-troubleshooting)

---

## 1. Project Overview

This is a **static website** (no server required) that presents the Bible study writings of
**Palukurty Deva Vara Prasad**, Visakhapatnam. It contains two books:

| Book | Contents |
|---|---|
| **Parables by Jesus Christ** | 28 parables from the four Gospels, each with scripture, meditation, prayer, and a YouTube link |
| **Miracles & Healings by Jesus Christ** | 34 miracles + 19 thematic lessons drawn across all miracles |

**Key design goals:**
- Works by simply double-clicking `index.html` — no internet or server needed to open
- Dark mode by default (with a toggle for light mode)
- Telugu language ready (content can be added later)
- Shareable deep links to any chapter (e.g. `index.html#parables/5`)

---

## 2. File Structure

```
Bible Works/
│
├── website/                        ← The actual website lives here
│   ├── index.html                  ← Entry point — open this to view the site
│   ├── README.md                   ← Short hosting guide
│   ├── DOCUMENTATION.md            ← This file
│   │
│   ├── css/
│   │   └── style.css               ← All styling (light + dark themes, layout, typography)
│   │
│   ├── js/
│   │   ├── data.js                 ← All content embedded here (parables + miracles JSON)
│   │   ├── render.js               ← Builds the HTML for each view (Home, Book Index, Chapter)
│   │   └── app.js                  ← Page routing, navigation, dark mode, language toggle
│   │
│   └── data/                       ← Source JSON files (also used to rebuild data.js)
│       ├── parables.json           ← 28 parables structured data
│       └── miracles.json           ← 34 miracles + 19 lessons structured data
│
├── data/                           ← Original extracted JSON (same content as website/data/)
│   ├── parables.json
│   └── miracles.json
│
├── Miracles-part-1&2..docx        ← Original Word document (Miracles book)
├── parables.docx                   ← Original Word document (Parables book)
│
└── (Python extraction scripts are stored separately in the AI scratch folder)
```

---

## 3. How the Site Works

This is a **Single Page Application (SPA)** — there is only one HTML file. JavaScript
swaps out the content depending on what you click.

### Architecture

```
index.html  (shell — nav bar + empty <main> container)
    │
    ├── js/data.js      ← Loads all content (parables + miracles) into memory
    ├── js/render.js    ← Converts content objects into HTML strings
    └── js/app.js       ← Router: decides WHAT to render based on navigation
```

### Navigation Flow

```
User clicks "Parables"
    → app.js calls navigate('parables')
    → app.js calls render.js → renderBookIndex(parables)
    → HTML string injected into <main id="app-root">
    → URL hash updated to #parables

User clicks Parable #5
    → app.js calls navigate('parables', 5)
    → app.js calls render.js → renderChapter(parables, 'parables', 5)
    → HTML string injected into <main>
    → URL hash updated to #parables/5
```

### Deep Linking

Every page has a URL hash. You can bookmark or share:
- `index.html#parables`       → Parables index
- `index.html#parables/14`    → Parable of the Good Samaritan
- `index.html#miracles`       → Miracles index
- `index.html#miracles/28`    → Giving life to Lazarus
- `index.html#lesson/3`       → Thematic Lesson: Righteousness and obedience

---

## 4. Opening the Site Locally

### Simplest way — double-click
Just double-click `website/index.html`. It opens in your browser and works fully offline.

### Via a local server (optional, for testing)
```bash
cd "path/to/Bible Works/website"
python3 -m http.server 8181
# Then open: http://localhost:8181
```

---

## 5. How Content is Structured

All content lives in `js/data.js` as embedded JavaScript objects. The source of truth
is also saved separately in `data/parables.json` and `data/miracles.json`.

### Parable object structure

```json
{
  "number": 14,
  "title": "Parable on the Good Samaritan",
  "scripture_refs": "(Luke 10:30-37)",
  "body": [
    "First paragraph of the scripture or explanation...",
    "Second paragraph...",
    "..."
  ],
  "prayer": "Our heavenly Father, teach us to love our neighbours...",
  "youtube": "https://youtu.be/XXXXXXXXXXX"
}
```

### Miracle object structure

Same fields as above. Thematic lessons follow the same structure but have no
`scripture_refs` (or an empty string).

### Top-level book structure (parables.json)

```json
{
  "book": "Parables by Jesus Christ",
  "author": "Palukurty Deva Vara Prasad",
  "address": "2-47-2, Sector 11, MVP Colony, Visakhapatnam-530017",
  "preamble": ["paragraph 1", "paragraph 2", "..."],
  "toc": [{ "number": 1, "description": "..." }],
  "parables": [ ...array of 28 parable objects... ],
  "acknowledgements": ["paragraph 1", "..."]
}
```

---

## 6. Adding or Editing Content

### Option A — Edit the JSON directly (easiest)

1. Open `website/data/parables.json` in any text editor (e.g. Notepad, TextEdit, VS Code)
2. Find the parable/miracle by its `"number"` field
3. Edit the `"body"` array, `"prayer"`, `"title"`, or `"youtube"` field
4. Save the file
5. Run the rebuild script (see below) to update `data.js`

> **Do NOT edit `js/data.js` by hand** — it is auto-generated and very large.

### Rebuilding data.js after editing JSON

After editing the JSON files, run this command from the `Bible Works` folder:

```bash
python3 - << 'EOF'
import json

with open('website/data/parables.json', 'r', encoding='utf-8') as f:
    parables = json.load(f)

with open('website/data/miracles.json', 'r', encoding='utf-8') as f:
    miracles = json.load(f)

bundle = f"""// Auto-generated — edit the JSON files in website/data/ then run rebuild
const DataStore = (() => {{
  const _parables = {json.dumps(parables, ensure_ascii=False)};
  const _miracles = {json.dumps(miracles, ensure_ascii=False)};
  async function getParables() {{ return _parables; }}
  async function getMiracles() {{ return _miracles; }}
  return {{ getParables, getMiracles }};
}})();
"""

with open('website/js/data.js', 'w', encoding='utf-8') as f:
    f.write(bundle)
print("data.js rebuilt successfully!")
EOF
```

### Option B — Add a brand new parable or miracle

1. Open the appropriate JSON file (`parables.json` or `miracles.json`)
2. Add a new object to the `"parables"` or `"miracles"` array, following the structure in Section 5
3. Give it the next sequential `"number"`
4. Rebuild `data.js` using the script above
5. The new entry will automatically appear in the chapter grid

---

## 7. Adding Telugu Content

The site already has a **🌐 తెలుగు** button in the navigation bar.
Currently it shows a "coming soon" message. Here is how to activate it:

### Step 1 — Create Telugu JSON files

Create `website/data/parables_te.json` and `website/data/miracles_te.json`
using the same structure as the English versions, but with Telugu text
in the `title`, `body`, `prayer`, and `scripture_refs` fields.

### Step 2 — Update data.js

In `website/js/data.js`, add the Telugu data similarly:

```js
const _parables_te = { /* Telugu parables JSON */ };
const _miracles_te = { /* Telugu miracles JSON */ };

async function getParables(lang) { return lang === 'te' ? _parables_te : _parables; }
async function getMiracles(lang)  { return lang === 'te' ? _miracles_te : _miracles; }
```

### Step 3 — Update app.js

In `app.js`, the `toggleLang()` function currently shows the "coming soon" notice.
Replace `showTeluguNotice()` with a call to reload the current view in Telugu:

```js
function toggleLang() {
  currentLang = currentLang === 'en' ? 'te' : 'en';
  // update button label ...
  navigateInternal(currentView, null, false);   // re-render in new language
}
```

And pass `currentLang` wherever `DataStore.getParables()` / `DataStore.getMiracles()` is called.

---

## 8. Dark Mode & Theming

### Toggling

Click the **☀️ / 🌙 toggle** in the top-right of the navigation bar.
Your preference is saved in `localStorage` under the key `bibleStudiesTheme`.

- Dark mode is the **default**
- If you clear browser storage, the site returns to dark mode

### Customising Colours

All colours are CSS custom properties (variables) in `css/style.css`.

**Light mode** — defined in `:root { ... }`:
```css
--accent:        #2d7dd2;   /* main blue */
--teal:          #0ea5c8;   /* secondary teal */
--bg-body:       #f5f9ff;   /* page background */
--text-primary:  #12325a;   /* headings */
--text-secondary:#3a5f85;   /* body text */
```

**Dark mode** — defined in `[data-theme="dark"] { ... }`:
```css
--accent:        #60a5fa;   /* lighter blue for dark backgrounds */
--teal:          #38bdf8;
--bg-body:       #0f1428;   /* dark navy background */
--text-primary:  #eef4fd;   /* near-white headings */
--text-secondary:#cdddf0;   /* light blue-white body text */
```

To change the site to a different colour (e.g. green), just replace the
`--accent` and `--teal` values in both blocks.

### Fonts

Fonts are loaded from Google Fonts (requires internet):

| Font | Used for |
|---|---|
| `Playfair Display` | Headings, chapter numbers, scripture quotes |
| `Lora` | Scripture blockquotes, prayer boxes |
| `Inter` | All body text, navigation, labels |

To change a font, update the `@import url(...)` line at the top of `style.css`
and replace the font name in the `font-family` declarations.

---

## 9. Deploying to GitHub Pages

GitHub Pages hosts the site for **free** with a public URL.

### First-time setup

**Step 1 — Create a GitHub account**
Go to https://github.com and sign up (free).

**Step 2 — Create a new repository**
- Click **+** → **New repository**
- Name: `bible-studies` (or any name)
- Visibility: **Public**
- Click **Create repository**

**Step 3 — Push the website folder**

Open Terminal and run:
```bash
cd "/path/to/Bible Works/website"
git remote add origin https://github.com/YOUR_USERNAME/bible-studies.git
git branch -M main
git push -u origin main
```

**Step 4 — Enable GitHub Pages**
- In your repository on GitHub → **Settings** → **Pages**
- Source: **Deploy from a branch**
- Branch: **main**, folder: **/ (root)**
- Click **Save**

**Step 5 — Your site is live!**

Wait ~1 minute, then visit:
`https://YOUR_USERNAME.github.io/bible-studies`

### Updating the live site after changes

After editing any files, run:
```bash
cd "/path/to/Bible Works/website"
git add -A
git commit -m "Describe your changes here"
git push
```

GitHub Pages automatically rebuilds within ~1 minute.

---

## 10. YouTube Videos

Each chapter shows the video thumbnail from YouTube. Clicking it opens the video
on YouTube in a new tab.

### Why it doesn't play inline

YouTube's **Error 153** appears when a video's "Allow embedding" setting is off.
This is a per-video setting on the YouTube channel.

### To enable inline playback for your videos

1. Go to https://studio.youtube.com
2. Click **Content** in the left menu
3. Click the **pencil (edit) icon** on a video
4. Go to the **More options** tab
5. Make sure **"Allow embedding"** is checked ✅
6. Click **Save**
7. Repeat for each video

Once enabled, the site can be updated to play videos inline (let your developer know).

### Adding or updating a YouTube link

In `website/data/parables.json` (or `miracles.json`), find the relevant entry
and update the `"youtube"` field with the new URL:

```json
"youtube": "https://youtu.be/YOUR_VIDEO_ID"
```

Then rebuild `data.js` using the script in Section 6.

---

## 11. Troubleshooting

| Problem | Solution |
|---|---|
| **Blank page / site doesn't load** | Make sure you're opening `index.html` inside the `website/` folder, not the parent folder |
| **Old version still showing** | Hard refresh: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows) |
| **Dark mode not applying** | Clear browser site data: browser menu → Settings → Privacy → Clear browsing data |
| **YouTube video gives Error 153** | See Section 10 — embedding needs to be enabled on the YouTube channel |
| **Fonts look wrong / plain** | The fonts require an internet connection to load from Google. Offline = fallback fonts |
| **Changes to JSON not showing** | You must rebuild `data.js` after editing JSON (see Section 6) |
| **Telugu button shows "coming soon"** | Telugu content has not been added yet — see Section 7 |

---

*Documentation prepared for Bible Studies by P.D.V. Prasad · Visakhapatnam, India*
