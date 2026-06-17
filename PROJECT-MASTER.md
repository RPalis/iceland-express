# IcelandExpress — Project Master
> Read this file first, every session. ~2 min. Nothing else loads automatically.

---

## Current Status

```
Phase:        1 — Relaunch
Sprint:       2 — Claude API Chatbot (Sprint 1A complete)
Task:         2-1 (next) · Platform homepage complete
Last session: 2026-06-17
```

---

## Session State ← check this before anything else

```
Last completed task:   Global NavBar redesign — floating frosted-glass pill, two-color wordmark,
                       btn-primary CTA. Tokens added to styles.css → mirrored in tokens.jsx →
                       documented in docs/ds-tokens.md → ui.jsx updated → index.html synced.
                       Identical on landing page + bookacar + all prototype screens.
In-progress task:      Website architecture — flights/ stays/ travel-guides/ experiences/ pages
Stopped mid-step:      no
Files modified:        styles.css · tokens.jsx · ui.jsx · Iceland Express.html (v3 cache bust) ·
                       bookacar/index.html (v3 cache bust) · index.html · docs/ds-tokens.md
Uncommitted changes:   none — committed this session
Blocker:               none
Pending (not started):  Production migration — prototype baseline → frontend/production/ is
                       still EMPTY. NavBar approved (Gate 2 passed) but NOT yet migrated.
                       First-ever production migration = its own task (full baseline, correct
                       load order). Do this before frontend/production/ can run.
Project path:          /Users/raquelsantospalis/Desktop/iceland-express/
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
