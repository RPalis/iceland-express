# IcelandExpress — Decision Log
> Append every significant architectural, design, or product decision.
> Format: `## YYYY-MM-DD — Title` then What + Why + Alternatives rejected.
> Never delete entries. Add newest at the bottom.

---

## 2026-06-16 — Vertical stacking model adopted

**What:** IcelandExpress is structured as a foundation + vertical stacking model.
Each phase adds exactly one new bookable vertical (Cars → Flights → Hotels →
Experiences) on top of a stable, never-rebuilt foundation.

**Why:** Benchmark analysis of Booking.com, Airbnb, and GetYourGuide confirmed
this is how every successful multi-vertical travel platform was built. Starting
with what we own and control (Car Rentals), adding one vertical at a time, and
reusing the same 5-step funnel pattern for each vertical means Phase 2 costs
~40% of Phase 1 effort, and Phase 3 costs ~30% of Phase 2.

**Alternatives rejected:**
- Build all verticals simultaneously (Expedia model) — produces split UI,
  nothing feels native, engineering cost multiplied.
- Hotels before Flights — Johann explicitly mentioned Icelandair. Flights
  is the natural second vertical for an Iceland-focused platform.

---

## 2026-06-16 — AI Smart Search removed, replaced with standard keyword search

**What:** The homepage search bar uses standard keyword + structured fields.
The Claude API powers the "Ask Anything" chatbot only.

**Why:** Johann's email described "Ask AI" as a persistent Q&A assistant,
not a natural language search replacement. A standard search bar is faster
to build, more reliable, and easier to iterate on. The chatbot handles
free-text queries. The search bar handles structured booking intent.

**Alternatives rejected:**
- Natural language search routing — adds AI dependency to the critical
  conversion path. A failed API call blocks the user from searching.
  The chatbot failing is a UX annoyance; the search bar failing is
  a lost booking.

---

## 2026-06-16 — Shadcn used as behaviour layer only, no Tailwind

**What:** Radix UI primitives (the foundation of Shadcn) provide keyboard
navigation, focus management, and ARIA. IcelandExpress CSS vars and T.*
tokens provide all visual styling. No Tailwind is introduced.

**Why:** The existing DS is pure inline styles + CSS vars. Introducing Tailwind
would create two visual systems — everything new would look like Shadcn defaults,
everything existing would look like IcelandExpress. The Radix bridge vars in
styles.css connect the two systems at the CSS var level, requiring no Tailwind.

**Alternatives rejected:**
- Full Shadcn migration — would require rebuilding all existing atoms.
  Visual regression risk is too high with 9 screens already built.
- No Radix at all — building custom keyboard nav and focus trapping for
  modals, popovers, and selects is weeks of work for zero visual gain.

---

## 2026-06-16 — Three-tier CSS variable system adopted

**What:** CSS vars are organised into three tiers:
- Tier 1: primitive raw values (--bg, --primary, --r-md)
- Tier 2: semantic vars pointing to Tier 1 (--stroke-focus: var(--primary))
- Tier 3: component vars pointing to Tier 2 (--input-border: var(--border))
Tier 2 and Tier 3 never have raw values.

**Why:** When --primary changes in the tweaks panel, every stroke, button glow,
tint, and focus ring must update automatically. This only works if the chain
is unbroken. Tier 2/3 vars with raw values break the chain.

**Alternatives rejected:**
- Flat var system (all vars in one level) — already causes issues because
  --border is shared between inputs, cards, and buttons. Component semantic
  tokens allow inputs to change their border independently of card borders.

---

## 2026-06-16 — Content layer is permanent — never transactional

**What:** Road Trips, Destinations, Activities, and Travel Guides are
inspiration-only pages. They create desire and route to booking verticals
via CTAs. They never own a booking flow.

**Why:** This is IcelandExpress's competitive moat. Every competitor (GuideToIceland,
Icelandair.com) either has weak content or disconnected content. The content
creates the desire that converts on the booking vertical. If content becomes
transactional, the inspiration quality degrades, and we become just another
comparison site — exactly what Johann said he doesn't want.

