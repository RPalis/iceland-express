# Iceland Express 2 — Project Memory

## Project Overview
Full hi-fi clickable prototype + design system for Iceland Express, a car rental booking platform for Iceland.
Built from a Figma source file (Iceland Express.fig) by the icelandexpress.com team.

## File Structure (35 files)

### Entry Points
- `Iceland Express.html` — main prototype (thin shell, loads all JSX)
- `Design System.html` — DS reference page (thin shell, right-sidebar nav, scrollspy)
- `styles.css` — all CSS variables + utility classes

### Design System Layers (load order matters)
1. `tokens.jsx` — `T.*` JS constants mirroring every CSS variable (T.btn, T.input, T.badge, T.status, T.stroke, T.alpha, T.motion, T.radiusMap)
2. `ds-atoms.jsx` — `Btn`, `BtnIcon`, `Bdg`, `Chp`, `Fld`, `SelFld`, `TxtArea`, `Chk`, `Avtr`, `Sep`, `Ico`, `Txt`
3. `ds-molecules.jsx` — `InputGroup`, `SearchInput`, `FormField`, `SpecCell`, `SpecRow`, `PriceTag`, `MetaRow`, `SectionHdr`, `InclList`, `InfoBanner`, `RatingChip`, `FreeCancBadge`
4. `ds-organisms.jsx` — `CarCardV2`, `ExtraCardV2`, `BlogCardV2`, `ManageActionCard`, `PageHero`, `EmptyState`, `PriceSummaryCard`
5. `components.jsx` — barrel file + `SCREEN_REGISTRY` (A1–A7, MB, BL, BP)

### Shared UI
- `ui.jsx` — `NavBar`, `Footer`, `TripBar`, `TripBarEditable`, `StepHead`, `Calendar`, `TimeList`, `LocationList`, `Stepper`, `Stars`
- `searchbar.jsx` — `SearchBar` (location + date + time pickers with popovers)

### Data
- `data.jsx` — `CARS` (9), `EXTRAS` (8), `LOCATIONS` (5), `Icons.*` (Material Design icon set — filled, currentColor, 24×24), helpers (`eur`, `isk`, `fmtDate`, `daysBetween`, `computeTotals`)
- `blog-data.jsx` — `BLOG_POSTS` (4), `POST_MAP`, `BLOG_CATS`

### Screens (Figma naming convention A1–A7, MB, BL, BP)
- `screen-A1-home.jsx` — Homepage: hero, search bar, why-cards, popular cars, blog section, travel guides
- `screen-A2-results.jsx` — Search Results: filter sidebar, sort, category chips, car grid
- `screen-A3-detail.jsx` — Car Detail: gallery, spec grid, inclusions, tabs, price summary
- `screen-A5-extras.jsx` — Add-ons / Extras: extra cards with steppers, live price
- `screen-A6-checkout.jsx` — Checkout: driver form, payment options, card fields, terms
- `screen-A7-confirm.jsx` — Booking Confirmation: success hero, trip details, next steps
- `screen-MB-manage.jsx` — Manage Booking: guest lookup, change dates/location/extras, cancel flow
- `screen-BL-blog-list.jsx` — Blog List: hero, category filter chips, featured post, 3-col grid
- `screen-BP-blog-post.jsx` — Blog Post: reading progress bar, hero, 2-col article+sidebar, mid-article CTA, mobile sticky bar

### App Entry
- `app.jsx` — `App` component + router + tweaks + DOMContentLoaded mount guard
- `ds-app.jsx` — DS Reference app (foundations, atoms, molecules, organisms, animations, screen index)
- `tweaks-panel.jsx` — tweaks panel scaffold
- `image-slot.js` — drag-and-drop image placeholder web component

### Assets
- `assets/car-tesla.png`, `assets/car-suv.png`, `assets/car-rav4.png`, `assets/hero.png`
- Asset paths use `window.__resources.carSuv` etc. for standalone bundling (fallback to string path)

### Export
- `Iceland Express Export.html` — bundler-ready copy with meta tags + thumbnail template
- `Iceland Express — Standalone.html` — fully self-contained offline bundle (3.4MB)

---

## Design Tokens (CSS variables in styles.css)

### Surfaces
- `--bg: #050610`, `--card: #111827`, `--card-2: #0e1626`, `--inner: #0a0e18`
- `--fill: #1e293b`, `--fill-soft: #161f31`, `--border: #1e293b`

### Brand
- `--primary: #06b6d4` (tweakable), `--primary-strong: #22d3ee`, `--primary-fg: #04121a`
- `--primary-tint: rgba(6,182,212,0.12)`, `--primary-tint-2: rgba(6,182,212,0.18)`

### Text
- `--fg: #f0f8ff`, `--muted: #94a3b8`, `--dim: #64748b`

### Status fills & strokes (NO raw rgba in components — always use these vars)
- `--info-bg/border/icon`, `--success-bg/border/icon`, `--warn-bg/border/icon`, `--danger-bg/border/icon`
- `--stroke-focus`, `--stroke-error`, `--stroke-success-f`, `--stroke-disabled`

### Alpha scale
- `--alpha-05` → `--alpha-30` (white-on-dark transparency steps)

### Radius (all × `--r` tweakable scalar except pill)
- `--r-xs: 4px` badges/checkboxes · `--r-sm: 8px` inputs/chips · `--r-md: 12px` buttons
- `--r-lg: 16px` cards · `--r-xl: 22px` hero/modals · `--r-pill: 9999px` always full

