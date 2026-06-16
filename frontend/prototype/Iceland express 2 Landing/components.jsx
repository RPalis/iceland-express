// components.jsx
// ─────────────────────────────────────────────────────────────
// Iceland Express DS — Barrel file
// Loads tokens → atoms → molecules → organisms in order.
// Import this single file to get the full component library.
//
// File structure:
//   tokens.jsx      → T (token constants), Palette
//   ds-atoms.jsx    → Btn, BtnIcon, Bdg, Chp, Fld, SelFld, TxtArea, Chk, Avtr, Sep, Ico, Txt
//   ds-molecules.jsx → InputGroup, SearchInput, FormField, SpecCell, SpecRow,
//                      PriceTag, MetaRow, SectionHdr, InclList, InfoBanner,
//                      RatingChip, FreeCancBadge
//   ds-organisms.jsx → CarCardV2, ExtraCardV2, BlogCardV2, ManageActionCard,
//                      PageHero, EmptyState, PriceSummaryCard
// ─────────────────────────────────────────────────────────────

/* ============================================================
   SCREEN REGISTRY
   Maps route keys → Figma screen IDs + component names
   ============================================================ */
const SCREEN_REGISTRY = {
  home:     { id: 'A1', figmaName: 'A1 — Homepage Search',        component: 'HomeScreen' },
  results:  { id: 'A2', figmaName: 'A2 — Search Results',         component: 'ResultsScreen' },
  detail:   { id: 'A3', figmaName: 'A3 — Car Detail',             component: 'DetailScreen' },
  extras:   { id: 'A5', figmaName: 'A5 — Add-ons / Extras',       component: 'ExtrasScreen' },
  checkout: { id: 'A6', figmaName: 'A6 — Checkout',               component: 'CheckoutScreen' },
  confirm:  { id: 'A7', figmaName: 'A7 — Booking Confirmation',   component: 'ConfirmScreen' },
  manage:   { id: 'MB', figmaName: 'MB — Manage Booking',         component: 'ManageBookingScreen' },
  blog:     { id: 'BL', figmaName: 'BL — Blog List',              component: 'BlogListScreen' },
  post:     { id: 'BP', figmaName: 'BP — Blog Post',              component: 'BlogPostScreen' },
};

Object.assign(window, { SCREEN_REGISTRY });

// All atoms, molecules and organisms are exported by their respective files.
// Nothing more needed here — this file documents the structure.
