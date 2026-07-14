# IcelandExpress — Cars Flow Spec (Cars-First Iteration)

> Phase G deliverable. Canonical spec for the Cars vertical, end-to-end.
> Source of truth for Figma screens, prototype wiring, and frontend implementation.
> Provider: **Rentalcars Connect** (replaces Caren API).

---

## 1. Funnel Overview

```
A1 Home  →  A2 Results  →  A3 Detail  →  A5 Extras  →  AUTH-SMS  →  A6 Checkout  →  A7 Confirmation
                                                              ↓
                                                          MB Manage Booking (SMS OTP)
```

5-step funnel plus SMS auth gate before checkout. MB requires SMS OTP to verified mobile.

---

## 2. Per-Screen Spec

### A1 — Home
- **Purpose:** Search entry. Trust signals. Hero + search widget.
- **Primary action:** Submit search → A2 Results
- **Fields (canonical):**
  - Pickup location (geocode, required)
  - Pickup date + time (required, default = today + 1 day, 10:00)
  - Return date + time (required, default = pickup + 7 days, 10:00)
  - Driver age 25-70 confirmation (checkbox, required to enable Search)
- **Provider mapping:** `location_iata` or `location_lat/lng` → Rentalcars `pickUpLocation`;
  dates → `pickUpDateTime` / `returnDateTime` (ISO 8601)
- **States:** default, search-loading (spinner on Search button)

### A2 — Results
- **Purpose:** Compare cars. Filter + sort.
- **Primary action:** Select car → A3 Detail
- **Layout:** Filter sidebar (desktop) / filter sheet (mobile) + results list
- **Card:** `CarCard` component — image, category, provider, name, specs, price, FreeCancBadge
- **Filters:** price range, gearbox (auto/manual), category (economy/SUV/4x4/luxury),
  supplier, seats, doors
- **Sort:** price asc, price desc, recommended, rating
- **States:**
  - default — results list
  - empty — `EmptyState` (no cars match filters)
  - loading — skeleton cards
  - error — `ErrorState` (API down / timeout) + retry
- **Provider mapping:** results from Rentalcars `search` response; each car →
  `vehicleId`, `supplierId`, `category`, `totalPrice`, `dailyRate`, `freeCancellation`

### A3 — Detail
- **Purpose:** Inspect one car. Confirm selection.
- **Primary action:** Continue → A5 Extras
- **Sections:** image gallery, spec table, terms, price breakdown sidebar
- **Sidebar:** `PriceBreakdownCard` — daily rate, line items, total, CTA
- **States:** default, sold-out (provider returns no availability), loading
- **Provider mapping:** Rentalcars `vehicleDetails` by `vehicleId`

### A5 — Extras
- **Purpose:** Add extras (insurance, GPS, child seat, additional driver).
- **Primary action:** Continue → A6 Checkout (or Skip Extras)
- **Layout:** extras list with steppers (qty 0-4) + sticky price sidebar
- **States:** default, loading (extras fetched from provider)
- **Provider mapping:** Rentalcars `extras` list per `vehicleId`

### AUTH — SMS Verify
- **Purpose:** Verify mobile before A6 checkout or MB access.
- **Primary action:** Verify OTP → continue
- **Fields:** Mobile (E.164), 6-digit OTP
- **Variants:** checkout copy vs manage-booking copy
- **States:** enterMobile, enterCode, verified, failed, locked

### A6 — Checkout
- **Purpose:** Collect minimal driver details + payment. Confirm booking.
- **Primary action:** Complete Booking → 3DS → A7 Confirmation
- **Sections:**
  1. Driver details (**First name, Last name, Email, Mobile** — 4 fields only)
  2. Payment amount (Pay in Full / Pay Deposit 50% / Pay at Pickup) — `DepositOption`
  3. Payment method (Card / PayPal / Apple Pay / Google Pay) — `Tab`
  4. Card form (number, expiry, CVC, name on card) — `Field` components
  5. 3DS helper: "Your bank may ask you to confirm this payment (3D Secure)"
  6. Price breakdown sidebar — `PriceBreakdownCard`
  7. Trust badges — `TrustBadges`
- **States:**
  - default — form ready
  - processing — spinner on CTA, fields disabled
  - 3-DS challenge — overlay modal (provider redirect)
  - decline — inline error on card form, retry
- **Provider mapping:**
  - Driver → Rentalcars `driver` object
  - Payment → Stripe (Card) / PayPal / Apple Pay / Google Pay
  - Booking → Rentalcars `createBooking` with `paymentIntentId`

### A7 — Confirmation
- **Purpose:** Confirm booking. Provide voucher + manage link.
- **Primary action:** Done → A1 Home (or Manage Booking → MB)
- **Sections:** confirmation header, booking reference, voucher download,
  trip summary, manage/cancel CTA
- **States:** default, voucher-download (PDF generation)
- **Provider mapping:** Rentalcars `bookingConfirmation` → `bookingRef`, `voucherUrl`

