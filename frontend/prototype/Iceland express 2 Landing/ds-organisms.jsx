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
                <span style={{ textAlign: 'right' }}>
                  <span style={{ fontWeight: 600 }}>{eur(l.sum)}</span>
                  <span style={{ display: 'block', color: T.dim, fontSize: 11.5 }}>{isk(l.sum)}</span>
                </span>
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

/* ── TrustBadges ─────────────────────────────────────────────
 * Trust-signal row — checkout / confirmation surfaces (Figma pattern).
 * Figma: Components page `TrustBadges` component.
 * Atoms used  : Ico
 * Tokens      : T.muted, T.success
 */
const TRUST_BADGE_SETS = {
  checkout: [
    { icon: 'Lock',   label: 'SSL Encrypted' },
    { icon: 'Shield', label: 'Free Cancellation 48h' },
    { icon: 'Check',  label: 'Secure Payment' },
  ],
  confirmation: [
    { icon: 'Check',  label: 'Booking Confirmed' },
    { icon: 'Lock',   label: 'SSL Encrypted' },
    { icon: 'Shield', label: '24/7 Support' },
  ],
};

function TrustBadges({ variant = 'checkout', style }) {
  const items = TRUST_BADGE_SETS[variant] || TRUST_BADGE_SETS.checkout;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: 24, flexWrap: 'wrap', ...style,
    }}>
      {items.map((b) => (
        <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 7, color: T.muted, fontSize: 13 }}>
          <Ico name={b.icon} size={14} style={{ color: T.success }} />
          {b.label}
        </div>
      ))}
    </div>
  );
}

/* ── Auth session (SMS OTP prototype) ─────────────────────────
 * Short-lived session after mobile OTP verify (~15 min).
 * Backend spec: POST /api/auth/sms/send · POST /api/auth/sms/verify
 */
const AUTH_SESSION_TTL_MS = 15 * 60 * 1000;

function normalizeMobileE164(raw) {
  const digits = String(raw || '').replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('354')) return '+' + digits;
  if (digits.length <= 10) return '+354' + digits.replace(/^0+/, '');
  return '+' + digits;
}

function getAuthSession() {
  const s = window.__authSession;
  if (!s || !s.verifiedAt || !s.mobile) return null;
  if (Date.now() - s.verifiedAt > AUTH_SESSION_TTL_MS) {
    window.__authSession = null;
    return null;
  }
  return s;
}

function setAuthSession(mobile) {
  const normalized = normalizeMobileE164(mobile);
  window.__authSession = { mobile: normalized, verifiedAt: Date.now() };
  return window.__authSession;
}

function clearAuthSession() {
  window.__authSession = null;
}

/* ── SmsAuthGate ─────────────────────────────────────────────
 * Shared SMS OTP gate before A6 checkout and MB (Figma AUTH-SMS).
 * Prototype: any 6-digit code verifies; resend/lockout simulated.
 */
const SMS_AUTH_COPY = {
  checkout: {
    pill: 'Secure checkout',
    title: 'Verify your mobile',
    titleCode: 'Enter your code',
    subtitle: 'We send a one-time code to confirm it\'s you before payment.',
    subtitleCode: (mobile) => 'We sent a 6-digit code to ' + mobile + '.',
    backLabel: 'Back to add-ons',
    cta: 'Continue to checkout',
  },
  manage: {
    pill: 'Manage booking',
    title: 'Verify your mobile',
    titleCode: 'Enter your code',
    subtitle: 'Enter the mobile number used when you booked.',
    subtitleCode: (mobile) => 'We sent a 6-digit code to ' + mobile + '.',
    backLabel: 'Back to home',
    cta: 'View my bookings',
  },
};

