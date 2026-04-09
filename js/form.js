// form.js — Client-side validation with inline error messages

(function () {
  'use strict';

  const form = document.querySelector('.form');
  if (!form) return;

  // ── Helpers ────────────────────────────────────────────────
  function showError(field, msg) {
    field.classList.add('is-error');
    const err = field.parentElement.querySelector('.form__error') ||
                field.closest('.form__group').querySelector('.form__error');
    if (err) {
      err.textContent = msg;
      err.classList.add('is-visible');
    }
  }

  function clearError(field) {
    field.classList.remove('is-error');
    const group = field.closest('.form__group');
    if (!group) return;
    const err = group.querySelector('.form__error');
    if (err) err.classList.remove('is-visible');
  }

  // ── Live clearing on input ────────────────────────────────
  form.querySelectorAll('.form__input, .form__select, .form__textarea').forEach(field => {
    field.addEventListener('input', () => clearError(field));
    field.addEventListener('change', () => clearError(field));
  });

  // ── Validation rules ──────────────────────────────────────
  function validateField(field) {
    const val = field.value.trim();
    const type = field.type;

    if (field.required && !val) {
      showError(field, 'This field is required.');
      return false;
    }

    if (type === 'email' && val) {
      const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRx.test(val)) {
        showError(field, 'Please enter a valid email address.');
        return false;
      }
    }

    clearError(field);
    return true;
  }

  // ── Submit handler ────────────────────────────────────────
  form.addEventListener('submit', function (e) {
    let valid = true;

    form.querySelectorAll('.form__input, .form__select, .form__textarea').forEach(field => {
      if (!validateField(field)) valid = false;
    });

    if (!valid) {
      e.preventDefault();
      // Focus the first error field
      const firstErr = form.querySelector('.is-error');
      if (firstErr) firstErr.focus();
    }
    // If valid, form submits normally to action URL (Formspree → confirmation.html)
  });
})();