### Motion
- Duration: `--dur-instant: 80ms` → `--dur-fast: 140ms` → `--dur-normal: 220ms` → `--dur-slow: 350ms` + `--dur-enter: 280ms` / `--dur-exit: 160ms`
- Easing: `--ease-default` (spring-out), `--ease-in`, `--ease-out`, `--ease-in-out`, `--ease-bounce`
- Presets: `--tx-color`, `--tx-transform`, `--tx-opacity`, `--tx-shadow`, `--tx-all`

### Typography
- `--font-display: Outfit` (headings, buttons, labels)
- `--font-body: DM Sans` (body copy)

---

## Key Design Decisions

### Conversion strategy
- `FreeCancBadge` is the #1 conversion signal — prominent on every car card, detail, checkout, confirmation
- Tags prioritised: "Recommended" > "Best Value" > "Most Popular" > lowest price
- Blog sidebar (desktop): live location+date pickers wired to search state → go("results")
- Mid-article CTA in blog posts: recommended car card with "View this car" only (no "Compare all")
- Mobile sticky bar on blog posts: fixed bottom "Book from €X/day" → search results

### Component rules
- All icons: Material Design icon set, defined once in `data.jsx` `Icons.*` (filled, currentColor, 24×24) and resolved via the `Ico` atom / `Icons.X` refs — never inline a bespoke SVG. Save toggle uses `Heart` (favorite, filled) when saved, `HeartOutline` (favorite_border) when not.
- All hover states: `.hover-lift` CSS class only — zero JS `onMouseEnter/Leave`
- All status colors: `T.status[variant]` → CSS vars — zero raw rgba() in component code
- All inline styles: reference `T.*` token constants, not hardcoded values
- All buttons: `Btn` atom — never bare `<button className="btn...">`
- All form fields: `FormField` molecule — never bare label+input

### Architecture rules
- `computeTotals()` lives in `data.jsx` and exported to window — shared across all screens
- Screen hook aliases are FIXED: A1/A2=`useS1/useMemoS1`, A3=`useS2`, A6=`useS3`, MB=`useS4`, BL/BP=`useS5`
- `app.jsx` mount: always use DOMContentLoaded guard (scripts in `<head>`)
- Image paths: always `window.__resources.carX || "assets/car-x.png"` for bundling compatibility

### DS Reference layout
- Right sticky sidebar (220px), not top nav
- Grouped: Tokens / Atoms / Molecules / Organisms / Motion / Screens
- Scrollspy: `useScrollSpy()` hook auto-highlights active section
- Add new section: add to `SECTIONS` array with `group` key — layouts in automatically

---

## Tweaks Panel
- Accent colour: Cyan `#06b6d4` | Violet `#8b5cf6` | Emerald `#10b981` | Amber `#f59e0b`
- Card radius scalar: 0–2 (default 1) — multiplies all `--r-*` values
- Layout density: 0.7–1.3 (default 1) — multiplies gaps and padding

---

## Blog Posts
1. `ring-road` — 7 Days on the Ring Road (Route, 11 min read)
2. `highland-f-roads` — F-Roads & the Highlands (Off-Road, 6 min read)
3. `ev-charging` — Driving Iceland in an EV (Electric, 5 min read)
4. `packing-june` — What to Pack in June (Practical, 3 min read)

Blog navigation: Home "From the Blog" / "Travel Guides" cards → `goPost(id)` → `screen-BP-blog-post.jsx`
"_list" sentinel: `goPost("_list")` → `go("blog")` (blog list screen)

---

## Manage Booking Flow (MB)
- Guest mode only (no login)
- Lookup: booking ref + email → loads `DEMO_BOOKING` fixture
- Actions: Change dates (calendar + time pickers) | Change location (location picker) | Modify add-ons (steppers) | Cancel booking (policy + refund calc)
- Cancellation policy: >48h = free | 24–48h = 15% fee | <24h = 25% fee

---

## Critical Bug History
1. **Hook alias rename** — renaming `useS1` → `useA1` etc. breaks all component calls. Never rename.
2. **DOMContentLoaded** — `app.jsx` mount must guard with `DOMContentLoaded` (scripts in `<head>`)
3. **computeTotals location** — must stay in `data.jsx` and exported to window. Not in screens2.
4. **screens1–5.jsx** — legacy files still at root, superseded by `screen-A*.jsx`. Do not load both.
5. **Blog gone bug** — caused by hook alias mismatch during screen-file splits. Fixed by restoring original aliases.
6. **TripBarEditable** — lives in `ui.jsx`, not in individual screens. Needs `setSearch` passed down.

---

## Completed Work Log (as of June 10, 2026)
- ✅ Full 9-screen booking prototype (A1→A7, MB, BL, BP)
- ✅ Atomic DS: tokens → atoms → molecules → organisms (all JSX, all token-referenced)
- ✅ DS Reference page with right sidebar nav + scrollspy
- ✅ Foundations: colors, type scale, radius, status/stroke tokens, alpha scale, motion system
- ✅ Manage Booking (guest mode): lookup, change dates/loc/extras, cancel with policy
- ✅ Blog flow: list + 4 full posts + reading progress + sticky sidebar + mid-article CTA
- ✅ Sidebar search widget (blog post): location + calendar pickers fully functional
- ✅ image-slot.js on blog/guide image placeholders (drag & drop)
- ✅ Standalone HTML export (offline bundle, 3.4MB)
- ✅ All hover states CSS-only (.hover-lift)
- ✅ All status colors via CSS vars (no raw rgba)
- ✅ CLAUDE.md project memory
