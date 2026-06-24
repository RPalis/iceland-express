# Iceland Express — Design System (Prototype)

> **This folder is the prototype-local DS index.** Browse live components in
> [`Design System.html`](../Design%20System.html). Laws and the full component
> catalog live in repo-root [`docs/`](../../../../docs/) — pull those when editing
> tokens or adding components.

---

## Workflow

```
Figma approved  →  iterate here (prototype/)  →  frontend/production/ when fully approved
```

- **Now:** all DS code, screens, and styles live in this prototype folder.
- **Later:** once the prototype is fully signed off, migrate to `frontend/production/`
  (see `PROJECT-MASTER.md` · `frontend/CLAUDE.md`). Do not migrate piecemeal.
- **Static mirrors** (root `index.html`, `Landing Page.html`) hand-copy markup/tokens
  where they cannot import JSX — tracked by `scripts/ds-audit.sh` as accepted mirrors.

---

## Entry Points

| File | Purpose |
|------|---------|
| [`Iceland Express.html`](../Iceland%20Express.html) | Full booking prototype (React + Babel) |
| [`Design System.html`](../Design%20System.html) | Live DS reference — sidebar + scrollspy |
| [`Landing Page.html`](../Landing%20Page.html) | Static car-rental marketing page |
| [`styles.css`](../styles.css) | **CSS ground truth** — vars + utility + component classes |
| [`nav-menu.js`](../nav-menu.js) | Static-page NavBar drawer behaviour (`data-nav-menu`) |

Production URLs today: root [`index.html`](../../../../index.html) · [`bookacar/`](../../../../bookacar/index.html) (shell loads scripts from here).

---

## Layer Stack (load order)

```
styles.css          CSS variables + classes
tokens.jsx          T.* JS mirror of every CSS var
radix-primitives.jsx  IE-skinned behaviour wrappers (no Radix CDN)
ds-atoms.jsx        Btn Bdg Fld Ico …
ds-molecules.jsx    FormField PriceTag FreeCancBadge …
ds-organisms.jsx    CarCardV2 NavBar PageHero …  ← NavBar canonical home
components.jsx      SCREEN_REGISTRY barrel
ui.jsx              Footer TripBar StepHead … (NavBar moved to ds-organisms)
searchbar.jsx       SearchBar compound
data.jsx            CARS EXTRAS computeTotals Icons
app.jsx             router + DOMContentLoaded mount
```

Each layer imports only from the layer below. See [`docs/ds-components.md`](../../../../docs/ds-components.md).

---

## NavBar (canonical)

**Defined in:** `ds-organisms.jsx` (`window.NavBar`) · **CSS:** `styles.css` · **Static JS:** `nav-menu.js`

```
Spec:       frosted-glass fixed pill · two-color wordmark Iceland|Express
Links:      Book a car · Travel Guides · Help (configurable via items[])
CTA:        btn-primary btn-sm desktop · .nav-drawer-cta in mobile drawer
Breakpoint: --nav-menu-max (960px) — inline links above · hamburger drawer at/below
Classes:    .nav .nav-inner .logo .logo-accent .nav-links .nav-spacer
            .nav-toggle .nav-toggle-bars .nav-drawer .nav-drawer-cta .nav-cta
            .nav.is-open · .nav.scrolled
React:      NavBar({ go, items, manageRoute }) — own open/close state
Static:     <nav class="nav" data-nav-menu> + <script src="nav-menu.js">
Mirrors:    index.html (extended platform links) · Landing Page.html
Rule:       never re-implement with a different class namespace (Law 13)
```

---

## Nav tokens (`styles.css`)

```css
--nav-frost-bg     frosted pill background
--nav-blur         backdrop blur (24px)
--nav-max-w        pill max-width (1200px)
--nav-offset       page scroll-margin top (88px)
--nav-border-color pill border
--nav-pad-x        inner gutter (32px) — decoupled from page .shell
--nav-menu-max     960px — hamburger breakpoint (literal in @media queries)
```

Mirror in `tokens.jsx` → `T.nav.*` · catalog in [`docs/ds-tokens.md`](../../../../docs/ds-tokens.md).

---

## Organisms (ds-organisms.jsx)

| Organism | Notes |
|----------|-------|
| `CarCardV2` | Listing card — FreeCancBadge, SpecRow, PriceTag |
| `ExtraCardV2` | Add-on + stepper |
| `BlogCardV2` | Grid / list variant |
| `ManageActionCard` | MB action row |
| `PageHero` | Full-bleed hero |
| `EmptyState` | No results |
| `PriceSummaryCard` | Sidebar breakdown — calls `computeTotals` |
| **`NavBar`** | Global nav — hamburger ≤960px |

---

## Screens (Figma naming)

| Screen | File |
|--------|------|
| A1 Homepage | `screen-A1-home.jsx` |
| A2 Results | `screen-A2-results.jsx` |
| A3 Detail | `screen-A3-detail.jsx` |
| A5 Extras | `screen-A5-extras.jsx` |
| A6 Checkout | `screen-A6-checkout.jsx` |
| A7 Confirm | `screen-A7-confirm.jsx` |
| MB Manage | `screen-MB-manage.jsx` |
| BL Blog list | `screen-BL-blog-list.jsx` |
| BP Blog post | `screen-BP-blog-post.jsx` |

Hook aliases are **fixed**: A1/A2=`useS1` · A3=`useS2` · A6=`useS3` · MB=`useS4` · BL/BP=`useS5`.

---

## Adding a component

1. Token/value → `styles.css` → `tokens.jsx` → `docs/ds-tokens.md`
2. Component → correct layer (`ds-atoms` / `ds-molecules` / `ds-organisms`)
3. Export → `Object.assign(window, { … })`
4. Register → `docs/ds-components.md`
5. Audit → `bash scripts/ds-audit.sh`
6. Static mirrors → update `index.html` / `Landing Page.html` if shared UI changed

Full laws: [`docs/ds-rules.md`](../../../../docs/ds-rules.md).

---

## Conversion rules (never weaken)

- `FreeCancBadge` on every car card, detail, checkout, confirmation
- Tag priority: Recommended > Best Value > Most Popular > price
- Blog sidebar: live pickers wired to search state
- Blog mid-article: "View this car" only — never "Compare all"
- Mobile sticky: "Book from €X/day" → results

---

## Critical bug history

1. **Hook alias rename** — breaks all screen calls silently
2. **DOMContentLoaded** — required on `app.jsx` mount (scripts in `<head>`)
3. **computeTotals** — must stay in `data.jsx`, exported to window
4. **Legacy screens1–5.jsx** — do not load alongside `screen-A*.jsx`
5. **NavBar drift** — was duplicated across files; now canonical in `ds-organisms.jsx`

---

## Update rules

**Who:** developer + Claude when DS changes in this prototype folder.

**Update this README when:** new organism/molecule/atom · NavBar or token change · new entry point · migration status changes.

**Canonical docs** (repo `docs/`) are the cross-session source of truth; this folder README is the **prototype working index**.

*Last synced: 2026-06-24 · NavBar hamburger · nav-menu.js · --nav-menu-max*
