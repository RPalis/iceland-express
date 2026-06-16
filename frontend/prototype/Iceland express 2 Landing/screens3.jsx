// screens3.jsx — Checkout + Booking Confirmation
const { useState: useS3 } = React;

/* ============================================================
   CHECKOUT
   ============================================================ */
function CheckoutScreen({ search, setSearch, car, days, qty, go }) {
  const { total, base } = computeTotals(car, days, qty);
  const [pay, setPay] = useS3("full");
  const [form, setForm] = useS3({
    first: "", last: "", email: "", phone: "",
    dob: "", license: "", licenseCountry: "GB",
    flight: "", requests: "",
    card: "", expiry: "", cvv: "", cardName: "",
    agree: false, marketing: false,
  });
  const [submitting, setSubmitting] = useS3(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target ? e.target.value : e });

  const payOpts = [
    { id: "full", label: "Pay in Full", desc: "One payment now", amt: total, tag: null },
    { id: "deposit", label: "Pay Deposit", desc: "25% now, rest on pickup", amt: Math.ceil(total * 0.25), tag: "Flexible" },
    { id: "pickup", label: "Pay at Pickup", desc: "No charge today", amt: 0, tag: "Free Today" },
  ];

  function submit(e) {
    e.preventDefault();
    if (!form.agree) { alert("Please accept the terms to continue."); return; }
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); go("confirm"); }, 900);
  }

  return (
    <div className="flow shell" style={{ paddingTop: 24, paddingBottom: 40 }}>
      <TripBarEditable search={search} setSearch={setSearch} />
      <StepHead screen="checkout" go={go} />
      <InfoBanner variant="success" icon="Shield" style={{ marginTop: 12 }}>Your booking is protected · Free cancellation within 48h</InfoBanner>

      <div className="layout-2col" style={{ marginTop: 20 }}>
        <form className="col gap20" onSubmit={submit} noValidate>
          {/* Driver details */}
          <div className="card card-pad">
            <h3 className="h2" style={{ marginBottom: 20 }}>Driver Details</h3>
            <div className="form-grid">
              <FormField label="First name" required><Fld type="text" placeholder="Anna" value={form.first} onChange={set("first")} /></FormField>
              <FormField label="Last name" required><Fld type="text" placeholder="Sigurðardóttir" value={form.last} onChange={set("last")} /></FormField>
              <FormField label="Email address" required><Fld type="email" placeholder="anna@example.com" value={form.email} onChange={set("email")} /></FormField>
              <FormField label="Phone number" required><Fld type="tel" placeholder="+354 800 1234" value={form.phone} onChange={set("phone")} /></FormField>
              <FormField label="Date of birth" required><Fld type="date" value={form.dob} onChange={set("dob")} /></FormField>
              <FormField label="License issued in"><SelFld value={form.licenseCountry} onChange={set("licenseCountry")}>{["GB","US","DE","FR","IS","AU","CA","NL","SE","NO","DK"].map(c=><option key={c} value={c}>{c}</option>)}</SelFld></FormField>
              <FormField label="Arriving flight number" helper="We monitor your flight and adjust pickup automatically." span><Fld type="text" placeholder="WW101" value={form.flight} onChange={set("flight")} /></FormField>
              <FormField label="Special requests" span><TxtArea placeholder="Child seat installed on arrival, camping kit assembly, etc." value={form.requests} onChange={set("requests")} rows={3} /></FormField>
            </div>
          </div>

          {/* Payment option */}
          <div className="card card-pad">
            <h3 className="h2" style={{ marginBottom: 8 }}>Payment Option</h3>
            <p className="muted" style={{ fontSize: 14, marginBottom: 20 }}>Choose how you'd like to pay — no hidden fees.</p>
            <div className="pay-opts">
              {payOpts.map((o) => (
                <div key={o.id} className={"pay-opt" + (pay === o.id ? " on" : "")} onClick={() => setPay(o.id)}>
                  <div className="row between center">
                    <span style={{ fontWeight: 700, fontFamily: "var(--font-display)", fontSize: 14 }}>{o.label}</span>
                    {o.tag && <span className="badge badge-soft" style={{ fontSize: 11 }}>{o.tag}</span>}
                  </div>
                  <div className="amt">{o.amt === 0 ? "€0" : eur(o.amt)}</div>
                  <div className="muted" style={{ fontSize: 13 }}>{o.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Card details */}
          {pay !== "pickup" && (
            <div className="card card-pad">
              <div className="row between center" style={{ marginBottom: 20 }}>
                <h3 className="h2">Card Details</h3>
                <div className="row center gap6 muted" style={{ fontSize: 13 }}>
                  <Icons.Lock size={16} style={{ color: "var(--success)" }} /> SSL secured
                </div>
              </div>
              <div className="form-grid">
                <FormField label="Card number" required span><Fld type="text" placeholder="4242 4242 4242 4242" maxLength={19} value={form.card} onChange={set("card")} /></FormField>
                <FormField label="Expiry" required><Fld type="text" placeholder="MM/YY" maxLength={5} value={form.expiry} onChange={set("expiry")} /></FormField>
                <FormField label="CVV" required><Fld type="text" placeholder="•••" maxLength={4} value={form.cvv} onChange={set("cvv")} /></FormField>
                <FormField label="Name on card" required span><Fld type="text" placeholder="Anna Sigurðardóttir" value={form.cardName} onChange={set("cardName")} /></FormField>
              </div>
            </div>
          )}

          {/* Terms */}
          <div className="card card-pad col gap12">
            <Chk checked={form.agree} onChange={() => setForm({ ...form, agree: !form.agree })}>
              <span style={{ fontSize: 14 }}>I agree to the <span style={{ color: "var(--primary-strong)" }}>Terms of Service</span> and <span style={{ color: "var(--primary-strong)" }}>Rental Conditions</span> *</span>
            </Chk>
            <Chk checked={form.marketing} onChange={() => setForm({ ...form, marketing: !form.marketing })}>
              <span style={{ fontSize: 14, color: "var(--muted)" }}>Send me Iceland travel tips and exclusive offers</span>
            </Chk>
          </div>

          <Btn variant="primary" size="lg" block iconEnd={Icons.ArrowR} disabled={submitting} type="submit">
            {submitting ? "Processing…" : "Confirm & Book"}
          </Btn>
        </form>

        <div className="summary">
          <PriceSummaryCard
            car={car} days={days} qty={qty}
            cta={submitting ? "Processing…" : "Confirm & Book"}
            onCta={() => submit({ preventDefault: () => {} })}
            note={
              <div className="row center gap8" style={{ marginTop: 16, padding: "13px 16px", background: "var(--inner)", borderRadius: "var(--r-sm)", fontSize: 13.5 }}>
                <Icons.Info size={16} style={{ color: "var(--primary)", flex: "none" }} />
                <span className="muted">Pickup at {search.pickupTime} · {search.pickupLoc.name}</span>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}

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

Object.assign(window, { CheckoutScreen, ConfirmScreen });
