// ds-app.jsx — Design System Reference application
// ─────────────────────────────────────────────────────────────
// Full visual audit of every token, atom, molecule and organism.
// ─────────────────────────────────────────────────────────────

const { useState, useRef, useEffect } = React;

/* ── nav sections ── */
const SECTIONS = [
  { id: 'foundations', label: 'Foundations',   group: 'Tokens' },
  { id: 'atoms-btn',   label: 'Buttons',       group: 'Atoms' },
  { id: 'atoms-input', label: 'Inputs',        group: 'Atoms' },
  { id: 'atoms-badge', label: 'Badges & Chips',group: 'Atoms' },
  { id: 'atoms-misc',  label: 'Avatars & Icons',group:'Atoms' },
  { id: 'molecules',   label: 'Molecules',     group: 'Molecules' },
  { id: 'organisms',   label: 'Organisms',     group: 'Organisms' },
  { id: 'animations',  label: 'Animations',    group: 'Motion' },
  { id: 'screens',     label: 'Screen Index',  group: 'Screens' },
];

/* ── scrollspy hook ── */
function useScrollSpy(ids) {
  const [active, setActive] = React.useState(ids[0]);
  React.useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY + 120;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) current = id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return active;
}

function DSNav() {
  const active = useScrollSpy(SECTIONS.map(s => s.id));
  // Group sections
  const groups = [];
  const seen = {};
  SECTIONS.forEach(s => {
    if (!seen[s.group]) { seen[s.group] = true; groups.push({ group: s.group, items: [] }); }
    groups[groups.length - 1].items.push(s);
  });

  return (
    <aside className="ds-sidebar">
      <div className="ds-sidebar-logo">
        <Icons.Bolt size={15} style={{ color: 'var(--primary)' }} />
        <span>DS Reference</span>
      </div>

      <nav className="ds-sidebar-nav">
        {groups.map(g => (
          <div key={g.group} className="ds-sidebar-group">
            <div className="ds-sidebar-group-label">{g.group}</div>
            {g.items.map(s => (
              <a
                key={s.id}
                className={'ds-sidebar-link' + (active === s.id ? ' active' : '')}
                onClick={() => {
                  const el = document.getElementById(s.id);
                  if (el) window.scrollTo({ top: el.offsetTop - 24, behavior: 'smooth' });
                }}
              >
                {active === s.id && <span className="ds-sidebar-pip" />}
                {s.label}
              </a>
            ))}
          </div>
        ))}
      </nav>

      <div className="ds-sidebar-footer">
        <a href="Iceland Express.html" className="ds-sidebar-back">
          <Icons.ArrowL size={13} /> Prototype
        </a>
      </div>
    </aside>
  );
}

/* ── section wrapper ── */
function Section({ id, title, children }) {
  return (
    <div id={id} className="ds-section">
      <div className="ds-section-title">{title}</div>
      {children}
      <div className="ds-divider" />
    </div>
  );
}

/* ── label below a preview ── */
function Label({ children }) {
  return <div className="ds-label">{children}</div>;
}

/* ── row of previews with labels ── */
function PreviewGroup({ label, children }) {
  return (
    <div>
      {label && <div className="ds-sub">{label}</div>}
      <div className="ds-box">
        <div className="ds-row">{children}</div>
      </div>
    </div>
  );
}

/* ── single preview item ── */
function P({ label, children, col }) {
  return (
    <div className={col ? 'ds-col' : ''} style={{ display: 'flex', flexDirection: 'column', alignItems: col ? 'flex-start' : 'center', gap: 6 }}>
      {children}
      {label && <Label>{label}</Label>}
    </div>
  );
}

/* ============================================================
   FOUNDATIONS
   ============================================================ */
