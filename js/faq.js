// faq.js — FAQ accordion with aria-expanded and CSS max-height animation

(function () {
  'use strict';

  document.querySelectorAll('.faq__question').forEach(button => {
    button.setAttribute('aria-expanded', 'false');

    button.addEventListener('click', function () {
      const item   = this.closest('.faq__item');
      const answer = item.querySelector('.faq__answer');
      const isOpen = item.classList.contains('faq__item--open');

      // Close all other open items on the same FAQ list
      const parentFaq = item.closest('.faq');
      if (parentFaq) {
        parentFaq.querySelectorAll('.faq__item--open').forEach(openItem => {
          if (openItem !== item) {
            openItem.classList.remove('faq__item--open');
            openItem.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
          }
        });
      }

      // Toggle current item
      item.classList.toggle('faq__item--open', !isOpen);
      this.setAttribute('aria-expanded', String(!isOpen));

      // Announce to screen readers
      if (answer) {
        answer.setAttribute('aria-hidden', String(isOpen));
      }
    });
  });
})();
