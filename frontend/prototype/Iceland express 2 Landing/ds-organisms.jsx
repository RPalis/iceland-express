// ds-organisms.jsx
// ─────────────────────────────────────────────────────────────
// Iceland Express DS — Organisms
// Self-contained, complex UI components built from atoms + molecules.
// All inline styles reference T.*
// ─────────────────────────────────────────────────────────────

/* ── CarCardV2 ───────────────────────────────────────────────
 * Full car listing card.
 * Atoms used  : Bdg, BtnIcon, Ico, Avtr
 * Molecules   : SpecRow, PriceTag, RatingChip, FreeCancBadge
 * Tokens      : T.card.*, T.primary, T.muted
 */
function CarCardV2({ car, days, onPick, onDetail }) {
  const [fav, setFav] = React.useState(false);
  return (
    <div className="carcard fade-up">
      {/* Media */}
      <div className="carcard-media">
        <img src={car.img} alt={car.name} />
        {car.tag && (
          <span className="carcard-tag">
            <Bdg variant={(TAG_STYLE[car.tag] || 'badge-soft').replace('badge-', '')}>
              <Ico name="Sparkle" size={12} /> {car.tag}
            </Bdg>
          </span>
        )}
        <button
          className="carcard-fav"
          onClick={(e) => { e.stopPropagation(); setFav(!fav); }}
          style={{ color: fav ? T.danger : T.fg }}
          type="button"
          aria-label="Save car"
          aria-pressed={fav}
        >
          {fav ? <Icons.Heart size={18} /> : <Icons.HeartOutline size={18} />}
        </button>
      </div>

      {/* Body */}
      <div className="carcard-body">
        <FreeCancBadge compact={false} />
        <Txt size="xs" color="muted" style={{ marginTop: 2 }}>{car.catLabel} · {car.provider}</Txt>

        <h3 className="h3" style={{ marginTop: 6, fontSize: 18 }}>{car.name}</h3>
        <Txt size="sm" color="muted">{car.similar}</Txt>

        <SpecRow
          transmission={car.transmission}
          seats={car.seats}
          bags={car.bags}
          drive={car.drive}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto' }}>
          <PriceTag amount={car.perDay} total={car.perDay * days} days={days} size="md" />
          <RatingChip value={car.rating} />
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          <Btn variant="ghost" size="sm" icon={Icons.Info} block onClick={onDetail || onPick}>Details</Btn>
          <Btn variant="primary" size="sm" iconEnd={Icons.ArrowR} block onClick={onPick}>Book Now</Btn>
        </div>
      </div>
    </div>
  );
}

/* ── ExtraCardV2 ─────────────────────────────────────────────
 * Add-on / extra card with quantity stepper.
 * Atoms used  : Ico
 * Molecules   : PriceTag, Stepper
 * Tokens      : T.card.*, T.primary, T.primaryTint
 */