function FoundationsSection() {
  const colors = [
    { name: '--bg',            val: '#050610', label: 'Background' },
    { name: '--card',          val: '#111827', label: 'Card surface' },
    { name: '--card-2',        val: '#0e1626', label: 'Card alt' },
    { name: '--inner',         val: '#0a0e18', label: 'Inner / sunken' },
    { name: '--fill',          val: '#1e293b', label: 'Fill' },
    { name: '--border',        val: '#1e293b', label: 'Border' },
    { name: '--primary',       val: '#06b6d4', label: 'Primary (cyan)' },
    { name: '--primary-strong',val: '#22d3ee', label: 'Primary strong' },
    { name: '--fg',            val: '#f0f8ff', label: 'Foreground' },
    { name: '--muted',         val: '#94a3b8', label: 'Muted' },
    { name: '--dim',           val: '#64748b', label: 'Dim' },
    { name: '--success',       val: '#34d399', label: 'Success' },
    { name: '--warn',          val: '#fbbf24', label: 'Warning' },
    { name: '--danger',        val: '#ef4444', label: 'Danger' },
  ];
  const typeScale = [
    { cls: 't-xs',  px: '11px',  sample: 'Label / caption' },
    { cls: 't-sm',  px: '13px',  sample: 'Body small' },
    { cls: 't-md',  px: '15px',  sample: 'Body default' },
    { cls: 't-lg',  px: '17px',  sample: 'Body large' },
    { cls: 't-xl',  px: '20px',  sample: 'Sub-heading' },
    { cls: 't-2xl', px: '24px',  sample: 'Heading 3' },
    { cls: 't-3xl', px: '30px',  sample: 'Heading 2' },
    { cls: 't-4xl', px: '36px',  sample: 'Heading 1' },
    { cls: 't-5xl', px: '46px',  sample: 'Display large' },
    { cls: 't-6xl', px: '56px',  sample: 'Display hero' },
  ];
  const statusTokens = [
    { name: 'Info',    bg: 'var(--info-bg)',    border: 'var(--info-border)',    icon: 'var(--info-icon)',    text: 'var(--muted)',   cssVars: ['--info-bg','--info-border','--info-icon'] },
    { name: 'Success', bg: 'var(--success-bg)', border: 'var(--success-border)', icon: 'var(--success-icon)', text: 'var(--success)', cssVars: ['--success-bg','--success-border','--success-icon'] },
    { name: 'Warning', bg: 'var(--warn-bg)',    border: 'var(--warn-border)',    icon: 'var(--warn-icon)',    text: 'var(--warn)',    cssVars: ['--warn-bg','--warn-border','--warn-icon'] },
    { name: 'Danger',  bg: 'var(--danger-bg)',  border: 'var(--danger-border)',  icon: 'var(--danger-icon)',  text: 'var(--danger)',  cssVars: ['--danger-bg','--danger-border','--danger-icon'] },
  ];
  const strokeTokens = [
    { name: '--stroke-focus',     val: 'var(--stroke-focus)',     desc: 'Input focus ring' },
    { name: '--stroke-error',     val: 'var(--stroke-error)',     desc: 'Input error border' },
    { name: '--stroke-success-f', val: 'var(--stroke-success-f)', desc: 'Input success border' },
    { name: '--stroke-disabled',  val: 'var(--stroke-disabled)',  desc: 'Disabled border' },
  ];
  const alphaTokens = [
    { name: '--alpha-05', desc: 'Very subtle overlay' },
    { name: '--alpha-08', desc: 'Hover tint' },
    { name: '--alpha-10', desc: 'Status fill bg' },
    { name: '--alpha-12', desc: 'Component tint' },
    { name: '--alpha-20', desc: 'Overlay' },
    { name: '--alpha-30', desc: 'Strong border' },
  ];
  return (
    <Section id="foundations" title="Foundations">

      <div className="ds-sub">Status Colors, Fills &amp; Strokes</div>
      <div className="ds-box">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20 }}>
          {statusTokens.map(s => (
            <div key={s.name} style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 'var(--r-md)', padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <Ico name="Info" size={18} style={{ color: s.icon }} />
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: s.text }}>{s.name}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {s.cssVars.map(v => (
                  <code key={v} style={{ fontSize: 11, background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: 4, color: 'var(--muted)', fontFamily: 'monospace' }}>{v}</code>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ds-sub">Interactive Strokes</div>
      <div className="ds-box">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
          {strokeTokens.map(s => (
            <div key={s.name} className="ds-token" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
              <div style={{ width: '100%', height: 4, borderRadius: 99, background: s.val }} />
              <code style={{ fontSize: 11, color: 'var(--primary-strong)', fontFamily: 'monospace' }}>{s.name}</code>
              <span className="dim" style={{ fontSize: 12 }}>{s.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="ds-sub">Transparency Scale (white alpha on dark bg)</div>
      <div className="ds-box">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 14 }}>
          {alphaTokens.map(a => (
            <div key={a.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 52, height: 52, borderRadius: 'var(--r-sm)', background: a.val, border: '1px solid var(--border)' }} />
              <code style={{ fontSize: 11, color: 'var(--primary-strong)', fontFamily: 'monospace', textAlign: 'center' }}>{a.name}</code>
              <span className="dim" style={{ fontSize: 11, textAlign: 'center' }}>{a.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="ds-sub">Color Tokens</div>
      <div className="ds-box">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px,1fr))', gap: 12 }}>
          {colors.map(c => (
            <div key={c.name} className="ds-token">
              <div className="ds-swatch" style={{ background: c.val }} />
              <div>
                <div style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--primary-strong)' }}>{c.name}</div>
                <div className="muted" style={{ fontSize: 12 }}>{c.label}</div>
                <div className="dim" style={{ fontSize: 11, fontFamily: 'monospace' }}>{c.val}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ds-sub">Typography Scale — Outfit (display) + DM Sans (body)</div>
      <div className="ds-box">
        <table className="spec-table">
          <thead><tr><th>Class</th><th>Size</th><th>Usage</th><th>Preview</th></tr></thead>
          <tbody>
            {typeScale.map(t => (
              <tr key={t.cls}>
                <td><code>.{t.cls}</code></td>
                <td className="dim">{t.px}</td>
                <td className="muted">{t.sample}</td>
                <td><span className={t.cls} style={{ fontFamily: 'var(--font-display)', fontWeight: 600, lineHeight: 1 }}>Iceland Express</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="ds-sub">Corner Radius Scale</div>
      <div className="ds-box">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 20, alignItems: 'end' }}>
          {[
            { s: 'xs',   px: '4px',    usage: 'Badges, checkboxes, toggles' },
            { s: 'sm',   px: '8px',    usage: 'Inputs, chips, spec cells, tooltips' },
            { s: 'md',   px: '12px',   usage: 'Buttons, inner card surfaces' },
            { s: 'lg',   px: '16px',   usage: 'Cards, panels, dropdowns' },
            { s: 'xl',   px: '22px',   usage: 'Hero cards, modals, CTA blocks' },
            { s: 'pill', px: '9999px', usage: 'Badges, tags, pill buttons — never scales' },
          ].map(({ s, px, usage }, i) => {
            const size = s === 'pill' ? 56 : 32 + i * 10;
            return (
              <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                <div style={{ width: size, height: size, background: 'var(--primary-tint)', border: '1.5px solid var(--primary)', borderRadius: `var(--r-${s})` }} />
                <div style={{ textAlign: 'center' }}>
                  <code style={{ fontSize: 11, color: 'var(--primary-strong)', fontFamily: 'monospace', display: 'block' }}>{`--r-${s}`}</code>
                  <span style={{ fontSize: 11, color: 'var(--dim)', fontFamily: 'monospace' }}>{px}</span>
                </div>
                <span style={{ fontSize: 11, color: 'var(--dim)', textAlign: 'center', lineHeight: 1.3 }}>{usage}</span>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 20, padding: '14px 16px', background: 'var(--inner)', borderRadius: 'var(--r-sm)', fontSize: 13 }}>
          <span style={{ color: 'var(--muted)' }}>All radius values multiply by <code style={{ color: 'var(--primary-strong)', fontFamily: 'monospace', fontSize: 12 }}>--r</code> scalar (tweakable in Tweaks panel). Except <code style={{ color: 'var(--primary-strong)', fontFamily: 'monospace', fontSize: 12 }}>--r-pill</code> which is always 9999px.</span>
        </div>
      </div>

      <div className="ds-sub">Radius → Component Usage Map</div>
      <div className="ds-box">
        <table className="spec-table">
          <thead><tr><th>Token</th><th>Base px</th><th>Components</th></tr></thead>
          <tbody>
            {[
              ['--r-xs',   '4px',    'Badge, Chip (inner), Checkbox, Toggle, Spec cell'],
              ['--r-sm',   '8px',    'Input, Select, Textarea, Tooltip, Small button, Dropdown item'],
              ['--r-md',   '12px',   'Button (default), Card inner surface, Pop-over, Tag'],
              ['--r-lg',   '16px',   'Card, Filter sidebar, Price summary, Summary panel'],
              ['--r-xl',   '22px',   'Hero card, Modal, CTA block, Full-bleed section'],
              ['--r-pill', '9999px', 'Badge, Pill, Chip active, Full-pill button variant'],
            ].map(([token, px, comps]) => (
              <tr key={token}>
                <td><code>{token}</code></td>
                <td><code>{px}</code></td>
                <td className="muted">{comps}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

/* ============================================================
   MICRO ANIMATIONS
   ============================================================ */
function AnimationsSection() {
  const [hovered, setHovered] = useState(null);
  const durs = [
    { name: '--dur-instant', ms: 80,  label: 'Instant', usage: 'Icon swap, colour flash' },
    { name: '--dur-fast',    ms: 140, label: 'Fast',    usage: 'Hover colour, chip active' },
    { name: '--dur-normal',  ms: 220, label: 'Normal',  usage: 'Card lift, button press' },
    { name: '--dur-slow',    ms: 350, label: 'Slow',    usage: 'Modal open, drawer slide' },
    { name: '--dur-enter',   ms: 280, label: 'Enter',   usage: 'Element entering DOM' },
    { name: '--dur-exit',    ms: 160, label: 'Exit',    usage: 'Element leaving DOM' },
  ];
  const eases = [
    { name: '--ease-default', curve: 'cubic-bezier(0.16,1,0.3,1)',    label: 'Spring-out', usage: 'Main UI — most interactions' },
    { name: '--ease-in',      curve: 'cubic-bezier(0.4,0,1,1)',        label: 'Ease in',    usage: 'Exit motion, fade out' },
    { name: '--ease-out',     curve: 'cubic-bezier(0,0,0.2,1)',        label: 'Ease out',   usage: 'Enter motion, fade in' },
    { name: '--ease-in-out',  curve: 'cubic-bezier(0.4,0,0.2,1)',      label: 'Ease in-out',usage: 'Modals, drawers' },
    { name: '--ease-bounce',  curve: 'cubic-bezier(0.34,1.56,0.64,1)', label: 'Bounce',     usage: 'Playful micro moments' },
  ];
  const txPresets = [
    { name: '--tx-color',     usage: 'Button hover, link hover, badge color',    demo: 'Hover me' },
    { name: '--tx-transform', usage: 'Card lift, button press, chip scale',       demo: 'Hover me' },
    { name: '--tx-shadow',    usage: 'Glow on primary btn, card shadow on hover', demo: 'Hover me' },
    { name: '--tx-all',       usage: 'Full component — colour + shadow + lift',   demo: 'Hover me' },
  ];
  // Bezier path helper for SVG preview
  function bezierPath(c) {
    const pts = c.match(/[\d.]+/g).map(Number);
    if (pts.length < 4) return '';
    const [x1,y1,x2,y2] = pts;
    return `M0,60 C${x1*60},${60-y1*60} ${x2*60},${60-y2*60} 60,0`;
  }
  return (
    <Section id="animations" title="Micro Animations — Duration, Easing & Transitions">

      <div className="ds-sub">Duration Scale</div>
      <div className="ds-box">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {durs.map(d => (
            <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <code style={{ fontSize: 12, color: 'var(--primary-strong)', fontFamily: 'monospace', width: 130, flexShrink: 0 }}>{d.name}</code>
              <div style={{ flex: 1, height: 6, background: 'var(--fill)', borderRadius: 99, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: (d.ms / 350 * 100) + '%', background: 'var(--primary)', borderRadius: 99, transition: 'width 0.5s' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: 'var(--fg)', width: 42, textAlign: 'right' }}>{d.ms}ms</span>
              <span style={{ fontSize: 12, color: 'var(--dim)', width: 180 }}>{d.usage}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="ds-sub">Easing Curves</div>
      <div className="ds-box">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 20 }}>
          {eases.map(e => (
            <div key={e.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <svg width="64" height="64" viewBox="-4 -4 68 68">
                <rect x="-4" y="-4" width="68" height="68" fill="var(--inner)" rx="6" />
                <line x1="0" y1="0" x2="0" y2="60" stroke="var(--border)" strokeWidth="1" />
                <line x1="0" y1="60" x2="60" y2="60" stroke="var(--border)" strokeWidth="1" />
                <path d={bezierPath(e.curve)} fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="0" cy="60" r="3" fill="var(--primary)" />
                <circle cx="60" cy="0" r="3" fill="var(--primary)" />
              </svg>
              <code style={{ fontSize: 11, color: 'var(--primary-strong)', fontFamily: 'monospace', textAlign: 'center' }}>{e.name}</code>
              <span style={{ fontSize: 12, fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--muted)' }}>{e.label}</span>
              <span style={{ fontSize: 11, color: 'var(--dim)', textAlign: 'center', lineHeight: 1.3 }}>{e.usage}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="ds-sub">Transition Presets — Live Demos</div>
      <div className="ds-box preview-dark">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
          {[
            { name: '--tx-color',     style: { transition: 'var(--tx-color)' },     hover: { background: 'var(--primary)', color: 'var(--primary-fg)', borderColor: 'var(--primary)' }, usage: 'Colour' },
            { name: '--tx-transform', style: { transition: 'var(--tx-transform)' }, hover: { transform: 'translateY(-6px) scale(1.03)' }, usage: 'Transform' },
            { name: '--tx-shadow',    style: { transition: 'var(--tx-shadow)' },    hover: { boxShadow: 'var(--glow)' }, usage: 'Shadow' },
            { name: '--tx-all',       style: { transition: 'var(--tx-all)' },       hover: { background: 'var(--primary)', color: 'var(--primary-fg)', transform: 'translateY(-4px)', boxShadow: 'var(--glow)' }, usage: 'All' },
          ].map(item => (
            <div
              key={item.name}
              style={{ padding: '20px 14px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', textAlign: 'center', cursor: 'pointer', ...item.style, ...(hovered === item.name ? item.hover : {}) }}
              onMouseEnter={() => setHovered(item.name)}
              onMouseLeave={() => setHovered(null)}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>{item.usage}</div>
              <code style={{ fontSize: 10, fontFamily: 'monospace', opacity: 0.7 }}>{item.name}</code>
            </div>
          ))}
        </div>
      </div>

      <div className="ds-sub">Spec Table</div>
      <div className="ds-box">
        <table className="spec-table">
          <thead><tr><th>Token</th><th>Duration</th><th>Easing</th><th>Use on</th></tr></thead>
          <tbody>
            {[
              ['--tx-color',     '--dur-fast (140ms)',   '--ease-out',     'Button hover, link, badge'],
              ['--tx-transform', '--dur-normal (220ms)', '--ease-default', 'Card lift, chip scale, button press'],
              ['--tx-opacity',   '--dur-fast (140ms)',   '--ease-out',     'Toast in/out, overlay fade'],
              ['--tx-shadow',    '--dur-normal (220ms)', '--ease-out',     'Glow on primary btn, card hover'],
              ['--tx-all',       'mixed',                'mixed',          'Full component transitions'],
            ].map(([token,...rest]) => (
              <tr key={token}><td><code>{token}</code></td>{rest.map((r,i)=><td key={i} className="muted">{r}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

/* ============================================================
   BUTTONS
   ============================================================ */
function ButtonSection() {
  const [loading, setLoading] = useState(false);
  return (
    <Section id="atoms-btn" title="Atoms — Buttons">

      <div className="ds-sub">Variants</div>
      <div className="ds-box preview-dark">
        <div className="ds-row">
          <P label="btn-primary"><Btn variant="primary">Primary</Btn></P>
          <P label="btn-secondary"><Btn variant="secondary">Secondary</Btn></P>
          <P label="btn-ghost"><Btn variant="ghost">Ghost</Btn></P>
          <P label="btn-outline"><Btn variant="outline">Outline</Btn></P>
          <P label="btn-danger"><Btn variant="danger">Danger</Btn></P>
          <P label="btn-success"><Btn variant="success">Success</Btn></P>
          <P label="btn-link"><Btn variant="link">Link</Btn></P>
        </div>
      </div>

      <div className="ds-sub">Sizes</div>
      <div className="ds-box preview-dark">
        <div className="ds-row" style={{ alignItems: 'flex-end' }}>
          <P label="btn-xs"><Btn variant="primary" size="xs">Extra Small</Btn></P>
          <P label="btn-sm"><Btn variant="primary" size="sm">Small</Btn></P>
          <P label="btn-md (default)"><Btn variant="primary" size="md">Medium</Btn></P>
          <P label="btn-lg"><Btn variant="primary" size="lg">Large</Btn></P>
          <P label="btn-xl"><Btn variant="primary" size="xl">Extra Large</Btn></P>
        </div>
      </div>

      <div className="ds-sub">With Icons</div>
      <div className="ds-box preview-dark">
        <div className="ds-row">
          <P label="icon (left)"><Btn variant="primary" icon={Icons.Search}>Search Cars</Btn></P>
          <P label="icon (right)"><Btn variant="primary" iconEnd={Icons.ArrowR}>Continue</Btn></P>
          <P label="ghost + icon"><Btn variant="ghost" icon={Icons.Edit}>Edit</Btn></P>
          <P label="danger + icon"><Btn variant="danger" icon={Icons.X}>Cancel</Btn></P>
          <P label="success + icon"><Btn variant="success" icon={Icons.Check}>Confirmed</Btn></P>
        </div>
      </div>

      <div className="ds-sub">Icon-Only (BtnIcon)</div>
      <div className="ds-box preview-dark">
        <div className="ds-row" style={{ alignItems: 'flex-end' }}>
          <P label="primary xs"><BtnIcon variant="primary" size="xs" icon={Icons.Plus} /></P>
          <P label="primary sm"><BtnIcon variant="primary" size="sm" icon={Icons.Plus} /></P>
          <P label="primary md"><BtnIcon variant="primary" size="md" icon={Icons.Plus} /></P>
          <P label="primary lg"><BtnIcon variant="primary" size="lg" icon={Icons.Plus} /></P>
          <P label="ghost"><BtnIcon variant="ghost" size="md" icon={Icons.Edit} /></P>
          <P label="outline"><BtnIcon variant="outline" size="md" icon={Icons.Gear} /></P>
          <P label="danger"><BtnIcon variant="danger" size="md" icon={Icons.X} /></P>
        </div>
      </div>

      <div className="ds-sub">States</div>
      <div className="ds-box preview-dark">
        <div className="ds-row">
          <P label="default"><Btn variant="primary">Book Now</Btn></P>
          <P label="loading"><Btn variant="primary" loading>Processing</Btn></P>
          <P label="disabled"><Btn variant="primary" disabled>Disabled</Btn></P>
          <P label="ghost disabled"><Btn variant="ghost" disabled>Disabled</Btn></P>
          <P label="block"><div style={{ width: 240 }}><Btn variant="primary" block>Full Width</Btn></div></P>
        </div>
      </div>

      <div className="ds-sub">Spec Table</div>
      <div className="ds-box">
        <table className="spec-table">
          <thead><tr><th>Variant</th><th>Background</th><th>Text</th><th>Border</th><th>Figma match</th></tr></thead>
          <tbody>
            {[
              ['primary',   'var(--primary)',              'var(--primary-fg)',   'none',           '✓'],
              ['secondary', 'var(--fill)',                 'var(--fg)',           'var(--border)',   '✓'],
              ['ghost',     'var(--fill-soft)',            'var(--fg)',           'var(--border)',   '✓'],
              ['outline',   'transparent',                 'var(--fg)',           'var(--border)',   '✓'],
              ['danger',    'rgba(239,68,68,0.12)',        'var(--danger)',       'danger @30%',     '✓'],
              ['success',   'rgba(52,211,153,0.12)',       'var(--success)',      'success @30%',    '✓'],
              ['link',      'transparent',                 'var(--primary-strong)','none',           '✓'],
            ].map(([v,...rest]) => (
              <tr key={v}>
                <td><code>.btn-{v}</code></td>
                {rest.map((r,i) => <td key={i} className="muted">{r}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

/* ============================================================
   INPUTS
   ============================================================ */
function InputSection() {
  const [val, setVal] = useState('');
  return (
    <Section id="atoms-input" title="Atoms — Input Fields">

      <div className="ds-sub">States</div>
      <div className="ds-box preview-dark" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
        <div>
          <Label>Default (empty)</Label>
          <input className="input" type="text" placeholder="e.g. Keflavík Airport" style={{ marginTop: 8 }} />
        </div>
        <div>
          <Label>Default (filled)</Label>
          <input className="input" type="text" defaultValue="Keflavík Airport (KEF)" style={{ marginTop: 8 }} />
        </div>
        <div>
          <Label>Focus</Label>
          <input className="input" type="text" autoFocus defaultValue="" placeholder="Focused state" style={{ marginTop: 8, borderColor: 'var(--primary)', boxShadow: '0 0 0 3px var(--primary-tint)' }} />
        </div>
        <div>
          <Label>Error (.is-error)</Label>
          <input className="input is-error" type="text" defaultValue="wrong@" style={{ marginTop: 8 }} />
          <div className="field-error">Invalid email address</div>
        </div>
        <div>
          <Label>Success (.is-success)</Label>
          <input className="input is-success" type="text" defaultValue="anna@example.com" style={{ marginTop: 8 }} />
          <div className="field-success-msg">Email verified</div>
        </div>
        <div>
          <Label>Disabled (.is-disabled)</Label>
          <input className="input is-disabled" type="text" defaultValue="Read-only value" disabled style={{ marginTop: 8 }} />
        </div>
      </div>

      <div className="ds-sub">Input with Icon Prefix / Suffix (InputGroup)</div>
      <div className="ds-box preview-dark" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          <Label>Search input (iconPre=Search)</Label>
          <InputGroup iconPre={Icons.Search} placeholder="Search cars…" value={val} onChange={e=>setVal(e.target.value)} style={{ marginTop: 8 }} />
        </div>
        <div>
          <Label>Location (iconPre=Pin)</Label>
          <InputGroup iconPre={Icons.Pin} placeholder="Pickup location" style={{ marginTop: 8 }} />
        </div>
        <div>
          <Label>Date (iconPre=Calendar)</Label>
          <InputGroup iconPre={Icons.Calendar} placeholder="Jun 15, 2026" style={{ marginTop: 8 }} />
        </div>
        <div>
          <Label>Error state with icon</Label>
          <InputGroup iconPre={Icons.Lock} status="error" placeholder="Wrong password" style={{ marginTop: 8 }} />
          <div className="field-error">Incorrect password</div>
        </div>
      </div>

      <div className="ds-sub">Select / Dropdown</div>
      <div className="ds-box preview-dark" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          <Label>Default select</Label>
          <SelFld style={{ marginTop: 8 }}>
            <option>Manual</option><option>Automatic</option>
          </SelFld>
        </div>
        <div>
          <Label>Select — disabled</Label>
          <select className="input selectbox is-disabled" disabled style={{ marginTop: 8 }}>
            <option>Disabled option</option>
          </select>
        </div>
      </div>

      <div className="ds-sub">Textarea</div>
      <div className="ds-box preview-dark">
        <div style={{ maxWidth: 480 }}>
          <Label>Default textarea</Label>
          <TxtArea placeholder="Special requests, seat preferences…" rows={3} style={{ marginTop: 8 }} />
        </div>
      </div>

      <div className="ds-sub">FormField Molecule (label + input + helper/error)</div>
      <div className="ds-box preview-dark" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <FormField label="First name" required>
          <Fld type="text" placeholder="Anna" />
        </FormField>
        <FormField label="Email address" required helper="We'll send your confirmation here.">
          <Fld type="email" placeholder="anna@example.com" />
        </FormField>
        <FormField label="Booking reference" helper="Found in your confirmation email.">
          <Fld type="text" placeholder="ICE-7X9K" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }} />
        </FormField>
        <FormField label="Password" error="Must be at least 8 characters">
          <InputGroup iconPre={Icons.Lock} status="error" placeholder="••••••••" />
        </FormField>
      </div>
    </Section>
  );
}

/* ============================================================
   BADGES & CHIPS
   ============================================================ */
function BadgeSection() {
  const [active, setActive] = useState('SUV');
  return (
    <Section id="atoms-badge" title="Atoms — Badges, Chips & Pills">

      <div className="ds-sub">Badge Variants</div>
      <div className="ds-box preview-dark">
        <div className="ds-row">
          <P label="badge-primary"><Bdg variant="primary">Primary</Bdg></P>
          <P label="badge-soft"><Bdg variant="soft">Soft</Bdg></P>
          <P label="badge-success"><Bdg variant="success"><Icons.Shield size={12} /> Free Cancellation</Bdg></P>
          <P label="badge-amber"><Bdg variant="amber">Premium</Bdg></P>
          <P label="badge-outline"><Bdg variant="outline">Badge</Bdg></P>
          <P label="badge-glass"><Bdg variant="glass">Glass</Bdg></P>
        </div>
      </div>

      <div className="ds-sub">Badge with Icon</div>
      <div className="ds-box preview-dark">
        <div className="ds-row">
          <P label="Recommended"><Bdg variant="primary"><Icons.Sparkle size={12} /> Recommended</Bdg></P>
          <P label="Best Value"><Bdg variant="success"><Icons.Check size={12} /> Best Value</Bdg></P>
          <P label="Most Popular"><Bdg variant="soft"><Icons.Star size={12} /> Most Popular</Bdg></P>
          <P label="Electric"><Bdg variant="soft"><Icons.Bolt size={12} /> Electric</Bdg></P>
          <P label="Free Cancellation"><FreeCancBadge compact /></P>
        </div>
      </div>

      <div className="ds-sub">Chips (Chp) — Filter / Sort Controls</div>
      <div className="ds-box preview-dark">
        <div className="ds-row">
          {['All','SUV','4x4','Compact','Electric','Luxury'].map(c => (
            <P key={c} label={c === active ? 'active' : 'default'}>
              <Chp active={c === active} onClick={() => setActive(c)}>{c}</Chp>
            </P>
          ))}
        </div>
      </div>

      <div className="ds-sub">Pills</div>
      <div className="ds-box preview-dark">
        <div className="ds-row">
          <P label="pill (default)"><span className="pill"><Icons.Sparkle size={14} /> Iceland's marketplace</span></P>
          <P label="pill (text only)"><span className="pill">Free cancellation</span></P>
          <P label="pill + check"><span className="pill"><Icons.Check size={14} /> CDW Included</span></P>
        </div>
      </div>
    </Section>
  );
}

/* ============================================================
   AVATARS & ICONS
   ============================================================ */
function MiscSection() {
  return (
    <Section id="atoms-misc" title="Atoms — Avatars, Stars, Divider">
      <div className="ds-sub">Avatars (Avtr)</div>
      <div className="ds-box preview-dark">
        <div className="ds-row" style={{ alignItems: 'flex-end' }}>
          {[24,32,38,48,56].map(s => (
            <P key={s} label={`size=${s}`}><Avtr name="Anna Sigurðardóttir" size={s} /></P>
          ))}
        </div>
      </div>

      <div className="ds-sub">Star Rating (Stars)</div>
      <div className="ds-box preview-dark">
        <div className="ds-row">
          {[1,2,3,4,5].map(v => <P key={v} label={v + " stars"}><Stars value={v} size={16} /></P>)}
          <P label="RatingChip"><RatingChip value={4.8} count={126} /></P>
        </div>
      </div>

      <div className="ds-sub">Separators</div>
      <div className="ds-box preview-dark" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Sep />
        <div className="muted" style={{ fontSize: 13 }}>Content between separators</div>
        <Sep />
      </div>

      <div className="ds-sub">Icon Library — Material Design (filled, currentColor)</div>
      <div className="ds-box preview-dark" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px,1fr))', gap: 16 }}>
        {Object.keys(Icons).map(name => {
          const I = Icons[name];
          return (
            <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <I size={22} style={{ color: 'var(--muted)' }} />
              <span style={{ fontSize: 11, color: 'var(--dim)', fontFamily: 'monospace' }}>{name}</span>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* ============================================================
   MOLECULES
   ============================================================ */
function MoleculesSection() {
  return (
    <Section id="molecules" title="Molecules">

      <div className="ds-sub">InfoBanner (all variants)</div>
      <div className="ds-box preview-dark" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <InfoBanner variant="info" icon="Info">Your flight is being tracked — pickup time will adjust automatically.</InfoBanner>
        <InfoBanner variant="success" icon="Shield">Your booking is protected · Free cancellation within 48h</InfoBanner>
        <InfoBanner variant="warn" icon="Info">15% cancellation fee applies within 48h of pickup.</InfoBanner>
        <InfoBanner variant="danger" icon="Info">Please enter your booking reference and email address.</InfoBanner>
      </div>

      <div className="ds-sub">MetaRow</div>
      <div className="ds-box preview-dark" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div><Label>size=md</Label><MetaRow author="Sigríður Björnsdóttir" role="Local guide & travel writer" date="June 3, 2026" readTime="11 min read" /></div>
        <div><Label>size=sm</Label><MetaRow author="Anna Halldórsdóttir" date="May 12, 2026" readTime="3 min read" size="sm" /></div>
      </div>

      <div className="ds-sub">SectionHdr</div>
      <div className="ds-box preview-dark">
        <SectionHdr title="Popular this season" subtitle="Compare from top local providers." action="View all cars" onAction={() => {}} />
      </div>

      <div className="ds-sub">SpecRow (Car Specs Grid)</div>
      <div className="ds-box preview-dark" style={{ maxWidth: 480 }}>
        <SpecRow transmission="Auto" seats={5} bags={3} drive="4WD" />
      </div>

      <div className="ds-sub">PriceTag</div>
      <div className="ds-box preview-dark">
        <div className="ds-row">
          <P label="size=sm"><PriceTag amount={67} size="sm" /></P>
          <P label="size=md"><PriceTag amount={89} size="md" /></P>
          <P label="size=lg"><PriceTag amount={119} size="lg" /></P>
          <P label="size=xl"><PriceTag amount={189} size="xl" /></P>
          <P label="with total"><PriceTag amount={89} total={445} days={5} size="lg" /></P>
          <P label="with ISK sub"><PriceTag amount={89} unit="/day" total={445} days={5} sub="≈ 66,305 ISK" size="lg" /></P>
        </div>
      </div>

      <div className="ds-sub">InclList</div>
      <div className="ds-box preview-dark" style={{ maxWidth: 420 }}>
        <InclList items={["CDW — Collision Damage Waiver", "Third Party Liability (TPL)", "Unlimited Mileage", "Free Cancellation (48h)"]} />
      </div>

      <div className="ds-sub">FreeCancBadge</div>
      <div className="ds-box preview-dark">
        <div className="ds-row">
          <P label="compact (badge)"><FreeCancBadge compact /></P>
          <P label="full (inline)"><FreeCancBadge /></P>
        </div>
      </div>

      <div className="ds-sub">Stepper</div>
      <div className="ds-box preview-dark">
        <div className="ds-row">
          <P label="qty=0"><Stepper value={0} min={0} max={4} onChange={() => {}} /></P>
          <P label="qty=2"><Stepper value={2} min={0} max={4} onChange={() => {}} /></P>
          <P label="at max"><Stepper value={4} min={0} max={4} onChange={() => {}} /></P>
        </div>
      </div>
    </Section>
  );
}

/* ============================================================
   ORGANISMS
   ============================================================ */
function OrganismsSection() {
  const car = CARS[1]; // RAV4
  const extra = EXTRAS[0]; // GPS

  return (
    <Section id="organisms" title="Organisms">

      <div className="ds-sub">CarCardV2</div>
      <div className="ds-box preview-dark" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
        {CARS.slice(0,3).map(c => <CarCardV2 key={c.id} car={c} days={5} onPick={() => {}} />)}
      </div>

      <div className="ds-sub">ExtraCardV2</div>
      <div className="ds-box preview-dark" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        {EXTRAS.slice(0,4).map(e => <ExtraCardV2 key={e.id} extra={e} qty={e.id === 'gps' ? 1 : 0} onChange={() => {}} />)}
      </div>

      <div className="ds-sub">BlogCardV2 — grid variant</div>
      <div className="ds-box preview-dark" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
        {(typeof BLOG_POSTS !== 'undefined' ? BLOG_POSTS.slice(0,3) : []).map(p => (
          <BlogCardV2 key={p.id} post={p} onClick={() => {}} variant="grid" />
        ))}
      </div>

      <div className="ds-sub">BlogCardV2 — list variant</div>
      <div className="ds-box preview-dark" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {(typeof BLOG_POSTS !== 'undefined' ? BLOG_POSTS.slice(0,2) : []).map(p => (
          <BlogCardV2 key={p.id} post={p} onClick={() => {}} variant="list" />
        ))}
      </div>

      <div className="ds-sub">ManageActionCard</div>
      <div className="ds-box preview-dark" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <ManageActionCard icon="Calendar" title="Change dates" desc="Pick new pickup or return dates." color="var(--primary-tint)" textColor="var(--primary-strong)" onClick={() => {}} />
        <ManageActionCard icon="Pin" title="Change location" desc="Update pickup or dropoff point." color="var(--primary-tint)" textColor="var(--primary-strong)" onClick={() => {}} />
        <ManageActionCard icon="Sparkle" title="Modify add-ons" desc="Add or remove GPS, seats, WiFi…" color="var(--primary-tint)" textColor="var(--primary-strong)" onClick={() => {}} />
        <ManageActionCard icon="X" title="Cancel booking" desc="Free — cancellation window open." color="rgba(239,68,68,0.1)" textColor="var(--danger)" danger onClick={() => {}} />
      </div>

      <div className="ds-sub">EmptyState</div>
      <div className="ds-box preview-dark">
        <EmptyState icon="Search" title="No cars match your filters" desc="Try widening your price range or clearing some filters." />
      </div>

      <div className="ds-sub">PriceSummaryCard</div>
      <div className="ds-box preview-dark" style={{ maxWidth: 360 }}>
        <PriceSummaryCard car={car} days={5} qty={{ gps: 1, wifi: 1 }} cta="Continue" onCta={() => {}} />
      </div>
    </Section>
  );
}

/* ============================================================
   SCREEN INDEX
   ============================================================ */
function ScreenIndexSection() {
  const screens = [
    { id: 'A1', name: 'Homepage Search',      route: 'home',     desc: 'Search bar, hero, why-cards, popular cars, blog, guides' },
    { id: 'A2', name: 'Search Results',       route: 'results',  desc: 'Filter sidebar, sort, category chips, car grid, pagination' },
    { id: 'A3', name: 'Car Detail',           route: 'detail',   desc: 'Gallery, spec grid, inclusions, tabs, price summary sidebar' },
    { id: 'A5', name: 'Add-ons / Extras',     route: 'extras',   desc: 'Extra cards with steppers, live price update, included items' },
    { id: 'A6', name: 'Checkout',             route: 'checkout', desc: 'Driver form, payment options, card details, terms' },
    { id: 'A7', name: 'Booking Confirmation', route: 'confirm',  desc: 'Confirmation hero, trip details, next steps, voucher CTA' },
    { id: 'MB', name: 'Manage Booking',       route: 'manage',   desc: 'Guest lookup, booking found, change dates/location/extras, cancel' },
    { id: 'BL', name: 'Blog List',            route: 'blog',     desc: 'Category filter, featured post, grid of articles' },
    { id: 'BP', name: 'Blog Post',            route: 'post',     desc: 'Reading progress, hero, 2-col article+sidebar, mid-CTA, mobile bar' },
  ];
  return (
    <Section id="screens" title="Screen Index — Figma Naming Convention">
      <div className="ds-sub">All screens with Figma IDs</div>
      <div className="ds-box">
        <table className="spec-table">
          <thead><tr><th>Figma ID</th><th>Screen Name</th><th>Route</th><th>Component</th><th>Key Components Used</th></tr></thead>
          <tbody>
            {screens.map(s => (
              <tr key={s.id}>
                <td><span className="badge badge-soft" style={{ fontSize: 12 }}>{s.id}</span></td>
                <td style={{ fontWeight: 600 }}>{s.name}</td>
                <td><code>{s.route}</code></td>
                <td><code>{(typeof SCREEN_REGISTRY !== 'undefined' && SCREEN_REGISTRY[s.route]?.component) || s.route + 'Screen'}</code></td>
                <td className="muted" style={{ fontSize: 12.5 }}>{s.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="ds-sub">Quick Navigation</div>
      <div className="ds-box">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {screens.map(s => (
            <a key={s.id} className="ds-screen-chip" href="Iceland Express.html" onClick={e => { e.preventDefault(); window.open('Iceland Express.html', '_blank'); }}>
              <span className="chip-id">{s.id}</span>
              {s.name}
            </a>
          ))}
        </div>
      </div>

      <div className="ds-sub">Component Hierarchy Summary</div>
      <div className="ds-box">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          {[
            { tier: 'Atoms', color: 'var(--primary-tint)', border: 'var(--primary)', items: ['Btn', 'BtnIcon', 'Bdg', 'Chp', 'Fld', 'SelFld', 'TxtArea', 'Chk', 'Avtr', 'Sep', 'Ico'] },
            { tier: 'Molecules', color: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.3)', items: ['FormField', 'InputGroup', 'SearchInput', 'SpecRow', 'PriceTag', 'MetaRow', 'SectionHdr', 'InclList', 'InfoBanner', 'RatingChip', 'FreeCancBadge'] },
            { tier: 'Organisms', color: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.25)', items: ['CarCardV2', 'ExtraCardV2', 'BlogCardV2', 'ManageActionCard', 'PriceSummaryCard', 'PageHero', 'EmptyState', 'NavBar', 'Footer', 'SearchBar', 'TripBar'] },
          ].map(({ tier, color, border, items }) => (
            <div key={tier} style={{ background: color, border: `1px solid ${border}`, borderRadius: 'var(--r-md)', padding: 16 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 12 }}>{tier}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {items.map(i => <code key={i} style={{ fontSize: 11, background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: 4, color: 'var(--muted)' }}>{i}</code>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ============================================================
   APP
   ============================================================ */
function DSApp() {
  return (
    <div className="ds-page">
      <DSNav />
      <div className="ds-main">
      <div style={{ padding: '52px 40px 40px', borderBottom: '1px solid var(--border)', background: 'radial-gradient(80% 60% at 80% 0%, rgba(6,182,212,0.09), transparent 60%)' }}>
        <div style={{ maxWidth: 1100 }}>
          <div className="pill" style={{ marginBottom: 16 }}><Icons.Sparkle size={14} /> Iceland Express</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 10px' }}>Design System Reference</h1>
          <p className="muted" style={{ fontSize: 17, maxWidth: 560, lineHeight: 1.55 }}>Atoms → Molecules → Organisms. Every component, token, variant and state — audited against the Figma design file.</p>
          <div className="row center gap10" style={{ marginTop: 20, flexWrap: 'wrap' }}>
            <Bdg variant="soft">Outfit + DM Sans</Bdg>
            <Bdg variant="soft">#050610 dark base</Bdg>
            <Bdg variant="soft">#06B6D4 cyan primary</Bdg>
            <Bdg variant="success"><Icons.Check size={12} /> Figma-aligned</Bdg>
          </div>
        </div>
      </div>
      <FoundationsSection />
      <ButtonSection />
      <InputSection />
      <BadgeSection />
      <MiscSection />
      <MoleculesSection />
      <OrganismsSection />
      <AnimationsSection />
      <ScreenIndexSection />
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<DSApp />);
