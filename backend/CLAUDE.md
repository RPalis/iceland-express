# IcelandExpress / backend — CLAUDE.md
> Read after PROJECT-MASTER.md for all server work.
> Phase gates → PROJECT-MASTER.md · Laws → docs/ds-rules.md

---

## Status: Phase 1 — Not yet built

Build only what the current sprint explicitly requires.
Do not build speculatively.

---

## Folder Structure

```
backend/
├── CLAUDE.md
├── server.js                 Express entry point
├── routes/
│   ├── bookings.js           POST /bookings · GET /bookings/:ref
│   ├── search.js             GET /search/cars · /search/flights (Phase 2+)
│   ├── auth.js               POST /auth/guest · POST /auth/account (Phase 2)
│   └── language.js           GET /lang/detect
├── services/
│   ├── bookingService.js     create · retrieve · modify · cancel
│   ├── pricingService.js     computeTotals server-side mirror
│   ├── emailService.js       confirm · manage · cancel emails
│   └── languageService.js    IP → language mapping
├── models/
│   ├── Booking.js
│   └── User.js               Phase 2 — guest mode only in Phase 1
├── middleware/
│   ├── auth.js               JWT validation
│   ├── rateLimit.js
│   └── cors.js
└── config/
    ├── env.js                env var loader + validation
    └── constants.js          CANCELLATION_POLICY lives here only
```

---

## Cancellation Policy — Single Source

```javascript
// config/constants.js — never hardcode these values anywhere else
export const CANCELLATION_POLICY = {
  FREE_HOURS:   48,    // > 48h before pickup = free
  PARTIAL_FEE:  0.15,  // 24–48h = 15%
  LATE_FEE:     0.25,  // < 24h = 25%
};
```

Frontend MB screen displays these same values — they must stay in sync.

---

## API Contract

```
POST   /api/bookings              create booking
GET    /api/bookings/:ref         retrieve (ref + email — guest mode)
PATCH  /api/bookings/:ref         modify (dates · extras · location)
DELETE /api/bookings/:ref         cancel
GET    /api/search/cars           search cars
GET    /api/lang/detect           IP → language code
```

---

## Vertical Routing

```javascript
// services/bookingService.js
async function createBooking(verticalId, data) {
  switch(verticalId) {
    case 'cars':        return carsProvider.book(data);
    case 'flights':     return icelandairProvider.book(data);   // Phase 2
    case 'hotels':      return hotelsProvider.book(data);       // Phase 3
    case 'experiences': return expProvider.book(data);          // Phase 4
  }
}
// New vertical = one new case + one new provider file in apis/providers/
```

---

## Phase 1 Scope — Only These

```
✅ GET /api/lang/detect          needed for i18n on first load
✅ Transactional email           confirm · manage · cancel
[ ] Booking API                  use fixture data until car partner confirms endpoint
[ ] Auth                         guest mode only — accounts in Phase 2
```

---

## Environment Variables

```
NODE_ENV · PORT · FRONTEND_ORIGIN
EMAIL_PROVIDER · EMAIL_API_KEY · EMAIL_FROM
IPAPI_KEY
# Phase 2+: ICELANDAIR_API_KEY · STRIPE_SECRET_KEY · STRIPE_WEBHOOK_SECRET
```

Never commit `.env`. Use `.env.example` with placeholder values only.

---

## Update Rules

```
Owner:   Claude Code
When:    new route added, new service created, new env var required,
         CANCELLATION_POLICY changes, API contract changes
Never:   remove existing routes without DECISIONS.md entry
```

---

*IcelandExpress · backend/CLAUDE.md · v1.2 · June 2026*
