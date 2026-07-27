/* ============================================
   MAIN.JS — Core functionality
   ============================================ */

(function() {
  'use strict';

  // --- Scroll Progress Bar ---
  const progressBar = document.getElementById('scrollProgress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const h = document.documentElement;
      const pct = h.scrollTop / (h.scrollHeight - h.clientHeight);
      progressBar.style.transform = `scaleX(${pct})`;
    }, { passive: true });
  }

  // --- Nav scroll state ---
  const nav = document.getElementById('nav');
  if (nav) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          nav.classList.toggle('scrolled', window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // --- Reveal on scroll (Intersection Observer) ---
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => observer.observe(el));
  }

  // --- Case study section nav pills ---
  const pills = document.querySelectorAll('.case-nav__pill');
  if (pills.length) {
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        const sectionId = pill.dataset.section;
        const section = document.getElementById(sectionId);
        if (section) {
          const navHeight = document.querySelector('.case-nav')?.offsetHeight || 80;
          const y = section.getBoundingClientRect().top + window.scrollY - navHeight - 20;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      });
    });

    // Update active pill on scroll
    const sections = Array.from(pills).map(p => document.getElementById(p.dataset.section)).filter(Boolean);
    const updatePills = () => {
      const navH = document.querySelector('.case-nav')?.offsetHeight || 80;
      let active = sections[0];
      sections.forEach(s => {
        if (s.getBoundingClientRect().top <= navH + 60) active = s;
      });
      pills.forEach(p => {
        p.classList.toggle('active', p.dataset.section === active?.id);
      });
    };
    window.addEventListener('scroll', updatePills, { passive: true });
  }

  // --- Page transitions ---
  const transition = document.getElementById('pageTransition');
  if (transition) {
    // Fade in on load
    document.body.style.opacity = '0';
    window.addEventListener('load', () => {
      document.body.style.transition = 'opacity 0.4s ease';
      document.body.style.opacity = '1';
    });

    // Intercept internal links
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto') && href.endsWith('.html')) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          document.body.style.opacity = '0';
          setTimeout(() => { window.location.href = href; }, 300);
        });
      }
    });
  }

  // --- Smooth anchor scroll ---
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
