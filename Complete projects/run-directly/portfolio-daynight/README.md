# Portfolio Day/Night — build it from scratch (step-by-step, no AI needed)

This README is written for someone who has **never coded before**. Follow the steps in order and
you will end up with the same kind of project you see in this folder: a dark/light portfolio site
with a hero, about, services, experience, projects, certificates, CV download, comments and a
contact form — plus an admin panel so you can edit everything without touching code afterwards.

Nothing here needs Node.js, npm, React or a build step. You need three things only:

1. **A text editor** — [VS Code](https://code.visualstudio.com/) (free).
2. **A browser** — Chrome/Edge/Firefox (you already have one).
3. **A place to publish** — GitHub + Vercel (both free).

---

## 0. What the finished project looks like on disk

Create a folder and put these files inside it. Keep the names exactly as written — computers are
case-sensitive on servers (`Images/logo.png` and `images/logo.png` are two different files).

```
portfolio-daynight/
├── index.html          ← the page (structure + text)
├── style.css           ← the look (colors, spacing, layout)
├── script.js           ← the brain (data, rendering, admin panel)
├── site-data.js        ← published content visitors load (starts almost empty)
├── .gitignore          ← tells git which files to skip
├── .gitattributes      ← keeps PDF/images as binary (never convert line endings)
├── assets/
│   ├── three.min.js    ← 3D library (optional)
│   ├── character.js    ← the 3D character (optional)
│   └── word-anim.js    ← heading/scroll animations
└── images/
    ├── myimg.jpg       ← profile photo
    └── certificates/   ← certificate screenshots
```

**Rule of thumb:** `index.html` says *what*, `style.css` says *how it looks*, `script.js` says
*what it does*. Learn them in that order.

---

## 1. Step 1 — the skeleton page (`index.html`)

Open your editor → New File → save as `index.html`. Type this minimal version first and open it
in the browser (double-click the file). You should see plain black text on white:

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Portfolio</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <h1>Hello, I'm Hussain</h1>
</body>
</html>
```

What each line does:

| Line | Meaning |
|------|---------|
| `<!DOCTYPE html>` | Tells the browser "this is a modern HTML page". Always first. |
| `data-theme="dark"` | A custom label on `<html>`. CSS uses it to pick the color palette. |
| `charset` / `viewport` | Correct text encoding; correct zoom on phones. |
| `<link rel="stylesheet" href="style.css">` | Loads your CSS file. Relative path = same folder. |
| `<body>` | Everything the visitor actually sees lives here. |

Then grow it section by section. A section is a repeating pattern — copy this shape for every
block of the page:

```html
<section class="section scroll-reveal" id="about">
  <h2 class="section-title split-words">About me</h2>
  <div class="about-grid">
    ...content...
  </div>
</section>
```

* `class` = a label you can target from CSS and JavaScript.
* `id` = a unique address, used by the navbar links (`<a href="#about">`).

Order of the real page (this project): **navbar → hero → about → services → experience →
projects → certifications → CV → comments → contact → footer**. Add them one at a time and
refresh the browser after each one. Save often.

Two things in this file are easy to miss but important:

* A tiny **inline script in `<head>`** runs *before the page paints* and writes the saved theme
  (`localStorage.getItem("portfolio-theme")`) into `data-theme`. This prevents a white flash
  before the dark theme loads.
* The **`<script>` tags at the bottom of `<body>`** load in a specific order:
  `three.min.js` → `site-data.js` → `script.js` → `word-anim.js` → `character.js`.
  Order matters: `site-data.js` must run **before** `script.js`, because `script.js` reads the
  data it defines. If you reverse them you get "undefined" errors.

---

## 2. Step 2 — the look (`style.css`)

Start with a reset, otherwise browsers add their own margins and everything drifts:

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; line-height: 1.65; }
```

### 2a. Design tokens (the single most valuable habit)

At the top of the file, list **every color, size and font once** in `:root`:

```css
:root {
  --container: 1140px;         /* max width of the content column */
  --section-y: clamp(4rem, 9vh, 6.5rem);
  --radius: 16px;
  --font-display: "Space Grotesk", system-ui, sans-serif;
  --accent: #9b5cff;
}
```

Nowhere else do you write a hex color by hand — you always write `var(--accent)`. Changing the
whole site's color later takes 1 second.

### 2b. Two themes without duplicating the page

```css
[data-theme="dark"] { --bg: #0a0713; --text: #f3f0fa; --accent: #9b5cff; }
[data-theme="light"] { --bg: #f6f7fc; --text: #14122b; --accent: #5b34e8; }
body { background: var(--bg); color: var(--text); }
```

Because only the *variables* change, every component switches theme automatically. The theme
button in the navbar just flips `data-theme` on `<html>` and saves the choice:

```js
document.documentElement.setAttribute("data-theme", "dark");
localStorage.setItem("portfolio-theme", "dark");
```

### 2c. Layout recipes used in this project

* **Page column:** `.section { max-width: 1140px; margin: 0 auto; padding: var(--section-y) 32px; }`
  → centered content with comfortable air above and below. This single rule is why the page
  looks evenly spaced.
* **Two-column block (About):** `display: grid; grid-template-columns: 1.3fr 0.9fr; gap: 60px;`
* **Card grids (Projects, Certs, Comments):**
  `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 26px;`
  → cards re-flow from 1 column on a phone to 4 on a wide screen *automatically*. No media
  query needed for the count.
* **Responsive tweaks:** media queries at the bottom:
  `@media (max-width: 960px)` stacks the two-column grid and turns the navbar into a hamburger
  drawer; `@media (max-width: 480px)` reduces padding so phones don't feel cramped.
* **Accessibility:** `@media (prefers-reduced-motion: reduce)` disables animations for users who
  asked their OS to reduce motion. Always include it.

Golden rule for spacing: **never invent a new pixel value inside a component**. Reuse a token or
a section rule, and the whole page stays consistent. If two sections look uneven, check their
padding/margin first — that is 90 % of all spacing bugs.

---

## 3. Step 3 — the brain (`script.js`)

Everything hard-coded in HTML must be re-typed every time you change something. This project
avoids that with one idea:

> **Content lives in a data object. JavaScript renders it into the page.**

### 3a. The data object

```js
var DEFAULT_DATA = {
  profile: {
    name: "Muhammad Hussain Raza",
    tagline: "Full-Stack JavaScript Developer ...",
    email: "hr.hussainraza112@gmail.com",
    skills: ["JavaScript", "React", "Node.js"],
  },
  projects: [ { name: "Tracker", desc: "...", tags: ["HTML","CSS"], link: "https://..." } ],
  certs:    [ { name: "...", issuer: "...", link: "...", image: "images/certificates/C1.png" } ],
  cvUrl: "assets/Hussain_Raza_CV.pdf",
  comments: [],
};
```

To change text on the live site you edit **this object** — not 40 places in the HTML.

### 3b. Reading the data (three layers, owner wins)

```js
function loadData() {
  var merged = deepClone(DEFAULT_DATA);            // 1) safe defaults
  if (window.SITE_DATA)  merged = deepMerge(merged, window.SITE_DATA);  // 2) published file
  var raw = localStorage.getItem("portfolio-data-v3");
  if (raw) merged = deepMerge(merged, JSON.parse(raw));                 // 3) this browser
  return merged;
}
var state = loadData();
```

* **Layer 1 – defaults:** the site works even if everything else fails.
* **Layer 2 – `site-data.js`:** what *visitors* see. It is just
  `window.SITE_DATA = { ... };` — a normal script that sets a global variable.
* **Layer 3 – `localStorage`:** edits you made in your own browser. It is stored as text under
  the key `portfolio-data-v3` and only exists **on your machine**. That is why an edit you make
  is invisible to other people until you publish (Step 6).

`deepMerge(base, extra)` copies keys from `extra` on top of `base` — that is how an override
works without deleting the rest.

### 3c. Rendering (data → screen)

```js
function renderAll() {
  var p = state.profile || {};
  document.getElementById("hero-tagline").textContent = p.tagline;
  renderProjects();   // builds project cards
  renderCerts();      // builds certificate cards
  renderCvHint();     // wires the CV buttons
  renderComments();   // builds testimonials
}
```

Look at `renderProjects()` and you will see the pattern used everywhere:

```js
(state.projects || []).forEach(function (proj, i) {
  var card = document.createElement("div");
  card.className = "project-card reveal";
  card.innerHTML = '<div class="project-title">' + escapeHtml(proj.name) + '</div>' + ...;
  grid.appendChild(card);
});
```

1. loop over the array,
2. build the HTML for one item,
3. append it to the grid.

**Never** put user text into `innerHTML` without `escapeHtml()` — that is how sites get hacked
(XSS). `escapeHtml`/`escapeAttr` convert `<` and `"` into harmless characters.

### 3d. Events (making things react)

```js
document.getElementById("hamburger").addEventListener("click", function () {
  navLinks.classList.toggle("open");
});
```

`element.addEventListener("event", functionToRun)` is the whole concept: *"when X happens, do Y."*
Used for: hamburger menu, theme toggle, admin login, tab switching, forms, CV upload, delete
buttons, scroll-to-top, scroll-spy.

### 3e. Forms without a server

* **Comments** → stored in `localStorage` under `portfolio-daynight-comments-v1`, with three
  sample entries (`SEED_COMMENTS`) so the section is never empty. Visitors' comments stay on
  *their* browser; you see yours. For real shared comments you would need a backend.
* **Contact form** → builds a `mailto:`/Gmail compose URL and opens it:
  `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=you@example.com&body=...`
  No server, no database, still reaches your inbox.

---

## 4. Step 4 — animations (`assets/word-anim.js`)

Three mechanical tricks, all optional (delete this file and the site still works):

1. **Split headings.** Elements with `.split-words` are rewritten into
   `<span class="word"><span class="word-inner">About</span></span>` with `--i: 0,1,2…`.
   The CSS animation uses `--i` to delay each word, so the heading types itself in.
2. **Scroll reveal.** `.reveal` / `.scroll-reveal` start hidden; an `IntersectionObserver`
   adds `.is-visible` when the element enters the viewport → fade-and-rise.
3. **Stagger.** `.stagger` copies an incrementing `--i` to children so cards cascade in.

**Failsafe (important!):** a `setTimeout` in `index.html` forces every animated element visible
after 2.8 s. Without it, one JavaScript error would leave the whole page invisible. Copy this
idea into any project you build.

---

## 5. Step 5 — the 3D character (`assets/three.min.js` + `assets/character.js`)

Optional, and safe to skip entirely.

* `three.min.js` is the Three.js library (rendering 3D in WebGL).
* `character.js` creates balls, a laptop and a light, adds them to a scene, then renders every
  frame and reacts to mouse position (the eyes follow your cursor).
* If WebGL is missing (old phone), the script shows `.stage-fallback` text instead of crashing —
  always degrade gracefully rather than assuming the fancy feature exists.

---

## 6. Step 6 — the admin panel and publishing

### Editing

* The 🔒 button in the footer (or `index.html#admin`) opens the sign-in gate.
* Sign in → the **Edit** button appears in the navbar → modal with tabs: Profile, Projects,
  Certificates, CV.
* Everything you save is written to `localStorage` and re-rendered immediately.

> ⚠️ This login is **cosmetic**: username/password live inside `script.js`, and anyone can read
> a website's JavaScript. Never put a secret there. Its only job is to hide the edit buttons
> from visitors. Change the two constants near `ADMIN_USERNAME` / `ADMIN_PASSWORD` if you fork
> this project, and understand that real protection requires a server.

### Publishing (making edits visible to everyone)

1. In the admin panel → **CV tab** → click **Export site-data.js (publish)**.
2. Your browser downloads a file called `site-data.js`.
3. Replace the `site-data.js` in your project folder with it, commit and redeploy.

That works because of the three-layer read in Step 3b: the published file wins over the defaults,
your `localStorage` wins over the file — but only on your own machine.

---

## 7. Step 7 — CV and images

* **CV:** drop your PDF into `assets/` and set `cvUrl: "assets/your-cv.pdf"` in `DEFAULT_DATA`.
  Two buttons (`Download CV`, `View CV`) read it through `cvSource()`:
  a manually uploaded PDF (`cvDataUrl`) overrides the hosted file; otherwise the hosted copy is
  used, so the link never breaks for visitors.
* **Images:** keep files in `images/`, reference them with **relative** paths
  (`images/myimg.jpg`). Uploads from the admin panel are shrunk on a `<canvas>`
  (`resizeImage()`, max 320 px) before being saved — base64 data URLs eat `localStorage`
  quota very fast, so always downscale before storing.

---

## 8. Step 8 — SEO and social sharing (copy the pattern)

In `<head>`: `meta description`, Open Graph tags (`og:title`, `og:description`), a `canonical`
link, a favicon, and a **JSON-LD** block:

```json
{ "@context": "https://schema.org", "@type": "Person",
  "name": "Muhammad Hussain Raza", "jobTitle": "Full-Stack JavaScript Developer",
  "url": "https://your-domain.com/", "sameAs": ["https://github.com/you"] }
```

Search engines read that block to build the "knowledge panel" card about you.

---

## 9. Step 9 — put it on the internet

### GitHub (source code)

```bash
git init
git add .
git commit -m "First version"
git remote add origin https://github.com/you/your-repo.git
git push -u origin main
```

`.gitignore` keeps junk (editor files, build folders) out; `.gitattributes` marks
`*.pdf`/`*.png` as **binary** so Git never converts their line endings and corrupts them.

### Vercel (the live website)

1. vercel.com → **Add New → Project → Import** your GitHub repo.
2. Framework Preset: **Other** (this project has no build step).
3. If your `index.html` sits in a **sub-folder**, Vercel will return `404 NOT_FOUND`, because it
   only serves the *output directory*. Fix it with a `vercel.json` at the repository root:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": null,
  "outputDirectory": "path/to/your/portfolio-folder"
}
```

   That single file is the fix for the classic "deployment succeeds but the page says not found"
   error. Click **Redeploy** after pushing.
4. Optional: Settings → Domains to attach your own domain.

---

## 10. Understanding this codebase at a glance

| File | Responsibility | Start reading at |
|------|----------------|------------------|
| `index.html` | Structure, text, meta, script order | the `<header class="hero">` block |
| `style.css` | Tokens → themes → base → components → media queries | the `:root` block |
| `script.js` | Data, rendering, events, admin, publishing | `DEFAULT_DATA`, then `renderAll()` |
| `site-data.js` | The published snapshot visitors read | whole file (4 lines) |
| `assets/word-anim.js` | Split headings + scroll reveals | the `IntersectionObserver` |
| `assets/character.js` | Optional 3D character | `init()` / render loop |

**Data flow (the one diagram to remember):**

```
DEFAULT_DATA  →  merge  →  window.SITE_DATA (site-data.js)
                  ↑                ↓
            localStorage  ←  admin edits (saveData)
                  ↓
              state = loadData()
                  ↓
             renderAll()  →  the DOM you see
