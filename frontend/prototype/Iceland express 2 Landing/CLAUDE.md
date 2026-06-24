# Iceland Express 2 — Project Context

Full design system + hi-fi prototype for Iceland Express (car rental, Iceland).
Complete project memory and design decisions are in [`designsystem/README.md`](designsystem/README.md).

## Quick Reference
- Prototype: `Iceland Express.html`
- DS Reference: `Design System.html`
- Tokens: `tokens.jsx` → `T.*`
- DS layers: `ds-atoms.jsx` → `ds-molecules.jsx` → `ds-organisms.jsx` → `components.jsx`
- Screens: `screen-A1-home.jsx` through `screen-BP-blog-post.jsx` (Figma naming)
- App entry: `app.jsx` (DOMContentLoaded guard required)
- Blog data: `blog-data.jsx`

## Critical Rules
- Screen hook aliases are FIXED: A1/A2=`useS1`, A3=`useS2`, A6=`useS3`, MB=`useS4`, BL/BP=`useS5`
- `computeTotals()` lives in `data.jsx` — never redefine in screens
- All hover states: `.hover-lift` CSS only — no JS onMouseEnter
- All status colors: `T.status[variant]` → CSS vars — no raw rgba()
- Image paths: `window.__resources.carX || "assets/car-x.png"`
- `app.jsx` mount: always wrap in DOMContentLoaded guard

See [`designsystem/README.md`](designsystem/README.md) for the full spec.