function ExtraCardV2({ extra, qty, onChange }) {
  const I = Icons[extra.icon];
  return (
    <div
      className={'extra-card' + (qty > 0 ? ' has-qty' : '')}
      style={{ borderColor: qty > 0 ? T.primary : T.border }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span
          style={{
            width: 42, height: 42,
            display: 'grid', placeItems: 'center',
            background: T.primaryTint,
            color: T.primaryStrong,
            borderRadius: T.rMd,
          }}
        >
          <I size={20} />
        </span>
        <PriceTag amount={extra.price} unit="/day" size="sm" />
      </div>

      <div>
        <h3 className="h3" style={{ fontSize: 16 }}>{extra.name}</h3>
        <Txt size="sm" color="muted" style={{ marginTop: 4 }}>{extra.desc}</Txt>
      </div>

      <Stepper value={qty} max={extra.max} onChange={onChange} />
    </div>
  );
}

/* ── BlogCardV2 ──────────────────────────────────────────────
 * Blog post card.
 * variant: 'grid' | 'list'
 * Atoms used  : Bdg
 * Molecules   : MetaRow
 * Tokens      : T.card.*, T.inner, T.muted
 */
function BlogCardV2({ post, onClick, variant = 'grid' }) {
  if (variant === 'list') {
    return (
      <div
        className="card row gap16 hover-lift"
        style={{ padding: 16, cursor: 'pointer', alignItems: 'flex-start' }}
        onClick={onClick}
      >
        <div
          className="blog-side-img"
          style={{ flex: 'none', background: T.inner }}
        >
          <image-slot
            id={'blogcard-' + post.heroSlot}
            style={{ width: '100%', height: '100%' }}
            shape="rect"
            placeholder="Photo"
          ></image-slot>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <Bdg variant="soft">{post.cat}</Bdg>
            <Txt size="xs" color="dim">{post.date} · {post.readTime}</Txt>
          </div>
          <h3 className="h3" style={{ fontSize: 15.5, lineHeight: 1.3 }}>{post.title}</h3>
          <Txt size="sm" color="muted" style={{ lineHeight: 1.5 }}>{post.excerpt}</Txt>
        </div>
      </div>
    );
  }

  return (
    <div
      className="card hover-lift"
      style={{ overflow: 'hidden', cursor: 'pointer', padding: 0 }}
      onClick={onClick}
    >
      <div style={{ height: 200, background: T.inner, position: 'relative', overflow: 'hidden' }}>
        <image-slot
          id={'blogcard-' + post.heroSlot}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          shape="rect"
          placeholder={post.heroPlaceholder}
        ></image-slot>
        <span className="guide-cat"><Bdg variant="glass">{post.cat}</Bdg></span>
      </div>
      <div style={{ padding: '20px 20px 18px' }}>
        <MetaRow author={post.author} date={post.date} size="sm" />
        <h3 className="h3" style={{ fontSize: 18, lineHeight: 1.3, marginTop: 10 }}>{post.title}</h3>
        <Txt size="sm" color="muted" style={{ lineHeight: 1.55, marginTop: 8 }}>{post.excerpt}</Txt>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
          <Txt size="xs" color="dim">{post.readTime}</Txt>
          <span className="link" style={{ fontSize: 13 }}>
            Read <Ico name="ArrowR" size={13} />
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── ManageActionCard ────────────────────────────────────────
 * Clickable action row used in the Manage Booking screen.
 * Atoms used  : Ico
 * Tokens      : T.card.*, T.danger (danger variant)
 */
function ManageActionCard({ icon, title, desc, color, textColor, danger, onClick }) {
  const I = Icons[icon];
  return (
    <div
      className={'card hover-lift' + (danger ? ' hover-danger' : ' hover-primary')}
      style={{ padding: '16px 18px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14 }}
      onClick={onClick}
    >
      <span style={{
        width: 42, height: 42,
        display: 'grid', placeItems: 'center',
        borderRadius: T.rSm,
        background: color,
        color: textColor,
        flexShrink: 0,
      }}>
        <I size={20} />
      </span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: danger ? T.danger : T.fg }}>{title}</div>
        <Txt size="sm" color="muted">{desc}</Txt>
      </div>
      <Ico name="ChevronR" size={18} style={{ color: T.dim, flexShrink: 0 }} />
    </div>
  );
}

/* ── PageHero ───────────────────────────────────────────────
 * Full-bleed hero section with image slot + gradient overlay.
 * Tokens      : T.inner, T.bgGrad (overlay)
 */
function PageHero({ slot, placeholder, minHeight = 480, children }) {
  return (
    <div style={{
      position: 'relative',
      minHeight,
      display: 'flex',
      alignItems: 'flex-end',
      overflow: 'hidden',
      background: T.inner,
    }}>
      <image-slot
        id={slot}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        shape="rect"
        placeholder={placeholder}
      ></image-slot>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(5,6,16,0.97) 20%, rgba(5,6,16,0.5) 60%, rgba(5,6,16,0.15) 100%)',
        zIndex: 1,
      }}></div>
      <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        {children}
      </div>
    </div>
  );
}

/* ── EmptyState ─────────────────────────────────────────────
 * No-results / empty content organism.
 * Atoms used  : Ico, Btn
 * Tokens      : T.card.*, T.dim, T.muted
 */
function EmptyState({ icon = 'Search', title, desc, action, onAction }) {
  return (
    <div className="card card-pad" style={{ textAlign: 'center', padding: 60 }}>
      <Ico
        name={icon}
        size={32}
        style={{ color: T.dim, display: 'block', margin: '0 auto 14px' }}
      />
      <h3 className="h3">{title}</h3>
      {desc && <p style={{ color: T.muted, marginTop: 8, fontSize: 14 }}>{desc}</p>}
      {action && (
        <Btn variant="primary" style={{ marginTop: 20 }} onClick={onAction}>{action}</Btn>
      )}
    </div>
  );
}

/* ── PriceSummaryCard ────────────────────────────────────────
 * Full price breakdown sidebar card.
 * Atoms used  : Btn, Ico, Sep
 * Molecules   : PriceTag
 * Tokens      : T.card.*, T.muted, T.success, T.primaryStrong
 */