**Alternatives rejected:**
- Activities as a booking vertical in Phase 1 — technically possible but
  wrong sequencing. Activities in Phase 1 is content. Booking capability
  is added in Phase 4 after the content quality is established.

---

## 2026-06-16 — Trip Planner: coming-soon bridge in Phase 1, full in Phase 4

**What:** The Trip Planner nav item in Phase 1 routes to a coming-soon page
with two CTAs: Road Trips hub and Car Rentals search. The full Trip Planner
launches in Phase 4 when all 4 verticals exist.

**Why:** Johann said "the Trip Planner is by far the most important feature"
but also acknowledged it's difficult to build. A full Trip Planner with only
Cars available (Phase 1) has limited value — it would generate car suggestions
only. When all 4 verticals exist, the Trip Planner can generate a complete
itinerary: flight + car + hotel + experiences. The coming-soon page keeps
the promise visible while setting honest expectations.

**Alternatives rejected:**
- Trip Planner in Phase 2 — only 2 verticals exist. Still incomplete.
- No Trip Planner nav in Phase 1 — Johann specifically requested it in the
  nav order. The coming-soon page fulfils this without building prematurely.

---

*Add new entries below this line.*

---

## 2026-06-17 — NavBar approved (Gate 2); first production migration deferred to its own task

**What:** The redesigned global NavBar (floating frosted-glass pill, two-color wordmark,
btn-primary CTA) is approved at Gate 2. However, it is NOT migrated to
`frontend/production/` this session. `frontend/production/` is entirely empty — no
foundation, DS, data, or screens have ever been migrated. The NavBar stays in
`prototype/` and the root pages (`index.html`, `bookacar/`) ship as-is. A full baseline
migration to `production/` is scheduled as a dedicated task.

**Why:** Migrating only the NavBar files (`ui.jsx`, `styles.css`, `tokens.jsx`) into an
empty production tree would create a broken, non-runnable build — `shared/ui.jsx` depends
on `foundation/tokens.jsx`, `ds-atoms`, `Icons`, and `data.jsx`, none of which exist in
production yet. The first-ever production migration must move the complete approved
baseline in correct script load order; it is real, scoped work, not a NavBar add-on.
The gate is still honored: the NavBar is approved; only the migration sequencing is
deferred.

**Alternatives rejected:**
- Migrate NavBar files only now — produces an incomplete production tree that can't run
  and silently violates the "frontend never ahead of a coherent baseline" intent.
- Block the commit until full migration is done — needlessly couples today's approved
  prototype + landing-page work to a much larger migration task.

---

## 2026-06-17 — NavBar is a single canonical DS organism; nav gutter decoupled from page .shell

**What:** The NavBar now has ONE source of truth: `NavBar` in `ds-organisms.jsx`
(`window.NavBar`). `ui.jsx` no longer defines it. Static pages (`index.html`,
`Landing Page.html`) and the offroad micro-site mirror the same spec: frosted-glass
pill · two-color text wordmark `Iceland|Express` (no icon) · links Book a car / Travel
Guides / Help · `btn-primary` "Manage Booking". A new token `--nav-pad-x`
(= `var(--space-8)`, 32px) plus a `.nav .shell { padding: 0 var(--nav-pad-x) }` rule
pins the nav's inner gutter independent of each page's `.shell` padding.

**Why:** The NavBar had drifted into 3+ incompatible implementations (bolt-icon logos,
`btn-secondary` CTAs, `.navbar`/`.lp-nav` class namespaces) because it was copy-pasted
rather than sourced from one component. Separately, the logo sat in a different position
per page because the shared `.shell` wrapper used 48px padding on the landing vs 32px in
the booking app. Decoupling the nav gutter via a dedicated token fixes the position
everywhere without forcing every page to use the same content gutter.

**Alternatives rejected:**
- Keep NavBar in ui.jsx — leaves index.html hand-mirroring markup; drift returns.
- Change `.shell` to 32px globally on the landing — would shift ALL landing page
  content, not just the nav.

