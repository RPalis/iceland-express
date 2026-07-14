# IcelandExpress — Figma Links
> All Figma file URLs live here. Never commit .fig files to git.
> Update whenever a Figma file is created or a screen status changes.

---

## Files

```
Main design file (Cars-First Iteration — Foundations-Locked)
URL:     https://www.figma.com/design/RGRxsEOrZbuJGDLJasrxby/Iceland-Express
FileKey: RGRxsEOrZbuJGDLJasrxby
Section: Book a car Flows (592:39888)
Pages:   README — Iterations · Audit — Cars · UX Logic · Tokens · Components
          Cars — Refined · Amendments Flow · Prototype & Test Plan
          (legacy) Homepage · Car Rentals · Road Trips · Destinations
          Activities · Blog · Checkout · Confirmation · Manage Booking

Iteration pages status (2026-07-08):
  README — Iterations        ✅ Phase A-D done
  Audit — Cars               ✅ Phase A complete
  UX Logic                   ✅ Phase B complete (+ §11 ratified)
  Tokens                     ✅ Phase C complete (145 variables, 100% bound)
  Components                 ✅ Phase D complete (51 components, D4 audit PASS)
  Cars — Refined             ✅ Phase E — canonical frames pinned (see below)
  Amendments Flow            ✅ Phase E — M3–M5 + MB lookup/cancel/failure states
  Prototype & Test Plan      ✅ Phase F — wiring map + test plan documented
  Phase G specs              ✅ payment-logic.md · amendments-flow-spec.md · cars-flow-spec.md

Platform landing iteration (live preview — no Figma gate)
URL:     http://localhost:3457/
Branch:  Home-screen @ RPalis/iceland-express
Scope:   root index.html — responsive · hover/focus · WCAG labels · footer links
Status:  ✅ complete (2026-06-24)

Design System reference (Figma Variables + Components)
URL:     https://www.figma.com/design/RGRxsEOrZbuJGDLJasrxby/Iceland-Express
Pages:   Tokens · Components
Notes:   145 Figma Variables mapping 1:1 to styles.css/tokens.jsx
         51 components (atoms/molecules/organisms) with auto-layout + variable bindings
         NavBar instances (41) replace detached NavBar-A frames (Law 13)
         Field · Tab · DepositOption · TrustBadges component sets on Components page
```

---

## Canonical frames — Book a car Flows (592:39888)

Pinned 2026-07-08 for Gate 1 approval. Use these node IDs in exports, Code Connect, and prototype parity checks.

| Screen | Canonical frame | Node ID |
|--------|-------------------|---------|
| A1 Home + Search (time) | A1 — Book a car + Search - time | `544:23841` |
| A2 Search Results | A2 — Search Results | `544:20955` |
| A3 Car Detail | A3 — Car Detail | `564:37937` |
| A5 Extras | A5 — Extras | `544:12405` |
| A6 Checkout (slim · post-SMS) | A6 — Checkout (slim · post-SMS) | `1039:14272` |
| A7 Confirmation | A7 — Booking Confirmation | `592:39730` |

Legacy A6 with full driver form: `549:31190` — superseded by slim variant 2026-07-14.

### SMS auth (2026-07-09) — **Gate 1 approved 2026-07-14**

Placed in main funnel row (x ≈ 5050–8090, y ≈ 16067), between A5 and slim A6.

| State | Frame | Node ID | Gate 1 | Gate 2 |
|-------|-------|---------|--------|--------|
| Checkout — enter mobile | AUTH — SMS Verify (checkout) | `1035:5804` | ✅ | ✅ |
| Checkout — enter OTP | AUTH — SMS Code (checkout) | `1035:6406` | ✅ | ✅ |
| Manage — enter mobile | AUTH — SMS Verify (manage booking) | `1035:7008` | ✅ | ✅ |
| Manage — booking list | MB — Booking List (post-SMS) | `1035:7610` | ✅ | ✅ |
| Slim checkout (post-SMS) | A6 — Checkout (slim · post-SMS) | `1039:14272` | ✅ | ✅ |

