/* gunoi.md — shared page script: conversion events, contact form, smooth anchors. */
(function () {
  var ev = function (name, params) {
    if (typeof gtag === 'function') gtag('event', name, Object.assign({ page_location: location.href }, params || {}));
  };

  // Phone and WhatsApp clicks are the site's key conversions.
  // The estimator reports its own clicks (with the estimate ID), so skip those here.
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || a.closest('#estimator')) return;
    var href = a.getAttribute('href') || '';
    if (href.indexOf('tel:') === 0) { ev('phone_click'); ev('cta_call'); }
    else if (href.indexOf('wa.me') !== -1) { ev('whatsapp_click'); ev('cta_whatsapp'); }
  });

  // Smooth in-page anchors (respecting reduced motion).
  var smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var el = document.getElementById(a.getAttribute('href').slice(1));
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
    history.replaceState(null, '', a.getAttribute('href'));
  });

  // Contact form → Formspree, without leaving the page.
  var form = document.getElementById('leadForm');
  if (form) {
    var msg = form.querySelector('.form-msg');
    var btn = form.querySelector('button[type=submit]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var label = btn.textContent;
      btn.disabled = true;
      btn.textContent = form.dataset.sending;
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (r) {
          if (!r.ok) throw new Error(String(r.status));
          msg.style.color = 'var(--green)';
          msg.textContent = form.dataset.ok;
          form.reset();
          ev('form_submit');
        })
        .catch(function () {
          msg.style.color = 'var(--red)';
          msg.textContent = form.dataset.err;
        })
        .then(function () { btn.disabled = false; btn.textContent = label; });
    });
  }
})();
