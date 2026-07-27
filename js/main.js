/* ============================================
   MAIN.JS — Core functionality + Lenis smooth scroll
   ============================================ */

(function() {
  'use strict';

  // --- Lenis Smooth Scroll ---
  let lenis = null;

  function initLenis() {
    if (typeof Lenis === 'undefined') return;

    lenis = new Lenis({
      duration: 1.2,
      easing: function(t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false
    });

    // Connect Lenis to GSAP ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function(time) {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }

  // --- Scroll Progress Bar ---
  function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;

    function updateProgress() {
      const h = document.documentElement;
      const pct = h.scrollTop / (h.scrollHeight - h.clientHeight);
      progressBar.style.transform = 'scaleX(' + Math.min(pct, 1) + ')';
    }

    if (lenis) {
      lenis.on('scroll', updateProgress);
    } else {
      window.addEventListener('scroll', updateProgress, { passive: true });
    }
  }

  // --- Nav scroll state ---
  function initNav() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    let lastScrollY = 0;
    let ticking = false;

    function updateNav() {
      const scrollY = window.scrollY;
      nav.classList.toggle('scrolled', scrollY > 40);
      lastScrollY = scrollY;
      ticking = false;
    }

    if (lenis) {
      lenis.on('scroll', function() {
        if (!ticking) { requestAnimationFrame(updateNav); ticking = true; }
      });
    } else {
      window.addEventListener('scroll', function() {
        if (!ticking) { requestAnimationFrame(updateNav); ticking = true; }
      }, { passive: true });
    }
  }

  // --- Reveal on scroll (Intersection Observer) ---
  function initReveals() {
    var reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function(el) { observer.observe(el); });
  }

  // --- Case study section nav pills ---
  function initCaseNav() {
    var pills = document.querySelectorAll('.case-nav__pill');
    if (!pills.length) return;

    pills.forEach(function(pill) {
      pill.addEventListener('click', function() {
        var sectionId = pill.dataset.section;
        var section = document.getElementById(sectionId);
        if (!section) return;

        var navHeight = (document.querySelector('.case-nav') || {}).offsetHeight || 80;
        var y = section.getBoundingClientRect().top + window.scrollY - navHeight - 20;

        if (lenis) {
          lenis.scrollTo(y, { duration: 1.2 });
        } else {
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      });
    });

    // Update active pill on scroll
    var sections = Array.from(pills).map(function(p) {
      return document.getElementById(p.dataset.section);
    }).filter(Boolean);

    function updatePills() {
      var navH = (document.querySelector('.case-nav') || {}).offsetHeight || 80;
      var active = sections[0];
      sections.forEach(function(s) {
        if (s.getBoundingClientRect().top <= navH + 60) active = s;
      });
      pills.forEach(function(p) {
        p.classList.toggle('active', p.dataset.section === (active && active.id));
      });
    }

    if (lenis) {
      lenis.on('scroll', updatePills);
    } else {
      window.addEventListener('scroll', updatePills, { passive: true });
    }
  }

  // --- Page transitions ---
  function initPageTransitions() {
    document.body.style.opacity = '0';
    window.addEventListener('load', function() {
      document.body.style.transition = 'opacity 0.4s ease';
      document.body.style.opacity = '1';
    });

    // Intercept internal links
    document.querySelectorAll('a[href]').forEach(function(link) {
      var href = link.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto') && href.endsWith('.html')) {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          document.body.style.opacity = '0';
          setTimeout(function() { window.location.href = href; }, 300);
        });
      }
    });
  }

  // --- Smooth anchor scroll ---
  function initAnchorScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(a) {
      a.addEventListener('click', function(e) {
        var hash = a.getAttribute('href');
        if (hash === '#') return;
        var target = document.querySelector(hash);
        if (!target) return;
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(target, { offset: -80, duration: 1.2 });
        } else {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // --- Init ---
  initLenis();
  initScrollProgress();
  initNav();
  initReveals();
  initCaseNav();
  initPageTransitions();
  initAnchorScroll();

  // Expose lenis for external use (e.g. animations.js)
  window.__lenis = lenis;

})();