### MB — Manage Booking (SMS-session)
- **Purpose:** View, modify, or cancel bookings for verified mobile.
- **Entry:** NavBar[Manage Booking] → SMS OTP → booking list
- **Lookup:** SMS OTP to mobile (no ref+email primary gate)
- **States:**
  - sms-auth — mobile + OTP (shared AUTH component)
  - list — bookings for verified mobile
  - list-empty — no bookings + retry
  - found — summary + status chip + action buttons
  - change-dates — date picker + re-pricing preview
  - change-location — location picker + re-pricing
  - change-extras — extras stepper + re-pricing
  - cancel-confirm — fee tier preview + refund amount + confirm
  - cancelled — refund receipt + Book another CTA
  - updated — updated voucher + download
  - amendment-failed — provider reject + contact support
  - past-pickup — locked + contact support banner
- **Provider mapping:** Rentalcars `retrieveBooking` by `bookingRef` + `email`;
  modifications via `amendBooking`; cancellations via `cancelBooking`

---

## 3. Payment Logic

### Happy Path
```
1. User fills driver details + selects deposit option + payment method
2. User enters card details (or selects wallet)
3. User clicks "Complete Booking"
   → CTA enters processing state (spinner, fields disabled)
4. Frontend creates Stripe PaymentIntent (or PayPal/Apple Pay/Google Pay session)
5. If 3-DS required:
   → 3-DS challenge overlay (provider redirect)
   → User completes challenge
6. Payment succeeds
   → Rentalcars createBooking called with paymentIntentId
   → Booking confirmed
7. Redirect to A7 Confirmation
```

### Deposit Options
| Option          | Amount due today | Amount due at pickup | Refundable?                     |
|-----------------|------------------|----------------------|---------------------------------|
| Pay in Full     | 100%             | €0                   | Yes, per cancellation tier      |
| Pay Deposit     | 50%              | 50%                  | Yes, deposit refunded per tier  |
| Pay at Pickup   | €0 (auth only)   | 100%                 | Auth released if cancelled       |

---

## 4. Amendment Logic

### Cancellation Tiers (backend/config/constants.js)
| Time before pickup | Fee   | Refund        |
|--------------------|-------|---------------|
| >= 48h             | 0%    | 100%          |
| 24-48h             | 15%   | 85%           |
| < 24h              | 25%   | 75%           |
| < 0h (past pickup) | n/a   | Locked        |

### Refund Logic per Deposit Choice
```
full     →  refund = paidToday * tier.refundPct
deposit  →  refund = paidToday * tier.refundPct    (paidToday = 50% of total)
pickup   →  no refund (€0 captured) · auth token released
```

### Re-pricing on Modification
- Change dates → new daily rate × new days → new total → show delta vs original
- Change location → new location fee → new total → show delta
- Change extras → extras delta only → show delta
- If new total > original: charge difference to original payment method
- If new total < original: refund difference per cancellation tier (if applicable)

---

## 5. Guest-Mode Constraints

- No user accounts. No login. No password.
- Booking retrieval: booking reference + email only
- Modifications: any field except payment method (must re-authenticate card for upgrades)
- Cancellations: full refund per tier, no questions asked
- Session: stateless. Each MB visit requires re-entering ref + email
- Security: booking ref is a 6-char alphanumeric (unguessable). Email must match.

---

## 6. Component Mapping

| Screen | Components used |
|--------|-----------------|
| A1     | NavBar, SearchBar, TrustBadges, Button |
| A2     | NavBar, StepHeader, CarCard, FreeCancBadge, EmptyState, ErrorState, FilterPanel |
| A3     | NavBar, StepHeader, PriceBreakdownCard, FreeCancBadge, Button |
| A5     | NavBar, StepHeader, PriceBreakdownCard, ExtraCard, Button |
| A6     | NavBar, StepHeader, Field, DepositOption, Tab, PriceBreakdownCard, TrustBadges, Button |
| A7     | NavBar, StepHeader, PriceBreakdownCard, Badge, Button |
| MB     | NavBar, Field, Button, PriceBreakdownCard, Badge, InfoBanner |

Reuse ratio target: >= 60% (component instances / total nodes across all screens)

---

## 7. Provider Field Mapping (Rentalcars Connect)

| IcelandExpress field | Rentalcars Connect field        |
|----------------------|---------------------------------|
| pickUpLocation       | pickUpLocation.iata or .lat/lng |
| pickUpDateTime       | pickUpDateTime (ISO 8601)       |
| returnDateTime       | returnDateTime (ISO 8601)       |
| driverAge            | driverAge (25-70 gate)          |
| vehicleId            | vehicleId (from search results) |
| driver.firstName     | driver.firstName                |
| driver.lastName      | driver.lastName                 |
| driver.email         | driver.email                    |
| extras[].id          | extras[].id + qty               |
| paymentIntentId      | payment.paymentIntentId         |
| bookingRef           | bookingRef (returned)           |

Full mapping in `docs/ux-logic.md` §5.

---

## 8. Open Questions

1. Does Rentalcars Connect support Pay at Pickup (auth-only) bookings, or is
   full payment always required at booking time? **→ Ratify with provider docs.**
2. For Apple Pay / Google Pay, do we use Stripe as the gateway, or direct
   provider integration? **→ Recommend Stripe for unified PaymentIntent flow.**
3. What is the maximum number of extras per booking? UI stepper caps at 4 —
   is this a provider limit or a UI choice? **→ Confirm with provider.**
4. For MB modifications, can the user change the pickup location (different city),
   or only the date/time? **→ Confirm provider amendment capability.**

---

*IcelandExpress · design/cars-flow-spec.md · v1.0 · July 2026*
*Owner: design + frontend — update when screens or provider schema change*
