// screen-A6-checkout.jsx — A6 Checkout
// Figma: A6-Checkout
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


Object.assign(window, { CheckoutScreen });