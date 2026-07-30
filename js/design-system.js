/* ============================================
   DESIGN SYSTEM — Interactive JS
   Handles: scroll tracking, sidebar active state,
   clipboard copy, animation demos
   ============================================ */

(function () {
  'use strict';

  // --- Scroll Spy: Track active section in sidebar ---
  const sections = document.querySelectorAll('.ds-section[id]');
  const navLinks = document.querySelectorAll('.ds-sidebar__link');

  function updateActiveLink() {
    const scrollPos = window.scrollY + 120;

    let currentId = '';
    sections.forEach((section) => {
      if (section.offsetTop <= scrollPos) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  // --- Clipboard: Copy hex values and code snippets ---
  document.addEventListener('click', function (e) {
    // Color swatches
    const swatch = e.target.closest('.ds-color-swatch[data-hex]');
    if (swatch) {
      const hex = swatch.getAttribute('data-hex');
      copyToClipboard(hex, swatch);
      return;
    }

    // Generic copy elements
    const copyEl = e.target.closest('.ds-copy[data-copy]');
    if (copyEl) {
      const text = copyEl.getAttribute('data-copy');
      copyToClipboard(text, copyEl);
      return;
    }
  });

  function copyToClipboard(text, element) {
    navigator.clipboard.writeText(text).then(() => {
      element.classList.add('copied');
      setTimeout(() => element.classList.remove('copied'), 1500);
    }).catch(() => {
      // Fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      element.classList.add('copied');
      setTimeout(() => element.classList.remove('copied'), 1500);
    });
  }

  // --- Easing Card Demos ---
  const easingCards = document.querySelectorAll('.ds-easing-card[data-easing]');
  easingCards.forEach((card) => {
    const dot = card.querySelector('.ds-easing-card__dot');
    if (!dot) return;

    const easing = card.getAttribute('data-easing');
    let isAnimating = false;

    card.addEventListener('mouseenter', () => {
      if (isAnimating) return;
      isAnimating = true;
      dot.style.transition = `left 0.8s ${easing}`;
      dot.style.left = 'calc(100% - 20px)';
    });

    card.addEventListener('mouseleave', () => {
      dot.style.transition = 'left 0.5s ease';
      dot.style.left = '8px';
      setTimeout(() => { isAnimating = false; }, 500);
    });
  });

  // --- Duration Card Demos ---
  const durationCards = document.querySelectorAll('.ds-duration-card[data-duration]');
  durationCards.forEach((card) => {
    const fill = card.querySelector('.ds-duration-card__bar-fill');
    if (!fill) return;

    const duration = card.getAttribute('data-duration');

    card.addEventListener('mouseenter', () => {
      fill.style.transition = `width ${duration}`;
      fill.style.width = '100%';
    });

    card.addEventListener('mouseleave', () => {
      fill.style.transition = 'width 0.2s ease';
      fill.style.width = '0';
    });
  });

  // --- Smooth scroll for sidebar links ---
  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        const offset = target.offsetTop - 32;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });

})();
