/* nav-items.js — canonical platform nav link config (single source of truth)
 * Load before ds-organisms.jsx on React entry points.
 * Static mirrors (index.html, Landing Page.html) must match manually.
 */
window.NAV_PLATFORM_ITEMS = [
  { label: 'Book a car', route: 'home' },
  { label: 'Flights', href: '/#vertical-flights' },
  { label: 'Stays', href: '/#vertical-stays' },
  { label: 'Experiences', href: '/#vertical-experiences' },
  { label: 'Travel Guides', route: 'blog' },
  { label: 'Help', href: '/#ai' },
];
