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
