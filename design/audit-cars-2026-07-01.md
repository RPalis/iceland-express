# Iceland Express — Cars Design Audit

> Date: 2026-07-01
> Auditor: Claude Code (design iteration phase A)
> Figma file: `RGRxsEOrZbuJGDLJasrxby` — section `915:6427` "Book a car Flows"
> Repo: `Documents/GitHub/iceland-express` (master)
> Scope: Cars vertical only — Flights / Hotels / Activities screens not yet designed

---

## 1. Executive summary

The Figma file contains a **single vertical (Cars)** realised as a high-fidelity, dark-mode, hi-fi flow: A1 home/search, A2 results (12+ variants), A3 detail, A5 extras, A6 checkout, A7 confirmation, plus an `Amendments flow` sub-section. The visual language is consistent and conversion-focused (Free Cancellation 48h, trust badges, deposit toggle, sticky price breakdown).

Three structural gaps block the next verticals:

1. **No Figma Variables collection** — every fill/stroke/size is a raw value. There is no token substrate to bind components to. This is the single highest-impact gap (Phase C closes it).
2. **Components are inline, not component instances** — `Button`, `SearchBar`, `StepHeader`, `PriceBreakdownCard`, `Field-*`, `Tab-*`, `TrustBadges` exist as named frames/instances but are not formalised as component sets with variant / boolean / text / instance-swap properties. They cannot be reused safely across the other 3 verticals (Phase D closes this).
3. **Figma ↔ prototype drift on A6** — the Figma A6 has 4 payment-method tabs (Card / PayPal / Apple Pay / Google Pay) + a richer driver form (DOB, Phone, Nationality, Flight Number). The prototype `screen-A6-checkout.jsx` only has card payment + a smaller driver form. Reconciliation needed before either side is canonical.

The repo side is in good shape: `docs/ds-tokens.md` lists the full Tier 1/2/3 token system, `tokens.jsx` mirrors it as `T.*`, `docs/ds-components.md` catalogues atoms/molecules/organisms, `docs/ds-rules.md` codifies 13 laws, and `docs/ARCHITECTURE.md` defines the two-layer model + vertical module pattern. The MB manage-booking flow is **already implemented in the prototype** (`screen-MB-manage.jsx`) with guest-mode lookup, modify dates/location/extras, cancel, and the 48h/24h/<24h cancellation tiers — but it is **not yet designed as Figma frames**.

---

## 2. Screenshots captured

Stored under `design/exports/screens/cars/`:

| File | Figma node | Original size |
|------|------------|---------------|
| `A1-home-search.png` | `915:19093` | 1440 × 2943 |
| `A2-search-results.png` | `915:7245` | 1440 × 2800 |
| `A3-car-detail.png` | `915:7080` | 1440 × 1658 |
| `A5-extras.png` | `915:6958` | 1440 × 1451 |
| `A6-checkout.png` | `915:6428` | 1440 × 2138 |
| `A7-confirmation.png` | `915:6808` | 1440 × 1568 |

Additional variants exist in the file but were not snapshotted (3× A1, 12+× A2, 3× A3, 2× A5, 3× A6, 3× A7). One representative frame per screen type was captured for the audit; the variant matrix will be inventoried in Phase E.

---

## 3. Frame inventory in section `915:6427`

| Screen | Variant count | First node ID | Notes |
|--------|---------------|---------------|-------|
| A1 — Book a car + Search | 3 | `915:19093` | "time" variants (different search states) |
| A2 — Search Results | 12+ | `915:7245` | includes `915:9061` "Price sortingz" variant |
| A3 — Car Detail | 3 | `915:7080` | |
| A5 — Extras | 2 | `915:6958` | |
| A6 — Checkout | 3 | `915:6428` | heights vary 1657–2268 — implies state variants |
| A7 — Booking Confirmation | 3 | `915:6808` | |
| Amendments flow (sub-section `915:20527`) | — | — | not yet snapshotted — Phase E task |

---

## 4. Component inventory (as used in Figma frames)

These are the named frames/instances referenced across the Cars screens. **None are formal Figma components with variant/boolean/text properties yet** — they are inline frames or single instances.

