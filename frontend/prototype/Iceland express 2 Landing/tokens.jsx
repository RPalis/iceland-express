// tokens.jsx
// ─────────────────────────────────────────────────────────────
// Iceland Express Design System — Token Registry
// Every CSS variable in styles.css has a corresponding JS constant here.
// Components import from this file so token usage is always traceable.
// ─────────────────────────────────────────────────────────────

const T = Object.freeze({

  // ── Surfaces ──────────────────────────────────────────────
  bg:          'var(--bg)',
  bgGrad:      'var(--bg-grad-top)',
  card:        'var(--card)',
  card2:       'var(--card-2)',
  inner:       'var(--inner)',
  fill:        'var(--fill)',
  fillSoft:    'var(--fill-soft)',
  border:      'var(--border)',
  borderSoft:  'var(--border-soft)',

  // ── Brand / Accent ────────────────────────────────────────
  primary:      'var(--primary)',
  primaryStrong:'var(--primary-strong)',
  primaryFg:    'var(--primary-fg)',
  primaryTint:  'var(--primary-tint)',
  primaryTint2: 'var(--primary-tint-2)',

  // ── Text ─────────────────────────────────────────────────
  fg:    'var(--fg)',
  muted: 'var(--muted)',
  dim:   'var(--dim)',

  // ── Status ────────────────────────────────────────────────
  success:     'var(--success)',
  successDeep: 'var(--success-deep)',
  warn:        'var(--warn)',
  danger:      'var(--danger)',

  // ── Typography ────────────────────────────────────────────
  fontDisplay: 'var(--font-display)',
  fontBody:    'var(--font-body)',

  // ── Radius (multiplied by --r scalar) ─────────────────────
  rXs:   'var(--r-xs)',    // 4px  — tiny badges, checkboxes, toggles
  rSm:   'var(--r-sm)',    // 8px  — inputs, small chips, spec cells
  rMd:   'var(--r-md)',    // 12px — buttons, inner card surfaces
  rLg:   'var(--r-lg)',    // 16px — cards, panels, dropdowns
  rXl:   'var(--r-xl)',    // 22px — hero cards, modals, CTA blocks
  rPill: 'var(--r-pill)',  // 9999px — badges, tags, full-pill buttons

  // Radius usage map (component → token)
  radiusMap: {
    badge:     'var(--r-pill)',
    chip:      'var(--r-pill)',
    btn:       'var(--r-md)',
    btnSm:     'var(--r-sm)',
    input:     'var(--r-sm)',
    card:      'var(--r-lg)',
    cardInner: 'var(--r-md)',
    modal:     'var(--r-xl)',
    tooltip:   'var(--r-sm)',
    specCell:  'var(--r-xs)',
    avatar:    '50%',
  },

  // ── Micro animation ──────────────────────────────────────────
  motion: {
    // Duration scale
    dur: {
      instant: 'var(--dur-instant)', // 80ms  — icon swap, colour flash
      fast:    'var(--dur-fast)',    // 140ms — hover colour, chip active
      normal:  'var(--dur-normal)',  // 220ms — card lift, button press
      slow:    'var(--dur-slow)',    // 350ms — modal open, drawer slide
      enter:   'var(--dur-enter)',   // 280ms — element entering DOM
      exit:    'var(--dur-exit)',    // 160ms — element leaving DOM
    },
    // Easing curves
    ease: {
      default: 'var(--ease-default)',  // spring-out — main UI interactions
      in:      'var(--ease-in)',       // accelerate — exit motion
      out:     'var(--ease-out)',      // decelerate — enter motion
      inOut:   'var(--ease-in-out)',   // balanced — modals, drawers
      bounce:  'var(--ease-bounce)',   // overshoot — playful micro moments
    },
    // Transition presets (ready to use in style={})
    tx: {
      color:     'var(--tx-color)',
      transform: 'var(--tx-transform)',
      opacity:   'var(--tx-opacity)',
      shadow:    'var(--tx-shadow)',
      all:       'var(--tx-all)',
    },
  },

  // ── Spacing (multiplied by --d scalar) ────────────────────
  gap:      'var(--gap)',
  gapLg:    'var(--gap-lg)',
  padCard:  'var(--pad-card)',
  padField: 'var(--pad-field)',
  rowH:     'var(--row-h)',

  // ── Shadows ───────────────────────────────────────────────
  shadowCard: 'var(--shadow-card)',
  shadowPop:  'var(--shadow-pop)',
  glow:       'var(--glow)',

  // ── Component Specs ───────────────────────────────────────
  // These describe the intended anatomy of each component in token terms.

  btn: {
    // Height per size step
    height:   { xs: 28, sm: 36, md: 44, lg: 54, xl: 60 },
    // Font size per size step
    fontSize: { xs: 12, sm: 13, md: 15, lg: 17, xl: 18 },
    // Horizontal padding per size step
    padX:     { xs: 10, sm: 14, md: 20, lg: 28, xl: 36 },
    // Icon size per size step
    iconSize: { xs: 12, sm: 14, md: 16, lg: 19, xl: 21 },
    radius:   'var(--r-md)',
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    // Variant tokens
    variant: {
      primary:   { bg: 'var(--primary)',                 fg: 'var(--primary-fg)',    border: 'none' },
      secondary: { bg: 'var(--fill)',                    fg: 'var(--fg)',             border: '1px solid var(--border)' },
      ghost:     { bg: 'var(--fill-soft)',               fg: 'var(--fg)',             border: '1px solid var(--border)' },
      outline:   { bg: 'transparent',                    fg: 'var(--fg)',             border: '1px solid var(--border)' },
      danger:    { bg: 'rgba(239,68,68,0.12)',           fg: 'var(--danger)',         border: '1.5px solid rgba(239,68,68,0.3)' },
      success:   { bg: 'rgba(52,211,153,0.12)',          fg: 'var(--success)',        border: '1.5px solid rgba(52,211,153,0.3)' },
      link:      { bg: 'transparent',                    fg: 'var(--primary-strong)', border: 'none' },
    },
  },

  input: {
    height:     48,
    paddingX:   15,
    radius:     'var(--r-sm)',
    bg:         'var(--inner)',
    border:     '1px solid var(--border)',
    color:      'var(--fg)',
    fontSize:   15,
    placeholderColor: 'var(--dim)',
    focusBorder: 'var(--primary)',
    focusShadow: '0 0 0 3px var(--primary-tint)',
    // State variants
    state: {
      error:   { border: 'var(--danger)',   shadow: '0 0 0 3px rgba(239,68,68,0.12)' },
      success: { border: 'var(--success)',  shadow: '0 0 0 3px rgba(52,211,153,0.10)' },
      disabled:{ opacity: 0.45 },
    },
    // semantic var mirrors (1G-2) — use in new code; existing raw values kept for compat
    bgVar:         'var(--input-bg)',
    borderColor:   'var(--input-border)',
    borderFocus:   'var(--input-border-focus)',
    borderError:   'var(--input-border-error)',
    borderSuccess: 'var(--input-border-success)',
    borderDisabled:'var(--input-border-disabled)',
    heightVar:     'var(--input-height)',
    radiusVar:     'var(--input-radius)',
    paddingXVar:   'var(--input-px)',
    textVar:       'var(--input-text)',
    placeholderVar:'var(--input-placeholder)',
  },

  badge: {
    fontSize:  12,
    paddingX:  11,
    paddingY:  5,
    radius:    'var(--r-pill)',
    gap:       6,
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    // Variant tokens
    variant: {
      primary: { bg: 'var(--primary)',                   fg: 'var(--primary-fg)' },
      soft:    { bg: 'var(--primary-tint)',              fg: 'var(--primary-strong)' },
      success: { bg: 'rgba(52,211,153,0.14)',            fg: 'var(--success)' },
      amber:   { bg: 'rgba(251,191,36,0.14)',            fg: 'var(--warn)' },
      outline: { bg: 'rgba(255,255,255,0.03)',           fg: 'var(--muted)',     border: '1px solid var(--border)' },
      glass:   { bg: 'rgba(5,6,16,0.7)',                fg: 'var(--fg)',         border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(6px)' },
    },
  },

  chip: {
    paddingX:   15,
    paddingY:   8,
    fontSize:   13,
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    radius:     'var(--r-pill)',
    bg:         'var(--card)',
    border:     '1px solid var(--border)',
    color:      'var(--muted)',
    active: {
      bg:     'var(--primary)',
      border: 'var(--primary)',
      color:  'var(--primary-fg)',
    },
  },

  card: {
    bg:      'var(--card)',
    border:  '1px solid var(--border)',
    radius:  'var(--r-lg)',
    padding: 'var(--pad-card)',
    shadow:  'var(--shadow-card)',
    // semantic var mirrors (1G-2)
    borderColor: 'var(--card-border)',
    shadowVar:   'var(--card-shadow)',
  },

  specCell: {
    paddingY: 9,
    fontSize: 11,
    iconSize: 16,
    color:    'var(--muted)',
    bg:       'var(--inner)',
    border:   '1px solid var(--border)',
  },

  avatar: {
    bg:         'var(--primary-tint)',
    color:      'var(--primary-strong)',
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
  },

  // ── Status colors, fills & strokes ────────────────────────────
  // Every background and stroke uses a named CSS variable.
  // Raw rgba values must not appear in component code.
  status: {
    info:    { bg: 'var(--info-bg)',      border: 'var(--info-border)',    text: 'var(--muted)',   icon: 'var(--info-icon)' },
    success: { bg: 'var(--success-bg)',   border: 'var(--success-border)', text: 'var(--success)', icon: 'var(--success-icon)' },
    warn:    { bg: 'var(--warn-bg)',      border: 'var(--warn-border)',    text: 'var(--warn)',    icon: 'var(--warn-icon)' },
    danger:  { bg: 'var(--danger-bg)',    border: 'var(--danger-border)',  text: 'var(--danger)',  icon: 'var(--danger-icon)' },
  },

  // ── Interactive strokes ──────────────────────────────────────
  stroke: {
    focus:    'var(--stroke-focus)',
    error:    'var(--stroke-error)',
    success:  'var(--stroke-success-f)',
    disabled: 'var(--stroke-disabled)',
  },

  // ── Transparency scale ────────────────────────────────────────
  alpha: {
    a05: 'var(--alpha-05)',
    a08: 'var(--alpha-08)',
    a10: 'var(--alpha-10)',
    a12: 'var(--alpha-12)',
    a20: 'var(--alpha-20)',
    a30: 'var(--alpha-30)',
  },

  // ── Spacing scale (1G-2) ──────────────────────────────────────
  space: {
    1:  'var(--space-1)',
    2:  'var(--space-2)',
    3:  'var(--space-3)',
    4:  'var(--space-4)',
    5:  'var(--space-5)',
    6:  'var(--space-6)',
    8:  'var(--space-8)',
    10: 'var(--space-10)',
    12: 'var(--space-12)',
    16: 'var(--space-16)',
  },

  // ── Type scale (1G-2) ─────────────────────────────────────────
  text: {
    xs:   'var(--text-xs)',
    sm:   'var(--text-sm)',
    base: 'var(--text-base)',
    md:   'var(--text-md)',
    lg:   'var(--text-lg)',
    xl:   'var(--text-xl)',
    '2xl':'var(--text-2xl)',
    '3xl':'var(--text-3xl)',
    '4xl':'var(--text-4xl)',
    '5xl':'var(--text-5xl)',
    '6xl':'var(--text-6xl)',
  },

  // ── Weight scale (1G-2) ───────────────────────────────────────
  weight: {
    regular:  'var(--weight-regular)',
    medium:   'var(--weight-medium)',
    semibold: 'var(--weight-semibold)',
    bold:     'var(--weight-bold)',
  },

  // ── Leading scale (1G-2) ──────────────────────────────────────
  leading: {
    tight:   'var(--leading-tight)',
    snug:    'var(--leading-snug)',
    normal:  'var(--leading-normal)',
    relaxed: 'var(--leading-relaxed)',
    loose:   'var(--leading-loose)',
  },

  // ── Shadow scale (1G-2) ───────────────────────────────────────
  shadow: {
    xs:   'var(--shadow-xs)',
    sm:   'var(--shadow-sm)',
    md:   'var(--shadow-md)',
    lg:   'var(--shadow-lg)',
    xl:   'var(--shadow-xl)',
    card: 'var(--shadow-card)',  /* = shadow-sm */
    pop:  'var(--shadow-pop)',
    glow: 'var(--glow)',
  },

  // ── Z-index scale (1G-2) ──────────────────────────────────────
  z: {
    base:     'var(--z-base)',
    raised:   'var(--z-raised)',
    dropdown: 'var(--z-dropdown)',
    sticky:   'var(--z-sticky)',
    overlay:  'var(--z-overlay)',
    modal:    'var(--z-modal)',
    popover:  'var(--z-popover)',
    tooltip:  'var(--z-tooltip)',
    toast:    'var(--z-toast)',
  },

  // ── Modal component tokens (1G-2) ─────────────────────────────
  modal: {
    bg:     'var(--modal-bg)',
    border: 'var(--modal-border)',
    radius: 'var(--modal-radius)',
    shadow: 'var(--modal-shadow)',
    z:      'var(--modal-z)',
  },

});

// ── Raw hex palette (Figma source values) ──────────────────────
const Palette = Object.freeze({
  navy900: '#050610',
  navy800: '#070a18',
  navy700: '#0a0e18',
  navy600: '#0e1626',
  navy500: '#111827',
  navy400: '#161f31',
  navy300: '#1e293b',
  navy200: '#2a3851',
  slate600: '#94a3b8',
  slate700: '#64748b',
  cyan400:  '#06b6d4',
  cyan300:  '#22d3ee',
  emerald400:'#34d399',
  amber400:  '#fbbf24',
  red400:    '#ef4444',
  white:     '#f0f8ff',
});

Object.assign(window, { T, Palette });
