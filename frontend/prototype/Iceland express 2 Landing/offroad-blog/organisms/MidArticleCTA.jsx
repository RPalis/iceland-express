// organisms/MidArticleCTA.jsx
// ─────────────────────────────────────────────────────────────
// Iceland Express DS — MidArticleCTA organism
// Inline conversion card injected mid-article.
// Molecules used: RatingChip, FreeCancBadge, CarSpec
// Atoms used: Btn, Badge, Icons
//
// Props:
//   car         : car object from POST_DATA.recommendedCar
//   onBook      : function — navigates to car detail / search
// ─────────────────────────────────────────────────────────────

function MidArticleCTA({ car, onBook }) {
  return (
    <aside className="mid-cta" aria-label="Recommended car">
      <div className="mid-cta-label">Recommended for this trip</div>

      <div className="row gap-12" style={{ marginBottom: 12 }}>
        {/* Car thumbnail */}
        <div style={{ width: 80, height: 60, borderRadius: 'var(--r-sm)', overflow: 'hidden', flexShrink: 0, background: 'var(--inner)' }}>
          <img src={car.img} alt={car.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Car info */}
        <div className="col gap-4" style={{ flex: 1 }}>
          <span style={{ fontWeight: 700, fontSize: 16 }}>{car.name}</span>
          <RatingChip value={car.rating} count={car.reviews} size="sm" />
        </div>

        {/* Price */}
        <div className="col" style={{ alignItems: 'flex-end', flexShrink: 0 }}>
          <span className="price-amt" style={{ fontSize: 22 }}>€{car.perDay}</span>
          <span className="price-unit">/day</span>
        </div>
      </div>

      {/* Spec row */}
      <CarSpec
        transmission={car.transmission}
        seats={car.seats}
        bags={car.bags}
        drive={car.drive}
        style={{ marginBottom: 14 }}
      />

      {/* Badges */}
      <div className="row gap-8 wrap" style={{ marginBottom: 14 }}>
        <FreeCancBadge compact />
        <Badge variant="outline"><Icons.Gear size={11} /> {car.transmission}</Badge>
        <Badge variant="outline"><Icons.Drive size={11} /> {car.drive}</Badge>
      </div>

      {/* CTA */}
      <Btn variant="primary" block iconEnd={Icons.ArrowR} onClick={onBook}>
        View this car
      </Btn>
    </aside>
  );
}
