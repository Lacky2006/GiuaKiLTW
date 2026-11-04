'use strict';

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-navigation');
const progressFill = document.querySelector('.scroll-progress__fill');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (menuButton && navigation) {
  const menuIcon = '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">';
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Mở menu');
    menuButton.innerHTML = `${menuIcon}<path d="M4 6h16M4 12h16M4 18h16" /></svg>`;
    navigation.classList.remove('site-nav--open');
  };

  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Mở menu' : 'Đóng menu');
    menuButton.innerHTML = isOpen
      ? `${menuIcon}<path d="M4 6h16M4 12h16M4 18h16" /></svg>`
      : `${menuIcon}<path d="m18 6-12 12M6 6l12 12" /></svg>`;
    navigation.classList.toggle('site-nav--open', !isOpen);
  });

  navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuButton.focus();
    }
  });
}

if (progressFill) {
  let updatePending = false;
  const updateProgress = () => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressFill.style.transform = `scaleX(${scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0})`;
    updatePending = false;
  };

  window.addEventListener('scroll', () => {
    if (!updatePending) {
      updatePending = true;
      window.requestAnimationFrame(updateProgress);
    }
  }, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();
}

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('has-motion');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });

  document.querySelectorAll('[data-reveal], [data-hero-reveal]').forEach((element) => {
    revealObserver.observe(element);
  });
}
