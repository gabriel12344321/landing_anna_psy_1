/* =============================================
   Анна Копысова — Лендинг
   Минимальный JS: аккордеон + fade-in
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  // --- Accordion ---
  var triggers = document.querySelectorAll('.accordion__trigger');

  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      var content = this.nextElementSibling;

      // Закрыть все остальные в этом аккордеоне
      var parent = this.closest('.accordion');
      parent.querySelectorAll('.accordion__trigger').forEach(function (other) {
        if (other !== trigger) {
          other.setAttribute('aria-expanded', 'false');
          other.nextElementSibling.style.maxHeight = null;
        }
      });

      // Переключить текущий
      if (expanded) {
        this.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = null;
      } else {
        this.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // --- Fade-in при скролле ---
  var fadeElements = document.querySelectorAll(
    '.recognize, .about, .process, .results, .pricing, .faq, .cta'
  );

  fadeElements.forEach(function (el) {
    el.classList.add('fade-in');
  });

  function checkFade() {
    fadeElements.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      var windowHeight = window.innerHeight;
      if (rect.top < windowHeight - 60) {
        el.classList.add('visible');
      }
    });
  }

  // Первая проверка
  checkFade();

  // При скролле
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        checkFade();
        ticking = false;
      });
      ticking = true;
    }
  });

});
