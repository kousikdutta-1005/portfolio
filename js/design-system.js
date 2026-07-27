/**
 * Design System Interactive Features
 * Handles sidebar navigation, easing demos, duration demos, copy-to-clipboard,
 * animation replay, smooth scrolling, color swatches, and theme toggling.
 */

(function() {
  'use strict';

  /**
   * 1. SIDEBAR ACTIVE STATE TRACKING
   * Highlights nav links as user scrolls using IntersectionObserver
   */
  const initSidebarActiveState = () => {
    const navLinks = document.querySelectorAll('.ds-nav-link');
    
    if (navLinks.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Trigger when section is in middle of viewport
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          updateActiveLink(sectionId);
        }
      });
    }, observerOptions);

    // Observe all sections that have corresponding nav links
    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      const sectionId = href ? href.substring(1) : null; // Remove # from href
      
      if (sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
          observer.observe(section);
        }
      }
    });
  };

  /**
   * Update active nav link state
   */
  const updateActiveLink = (sectionId) => {
    const navLinks = document.querySelectorAll('.ds-nav-link');
    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      const linkTarget = href ? href.substring(1) : null;
      
      if (linkTarget === sectionId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  /**
   * 2. EASING CURVE DEMOS
   * Animates a dot from left to right on hover using easing from data-easing attribute
   */
  const initEasingDemos = () => {
    const cards = document.querySelectorAll('.ds-easing-card');
    
    cards.forEach((card) => {
      const dot = card.querySelector('.ds-easing-card__dot');
      const easing = card.getAttribute('data-easing') || 'linear';

      if (!dot) return;

      card.addEventListener('mouseenter', () => {
        playEasingAnimation(dot, easing);
      });

      card.addEventListener('mouseleave', () => {
        resetEasingAnimation(dot);
      });
    });
  };

  /**
   * Play easing animation on dot
   */
  const playEasingAnimation = (dot, easing) => {
    dot.style.animation = 'none';
    
    // Trigger reflow to restart animation
    void dot.offsetWidth;
    
    dot.style.animation = `easingDemoSlide 2s ${easing} forwards`;
  };

  /**
   * Reset easing animation
   */
  const resetEasingAnimation = (dot) => {
    dot.style.animation = 'none';
    dot.style.transform = 'translateX(0)';
  };

  /**
   * 3. DURATION DEMOS
   * Fills a progress bar from 0 to 100% on hover using duration from data-duration attribute
   */
  const initDurationDemos = () => {
    const cards = document.querySelectorAll('.ds-duration-card');
    
    cards.forEach((card) => {
      const bar = card.querySelector('.ds-duration-card__bar');
      const duration = card.getAttribute('data-duration') || '1s';

      if (!bar) return;

      card.addEventListener('mouseenter', () => {
        playDurationAnimation(bar, duration);
      });

      card.addEventListener('mouseleave', () => {
        resetDurationAnimation(bar);
      });
    });
  };

  /**
   * Play duration animation on progress bar
   */
  const playDurationAnimation = (bar, duration) => {
    bar.style.animation = 'none';
    
    // Trigger reflow to restart animation
    void bar.offsetWidth;
    
    bar.style.animation = `durationDemoFill ${duration} ease-out forwards`;
  };

  /**
   * Reset duration animation
   */
  const resetDurationAnimation = (bar) => {
    bar.style.animation = 'none';
    bar.style.width = '0%';
  };

  /**
   * 4. COPY-TO-CLIPBOARD
   * Copies data-copy attribute value to clipboard and shows tooltip
   */
  const initCopyToClipboard = () => {
    const elements = document.querySelectorAll('.ds-copy');
    
    elements.forEach((element) => {
      element.style.cursor = 'pointer';
      
      element.addEventListener('click', async (e) => {
        e.preventDefault();
        
        const textToCopy = element.getAttribute('data-copy');
        
        if (!textToCopy) return;
        
        try {
          await navigator.clipboard.writeText(textToCopy);
          showCopyTooltip(element);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      });
    });
  };

  /**
   * Show "Copied!" tooltip briefly
   */
  const showCopyTooltip = (element) => {
    const originalText = element.textContent;
    const originalClass = element.className;
    
    element.textContent = 'Copied!';
    element.classList.add('ds-copy--copied');
    
    setTimeout(() => {
      element.textContent = originalText;
      element.className = originalClass;
    }, 2000);
  };

  /**
   * 5. ANIMATION REPLAY
   * Replays animation on sibling elements by removing and re-adding animation class
   */
  const initAnimationReplay = () => {
    const triggers = document.querySelectorAll('.ds-animation-demo__trigger');
    
    triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const container = trigger.closest('.ds-animation-demo');
        
        if (!container) return;
        
        const animatedElements = container.querySelectorAll('[class*="ds-animation-"]');
        
        animatedElements.forEach((element) => {
          // Get animation class (all classes containing 'animation')
          const animationClass = Array.from(element.classList).find(
            (cls) => cls.includes('animation') && cls !== 'ds-animation-demo'
          );
          
          if (animationClass) {
            element.classList.remove(animationClass);
            
            // Trigger reflow to restart animation
            void element.offsetWidth;
            
            element.classList.add(animationClass);
          }
        });
      });
    });
  };

  /**
   * 6. SMOOTH SCROLL FOR SIDEBAR LINKS
   * Smoothly scrolls to target section when clicking nav links
   */
  const initSmoothScroll = () => {
    const navLinks = document.querySelectorAll('.ds-nav-link');
    
    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        if (href && href.startsWith('#')) {
          e.preventDefault();
          
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  };

  /**
   * 7. COLOR SWATCH INTERACTION
   * Copies hex value from data-hex attribute on click
   */
  const initColorSwatches = () => {
    const swatches = document.querySelectorAll('.ds-color-swatch');
    
    swatches.forEach((swatch) => {
      swatch.style.cursor = 'pointer';
      
      swatch.addEventListener('click', async () => {
        const hexValue = swatch.getAttribute('data-hex');
        
        if (!hexValue) return;
        
        try {
          await navigator.clipboard.writeText(hexValue);
          showSwatchTooltip(swatch);
        } catch (err) {
          console.error('Failed to copy hex value:', err);
        }
      });
    });
  };

  /**
   * Show tooltip on color swatch
   */
  const showSwatchTooltip = (swatch) => {
    const tooltip = document.createElement('div');
    tooltip.className = 'ds-swatch-tooltip';
    tooltip.textContent = 'Copied!';
    
    swatch.appendChild(tooltip);
    
    setTimeout(() => {
      tooltip.remove();
    }, 1500);
  };

  /**
   * 8. THEME TOGGLE PLACEHOLDER
   * Placeholder for future light/dark theme toggle functionality
   */
  const initThemeToggle = () => {
    const themeToggle = document.querySelector('[data-theme-toggle]');
    
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', () => {
      toggleTheme();
    });
  };

  /**
   * Toggle between light and dark theme
   */
  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    console.log(`Theme toggled to: ${newTheme}`);
  };

  /**
   * Add CSS animations if not already present
   */
  const injectStyles = () => {
    // Check if styles already exist
    if (document.getElementById('ds-animations-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'ds-animations-styles';
    style.textContent = `
      @keyframes easingDemoSlide {
        from {
          transform: translateX(0);
        }
        to {
          transform: translateX(100%);
        }
      }
      
      @keyframes durationDemoFill {
        from {
          width: 0%;
        }
        to {
          width: 100%;
        }
      }
      
      .ds-copy--copied {
        pointer-events: none;
        opacity: 0.7;
      }
      
      .ds-swatch-tooltip {
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 4px 8px;
        border-radius: 3px;
        font-size: 12px;
        white-space: nowrap;
        pointer-events: none;
        margin-bottom: 4px;
        z-index: 1000;
        animation: fadeInOut 1.5s ease-out;
      }
      
      @keyframes fadeInOut {
        0% {
          opacity: 0;
          transform: translateX(-50%) translateY(4px);
        }
        10% {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        90% {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        100% {
          opacity: 0;
          transform: translateX(-50%) translateY(-4px);
        }
      }
    `;
    
    document.head.appendChild(style);
  };

  /**
   * Initialize all features
   */
  const init = () => {
    injectStyles();
    initSidebarActiveState();
    initEasingDemos();
    initDurationDemos();
    initCopyToClipboard();
    initAnimationReplay();
    initSmoothScroll();
    initColorSwatches();
    initThemeToggle();
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose toggle theme function globally for manual access if needed
  window.dsToggleTheme = toggleTheme;
})();
