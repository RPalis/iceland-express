/* nav-menu.js — canonical NavBar drawer behaviour (static pages)
 * Load via <script src="nav-menu.js"> on mirrors with data-nav-menu.
 * React consumers use NavBar in ds-organisms.jsx (same class contract, own state).
 */
(function () {
  function setNavOpen(navEl, toggle, open) {
    navEl.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  }

  function initNavMenu(navEl) {
    if (!navEl || navEl.dataset.navMenuInit === 'true') return;
    const toggle = navEl.querySelector('.nav-toggle');
    const drawer = navEl.querySelector('.nav-drawer');
    if (!toggle || !drawer) return;

    navEl.dataset.navMenuInit = 'true';

    toggle.addEventListener('click', () => {
      setNavOpen(navEl, toggle, !navEl.classList.contains('is-open'));
    });

    drawer.querySelectorAll('a, button').forEach(link => {
      link.addEventListener('click', () => setNavOpen(navEl, toggle, false));
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') setNavOpen(navEl, toggle, false);
    });

    document.addEventListener('click', e => {
      if (!navEl.contains(e.target)) setNavOpen(navEl, toggle, false);
    });

    window.matchMedia('(min-width: 961px)').addEventListener('change', e => {
      if (e.matches) setNavOpen(navEl, toggle, false);
    });

    addEventListener('scroll', () => {
      navEl.classList.toggle('scrolled', scrollY > 50);
    }, { passive: true });
  }

  function initAll() {
    document.querySelectorAll('.nav[data-nav-menu]').forEach(initNavMenu);
  }

  window.initNavMenu = initNavMenu;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