```

Naming conventions used throughout, so new code feels native:

* `renderX()` builds UI from data, `saveXFromForm()` writes form → data.
* `getX` / `setX` for simple accessors; `isX()` returns true/false.
* IDs in HTML are kebab-case (`cv-section-download`), CSS classes kebab-case, JS variables
  camelCase.
* Everything is wrapped in one IIFE: `(function () { "use strict"; ... })();` so no variable
  leaks into the global scope.
* No `const`/`let`/arrow functions — plain ES5, so it runs anywhere, including old browsers.

---

## 11. Everyday tasks (recipes)

**Change my tagline / email / skills** → `script.js` → `DEFAULT_DATA.profile` → edit → refresh.
(If you previously saved edits in the admin panel, your `localStorage` overrides the file —
either edit in the panel and re-export, or clear the site data: DevTools → Application →
Local Storage → Delete.)

**Add a project** → admin panel → Projects → *+ Add project* → Save → Export `site-data.js`.
(Or add one object to `DEFAULT_DATA.projects`.)

**Add a certificate** → drop the image into `images/certificates/` → admin → Certificates →
*+ Add certificate*, fill name/issuer/verification link/image → Save.

**Recolor the site** → change `--accent` and `--accent-2` inside `[data-theme="dark"]` and
`[data-theme="light"]` in `style.css`. Nothing else needs touching.

**Add a whole new section** → 1) `<section class="section scroll-reveal" id="skills">` in the
HTML, 2) add `#skills` to `sectionIds` in `script.js` (so the navbar highlights it), 3) add a
nav link `<a href="#skills">Skills</a>`, 4) style with `.section` + one grid rule.

