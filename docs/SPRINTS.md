# IcelandExpress — Sprint Plan
> Read at the start of every session. Mark tasks ✅ when complete.
> Never start a new sprint task without finishing the current one.

---

## Phase 1 — Relaunch

### Sprint 1G — Foundation Hardening
*Goal: bulletproof token system + Radix primitive layer before anything else*

- [x] **1G-1** ✅ 2026-06-16 — added spacing/type/weight/leading/shadow/z-index/semantic/Radix vars to styles.css · fixed missing --shadow-card alias

- [x] **1G-2** ✅ 2026-06-16 — added T.space/text/weight/leading/shadow/z/modal · extended T.input + T.card with semantic var mirrors · no raw values in new code

- [x] **1G-3** ✅ 2026-06-16 — migrated t-*/fw-*/lh-*/p-*/mt-*/mb-*/stack-* to var() refs · .t-lg kept raw (17px has no exact var match — needs design review before migrating)

- [x] **1G-4** ✅ 2026-06-16 — Radix UMD unavailable (v1+ ESM/CJS only). Revised: added
      one `<script type="text/babel" src="radix-primitives.jsx">` tag to prototype HTML
      (after blog-data, before screens). Custom wrappers replace CDN approach.
      Decision logged in DECISIONS.md.

- [x] **1G-5** ✅ 2026-06-16 — created `radix-primitives.jsx` (prototype): IEDialog ·
      IESheet · IEPopover · IESelect · IETabs · IECheckbox · IESwitch · IETooltip ·
      IEDropdown. Custom wrappers: portal rendering, focus trap, scroll lock, Escape/click-
      outside dismissal, keyboard nav (Arrow+Enter+Tab), ARIA roles. All visual styles via
      IE CSS custom properties only. Zero errors in browser.

- [x] **1G-6** ✅ 2026-06-16 — smoke test passed: zero console errors, all 9 screens
      defined (HomeScreen→BlogPostScreen), all 9 primitives defined (IEDialog→IEDropdown),
      createElement smoke test clean. A1 home renders correctly in browser.

---

### Sprint 1A — A6/A7 Abstraction
*Goal: checkout + confirmation accept any vertical — prerequisite for Phase 2*

- [ ] **1A-1** Audit `screen-A6-checkout.jsx`: list every car-specific string
      (labels, field names, copy). Output as comments at top of file.

- [ ] **1A-2** Audit `screen-A7-confirm.jsx`: same process.

- [ ] **1A-3** Create `verticals/cars.config.js`:
      Reference implementation of the vertical config schema.
      Populate every field from the existing car rental screens.

- [ ] **1A-4** Refactor `screen-A6-checkout.jsx` to accept `vertical` prop.
      Default = `carsConfig`. Visual output identical when passed `carsConfig`.
      All car-specific strings replaced with `vertical.checkout.*` references.

- [ ] **1A-5** Refactor `screen-A7-confirm.jsx` same way.
      Booking ref prefix, summary title, email subject from config.

- [ ] **1A-6** Create `verticals/flights.config.js` as a stub.
      Same schema. `traveller_label: 'Passenger details'`, `ref_prefix: 'FL-'`.
      API endpoints as placeholder strings.

- [ ] **1A-7** Verification test:
      Render `<Checkout vertical={flightsConfig} />` → shows "Passenger details".
      Render `<Confirmation vertical={flightsConfig} />` → shows "FL-" prefix.
      Both pass without errors → abstraction complete.

---

### Sprint 2 — Claude API Chatbot
*Goal: "Ask Anything" chatbot live on all pages*

- [ ] **2-1** Create `components/Chatbot.jsx`:
      Floating button (56px · bottom-right · `--primary` bg · chat icon).
      Opens `IESheet` slide-over (360px · full height · dark theme).
      Chat UI: message history · input field · send button.
      API: `POST https://api.anthropic.com/v1/messages`
      Model: `claude-sonnet-4-6` · max_tokens: 1000
      System prompt: Iceland travel rules + `{PAGE_CONTEXT}` + `{LANG}`
      Conversation history maintained in component state.
      Error: friendly message, never expose raw API errors.

