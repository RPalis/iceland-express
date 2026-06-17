# IcelandExpress — Design System: Components
> Pull this doc when adding or editing atoms, molecules, or organisms.
> Not needed for every session.

---

## DS Layer Rules

```
ds-atoms.jsx      primitive pieces — Btn Fld Ico etc.
ds-molecules.jsx  atom compositions only — no raw HTML tags except layout divs
ds-organisms.jsx  atoms + molecules only — no routing, no API calls
screens/          organisms + molecules only — no raw HTML atoms
```

Each layer only imports from the layer below it. Never skip layers.

---

## Atoms — ds-atoms.jsx

| Atom      | Key props                                          | Tokens / class              |
|-----------|----------------------------------------------------|-----------------------------|
| `Btn`     | variant: primary\|secondary\|ghost\|outline\|danger\|success\|link · size: xs\|sm\|md\|lg\|xl | `className="btn btn-{v} btn-{s}"` |
| `BtnIcon` | Same variants + sizes. Icon only.                  | Same classes                |
| `Bdg`     | variant: primary\|soft\|success\|amber\|outline\|glass | `className="badge badge-{v}"` |
| `Chp`     | active: bool                                       | `className="chip [active]"` |
| `Fld`     | type · status: ''\|error\|success\|disabled        | `className="input [is-error]"` |
| `SelFld`  | status                                             | `className="input selectbox"` |
| `TxtArea` | rows · status                                      | `className="input"`         |
| `Chk`     | checked · onChange                                 | `T.primary` `T.inner`       |
| `Avtr`    | name · size (default 38)                           | `T.avatar.*`                |
| `Sep`     | —                                                  | `className="divider"`       |
| `Ico`     | name (Icons key) · size · color                    | `Icons[name]`               |
| `Txt`     | as · size · weight · color: fg\|muted\|dim\|primary\|success\|warn\|danger | `T.*` colors |

**Atoms to add in Sprint 1G:**
- `Tog` — toggle switch, wraps IESwitch from radix-primitives.jsx
- `Spinner` — loading state, CSS animation only
- `Tag` — read-only label, different visual from Bdg

---

## Molecules — ds-molecules.jsx

| Molecule        | Purpose                                      | Composed from         |
|-----------------|----------------------------------------------|-----------------------|
| `InputGroup`    | Input + icon prefix / suffix                 | Fld, Ico              |
| `SearchInput`   | InputGroup preset with search icon           | InputGroup            |
| `FormField`     | Label + input slot + error/helper text       | any input atom        |
| `SpecCell`      | Icon + label pair                            | Ico                   |
| `SpecRow`       | 4-cell car spec grid                         | SpecCell ×4           |
| `PriceTag`      | Amount + unit + optional total               | —                     |
| `MetaRow`       | Avatar + author + date + read time           | Avtr, Ico             |
| `SectionHdr`    | Title + subtitle + optional action           | Ico                   |
| `InclList`      | Checkmark inclusion list                     | Ico                   |
| `InfoBanner`    | Info/warn/success/danger banner              | Ico + T.status[v]     |
| `RatingChip`    | Stars + score + count                        | Stars (shared/ui.jsx) |
| `FreeCancBadge` | Free cancellation signal — #1 conversion cue | Bdg, Ico              |

**Molecules to add for new verticals:**
- `DateRangePicker` — wraps IEPopover — Sprint 1G
- `LocationPicker` — wraps IEPopover — Sprint 1G
- `FlightRouteLine` — origin → destination — Phase 2
- `HotelStars` — star rating display — Phase 3
- `ActivityMeta` — duration + difficulty + group size — Phase 4

---

## Organisms — ds-organisms.jsx

| Organism            | Purpose                                   | Key composition                              |
|---------------------|-------------------------------------------|----------------------------------------------|
| `CarCardV2`         | Car listing card                          | SpecRow PriceTag RatingChip FreeCancBadge Btn |
| `ExtraCardV2`       | Add-on card with stepper                  | PriceTag Stepper Ico                         |
| `BlogCardV2`        | Blog card — grid or list variant          | MetaRow Bdg                                  |
| `ManageActionCard`  | Clickable action row in MB                | Ico                                          |
| `PageHero`          | Full-bleed hero + gradient                | image-slot                                   |
| `EmptyState`        | No results                                | Ico Btn                                      |
| `PriceSummaryCard`  | Price breakdown sidebar — calls computeTotals | PriceTag Btn Sep                         |
| `NavBar`            | **Canonical** global navigation — single source of truth | `.nav` frosted pill · two-color wordmark · btn-primary CTA |

