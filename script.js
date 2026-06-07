/* =====================================================
   MV · tú peña y cada día la de más gente
   Interacciones
   ===================================================== */

(function () {
  'use strict';

  /* Marca JS activo en <html> para activar el sistema reveal */
  document.documentElement.classList.add('js');

  /* ---------- NAV: scroll state + mobile toggle ---------- */
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  const onScroll = () => {
    if (window.scrollY > 24) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (navToggle && navMenu) {
    const setOpen = (open) => {
      navToggle.setAttribute('aria-expanded', String(open));
      navMenu.classList.toggle('is-open', open);
      navToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    };

    navToggle.addEventListener('click', () => {
      const open = navToggle.getAttribute('aria-expanded') === 'true';
      setOpen(!open);
    });

    // Cierra al hacer click en un link
    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setOpen(false));
    });

    // Cierra al pulsar Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        navToggle.focus();
      }
    });

    // Cierra al pasar a desktop
    const mq = window.matchMedia('(min-width: 768px)');
    mq.addEventListener('change', (e) => {
      if (e.matches) setOpen(false);
    });
  }

  /* ---------- Reveal on load: marca reveal + delay en cada bloque ---------- */
  const reveals = document.querySelectorAll(
    '.section-eyebrow, .section-title, .section-lead, .manifesto__card, .stat, .fiesta, .step, .unirse__card, .unirse__cta'
  );
  reveals.forEach((el, i) => {
    el.classList.add('reveal');
    el.setAttribute('data-delay', String((i % 3) + 1));
  });

  /* ---------- Stats: counter animation (arranca desde 0 al entrar en viewport) ---------- */
  const counters = document.querySelectorAll('.stat__value[data-count]');
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    if (target === 0) return; // no animar el "0 excusas"
    const duration = 1400;
    const start = performance.now();
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    el.textContent = '0';
    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.round(target * easeOut(progress));
      el.textContent = String(value);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = String(target);
    };
    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window && counters.length) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            cio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    counters.forEach((c) => cio.observe(c));
    /* Safety net para contadores */
    setTimeout(() => {
      counters.forEach((c) => (c.textContent = c.dataset.count));
    }, 4000);
  } else {
    counters.forEach((c) => (c.textContent = c.dataset.count));
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Smooth scroll for in-page anchors (with offset) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
