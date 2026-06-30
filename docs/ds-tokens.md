# IcelandExpress — Design System: Tokens
> Pull this doc when touching styles.css or tokens.jsx.
> Not needed for every session.

---

## Three-Tier Rule

```
Tier 1 — raw values only        --bg: #050610
Tier 2 — semantic, var() only   --stroke-focus: var(--primary)
Tier 3 — component, var() only  --input-border: var(--border)
```
Tiers 2 and 3 never contain raw values. Breaking this breaks the theme system.

---

## styles.css — Complete Variable List

### Tier 1: Surfaces
```css
--bg: #050610          --bg-grad-top: #070a18
--card: #111827        --card-2: #0e1626
--inner: #0a0e18       --fill: #1e293b
--fill-soft: #161f31   --border: #1e293b
--border-soft: #18202f
```

### Tier 1: Brand (--primary is tweakable)
```css
--primary: #06b6d4          --primary-strong: #22d3ee
--primary-fg: #04121a       --primary-tint: rgba(6,182,212,0.12)
--primary-tint-2: rgba(6,182,212,0.18)
```

### Tier 1: Text
```css
--fg: #f0f8ff    --muted: #94a3b8    --dim: #64748b
```

### Tier 1: Status
```css
--success: #34d399    --success-deep: #064e3b
--warn: #fbbf24       --danger: #ef4444
--info-bg: rgba(6,182,212,0.10)       --info-border: rgba(6,182,212,0.28)
--success-bg: rgba(52,211,153,0.10)   --success-border: rgba(52,211,153,0.28)
--warn-bg: rgba(251,191,36,0.10)      --warn-border: rgba(251,191,36,0.28)
--danger-bg: rgba(239,68,68,0.10)     --danger-border: rgba(239,68,68,0.28)
--info-icon: var(--primary)   --success-icon: var(--success)
--warn-icon: var(--warn)      --danger-icon: var(--danger)
```

### Tier 2: Strokes
```css
--stroke-focus: var(--primary)      --stroke-error: var(--danger)
--stroke-success-f: var(--success)  --stroke-disabled: rgba(255,255,255,0.08)
```

### Tier 1: Alpha Scale
```css
--alpha-05 thru --alpha-30   (rgba white overlays)
```

### Tier 1: Radius (× --r scalar, default 1)
```css
--r: 1
--r-xs: calc(4px * var(--r))    --r-sm: calc(8px * var(--r))
--r-md: calc(12px * var(--r))   --r-lg: calc(16px * var(--r))
--r-xl: calc(22px * var(--r))   --r-pill: 9999px
```

### Tier 1: Density (× --d scalar, default 1)
```css
--d: 1
--gap: calc(20px * var(--d))        --gap-lg: calc(28px * var(--d))
--pad-card: calc(24px * var(--d))   --pad-field: calc(14px * var(--d))
--row-h: calc(52px * var(--d))
```

### Tier 1: Typography
```css
--font-display: "Outfit", system-ui, sans-serif
--font-body: "DM Sans", system-ui, sans-serif
```

### Tier 1: Motion Durations
```css
--dur-instant: 80ms    --dur-fast: 140ms    --dur-normal: 220ms
--dur-slow: 350ms      --dur-enter: 280ms   --dur-exit: 160ms
```

### Tier 1: Easings
```css
--ease-default: cubic-bezier(0.16,1,0.3,1)
--ease-in:      cubic-bezier(0.4,0,1,1)
--ease-out:     cubic-bezier(0,0,0.2,1)
--ease-in-out:  cubic-bezier(0.4,0,0.2,1)
--ease-bounce:  cubic-bezier(0.34,1.56,0.64,1)
```

### Tier 2: Transition Presets
```css
--tx-color     --tx-transform     --tx-opacity     --tx-shadow     --tx-all
```

### Tier 2: Shadows
```css
--shadow-xs: 0 1px 2px rgba(0,0,0,0.40)
--shadow-sm: 0 2px 6px rgba(0,0,0,0.45)
--shadow-md: 0 4px 16px rgba(0,0,0,0.50)
--shadow-lg: 0 8px 28px rgba(0,0,0,0.55)
--shadow-xl: 0 16px 48px rgba(0,0,0,0.65)
--shadow-card: var(--shadow-sm)   ← used by .card class
--shadow-pop:  0 20px 50px -12px rgba(0,0,0,0.7) ← popovers
--glow:        0 0 0 1px rgba(6,182,212,0.25)...  ← btn-primary hover
```

### Tier 1: Spacing (base 4px)
```css
--space-1: 4px   --space-2: 8px    --space-3: 12px   --space-4: 16px
--space-5: 20px  --space-6: 24px   --space-8: 32px   --space-10: 40px
--space-12: 48px --space-16: 64px
```