---

## 2026-06-17 — Process: diligence protocol after this session's missed errors

**What:** Adopting a verification discipline for IcelandExpress work (full detail in the
session retrospective): (1) audit for duplication/consistency BEFORE claiming a component
is "synced/identical"; (2) verify claims in the browser, not by file dates; (3) never
write "identical everywhere" in Session State without measuring it; (4) check the real
runtime state of folders/files referenced in status (e.g. empty production/, gitignored
paths) before reporting them as done.

**Why:** This session surfaced several issues that should have been caught when the
NavBar was first called "done": NavBar duplicated across 4 files, logo-position drift
between pages, an empty `frontend/production/`, and a pre-existing offroad crash — all
while Session State claimed the NavBar was "identical on landing page + bookacar + all
prototype screens." Status was being written from intent, not from verification.

---

## 2026-06-17 — Tooling & Skills Protocol adopted (Design / Frontend / Backend)

**What:** Agreed an explicit toolkit of skills + MCP plugins per discipline, written in
PROJECT-MASTER.md → "Tooling & Skills Protocol". Highlights:
- Design: Figma MCP + figma-use/implement for Gate-1 work; figma-code-connect /
  cc-figma-tokens to bind code DS ↔ Figma DS (single source); design-critique +
  general-design-review + ux-heuristics-review + accessibility-review for quality;
  ux-copy, persuasive-ux/cognitive-load-conversion, wireframe/rad-spacing.
- Frontend: Claude Preview (every observable change), verify/run, code-review, simplify.
  Shadcn MCP only as a Radix behaviour reference (no Tailwind).
- Backend: create-api/extract-api, security-review, code-review. Supabase tooling
  deliberately EXCLUDED for now — DB is undecided; add it if/when Supabase is adopted.
- Quality Gate: after EVERY UI change (not just substantial ones) run browser-verify +
  code-review + design-critique + accessibility-review before "done".

**Why:** The user observed I was duplicating UI and not using the existing design-system
library or any UI/design skills. Naming the right tool per task — and binding code DS to
Figma DS via Code Connect — makes reuse the default and prevents the drift seen with the
NavBar. The "every UI change" gate strictness was chosen explicitly over "substantial only".

**Alternatives rejected:**
- List the Figma DS-audit skills as if they cover the code DS — dishonest; they audit
  Figma, not HTML/CSS. The code DS is audited with grep + Law 13 / Definition of Done.
- Include Supabase now — backend DB isn't chosen yet; listing it would imply a decision
  that hasn't been made.
- "Substantial changes only" gate — rejected; the missed NavBar issues were exactly the
  kind a routine per-change gate would have caught.

---

## 2026-06-16 — Checkout form simplified to mandatory fields only

**What:** A6 Checkout driver details section contains only: First name, Last name,
Email (full-width), Special requests. Phone, date of birth, license country, and
flight number fields were removed.

**Why:** Phone and DOB are not required by Caren API at booking time. License
country is validated at pickup, not online — collecting it creates form friction
with zero backend benefit. Flight number is optional (Caren already monitors
flights via booking ref). Removing non-mandatory fields reduces abandonment.
The form is now 4 fields vs 8, a 50% reduction in perceived effort.

**Alternatives rejected:**
- Keep all fields but mark optional — still adds visual complexity and implies
  the data matters. If we collect it, users expect us to use it.

---

## 2026-06-16 — Pay Deposit set to 50%; age gate added to SearchBar

**What:** "Pay Deposit" option changed from 25% to 50% of total. A mandatory
"Driver aged between 25–70" checkbox added below the SearchBar; Search is blocked
with shake animation + red error state if unchecked.

**Why (deposit):** 25% is below the floor required by Caren and most Icelandic
operators. 50% aligns with standard deposit practice across Blue Car, GO Iceland,
and Lava Auto. A lower deposit also exposes the operator to higher no-show risk
on expensive 4×4 vehicles.

