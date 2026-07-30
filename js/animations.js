/* ============================================
   ANIMATIONS.JS — Premium GSAP + ScrollTrigger
   ============================================ */

(function() {
  'use strict';

  if (typeof gsap === 'undefined') return;

  const hasScrollTrigger = typeof ScrollTrigger !== 'undefined';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const internalLinkSelector = 'a[href]';

  if (hasScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Inject tiny runtime styles so the new interactions work even without CSS changes.
  function injectRuntimeStyles() {
    if (document.getElementById('animation-runtime-styles')) return;

    const style = document.createElement('style');
    style.id = 'animation-runtime-styles';
    style.textContent = `
      .preloader.hidden {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
      }
      .has-custom-cursor,
      .has-custom-cursor a,
      .has-custom-cursor button,
      .has-custom-cursor .project-card,
      .has-custom-cursor [role="button"] {
        cursor: none !important;
      }
      .custom-cursor {
        position: fixed;
        top: 0;
        left: 0;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        border: 1px solid rgba(17, 17, 17, 0.16);
        background: rgba(17, 17, 17, 0.08);
        backdrop-filter: blur(10px);
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        transition: width 0.25s ease, height 0.25s ease, opacity 0.25s ease, background-color 0.25s ease, border-color 0.25s ease;
      }
      .custom-cursor::after {
        content: '';
        position: absolute;
        inset: 4px;
        border-radius: inherit;
        background: rgba(17, 17, 17, 0.82);
        transition: transform 0.25s ease, opacity 0.25s ease;
      }
      .custom-cursor.cursor--hover {
        width: 42px;
        height: 42px;
        background: rgba(17, 17, 17, 0.06);
        border-color: rgba(17, 17, 17, 0.14);
      }
      .custom-cursor.cursor--hover::after {
        transform: scale(0.42);
        opacity: 0.88;
      }
      .custom-cursor.cursor--hidden {
        opacity: 0 !important;
      }
    `;

    document.head.appendChild(style);
  }

  function createWordMask(word, className) {
    const mask = document.createElement('span');
    const inner = document.createElement('span');

    mask.style.display = 'inline-block';
    mask.style.overflow = 'hidden';
    mask.style.verticalAlign = 'top';

    inner.className = className;
    inner.style.display = 'inline-block';
    inner.style.willChange = 'transform, opacity, filter';
    inner.textContent = word;

    mask.appendChild(inner);
    return { mask: mask, inner: inner };
  }

  // Splits titles into word masks for Framer-style word reveals.
  function splitTextToWords(element, className) {
    if (!element || element.dataset.wordsSplit === 'true') {
      return element ? Array.from(element.querySelectorAll('.' + className)) : [];
    }

    const tokens = element.innerHTML
      .replace(/<br\s*\/?>/gi, ' [[BR]] ')
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    const fragment = document.createDocumentFragment();

    tokens.forEach(function(token, index) {
      if (token === '[[BR]]') {
        fragment.appendChild(document.createElement('br'));
        return;
      }

      const pair = createWordMask(token, className);
      fragment.appendChild(pair.mask);

      const nextToken = tokens[index + 1];
      if (nextToken && nextToken !== '[[BR]]') {
        fragment.appendChild(document.createTextNode(' '));
      }
    });

    element.innerHTML = '';
    element.appendChild(fragment);
    element.dataset.wordsSplit = 'true';

    return Array.from(element.querySelectorAll('.' + className));
  }

  // Rebuilds hero titles into line masks so each line can reveal with clip-path and lift.
  function prepareHeroTitleLines(title) {
    if (!title || title.dataset.linesPrepared === 'true') {
      return title ? Array.from(title.querySelectorAll('.hero-title-line__inner')) : [];
    }

    const directSpans = Array.from(title.children).filter(function(child) {
      return child.tagName === 'SPAN';
    });

    const lines = directSpans.length
      ? directSpans.map(function(span) { return span.innerHTML.trim(); })
      : title.innerHTML.split(/<br\s*\/?>/i).map(function(line) { return line.trim(); }).filter(Boolean);

    const fragment = document.createDocumentFragment();

    lines.forEach(function(line) {
      const mask = document.createElement('span');
      const inner = document.createElement('span');

      mask.className = 'hero-title-line';
      mask.style.display = 'block';
      mask.style.overflow = 'hidden';

      inner.className = 'hero-title-line__inner';
      inner.style.display = 'block';
      inner.style.willChange = 'transform, opacity, clip-path, filter';
      inner.innerHTML = line;

      mask.appendChild(inner);
      fragment.appendChild(mask);
    });

    title.innerHTML = '';
    title.appendChild(fragment);
    title.dataset.linesPrepared = 'true';

    return Array.from(title.querySelectorAll('.hero-title-line__inner'));
  }

  function waitForImages(timeoutMs) {
    const images = Array.from(document.images || []).filter(function(image) {
      return image && !image.complete;
    });

    if (!images.length) return Promise.resolve();

    return new Promise(function(resolve) {
      let settledCount = 0;
      let isResolved = false;

      function finish() {
        settledCount += 1;
        if (!isResolved && settledCount >= images.length) {
          isResolved = true;
          resolve();
        }
      }

      images.forEach(function(image) {
        image.addEventListener('load', finish, { once: true });
        image.addEventListener('error', finish, { once: true });
      });

      window.setTimeout(function() {
        if (!isResolved) {
          isResolved = true;
          resolve();
        }
      }, timeoutMs);
    });
  }

  function animatePreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader || prefersReducedMotion) {
      if (preloader) preloader.classList.add('hidden');
      return Promise.resolve();
    }

    const logo = preloader.querySelector('.preloader__logo, img, svg, [data-preloader-logo]') || preloader;

    return new Promise(function(resolve) {
      const timeline = gsap.timeline({
        onComplete: function() {
          preloader.classList.add('hidden');
          resolve();
        }
      });

      timeline
        .to(logo, {
          scale: 0.84,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.inOut'
        })
        .to(preloader, {
          opacity: 0,
          duration: 0.45,
          ease: 'power2.out'
        }, '-=0.2');
    });
  }

  function setupCustomCursor() {
    if (!canHover || prefersReducedMotion || !document.body) return;

    injectRuntimeStyles();
    document.documentElement.classList.add('has-custom-cursor');

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor cursor--hidden';
    document.body.appendChild(cursor);

    const hoverTargets = document.querySelectorAll('a, button, .btn, .project-card, .card, [role="button"]');
    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    let rafId = null;

    function renderCursor() {
      rafId = null;
      gsap.to(cursor, {
        x: cursorX,
        y: cursorY,
        duration: 0.15,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    }

    function queueCursorRender() {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(renderCursor);
    }

    window.addEventListener('mousemove', function(event) {
      cursorX = event.clientX;
      cursorY = event.clientY;
      cursor.classList.remove('cursor--hidden');
      gsap.to(cursor, { opacity: 1, duration: 0.2, ease: 'power2.out', overwrite: 'auto' });
      queueCursorRender();
    }, { passive: true });

    document.addEventListener('mouseleave', function() {
      cursor.classList.add('cursor--hidden');
    });

    hoverTargets.forEach(function(target) {
      target.addEventListener('mouseenter', function() {
        cursor.classList.add('cursor--hover');
      });
      target.addEventListener('mouseleave', function() {
        cursor.classList.remove('cursor--hover');
      });
    });
  }

  function createHeroEntranceAnimation() {
    const nav = document.getElementById('nav');
    const heroTitle = document.querySelector('.hero__title');
    const heroSubtitle = document.querySelector('.hero__subtitle');
    const heroButton = document.querySelector('.hero__content .btn');
    const caseTitle = document.querySelector('.case-hero__title');
    const caseDesc = document.querySelector('.case-hero__desc');
    const caseImage = document.querySelector('.case-hero__image');
    const heroLines = prefersReducedMotion ? [] : prepareHeroTitleLines(heroTitle);

    if (prefersReducedMotion) {
      return function runEntranceWithoutMotion() {
        [nav, heroTitle, heroSubtitle, heroButton, caseTitle, caseDesc, caseImage].filter(Boolean).forEach(function(element) {
          gsap.set(element, {
            clearProps: 'all',
            opacity: 1,
            y: 0,
            yPercent: 0,
            scale: 1,
            filter: 'blur(0px)'
          });
        });
      };
    }

    if (heroLines.length) {
      gsap.set(heroLines, {
        yPercent: 110,
        opacity: 0,
        clipPath: 'inset(100% 0% 0% 0%)',
        filter: 'blur(8px)'
      });
    }

    if (heroSubtitle) {
      gsap.set(heroSubtitle, {
        y: 28,
        opacity: 0,
        filter: 'blur(10px)'
      });
    }

    if (heroButton) {
      gsap.set(heroButton, {
        y: 18,
        scale: 0.9,
        opacity: 0
      });
    }

    if (nav) {
      gsap.set(nav, { y: -18, opacity: 0 });
    }

    if (caseTitle) gsap.set(caseTitle, { y: 36, opacity: 0, filter: 'blur(10px)' });
    if (caseDesc) gsap.set(caseDesc, { y: 28, opacity: 0 });
    if (caseImage) gsap.set(caseImage, { y: 36, opacity: 0, scale: 0.98 });

    return function runEntrance() {
      const timeline = gsap.timeline({ defaults: { overwrite: 'auto' } });

      if (nav) {
        timeline.to(nav, {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: 'power3.out'
        });
      }

      if (heroLines.length) {
        timeline.to(heroLines, {
          yPercent: 0,
          opacity: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          filter: 'blur(0px)',
          duration: 1.05,
          ease: 'power4.out',
          stagger: 0.2
        }, nav ? '-=0.12' : 0);
      }

      if (heroSubtitle) {
        timeline.to(heroSubtitle, {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.85,
          ease: 'power3.out'
        }, heroLines.length ? '-=0.45' : 0.08);
      }

      if (heroButton) {
        timeline.to(heroButton, {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out'
        }, heroSubtitle ? '-=0.35' : 0.18);
      }

      if (caseTitle) {
        timeline.to(caseTitle, {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power3.out'
        }, heroButton || heroSubtitle || heroLines.length ? '-=0.2' : 0);
      }

      if (caseDesc) {
        timeline.to(caseDesc, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out'
        }, caseTitle ? '-=0.45' : 0);
      }

      if (caseImage) {
        timeline.to(caseImage, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out'
        }, caseDesc || caseTitle ? '-=0.4' : 0);
      }
    };
  }

  function setupProjectCardHover() {
    if (!canHover) return;

    document.querySelectorAll('.project-card').forEach(function(card) {
      const image = card.querySelector('.project-card__image');
      const body = card.querySelector('.project-card__body, .project-card__info');

      card.addEventListener('mousemove', function(event) {
        const rect = card.getBoundingClientRect();
        const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
        const offsetY = (event.clientY - rect.top) / rect.height - 0.5;

        gsap.to(card, {
          rotateY: offsetX * 5,
          rotateX: offsetY * -5,
          transformPerspective: 1000,
          transformOrigin: 'center center',
          duration: 0.28,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });

      card.addEventListener('mouseenter', function() {
        if (image) {
          gsap.to(image, {
            scale: 1.04,
            duration: 0.45,
            ease: 'power3.out',
            overwrite: 'auto'
          });
        }

        if (body) {
          gsap.to(body, {
            y: -2,
            duration: 0.35,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }
      });

      card.addEventListener('mouseleave', function() {
        gsap.to(card, {
          rotateY: 0,
          rotateX: 0,
          duration: 0.6,
          ease: 'power3.out',
          overwrite: 'auto'
        });

        if (image) {
          gsap.to(image, {
            scale: 1,
            duration: 0.5,
            ease: 'power3.out',
            overwrite: 'auto'
          });
        }

        if (body) {
          gsap.to(body, {
            y: 0,
            duration: 0.45,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }
      });
    });
  }

  function setupScrollReveals() {
    if (!hasScrollTrigger || prefersReducedMotion) return;

    const revealTargets = gsap.utils.toArray('.reveal');
    if (!revealTargets.length) return;

    gsap.set(revealTargets, { y: 30, opacity: 0 });

    ScrollTrigger.batch(revealTargets, {
      start: 'top 85%',
      once: true,
      onEnter: function(batch) {
        batch.forEach(function(element) {
          element.classList.add('visible');
        });

        gsap.to(batch, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.08,
          overwrite: 'auto'
        });
      }
    });
  }

  function setupSplitTitleScroll() {
    if (!hasScrollTrigger || prefersReducedMotion) return;

    document.querySelectorAll('.section__title, .cta__title').forEach(function(title) {
      const words = splitTextToWords(title, 'split-word');
      if (!words.length) return;

      gsap.set(words, {
        yPercent: 110,
        opacity: 0,
        filter: 'blur(8px)'
      });

      ScrollTrigger.create({
        trigger: title,
        start: 'top 85%',
        once: true,
        onEnter: function() {
          gsap.to(words, {
            yPercent: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.06,
            overwrite: 'auto'
          });
        }
      });
    });
  }

  function setupParallaxImages() {
    if (!hasScrollTrigger || prefersReducedMotion) return;

    document.querySelectorAll('.case-section__image, .project-card__image').forEach(function(image) {
      const shift = Math.min((image.offsetHeight || 160) * 0.3, 48);
      gsap.fromTo(image, {
        y: -shift * 0.5
      }, {
        y: shift * 0.5,
        ease: 'none',
        overwrite: 'auto',
        scrollTrigger: {
          trigger: image,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    });
  }

  function setupCounters() {
    if (!hasScrollTrigger || prefersReducedMotion) return;

    document.querySelectorAll('.outcome-card__metric[data-count]').forEach(function(metric) {
      const rawTarget = (metric.dataset.count || '').trim();
      const target = Number(rawTarget);
      if (!Number.isFinite(target)) return;

      const text = metric.textContent.trim();
      const firstDigitIndex = text.search(/\d/);
      const lastDigitMatch = text.match(/\d(?=[^\d]*$)/);
      const lastDigitIndex = lastDigitMatch ? lastDigitMatch.index : text.length - 1;
      const prefix = firstDigitIndex > 0 ? text.slice(0, firstDigitIndex) : '';
      const suffix = lastDigitIndex >= 0 ? text.slice(lastDigitIndex + 1) : '';
      const decimals = rawTarget.includes('.') ? rawTarget.split('.')[1].length : 0;
      const counter = { value: 0 };

      ScrollTrigger.create({
        trigger: metric,
        start: 'top 85%',
        once: true,
        onEnter: function() {
          gsap.to(counter, {
            value: target,
            duration: 1.6,
            ease: 'power3.out',
            onUpdate: function() {
              const nextValue = decimals > 0 ? counter.value.toFixed(decimals) : Math.round(counter.value).toString();
              metric.textContent = prefix + nextValue + suffix;
            }
          });
        }
      });
    });
  }

  function setupTestimonialsTrack() {
    if (!hasScrollTrigger) return;

    const track = document.querySelector('.testimonials-track');
    const wrapper = document.querySelector('.testimonials-track-wrapper');
    if (!track || !wrapper) return;

    const durationProxy = { value: 40 };
    track.style.animationDuration = durationProxy.value + 's';

    ScrollTrigger.create({
      trigger: wrapper,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: function(self) {
        const nextDuration = 40 - self.progress * 6;
        gsap.to(durationProxy, {
          value: nextDuration,
          duration: 0.45,
          ease: 'power2.out',
          overwrite: 'auto',
          onUpdate: function() {
            track.style.animationDuration = durationProxy.value.toFixed(2) + 's';
          }
        });
      }
    });
  }

  function setupNavScrollBehavior() {
    const nav = document.getElementById('nav');
    if (!nav || prefersReducedMotion) return;

    let lastY = window.scrollY;
    let isHidden = false;
    let ticking = false;

    function updateNav() {
      const currentY = window.scrollY;
      const scrollingDown = currentY > lastY;
      const beyondThreshold = currentY > 200;

      if (scrollingDown && beyondThreshold && !isHidden) {
        isHidden = true;
        gsap.to(nav, {
          yPercent: -110,
          duration: 0.35,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      } else if ((!scrollingDown || !beyondThreshold) && isHidden) {
        isHidden = false;
        gsap.to(nav, {
          yPercent: 0,
          duration: 0.35,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      }

      lastY = currentY;
      ticking = false;
    }

    window.addEventListener('scroll', function() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateNav);
    }, { passive: true });
  }

  function setupCtaEntrance() {
    if (!hasScrollTrigger || prefersReducedMotion) return;

    const cta = document.querySelector('.cta');
    if (!cta) return;

    const title = cta.querySelector('.cta__title');
    const button = cta.querySelector('.btn');
    const words = splitTextToWords(title, 'split-word');

    if (button) {
      gsap.set(button, {
        scale: 0.9,
        y: 18,
        opacity: 0
      });
    }

    ScrollTrigger.create({
      trigger: cta,
      start: 'top 75%',
      once: true,
      onEnter: function() {
        if (words.length) {
          gsap.to(words, {
            yPercent: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.82,
            ease: 'power3.out',
            stagger: 0.07,
            overwrite: 'auto'
          });
        }

        if (button) {
          gsap.to(button, {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.9,
            ease: 'elastic.out(1, 0.55)',
            delay: 0.15,
            overwrite: 'auto'
          });
        }
      }
    });
  }

  function setupMagneticButtons() {
    if (!canHover || prefersReducedMotion) return;

    document.querySelectorAll('.btn').forEach(function(button) {
      button.addEventListener('mousemove', function(event) {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;

        gsap.to(button, {
          x: x * 0.15,
          y: y * 0.15,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });

      button.addEventListener('mouseleave', function() {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
          overwrite: 'auto'
        });
      });
    });
  }

  function setupLinkMicroAnimations() {
    if (!canHover || prefersReducedMotion) return;

    document.querySelectorAll('.nav__link').forEach(function(link) {
      link.addEventListener('mouseenter', function() {
        gsap.to(link, {
          y: -1,
          duration: 0.2,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });

      link.addEventListener('mouseleave', function() {
        gsap.to(link, {
          y: 0,
          duration: 0.25,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });
    });

    document.querySelectorAll('.footer__link').forEach(function(link) {
      link.addEventListener('mouseenter', function() {
        gsap.to(link, {
          opacity: 0.72,
          duration: 0.2,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });

      link.addEventListener('mouseleave', function() {
        gsap.to(link, {
          opacity: 1,
          duration: 0.25,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });
    });
  }

  function setupPageExitAnimation() {
    let isExiting = false;

    document.addEventListener('click', function(event) {
      const link = event.target.closest(internalLinkSelector);
      if (!link || isExiting) return;

      const rawHref = link.getAttribute('href');
      if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:') || rawHref.startsWith('javascript:')) return;
      if (link.target === '_blank' || link.hasAttribute('download')) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const url = new URL(rawHref, window.location.href);
      const isInternal = url.origin === window.location.origin;
      const isHtmlPage = /\.html$/i.test(url.pathname);

      if (!isInternal || !isHtmlPage) return;

      isExiting = true;
      event.preventDefault();
      event.stopImmediatePropagation();

      gsap.to(document.body, {
        opacity: 0,
        scale: 0.98,
        duration: 0.4,
        ease: 'power2.out',
        transformOrigin: '50% 50%',
        onComplete: function() {
          window.location.href = url.href;
        }
      });
    }, true);
  }

  function setupReducedMotionFallback() {
    if (!prefersReducedMotion) return;

    document.querySelectorAll('.reveal').forEach(function(element) {
      element.classList.add('visible');
      gsap.set(element, { clearProps: 'all', opacity: 1, y: 0 });
    });
  }

  function initializeAnimations() {
    injectRuntimeStyles();
    setupReducedMotionFallback();
    setupCustomCursor();
    setupProjectCardHover();
    setupScrollReveals();
    setupSplitTitleScroll();
    setupParallaxImages();
    setupCounters();
    setupTestimonialsTrack();
    setupNavScrollBehavior();
    setupCtaEntrance();
    setupMagneticButtons();
    setupLinkMicroAnimations();
    setupPageExitAnimation();

    const runEntrance = createHeroEntranceAnimation();

    waitForImages(3000)
      .then(animatePreloader)
      .then(function() {
        runEntrance();
        if (hasScrollTrigger) ScrollTrigger.refresh();
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAnimations, { once: true });
  } else {
    initializeAnimations();
  }
})();