| Figma name | Node (first seen) | DS catalogue match | Status |
|------------|-------------------|--------------------|--------|
| `NavBar-A` | `915:6430` | `NavBar` (organism, ds-organisms.jsx) | **Naming drift**: Figma `NavBar-A` vs code `NavBar`. Links match canonical list (Book a car · Flights · Stays · Experiences · Travel Guides · Help). |
| `SearchBar` (instance) | `915:6445` | `SearchBar` (searchbar.jsx compound) | Match — but not a formal Figma component set |
| `StepHeader` (instance) | `915:6446` | `StepHead` (shared/ui.jsx) | **Naming drift**: Figma `StepHeader` vs code `StepHead` |
| `Button` (instance) | `915:6442` | `Btn` (atom, ds-atoms.jsx) | **Naming drift**: Figma `Button` vs code `Btn`. Figma instance is 120×32 — code `Btn` size `sm` is 36px tall. |
| `PriceBreakdownCard` (instance) | `915:6542` | `PriceSummaryCard` (organism) | **Naming drift**: Figma `PriceBreakdownCard` vs code `PriceSummaryCard` |
| `Field-*` (First Name, Last Name, Email, Phone, DOB, Nationality [hidden], License Country, Flight Number, Name on Card, Card Number, Expiry, CVV) | `915:6453` et al. | `FormField` (molecule) + `Fld` (atom) | Figma treats each field as a custom frame; code composes `FormField` + `Fld`. Need a single `Field` component set in Figma with `label` (text), `placeholder` (text), `helperText` (text), `errorText` (text), `state` (variant), `required` (bool), `span` (bool) props. |
| `Tab-*` (Card, PayPal, Apple Pay, Google Pay) | `915:6506` et al. | `IETabs` (Radix wrapper) | No formal `Tab` molecule in code. Figma tabs are inline. Need a `Tab` component set with `intent` + `state` + `icon` (instance swap). |
| `TrustBadges` | `915:6537` | (inline — no dedicated organism) | **Missing in DS catalogue**. Add as organism `TrustBadges` with `variant` (checkout / confirmation / footer) prop. |
| `Footer` | `915:6543` | (inline — `Footer` in shared/ui.jsx) | Need a `Footer` organism component set. |
| `DepositOptions` (`Dep-Pay Deposit Now`, `Dep-Pay Full Amount`, `Dep-Pay On pick up`) | `915:6491` et al. | (inline in A6) | Need a `DepositOption` component set with `state` (selected / unselected) + `label` (text) + `amount` (text) + `sublabel` (text) props. |
| `CardForm` | `915:6514` | (inline in A6) | Need a `CardForm` organism. |
| `CompleteBookingCTA` | `915:6535` | (inline `Btn` block) | Use `Btn` block variant — no separate component needed. |

**Components in `docs/ds-components.md` with no Figma representation yet:**

| Code component | Type | Action |
|----------------|------|--------|
| `CarCardV2` | organism | Create Figma `CarCard` component set (variants: default / hover / compact / loading) |
| `ExtraCardV2` | organism | Create Figma `ExtraCard` component set |
| `BlogCardV2` | organism | Create Figma `BlogCard` (out of scope this round — content layer) |
| `ManageActionCard` | organism | Create Figma `ManageActionCard` |
| `PageHero` | organism | Create Figma `PageHero` |
| `EmptyState` | organism | Create Figma `EmptyState` component set |
| `PriceSummaryCard` | organism | Create Figma `PriceBreakdownCard` (resolve naming) |
| `Btn` / `BtnIcon` | atom | Create Figma `Button` component set |
| `Bdg` | atom | Create Figma `Badge` component set |
| `Chp` | atom | Create Figma `Chip` component set |
| `Fld` / `SelFld` / `TxtArea` | atom | Create Figma `Input` / `SelectField` / `TextArea` component sets |
| `Chk` | atom | Create Figma `Checkbox` component set |
| `Ico` | atom | Create Figma `Ico` component set (instance swap target for all icons) |
| `Txt` | atom | Create Figma `Text` component set |
| `FormField` | molecule | Create Figma `Field` component set |
| `SpecRow` / `SpecCell` | molecule | Create Figma `SpecRow` component set |
| `PriceTag` | molecule | Create Figma `PriceTag` component set |
| `RatingChip` | molecule | Create Figma `RatingChip` component set |
| `FreeCancBadge` | molecule | Create Figma `FreeCancBadge` component set (law 4 — required on every car card / detail / checkout / confirmation) |
| `InclList` | molecule | Create Figma `InclusionList` |
| `InfoBanner` | molecule | Create Figma `InfoBanner` (variant: info / warn / success / danger) |
| `SectionHdr` | molecule | Create Figma `SectionHeader` |
| `Stepper` | molecule | Create Figma `Stepper` |
| `Spinner` | atom (Sprint 1G) | Create Figma `Spinner` |
| `Skeleton` | atom | Create Figma `Skeleton` |
| `Tooltip` | atom (via `IETooltip`) | Create Figma `Tooltip` |

---

## 5. Figma ↔ prototype drift findings

