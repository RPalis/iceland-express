# IcelandExpress / apis — CLAUDE.md
> Read after PROJECT-MASTER.md for all integration work.
> Phase gates → PROJECT-MASTER.md

---

## Folder Structure

```
apis/
├── CLAUDE.md
├── providers/
│   ├── cars.provider.js          ✅ internal fleet (Phase 1)
│   ├── ipapi.provider.js         ✅ IP geolocation (Phase 1)
│   ├── claude.provider.js        ✅ Anthropic chatbot (Phase 1)
│   ├── stripe.provider.js        Phase 1 — payment
│   ├── sendgrid.provider.js      Phase 1 — email
│   ├── icelandair.provider.js    Phase 2 — gate: API contract signed
│   ├── hotels.provider.js        Phase 3
│   └── experiences.provider.js   Phase 4
├── contracts/
│   ├── icelandair-api-spec.md    paste Icelandair API docs here when received
│   ├── hotels-api-spec.md        Phase 3
│   └── experiences-api-spec.md   Phase 4
└── mocks/
    ├── cars.mock.js              ✅
    ├── flights.mock.js           build before Icelandair API arrives
    ├── hotels.mock.js            Phase 3
    └── experiences.mock.js       Phase 4
```

---

## Provider Pattern — All Providers Same Shape

```javascript
export const {name}Provider = {
  async search(params)       { /* validate → call → normalise → return */ },
  async book(data)           { /* same pattern */ },
  async cancel(ref, reason)  { /* same pattern */ },
};
// On error: throw with clear message — never expose raw API errors
// normalise() maps external shape → IcelandExpress internal shape
```

---

## Mock Pattern — Build Before Real API

```javascript
// mocks/flights.mock.js — same shape as what icelandair.provider returns
export const flightsMock = {
  search: async () => ({ results: [{ id, airline, origin, destination,
    departure, arrival, duration, stops, pricePerPerson, currency,
    baggageIncluded }] }),
};
```

Build the mock as soon as the vertical config stub is created.
Use mocks in development + tests. Never in production.

---

## Active Phase 1 APIs

```
Anthropic Claude API    chatbot only — Q&A, never booking
  POST https://api.anthropic.com/v1/messages
  model: claude-sonnet-4-6 · max_tokens: 1000
  System: site content + Iceland rules + {PAGE_CONTEXT} + {LANG}

IP Geolocation         language detection
  GET https://ipapi.co/json/
  country → language: DE/AT/CH→de · FR/BE→fr · ES→es · IT→it · NL→nl · else→en
  Fallback: default to 'en' silently if API fails
```

---

## Icelandair Gate — Phase 2 Trigger

```
1. API contract signed
2. Paste docs → apis/contracts/icelandair-api-spec.md
3. Update verticals/flights.config.js endpoints (stubs → real)
4. Build icelandair.provider.js
5. Verify flights.mock.js shape matches provider output
6. Phase 2 can start
```

---

## Security Rules

```
API keys:   .env only — never in source, never in frontend
Stripe:     frontend uses Stripe.js Elements only — never raw card data
Claude API: called from frontend in Phase 1 (chatbot only — acceptable risk)
            proxy through backend if rate limiting becomes an issue
CORS:       backend accepts requests from known frontend origin only
External:   all external APIs go through backend — never expose directly to frontend
            (except Stripe.js Elements + Claude chatbot)
```

---

## Update Rules

```
Owner:   Claude Code
When:    new provider added, contract received, mock updated,
         security rule changes
Never:   remove a provider without checking all usages first
```

---

*IcelandExpress · apis/CLAUDE.md · v1.2 · June 2026*
