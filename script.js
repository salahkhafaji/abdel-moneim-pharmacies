/* ═══════════════════════════════════════════════════════
   PHARMACY WEBSITE — script.js
   Handles: Language, Theme, Nav, Gallery, Scroll, FAB
   ═══════════════════════════════════════════════════════ */

'use strict';

// ── CONSTANTS ──────────────────────────────────────────
const STORAGE_LANG  = 'pharmacy_lang';
const STORAGE_THEME = 'pharmacy_theme';

// ── DOM REFERENCES ──────────────────────────────────────
const body        = document.body;
const header      = document.getElementById('header');
const langToggle  = document.getElementById('langToggle');
const themeToggle = document.getElementById('themeToggle');
const menuToggle  = document.getElementById('menuToggle');
const mobileNav   = document.getElementById('mobileNav');
const fabTop      = document.getElementById('fabTop');
const lightbox    = document.getElementById('lightbox');
const lbImg       = document.getElementById('lbImg');
const lbClose     = document.getElementById('lbClose');
const lbPrev      = document.getElementById('lbPrev');
const lbNext      = document.getElementById('lbNext');
const lbCounter   = document.getElementById('lbCounter');
const galleryItems = document.querySelectorAll('.gallery-item');

// ══════════════════════════════════════════════════════
//  1. LANGUAGE SYSTEM
// ══════════════════════════════════════════════════════
let currentLang = localStorage.getItem(STORAGE_LANG) || 'ar';

function applyLanguage(lang) {
  currentLang = lang;

  // HTML lang + dir
  document.documentElement.lang = lang;
  document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';

  // Body class
  body.classList.toggle('lang-ar', lang === 'ar');
  body.classList.toggle('lang-en', lang === 'en');

  // Translate all [data-ar] / [data-en] elements
  document.querySelectorAll('[data-ar]').forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text !== null) el.textContent = text;
  });

  // Page title
  document.title = lang === 'ar'
    ? 'صيدليتنا | Pharmacy'
    : 'Our Pharmacy | صيدليتنا';

  // Meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.content = lang === 'ar'
      ? 'صيدلية متميزة - خدمة صيدلانية احترافية، توصيل على مدار الساعة، فروع متعددة'
      : 'Distinguished pharmacy - professional pharmaceutical service, 24/7 delivery, multiple branches';
  }

  // Persist
  localStorage.setItem(STORAGE_LANG, lang);
}

langToggle.addEventListener('click', () => {
  applyLanguage(currentLang === 'ar' ? 'en' : 'ar');
});

// ══════════════════════════════════════════════════════
//  2. THEME SYSTEM
// ══════════════════════════════════════════════════════
let currentTheme = localStorage.getItem(STORAGE_THEME) || 'light';

function applyTheme(theme) {
  currentTheme = theme;
  body.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_THEME, theme);
}

themeToggle.addEventListener('click', () => {
  applyTheme(currentTheme === 'light' ? 'dark' : 'light');
});

// ══════════════════════════════════════════════════════
//  3. MOBILE NAVIGATION
// ══════════════════════════════════════════════════════
let mobileNavOpen = false;

function toggleMobileNav(force) {
  mobileNavOpen = force !== undefined ? force : !mobileNavOpen;
  mobileNav.classList.toggle('open', mobileNavOpen);
  mobileNav.setAttribute('aria-hidden', !mobileNavOpen);
  menuToggle.setAttribute('aria-expanded', mobileNavOpen);

  // Switch icon
  const icon = menuToggle.querySelector('i');
  icon.className = mobileNavOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
}

menuToggle.addEventListener('click', () => toggleMobileNav());

// Close mobile nav when a link is clicked
mobileNav.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => toggleMobileNav(false));
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (mobileNavOpen && !mobileNav.contains(e.target) && !menuToggle.contains(e.target)) {
    toggleMobileNav(false);
  }
});

// ══════════════════════════════════════════════════════
//  4. STICKY HEADER + ACTIVE NAV LINK
// ══════════════════════════════════════════════════════
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

function updateHeader() {
  const scrollY = window.scrollY;

  // Scrolled state
  header.classList.toggle('scrolled', scrollY > 20);

  // Back-to-top FAB
  fabTop.classList.toggle('visible', scrollY > 400);

  // Active nav link based on current section
  let current = '';
  sections.forEach(section => {
    const sectionTop    = section.offsetTop - 100;
    const sectionBottom = sectionTop + section.offsetHeight;
    if (scrollY >= sectionTop && scrollY < sectionBottom) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateHeader, { passive: true });

// ══════════════════════════════════════════════════════
//  5. SMOOTH SCROLL FOR ALL ANCHOR LINKS
// ══════════════════════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 70;
    const top     = target.getBoundingClientRect().top + window.scrollY - headerH;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ══════════════════════════════════════════════════════
//  6. FADE-IN ON SCROLL (IntersectionObserver)
// ══════════════════════════════════════════════════════
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger sibling cards
      const siblings = Array.from(entry.target.parentElement?.children || []);
      const index    = siblings.indexOf(entry.target);
      const delay    = Math.min(index * 80, 400);

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);

      fadeObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px',
});

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// ══════════════════════════════════════════════════════
//  7. GALLERY LIGHTBOX
// ══════════════════════════════════════════════════════
let currentGalleryIndex = 0;
const galleryImages = Array.from(galleryItems).map(item => item.dataset.src);

function openLightbox(index) {
  currentGalleryIndex = index;
  showLightboxImage(index);
  lightbox.classList.add('open');
  lightbox.focus();
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function showLightboxImage(index) {
  lbImg.src        = galleryImages[index];
  lbImg.alt        = `Gallery image ${index + 1}`;
  lbCounter.textContent = `${index + 1} / ${galleryImages.length}`;
}

function navigateLightbox(direction) {
  const total = galleryImages.length;
  currentGalleryIndex = (currentGalleryIndex + direction + total) % total;
  showLightboxImage(currentGalleryIndex);
}

// Open on gallery item click
galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => openLightbox(index));
  item.setAttribute('tabindex', '0');
  item.setAttribute('role', 'button');
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightbox(index);
    }
  });
});

// Controls
lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', () => navigateLightbox(-1));  // RTL: prev is right arrow
lbNext.addEventListener('click', () => navigateLightbox(+1));  // RTL: next is left arrow

// Close on backdrop click
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;

  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowLeft')   navigateLightbox(+1);
  if (e.key === 'ArrowRight')  navigateLightbox(-1);
});

// ══════════════════════════════════════════════════════
//  8. BACK TO TOP BUTTON
// ══════════════════════════════════════════════════════
fabTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ══════════════════════════════════════════════════════
//  9. LOGO FALLBACK VISIBILITY
// ══════════════════════════════════════════════════════
// If logo image loads successfully, hide the fallback
document.querySelectorAll('.logo-img').forEach(img => {
  img.addEventListener('load', () => {
    const fallback = img.nextElementSibling;
    if (fallback) fallback.style.display = 'none';
    img.style.display = 'block';
  });
});

// ══════════════════════════════════════════════════════
//  10. INIT
// ══════════════════════════════════════════════════════
(function init() {
  // Apply stored preferences on load (no flash)
  applyTheme(currentTheme);
  applyLanguage(currentLang);

  // Initial scroll state
  updateHeader();

  // Hero content fade in immediately
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(24px)';
    heroContent.style.transition = 'opacity .7s ease .2s, transform .7s ease .2s';
    requestAnimationFrame(() => {
      heroContent.style.opacity  = '1';
      heroContent.style.transform = 'translateY(0)';
    });
  }
})();