### 5.1 A6 Checkout — MAJOR drift

| Element | Figma | Prototype (`screen-A6-checkout.jsx`) | Resolution |
|---------|-------|--------------------------------------|------------|
| Driver form fields | First Name, Last Name, Email, Phone, DOB, Nationality (hidden), License Country, Flight Number (optional) | First name, Last name, Email address, Special requests (TxtArea), License issued in (SelFld — referenced in audit comments) | **Reconcile in Phase E**. Figma's fuller field set is the intended Phase 1 spec. Add Phone, DOB, Flight Number, License Country to prototype. Remove Special requests from checkout (move to extras or remove entirely). |
| Payment method tabs | 4 tabs: Card / PayPal / Apple Pay / Google Pay | None — single card form path | **Add to prototype in a future sprint** — but design all 4 in Figma now. Stripe + PayPal + Apple Pay + Google Pay are all supported by Stripe Connections. |
| Deposit options | 3: Pay 50% Deposit Now / Pay Full Amount / Pay On pick up | 3: Pay in Full / Pay Deposit (50%) / Pay at Pickup | **Same intent, label drift**. Standardise labels in Phase E. Code labels: `Pay in Full` / `Pay Deposit` / `Pay at Pickup`. Figma labels: `Pay 50% Deposit Now` / `Pay Full Amount` / `Pay On pick up`. Recommend Figma adopts code labels for consistency. |
| Card form | Name on Card, Card Number, Expiry Date, CVV | Card number, Expiry, CVV, Name on card (with "Same as driver" checkbox) | **Add "Same as driver" checkbox to Figma**. Field order differs — standardise. |
| `Complete Booking — €X` CTA | Shows deposit amount dynamically (`€405.50`) | Shows `Confirm & Book` (no amount) | **Adopt Figma pattern** — dynamic amount in CTA is a strong conversion cue. |
| Trust badges | SSL Encrypted · Free Cancellation 48h · Secure Payment | (not present in checkout) | **Add to prototype** — design is correct. |
| Price breakdown | In sidebar, shows ISK + EUR for each add-on | `PriceSummaryCard` shows EUR only | **Add ISK secondary line** to prototype (Iceland context). |

### 5.2 Component naming drift — needs canonical resolution

| Figma name | Code name | Recommendation |
|------------|-----------|----------------|
| `NavBar-A` | `NavBar` | Use `NavBar` everywhere. The `-A` suffix implies vertical-specific navs (NavBar-B for flights etc.) — but law 13 says one canonical nav. Drop the suffix. |
| `StepHeader` | `StepHead` | Pick one. Recommend `StepHeader` (more descriptive) — rename code `StepHead` → `StepHeader` in a future refactor. |
| `PriceBreakdownCard` | `PriceSummaryCard` | Pick one. Recommend `PriceBreakdownCard` (matches Figma + more descriptive of the line-item breakdown). |
| `Button` | `Btn` | Use `Btn` in code (DS convention is 3-letter atoms) — Figma component display name `Button` with code-syntax `Btn`. |
| `Field-*` | `FormField` + `Fld` | Figma `Field` component set = code `FormField` + `Fld` composition. Document the mapping in `docs/ds-components.md`. |
| `Tab-*` | (no molecule) | Add `Tab` molecule to `ds-molecules.jsx` wrapping `IETabs`. |

### 5.3 MB Manage Booking — Figma gap, prototype lead

The prototype `screen-MB-manage.jsx` already implements:
- `ManageLookup` — guest entry of ref + email
- `ManageFound` — booking summary + actions
- `ManageChangeDates` — modify pickup/return dates + times
- `ManageChangeLocation` — modify pickup/dropoff locations
- `ManageChangeExtras` — modify extras quantities
- `ManageCancelConfirm` — cancellation confirmation with fee tier preview
- `ManageCancelled` — cancelled state
- `ManageUpdated` — success state after an amendment
- `cancellationFee(booking)` — implements 48h free / 24–48h 15% / <24h 25% (matches `backend/config/constants.js`)

**Figma gap:** the `Amendments flow` sub-section exists (`915:20527`) but its frames have not been snapshotted or inventoried. Phase E must design all 8 states (lookup / found / changeDates / changeLocation / changeExtras / cancelConfirm / cancelled / updated) on the `Amendments Flow` page, using the prototype as the functional reference and Figma as the visual source of truth.

**Note for Phase E:** the plan as written lists E7 (Retrieve), E8 (View), E9 (Modify dates), E10 (Add extras), E11 (Cancel), E12 (states). The prototype also has **ManageChangeLocation** which is not explicitly in the plan. Recommend adding E9b (Modify location) to the plan or folding it into E9.