**Prototype-only (no Figma frame):** 3DS payment confirmation modal at A6 card capture.

### Amendments flow (section 624:50681)

| State | Frame | Node ID |
|-------|-------|---------|
| Manage hub | M3 — Manage Booking hub (all collapsed) | `624:43154` |
| Change driver | M3a — Change Driver (expanded) | `633:10065` |
| Change dates | M3b — Change Dates (expanded) | `624:42699` |
| Change location | M3c — Change Location (expanded) | `624:43641` |
| Change add-ons | M3d — Change Add-ons (expanded) | `624:44880` |
| Pay the difference | M4 — Pay the Difference | `624:50682` |
| Booking updated | M5 — Booking Updated (confirmation) | `624:51295` |
| Lookup (legacy ref+email) | MB — Lookup | `1016:17233` — superseded by SMS list 2026-07-09 |
| Found | MB — Found (view booking) | `1016:17923` |
| Cancel confirm | MB — Cancel Confirm | `1016:18613` |
| Cancelled | MB — Cancelled | `1016:19303` |
| Amendment failed | MB — Amendment Failed | `1016:19993` |
| Past pickup (locked) | MB — Past Pickup (locked) | `1016:20683` |

---

## Screen status

Three stages before production:
```
Figma        →   Prototype    →   Frontend
──────────────────────────────────────────
exploring        not started      not started
in progress      not started      not started
✅ approved   →  in progress      not started
✅ approved      ✅ approved   →  in progress
✅ approved      ✅ approved      ✅ done
```

Current state:

```
Screen               Figma            Prototype        Frontend
────────────────     ───────────────  ───────────────  ───────────────
Platform Landing     no Figma file    ✅ approved      ✅ done
(index.html)         (polish-to-done) (Home-screen     (accepted static
                                      branch)          mirror — root)
A1 Homepage          ✅ approved      ✅ approved      not started
A2 Car Results       ✅ approved      ✅ approved      not started
A3 Car Detail        ✅ approved      ✅ approved      not started
A5 Car Extras        ✅ approved      ✅ approved      not started
AUTH SMS (checkout)  ✅ approved      ✅ approved      not started
                     (1035:5804/6406) (SmsAuthGate)
AUTH SMS (manage)    ✅ approved      ✅ approved      not started
                     (1035:7008)      (SmsAuthGate)
MB Booking List      ✅ approved      ✅ approved      not started
                     (1035:7610)      (post-SMS list)
A6 Checkout (slim)   ✅ approved      ✅ approved      not started
                     (1039:14272)     (4 fields, 3DS modal)
A7 Confirmation      ✅ approved      ✅ approved      not started
MB Manage Booking    ✅ approved      ✅ approved      not started
                     (M3–M5 + MB      (vertical prop,
                      states)          M3a/M4/failure)
BL Blog List         ✅ approved      ✅ approved      not started
BP Blog Post         ✅ approved      ✅ approved      not started
RT Road Trips        not started      not started      not started
DS Destinations      not started      not started      not started
AC Activities        not started      not started      not started
TP Trip Planner      not started      not started      not started
B2/B3/B4 Flights     not started      not started      not started
C2/C3/C4 Hotels      not started      not started      not started
D2/D3/D4 Experiences not started      not started      not started
```

---

## Gate rules

```
Figma "✅ approved"      → prototype iteration can start
Prototype "✅ approved"  → frontend build can start
Never skip a gate
```

Cars vertical (A1→A7 + MB) passed **Gate 1** 2026-07-08; SMS-auth scope passed **Gate 1** 2026-07-14.
SMS-auth prototype passed **Gate 2** 2026-07-14 — ready for `nav-parity` → `master` merge, then PM-1.

---

## Exports

```
design/exports/
├── icons/           SVG icon exports from Figma
├── illustrations/   hero images, globe, spot illustrations
├── screens/         full-screen PNG exports for reference
└── components/      individual component exports
```

---

*IcelandExpress · design/figma-links.md · v1.2 · July 2026*
*Owner: developer — update when status changes*