- [ ] **2-2** Integrate `<Chatbot />` into `app.jsx`:
      Mounts once at App level. Receives `currentScreen` + `detectedLanguage`.
      Persists open/closed across navigation.
      Does NOT render on A6 or A7.

- [ ] **2-3** Test: open on A1 · ask a question · verify response in English.
      Switch language → verify response language follows.
      Navigate to A6 → verify chatbot button is hidden.

---

### Sprint 3 — i18n Engine
*Goal: IP detection + 6-language infrastructure*

- [ ] **3-1** Create `foundation/i18n.js`:
      IP detection via `https://ipapi.co/json/` on app load.
      Country → language map: DE/AT/CH→de · FR/BE→fr · ES→es · IT→it · NL→nl · else→en.
      localStorage override key: `ie_lang`.
      Function: `t(key, lang)` → string, falls back to `en`.
      Export: `{ useLanguage, t, LANGUAGES }`

- [ ] **3-2** Create `foundation/translations/en.js`:
      Extract all user-facing strings from A1, A2, A6, A7, ui.jsx.
      Key format: `"nav.car_rentals"` · `"search.placeholder"` · `"checkout.book_now"`

- [ ] **3-3** Create stub files: `de.js / fr.js / es.js / it.js / nl.js`
      Same keys as `en.js`. Values as `"[DE] key_name"` placeholders.
      Real translations added via AI translation pipeline + human review.

- [ ] **3-4** Wire `useLanguage()` into `app.jsx`.
      Pass `lang` down to `NavBar`, `SearchBar`, `Chatbot`.
      Language switcher in `Footer` updates `localStorage` + re-renders.

---

### Sprint 4 — Content Screens
*Goal: Road Trips, Destinations, Activities inspire → naturally lead to booking*

- [ ] **4-1** Create `screens/screen-RT-hub.jsx` — Road Trips Hub:
      Hero · filter bar (duration / region / difficulty) · trip card grid.
      Each card → `screen-RT-detail.jsx`.
      No booking flow. No checkout.

- [ ] **4-2** Create `screens/screen-RT-detail.jsx` — Road Trip Detail:
      Hero · day-by-day accordion · static map placeholder · recommended car section.
      Recommended car CTA → `go('results')` pre-filtered by car type.
      This is the ONLY CTA to booking. No other checkout path.

- [ ] **4-3** Create `screens/screen-DS-hub.jsx` — Destinations Hub:
      Iceland SVG map (4 clickable regions) · region cards.

- [ ] **4-4** Create `screens/screen-DS-region.jsx` — Region Detail:
      Hero · highlights grid · best time · related road trips.
      CTA: "Explore by car" → `go('results')`. Content only.

- [ ] **4-5** Create `screens/screen-AC-hub.jsx` — Activities Hub:
      Category chips: Adventure · Wildlife · Culture · Relaxation · Northern Lights · Geothermal.
      Activity cards → detail panel (content only in Phase 1).
      CTA per card: "Find a car for this activity" → `go('results')`.
      Code comment: `// Booking CTA added in Phase 4 only`

- [ ] **4-6** Register all new screens in `components.jsx` SCREEN_REGISTRY.
      Add `go()` cases in `app.jsx`.
      Add nav links in `ui.jsx` NavBar.

---

### Sprint 5 — Homepage + Trip Planner Bridge
*Goal: final A1 assembly + Trip Planner placeholder*

- [ ] **5-1** Update `screens/screen-A1-home.jsx`:
      1. Hero: existing globe + "Explore Iceland" + trust signals
      2. Search bar: standard keyword. Cars tab active. Flights tab → "Coming soon" tooltip.
      3. Category cards: Regions → DS-hub · Experiences → AC-hub · Road Trips → RT-hub
      4. Popular cars: 3 featured cards → A3 detail
      5. Ask Anything bar: static prompt element that opens `<Chatbot />`
      6. Blog preview: 3 latest posts → BL or BP
      7. Footer: About · Contact · Privacy · Language switcher · Currency

- [ ] **5-2** Create `screens/screen-TP-soon.jsx` — Trip Planner Coming Soon:
      "Your AI Trip Planner is coming soon."
      "In the meantime, explore our best road trips and car rental options."
      CTA 1: "Explore Road Trips" → `go('road-trips')` [primary]
      CTA 2: "Search Car Rentals" → `go('results')` [secondary]
      Email capture field for launch notification.

