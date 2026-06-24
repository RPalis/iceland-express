# IcelandExpress — Figma Links
> All Figma file URLs live here. Never commit .fig files to git.
> Update whenever a Figma file is created or a screen status changes.

---

## Files

```
Main design file
URL:     [paste Figma URL here — not linked for platform landing iteration]
Pages:   Homepage · Car Rentals · Road Trips · Destinations
         Activities · Blog · Checkout · Confirmation · Manage Booking

Platform landing iteration (live preview — no Figma gate)
URL:     http://localhost:3457/
Branch:  Home-screen @ RPalis/iceland-express
Scope:   root index.html — responsive · hover/focus · WCAG labels · footer links
Status:  ✅ complete (2026-06-24)

Design System reference
URL:     [paste Figma URL here]
Pages:   Tokens · Atoms · Molecules · Organisms · Screens

Exploration / WIP
URL:     [paste Figma URL here]
Pages:   [active exploration — not approved for prototype yet]
```

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
A6 Checkout          ✅ approved      ✅ approved      not started
A7 Confirmation      ✅ approved      ✅ approved      not started
MB Manage Booking    ✅ approved      ✅ approved      not started
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

*IcelandExpress · design/figma-links.md · v1.1 · June 2026*
*Owner: developer — update when status changes*
