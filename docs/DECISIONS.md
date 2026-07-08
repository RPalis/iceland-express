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

## 2026-06-24 — Platform landing: AI planner moved into the hero; standalone #ai section removed

**What:** Restructured the root `index.html` hero. It is now left-aligned (was centered) and
the AI Trip Planner input now lives **inside the hero** — a glowing bordered card with a
trust-badge row above it (Free cancellation · CDW included · Local experts · 4.8★ rated) and
the "Book a car" button retained as a secondary CTA. The previously separate full-height
`#ai` strip section was **deleted**, not duplicated: the single `#ai-input`, `handleAI()`,
`fillPrompt()`, and the `.ai-*`/`.prompt-chip` classes were moved into the hero, and `id="ai"`
was placed on the hero AI card so the nav "Help" and footer "Contact" anchors still resolve.

**Why:** Reference iteration (`iceland-express-anaidea.lovable.app`) puts the AI planner and
trust signals directly in the hero, which front-loads the primary action and credibility
instead of burying the AI input a full screen down. Moving (not copying) the input keeps a
single source for the AI entry point — no duplicate `#ai-input`, consistent with Law 13.
Net diff was +100/−112 lines (consolidation). Verified: ds-audit --strict = 0 findings;
left-alignment measured at 150px with a 600px AI card; 0 console errors; no horizontal
overflow at 375/320; prompt-chip → input wiring functional.

**Alternatives rejected:**
- Keep the standalone `#ai` section AND add an AI box to the hero — two `#ai-input` elements,
  duplicate markup/CSS, guaranteed drift. Rejected outright.
- Drop "Book a car" to match the reference exactly (AI-only hero) — removes the only LIVE
  booking entry point from the hero; kept as secondary for conversion.
- Rewrite the headline/eyebrow to match the reference copy — out of scope; this was a
  layout iteration only, copy unchanged.

---

## 2026-06-30 — Platform nav item parity: landing ↔ bookacar (6 links everywhere)

**What:** Unified global navigation to six primary links on every surface: Book a car,
Flights, Stays, Experiences, Travel Guides, Help. Added `nav-items.js` exporting
`window.NAV_PLATFORM_ITEMS` as the React single source of truth. The bookacar app
(`NavBar` in ds-organisms.jsx) now uses the same list as `index.html` for both desktop
inline links and the ≤960px hamburger drawer. Coming-soon verticals link out to landing
anchors (`/#vertical-flights`, `/#vertical-stays`, `/#vertical-experiences`); Help links
to `/#ai`.

**Why:** Users who tapped "Book a car" on the platform landing saw Flights/Stays/Experiences
in nav, then lost those entries inside `/bookacar/` — especially in the collapsed hamburger
menu. One item config prevents drift between static landing and the booking SPA.

**Alternatives rejected:**
- Keep 3-link nav in bookacar and only show verticals on landing — breaks cross-session
  consistency and the platform positioning as a multi-vertical hub.
- In-app "Coming soon" modals for verticals — out of scope; landing anchors already exist.

---

## 2026-07-01 — Landing nav now mounts the canonical React NavBar (single component)

**What:** Removed the hand-written `<nav>` implementation from root `index.html` and
replaced it with a React mount (`#landing-nav-root`) that renders the canonical
`NavBar` from `frontend/prototype/Iceland express 2 Landing/ds-organisms.jsx`.
Added `nav-items-landing.js` to provide landing-specific items + route mapping
(`window.NAV_LANDING_ITEMS`, `window.LANDING_NAV_ROUTE_MAP`) while preserving the
existing destinations (`/bookacar/`, `/#vertical-*`, `/#ai`).

**Why:** Law 13 requires one source of truth for shared UI. Keeping a static nav in
`index.html` plus a React nav in bookacar caused visual drift and repeated fixes.
Mounting the same component on both surfaces removes duplication and keeps visuals +
interaction states aligned by default.

**Alternatives rejected:**
- Keep syncing static nav markup manually — drift already occurred repeatedly.
- Keep `nav-menu.js` for landing only — duplicates behavior owned by canonical `NavBar`.

---

## 2026-07-01 — Cars-first Figma design iteration: foundations locked, provider switched to Rentalcars Connect

**What:** Launched a 7-phase Figma-only design iteration (Phases A-G) to perfect the Cars vertical end-to-end before any frontend/backend changes. Foundations are locked: (1) 145 Figma Variables in the `Iceland Express / Tokens` collection mapping 1:1 to `styles.css` and `tokens.jsx`; (2) 51 Figma components (19 atoms, 22 molecules, 5 organisms) with auto-layout and 100% variable-bound fills/strokes/text; (3) UX logic documented in `docs/ux-logic.md` (5-step funnel, per-vertical field matrix, Rentalcars Connect schema mapping, payment + amendment logic, guest-mode constraints). Car booking provider switched from Caren to **Rentalcars Connect**. Multi-provider strategy adopted: Rentalcars Connect (cars) / ETG (hotels) / Bokun (activities) / Duffel (flights). D4 audit: 211/212 fills bound, 30/30 strokes bound, 136/137 text colors bound (1 raw = emoji glyph — acceptable). Phase E (screen refinement) started — A6 Checkout and MB Lookup representative screens built from the component library. Phase F (prototype wiring + test plan) documented. Phase G (this entry + spec docs) in progress.

