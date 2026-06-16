// screen-A7-confirm.jsx — A7 Booking Confirmation
// Figma: A7-Booking-Confirmation
//
// ─── 1A-2 AUDIT: CAR-SPECIFIC STRINGS ──────────────────────────────────────
// Every item below must move to a `vertical` prop config before Phase 2.
// vertical.*  =  the key this string will live under in cars.config.js
//
// BOOKING REFERENCE
//   ref has no prefix (e.g. "A3F9KX")   → vertical.confirmation.refPrefix
//      (cars: "ICE-", flights: "FL-")
//
// ITEM SUMMARY CARD (the card showing what was booked)
//   car.catLabel, car.provider           → vertical.item.categoryLabel, item.provider
//   car.year + car.name                  → vertical.item.displayName(item)
//   car.rating, car.reviews              → vertical.item.rating, item.reviews
//   car.img                              → vertical.item.image
//   spec badges — transmission/seats/drive
//     Icons.Gear  + car.transmission     → vertical.item.specs[0] → {icon, value}
//     Icons.Users + car.seats            → vertical.item.specs[1] → {icon, value}
//     Icons.Drive + car.drive            → vertical.item.specs[2] → {icon, value}
//      (flights: airline/class/stops · hotels: star-rating/rooms/board)
//
// TRIP DETAILS LABELS
//   "Pickup"  (row label)                → vertical.confirmation.originLabel
//      (flights: "Departure" · hotels: "Check-in")
//   "Return"  (row label)                → vertical.confirmation.destinationLabel
//      (flights: "Arrival"   · hotels: "Check-out")
//   "Duration" (row label)               → vertical.confirmation.durationLabel
//      (generic enough but included for completeness)
//   "Trip Details" (section title)       → vertical.confirmation.tripSectionLabel
//      (flights: "Flight Details" · hotels: "Stay Details")
//
// NEXT STEPS (all 4 steps are car-specific)
//   step 1  "Confirmation email" desc:
//     "Your voucher and full itinerary will arrive within 5 minutes."
//                                        → vertical.confirmation.nextSteps[0].desc
//      (generic — same for all verticals)
//   step 2  "Track your flight" + desc   → vertical.confirmation.nextSteps[1]
//      (generic travel — reusable if phrasing stays neutral)
//   step 3  "Pick up your car" title     → vertical.confirmation.nextSteps[2].title
//      (flights: "Board your flight" · hotels: "Check in")
//   step 3  desc: "Head to {loc} at {time} with your driving license."
//                                        → vertical.confirmation.nextSteps[2].desc(search)
//      (car-specific: driving license · flights: boarding pass · hotels: ID)
//   step 4  "Hit the Ring Road" title    → vertical.confirmation.nextSteps[3].title
//      (Iceland + car specific — flights: "Enjoy your flight")
//   step 4  desc: "CDW, unlimited mileage and 24/7 support."
//                                        → vertical.confirmation.nextSteps[3].desc
//      (car: CDW/mileage · flights: fare includes/excludes · hotels: amenities)
//
// CTA BUTTONS
//   "Book another car"                   → vertical.confirmation.bookAgainLabel
//      (flights: "Book another flight" · hotels: "Book another hotel")
//
// ADD-ONS SECTION
//   "Add-ons Booked" (section title)     → vertical.confirmation.addonsLabel
//      (generic enough to keep, but move for full flexibility)
// ────────────────────────────────────────────────────────────────────────────

/* ============================================================
   CONFIRMATION
   ============================================================ */