**Why (age gate):** Icelandic rental operators universally restrict rentals to
drivers aged 25–70. Displaying this as a mandatory confirmation before Search
prevents users from completing a multi-step booking funnel only to be rejected
at pickup. Failing fast at Search is a better UX than failing at A6 checkout.
The gate is a checkbox (self-declaration), not identity verification — it sets
legal expectation and reduces operator support load.

**Alternatives rejected:**
- Age gate on A6 checkout only — too late; user has already invested time selecting
  a car and filling extras. Failing at step 5 is much more frustrating than step 1.
- Hard DOB field instead of checkbox — DOB verification is out of scope for Phase 1
  and adds GDPR surface area. The checkbox achieves the same legal notice function.

---

## 2026-06-16 — Radix CDN abandoned; custom lightweight wrappers in prototype

**What:** 1G-4 was planned as 8 Radix CDN `<script>` tags for UMD globals.
Radix UI v1+ ships only CommonJS (`index.js`) and ESM (`index.mjs`) — no UMD
builds exist for any of the 8 required packages. Neither unpkg nor jsDelivr serve
a browser-compatible bundle. `radix-primitives.jsx` instead ships 9 custom
lightweight wrappers (IEDialog / IESheet / IEPopover / IESelect / IETabs /
IECheckbox / IESwitch / IETooltip / IEDropdown) using only React + ReactDOM.createPortal.

**Why:** The prototype runs on Babel CDN (no bundler). Loading Radix as ESM from
esm.sh requires `<script type="module">`, which executes before Babel processes
`type="text/babel"` scripts — correct order — but esm.sh still imports its own
React instance, creating a second React copy. React hooks throw when called across
two React instances. The only clean path is a single React instance, which requires
a bundler. The wrappers mirror the exact same API surface (Root/Trigger/Content
composition, keyboard nav, focus trap, ARIA), so the production swap to real Radix
is a CDN-line change in the HTML, not a component refactor.

**Alternatives rejected:**
- esm.sh + importmap + window.React shim — works in theory but two-React-copy
  risk is unacceptable. Would fail silently on any screen that uses a Radix
  component inside a React tree that also uses useState.
- Downgrade to Radix v0.x — v0.x packages also have no UMD builds.
- Build local UMD bundles with webpack/esbuild — introduces a build step,
  defeating the no-bundler prototype goal.

---


---

## 2026-06-24 — Platform landing footer links map to in-page anchors

**What:** Wired all 11 footer `href="#"` placeholders in root `index.html` to real
destinations: coming-soon verticals scroll to `#vertical-*` card IDs; Travel Guides
→ `/bookacar/`; Ring Road → `#region-ring-road`; Destinations/Road Trips → `#regions`;
About → `#statement`; Contact → `#ai`; Privacy/Terms → `#footer-legal` until legal
pages exist (Sprint 5).

**Why:** Dead links fail the platform-landing polish task and break keyboard/screen-reader
navigation. In-page anchors match content that already exists on the landing page;
live surfaces (car rental, blog) route to `/bookacar/`. No new stub pages — keeps
scope within polish-to-done (no Figma file for platform landing).

**Alternatives rejected:**
- Leave `#` until Sprint 4 content screens (RT/DS hubs) — footer stays broken for weeks.
- Create separate `/about`, `/privacy` HTML stubs — out of scope; duplicates future Sprint 5 work.

---

## Update Rules for This File

```
WHO updates this file:    Claude Code or the developer
WHEN:                     any time a decision is made that affects
                          architecture, DS structure, phase scope,
                          or tech stack — regardless of how small it seems
WHAT to write:
  ## YYYY-MM-DD — Short title
  **What:** what was decided
  **Why:** the reasoning — enough context that someone new understands
  **Alternatives rejected:** what was considered and why it lost

NEVER:
  - delete an entry
  - edit a past entry (add a follow-up entry instead)
  - skip logging because "it's obvious" — obvious today, forgotten tomorrow

Reading rule:
  - Session start: read the last 3 entries only
  - Researching a specific decision: search by date or keyword
  - Never read the full file on every session
```