---

## 12. Debugging when you are not a coder

1. **F12** → **Console**. Red text = the error, and it names the file and line number. 90 % of
   problems are a typo in an ID or a missing comma.
2. **Right-click → Inspect** → select an element → the **Styles** pane shows which CSS rule wins.
   A greyed-out rule was overridden by a later one — order matters in CSS.
3. Changes not appearing? **Ctrl+F5** (hard refresh) — browsers cache aggressively.
4. Works locally, breaks online? Almost always a **path** problem (capital letters, spaces,
   missing `./`) or the wrong **output directory** (Step 9).
5. Blank white page? The failsafe timeout is missing or a script failed — check the console.

---

## 13. Pre-deploy checklist

- [ ] `index.html` opens directly in the browser with no console errors
- [ ] Every image/PDF path exists with the **exact** same letter casing
- [ ] No absolute paths (`/images/...`) — always relative (`images/...`)
- [ ] `site-data.js` exported and replaced after your last admin edit
- [ ] CV button opens a real PDF
- [ ] Tested at ~390 px width (phone) and ~1440 px (desktop)
- [ ] Both themes checked (sun/moon button)
- [ ] `vercel.json` output directory correct if the site lives in a sub-folder
- [ ] `meta description`, title and JSON-LD updated for the real person/site

---

Happy building. Type the files yourself, break them on purpose, fix them — that is how the
concepts stick.
