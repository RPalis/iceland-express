# IcelandExpress — Figma Links
> All Figma file URLs live here. Never commit .fig files to git.
> Update whenever a Figma file is created or a screen status changes.

---

## Files

```
Main design file (Cars-First Iteration — Foundations-Locked)
URL:     https://www.figma.com/design/RGRxsEOrZbuJGDLJasrxby/Iceland-Express
FileKey: RGRxsEOrZbuJGDLJasrxby
Pages:   README — Iterations · Audit — Cars · UX Logic · Tokens · Components
          Cars — Refined · Amendments Flow · Prototype & Test Plan
          (legacy) Homepage · Car Rentals · Road Trips · Destinations
          Activities · Blog · Checkout · Confirmation · Manage Booking

Iteration pages status (2026-07-01):
  README — Iterations        ✅ Phase A-D done, E in progress
  Audit — Cars               ✅ Phase A complete
  UX Logic                   ✅ Phase B complete
  Tokens                     ✅ Phase C complete (145 variables, 100% bound)
  Components                 ✅ Phase D complete (51 components, D4 audit PASS)
  Cars — Refined             🚧 Phase E — A6 Checkout built, A1/A2/A3/A5/A7 pending
  Amendments Flow            🚧 Phase E — MB Lookup built, 11 states pending
  Prototype & Test Plan      ✅ Phase F — wiring map + test plan documented

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
A1 Homepage          🚧 in progress   ✅ approved      not started
                     (Cars-Refined)   (legacy only)
A2 Car Results       🚧 in progress   ✅ approved      not started
                     (Cars-Refined)   (legacy only)
A3 Car Detail        🚧 in progress   ✅ approved      not started
                     (Cars-Refined)   (legacy only)
A5 Car Extras        🚧 in progress   ✅ approved      not started
                     (Cars-Refined)   (legacy only)
A6 Checkout          🚧 in progress   ✅ approved      not started
                     (A6 built —      (legacy only)
                      Cars-Refined)
A7 Confirmation      🚧 in progress   ✅ approved      not started
                     (Cars-Refined)   (legacy only)
MB Manage Booking    🚧 in progress   ✅ approved      not started
                     (MB Lookup built (legacy only)
                      — Amendments)
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