### Tier 1: Type Scale
```css
--text-xs: 11px   --text-sm: 13px   --text-base: 15px  --text-md: 16px
--text-lg: 18px   --text-xl: 20px   --text-2xl: 24px   --text-3xl: 30px
--text-4xl: 36px  --text-5xl: 46px  --text-6xl: 56px
--weight-regular: 400  --weight-medium: 500
--weight-semibold: 600 --weight-bold: 700
--leading-tight: 1.15  --leading-snug: 1.35   --leading-normal: 1.55
--leading-relaxed: 1.70  --leading-loose: 1.85
```

### Tier 1: Nav (floating pill)
```css
--nav-frost-bg: rgba(7,10,24,0.65)   --nav-blur: 24px
--nav-max-w: 1200px                   --nav-offset: 88px
```

### Tier 2: Nav
```css
--nav-border-color: var(--alpha-08)
--nav-pad-x:        var(--space-8)   /* 32px nav inner gutter — pins logo position
                                        independent of the page-level .shell padding,
                                        applied via `.nav .shell { padding: 0 var(--nav-pad-x) }`.
                                        Mirror: T.nav.padX */
--nav-menu-max:     960px            /* ≤960px: hamburger drawer · >960px: inline links */
--nav-drawer-frost-bg:       rgba(7,10,24,0.90)
--nav-drawer-blur:           40px
--nav-drawer-shadow:         var(--shadow-xl)
--nav-drawer-item-bg:        rgba(255,255,255,0.03)
--nav-drawer-item-hover-bg:  rgba(255,255,255,0.08)
--nav-drawer-item-active-bg: var(--primary-tint-2)
--nav-drawer-item-focus-ring: 0 0 0 2px var(--primary), 0 0 0 4px rgba(6,182,212,0.20)
```

### Tier 1: Z-Index
```css
--z-base: 0       --z-raised: 10     --z-dropdown: 100  --z-sticky: 200
--z-overlay: 300  --z-modal: 400     --z-popover: 500   --z-tooltip: 600
--z-toast: 700
```

### Tier 3: Component Semantic
```css
--input-bg: var(--inner)              --input-border: var(--border)
--input-border-focus: var(--stroke-focus)  --input-placeholder: var(--dim)
--input-text: var(--fg)               --input-radius: var(--r-sm)
--input-height: 48px
--btn-radius: var(--r-md)             --btn-font: var(--font-display)
--btn-height-sm: 36px  --btn-height-md: 44px  --btn-height-lg: 54px
--card-bg: var(--card)                --card-border: var(--border)
--card-radius: var(--r-lg)            --card-shadow: var(--shadow-sm)
--overlay-bg: rgba(5,6,16,0.85)       --modal-radius: var(--r-xl)
--modal-shadow: var(--shadow-xl)
```

### Tier 3: Radix Bridge
```css
--background: var(--card)             --foreground: var(--fg)
--muted-foreground: var(--muted)      --input: var(--input-border)
--ring: var(--stroke-focus)           --radius: var(--r-md)
--popover: var(--card-2)              --popover-foreground: var(--fg)
```

---

## tokens.jsx — T.* Namespaces

```javascript
// Existing (do not rename)
T.primary  T.primaryStrong  T.primaryFg  T.primaryTint
T.fg  T.muted  T.dim  T.border  T.inner
T.success  T.warn  T.danger  T.bgGrad
T.fontDisplay  T.fontBody  T.rSm  T.rMd
T.btn  T.badge  T.chip  T.input  T.status
T.stroke  T.alpha  T.motion  T.radiusMap  T.avatar  T.specCell

// New in v1.2 — add in Sprint 1G
T.space[1..16]          T.text.xs → 5xl
T.weight.*              T.leading.*
T.shadow.xs → xl        T.z.*
T.card.*                T.modal.*
T.input (extended)
```

---

## How to Add a Token

```
1. Add to styles.css in the correct tier section
2. Tier 2/3: always var(--), never raw value
3. Mirror in tokens.jsx under correct T.* namespace
4. Only var(--name) in the JS mirror — never the raw value
```

---

*IcelandExpress · docs/ds-tokens.md · v1.0 · June 2026*

---

## Update Rules for This File

```
WHO updates this file:    Claude Code whenever styles.css or tokens.jsx changes
WHEN:
  - a new CSS variable is added to styles.css
  - a new T.* namespace is added to tokens.jsx
  - a CSS utility class is migrated from hardcoded px to var(--)
  - a variable is deprecated or renamed (never delete, mark as deprecated)

WHAT to change:
  - Add new var to the correct tier section
  - Add T.* namespace to section 4.2
  - Never reorder existing vars — only append to end of each section

NEVER:
  - rename an existing variable (components will break silently)
  - remove a variable without checking all usages first
  - add raw values to Tier 2 or Tier 3 entries
```
