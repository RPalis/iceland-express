// screen-A7-confirm.jsx — A7 Booking Confirmation
// Figma: A7-Booking-Confirmation

/* ============================================================
   CONFIRMATION
   ============================================================ */
function ConfirmScreen({ search, car, days, qty, go }) {
  const ref = Math.random().toString(36).substr(2, 8).toUpperCase();
  const { total, lines } = computeTotals(car, days, qty);

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
            {/* Car summary */}
            <div className="card card-pad row gap20" style={{ alignItems: "center" }}>
              <div style={{ width: 140, borderRadius: "var(--r-md)", overflow: "hidden", flex: "none", aspectRatio: "4/3", background: "var(--inner)" }}>
                <img src={car.img} alt={car.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div className="grow col gap6">
                <div className="eyebrow">{car.catLabel} · {car.provider}</div>
                <h3 className="h3" style={{ fontSize: 22 }}>{car.year} {car.name}</h3>
                <div className="row center gap6"><Stars value={car.rating} size={13} /><span className="muted" style={{ fontSize: 13 }}>{car.rating} · {car.reviews} reviews</span></div>
                <div className="row center gap8" style={{ marginTop: 4 }}>
                  <span className="badge badge-outline"><Icons.Gear size={12} /> {car.transmission}</span>
                  <span className="badge badge-outline"><Icons.Users size={12} /> {car.seats}</span>
                  <span className="badge badge-outline"><Icons.Drive size={12} /> {car.drive}</span>
                </div>
              </div>
            </div>

            {/* Trip details */}
            <div className="card card-pad">
              <h3 className="h3" style={{ marginBottom: 18 }}>Trip Details</h3>
              <div className="col gap14">
                {[
                  { ico: "Pin", label: "Pickup", val: search.pickupLoc.name, sub: fmtDateLong(search.pickupDate) + " · " + search.pickupTime },
                  { ico: "Pin", label: "Return", val: search.dropoffLoc.name, sub: fmtDateLong(search.returnDate) + " · " + search.returnTime },
                  { ico: "Calendar", label: "Duration", val: days + " day" + (days !== 1 ? "s" : ""), sub: fmtDate(search.pickupDate) + " → " + fmtDate(search.returnDate) },
                ].map((row) => {
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
                <h3 className="h3" style={{ marginBottom: 16 }}>Add-ons Booked</h3>
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
                {[
                  { n: "1", t: "Confirmation email", d: "Your voucher and full itinerary will arrive within 5 minutes." },
                  { n: "2", t: "Track your flight", d: "If you added a flight number, we'll auto-adjust your pickup time." },
                  { n: "3", t: "Pick up your car", d: "Head to " + search.pickupLoc.name + " at " + search.pickupTime + " with your driving license." },
                  { n: "4", t: "Hit the Ring Road", d: "All set! Your rental includes CDW, unlimited mileage and 24/7 support." },
                ].map((step) => (
                  <div key={step.n} className="row gap14 center">
                    <span style={{ width: 32, height: 32, display: "grid", placeItems: "center", borderRadius: "99px", background: "var(--primary-tint)", color: "var(--primary-strong)", fontWeight: 700, fontSize: 14, flex: "none" }}>{step.n}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14.5 }}>{step.t}</div>
                      <div className="muted" style={{ fontSize: 13 }}>{step.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="row center gap12" style={{ flexWrap: "wrap" }}>
              <button className="btn btn-primary" onClick={() => go("home")}><Icons.ArrowL size={16} /> Book another car</button>
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
