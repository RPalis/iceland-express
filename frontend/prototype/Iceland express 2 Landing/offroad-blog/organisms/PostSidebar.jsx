// organisms/PostSidebar.jsx
// ─────────────────────────────────────────────────────────────
// Iceland Express DS — PostSidebar organism
// Sticky right sidebar: booking widget + recommended car + TOC.
// Molecules used: CarSpec, RatingChip, FreeCancBadge
// Atoms used: Btn, Badge, Icons, Sep
//
// Props:
//   post    : full post object (for TOC)
//   car     : recommended car object
//   onBook  : function — navigates to search/detail
// ─────────────────────────────────────────────────────────────

const { useState: useSidebarState } = React;

function PostSidebar({ post, car, onBook }) {
  // ── Book widget state ──────────────────────────────────────
  const [openField, setOpenField] = useSidebarState(null);
  const [pickup, setPickup] = useSidebarState('Keflavík Airport (KEF)');
  const [pickupDate, setPickupDate] = useSidebarState('');
  const [returnDate, setReturnDate] = useSidebarState('');

  // Derive h2 sections for TOC
  const h2s = post.sections.filter(s => s.type === 'h2');

  return (
    <aside className="post-sidebar" aria-label="Booking sidebar">
      <div className="post-sidebar-inner">

        {/* ── 1. Book a car widget ── */}
        <div className="sidebar-book-card">
          <div className="row gap-10" style={{ marginBottom: 16 }}>
            <span style={{ width: 36, height: 36, display: 'grid', placeItems: 'center', background: 'var(--primary-tint)', borderRadius: 'var(--r-sm)', color: 'var(--primary-strong)', flexShrink: 0 }}>
              <Icons.Search size={18} />
            </span>
            <div className="col gap-4">
              <span style={{ fontWeight: 700, fontSize: 15 }}>Book a car for this trip</span>
              <span className="muted" style={{ fontSize: 12.5 }}>Free cancellation · CDW included</span>
            </div>
          </div>

          <div className="col gap-8">
            {/* Pickup location */}
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--muted)', marginBottom: 6 }}>Pickup location</label>
              <button
                className={'sidebar-field' + (openField === 'loc' ? ' open' : '')}
                onClick={() => setOpenField(openField === 'loc' ? null : 'loc')}
              >
                <Icons.Pin size={15} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <span style={{ flex: 1, textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis' }}>{pickup}</span>
                <Icons.Chevron size={13} style={{ color: 'var(--dim)', flexShrink: 0, transform: openField === 'loc' ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
              </button>
            </div>

            {/* Dates row */}
            <div className="row gap-8">
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--muted)', marginBottom: 6 }}>From</label>
                <button className="sidebar-field" onClick={() => setOpenField(openField === 'pickup' ? null : 'pickup')}>
                  <Icons.Calendar size={14} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                  <span style={{ fontSize: 12.5 }}>{pickupDate || 'Pick date'}</span>
                </button>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--muted)', marginBottom: 6 }}>To</label>
                <button className="sidebar-field" onClick={() => setOpenField(openField === 'return' ? null : 'return')}>
                  <Icons.Calendar size={14} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                  <span style={{ fontSize: 12.5 }}>{returnDate || 'Pick date'}</span>
                </button>
              </div>
            </div>

            <Btn variant="primary" block icon={Icons.Search} onClick={onBook}>
              Search available cars
            </Btn>
          </div>

          <div className="row gap-6" style={{ justifyContent: 'center', marginTop: 12, fontSize: 12, color: 'var(--dim)' }}>
            <Icons.Lock size={13} style={{ color: 'var(--success)' }} />
            No payment until booking
          </div>
        </div>

        {/* ── 2. Recommended car card ── */}
        <div className="rec-car-card">
          <div className="eyebrow" style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--dim)' }}>
            Recommended for this article
          </div>
          <div className="rec-car-img">
            <img src={car.img} alt={car.name} />
          </div>
          <div className="col gap-6">
            <div className="row between gap-8">
              <span style={{ fontWeight: 700, fontSize: 15.5 }}>{car.name}</span>
              <FreeCancBadge compact />
            </div>
            <RatingChip value={car.rating} count={car.reviews} size="sm" />
          </div>
          <CarSpec transmission={car.transmission} seats={car.seats} bags={car.bags} drive={car.drive} />
          <div className="row between" style={{ alignItems: 'flex-end' }}>
            <div>
              <span className="price-amt" style={{ fontSize: 22 }}>€{car.perDay}</span>
              <span className="price-unit">/day</span>
            </div>
            <Btn variant="primary" size="sm" iconEnd={Icons.ArrowR} onClick={onBook}>Book</Btn>
          </div>
        </div>

        {/* ── 3. Table of contents ── */}
        {h2s.length > 0 && (
          <div className="toc-card">
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--dim)', marginBottom: 12 }}>
              In this article
            </div>
            <div className="col">
              {h2s.map((s, i) => (
                <div key={i} className="toc-item">
                  <span className="toc-num">{i + 1}</span>
                  <span style={{ lineHeight: 1.3 }}>{s.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </aside>
  );
}
