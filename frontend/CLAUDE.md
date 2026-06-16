# IcelandExpress / frontend — CLAUDE.md
> Read after PROJECT-MASTER.md for all UI work.
> Laws → docs/ds-rules.md · Tokens → docs/ds-tokens.md · Components → docs/ds-components.md

---

## Stack

React 18 · Babel CDN · No bundler · No TypeScript · No Tailwind
CSS custom properties · T.* inline styles · Dark theme
Fonts: Outfit (display) · DM Sans (body) · Accent: `--primary #06b6d4`

---

## Folder Structure

```
frontend/
├── CLAUDE.md
│
├── prototype/                   ← ACTIVE iteration space
│   │                               Edit freely here to validate and approve
│   ├── Iceland Express.html        entry point
│   ├── styles.css                  DS vars — source of truth during iteration
│   ├── tokens.jsx                  T.* mirror
│   ├── ds-atoms.jsx                DS atoms
│   ├── ds-molecules.jsx            DS molecules
│   ├── ds-organisms.jsx            DS organisms
│   ├── components.jsx              barrel + SCREEN_REGISTRY
│   ├── ui.jsx                      NavBar Footer TripBar StepHead
│   ├── searchbar.jsx               SearchBar compound
│   ├── data.jsx                    CARS EXTRAS LOCATIONS Icons computeTotals
│   ├── blog-data.jsx               BLOG_POSTS POST_MAP BLOG_CATS
│   ├── screen-A1-home.jsx          } built screens — iterate here first
│   ├── screen-A2-results.jsx       } then migrate to frontend/ when approved
│   ├── screen-A3-detail.jsx        }
│   ├── screen-A5-extras.jsx        }
│   ├── screen-A6-checkout.jsx      }
│   ├── screen-A7-confirm.jsx       }
│   ├── screen-MB-manage.jsx        }
│   ├── screen-BL-blog-list.jsx     }
│   ├── screen-BP-blog-post.jsx     }
│   ├── app.jsx
│   ├── tweaks-panel.jsx
│   ├── image-slot.js
│   └── assets/
│
├── Iceland Express.html         production entry point
├── styles.css                   production CSS (migrated from prototype when approved)
│
├── foundation/                  production foundation — Sprint 1G+
│   ├── tokens.jsx               extended T.* mirror
│   ├── i18n.js                  Sprint 3
│   └── radix-primitives.jsx     Sprint 1G
│
├── design-system/               production DS — migrated from prototype when approved
│   ├── ds-atoms.jsx
│   ├── ds-molecules.jsx
│   ├── ds-organisms.jsx
│   └── components.jsx
│
├── shared/                      production shared UI
│   ├── ui.jsx
│   └── searchbar.jsx
│
├── data/                        production data
│   ├── data.jsx
│   └── blog-data.jsx
│
├── verticals/                   vertical configs — Sprint 1A
│   ├── cars.config.js           ✅ reference schema
│   ├── flights.config.js        stub — Phase 2
│   ├── hotels.config.js         stub — Phase 3
│   └── experiences.config.js    stub — Phase 4
│
├── chatbot/
│   └── Chatbot.jsx              Sprint 2
│
├── screens/                     production screens — approved prototype only
│   ├── screen-RT-hub.jsx        Sprint 4
│   ├── screen-RT-detail.jsx     Sprint 4
│   ├── screen-DS-hub.jsx        Sprint 4
│   ├── screen-DS-region.jsx     Sprint 4
│   ├── screen-AC-hub.jsx        Sprint 4
│   ├── screen-TP-soon.jsx       Sprint 5
│   ├── screen-B2/B3/B4          Phase 2
│   ├── screen-C2/C3/C4          Phase 3
│   └── screen-D2/D3/D4          Phase 4
│
└── assets/
```

---

## prototype/ Rules

```
✅ Iterate freely — this is the active working space
✅ Add new screens here first (after Figma approval)
✅ Test DS changes, new components, layout experiments here
✅ Run in browser to validate before migrating
✗  Never write production-only code in prototype/ (no backend calls, no auth)
✗  Never migrate a screen to frontend/ before it is approved
```

**The migration rule — when a prototype screen is approved:**
```
1. Copy the screen file from prototype/ → frontend/screens/
2. Copy any DS changes from prototype/ → frontend/design-system/
3. Copy any styles.css changes → frontend/styles.css
4. Update design/figma-links.md build status to "✅ in frontend"
5. The prototype file stays — it remains the iteration source
```

---

## Figma → Prototype → Frontend flow

```
Figma approved      → create / iterate in prototype/
Prototype approved  → migrate to frontend/
Bug or tweak        → fix in prototype/ first, then migrate
New DS component    → build in prototype/ first, then migrate
```

**Never build directly in frontend/ without a prototype version.**
**Never migrate to frontend/ without prototype approval.**

---

## Script Load Order — Never Reorder

```html
<!-- CDN: React · ReactDOM · Babel -->
<!-- Radix CDN × 8 (Sprint 1G) -->
<script src="image-slot.js"></script>
<script type="text/babel" src="tweaks-panel.jsx"></script>
<script type="text/babel" src="data/data.jsx"></script>
<script type="text/babel" src="foundation/tokens.jsx"></script>
<script type="text/babel" src="design-system/ds-atoms.jsx"></script>
<script type="text/babel" src="design-system/ds-molecules.jsx"></script>
<script type="text/babel" src="design-system/ds-organisms.jsx"></script>
<script type="text/babel" src="design-system/components.jsx"></script>
<script type="text/babel" src="shared/ui.jsx"></script>
<script type="text/babel" src="shared/searchbar.jsx"></script>
<script type="text/babel" src="data/blog-data.jsx"></script>
<script type="text/babel" src="foundation/radix-primitives.jsx"></script>
<script type="text/babel" src="chatbot/Chatbot.jsx"></script>
<script type="text/babel" src="verticals/cars.config.js"></script>
<!-- screens — any order -->
<script type="text/babel" src="app.jsx"></script>  ← always last
```

---

## Fixed — Never Change

```javascript
// Hook aliases — renaming breaks everything silently
A1/A2 → useS1/useMemoS1 · A3 → useS2 · A6 → useS3 · MB → useS4 · BL/BP → useS5

// Functions — data/data.jsx only, exported to window
computeTotals() · eur() · isk() · fmtDate() · daysBetween() · Icons.*

// App mount
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById('root'));
});

// Image paths
src={window.__resources?.carSuv || 'assets/car-suv.png'}
```

---

## Screen Naming

```
A=Cars  B=Flights  C=Hotels  D=Experiences
2=Results  3=Detail  4=Extras
Shared: A6 · A7 · MB
Content (no step suffix, no checkout): BL BP RT DS AC TP
```

---

## Chatbot Scope

```
Model:    claude-sonnet-4-6
Answers:  travel Q&A only — never books, never touches booking state
Shows on: all screens except A6 + A7
System:   site content + Iceland rules + currentScreen + detectedLanguage
```

---

## When to Pull Additional Docs

```
Touching styles.css or tokens.jsx   → docs/ds-tokens.md
Adding or editing DS components     → docs/ds-components.md
Unsure if something is allowed      → docs/ds-rules.md
Adding a screen or vertical         → docs/ARCHITECTURE.md
```

---

## Update Rules

```
Owner:   Claude Code
When:    new subfolder added, new fixed alias or function established,
         new bug discovered, workflow changes
Never:   remove existing rules — only append or annotate
```

---

*IcelandExpress · frontend/CLAUDE.md · v1.4 · June 2026*