function SmsAuthGate({ variant = 'checkout', onVerified, goBack }) {
  const copy = SMS_AUTH_COPY[variant] || SMS_AUTH_COPY.checkout;
  const [step, setStep] = React.useState('mobile');
  const [mobile, setMobile] = React.useState('');
  const [code, setCode] = React.useState('');
  const [err, setErr] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [failCount, setFailCount] = React.useState(0);
  const [resends, setResends] = React.useState(0);
  const [sentTo, setSentTo] = React.useState('');

  function sendCode(e) {
    e?.preventDefault?.();
    setErr('');
    const normalized = normalizeMobileE164(mobile);
    if (normalized.length < 8) {
      setErr('Enter a valid mobile number including country code.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSentTo(normalized);
      setStep('code');
    }, 700);
  }

  function resendCode() {
    if (resends >= 3) { setStep('locked'); return; }
    setErr('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResends((n) => n + 1);
      setCode('');
    }, 500);
  }

  function verifyCode(e) {
    e?.preventDefault?.();
    setErr('');
    if (!/^\d{6}$/.test(code.trim())) {
      setErr('Enter the 6-digit code we sent to your phone.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (failCount >= 4) {
        setStep('locked');
        return;
      }
      const session = setAuthSession(sentTo || mobile);
      onVerified?.(session);
    }, 600);
  }

  function handleBadCode() {
    const next = failCount + 1;
    setFailCount(next);
    if (next >= 5) {
      setStep('locked');
      return;
    }
    setErr('That code didn\'t work. Check the SMS and try again.');
    setCode('');
  }

  if (step === 'locked') {
    return (
      <div className="shell" style={{ paddingTop: 60, paddingBottom: 60, maxWidth: 520, margin: '0 auto' }}>
        {goBack && <div className="link" style={{ marginBottom: 24 }} onClick={goBack}><Icons.ArrowL size={16} /> Back</div>}
        <EmptyState
          icon="Lock"
          title="Too many attempts"
          desc="For your security, SMS verification is locked for 15 minutes. Please try again later or contact support."
          action={<Btn variant="primary" onClick={goBack}>Back</Btn>}
        />
      </div>
    );
  }

  const displayTitle = step === 'code' ? (copy.titleCode || copy.title) : copy.title;
  const displaySubtitle = step === 'code' && copy.subtitleCode
    ? copy.subtitleCode(sentTo || mobile)
    : copy.subtitle;

  return (
    <div className="shell" style={{ paddingTop: 60, paddingBottom: 60, maxWidth: 520, margin: '0 auto' }}>
      {goBack && <div className="link" style={{ marginBottom: 24 }} onClick={goBack}><Icons.ArrowL size={16} /> {copy.backLabel || 'Back'}</div>}
      <div className="col gap6" style={{ marginBottom: 32 }}>
        <div className="pill" style={{ alignSelf: 'flex-start' }}><Icons.Lock size={14} /> {copy.pill}</div>
        <h1 className="h1" style={{ fontSize: 32 }}>{displayTitle}</h1>
        <p className="muted" style={{ fontSize: 15, lineHeight: 1.5, marginTop: 4 }}>{displaySubtitle}</p>
      </div>

      {step === 'mobile' ? (
        <form className="card card-pad col gap18" onSubmit={sendCode} noValidate>
          <FormField label="Mobile number" required helper="Include country code — e.g. +354 555 0100">
            <Fld type="tel" placeholder="+354 555 0100" value={mobile} onChange={(e) => setMobile(e.target.value)} autoComplete="tel" />
          </FormField>
          {err && <InfoBanner variant="danger" icon="Info">{err}</InfoBanner>}
          <Btn variant="primary" size="lg" block disabled={loading} type="submit">
            {loading ? 'Sending code…' : 'Send verification code'}
          </Btn>
        </form>
      ) : (
        <form className="card card-pad col gap18" onSubmit={verifyCode} noValidate>
          <InfoBanner variant="info" icon="Info">
            Code sent to <strong style={{ color: 'var(--fg)' }}>{sentTo}</strong>. Demo: enter any 6 digits.
          </InfoBanner>
          <FormField label="6-digit code" required>
            <Fld
              type="text"
              inputMode="numeric"
              placeholder="123456"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              style={{ fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '0.2em', fontSize: 22, textAlign: 'center' }}
            />
          </FormField>
          {err && <InfoBanner variant="danger" icon="Info">{err}</InfoBanner>}
          <Btn variant="primary" size="lg" block disabled={loading || code.length < 6} type="submit">
            {loading ? 'Verifying…' : copy.cta}
          </Btn>
          <div className="row center between wrap gap8" style={{ fontSize: 13 }}>
            <button type="button" className="link" onClick={() => { setStep('mobile'); setCode(''); setErr(''); }}>Change number</button>
            <button type="button" className="link" disabled={loading || resends >= 3} onClick={resendCode}>
              Resend code{resends ? ` (${resends}/3)` : ''}
            </button>
          </div>
          <button type="button" className="btn btn-ghost btn-sm" onClick={handleBadCode} style={{ alignSelf: 'center' }}>
            Simulate wrong code (demo)
          </button>
        </form>
      )}

      <div className="row center gap8" style={{ justifyContent: 'center', marginTop: 20, color: 'var(--dim)', fontSize: 13 }}>
        <Icons.Shield size={14} style={{ color: 'var(--success)' }} /> Code expires in 5 minutes · Session lasts 15 minutes
      </div>
    </div>
  );
}

/* ── Platform landing organisms (Figma 974:10011) ─────────── */

function PlatformVerticalCard({ icon, iconClass, title, desc, href, onClick }) {
  const Tag = href ? 'a' : 'button';
  const props = href
    ? { href, className: 'platform-v-card' }
    : { type: 'button', className: 'platform-v-card', onClick };
  return (
    <Tag {...props}>
      <img className={`platform-v-card-icon ${iconClass || ''}`} src={icon} alt="" />
      <div className="platform-v-card-body">
        <h3 className="platform-v-card-title">{title}</h3>
        <p className="platform-v-card-desc">{desc}</p>
      </div>
    </Tag>
  );
}

