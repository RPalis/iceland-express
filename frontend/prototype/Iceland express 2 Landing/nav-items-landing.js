/* nav-items-landing.js — canonical NavBar config for root landing page
 * Uses href targets because landing is a static page (non-SPA).
 */
window.NAV_LANDING_ITEMS = [
  { label: 'Book a car', href: '/bookacar/' },
  { label: 'Flights', href: '/#vertical-flights' },
  { label: 'Stays', href: '/#vertical-stays' },
  { label: 'Experiences', href: '/#vertical-experiences' },
  { label: 'Travel Guides', href: '/bookacar/' },
  { label: 'Help', href: '/#ai' },
];

window.LANDING_NAV_ROUTE_MAP = {
  home: '/bookacar/',
  blog: '/bookacar/',
  manage: '/bookacar/',
};
