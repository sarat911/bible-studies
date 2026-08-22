# Bible Studies by P.D.V. Prasad

🌐 **Live site:** https://prasadbiblestudy.com  
☁️ **Also available at:** https://bible-studies.pages.dev

A personal study of the Parables and Miracles of Jesus Christ by **Palukurty Deva Vara Prasad**, Visakhapatnam, India.

## 📖 Contents
- **28 Parables** taught by Jesus Christ (from the four Gospels)
- **34 Miracles & Healings** performed by Jesus Christ
- **18 Thematic Lessons** drawn from the miracles

## 🌐 Hosting on GitHub Pages (Free)

### Step 1: Create a GitHub Account
Go to https://github.com and sign up (free).

### Step 2: Create a New Repository
- Click the **+** icon → **New repository**
- Name it: `bible-studies` (or any name you like)
- Set it to **Public**
- Click **Create repository**

### Step 3: Push this website
Open Terminal and run:
```bash
cd path/to/this/website/folder
git remote add origin https://github.com/YOUR_USERNAME/bible-studies.git
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages
- Go to your repository on GitHub
- Click **Settings** → **Pages** (in the left sidebar)
- Under **Source**, select **Deploy from a branch**
- Choose **main** branch, **/ (root)** folder
- Click **Save**

### Step 5: Your site is live!
After a minute, visit: `https://YOUR_USERNAME.github.io/bible-studies`

---

## 🛠 Running Locally
```bash
cd website
python3 -m http.server 8181
# Then open http://localhost:8181
```

## 📁 File Structure
```
website/
├── index.html          # Main HTML (SPA shell)
├── css/
│   └── style.css       # Full design system
├── js/
│   ├── app.js          # SPA router
│   ├── render.js       # View renderers
│   └── data.js         # Data loading
└── data/
    ├── parables.json   # 28 parables content
    └── miracles.json   # 34 miracles + 18 lessons content
```

## 🌏 Telugu Support
The site has a language toggle button (🌐 తెలుగు) in the navigation. When Telugu documents are ready, add a `data/parables_te.json` and `data/miracles_te.json` and update `js/data.js` accordingly.
