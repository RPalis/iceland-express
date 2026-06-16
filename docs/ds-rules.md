# IcelandExpress — DS Rules
> Pull when unsure if something is allowed.
> The single owner of laws, bugs, patterns, and conversion rules.

---

## The 12 Laws

```
1.  No raw values in components
    ✗ style={{ fontSize: 14, color: '#94a3b8', padding: 16 }}
    ✓ style={{ fontSize: T.text.sm, color: T.muted, padding: T.space[4] }}

2.  CSS utility classes reference vars not px
    ✗ .t-sm { font-size: 13px }
    ✓ .t-sm { font-size: var(--text-sm) }

3.  Tier 2 + 3 CSS vars never have raw values
    ✗ --card-bg: #111827
    ✓ --card-bg: var(--card)

4.  No Tailwind
    ✗ className="bg-primary text-foreground rounded-md px-4"
    ✓ className="btn btn-primary"

5.  No shadcn visual classes
    ✗ import { Button } from '@/components/ui/button'
    ✓ <Btn variant="primary">

6.  Radix = behaviour only, IE tokens = visual
    Every IERadix wrapper: T.* for all visual properties.
    background T.card.bg · border T.card.border · radius T.card.radius
    zIndex T.z.* · animation var(--dur-enter) var(--ease-default)
    focusRing outline: 2px solid ${T.stroke.focus}

7.  Content screens never own checkout
    RT · DS · AC · BL · BP → CTA only → booking layer
    No FormField, no payment input, no booking Btn

8.  A6 + A7 are shared engines
    Never duplicate. Pass vertical config prop.

9.  Chatbot = travel Q&A only
    Never books · never reads/writes booking state · not on A6/A7

10. Phase gates are hard stops
    Phase 2 only when Icelandair signed · Phase 3 only after Phase 2 live

11. Hook aliases never change
    useS1 useS2 useS3 useS4 useS5 — renaming breaks everything silently

12. New vertical = 3 screens + A1 update only
    XX2 + XX3 + XX4 + homepage search tab
    More than this = something is being duplicated
```

---

## What Belongs Where

```
New CSS value           styles.css first → mirror in tokens.jsx
New UI primitive        ds-atoms.jsx
New atom composition    ds-molecules.jsx
New complex component   ds-organisms.jsx
Cross-screen UI         shared/ui.jsx
New screen              screens/ — correct naming
New vertical            verticals/{name}.config.js first
External API            apis/providers/{name}.provider.js
Business constant       backend/config/constants.js
```

---

## Known Bugs — Never Reintroduce

```
1. Hook alias rename        → breaks all component calls silently
2. Missing DOMContentLoaded → blank screen on some browsers
3. computeTotals moved      → breaks pricing on A3 A5 A6 A7
4. Legacy screens1-5.jsx    → do not load alongside screen-A*.jsx
5. Blog gone bug            → hook alias mismatch during screen splits
6. TripBarEditable wrong    → lives in shared/ui.jsx only, needs setSearch prop
```

---

## Fixed Patterns

```javascript
// Hover — CSS only, never JS
className="hover-lift"             ✓
onMouseEnter={() => setState(...)} ✗

// Status colours — always T.status
T.status.success.bg                ✓
'rgba(52,211,153,0.10)'            ✗

// Icons — never inline SVG
<Ico name="Heart" size={20} />     ✓
<svg>...</svg>                      ✗
```

---

## Conversion Rules — Never Weaken

```
FreeCancBadge     on every car card, detail, checkout, confirmation
Tag priority      Recommended > Best Value > Most Popular > price
Blog sidebar      live location+date pickers wired to search state
Blog mid-article  "View this car" only — never "Compare all"
Mobile sticky     "Book from €X/day" fixed bottom → results
```

---

## Update Rules

```
Owner:  developer only (not Claude Code autonomously)
When:   new law established, new bug discovered, conversion rule changes
Stable: if this file changes every week, decisions are being revisited
```

---

*IcelandExpress · docs/ds-rules.md · v1.2 · June 2026*