function ConfirmScreen({ search, car, days, qty, go, vertical }) {
  const v = vertical || window.carsConfig;
  const ref = v.confirmation.refPrefix + Math.random().toString(36).substr(2, 8).toUpperCase();
  const { total, lines } = computeTotals(car, days, qty);

  const tripRows = [
    { ico: "Pin",      label: v.confirmation.originLabel,      val: search.pickupLoc.name,  sub: fmtDateLong(search.pickupDate) + " · " + search.pickupTime },
    { ico: "Pin",      label: v.confirmation.destinationLabel, val: search.dropoffLoc.name, sub: fmtDateLong(search.returnDate) + " · " + search.returnTime },
    { ico: "Calendar", label: v.confirmation.durationLabel,    val: days + " day" + (days !== 1 ? "s" : ""), sub: fmtDate(search.pickupDate) + " → " + fmtDate(search.returnDate) },
  ];

  return (
    <div className="flow" style={{ paddingBottom: 60 }}>
      {/* Hero banner */}
      <div className="confirm-hero">
        <div className="shell confirm-hero-inner">
          <div className="confirm-check"><Icons.Check size={28} /></div>
          <h1 className="h1" style={{ fontSize: 36, marginTop: 20 }}>Booking Confirmed!</h1>
          <p className="muted" style={{ fontSize: 18, marginTop: 8 }}>Check your inbox for the full confirmation and voucher.</p>
          <div className="row center gap12" style={{ marginTop: 20, justifyContent: "center", flexWrap: "wrap" }}>
            <span className="badge badge-glass"><Icons.Doc size={14} style={{ color: "var(--primary)" }} /> Ref: {ref}</span>
            <FreeCancBadge compact />
          </div>
        </div>
      </div>

      <div className="shell" style={{ paddingTop: 40 }}>
        <div className="layout-2col">
          <div className="col gap20">
            {/* Item summary */}
            <div className="card card-pad row gap20" style={{ alignItems: "center" }}>
              <div style={{ width: 140, borderRadius: "var(--r-md)", overflow: "hidden", flex: "none", aspectRatio: "4/3", background: "var(--inner)" }}>
                <img src={car[v.item.imageKey]} alt={car.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div className="grow col gap6">
                <div className="eyebrow">{car[v.item.categoryKey]} · {car[v.item.providerKey]}</div>
                <h3 className="h3" style={{ fontSize: 22 }}>{v.item.displayName(car)}</h3>
                <div className="row center gap6"><Stars value={car.rating} size={13} /><span className="muted" style={{ fontSize: 13 }}>{car.rating} · {car.reviews} reviews</span></div>
                <div className="row center gap8" style={{ marginTop: 4 }}>
                  {v.item.specs.map(function(spec) {
                    const I = Icons[spec.icon];
                    return <span key={spec.key} className="badge badge-outline">{I && <I size={12} />} {car[spec.key]}</span>;
                  })}
                </div>
              </div>
            </div>

            {/* Trip details */}
            <div className="card card-pad">
              <h3 className="h3" style={{ marginBottom: 18 }}>{v.confirmation.tripSectionLabel}</h3>
              <div className="col gap14">
                {tripRows.map((row) => {
                  const I = Icons[row.ico];
                  return (
                    <div key={row.label} className="row center gap14" style={{ paddingBottom: 14, borderBottom: "1px solid var(--border)" }}>
                      <span style={{ width: 40, height: 40, display: "grid", placeItems: "center", borderRadius: "var(--r-sm)", background: "var(--primary-tint)", color: "var(--primary-strong)", flex: "none" }}><I size={20} /></span>
                      <div>
                        <div className="muted" style={{ fontSize: 12.5 }}>{row.label}</div>
                        <div style={{ fontWeight: 700, fontSize: 15 }}>{row.val}</div>
                        <div className="muted" style={{ fontSize: 13 }}>{row.sub}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Add-ons */}
            {lines.length > 0 && (
              <div className="card card-pad">
                <h3 className="h3" style={{ marginBottom: 16 }}>{v.confirmation.addonsLabel}</h3>
                <div className="col gap12">
                  {lines.map((l) => (
                    <div key={l.id} className="row between center" style={{ fontSize: 14 }}>
                      <span className="row center gap8"><Icons.Check size={15} style={{ color: "var(--success)" }} />{l.qty > 1 && l.qty + "× "}{l.name}</span>
                      <span style={{ fontWeight: 600 }}>{eur(l.sum)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What's next */}
            <div className="card card-pad">
              <h3 className="h3" style={{ marginBottom: 16 }}>What Happens Next</h3>
              <div className="col gap14">
                {v.confirmation.nextSteps.map(function(step, i) {
                  const desc = typeof step.desc === "function" ? step.desc(search) : step.desc;
                  return (
                    <div key={i} className="row gap14 center">
                      <span style={{ width: 32, height: 32, display: "grid", placeItems: "center", borderRadius: "99px", background: "var(--primary-tint)", color: "var(--primary-strong)", fontWeight: 700, fontSize: 14, flex: "none" }}>{i + 1}</span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14.5 }}>{step.title}</div>
                        <div className="muted" style={{ fontSize: 13 }}>{desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="row center gap12" style={{ flexWrap: "wrap" }}>
              <button className="btn btn-primary" onClick={() => go("home")}><Icons.ArrowL size={16} /> {v.confirmation.bookAgainLabel}</button>
              <button className="btn btn-ghost"><Icons.Download size={16} /> Download voucher</button>
            </div>
          </div>

          {/* Price summary (read-only) */}
          <div className="summary">
            <PriceSummaryCard car={car} days={days} qty={qty} />
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ConfirmScreen });
