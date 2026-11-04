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

  /* Enquiry form -> emailed to cuboculinary@gmail.com through Web3Forms.
     The access key is public by design (it can only send to Cubo's inbox); manage or replace it at web3forms.com. */
  var form = d.querySelector('#enquiry');
  if (form) {
    var q = new URLSearchParams(location.search).get('type');
    if (q) { var sel = form.querySelector('select[name="type"]'); [].forEach.call(sel.options, function (o) { if (o.value === q) sel.value = q; }); }
    var btn = form.querySelector('button[type="submit"]'), status = form.querySelector('.form-status');
    var showStatus = function (msg, ok) {
      status.textContent = msg; status.hidden = false;
      status.classList.toggle('error', !ok); status.focus();
    };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = new FormData(form), name = f.get('name').trim(), email = f.get('email').trim();
      var thanks = 'Thank you, ' + name + '. Your enquiry is on its way, and we’ll reply to ' + email + ' soon.';
      // bots tick the hidden box; act as if it worked so they don't retry
      if (form.botcheck.checked) { form.reset(); return showStatus(thanks, true); }
      var data = { access_key: '973919c9-3647-49dd-b0d2-66c8a45863ad', subject: 'Cubo enquiry — ' + (f.get('type') || 'General'), from_name: 'Cubo website', replyto: email };
      // label the email lines with the visible field labels (text before any "required" marker)
      [].forEach.call(form.querySelectorAll('[name]'), function (el) {
        if (el.value && el.name !== 'botcheck') data[form.querySelector('label[for="' + el.id + '"]').firstChild.textContent.trim()] = el.value.trim();
      });
      btn.disabled = true; btn.textContent = 'Sending…';
      var ctrl = window.AbortController ? new AbortController() : null, timer = ctrl && setTimeout(function () { ctrl.abort(); }, 15000);
      fetch('https://api.web3forms.com/submit', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data), signal: ctrl && ctrl.signal
      }).then(function (r) {
        return r.json().then(function (j) { if (!r.ok || !j.success) throw new Error(j.message || 'HTTP ' + r.status); });
      }).then(function () {
        if (window.umami) umami.track('Enquiry sent', { experience: f.get('type') || 'Not sure yet', occasion: f.get('etype') || 'Not given' });
        form.reset(); showStatus(thanks, true);
      }, function (err) {
        if (window.umami) umami.track('Enquiry failed', { reason: String(err && err.message).slice(0, 60) });
        showStatus('Sorry, your enquiry didn’t send. Please try again, or email us at cuboculinary@gmail.com.', false);
      }).then(function () {
        clearTimeout(timer); btn.disabled = false; btn.textContent = 'Send enquiry';
      });
    });
  }

  /* Copy buttons: copy the email address and confirm with a toast */
  var copyBtns = d.querySelectorAll('.copy-btn');
  if (copyBtns.length) {
    var toast = d.createElement('div');
    toast.className = 'toast'; toast.setAttribute('role', 'status');
    d.body.appendChild(toast);
    var say = function (msg) {
      toast.textContent = msg; toast.classList.add('show');
      clearTimeout(toast.t); toast.t = setTimeout(function () { toast.classList.remove('show'); }, 2500);
    };
    // older copy method for browsers or embedded views that block the Clipboard API
    var legacyCopy = function (text, btn) {
      var ta = d.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      d.body.appendChild(ta); ta.select();
      var ok = false; try { ok = d.execCommand('copy'); } catch (e) {}
      ta.remove(); btn.focus();
      return ok ? Promise.resolve() : Promise.reject();
    };
    copyBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        var text = b.getAttribute('data-copy');
        (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject())['catch'](function () { return legacyCopy(text, b); }).then(function () {
          say('Email address copied');
          if (window.umami) umami.track('Email copied', { page: location.pathname });
        }, function () { say('Couldn’t copy. The address is ' + text); });
      });
    });
  }

  /* Analytics (Umami, cookieless): count clicks on links towards an enquiry or a follow */
  d.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || !window.umami) return;
    var h = a.getAttribute('href');
    var name = /^\/?enquire/.test(h) ? 'Enquire link'
      : h.indexOf('instagram.com') > -1 ? 'Instagram link'
      : h.indexOf('mailto:') === 0 ? 'Email link'
      : /^\/?collaborate/.test(h) ? 'Work with us link' : '';
    if (name) umami.track(name, { page: location.pathname, link: a.textContent.replace(/\s+/g, ' ').trim().slice(0, 60) });
  });
})();
