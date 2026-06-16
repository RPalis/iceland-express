# IcelandExpress — Architecture
> Read before adding any screen, vertical, or structural folder.
> Phase gates → PROJECT-MASTER.md · Laws → docs/ds-rules.md

---

## Two Layers — Never Mix

```
CONTENT LAYER                        BOOKING LAYER
─────────────────────────────        ──────────────────────────────────────
Road Trips    RT-hub · RT-detail     Cars        A2 → A3 → A5 ─┐
Destinations  DS-hub · DS-region     Flights     B2 → B3 → B4  ├→ A6 → A7 → MB
Activities    AC-hub                 Hotels      C2 → C3 → C4  │
Travel Guides BL · BP                Experiences D2 → D3 → D4 ─┘

Creates desire.                      Converts desire to booking.
CTAs only → booking layer.           Steps 1–3 per vertical.
Never owns checkout.                 Steps 4–5 shared engine (A6 A7 MB).
```

---

## Vertical Module Pattern

```
Step 1  Search Entry      vertical-specific fields       screen XX2
Step 2  Results Grid      vertical-specific cards        screen XX2
Step 3  Detail Page       vertical-specific layout       screen XX3
Step 4  Extras            vertical-specific add-ons      screen XX4
Step 5  Checkout → Conf   SHARED ENGINE — vertical prop  A6 → A7 → MB
```

**New vertical = 3 screens (XX2 + XX3 + XX4) + A1 homepage tab update. Never more.**

---

## Vertical Config Schema

```javascript
// verticals/cars.config.js is the reference. All verticals same shape:
{
  id, nav_label,
  search:       { fields, placeholder, cta_label },
  results:      { card_schema, sort_options, filter_options },
  detail:       { sections, extras_label },
  checkout:     { traveller_label, form_fields, terms_url },
  confirmation: { summary_title, ref_prefix, email_subject, manage_actions },
  api:          { search_endpoint, book_endpoint, cancel_endpoint },
}
```

---

## Phase Gates

```
Phase 1  No gate — ship it
Phase 2  Icelandair API contract signed
Phase 3  Phase 2 live + hotel partner API confirmed
Phase 4  Phase 3 live + experience partner confirmed
```

---

## Screen Naming

```
Vertical  Letter  Steps
Cars      A       A2 results · A3 detail · A5 extras
Flights   B       B2 · B3 · B4   (Phase 2)
Hotels    C       C2 · C3 · C4   (Phase 3)
Experiences D     D2 · D3 · D4   (Phase 4)
Shared:   A6 checkout · A7 confirmation · MB manage booking
Content:  BL BP RT-hub RT-detail DS-hub DS-region AC-hub TP-soon
```

---

## Foundation — Built Once, Extended Only

```
styles.css              CSS vars — ground truth
foundation/tokens.jsx   T.* mirror
foundation/i18n.js      language engine
foundation/radix-primitives.jsx   IE-skinned Radix wrappers
data/data.jsx           computeTotals, Icons, CARS, EXTRAS, LOCATIONS
shared/ui.jsx           NavBar, Footer, TripBar, StepHead
app.jsx                 router
```

When a vertical needs something the foundation doesn't support → extend it.
Never fork it. Never duplicate it inside a screen.

---

## Adding a Screen — Checklist

```
☐ Is it booking? → vertical config exists first
☐ Is it content? → CTA only, no checkout elements
☐ Named correctly?
☐ Exported to window?
☐ Added to SCREEN_REGISTRY in components.jsx
☐ go() case added in app.jsx
☐ NavBar updated if primary nav item
☐ A1 homepage updated if new vertical tab
☐ docs/SPRINTS.md task marked ✅
☐ docs/DECISIONS.md appended if structural
```

---

## Shared Engine Contract — A6 + A7

When A6 receives `vertical={flightsConfig}` it renders:
- `vertical.checkout.traveller_label` → "Passenger details"
- `vertical.api.book_endpoint` → Icelandair endpoint

When A7 receives `vertical={flightsConfig}` it renders:
- `vertical.confirmation.ref_prefix` → "FL-"
- `vertical.confirmation.summary_title`

**Verification test:** render A6 + A7 with `flightsConfig` before Phase 2 starts.
Labels correct + no errors = abstraction complete.

---

## Update Rules

```
Owner:   developer only (not Claude Code autonomously)
When:    new vertical added, phase gate changes, folder structure changes,
         shared engine contract changes
Always:  add DECISIONS.md entry when this file changes
```

---

*IcelandExpress · docs/ARCHITECTURE.md · v1.2 · June 2026*
