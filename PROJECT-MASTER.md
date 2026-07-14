# IcelandExpress — Project Master
> Read this file first, every session. ~2 min. Nothing else loads automatically.

---

## Current Status

```
Phase:        1 — Relaunch
Sprint:       2 — Claude API Chatbot (Sprint 1A complete)
Task:         SMS auth Gate 1+2 complete — merge nav-parity → master
Last session: 2026-07-14
Branch:       nav-parity
```

---

## Session State ← check this before anything else

```
Last completed task:   SMS auth Gate 1 approved (2026-07-14) + Gate 2 prototype parity verified
NEXT TASK:             Merge nav-parity → master · then PM-1 production migration
Stopped mid-step:      no
Uncommitted changes:   docs + parity fixes pending commit
Known issues:          3DS modal is prototype-only (no dedicated Figma frame)
Blocker:               none
Project path:          /Users/raquelsantospalis/Documents/GitHub/iceland-express/
```

If `in-progress task` is not blank → resume it before starting anything new.

---

## Workflow

```
FIGMA                PROTOTYPE/               FRONTEND/
─────────────────    ──────────────────────   ──────────────────────
Explore · design  →  Iterate · validate    →  Build production code
                     Prove interactions
                     Test DS in browser
                     Get screen approved
                          ↓
                     Screen approved        →  Copy → build in frontend/
```

**Two gates before production code is written:**
```
Gate 1   Figma approved       → prototype iteration can start
Gate 2   Prototype approved   → frontend build can start
```

**`frontend/` is never ahead of `prototype/`.**
A screen only moves to `frontend/` when its prototype version is signed off.

---

## Session Start

```
1. Read Session State above          resume interrupted work if needed
2. Open the right CLAUDE.md:
   frontend/CLAUDE.md                UI · screens · DS · chatbot
   backend/CLAUDE.md                 server · auth · email
   apis/CLAUDE.md                    integrations · providers
3. Read docs/SPRINTS.md             current sprint section only
4. Read docs/DECISIONS.md           last 3 entries only
```

Pull on demand — only when the task needs it:
```
docs/ds-tokens.md        touching styles.css or tokens.jsx
docs/ds-components.md    adding or editing DS components
docs/ds-rules.md         unsure if something is allowed
docs/ARCHITECTURE.md     adding screens, verticals, or folders
```

---

## Session Close

```
1. Update Session State above        even if mid-task — always
2. Update Current Status above       phase / sprint / task
3. docs/SPRINTS.md                   mark completed tasks ✅
4. docs/DECISIONS.md                 append if arch decision made
5. git commit                        "sprint-{id} task-{id}: {what}"
```

---

## Tooling & Skills Protocol
> Which skills / MCP plugins to use, and when. Agreed 2026-06-17.
> Honesty rule: don't invoke a skill that doesn't fit (e.g. Figma DS skills ≠ code DS).

### 🎨 Design
```
mcp__figma__* + figma-use / figma-implement-design   read approved Figma → implement (Gate 1)
figma-code-connect / cc-figma-tokens / cc-figma-component   bind code DS ↔ Figma DS (ONE source — fights duplication)
audit-design-system / apply-design-system            the FIGMA DS only — NOT the code DS
design:design-critique + general-design-review + ux-heuristics-review   quality pass on built screens
design:accessibility-review                          contrast · focus · ARIA — before "done"
design:ux-copy                                       CTAs · error/helper microcopy
persuasive-ux / cognitive-load-conversion            conversion screens (see Conversion Rules)
wireframe / rad-spacing                              early layout · spacing rhythm
```

### 💻 Frontend
```
Claude Preview (preview_*)   verify render · measure geometry · console · screenshot — EVERY observable UI change
verify / run                 launch app · confirm behavior — before reporting done
code-review                  bugs + duplication/reuse — runs after EVERY UI change (see Gate below)
simplify                     remove duplication · reuse DS — cleanup pass
Shadcn UI MCP                Radix BEHAVIOUR patterns only · rare (custom Radix wrappers exist · NO Tailwind)
```