**`NavBar` — the one canonical nav. All consumers must match it:**
```
Spec:     frosted-glass fixed pill · two-color text wordmark Iceland|Express (no icon mark)
Links:    Book a car · Travel Guides · Help
CTA:      btn-primary btn-sm "Manage Booking"
Classes:  .nav / .nav-inner / .logo / .logo-accent / .nav-links / .nav-spacer
Props:    go(route)  — 'home' | 'blog' | 'manage'
Defined:  ds-organisms.jsx (window.NavBar). ui.jsx no longer defines it.
Mirrors:  index.html (static) · Landing Page.html (static) · offroad-blog/NavBar.jsx
          (offroad adds an optional breadcrumb extension + ports .nav CSS into its
           own blog-post.css / tokens.css since it doesn't load the main styles.css)
Rule:     never re-implement NavBar with a different logo/CTA/class namespace.
```

**Organisms to add:**
- `VerticalSearchBar` — tabbed search across verticals — Sprint 5
- `ChatbotPanel` — Claude API slide-over, wraps IESheet — Sprint 2
- `FlightResultCard` — Phase 2
- `HotelResultCard` — Phase 3
- `ActivityResultCard` — Phase 4

---

## Radix Wrappers — foundation/radix-primitives.jsx

| Wrapper      | Radix base              | Used for                                    |
|--------------|-------------------------|---------------------------------------------|
| `IEDialog`   | @radix-ui/react-dialog  | Modals, lightbox, cancel confirmation        |
| `IESheet`    | @radix-ui/react-dialog  | Chatbot slide-over, mobile nav drawer        |
| `IEPopover`  | @radix-ui/react-popover | Date picker, location picker                 |
| `IESelect`   | @radix-ui/react-select  | Form selects                                 |
| `IETabs`     | @radix-ui/react-tabs    | Search vertical switcher, detail page tabs   |
| `IECheckbox` | @radix-ui/react-checkbox| Filter sidebar, terms agreement              |
| `IESwitch`   | @radix-ui/react-switch  | Toggle options in extras                     |
| `IETooltip`  | @radix-ui/react-tooltip | Icon labels, price breakdowns                |
| `IEDropdown` | @radix-ui/dropdown-menu | Sort menus, account menu                     |

**Every Radix wrapper must use:**
```javascript
background:   T.card.bg  or  T.modal.overlay
border:       `1px solid ${T.card.border}`
borderRadius: T.modal.radius  or  T.card.radius
zIndex:       T.z.modal / T.z.popover / T.z.tooltip
animation:    `var(--dur-enter) var(--ease-default)`
focusRing:    `outline: 2px solid ${T.stroke.focus}`
```

---

## CSS Utility Classes — styles.css

Use these className strings in JSX. They reference CSS vars, not raw values.

```
Typography:  .t-xs .t-sm .t-md .t-lg .t-xl .t-2xl .t-3xl .t-4xl .t-5xl .t-6xl
             .fw-400 .fw-500 .fw-600 .fw-700
             .lh-tight .lh-snug .lh-normal .lh-relaxed .lh-loose
             .display .h1 .h2 .h3 .eyebrow .muted .dim .mono

Spacing:     .p-2 .p-3 .p-4 .p-5 .p-6 .p-8
             .mt-2 .mt-3 .mt-4 .mt-6 .mt-8 .mt-10 .mt-12 .mt-16
             .mb-2 .mb-3 .mb-4 .mb-6 .mb-8

Layout:      .row .col .cluster .between .center .wrap .grow
             .stack .stack-2 .stack-3 .stack-4 .stack-5 .stack-6 .stack-8
             .gap8 .gap12 .gap16 .gap20

Surfaces:    .card .card-pad .surface .divider

Components:  .btn .btn-primary .btn-secondary .btn-ghost .btn-outline
             .btn-danger .btn-success .btn-link .btn-xs .btn-sm .btn-lg
             .badge .badge-primary .badge-soft .badge-success .badge-amber
             .badge-outline .badge-glass
             .chip .chip.active
             .input .selectbox .is-error .is-success .is-disabled

Interaction: .hover-lift .fade-up .disabled .truncate
```

---

## How to Add a Component

```
New atom:
  1. Add to ds-atoms.jsx
  2. Styles: T.* or CSS classes — zero raw values
  3. If needs ARIA: wrap relevant IERadix primitive
  4. Export: Object.assign(window, { NewAtom })

New molecule:
  1. Add to ds-molecules.jsx
  2. Composed from atoms only — no raw <button> <input> etc.
  3. Spacing: T.space.* or .stack-* classes

New organism:
  1. Add to ds-organisms.jsx
  2. Atoms + molecules only — no routing, no API calls
```

---

*IcelandExpress · docs/ds-components.md · v1.0 · June 2026*

---

## Update Rules for This File

```
WHO updates this file:    Claude Code whenever a DS component is added or changed
WHEN:
  - a new atom, molecule, or organism is created
  - an existing component gets a new variant or prop
  - a Radix wrapper is added to radix-primitives.jsx
  - a component is deprecated

WHAT to change:
  - Add new row to the correct table (atoms / molecules / organisms)
  - Add new Radix wrapper to the wrappers table
  - Mark deprecated components with ~~strikethrough~~ + replacement note

NEVER:
  - remove a component from this file without checking all usages
  - document a component before it's built and verified
```
