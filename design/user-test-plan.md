# IcelandExpress — User Test Plan (Cars-First Iteration)

> Phase F deliverable. Run this plan after the Figma prototype is wired.
> Target: SUS >= 70. Stretch: SUS >= 80.

---

## Participants (n=3)

| ID  | Profile                                   | Booking frequency      | Age band |
|-----|-------------------------------------------|------------------------|----------|
| P1  | Frequent traveler, tech-comfortable       | 3+ car rentals / year  | 30-45    |
| P2  | Occasional traveler, mainstream tech use  | 1 car rental / year    | 25-40    |
| P3  | Tech-cautious user, books rarely          | < 1 car rental / year  | 45-60    |

Recruit via direct outreach. No incentives for n=3. Record screen + audio.
Each session: 30-45 minutes.

---

## Tasks

Each participant completes all 5 tasks in order. Do not assist unless blocked
for > 60 seconds. Log time-on-task, errors, and verbal feedback.

### T1 — Find a car
> "Find a rental car in Reykjavik, picking up July 15 at 10:00, returning July 30 at 10:00."

Flow: A1 Home → A2 Results → A3 Detail
- Pass: reaches A3 Detail with a car selected
- Fail: gives up or selects wrong dates

### T2 — Configure extras + deposit
> "Add a GPS navigator and a child seat. Choose the Pay Deposit option."

Flow: A3 Detail → A5 Extras → A6 Checkout
- Pass: reaches A6 with GPS + child seat added, Pay Deposit selected
- Fail: misses one extra or selects wrong deposit option

### T3 — Complete the booking
> "Complete the booking using the test card 4242 4242 4242 4242, any future date, any CVC."

Flow: A6 Checkout → A7 Confirmation
- Pass: reaches A7 Confirmation
- Fail: cannot get past the payment form or 3-DS challenge

### T4 — Modify the booking dates
> "You realize you need to start on July 20 instead. Change the pickup date."

Flow: A7 → NavBar[Manage Booking] → MB Lookup → MB Found → MB Change dates → MB Updated
- Pass: reaches MB Updated with dates changed to July 20
- Fail: cannot find Manage Booking, or cannot complete the date change

### T5 — Cancel the booking
> "Cancel the booking you just made."

Flow: MB Found → MB Cancel confirm → MB Cancelled
- Pass: reaches MB Cancelled
- Fail: cannot find the cancel action, or cannot confirm the cancellation

---

## Success Metrics

| Metric                    | Target       | Stretch      |
|---------------------------|--------------|--------------|
| Task completion rate      | >= 90%       | 100%         |
| T1 time-on-task           | < 3 min      | < 2 min      |
| T2 time-on-task           | < 2 min      | < 90 sec     |
| T3 time-on-task           | < 3 min      | < 2 min      |
| T4 time-on-task           | < 4 min      | < 3 min      |
| T5 time-on-task           | < 2 min      | < 90 sec     |
| Errors per task           | <= 1         | 0            |
| SUS score                 | >= 70        | >= 80        |

---

## SUS Questionnaire

Administer immediately after T5. 10 items, 5-point Likert
(1 = Strongly Disagree, 5 = Strongly Agree).

1.  I think I would use this system frequently.
2.  I found the system unnecessarily complex.
3.  I thought the system was easy to use.
4.  I think I would need the support of a technical person to use this system.
5.  I found the various functions in this system were well integrated.
6.  I thought there was too much inconsistency in this system.
7.  I would imagine that most people would learn to use this system very quickly.
8.  I found the system very cumbersome to use.
9.  I felt very confident using the system.
10. I needed to learn a lot of things before I could get going with this system.

### Scoring

```
Odd items (1, 3, 5, 7, 9):  score = (response - 1)
Even items (2, 4, 6, 8, 10): score = (5 - response)
Total = sum of all scores × 2.5     →  range 0-100
```

| Score   | Grade      | Meaning                                  |
|---------|------------|------------------------------------------|
| >= 85   | A          | Excellent — ship as-is                   |
| 70-84   | B          | Good — ship with minor fixes             |
| 50-69   | C          | Marginal — iterate before ship           |
| < 50    | F          | Poor — redesign required                 |

Industry average SUS: 68. Target for IcelandExpress: >= 70.

---

## Observation Checklist (per task)

Tick each box if the participant naturally notices/uses the feature without prompting.

- [ ] Did they notice the Free Cancellation badge on car cards?
- [ ] Did they understand Pay Deposit vs Pay in Full vs Pay at Pickup?
- [ ] Did they find the Manage Booking link in the NavBar?
- [ ] Did they understand the cancellation fee tier (>= 48h free / 24-48h 15% / < 24h 25%)?
- [ ] Did the 3-DS challenge cause confusion or abandonment?
- [ ] Did the guest-mode (no account) flow feel natural, or did they expect a login?
- [ ] Did they use the PriceBreakdownCard to verify the total before checkout?
- [ ] Did they notice the TrustBadges (SSL / Free Cancellation / Secure Payment)?

---

## Test Environment

- Figma prototype (read-only link shared with participant)
- Desktop browser at 1440px width (mobile test deferred to Phase E completion)
- Screen recording via Loom or Zoom
- No facilitator screen share — participant drives

---

## Report Template

After all 3 sessions, write `design/user-test-results-YYYY-MM-DD.md`:

```
## Summary
- Participants: P1, P2, P3
- Mean SUS: XX.X
- Task completion: T1 x/3, T2 x/3, T3 x/3, T4 x/3, T5 x/3

## Per-task findings
T1: ...
T2: ...
...

## Top 3 issues (by severity)
1. ...
2. ...
3. ...

## Recommended fixes (for Phase E refinement)
- ...
- ...

## Verdict
SHIP / ITERATE / REDESIGN
```

---

*IcelandExpress · design/user-test-plan.md · v1.0 · July 2026*
*Owner: design — update after each test round*
