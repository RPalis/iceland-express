// ds-molecules.jsx
// ─────────────────────────────────────────────────────────────
// Iceland Express DS — Molecules
// Compositions of atoms. All inline styles reference T.*
// ─────────────────────────────────────────────────────────────

/* ── InputGroup ───────────────────────────────────────────────
 * Wraps any input with optional icon prefix / suffix.
 * Tokens: T.input.*
 * status: '' | 'error' | 'success' | 'disabled'
 */
function InputGroup({ iconPre: IconPre, iconSuf: IconSuf, onSufClick, status, placeholder, value, onChange, type = 'text', maxLength, required, style, name }) {
  const statusCls = status === 'error' ? ' is-error' : status === 'success' ? ' is-success' : '';
  return (
    <div className="input-group" style={style}>
      {IconPre && (
        <span className="input-icon-pre">
          <IconPre size={16} style={{ color: T.dim }} />
        </span>
      )}
      <input
        className={`input${IconPre ? ' input-pre' : ''}${IconSuf ? ' input-suf' : ''}${statusCls}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        required={required}
        disabled={status === 'disabled'}
        name={name}
      />
      {IconSuf && (
        <span className="input-icon-suf" onClick={onSufClick} style={{ color: T.dim }}>
          <IconSuf size={15} />
        </span>
      )}
    </div>
  );
}

/* ── SearchInput ──────────────────────────────────────────────
 * Search field preset — InputGroup with Search icon prefix.
 */
function SearchInput({ value, onChange, placeholder = 'Search…', onClear, style }) {
  return (
    <InputGroup
      iconPre={Icons.Search}
      iconSuf={value && onClear ? Icons.X : null}
      onSufClick={onClear}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={style}
    />
  );
}

/* ── FormField ────────────────────────────────────────────────
 * Label + input slot + optional helper / error text.
 * Tokens: T.input.state.error/success
 */
function FormField({ label, helper, error, required, span, children }) {
  return (
    <div className={span ? 'span2' : undefined}>
      {label && (
        <label className="field-label">
          {label}
          {required && <span style={{ color: T.danger, marginLeft: 2 }}>*</span>}
        </label>
      )}
      {children}
      {error && <p className="field-error">{error}</p>}
      {helper && !error && <p className="field-helper">{helper}</p>}
    </div>
  );
}

/* ── SpecCell ────────────────────────────────────────────────
 * Single icon + label cell — used inside SpecRow.
 * Tokens: T.specCell.*
 */
function SpecCell({ iconName, label }) {
  return (
    <div className="spec-cell">
      <Ico name={iconName} size={T.specCell.iconSize} style={{ color: T.dim }} />
      <span style={{ fontSize: T.specCell.fontSize, color: T.specCell.color }}>{label}</span>
    </div>
  );
}

/* ── SpecRow ─────────────────────────────────────────────────
 * 4-cell car spec grid molecule.
 * Tokens: T.specCell.*
 */
function SpecRow({ transmission, seats, bags, drive, style }) {
  return (
    <div className="spec-row" style={style}>
      <SpecCell iconName="Gear"  label={transmission} />
      <SpecCell iconName="Bag"   label={bags + ' Bags'} />
      <SpecCell iconName="Users" label={seats + ' Seats'} />
      <SpecCell iconName="Drive" label={drive} />
    </div>
  );
}

/* ── PriceTag ────────────────────────────────────────────────
 * Price display: amount + unit + optional total line + sub.
 * Tokens: T.primaryStrong, T.muted, T.dim
 * size: 'sm' | 'md' | 'lg' | 'xl'
 */
function PriceTag({ amount, unit = '/day', total, days, sub, size = 'lg' }) {
  const fsSz = { sm: 20, md: 22, lg: 26, xl: 34 }[size] || 26;
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span className="price-amt" style={{ fontSize: fsSz }}>{eur(amount)}</span>
        {unit && <span style={{ fontSize: 14, color: T.muted }}>{unit}</span>}
      </div>
      {total && (
        <div className="price-eur">
          {eur(total)} total{days ? ` · ${days} days` : ''}
        </div>
      )}
      {sub && <div style={{ fontSize: 12, color: T.dim }}>{sub}</div>}
    </div>
  );
}

/* ── MetaRow ────────────────────────────────────────────────
 * Author avatar + name + optional role + date + readTime.
 * Tokens: T.avatar.*, T.dim
 * size: 'sm' | 'md'
 */
function MetaRow({ author, role, date, readTime, size = 'md' }) {
  const avatarSz = size === 'sm' ? 28 : 38;
  const nameFz   = size === 'sm' ? 13 : 14;
  const metaFz   = size === 'sm' ? 12 : 13;
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
      {author && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Avtr name={author} size={avatarSz} />
          <div>
            <div style={{ fontWeight: 600, fontSize: nameFz, color: T.fg }}>{author}</div>
            {role && <div style={{ fontSize: metaFz - 1, color: T.dim }}>{role}</div>}
          </div>
        </div>
      )}
      {(date || readTime) && <span style={{ color: T.dim }}>·</span>}
      {date && <span style={{ fontSize: metaFz, color: T.dim }}>{date}</span>}
      {readTime && (
        <>
          <span style={{ color: T.dim }}>·</span>
          <span style={{ fontSize: metaFz, color: T.dim, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Ico name="Clock" size={13} />{readTime}
          </span>
        </>
      )}
    </div>
  );
}

/* ── SectionHdr ─────────────────────────────────────────────
 * Section title + optional subtitle + optional "view all" link.
 * Tokens: T.muted, T.primaryStrong
 */
function SectionHdr({ title, subtitle, action, onAction, style }) {
  return (
    <div
      style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        flexWrap: 'wrap', gap: 10, marginBottom: 24, ...style,
      }}
    >
      <div>
        <h2 className="h1" style={{ fontSize: 26 }}>{title}</h2>
        {subtitle && (
          <p style={{ color: T.muted, fontSize: 14, marginTop: 4, margin: '4px 0 0' }}>{subtitle}</p>
        )}
      </div>
      {action && (
        <div
          className="link"
          onClick={onAction}
          style={{ fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}
        >
          {action} <Ico name="ArrowR" size={14} />
        </div>
      )}
    </div>
  );
}

/* ── InclList ────────────────────────────────────────────────
 * Checkmark list molecule.
 * Tokens: T.success (default icon color)
 */
function InclList({ items, iconName = 'Check', iconColor }) {
  const color = iconColor || T.success;
  return (
    <div className="incl-list">
      {items.map((it) => (
        <div key={it} className="incl-item">
          <span style={{ color, flexShrink: 0 }}>
            <Ico name={iconName} size={16} style={{ color }} />
          </span>
          {it}
        </div>
      ))}
    </div>
  );
}

/* ── InfoBanner ──────────────────────────────────────────────
 * Contextual info / warning / success / danger banner.
 * Tokens: T.status[variant]
 * variant: 'info' | 'success' | 'warn' | 'danger'
 */
function InfoBanner({ variant = 'info', icon = 'Info', style, children }) {
  const c = T.status[variant] || T.status.info;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      background: c.bg,
      border: `1px solid ${c.border}`,
      borderRadius: T.rSm,
      padding: '12px 14px',
      fontSize: 14,
      ...style,
    }}>
      <Ico name={icon} size={16} style={{ color: c.icon, flexShrink: 0 }} />
      <span style={{ color: T.muted }}>{children}</span>
    </div>
  );
}

/* ── RatingChip ─────────────────────────────────────────────
 * Stars + numeric score + optional review count.
 * Tokens: T.warn (stars), T.muted (count)
 */
function RatingChip({ value, count, size = 'md' }) {
  const fs = size === 'sm' ? 13 : 14;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <Stars value={value} size={fs} />
      <span style={{ fontWeight: 700, fontSize: fs, color: T.fg }}>{value}</span>
      {count && (
        <span style={{ color: T.muted, fontSize: fs - 1 }}>({count} reviews)</span>
      )}
    </div>
  );
}

/* ── FreeCancBadge ──────────────────────────────────────────
 * Key conversion signal — "Free Cancellation" in badge or inline form.
 * Tokens: T.success, T.badge.variant.success
 */
function FreeCancBadge({ compact }) {
  return compact ? (
    <Bdg variant="success" icon={Icons.Shield}>Free cancellation</Bdg>
  ) : (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: T.success, fontSize: 13, fontWeight: 600 }}>
      <Ico name="Shield" size={15} style={{ color: T.success }} />
      Free cancellation · 48h window
    </div>
  );
}

/* ── Tab ─────────────────────────────────────────────────────
 * Pill tab row — e.g. A6 payment methods (Card / PayPal / Apple Pay / Google Pay).
 * Figma: Components page `Tab` component set (method × selected).
 * Atoms used  : Ico
 * Tokens      : T.primary, T.muted, T.fg
 */
function Tab({ items, active, onChange, style }) {
  return (
    <div role="tablist" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', ...style }}>
      {items.map((it) => {
        const on = it.id === active;
        return (
          <button
            key={it.id}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange && onChange(it.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '9px 16px', cursor: 'pointer',
              fontSize: 13, fontWeight: 600,
              color: on ? T.primary : T.muted,
              background: on ? 'var(--primary-tint)' : 'var(--inner)',
              border: `1px solid ${on ? 'var(--primary)' : 'var(--border)'}`,
              borderRadius: 'var(--r-pill)',
              fontFamily: 'inherit',
            }}
          >
            {it.icon && <Ico name={it.icon} size={15} style={{ color: on ? T.primary : T.dim }} />}
            {it.label}
          </button>
        );
      })}
    </div>
  );
}

/* ── AiPreviewInput — platform landing AI teaser (Figma 974:10165) ── */
function AiPreviewInput({ placeholder, searchIcon, sendIcon, onSubmit }) {
  const [value, setValue] = React.useState('');
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit?.(value.trim());
  }
  return (
    <form className="ai-preview-input" onSubmit={handleSubmit} id="ai">
      <img className="ai-preview-input-icon" src={searchIcon} alt="" />
      <input
        className="ai-preview-input-field"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label="Ask your AI Iceland travel expert"
      />
      <button type="submit" className="ai-preview-send" aria-label="Send question">
        <img src={sendIcon} alt="" />
      </button>
    </form>
  );
}

Object.assign(window, {
  // Molecules
  InputGroup, SearchInput, FormField,
  SpecCell, SpecRow,
  PriceTag, MetaRow, SectionHdr,
  InclList, InfoBanner, RatingChip, FreeCancBadge, Tab, AiPreviewInput,
});