### 5.4 A6 / A7 vertical-config wiring — already done

The prototype A6 and A7 already accept a `vertical` prop (defaults to `window.carsConfig`) and read car-specific strings from it. The audit comments in `screen-A6-checkout.jsx` (`1A-1 AUDIT`) and `screen-A7-confirm.jsx` (`1A-2 AUDIT`) enumerate every car-specific string that must move to the vertical config before Phase 2. **This is a code-side task for a future sprint — not a Figma task.** Figma frames should display the car-specific copy as it will appear in Phase 1, and the vertical-config schema should be documented in `docs/ux-logic.md` (Phase B3).

---

## 6. Token gaps in Figma

The Figma file has **no Variables collection**. Every fill, stroke, text size, space, radius, shadow, and motion value is raw. This breaks law 1 (`docs/ds-rules.md`: no raw values in components) at the Figma layer.

**Token categories that must be created as Figma Variables (Phase C), mapping 1:1 to `docs/ds-tokens.md`:**

| Category | Token count | Source |
|----------|-------------|--------|
| Surfaces (Tier 1) | 8 | `--bg`, `--bg-grad-top`, `--card`, `--card-2`, `--inner`, `--fill`, `--fill-soft`, `--border`, `--border-soft` |
| Brand (Tier 1) | 4 | `--primary`, `--primary-strong`, `--primary-fg`, `--primary-tint`, `--primary-tint-2` |
| Text (Tier 1) | 3 | `--fg`, `--muted`, `--dim` |
| Status (Tier 1) | 4 base + 8 bg/border | `--success`, `--warn`, `--danger`, `--success-deep`, `--info-bg/border`, `--success-bg/border`, `--warn-bg/border`, `--danger-bg/border` |
| Strokes (Tier 2) | 4 | `--stroke-focus`, `--stroke-error`, `--stroke-success-f`, `--stroke-disabled` |
| Alpha (Tier 1) | 6 | `--alpha-05` thru `--alpha-30` |
| Radius (Tier 1) | 6 + scalar | `--r`, `--r-xs/sm/md/lg/xl/pill` |
| Density (Tier 1) | 5 + scalar | `--d`, `--gap`, `--gap-lg`, `--pad-card`, `--pad-field`, `--row-h` |
| Typography fonts (Tier 1) | 2 | `--font-display`, `--font-body` |
| Motion durations (Tier 1) | 6 | `--dur-instant/fast/normal/slow/enter/exit` |
| Easings (Tier 1) | 5 | `--ease-default/in/out/in-out/bounce` |
| Shadows (Tier 2) | 8 | `--shadow-xs/sm/md/lg/xl/card/pop` + `--glow` |
| Spacing (Tier 1) | 10 | `--space-1/2/3/4/5/6/8/10/12/16` |
| Type scale (Tier 1) | 11 sizes + 4 weights + 5 leadings | `--text-xs` thru `--text-6xl`, `--weight-regular` thru `--weight-bold`, `--leading-tight` thru `--leading-loose` |
| Nav (Tier 1 + 2) | 12 | `--nav-frost-bg`, `--nav-blur`, `--nav-max-w`, `--nav-offset`, `--nav-pad-x`, `--nav-menu-max`, `--nav-drawer-*` |
| Z-index (Tier 1) | 9 | `--z-base/raised/dropdown/sticky/overlay/modal/popover/tooltip/toast` |
| Component semantic (Tier 3) | 12 | `--input-*`, `--btn-*`, `--card-*`, `--overlay-bg`, `--modal-*` |
| Radix bridge (Tier 3) | 6 | `--background`, `--foreground`, `--muted-foreground`, `--input`, `--ring`, `--radius`, `--popover`, `--popover-foreground` |

**Total: ~130 variables** to create in the Figma `Iceland Express / Tokens` collection, grouped into sub-collections by category.

---

## 7. Findings vs `docs/ds-rules.md` (13 laws)

| Law | Figma status | Action |
|-----|--------------|--------|
| 1. No raw values in components | **Violated** — no Variables exist | Phase C creates Variables; Phase D binds every component to them |
| 2. CSS utility classes reference vars not px | N/A (Figma) | — |
| 3. Tier 2 + 3 CSS vars never have raw values | N/A (Figma) | — |
| 4. No Tailwind | N/A (Figma) | — |
| 5. No shadcn visual classes | N/A (Figma) | — |
| 6. Radix = behaviour only, IE tokens = visual | N/A (Figma) | — |
| 7. Content screens never own checkout | N/A this round (content screens out of scope) | — |
| 8. A6 + A7 are shared engines | Figma A6/A7 are car-specific frames | Phase E: design A6/A7 as car-specific instances of a shared layout pattern; document the `vertical={config}` contract in `docs/ux-logic.md` (Phase B4) |
| 9. Chatbot = travel Q&A only | Not in scope this round | — |
| 10. Phase gates are hard stops | Plan respects this — only Cars designed this round | — |
| 11. Hook aliases never change | N/A (Figma) | — |
| 12. New vertical = 3 screens + A1 update only | Plan respects this | — |
| 13. Shared UI has ONE source of truth | **Risk**: Figma `NavBar-A` vs code `NavBar` — naming drift | Resolve naming in Phase D (single `NavBar` component set, no `-A` suffix) |