**Why:** The existing Figma frames used 99% raw fills, inline components, and had Figma/prototype drift on A6. Design-to-code drift was documented in the Phase A audit (`design/audit-cars-2026-07-01.md`). Locking foundations first (tokens + components) ensures every future screen starts from bound variables and reusable components — preventing the drift that plagued the NavBar (see 2026-06-17 entries). Switching to Rentalcars Connect gives access to a broader vehicle inventory, standardized extras, and a unified booking API across multiple suppliers. The guest-mode constraint (no accounts) was ratified to reduce booking friction — booking ref + email is the only retrieval key.

**Alternatives rejected:**
- Build screens first, fix tokens later — produces the same drift the audit found. Rejected.
- Keep Caren as the provider — limited inventory, no native extras API, amendment flow is manual. Rejected in favor of Rentalcars Connect.
- Add user accounts for MB — increases friction at booking time; guest-mode (ref + email) is sufficient for Phase 1 and matches Booking.com's retrieve-booking pattern. Rejected.
- Build all 4 verticals simultaneously — violates the vertical-stacking model (2026-06-16 decision). Cars first, then Flights/Hotels/Experiences.

---

## 2026-07-08 — ux-logic §11 open questions ratified (Phase E unblocked)

**What:** All 8 open questions in `docs/ux-logic.md` §11 are ratified with the documented recommendations:

1. **A6 field set** — Figma's fuller set is canonical for Phase 1: First/Last name, Email, Phone, DOB, License Country, Flight Number (optional).
2. **Payment methods** — Card-only is wired in the Phase 1 prototype. PayPal / Apple Pay / Google Pay are designed in Figma as visual placeholder tabs (Phase 2+ wiring).
3. **Special requests** — removed from A6 entirely (not moved to A5).
4. **Change Location** — remains a separate MB state (`changeLocation`), not folded into Modify Dates.
5. **Light mode** — dark-only for Phase 1. Light mode is a Phase 2+ concern.
6. **`price_increase_percent` threshold** — 10%. Any amendment re-price increase above 10% requires an explicit user accept.
7. **MB lookup rate limit** — 5 attempts per IP per 5 minutes, 15-minute lockout after 5 failures.
8. **Past-pickup cutoff** — 2-hour grace period: amend/cancel actions lock when `now > pickupDate + 2h`.

**Why:** Phase E screen refinement and the prototype reconciliation both blocked on these. The recommendations were already documented in `design/audit-cars-2026-07-01.md` §9 and `docs/ux-logic.md` §11; adopting them as written keeps Figma and prototype converging on one canonical spec.

**Alternatives rejected:**
- Deferring ratification until user testing — blocks Phase E indefinitely; the test plan (Phase F) already assumes these flows.
- Wiring all 4 payment methods in Phase 1 — adds provider integration work with no Phase 1 conversion benefit; tabs communicate the roadmap visually.

---

## 2026-07-08 — Amendments flow extended: M3a Change Driver + M4 Pay the Difference

**What:** Two amendment use cases designed in the Figma `Amendments flow` section are adopted into the canonical spec:
- **M3a — Change Driver**: guest can amend driver details (name, phone, license country) on an existing booking. New MB state `changeDriver`; new vertical-config flag `manage.hasModifyDriver` (cars: true).
- **M4 — Pay the Difference**: when an amendment re-price increases the total, the user completes payment of the delta on a dedicated payment step (method pills + card form + `Pay €X & Update Booking` CTA) before the amendment is confirmed. Charged to the card used at booking by default.

The MB state machine is now: `lookup → found → (changeDriver | changeDates | changeLocation | changeExtras) → reprice → (payDifference if delta > 0) → updated`, plus `cancelConfirm → cancelled`.

**Why:** The Figma amendments flow (M3–M5 frames) surfaced these two real-world cases missing from `docs/ux-logic.md` §8: driver details change is Rentalcars Connect's most common amendment, and a price-increase amendment needs an explicit payment step — silently charging the card on file violates the never-silently-raise-the-price rule (ds-rules).

**Alternatives rejected:**
- Charging the delta automatically to the card on file with only a notice — violates explicit-consent pattern for price increases.
- Treating driver change as a cancel + rebook — loses the original rate and free-cancellation window.

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
