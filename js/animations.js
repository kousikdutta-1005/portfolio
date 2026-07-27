/* ============================================
   ANIMATIONS.JS — GSAP + ScrollTrigger
   ============================================ */

(function() {
  'use strict';

  // Wait for GSAP
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // --- Hero title animation ---
  const heroTitle = document.querySelector('.hero__title');
  if (heroTitle) {
    const spans = heroTitle.querySelectorAll('span');
    gsap.set(spans, { y: 60, opacity: 0 });
    gsap.to(spans, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.15,
      delay: 0.3
    });

    // Subtitle
    const subtitle = document.querySelector('.hero__subtitle');
    if (subtitle) {
      gsap.set(subtitle, { y: 30, opacity: 0 });
      gsap.to(subtitle, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.7 });
    }

    // CTA button
    const heroBtn = document.querySelector('.hero__content .btn');
    if (heroBtn) {
      gsap.set(heroBtn, { y: 20, opacity: 0 });
      gsap.to(heroBtn, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.9 });
    }
  }

  // --- Case hero animation ---
  const caseTitle = document.querySelector('.case-hero__title');
  if (caseTitle) {
    gsap.set(caseTitle, { y: 40, opacity: 0 });
    gsap.to(caseTitle, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 });

    const caseDesc = document.querySelector('.case-hero__desc');
    if (caseDesc) {
      gsap.set(caseDesc, { y: 30, opacity: 0 });
      gsap.to(caseDesc, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.5 });
    }

    const caseImg = document.querySelector('.case-hero__image');
    if (caseImg) {
      gsap.set(caseImg, { y: 40, opacity: 0 });
      gsap.to(caseImg, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.6 });
    }
  }

  // --- Project cards 3D tilt on hover ---
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotateY: x * 8,
        rotateX: -y * 8,
        transformPerspective: 800,
        duration: 0.4,
        ease: 'power2.out'
      });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.6,
        ease: 'power2.out'
      });
    });
  });

  // --- Scroll-triggered image parallax ---
  document.querySelectorAll('.case-section__image').forEach(img => {
    gsap.fromTo(img, 
      { y: 30 },
      {
        y: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: img,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      }
    );
  });

  // --- Outcome counter animation ---
  document.querySelectorAll('.outcome-card__metric[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    if (isNaN(target)) return;
    const suffix = el.textContent.replace(/[\d.]/g, '');
    
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.fromTo(el, 
          { textContent: 0 },
          {
            textContent: target,
            duration: 1.5,
            ease: 'power2.out',
            snap: { textContent: 1 },
            onUpdate: function() {
              el.textContent = Math.round(gsap.getProperty(el, 'textContent')) + suffix;
            }
          }
        );
      }
    });
  });

  // --- Stagger grid items ---
  document.querySelectorAll('.stagger-children').forEach(container => {
    const items = container.querySelectorAll('.reveal');
    if (!items.length) return;
    
    ScrollTrigger.create({
      trigger: container,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.fromTo(items,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1 }
        );
        items.forEach(item => item.classList.add('visible'));
      }
    });
  });

  // --- CTA section glow ---
  const cta = document.querySelector('.cta');
  if (cta) {
    ScrollTrigger.create({
      trigger: cta,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        gsap.fromTo(cta.querySelector('.cta__title'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
        );
        gsap.fromTo(cta.querySelector('.btn'),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.2 }
        );
      }
    });
  }

  // --- Magnetic hover on buttons ---
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    });
  });

  // --- Nav link hover effect ---
  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('mouseenter', () => {
      gsap.to(link, { y: -2, duration: 0.2, ease: 'power2.out' });
    });
    link.addEventListener('mouseleave', () => {
      gsap.to(link, { y: 0, duration: 0.3, ease: 'power2.out' });
    });
  });

  // --- Testimonials parallax scroll speed ---
  const track = document.querySelector('.testimonials-track');
  if (track) {
    ScrollTrigger.create({
      trigger: '.testimonials-track-wrapper',
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const speed = 1 + self.progress * 0.5;
        track.style.animationDuration = (40 / speed) + 's';
      }
    });
  }

})();
