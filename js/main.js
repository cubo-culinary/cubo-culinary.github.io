(function () {
  'use strict';
  var d = document, root = d.documentElement;
  root.classList.remove('no-js');

  /* Sticky header */
  var header = d.querySelector('.site-header');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 40); }
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobile menu */
  var toggle = d.querySelector('.menu-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = header.classList.toggle('menu-open');
      d.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', open);
    });
    d.querySelectorAll('.nav a').forEach(function (a) {
      a.addEventListener('click', function () { header.classList.remove('menu-open'); d.body.classList.remove('menu-open'); });
    });
  }

  /* Scroll reveal */
  var rv = d.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    rv.forEach(function (el) { io.observe(el); });
  } else { rv.forEach(function (el) { el.classList.add('in'); }); }

  /* Gallery filters + lightbox */
  var items = [].slice.call(d.querySelectorAll('.g-item'));
  if (items.length) {
    d.querySelectorAll('.filters button').forEach(function (b) {
      b.addEventListener('click', function () {
        d.querySelectorAll('.filters button').forEach(function (x) { x.classList.remove('on'); });
        b.classList.add('on');
        var f = b.getAttribute('data-f');
        items.forEach(function (it) { it.classList.toggle('hide', f !== 'all' && it.getAttribute('data-c').split(' ').indexOf(f) < 0); });
      });
    });
    var lb = d.querySelector('.lightbox'), lbi = lb.querySelector('img'), lbc = lb.querySelector('.cap'), cur = 0;
    function vis() { return items.filter(function (i) { return !i.classList.contains('hide'); }); }
    function show(i) { var v = vis(); cur = (i + v.length) % v.length; var im = v[cur].querySelector('img'); lbi.src = im.src; lbi.alt = im.alt; lbc.textContent = v[cur].getAttribute('data-cap') || ''; }
    items.forEach(function (it) { it.addEventListener('click', function () { var v = vis(); lb.classList.add('open'); show(v.indexOf(it)); }); });
    lb.querySelector('.lb-close').onclick = function () { lb.classList.remove('open'); };
    lb.querySelector('.lb-prev').onclick = function () { show(cur - 1); };
    lb.querySelector('.lb-next').onclick = function () { show(cur + 1); };
    lb.addEventListener('click', function (e) { if (e.target === lb) lb.classList.remove('open'); });
    d.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') lb.classList.remove('open');
      if (e.key === 'ArrowLeft') show(cur - 1);
      if (e.key === 'ArrowRight') show(cur + 1);
    });
  }

  /* Enquiry form -> opens the visitor's email app addressed to Cubo.
     Replace with Formspree / Netlify Forms / your host's form handler when live. */
  var form = d.querySelector('#enquiry');
  if (form) {
    var q = new URLSearchParams(location.search).get('type');
    if (q) { var sel = form.querySelector('select[name="type"]'); [].forEach.call(sel.options, function (o) { if (o.value === q) sel.value = q; }); }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = new FormData(form), lines = [];
      ['name', 'email', 'phone', 'etype', 'date', 'location', 'guests', 'budget', 'type', 'diet', 'message', 'extra'].forEach(function (k) { if (f.get(k)) lines.push(k.charAt(0).toUpperCase() + k.slice(1) + ': ' + f.get(k)); });
      location.href = 'mailto:info.cubo.au@gmail.com?subject=' + encodeURIComponent('Cubo enquiry — ' + (f.get('type') || 'General')) + '&body=' + encodeURIComponent(lines.join('\n'));
    });
  }

  /* Newsletter signup (same note as above) */
  d.querySelectorAll('.signup').forEach(function (s) {
    s.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = s.querySelector('input').value;
      if (v) location.href = 'mailto:info.cubo.au@gmail.com?subject=' + encodeURIComponent('Cubo Field Notes — sign me up') + '&body=' + encodeURIComponent(v);
    });
  });
})();
