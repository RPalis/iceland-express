# IcelandExpress — Payment Logic Spec

> Phase G deliverable (per `design/audit-cars-2026-07-01.md` §8).
> Canonical payment logic for A6 Checkout and M4 Pay the Difference.
> Source: `docs/ux-logic.md` §7–8 + Figma `Book a car Flows` section (A6 frames, M4 frame `624:50682`).
> Ratifications: 2026-07-08 (`docs/DECISIONS.md`).

---

## 1. Payment amount options (A6)

Three deposit options. Labels are the code labels (canonical — Figma adopts them):

| Option | `pay` value | `paidToday` | `dueAtPickup` | Sublabel | Tag |
|--------|-------------|-------------|---------------|----------|-----|
| **Pay in Full** | `full` | `total` | `€0` | "One payment now" | — |
| **Pay Deposit** | `deposit` | `Math.ceil(total * 0.50)` | `total - paidToday` | "50% now, rest on pickup" | Flexible |
| **Pay at Pickup** | `pickup` | `€0` | `total` | "No charge today" | Free Today |

- "Pay at Pickup" renders only if `vertical.payment.hasPickupOption === true` (cars: yes, flights: no).
- **Dynamic CTA (conversion rule):** the submit button reads `Complete Booking — €{paidToday}` and updates live as the deposit option changes.

## 2. Payment methods (A6)

Four tabs, designed in Figma; Phase 1 wires **Card only** (ratified 2026-07-08):

| Tab | Phase 1 | Wiring |
|-----|---------|--------|
| Card | ✅ wired | Name on Card (+ "Same as driver" checkbox), Card Number, Expiry (MM/YY), CVV |
| PayPal | placeholder | Redirect flow — Phase 2+ |
| Apple Pay | placeholder | Native sheet — Phase 2+ |
| Google Pay | placeholder | Native sheet — Phase 2+ |

Placeholder tabs are selectable in Figma prototypes but show a "Coming soon" panel in the code prototype.

## 3. Capture behaviour per option

| `pay` | Backend action |
|-------|----------------|
| `full` | Sale — capture `total` immediately |
| `deposit` | Sale — capture 50%; remainder auth'd/charged at pickup |
| `pickup` | Auth-only — $0 auth + card-on-file token; full capture at the rental counter (`capture_method: 'manual'`). Phase 1 simulates. |

## 4. Failure branches (A6)

| Failure | Recovery |
|---------|----------|
| Card declined | Toast "Your card was declined" + form remains + card field error + retry |
| **3-DS challenge abandoned** | Toast "Authentication cancelled" + form remains + retry — booking **not** created |
| Provider timeout (>30s) | ErrorState "Payment timed out" + Retry + "No charge was made" |
| Network error | Toast "Network error" + retry |
| Already booked | Modal "This car is no longer available" + return to A2 |
| Price changed | Modal "Price has changed from €X to €Y" + Accept / Cancel |

## 5. Trust signals (A6)

Trust badge row below the CTA: 🔒 SSL Encrypted · ✓ Free Cancellation 48h · 🛡️ Secure Payment.
Price breakdown shows EUR primary + ISK secondary (Iceland context).

## 6. M4 — Pay the Difference (amendments)

When an amendment re-price increases the total (see `design/amendments-flow-spec.md`):

- `PriceDeltaRow` — original total, new total, delta.
- Method pills (Card / PayPal / Apple Pay / Google Pay — card-only wired Phase 1).
- Default note: "Charged to the card used at booking by default."
- CTA: `Pay €{delta} & Update Booking` → on success, M5 Updated.
- Threshold: re-price increases **> 10%** always require this explicit step (ratified `price_increase_percent` = 10).
- Abandoning M4 leaves the booking unchanged.

## 7. Refunds on cancellation

Refund = `paidToday × refund%` per cancellation tier (48h free / 24–48h 85% / <24h 75%).
`pickup` bookings refund €0 — the $0 auth is voided and the token released ("Authorisation released, no charge was made").
Full matrix: `docs/ux-logic.md` §8.3.

---

## 8. SMS OTP access authentication (ratified 2026-07-09)

Required before A6 checkout and before Manage Booking. Search/explore (A1–A5) stays open.

| Step | UI | Backend (Phase 1 spec) |
|------|-----|------------------------|
| Enter mobile | E.164 input + Send code | `POST /api/auth/sms/send` |
| Enter OTP | 6-digit input + Verify | `POST /api/auth/sms/verify` → JWT ~15 min |
| Verified | Continue to A6 or MB | Session `{ mobile, verifiedAt }` |

**Rules:** 6-digit OTP · 5 min TTL · max 3 resends · 15 min lockout after 5 failures.
Prototype simulates send/verify (any 6-digit code in demo).

---

*IcelandExpress · design/payment-logic.md · v1.1 · 2026-07-09*
*Owner: design lead + Claude Code — update when payment options, methods, or capture logic change*
