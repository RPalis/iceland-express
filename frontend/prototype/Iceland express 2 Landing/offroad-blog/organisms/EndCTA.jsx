// organisms/EndCTA.jsx
// ─────────────────────────────────────────────────────────────
// Iceland Express DS — EndCTA organism
// Full-width conversion block at the bottom of the article.
// Molecules used: FreeCancBadge
// Atoms used: Btn, Icons
//
// Props:
//   post   : { ctaTitle, ctaDesc, relatedCarCat }
//   car    : recommended car object
//   onBook : function — navigates to search or detail
// ─────────────────────────────────────────────────────────────

function EndCTA({ post, car, onBook }) {
  return (
    <div className="end-cta" role="complementary" aria-label="Book a car CTA">
      <div className="row gap-16" style={{ alignItems: 'flex-start', flexWrap: 'wrap' }}>

        {/* Text */}
        <div className="col gap-6" style={{ flex: 1, minWidth: 220 }}>
          <div className="row gap-10">
            <span style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--primary-tint)', display: 'grid', placeItems: 'center', color: 'var(--primary-strong)', flexShrink: 0 }}>
              <Icons.Search size={22} />
            </span>
            <div className="col gap-4">
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, margin: 0 }}>
                {post.ctaTitle}
              </h3>
              <p className="muted" style={{ fontSize: 14.5, margin: 0 }}>{post.ctaDesc}</p>
            </div>
          </div>
          <FreeCancBadge />
        </div>

        {/* Car card + CTA */}
        <div className="row gap-12" style={{ alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <img
              src={car.img}
              alt={car.name}
              style={{ width: 64, height: 48, objectFit: 'cover', borderRadius: 'var(--r-sm)' }}
            />
            <div className="col gap-4">
              <span style={{ fontWeight: 700, fontSize: 14 }}>{car.name}</span>
              <span className="muted" style={{ fontSize: 12 }}>from €{car.perDay}/day</span>
            </div>
          </div>
          <Btn variant="primary" size="lg" icon={Icons.Search} onClick={onBook}>
            Search available cars
          </Btn>
        </div>
      </div>
    </div>
  );
}


/* Export to window — Babel-standalone runs each script in an isolated
   scope, so cross-script references require explicit global assignment. */
Object.assign(window, { EndCTA });
