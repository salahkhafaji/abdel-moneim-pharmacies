<div align="center">

<!-- Replace with your actual logo -->
<img src="assets/logo.png" alt="Pharmacy Logo" width="120" />

# 🏥 Pharmacy Portfolio Website

**A professional bilingual pharmacy portfolio — Arabic & English**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![RTL Support](https://img.shields.io/badge/RTL-Supported-2E7D32?style=flat-square)](#)
[![License](https://img.shields.io/badge/License-Client_Project-blue?style=flat-square)](#)

[🌐 Live Demo](#) · [📋 Features](#-features) · [🚀 Getting Started](#-getting-started) · [🗂️ Structure](#️-project-structure)

</div>

---

## 📸 Preview

> _Screenshots will be added after deployment_

| Light Mode (Arabic) | Dark Mode (English) |
|---|---|
| ![Light AR](assets/preview-light-ar.png) | ![Dark EN](assets/preview-dark-en.png) |

---

## ✨ Features

- 🌐 **Bilingual** — Arabic (default, RTL) and English (LTR) with instant switching
- 🌙 **Light / Dark Mode** — Smooth theme toggle, preference saved in localStorage
- 📱 **Mobile-First Responsive** — Works on all screen sizes (480px → desktop)
- 🖼️ **Gallery Lightbox** — Click-to-enlarge with keyboard navigation (←→ ESC)
- 🏪 **3 Branch Cards** — Address, hours, phone, and Google Maps link per branch
- 📞 **Floating Action Buttons** — WhatsApp, Call, and Back-to-Top always visible
- ⚡ **No Frameworks** — Pure HTML, CSS, Vanilla JS. Fast load, no dependencies
- 🔍 **SEO Ready** — Meta tags, semantic HTML, descriptive alt attributes
- ♿ **Accessible** — Keyboard navigation, focus styles, ARIA labels

---

## 🗂️ Project Structure

```
pharmacy-website/
│
├── index.html          # Main HTML — all sections and bilingual content
├── style.css           # All styles — themes, layout, responsive, animations
├── script.js           # All JS — language, theme, gallery, scroll, FAB
│
└── assets/
    ├── logo.png        # ← Replace with actual pharmacy logo
    └── images/         # ← Add real branch/gallery photos here
        ├── branch-1.jpg
        ├── branch-2.jpg
        ├── branch-3.jpg
        └── gallery-*.jpg
```

---

## 🚀 Getting Started

### Option 1 — Open Locally

No server or install needed. Just open the file in your browser:

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/pharmacy-website.git

# Open in browser (Windows)
start index.html

# Open in browser (Mac)
open index.html

# Open in browser (Linux)
xdg-open index.html
```

### Option 2 — Live Server (VS Code)

If you use VS Code, install the **Live Server** extension, then right-click `index.html` → **Open with Live Server**. The browser auto-refreshes when you save.

### Option 3 — Deploy Online (Free)

| Platform | How |
|---|---|
| **Netlify** | Drag & drop the folder at [netlify.com/drop](https://netlify.com/drop) |
| **GitHub Pages** | Enable Pages in repo Settings → Pages → Branch: main |
| **Vercel** | Import this repo at [vercel.com](https://vercel.com) |

---

## 🔧 Customization Guide

All placeholder values are clearly marked. Replace them before going live:

### 1. Pharmacy Name
Search for `صيدليتنا` (Arabic) and `Our Pharmacy` (English) in `index.html` and replace with the real name.

### 2. Logo
Drop your logo file into `assets/` and name it `logo.png`.
The site auto-falls-back to a text logo if the image is missing.

### 3. Phone Numbers
Search `+20 100 000 000` in `index.html` — replace all instances:

| Placeholder | Replace with |
|---|---|
| `+20 100 000 0001` | Branch 1 number |
| `+20 100 000 0002` | Branch 2 number |
| `+20 100 000 0003` | Branch 3 number |
| `+20 100 000 0010` | Delivery line |
| `+20 100 000 0020` | Customer service |

### 4. WhatsApp
Search `wa.me/201000000000` and replace with the real WhatsApp number.

### 5. Facebook
Search `facebook.com/PLACEHOLDER` and replace with the real Facebook page URL.

### 6. Branch Addresses
In the Branches section in `index.html`, update each branch card:
- Branch name
- Street address (Arabic and English)
- Working hours
- Phone number

### 7. Google Maps Links
Search `YOUR_LAT,YOUR_LNG` and replace with real coordinates:

```html
<!-- Example for Cairo -->
<a href="https://www.google.com/maps?q=30.0444,31.2357" target="_blank">
```

To get coordinates: open Google Maps → right-click on the location → copy the numbers shown.

### 8. Gallery Images
Replace the Unsplash URLs in the `#gallery` section with your own photos.
For best results use images around **800×600px** or larger.

---

## 🎨 Design System

### Color Palette

| Role | Light Mode | Dark Mode |
|---|---|---|
| Primary | `#2E7D32` | `#4CAF50` |
| Primary Light | `#E8F5E9` | `#1B3A1C` |
| Background | `#FFFFFF` | `#0F1A10` |
| Surface | `#F5F9F5` | `#1A2E1B` |
| Accent | `#00796B` | `#80CBC4` |
| Text | `#1A1A1A` | `#F1F8E9` |

All colors are CSS variables in `style.css` under `:root` and `[data-theme="dark"]`. Change them in one place and the whole site updates.

### Typography

| Language | Font | Weight |
|---|---|---|
| Arabic | [Cairo](https://fonts.google.com/specimen/Cairo) | 300–800 |
| English | [Inter](https://fonts.google.com/specimen/Inter) | 300–700 |

### Sections

| # | Section | ID |
|---|---|---|
| 1 | Header (sticky) | `#header` |
| 2 | Hero | `#home` |
| 3 | Highlights | `#highlights` |
| 4 | About | `#about` |
| 5 | Services | `#services` |
| 6 | Why Choose Us | — |
| 7 | Branches | `#branches` |
| 8 | Gallery + Lightbox | `#gallery` |
| 9 | Contact | `#contact` |
| 10 | Footer | — |

---

## 🌍 Bilingual System

Every text element on the page uses `data-ar` and `data-en` attributes:

```html
<h2 data-ar="خدماتنا" data-en="Our Services">خدماتنا</h2>
```

The JavaScript reads these attributes on language switch and updates all text instantly — no page reload required. The HTML direction (`dir="rtl"` / `dir="ltr"`) and font switch simultaneously.

---

## 📱 Responsive Breakpoints

| Breakpoint | Target |
|---|---|
| `< 480px` | Small mobile |
| `480px – 768px` | Large mobile / phablet |
| `768px – 1024px` | Tablet |
| `> 1024px` | Desktop |

---

## 🛠️ Built With

- **HTML5** — Semantic structure, SEO meta tags, ARIA labels
- **CSS3** — Custom properties, Grid, Flexbox, media queries, animations
- **Vanilla JavaScript** — No libraries, no build step, no dependencies
- **Font Awesome 6** — Icons (loaded via CDN)
- **Google Fonts** — Cairo + Inter (loaded via CDN)

---

## 📄 License

This project was built as a freelance client project. All rights reserved to the client.

---

## 👨‍💻 Developer

Built with care as a professional freelance project.

> Have a similar project in mind? Feel free to reach out!

---

<div align="center">
  <sub>Made with ❤️ using pure HTML, CSS & JavaScript</sub>
</div>
