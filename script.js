'use strict';

// ── Nav scroll state ──────────────────────────────────────────────
const nav = document.getElementById('nav');

function updateNav() {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ── Active nav link on scroll ─────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

function updateActiveLink() {
  const scrollY = window.scrollY + 120;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });

// ── Smooth scroll for nav links ───────────────────────────────────
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    const offset = target.offsetTop - (nav.offsetHeight - 1);
    window.scrollTo({ top: offset, behavior: 'smooth' });
    // close mobile menu if open
    closeMenu();
  });
});

// Also handle hero CTA button
document.querySelector('.btn').addEventListener('click', e => {
  e.preventDefault();
  const target = document.querySelector(e.currentTarget.getAttribute('href'));
  if (!target) return;
  window.scrollTo({ top: target.offsetTop - nav.offsetHeight, behavior: 'smooth' });
});

// ── Mobile hamburger menu ─────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.querySelector('.nav__links');

// Create overlay element
const overlay = document.createElement('div');
overlay.className = 'nav__overlay';
document.body.appendChild(overlay);

function openMenu() {
  hamburger.classList.add('open');
  navLinksEl.classList.add('open');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  hamburger.classList.remove('open');
  navLinksEl.classList.remove('open');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  if (hamburger.classList.contains('open')) {
    closeMenu();
  } else {
    openMenu();
  }
});

overlay.addEventListener('click', closeMenu);

// ── Menu tab switching ────────────────────────────────────────────
const tabs = document.querySelectorAll('.menu__tab');
const menuCards = document.querySelectorAll('.menu-card');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const category = tab.dataset.tab;

    // Update active tab
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Show/hide cards with animation
    menuCards.forEach(card => {
      if (card.dataset.category === category) {
        card.style.display = 'block';
        requestAnimationFrame(() => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(16px)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        });
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ── Scroll reveal ─────────────────────────────────────────────────
function addRevealClass() {
  const targets = [
    '.section-header',
    '.menu-card',
    '.concept__right',
    '.access__map',
    '.access__info-block',
    '.about-strip__item',
  ];

  targets.forEach((selector, i) => {
    document.querySelectorAll(selector).forEach((el, j) => {
      el.classList.add('reveal');
      // stagger within same selector group
      if (j < 3) {
        el.classList.add(`reveal--delay-${j + 1}`);
      }
    });
  });
}

function onScroll() {
  const reveals = document.querySelectorAll('.reveal:not(.visible)');
  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.88) {
      el.classList.add('visible');
    }
  });
}

addRevealClass();
window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run once on load for elements already in view
