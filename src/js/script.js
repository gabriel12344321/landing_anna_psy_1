/* =============================================
   Анна Копысова — Лендинг
   JS: хедер, sticky CTA, аккордеон, fade-in, cookies
   Версия: 2.0 (по ТЗ v2.0)
   Дата: 10.04.2026
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  // --- Sticky Header ---
  var header = document.getElementById('header');
  var headerThreshold = 100;

  function handleHeader() {
    var currentScroll = window.pageYOffset;
    if (currentScroll > headerThreshold) {
      header.classList.add('visible');
    } else {
      header.classList.remove('visible');
    }
  }

  // --- Sticky CTA Mobile ---
  var stickyCta = document.getElementById('stickyCta');
  var ctaSection = document.getElementById('cta');
  var stickyThreshold = 300;

  function handleStickyCta() {
    var currentScroll = window.pageYOffset;
    var ctaRect = ctaSection.getBoundingClientRect();
    var windowHeight = window.innerHeight;

    if (currentScroll > stickyThreshold && ctaRect.top > windowHeight) {
      stickyCta.classList.add('visible');
    } else {
      stickyCta.classList.remove('visible');
    }
  }

  // Scroll handler with RAF throttle
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        handleHeader();
        handleStickyCta();
        ticking = false;
      });
      ticking = true;
    }
  });

  // --- Accordion ---
  var triggers = document.querySelectorAll('.accordion__trigger');

  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      var content = this.nextElementSibling;

      var parent = this.closest('.accordion');
      parent.querySelectorAll('.accordion__trigger').forEach(function (other) {
        if (other !== trigger) {
          other.setAttribute('aria-expanded', 'false');
          other.nextElementSibling.style.maxHeight = null;
        }
      });

      if (expanded) {
        this.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = null;
      } else {
        this.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // --- Fade-in with IntersectionObserver ---
  var fadeElements = document.querySelectorAll(
    '.recognize, .specializations, .about, .gestalt, .process, .first-session, .results, .testimonials, .pricing, .cta'
  );

  fadeElements.forEach(function (el) {
    el.classList.add('fade-in');
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback for old browsers
    fadeElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // --- Stagger animation for cards ---
  var staggerContainers = document.querySelectorAll(
    '.recognize__cards, .spec__grid, .process__steps, .session__steps, .results__list'
  );

  if ('IntersectionObserver' in window) {
    var staggerObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var children = entry.target.children;
          Array.prototype.forEach.call(children, function (child, index) {
            child.style.transitionDelay = (index * 0.1) + 's';
            child.classList.add('stagger-visible');
          });
          staggerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    staggerContainers.forEach(function (container) {
      var children = container.children;
      Array.prototype.forEach.call(children, function (child) {
        child.classList.add('stagger');
      });
      staggerObserver.observe(container);
    });
  }

  // --- Cookie Banner ---
  var cookieBanner = document.getElementById('cookieBanner');
  var cookieAccept = document.getElementById('cookieAccept');
  var cookieReject = document.getElementById('cookieReject');

  var cookieChoice = localStorage.getItem('cookie-consent');

  if (cookieChoice === null) {
    cookieBanner.classList.add('visible');
  }

  if (cookieAccept) {
    cookieAccept.addEventListener('click', function () {
      localStorage.setItem('cookie-consent', 'accepted');
      cookieBanner.classList.remove('visible');
      // Здесь загружать Яндекс.Метрику
    });
  }

  if (cookieReject) {
    cookieReject.addEventListener('click', function () {
      localStorage.setItem('cookie-consent', 'rejected');
      cookieBanner.classList.remove('visible');
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Initial checks
  handleHeader();
  handleStickyCta();

});
