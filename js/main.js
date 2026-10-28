(function () {
  'use strict';
  var d = document, root = d.documentElement;
  root.classList.remove('no-js');

  /* Sticky header */
  var header = d.querySelector('.site-header');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 40); }
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  /* Keep Tab inside an open overlay */
  function trapTab(box, e) {
    var f = [].filter.call(box.querySelectorAll('a[href], button'), function (el) { return el.offsetParent !== null; });
    if (e.key !== 'Tab' || !f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && d.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && d.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* Mobile menu */
  var toggle = d.querySelector('.menu-toggle');
  if (toggle) {
    var setMenu = function (open) {
      header.classList.toggle('menu-open', open);
      d.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', open);
    };
    toggle.addEventListener('click', function () { setMenu(!header.classList.contains('menu-open')); });
    d.querySelectorAll('.nav a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    d.addEventListener('keydown', function (e) {
      if (!header.classList.contains('menu-open')) return;
      if (e.key === 'Escape') { setMenu(false); toggle.focus(); }
      else trapTab(header, e);
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
        d.querySelectorAll('.filters button').forEach(function (x) { x.classList.remove('on'); x.setAttribute('aria-pressed', 'false'); });
        b.classList.add('on'); b.setAttribute('aria-pressed', 'true');
        var f = b.getAttribute('data-f');
        d.querySelector('.g-grid').classList.toggle('filtered', f !== 'all');
        items.forEach(function (it) { it.classList.toggle('hide', f !== 'all' && it.getAttribute('data-c').split(' ').indexOf(f) < 0); });
      });
    });
    var lb = d.querySelector('.lightbox'), lbi = lb.querySelector('img'), lbc = lb.querySelector('.cap'), cur = 0, opener = null;
    function vis() { return items.filter(function (i) { return !i.classList.contains('hide'); }); }
    function show(i) { var v = vis(); cur = (i + v.length) % v.length; var im = v[cur].querySelector('img'); lbi.src = im.src; lbi.alt = im.alt; lbc.textContent = (v[cur].getAttribute('data-cap') || '') + '  ·  ' + (cur + 1) + ' / ' + v.length; }
    function closeLb() { lb.classList.remove('open'); d.body.style.overflow = ''; if (opener) opener.focus(); }
    items.forEach(function (it) {
      it.addEventListener('click', function () {
        opener = it; lb.classList.add('open'); d.body.style.overflow = 'hidden';
        show(vis().indexOf(it)); lb.querySelector('.lb-close').focus();
      });
    });
    lb.querySelector('.lb-close').onclick = closeLb;
    lb.querySelector('.lb-prev').onclick = function () { show(cur - 1); };
    lb.querySelector('.lb-next').onclick = function () { show(cur + 1); };
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    d.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLb();
      else if (e.key === 'ArrowLeft') show(cur - 1);
      else if (e.key === 'ArrowRight') show(cur + 1);
      else trapTab(lb, e);
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
      // label the email lines with the visible field labels (text before any "required" marker)
      [].forEach.call(form.querySelectorAll('[name]'), function (el) { if (el.value) lines.push(form.querySelector('label[for="' + el.id + '"]').firstChild.textContent.trim() + ': ' + el.value); });
      location.href = 'mailto:info.cubo.au@gmail.com?subject=' + encodeURIComponent('Cubo enquiry — ' + (f.get('type') || 'General')) + '&body=' + encodeURIComponent(lines.join('\n'));
    });
  }
})();
