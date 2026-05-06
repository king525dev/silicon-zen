/*!
 * sz.js — Silicon Zen UI Library v1.1.0
 * by king525dev
 * Vanilla JS plugin for interactive SZ components.
 * No dependencies. ~5kb minified.
 *
 * Usage:
 *   <script src="sz.js"></script>
 *   SZ.init(); // auto-wires everything on DOMContentLoaded
 *
 * Or manually:
 *   SZ.theme('obsidian');
 *   SZ.modal.open('#my-modal');
 *   SZ.progress('#my-bar', 75);
 *   SZ.toast('Build complete', 'ok');
 */

(function (global) {
  'use strict';

  /* ── internal helpers ─────────────────────────── */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const on = (el, ev, fn, opts) => el && el.addEventListener(ev, fn, opts);

  /* ══════════════════════════════════════════════════════
     THEME
     SZ.theme('parchment' | 'obsidian', target?)
     target defaults to document.documentElement
  ══════════════════════════════════════════════════════ */
  function theme(name, target = document.documentElement) {
    if (!['parchment', 'obsidian'].includes(name)) {
      console.warn(`[SZ] Unknown theme "${name}". Use "parchment" or "obsidian".`);
      return;
    }
    target.dataset.szTheme = name;
    document.dispatchEvent(new CustomEvent('sz:theme', { detail: { theme: name } }));
  }

  function toggleTheme(target = document.documentElement) {
    const current = target.dataset.szTheme || 'parchment';
    theme(current === 'parchment' ? 'obsidian' : 'parchment', target);
  }

  /* ══════════════════════════════════════════════════════
     MODAL
     SZ.modal.open(selector | element)
     SZ.modal.close(selector | element)
     SZ.modal.toggle(selector | element)
  ══════════════════════════════════════════════════════ */
  const modal = {
    open(target) {
      const el = typeof target === 'string' ? $(target) : target;
      if (!el) return;
      el.classList.add('is-open');
      el.removeAttribute('aria-hidden');
      document.body.style.overflow = 'hidden';
      const firstFocusable = el.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (firstFocusable) firstFocusable.focus();
      document.dispatchEvent(new CustomEvent('sz:modal:open', { detail: { el } }));
    },
    close(target) {
      const el = typeof target === 'string' ? $(target) : target;
      if (!el) return;
      el.classList.remove('is-open');
      el.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      document.dispatchEvent(new CustomEvent('sz:modal:close', { detail: { el } }));
    },
    toggle(target) {
      const el = typeof target === 'string' ? $(target) : target;
      if (!el) return;
      el.classList.contains('is-open') ? this.close(el) : this.open(el);
    }
  };

  function wireModals() {
    /* data-sz-modal-open="#modal-id" — opens a modal */
    $$('[data-sz-modal-open]').forEach(trigger => {
      on(trigger, 'click', e => {
        e.preventDefault();
        modal.open(trigger.dataset.szModalOpen);
      });
    });

    /* data-sz-modal-close — closes the nearest overlay */
    $$('[data-sz-modal-close]').forEach(btn => {
      on(btn, 'click', e => {
        e.preventDefault();
        const overlay = btn.closest('.sz-modal-overlay');
        if (overlay) modal.close(overlay);
      });
    });

    /* Click overlay backdrop to close */
    $$('.sz-modal-overlay').forEach(overlay => {
      on(overlay, 'click', e => {
        if (e.target === overlay) modal.close(overlay);
      });
    });

    /* ESC to close open modals */
    on(document, 'keydown', e => {
      if (e.key !== 'Escape') return;
      $$('.sz-modal-overlay.is-open').forEach(el => modal.close(el));
    });
  }

  /* ══════════════════════════════════════════════════════
     PROGRESS BAR
     SZ.progress(selector | element, percent, opts?)
     opts: { duration, label, onComplete }
  ══════════════════════════════════════════════════════ */
  function progress(target, percent, opts = {}) {
    const wrap = typeof target === 'string' ? $(target) : target;
    if (!wrap) return;
    const fill  = wrap.querySelector('.sz-progress__fill') || wrap;
    const label = opts.labelEl ? (typeof opts.labelEl === 'string' ? $(opts.labelEl) : opts.labelEl) : null;
    const pct   = Math.max(0, Math.min(100, percent));

    fill.style.width = pct + '%';
    fill.setAttribute('aria-valuenow', pct);

    if (label) label.textContent = opts.labelText || pct + '%';
    if (pct >= 100 && opts.onComplete) opts.onComplete();
  }

  /* Animated progress runner — ticks from 0 to 100 */
  function progressRun(target, opts = {}) {
    const wrap    = typeof target === 'string' ? $(target) : target;
    if (!wrap) return;
    const fill    = wrap.querySelector('.sz-progress__fill') || wrap;
    const labelEl = opts.labelEl ? (typeof opts.labelEl === 'string' ? $(opts.labelEl) : opts.labelEl) : null;
    const stages  = opts.stages || ['LOADING...','PARSING...','COMPILING...','OPTIMISING...','COMPLETE'];
    let pct = 0;
    fill.style.width = '0%';

    const iv = setInterval(() => {
      pct += Math.random() * 14 + 3;
      if (pct >= 100) {
        pct = 100;
        fill.style.width = '100%';
        if (labelEl) labelEl.textContent = opts.doneText || '✓ COMPLETE';
        clearInterval(iv);
        if (opts.onComplete) opts.onComplete();
        return;
      }
      fill.style.width = pct + '%';
      if (labelEl) {
        const idx   = Math.floor(pct / (100 / stages.length));
        const stage = stages[Math.min(idx, stages.length - 1)];
        const filled = Math.floor(pct / 10);
        const empty  = 10 - filled;
        labelEl.textContent = `${stage} ${'█'.repeat(filled)}${'▒'.repeat(empty)} ${Math.floor(pct)}%`;
      }
    }, opts.interval || 110);

    return { stop: () => clearInterval(iv) };
  }

  /* ══════════════════════════════════════════════════════
     TABS
     Wires .sz-tabs__item elements with aria-controls="#panel-id"
  ══════════════════════════════════════════════════════ */
  function wireTabs() {
    $$('.sz-tabs').forEach(tabGroup => {
      const items  = $$('.sz-tabs__item', tabGroup);
      items.forEach(item => {
        on(item, 'click', e => {
          e.preventDefault();
          const panelId = item.dataset.szTab || item.getAttribute('aria-controls');
          // deactivate all in group
          items.forEach(i => {
            i.classList.remove('is-active');
            i.setAttribute('aria-selected', 'false');
          });
          // activate clicked
          item.classList.add('is-active');
          item.setAttribute('aria-selected', 'true');
          // hide / show panels
          const scope = tabGroup.closest('[data-sz-tabs-scope]') || document;
          $$('.sz-tab-panel', scope).forEach(p => p.classList.remove('is-active'));
          const panel = $('#' + panelId, scope) || $(panelId, scope);
          if (panel) panel.classList.add('is-active');
          document.dispatchEvent(new CustomEvent('sz:tab', { detail: { tab: item, panel } }));
        });
      });
    });
  }

  /* ══════════════════════════════════════════════════════
     ACCORDION
  ══════════════════════════════════════════════════════ */
  function wireAccordions() {
    $$('.sz-accordion__trigger').forEach(trigger => {
      on(trigger, 'click', () => {
        const item   = trigger.closest('.sz-accordion__item');
        const parent = item.closest('.sz-accordion');
        const isOpen = item.classList.contains('is-open');

        /* Close all siblings if data-sz-single */
        if (parent && parent.dataset.szSingle !== undefined) {
          $$('.sz-accordion__item.is-open', parent).forEach(i => i.classList.remove('is-open'));
        }
        item.classList.toggle('is-open', !isOpen);
      });
    });
  }

  /* ══════════════════════════════════════════════════════
     CHECKBOXES
     Wires .sz-checkbox elements (they don't use <input> by default)
  ══════════════════════════════════════════════════════ */
  function wireCheckboxes() {
    $$('.sz-checkbox').forEach(el => {
      // skip if it wraps a real <input>
      if (el.querySelector('input[type=checkbox]')) {
        const input = el.querySelector('input[type=checkbox]');
        const box   = el.querySelector('.sz-checkbox__box');
        const sync  = () => el.classList.toggle('is-checked', input.checked);
        sync();
        on(input, 'change', sync);
        return;
      }
      on(el, 'click', () => el.classList.toggle('is-checked'));
      on(el, 'keydown', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); el.classList.toggle('is-checked'); } });
      el.setAttribute('tabindex', '0');
      el.setAttribute('role', 'checkbox');
    });
  }

  /* ══════════════════════════════════════════════════════
     TOAST
     SZ.toast(message, type?, duration?)
     type: 'ok' | 'warn' | 'error' | 'info' (default)
  ══════════════════════════════════════════════════════ */
  let toastContainer = null;

  function ensureToastContainer() {
    if (toastContainer) return toastContainer;
    toastContainer = document.createElement('div');
    toastContainer.className = 'sz-toast-container';
    document.body.appendChild(toastContainer);
    return toastContainer;
  }

  function toast(message, type = 'info', duration = 3500) {
    const container = ensureToastContainer();
    const el = document.createElement('div');
    const icons = { ok: '✓', warn: '⚠', error: '✗', info: '◈' };
    el.className = `sz-toast${type !== 'info' ? ' sz-toast--' + type : ''}`;
    el.innerHTML = `<span>${icons[type] || icons.info}</span><span>${message}</span>`;
    container.appendChild(el);

    setTimeout(() => {
      el.classList.add('is-exiting');
      setTimeout(() => el.remove(), 250);
    }, duration);

    return el;
  }

  /* ══════════════════════════════════════════════════════
     SCROLL REVEAL
     Adds .is-visible to .sz-reveal elements when in viewport
  ══════════════════════════════════════════════════════ */
  function wireReveal() {
    if (!('IntersectionObserver' in window)) {
      $$('.sz-reveal').forEach(el => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    $$('.sz-reveal').forEach(el => io.observe(el));
  }

  /* ══════════════════════════════════════════════════════
     DOCK NAV
     Highlights .sz-dock__item matching current scroll position.
     Reads href="#section-id" from each dock item.
  ══════════════════════════════════════════════════════ */
  function wireDock() {
    const items = $$('.sz-dock__item');
    const topLinks = $$('.sz-topnav__links a');
    if (!items.length && !topLinks.length) return;

    const all = [...items, ...topLinks];
    const sectionIds = all
      .map(a => (a.getAttribute('href') || '').replace('#', ''))
      .filter(Boolean)
      .filter((v, i, arr) => arr.indexOf(v) === i);

    function update() {
      let current = sectionIds[0];
      sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) current = id;
      });
      all.forEach(a => {
        const id = (a.getAttribute('href') || '').replace('#', '');
        a.classList.toggle('is-active', id === current);
        a.setAttribute('aria-current', id === current ? 'page' : 'false');
      });
    }
    on(window, 'scroll', update, { passive: true });
    update();
  }

  /* ══════════════════════════════════════════════════════
     THEME TOGGLE BUTTONS
     data-sz-theme-toggle — toggles between themes
     data-sz-theme-set="obsidian" — sets a specific theme
  ══════════════════════════════════════════════════════ */
  function wireThemeToggles() {
    $$('[data-sz-theme-toggle]').forEach(btn => {
      on(btn, 'click', () => toggleTheme());
    });
    $$('[data-sz-theme-set]').forEach(btn => {
      on(btn, 'click', () => theme(btn.dataset.szThemeSet));
    });
  }

  /* ══════════════════════════════════════════════════════
     FLICKER — triggers .sz-flicker on [data-sz-flicker]
  ══════════════════════════════════════════════════════ */
  function wireFlicker() {
    $$('[data-sz-flicker]').forEach(btn => {
      on(btn, 'click', e => {
        e.preventDefault();
        const targetSel = btn.dataset.szFlicker;
        const targets = targetSel ? $$(targetSel) : [document.body];
        targets.forEach(t => {
          t.classList.remove('sz-flicker');
          void t.offsetWidth;
          t.classList.add('sz-flicker');
        });
      });
    });
  }

  /* ══════════════════════════════════════════════════════
     PROGRESS BUTTON WIRING
     data-sz-progress-run="#bar-id"
     data-sz-progress-label="#label-id"   (optional)
  ══════════════════════════════════════════════════════ */
  function wireProgressButtons() {
    $$('[data-sz-progress-run]').forEach(btn => {
      on(btn, 'click', e => {
        e.preventDefault();
        const barEl   = $(btn.dataset.szProgressRun);
        const labelEl = btn.dataset.szProgressLabel ? $(btn.dataset.szProgressLabel) : null;
        progressRun(barEl, { labelEl });
      });
    });
  }

  /* ══════════════════════════════════════════════════════
     TYPEWRITER
     data-sz-typewriter  on the target element
     data-sz-tw-words="word1,word2,word3" — cycling words
     data-sz-tw-speed="130"               — ms per char
  ══════════════════════════════════════════════════════ */
  function wireTypewriters() {
    $$('[data-sz-typewriter]').forEach(el => {
      const words = (el.dataset.szTwWords || 'SILICON ZEN').split(',');
      const speed = parseInt(el.dataset.szTwSpeed || '130', 10);
      let wi = 0, ci = 0, deleting = false;

      function tick() {
        const word = words[wi];
        if (!deleting) {
          el.textContent = word.slice(0, ci + 1);
          ci++;
          if (ci === word.length) { deleting = true; setTimeout(tick, 1200); return; }
        } else {
          el.textContent = word.slice(0, ci - 1);
          ci--;
          if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
        }
        setTimeout(tick, deleting ? 60 : speed);
      }
      setTimeout(tick, 400);
    });
  }

  /* ══════════════════════════════════════════════════════
     INIT — wires everything automatically
  ══════════════════════════════════════════════════════ */
  function init() {
    wireModals();
    wireTabs();
    wireAccordions();
    wireCheckboxes();
    wireReveal();
    wireDock();
    wireThemeToggles();
    wireFlicker();
    wireProgressButtons();
    wireTypewriters();
  }

  /* Auto-init on DOMContentLoaded */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ── Public API ───────────────────────────────── */
  global.SZ = {
    init,
    theme,
    toggleTheme,
    modal,
    progress,
    progressRun,
    toast,
    version: '1.1.0',
    author: 'king525dev'
  };

}(window));
