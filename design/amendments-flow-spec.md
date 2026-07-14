# IcelandExpress — Amendments Flow Spec (MB Manage Booking)

> Phase G deliverable (per `design/audit-cars-2026-07-01.md` §8).
> Canonical spec for the guest-mode Manage Booking + amendments flow.
> Figma: `Amendments flow` section `624:50681` inside `Book a car Flows` (`592:39888`).
> Ratifications: 2026-07-08 (`docs/DECISIONS.md`); SMS OTP gate 2026-07-09. Logic detail: `docs/ux-logic.md` §8–9.

---

## 1. State machine

```
lookup → [SMS OTP gate] → list → found → ┬ changeDriver  (M3a) ──────────────→ confirm ─→ updated (M5)
                 ├ changeDates   (M3b) ─→ reprice ─┬─→ confirm ─→ updated (M5)
                 ├ changeLocation(M3c) ─→ reprice ─┤
                 ├ changeExtras  (M3d) ─→ reprice ─┘
                 │                        └ delta > 0 → payDifference (M4) → updated (M5)
                 └ cancelConfirm ─→ cancelled
Failure at any confirm step → amendFailed (retry / contact support)
Past pickup + 2h grace      → found (locked) — amend/cancel disabled, contact-support banner
```

## 2. Figma frame map (canonical nodes)

| State | Figma frame | Node |
|-------|-------------|------|
| Manage hub (all collapsed) | M3 — Manage Booking hub | `624:43154` |
| Change driver | M3a — Change Driver (expanded) | `633:10065` |
| Change dates | M3b — Change Dates (expanded) | `624:42699` |
| Change location | M3c — Change Location (expanded / collapsed) | `624:43641` / `624:44116` |
| Change add-ons | M3d — Change Add-ons (expanded) | `624:44880` |
| Pay the difference | M4 — Pay the Difference | `624:50682` |
| Booking updated | M5 — Booking Updated (confirmation) | `624:51295` |
| Lookup / list | MB — Lookup (SMS OTP) · post-verify booking list | see frame map below |

Shared organisms across M-frames: `NavBar`, `BookingStatusBar`, `BookingSummarySidebar` (with CHANGES chips: Driver / Dates / Location / Add-ons), `Footer`.

### MB SMS + lookup frames (2026-07-09)

| State | Figma frame | Node |
|-------|-------------|------|
| SMS verify (checkout) | AUTH — SMS Verify (checkout) | `1035:5804` |
| SMS code (checkout) | AUTH — SMS Code (checkout) | `1035:6406` |
| SMS verify (manage) | AUTH — SMS Verify (manage booking) | `1035:7008` |
| Booking list | MB — Booking List (post-SMS) | `1035:7610` |
| Slim checkout | A6 — Checkout (slim · post-SMS) | `1039:14272` |
| Cancel confirm | MB — Cancel Confirm | `1016:18613` |
| Cancelled | MB — Cancelled | `1016:19303` |
| Amendment failed | MB — Amendment Failed | `1016:19993` |
| Past pickup (locked) | MB — Past Pickup (locked) | `1016:20683` |

## 3. Guest-mode access (superseded 2026-07-09 → SMS-session)

- Retrieval by **SMS OTP to mobile** — session ~15 min.
- Bookings listed by verified mobile (E.164).
- Optional ref filter after verify ("Have a booking reference?").
- Every amend/cancel action sends a confirmation email to `driver.email`.
- No password accounts, no saved payment methods (Phase 1).

## 4. Amendment use cases

| Use case | State | Re-price? | Notes |
|----------|-------|-----------|-------|
| Change driver details | `changeDriver` | No | Name / phone / license country. No price impact. Flights: not available (re-ticket). |
| Change dates | `changeDates` | Yes | New pickup/return date + time. Duration delta drives price delta. |
| Change location | `changeLocation` | Yes | New pickup/dropoff. One-way fees may apply. |
| Change extras | `changeExtras` | Yes | Stepper quantities, same catalogue as A5. |
| Cancel | `cancelConfirm` | n/a | Fee tier preview before confirm. |

## 5. Re-pricing rules

- `delta = newTotal - originalTotal` computed against Rentalcars live rates.
- `delta < 0` → refund to original card, shown before confirm.
- `delta = 0` → "No price change."
- `delta > 0` → **M4 Pay the Difference** — explicit payment step (see `design/payment-logic.md` §6). Never silently charge.
- `price_increase_percent` threshold: **10%** (ratified). Above it, the original rate is released and the user must accept the new rate.

## 6. Cancellation tiers

| Tier | Hours to pickup | Fee | Refund |
|------|-----------------|-----|--------|
| Free | > 48h | 0% | 100% of `paidToday` |
| Partial | 24–48h | 15% | 85% of `paidToday` |
| Late | < 24h | 25% | 75% of `paidToday` |
| Past pickup | < −2h (grace) | n/a | Locked — contact support |

`pickup` bookings: nothing captured → €0 refund, auth voided, token released.

## 7. Failure states

| Failure | UI |
|---------|----|
| Provider rejects amendment | `amendFailed` — ErrorState "We couldn't update your booking" + Retry + Contact support |
| Refund failed | Booking unchanged + toast "Refund failed — your booking is unchanged" + Contact support |
| Past pickup (+2h grace) | Amend/cancel disabled + banner "Past pickup — contact support to change your booking" |
| Session expired (>30min) | Modal "Your session has expired" + re-enter ref + email |

## 8. Success states

| State | UI |
|-------|----|
| Updated (M5) | Green success banner, updated voucher summary, "Download updated voucher" CTA, "Back to booking" |
| Cancelled | Cancelled banner, refund receipt (amount + tier + method), "Book another car" CTA |

---

*IcelandExpress · design/amendments-flow-spec.md · v1.0 · 2026-07-08*
*Owner: design lead + Claude Code — update when an amendment action, state, or policy changes*
