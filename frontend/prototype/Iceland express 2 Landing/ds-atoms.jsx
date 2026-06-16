// ds-atoms.jsx
// ─────────────────────────────────────────────────────────────
// Iceland Express DS — Atoms
// Smallest indivisible UI pieces. All inline styles reference T.*
// ─────────────────────────────────────────────────────────────

/* ── Btn ──────────────────────────────────────────────────────
 * variant : primary | secondary | ghost | outline | danger | success | link
 * size    : xs | sm | md | lg | xl
 * Anatomy : [Icon?] [label] [IconEnd?]
 */
function Btn({ variant = 'primary', size = 'md', icon: Icon, iconEnd: IconEnd, block, disabled, loading, children, onClick, style, type }) {
  const sizeKeys = { xs: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' };
  const s = sizeKeys[size] || 'md';
  const szSuffix = s === 'md' ? '' : ` btn-${s}`;
  const cls = `btn btn-${variant}${szSuffix}${block ? ' btn-block' : ''}${loading ? ' loading' : ''}`;
  const iconSz = T.btn.iconSize[s];
  return (
    <button className={cls} disabled={disabled || loading} onClick={onClick} style={style} type={type || 'button'}>
      {Icon && !loading && <Icon size={iconSz} />}
      {children}
      {IconEnd && !loading && <IconEnd size={iconSz} />}
    </button>
  );
}

/* ── BtnIcon ──────────────────────────────────────────────────
 * Icon-only button. Same variants and sizes as Btn.
 */
function BtnIcon({ variant = 'ghost', size = 'md', icon: Icon, disabled, onClick, style, title }) {
  const sizeKeys = { xs: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' };
  const s = sizeKeys[size] || 'md';
  const szSuffix = s === 'md' ? '' : ` btn-${s}`;
  const iconSz = { xs: 13, sm: 15, md: 18, lg: 21, xl: 24 }[s];
  return (
    <button
      className={`btn btn-${variant} btn-icon${szSuffix}`}
      disabled={disabled}
      onClick={onClick}
      style={style}
      title={title}
      type="button"
    >
      {Icon && <Icon size={iconSz} />}
    </button>
  );
}

/* ── Bdg ──────────────────────────────────────────────────────
 * variant : primary | soft | success | amber | outline | glass
 * Tokens  : T.badge.variant[variant]
 */
function Bdg({ variant = 'soft', icon: Icon, children, style }) {
  return (
    <span className={`badge badge-${variant}`} style={style}>
      {Icon && <Icon size={T.badge.gap + 6} />}
      {children}
    </span>
  );
}

/* ── Chp ──────────────────────────────────────────────────────
 * Filter / sort chip. active state uses T.chip.active tokens.
 */
function Chp({ active, children, onClick, style }) {
  return (
    <button
      className={'chip' + (active ? ' active' : '')}
      onClick={onClick}
      style={style}
      type="button"
    >
      {children}
    </button>
  );
}

/* ── Fld ──────────────────────────────────────────────────────
 * Base text input atom. Tokens: T.input.*
 * status: '' | 'error' | 'success' | 'disabled'
 */
function Fld({ type = 'text', placeholder, value, onChange, required, maxLength, style, autoFocus, readOnly, status, name }) {
  const statusCls = status === 'error' ? ' is-error' : status === 'success' ? ' is-success' : '';
  return (
    <input
      className={`input${statusCls}`}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      maxLength={maxLength}
      style={style}
      autoFocus={autoFocus}
      readOnly={readOnly}
      disabled={status === 'disabled'}
      name={name}
    />
  );
}

/* ── SelFld ───────────────────────────────────────────────────
 * Select input atom.
 */
function SelFld({ value, onChange, children, style, status }) {
  const statusCls = status === 'error' ? ' is-error' : status === 'success' ? ' is-success' : '';
  return (
    <select
      className={`input selectbox${statusCls}`}
      value={value}
      onChange={onChange}
      style={style}
      disabled={status === 'disabled'}
    >
      {children}
    </select>
  );
}

/* ── TxtArea ─────────────────────────────────────────────────
 * Textarea input atom.
 */
function TxtArea({ placeholder, value, onChange, rows = 3, style, status }) {
  const statusCls = status === 'error' ? ' is-error' : '';
  return (
    <textarea
      className={`input${statusCls}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{ height: rows * 28 + 14, paddingTop: 14, resize: 'vertical', ...style }}
    />
  );
}

/* ── Chk ─────────────────────────────────────────────────────
 * Checkbox atom with inline label.
 * Tokens: T.primary (checked bg), T.primaryFg (check icon)
 */
function Chk({ checked, onChange, children }) {
  return (
    <div className="filter-check" onClick={onChange} style={{ cursor: 'pointer' }}>
      <span
        className={'checkbox' + (checked ? ' on' : '')}
        style={{
          background: checked ? T.primary : T.inner,
          borderColor: checked ? T.primary : T.border,
        }}
      >
        {checked && <Icons.Check size={13} style={{ color: T.primaryFg }} />}
      </span>
      {children}
    </div>
  );
}

/* ── Avtr ─────────────────────────────────────────────────────
 * Letter avatar atom.
 * Tokens: T.avatar.*
 */
function Avtr({ name, size = 38, style }) {
  return (
    <div style={{
      width:       size,
      height:      size,
      borderRadius: '50%',
      background:  T.avatar.bg,
      color:       T.avatar.color,
      display:     'grid',
      placeItems:  'center',
      fontFamily:  T.avatar.fontFamily,
      fontWeight:  T.avatar.fontWeight,
      fontSize:    Math.round(size * 0.38),
      flexShrink:  0,
      ...style,
    }}>
      {name ? name[0].toUpperCase() : '?'}
    </div>
  );
}

/* ── Sep ─────────────────────────────────────────────────────
 * Horizontal separator. Tokens: T.border
 */
function Sep({ style }) {
  return <hr className="divider" style={style} />;
}

/* ── Ico ─────────────────────────────────────────────────────
 * Named icon atom. Resolves name → Icons[name].
 */
function Ico({ name, size = 20, color, style }) {
  const IconC = Icons[name];
  if (!IconC) return null;
  return <IconC size={size} style={{ color: color || 'currentColor', ...style }} />;
}

/* ── Txt ─────────────────────────────────────────────────────
 * Typed text atom. Maps size → T scale classes.
 * as: any HTML tag ('p','span','h1'…)
 * size: 'xs'|'sm'|'md'|'lg'|'xl'|'2xl'|'3xl'|'4xl'|'5xl'|'6xl'
 * weight: 400|500|600|700
 * color: 'fg'|'muted'|'dim'|'primary'|'success'|'warn'|'danger'
 */
function Txt({ as: Tag = 'span', size = 'md', weight = 400, color = 'muted', display, children, style }) {
  const colorMap = {
    fg:      T.fg,
    muted:   T.muted,
    dim:     T.dim,
    primary: T.primary,
    strong:  T.primaryStrong,
    success: T.success,
    warn:    T.warn,
    danger:  T.danger,
  };
  return (
    <Tag
      className={`t-${size}`}
      style={{
        fontWeight: weight,
        color: colorMap[color] || color,
        fontFamily: display ? T.fontDisplay : T.fontBody,
        margin: 0,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

Object.assign(window, {
  // Atoms
  Btn, BtnIcon, Bdg, Chp, Fld, SelFld, TxtArea, Chk, Avtr, Sep, Ico, Txt,
});