### ⚙️ Backend (backend/ Express + apis/)
```
create-api / extract-api     API contracts (Icelandair · providers) — apis/ work
security-review              auth · email · payment paths — before backend merges
code-review                  routes/services correctness
Supabase MCP + supabase-postgres-best-practices   DB — NOT YET (DB undecided; add here if Supabase is adopted)
```
Honest gap: no dedicated Express/Node skill — backend leans on create-api + code-review + security-review.

### Quality Gate — after EVERY UI change (not just substantial ones)
```
1. Claude Preview — verify in browser (render + measured geometry + zero console errors)
2. code-review    — bugs + duplication/reuse
3. design-critique + accessibility-review — pattern + a11y pass
Only then is it "done". (Ties to: verify-before-claiming + use-DS-library-never-duplicate.)
```

### Anti-Duplication — BEFORE building any component
```
1. CHECK the catalog      docs/ds-components.md lists every atom/molecule/organism.
2. GREP the codebase      bash scripts/ds-audit.sh  (dup component defs · DS CSS
                          re-declared · raw hex in JSX · token drift)
3. exists → REUSE it.  missing → it is NEW → lifecycle below.
```
New-component lifecycle (how the DS keeps growing):
```
1. Build in the right layer   ds-atoms / ds-molecules / ds-organisms  (never inline in a screen/page)
2. Tokens-first               new values → styles.css → tokens.jsx → ds-tokens.md
3. Export once                Object.assign(window, { New })
4. REGISTER in ds-components.md   ← not "done" until catalogued
5. Wire consumers             screens/pages import it; zero raw atoms in screens (Law 13)
```
Enforcement: `scripts/ds-audit.sh` runs in the Quality Gate AND as a **pre-commit hook**
(`.githooks/pre-commit`, `--strict`) that BLOCKS commits introducing duplication.
Baseline is clean (0 findings). "Accepted mirrors" = standalone static pages that can't
import the JS DS (e.g. root index.html) — reported, not failed.
```
One-time per clone:   git config core.hooksPath .githooks
Intentional bypass:   git commit --no-verify
```

---

## Folder Map

```
iceland-express/
├── index.html                    ← icelandexpress.com/ — production landing page
├── PROJECT-MASTER.md
├── docs/
│   ├── SPRINTS.md                task board
│   ├── DECISIONS.md              decision log
│   ├── ARCHITECTURE.md           structure, verticals, phase gates
│   ├── ds-tokens.md              CSS vars + T.* mirror
│   ├── ds-components.md          atoms, molecules, organisms, Radix
│   └── ds-rules.md               laws, bugs, patterns, conversion rules
├── design/
│   ├── figma-links.md            Figma URLs + screen approval status
│   └── exports/                  PNG / SVG exports from Figma
├── frontend/
│   ├── CLAUDE.md
│   ├── prototype/                DEMO + TESTING only — never production code
│   └── production/               FINAL FRONTEND — screens migrate here when approved
│       ├── foundation/           tokens.jsx · i18n.js · radix-primitives.jsx
│       ├── design-system/        ds-atoms · ds-molecules · ds-organisms · components
│       ├── shared/               ui.jsx · searchbar.jsx
│       ├── data/                 data.jsx · blog-data.jsx
│       ├── verticals/            cars · flights · hotels · experiences configs
│       ├── chatbot/              Chatbot.jsx
│       ├── screens/              approved screens built for production
│       └── assets/
├── backend/                      FINAL BACKEND — Express server + routes + services
│   └── CLAUDE.md
└── apis/                         INTEGRATIONS — providers · contracts · mocks
    └── CLAUDE.md
```

---

## 3 Laws — Always Active

```
1. Foundation never changes. Only verticals grow.
2. Content pages never own checkout.
3. A6 + A7 are shared engines. Never duplicate.
```

Full laws → `docs/ds-rules.md`

---

## Phase Gates

```
Phase 2  Icelandair API contract signed
Phase 3  Phase 2 live + hotel partner confirmed
Phase 4  Phase 3 live + experience partner confirmed
```

---

*IcelandExpress · PROJECT-MASTER.md · v1.5 · June 2026*
*Owner: update Current Status + Session State every session*
