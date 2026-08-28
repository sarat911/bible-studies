# Maintenance & Continuation Guide

This guide explains how to maintain the **Bible Studies** project and resume work in future sessions using **Antigravity IDE**.

---

## 1. Project URLs & Repositories

- **Live Custom Domain:** [https://prasadbiblestudy.com](https://prasadbiblestudy.com)
- **Cloudflare Pages URL:** [https://bible-studies.pages.dev](https://bible-studies.pages.dev)
- **GitHub Repository:** [https://github.com/sarat911/bible-studies](https://github.com/sarat911/bible-studies)
- **Local Directory:** `/Users/saratpalukurty/Documents/SaratShare/Code/Antigravity/Bible Works/website`

---

## 2. How to Trigger Work in Antigravity IDE in Future

Whenever you want to add content, fix typos, or update features:
1. Open the project folder in Antigravity IDE:
   `/Users/saratpalukurty/Documents/SaratShare/Code/Antigravity`
2. Start a chat with Antigravity and describe what you want to change (e.g., *"Update Miracle 10 text in Telugu"*, *"Add new book"*, etc.).
3. Antigravity will:
   - Read the existing data structure and documentation.
   - Make the targeted edits to the JSON data and re-bundle `data.js`.
   - Test and verify locally.
   - Commit and push to GitHub so Cloudflare updates automatically.

---

## 3. How Data is Structured

- **English Parables:** `website/data/parables.json`
- **Telugu Parables:** `website/data/parables_te.json`
- **English Miracles & Lessons:** `website/data/miracles.json`
- **Telugu Miracles & Lessons:** `website/data/miracles_te.json`
- **Bundled Offline Store:** `website/js/data.js`

### Re-bundling Script:
Whenever JSON files are edited, run this one-line command to re-bundle `data.js`:
```bash
python3 -c "
import json
p_en = json.load(open('website/data/parables.json'))
p_te = json.load(open('website/data/parables_te.json'))
m_en = json.load(open('website/data/miracles.json'))
m_te = json.load(open('website/data/miracles_te.json'))

bundle = f'''// ── Inline Data Bundle (Bilingual: English & Telugu) ─────────
const DataStore = (() => {{
  const _parables_en = {json.dumps(p_en, ensure_ascii=False)};
  const _parables_te = {json.dumps(p_te, ensure_ascii=False)};
  const _miracles_en = {json.dumps(m_en, ensure_ascii=False)};
  const _miracles_te = {json.dumps(m_te, ensure_ascii=False)};

  async function getParables(lang = 'en') {{ return lang === 'te' ? _parables_te : _parables_en; }}
  async function getMiracles(lang = 'en') {{ return lang === 'te' ? _miracles_te : _miracles_en; }}

  return {{ getParables, getMiracles }};
}})();'''

open('website/js/data.js', 'w').write(bundle)
"
```

---

## 4. Git & Cloudflare Deployment

To deploy any changes:
```bash
cd "website"
git add -A
git commit -m "Describe your changes"
git push origin main
```
Cloudflare Pages will automatically detect the push, rebuild, and update `prasadbiblestudy.com` within 30–60 seconds.