function PriceSummaryCard({ car, days, qty, cta, onCta, note, compact }) {
  const { base, total, lines } = computeTotals(car, days, qty);
  return (
    <div className="card card-pad fade-up">
      {!compact && (
        <>
          <h3 className="h2" style={{ marginBottom: 18 }}>Price Breakdown</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
            <div>
              <div style={{ fontWeight: 700, fontFamily: T.fontDisplay }}>{car.year} {car.name}</div>
              <Txt size="sm" color="muted">{days} day{days !== 1 ? 's' : ''} rental</Txt>
            </div>
          </div>
          <Sep style={{ margin: '16px 0' }} />
        </>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
          <span style={{ color: T.muted }}>{days} × {eur(car.perDay)}/day</span>
          <span style={{ fontWeight: 600 }}>{eur(base)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
          <span style={{ color: T.muted }}>Basic Protection</span>
          <span style={{ color: T.success, fontWeight: 600 }}>Included</span>
        </div>

        {lines.length > 0 && (
          <>
            <div className="eyebrow" style={{ marginTop: 8 }}>Add-ons</div>
            {lines.map((l) => (
              <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5 }}>
                <span style={{ color: T.muted }}>{l.qty > 1 ? l.qty + '× ' : ''}{l.name}</span>
                <span style={{ fontWeight: 600 }}>{eur(l.sum)}</span>
              </div>
            ))}
          </>
        )}
      </div>

      <Sep style={{ margin: '18px 0' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="h3">Total</span>
        <PriceTag
          amount={total}
          unit=""
          sub={'≈ ' + isk(total)}
          size="xl"
        />
      </div>

      {cta && (
        <Btn
          variant="primary"
          size="lg"
          block
          iconEnd={Icons.ArrowR}
          style={{ marginTop: 18 }}
          onClick={onCta}
        >
          {cta}
        </Btn>
      )}

      {note}

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 8, marginTop: 14, color: T.muted, fontSize: 13,
      }}>
        <Ico name="Lock" size={14} />
        No charge today · Free cancellation
      </div>
    </div>
  );
}

/* ============================================================
   NavBar — canonical global navigation (single source of truth)
   Frosted-glass pill · two-color wordmark · btn-primary CTA.
   Desktop (>960px): inline links · ≤960px: hamburger drawer.
   Styling: .nav / .nav-toggle / .nav-drawer — see styles.css
   ============================================================ */
const NAV_PLATFORM_ITEMS = window.NAV_PLATFORM_ITEMS || [
  { label: 'Book a car', route: 'home' },
  { label: 'Flights', href: '/#vertical-flights' },
  { label: 'Stays', href: '/#vertical-stays' },
  { label: 'Experiences', href: '/#vertical-experiences' },
  { label: 'Travel Guides', route: 'blog' },
  { label: 'Help', href: '/#ai' },
];
const NAV_DEFAULT_ITEMS = NAV_PLATFORM_ITEMS;

function NavBarLink({ item, go, className, role, onNavigate }) {
  const handleClick = (e) => {
    if (item.route && go) {
      e.preventDefault();
      go(item.route);
    }
    item.onClick?.(e);
    onNavigate?.();
  };

  if (item.href) {
    return (
      <a href={item.href} className={className} role={role} onClick={handleClick}>
        {item.label}
      </a>
    );
  }

  return (
    <button type="button" className={className} role={role} onClick={handleClick}>
      {item.label}
    </button>
  );
}

function NavBar({ go, items = NAV_PLATFORM_ITEMS, manageRoute = 'manage' }) {
  const [open, setOpen] = React.useState(false);
  const navRef = React.useRef(null);
  const toggleId = React.useId();
  const drawerId = React.useId();

  const close = React.useCallback(() => setOpen(false), []);

  React.useEffect(() => {
    const navEl = navRef.current;
    if (!navEl) return;

    const onScroll = () => navEl.classList.toggle('scrolled', scrollY > 50);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });

    const onKey = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);

    const onClick = (e) => {
      if (!navEl.contains(e.target)) close();
    };
    document.addEventListener('click', onClick);

    const mq = window.matchMedia('(min-width: 961px)');
    const onMq = (e) => { if (e.matches) close(); };
    mq.addEventListener('change', onMq);

    return () => {
      removeEventListener('scroll', onScroll);
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
      mq.removeEventListener('change', onMq);
    };
  }, [close]);

  return (
    <nav className={`nav${open ? ' is-open' : ''}`} ref={navRef} id="nav">
      <div className="shell nav-inner">
        <a className="logo" href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Iceland<span className="logo-accent">Express</span>
        </a>
        <div className="nav-links" aria-label="Primary navigation">
          {items.map((item) => (
            <NavBarLink key={item.label} item={item} go={go} onNavigate={close} />
          ))}
        </div>
        <div className="nav-spacer" />
        <button
          type="button"
          className="btn btn-primary btn-sm nav-cta"
          onClick={() => go && go(manageRoute)}
        >
          Manage Booking
        </button>
        <button
          type="button"
          className="nav-toggle"
          id={toggleId}
          aria-expanded={open}
          aria-controls={drawerId}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav-toggle-bars" aria-hidden="true">
            <span /><span /><span />
          </span>
        </button>
        <div className="nav-drawer" id={drawerId} role="menu" aria-label="Navigation menu">
          {items.map((item) => (
            <NavBarLink
              key={`drawer-${item.label}`}
              item={item}
              go={go}
              role="menuitem"
              onNavigate={close}
            />
          ))}
          <button
            type="button"
            role="menuitem"
            className="nav-drawer-cta"
            onClick={() => { close(); go && go(manageRoute); }}
          >
            Manage Booking
          </button>
        </div>
      </div>
    </nav>
  );
}

Object.assign(window, {
  NAV_PLATFORM_ITEMS,
  NAV_DEFAULT_ITEMS,
  NavBarLink,
  // Organisms
  CarCardV2, ExtraCardV2, BlogCardV2, ManageActionCard,
  PageHero, EmptyState, PriceSummaryCard, NavBar,
});