---

## 8. Recommendations for Phase B → G

### Phase B (UX Logic)
- Document the A6 ↔ prototype drift in `docs/ux-logic.md` as an explicit reconciliation decision (which field set is canonical, which payment tabs are in scope for Phase 1 vs Phase 2+).
- Document the `ManageChangeLocation` state — add to the plan's Amendments scope (E9b or fold into E9).
- Document the dynamic-CTA-amount pattern (`Complete Booking — €X` reflects deposit choice) as a conversion rule in `docs/ux-logic.md`.

### Phase C (Tokens)
- Create Figma Variables collection `Iceland Express / Tokens` with sub-collections matching the 17 categories above.
- Single mode (Light/Dark — confirm which the current dark theme is). The current Figma is dark — start with one mode `Dark` and add `Light` only if/when needed.
- Build a `Tokens` page with visual reference frames for every token.

### Phase D (Components)
- Build all 30+ components listed in §4 as proper Figma component sets with variant/boolean/text/instance-swap properties per the master practices table in the plan.
- Resolve naming drift: Figma component names should match code names (`Button` display name, `Btn` code symbol; `NavBar` not `NavBar-A`; `PriceBreakdownCard` everywhere; `StepHeader` everywhere).
- Run the D4 audit script before Phase E starts.

### Phase E (Cars screens + Amendments)
- Reconcile A6 field set: adopt Figma's fuller set (Phone, DOB, License Country, Flight Number) as canonical; remove `Special requests` from checkout (or move to A5 extras).
- Add "Same as driver" checkbox to Figma card form.
- Standardise deposit option labels: `Pay in Full` / `Pay Deposit` / `Pay at Pickup` (code labels win).
- Add dynamic amount to `Complete Booking` CTA in prototype (Figma pattern wins).
- Add trust badges row to prototype A6/A7 (Figma pattern wins).
- Add ISK secondary line to prototype `PriceSummaryCard` (Figma pattern wins).
- Design all 8 MB states on the `Amendments Flow` page (lookup / found / changeDates / changeLocation / changeExtras / cancelConfirm / cancelled / updated).

### Phase F (Prototype)
- Wire A1 → A2 → A3 → A5 → A6 → A7 → MB in Figma's Prototype tab.
- Include amend/cancel branches: A7 "Manage booking" → MB lookup → found → amend/cancel.
- User test with 3 participants; SUS ≥ 70.

### Phase G (Docs sync)
- Update `design/figma-links.md` with all new frame IDs + statuses.
- Update `docs/ds-components.md` with every new Figma component (resolve naming).
- Update `docs/ds-tokens.md` if any new tokens were introduced.
- Create `design/cars-flow-spec.md`, `design/amendments-flow-spec.md`, `design/payment-logic.md`.
- Append `docs/DECISIONS.md` with: design iteration entry, Rentalcars Connect choice, guest-mode amendments, pattern lock-in, naming reconciliation.
- Run `bash scripts/ds-audit.sh --strict` — expect 0 findings on code side (no code changes this round).

---

## 9. Open questions for the next session

1. **A6 field set** — is the Figma fuller set (Phone, DOB, License Country, Flight Number, Nationality) the intended Phase 1 spec, or should some fields defer to Phase 2?
2. **Payment methods in Phase 1** — are all 4 tabs (Card / PayPal / Apple Pay / Google Pay) in scope for Phase 1, or is Phase 1 card-only and the other 3 are visual placeholders?
3. **`Special requests` TxtArea** — remove from A6 entirely, or move to A5 extras?
4. **ManageChangeLocation** — keep as a separate state (E9b) or fold into E9 (Modify dates)?
5. **Light mode** — confirm dark-only for now, or is light mode in scope this round?

These are ratified in Phase B before the UX logic doc is finalised.

---

*IcelandExpress · design/audit-cars-2026-07-01.md · v1.0 · 2026-07-01*
*Owner: design lead + Claude Code — update when drift is reconciled in Phase E*