function PlatformFooterColumn({ title, links, showChevron = true, brand = false }) {
  return (
    <div className={`platform-footer-col${brand ? ' platform-footer-brand' : ''}`}>
      {brand ? (
        <>
          <p className="platform-footer-col-title logo" style={{ margin: 0 }}>
            Iceland<span className="logo-accent">Express</span>
          </p>
          {links.map((l) => (
            <a key={l.label} href={l.href} className="platform-footer-link">{l.label}</a>
          ))}
        </>
      ) : (
        <>
          <p className="platform-footer-col-title">
            {showChevron && <span className="mi" aria-hidden="true">keyboard_arrow_up</span>}
            {title}
          </p>
          {links.map((l) => (
            <a key={l.label} href={l.href} className="platform-footer-link">{l.label}</a>
          ))}
        </>
      )}
    </div>
  );
}

function PlatformFooter() {
  return (
    <footer className="platform-footer">
      <div className="platform-footer-cols">
        <PlatformFooterColumn brand links={[{ label: 'About us', href: '#about' }]} showChevron={false} />
        <PlatformFooterColumn title="Plan Your Trip" links={[{ label: 'Travel Guides', href: '/bookacar/' }]} />
        <PlatformFooterColumn title="Book and Travel" links={[{ label: 'Car Rentals', href: '/bookacar/' }]} />
        <PlatformFooterColumn title="Legal and Support" links={[{ label: 'FAQ', href: '#faq' }]} />
        <PlatformFooterColumn title="Social Media" links={[{ label: 'Instagram', href: 'https://instagram.com' }]} showChevron={false} />
      </div>
      <div className="platform-footer-bottom">
        <span>© 2026 Iceland Express. All rights reserved.</span>
        <span>icelandexpress.com</span>
      </div>
    </footer>
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

function NavBar({ go, items, manageRoute = 'manage', variant = 'default' }) {
  const isPlatform = variant === 'platform';
  const navItems = items || window.NAV_PLATFORM_ITEMS || NAV_PLATFORM_ITEMS;
  const [open, setOpen] = React.useState(false);
  const navRef = React.useRef(null);
  const toggleId = React.useId();
  const drawerId = React.useId();

  const close = React.useCallback(() => setOpen(false), []);

  React.useEffect(() => {
    const navEl = navRef.current;
    if (!navEl) return;

    if (!isPlatform) {
      const onScroll = () => navEl.classList.toggle('scrolled', scrollY > 50);
      onScroll();
      addEventListener('scroll', onScroll, { passive: true });
      return () => removeEventListener('scroll', onScroll);
    }
  }, [close, isPlatform]);

  React.useEffect(() => {
    const navEl = navRef.current;
    if (!navEl) return;

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
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
      mq.removeEventListener('change', onMq);
    };
  }, [close]);

  const innerClass = isPlatform ? 'nav-inner nav-inner-platform' : 'shell nav-inner';

  return (
    <nav className={`nav${open ? ' is-open' : ''}${isPlatform ? ' nav-platform' : ''}`} ref={navRef} id="nav">
      <div className={innerClass}>
        {isPlatform ? (
          <div className="nav-brand-links">
            <a className="logo" href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Iceland<span className="logo-accent">Express</span>
            </a>
            <div className="nav-links" aria-label="Primary navigation">
              {navItems.map((item) => (
                <NavBarLink key={item.label} item={item} go={go} onNavigate={close} />
              ))}
            </div>
          </div>
        ) : (
          <>
            <a className="logo" href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Iceland<span className="logo-accent">Express</span>
            </a>
            <div className="nav-links" aria-label="Primary navigation">
              {navItems.map((item) => (
                <NavBarLink key={item.label} item={item} go={go} onNavigate={close} />
              ))}
            </div>
          </>
        )}
        <div className="nav-spacer" />
        {isPlatform ? (
          <div className="nav-platform-actions">
            <a href="#ai" className="btn-platform-outline">
              <span className="mi" aria-hidden="true">auto_awesome</span>
              AI travel Planner
            </a>
            <button
              type="button"
              className="btn-platform-secondary"
              onClick={() => go && go(manageRoute)}
            >
              Manage booking
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="btn btn-primary btn-sm nav-cta"
            onClick={() => go && go(manageRoute)}
          >
            Manage Booking
          </button>
        )}
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
          {navItems.map((item) => (
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
            {isPlatform ? 'Manage booking' : 'Manage Booking'}
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
  AUTH_SESSION_TTL_MS,
  normalizeMobileE164,
  getAuthSession,
  setAuthSession,
  clearAuthSession,
  // Organisms
  CarCardV2, ExtraCardV2, BlogCardV2, ManageActionCard,
  PageHero, EmptyState, PriceSummaryCard, NavBar, TrustBadges, SmsAuthGate,
  PlatformVerticalCard, PlatformFooter, PlatformFooterColumn,
});
