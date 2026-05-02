/* ============================================================
   SILENSIA — Global Scripts
   Theme Toggle, RTL Toggle, Navigation, Sticky Header,
   Active Link Detection
   ============================================================ */

(function () {
  'use strict';

  /* ==========================================================
     1. DOM REFERENCES
     ========================================================== */
  const html              = document.documentElement;
  const body              = document.body;
  const header            = document.querySelector('.site-header');
  const hamburger         = document.querySelector('.hamburger');
  const sidenav           = document.querySelector('.sidenav');
  const sidenavOverlay    = document.querySelector('.sidenav-overlay');
  const sidenavClose      = document.querySelector('.sidenav-close');
  let themeToggles      = document.querySelectorAll('.theme-toggle');
  let rtlToggles        = document.querySelectorAll('.rtl-toggle');
  const allNavLinks        = document.querySelectorAll('.nav-links a, .sidenav-links a');

  /* ==========================================================
     2. THEME MANAGEMENT
     ========================================================== */
  const THEME_KEY = 'silensia-theme';

  function getStoredTheme() {
    return localStorage.getItem(THEME_KEY);
  }

  function getPreferredTheme() {
    const stored = getStoredTheme();
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    updateThemeIcons(theme);
  }

  function toggleTheme() {
    const current = html.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  }

  function updateThemeIcons(theme) {
    const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
    const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

    themeToggles.forEach(btn => {
      // Header toggle (icon only)
      if (!btn.closest('.sidenav-toggles')) {
        btn.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
      } else {
        // Sidenav toggle (icon + label)
        const label = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
        btn.innerHTML = `<span class="toggle-icon">${theme === 'dark' ? sunIcon : moonIcon}</span>${label}`;
      }
    });

    // Sidebar Checkbox Toggles
    const themeCheckboxes = document.querySelectorAll('#sidebar-theme-checkbox');
    themeCheckboxes.forEach(cb => {
      cb.checked = theme === 'dark';
    });
  }


  /* ==========================================================
     3. RTL MANAGEMENT
     ========================================================== */
  const RTL_KEY = 'silensia-rtl';

  function getStoredRTL() {
    return localStorage.getItem(RTL_KEY);
  }

  function applyRTL(isRTL) {
    html.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    localStorage.setItem(RTL_KEY, isRTL ? 'true' : 'false');
    updateRTLIcons(isRTL);
  }

  function toggleRTL() {
    const current = html.getAttribute('dir') === 'rtl';
    applyRTL(!current);
  }

  function updateRTLIcons(isRTL) {
    const rtlIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>`;

    rtlToggles.forEach(btn => {
      if (!btn.closest('.sidenav-toggles')) {
        btn.innerHTML = rtlIcon;
        btn.setAttribute('aria-label', isRTL ? 'Switch to LTR' : 'Switch to RTL');
      } else {
        const label = isRTL ? 'LTR Mode' : 'RTL Mode';
        btn.innerHTML = `<span class="toggle-icon">${rtlIcon}</span>${label}`;
      }
    });
  }

  /* ==========================================================
     4. SIDE NAV TOGGLE
     ========================================================== */
  function openSidenav() {
    sidenav.classList.add('is-open');
    sidenavOverlay.classList.add('is-open');
    hamburger.classList.add('is-active');
    hamburger.setAttribute('aria-expanded', 'true');
    body.classList.add('nav-open');

    // Focus trap: focus the close button
    if (sidenavClose) {
      setTimeout(() => sidenavClose.focus(), 100);
    }
  }

  function closeSidenav() {
    sidenav.classList.remove('is-open');
    sidenavOverlay.classList.remove('is-open');
    hamburger.classList.remove('is-active');
    hamburger.setAttribute('aria-expanded', 'false');
    body.classList.remove('nav-open');

    // Return focus to hamburger
    if (hamburger) {
      setTimeout(() => hamburger.focus(), 100);
    }
  }

  function toggleSidenav() {
    const isOpen = sidenav.classList.contains('is-open');
    isOpen ? closeSidenav() : openSidenav();
  }

  /* ==========================================================
     5. STICKY HEADER
     ========================================================== */
  let lastScroll = 0;

  function handleScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = scrollY;
  }

  /* ==========================================================
     6. ACTIVE LINK DETECTION
     ========================================================== */
  function setActiveLink() {
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split('/').pop() || 'index.html';

    allNavLinks.forEach(link => {
      const href = link.getAttribute('href');
      const linkFile = href.split('/').pop();

      if (currentFile === linkFile || 
          (currentFile === '' && linkFile === 'index.html') ||
          (currentFile === '/' && linkFile === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /* ==========================================================
     7. KEYBOARD ACCESSIBILITY
     ========================================================== */
  function handleKeydown(e) {
    // Escape closes sidenav
    if (e.key === 'Escape' && sidenav && sidenav.classList.contains('is-open')) {
      closeSidenav();
    }
  }

  /* ==========================================================
     8. EVENT LISTENERS
     ========================================================== */
  function init() {
    // Re-query toggles in case they were added/modified
    themeToggles = document.querySelectorAll('.theme-toggle');
    rtlToggles = document.querySelectorAll('.rtl-toggle');

    // Theme
    applyTheme(getPreferredTheme());
    themeToggles.forEach(btn => btn.addEventListener('click', toggleTheme));

    // RTL
    const storedRTL = getStoredRTL();
    applyRTL(storedRTL === 'true');
    rtlToggles.forEach(btn => btn.addEventListener('click', toggleRTL));

    // Sidenav
    if (hamburger) hamburger.addEventListener('click', toggleSidenav);
    if (sidenavClose) sidenavClose.addEventListener('click', closeSidenav);
    if (sidenavOverlay) sidenavOverlay.addEventListener('click', closeSidenav);

    // Sticky header
    if (header) window.addEventListener('scroll', handleScroll, { passive: true });

    // Active links
    setActiveLink();

    // Keyboard
    document.addEventListener('keydown', handleKeydown);

    // Sidebar Theme Checkboxes
    const themeCheckboxes = document.querySelectorAll('#sidebar-theme-checkbox');
    themeCheckboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        const next = cb.checked ? 'dark' : 'light';
        applyTheme(next);
      });
    });

    // Listen for system theme changes

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!getStoredTheme()) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  /* ==========================================================
     9. BOOTSTRAP
     ========================================================== */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
