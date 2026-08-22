# Maintenance Guide — Bible Studies Website

> How to pick up where we left off, make changes, and keep the site running.

---

## 🔁 How to Retrigger This Work in Antigravity IDE

### Step 1 — Open the project folder

1. Launch **Antigravity IDE** on your Mac
2. Click **File → Open Folder**
3. Navigate to and select:
   ```
   /Users/saratpalukurty/Documents/SaratShare/Code/Antigravity/Bible Works
   ```

### Step 2 — Open the Sidebar Chat

- Click the **Antigravity chat icon** in the left sidebar
  (or press `Cmd + Shift + I`)

### Step 3 — Reference this conversation for full context

The AI can read the full history of everything we built together.
Start your message with this conversation ID:

```
@68b561cf-765d-4a18-b7df-8d02890da62b

[your request here]
```

**Example prompts:**

```
@68b561cf-765d-4a18-b7df-8d02890da62b
Add the Telugu parables — here is the document: [attach file]
```

```
@68b561cf-765d-4a18-b7df-8d02890da62b
Add a new parable, number 29 called "Parable of the Vineyard Workers". Details: ...
```

```
@68b561cf-765d-4a18-b7df-8d02890da62b
Can you update the About section with a photo of my father?
```

> **Why this works:** Antigravity IDE stores the full transcript of this
> conversation. When you include the `@conversation-id`, the AI agent
> automatically reads the history — it knows the file structure, design
> decisions, JSON schema, and deployment setup — no need to re-explain anything.

---

## 🌐 Live Site

| | |
|---|---|
| 🌐 **Primary** | https://prasadbiblestudy.com |
| ☁️ **Backup** | https://bible-studies.pages.dev |
| 📦 **Code** | https://github.com/sarat911/bible-studies |

---

## 📁 Key Files

| File | What it is |
|---|---|
| `website/index.html` | The website shell — open this to view locally |
| `website/js/data.js` | All content embedded here (auto-generated) |
| `website/data/parables.json` | Edit this to update parable content |
| `website/data/miracles.json` | Edit this to update miracles/lessons |
| `website/css/style.css` | All colours, fonts, layout |
| `website/DOCUMENTATION.md` | Full technical reference |

---

## ✏️ Making Changes — Quick Reference

### A. Push changes to the live site

Open Terminal and run:
```bash
cd "/Users/saratpalukurty/Documents/SaratShare/Code/Antigravity/Bible Works/website"
git add -A
git commit -m "Describe what you changed"
git push
```
Cloudflare Pages auto-deploys within ~30 seconds.

### B. Rebuild data.js after editing a JSON file

```bash
cd "/Users/saratpalukurty/Documents/SaratShare/Code/Antigravity/Bible Works"
python3 - << 'EOF'
import json
with open('website/data/parables.json', 'r', encoding='utf-8') as f:
    parables = json.load(f)
with open('website/data/miracles.json', 'r', encoding='utf-8') as f:
    miracles = json.load(f)
bundle = """const DataStore = (() => {
  const _parables = """ + json.dumps(parables, ensure_ascii=False) + """;
  const _miracles = """ + json.dumps(miracles, ensure_ascii=False) + """;
  async function getParables() { return _parables; }
  async function getMiracles() { return _miracles; }
  return { getParables, getMiracles };
})();"""
with open('website/js/data.js', 'w', encoding='utf-8') as f:
    f.write(bundle)
print("data.js rebuilt!")
EOF
```

---

## 🌏 Adding Telugu Content (When Ready)

1. Prepare a Telugu `.docx` document
2. Open Antigravity IDE, reference this conversation:
   ```
   @68b561cf-765d-4a18-b7df-8d02890da62b
   Please extract and add the Telugu content from this document: [attach file]
   ```
3. The AI will extract, structure, and wire it in — the site is already built for it

---

## 📺 Enable YouTube Videos to Play Inline

Currently clicking a video opens YouTube in a new tab (embedding was restricted).
To enable in-site playback for your father's videos:

1. Go to https://studio.youtube.com
2. **Content** → click the **pencil (edit)** icon on each video
3. **More options** tab → tick **"Allow embedding"** ✅ → Save
4. Then ask the AI to restore inline playback:
   ```
   @68b561cf-765d-4a18-b7df-8d02890da62b
   YouTube embedding is now enabled on all videos.
   Please restore inline video playback on the site.
   ```

---

## 🛠️ Project Summary

| | |
|---|---|
| **Conversation ID** | `68b561cf-765d-4a18-b7df-8d02890da62b` |
| **Built on** | 22 August 2026 |
| **Tech stack** | HTML · Vanilla CSS · Vanilla JavaScript |
| **Hosting** | Cloudflare Pages (free) |
| **Domain** | prasadbiblestudy.com |
| **Source** | github.com/sarat911/bible-studies |
| **Content** | 28 Parables · 34 Miracles · 19 Lessons |

---

*May this work bring glory to God and be a blessing to all who read it. 🙏*