- [ ] **5-3** Wire "AI Trip Planner" nav link → `go('trip-planner-soon')`.

---

### Sprint 6 — QA + Relaunch Checklist
*Goal: everything works end-to-end before going live*

- [ ] **6-1** Full booking funnel: A1 → A2 → A3 → A5 → A6 → A7 → MB.
      `computeTotals()` correct throughout.
      `FreeCancBadge` appears on A2, A3, A6, A7.

- [ ] **6-2** Content flow: A1 → RT hub → RT detail → A2 (via car CTA).
      Confirm zero checkout buttons on content screens.

- [ ] **6-3** Chatbot: fires on all screens except A6 + A7.
      API call works. Language follows detection. History persists.

- [ ] **6-4** i18n: language switcher works. IP detection fires. localStorage override works.

- [ ] **6-5** A6/A7 abstraction: render with `flightsConfig`. Labels correct. No errors.

- [ ] **6-6** Vertical abstraction verified → Phase 2 can begin when Icelandair confirms.

- [ ] **6-7** No raw values in any component (grep check).
      No Tailwind classes anywhere (grep check).
      No hardcoded px in CSS utility classes (grep check).

---

## Phase 2 — Flights
*Gate: Icelandair API contract signed. Do not start before.*

- [ ] Update `verticals/flights.config.js` with real Icelandair endpoints
- [ ] Create `screens/screen-B2-flights-results.jsx`
- [ ] Create `screens/screen-B3-flights-detail.jsx`
- [ ] Create `screens/screen-B4-flights-extras.jsx`
- [ ] Activate Flights tab in `screen-A1-home.jsx` search bar
- [ ] Activate Flights nav link in `ui.jsx`
- [ ] Update Chatbot system prompt → mention flights
- [ ] End-to-end flight booking test
- [ ] Create `verticals/hotels.config.js` stub

---

## Phase 3 — Hotels
*Gate: Phase 2 live + hotel partner API confirmed. Do not start before.*

- [ ] Create `verticals/hotels.config.js` with real endpoints
- [ ] Create `screens/screen-C2-hotels-results.jsx`
- [ ] Create `screens/screen-C3-hotels-detail.jsx`
- [ ] Create `screens/screen-C4-hotels-extras.jsx`
- [ ] Add Hotels tab + nav
- [ ] Bundle UI: car + hotel option on results pages
- [ ] Update Chatbot system prompt
- [ ] Create `verticals/experiences.config.js` stub

---

## Phase 4 — Experiences
*Gate: Phase 3 live + experience partner secured. Do not start before.*

- [ ] Create `verticals/experiences.config.js` with real endpoints
- [ ] Create `screens/screen-D2-exp-results.jsx`
- [ ] Create `screens/screen-D3-exp-detail.jsx`
- [ ] Create `screens/screen-D4-exp-extras.jsx`
- [ ] Upgrade `screens/screen-AC-hub.jsx` → add "Book Now" CTA to activities
- [ ] Replace `screen-TP-soon.jsx` with full Trip Planner (`screen-TP-live.jsx`)
- [ ] Update Chatbot: full 4-vertical itinerary building
- [ ] Add Experiences tab + nav

---

*IcelandExpress · docs/SPRINTS.md · v1.0 · June 2026*
*Mark tasks ✅ when complete. Append session notes at bottom.*

---

## Update Rules for This File

```
WHO updates this file:    Claude Code at end of every task
WHEN:                     immediately after a task is confirmed working
WHAT to change:           mark task ✅, add completion date + one-line note

Format for marking done:
  - [x] **1G-1** ✅ 2026-06-17 — added spacing + type + z-index vars to styles.css

NEVER:
  - mark a task done before it's verified working
  - skip a task — if blocked, write WHY next to the checkbox
  - start sprint N+1 without all tasks in sprint N marked ✅

If blocked:
  - [~] **1G-3** ⚠️ BLOCKED — .stack-* density check needed first
  - Append blocker to PROJECT-MASTER.md "Session State"
```
