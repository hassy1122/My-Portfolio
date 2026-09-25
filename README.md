# My Portfolio (Day/Night)

A single-page personal portfolio with a day/night theme, scroll animations, an optional 3D
character, an admin panel for editing content in the browser, and a downloadable CV.
No build step — plain HTML, CSS and JavaScript.

## Quick start

1. Open `Complete projects/run-directly/portfolio-daynight/index.html` in your browser.
2. Edit text, projects and certificates through the admin panel (🔒 button in the footer, or add
   `#admin` to the URL).
3. Publish edits for everyone: admin panel → **CV tab** → **Export site-data.js (publish)** →
   replace `site-data.js` in the project folder → redeploy.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page structure, text, SEO/meta tags |
| `style.css` | Design tokens, dark/light themes, layout, responsive rules |
| `script.js` | Data model, rendering, admin panel, publishing |
| `site-data.js` | Published content snapshot loaded by visitors |
| `assets/` | Animations, optional 3D character, CV PDF |
| `images/` | Profile photo and certificate images |

## Deploy

Import the repo into Vercel with framework preset **Other**. The site lives in a sub-folder, so
`vercel.json` at the repository root sets:

```json
{ "outputDirectory": "Complete projects/run-directly/portfolio-daynight" }
```

Without it Vercel serves the repo root (no `index.html`) and returns **404 NOT_FOUND**.

## Full build guide

Step-by-step instructions to rebuild this project from scratch and understand every file —
written for non-coders:

**[portfolio-daynight/README.md](Complete%20projects/run-directly/portfolio-daynight/README.md)**
