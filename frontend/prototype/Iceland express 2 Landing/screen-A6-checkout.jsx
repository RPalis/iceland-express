// screen-A6-checkout.jsx — A6 Checkout
// Figma: A6-Checkout (slim driver form + 3DS at payment)
const { useState: useS3, useEffect: useEffectS3 } = React;

/* ============================================================
   CHECKOUT
   ============================================================ */
function CheckoutScreen({ search, setSearch, car, days, qty, go, vertical, authSession }) {
  const v = vertical || window.carsConfig;
  const { total, base } = computeTotals(car, days, qty);
  const [pay, setPay] = useS3("full");
  const [form, setForm] = useS3({
    first: "", last: "", email: "", phone: "",
    card: "", expiry: "", cvv: "", cardName: "",
    agree: false, marketing: false,
  });
  const [submitting, setSubmitting] = useS3(false);
  const [sameAsDriver, setSameAsDriver] = useS3(false);
  const [payMethod, setPayMethod] = useS3("card");
  const [show3ds, setShow3ds] = useS3(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target ? e.target.value : e });

  useEffectS3(() => {
    if (authSession?.mobile && !form.phone) {
      setForm((f) => ({ ...f, phone: authSession.mobile }));
    }
  }, [authSession?.mobile]);

  const PAY_METHODS = [
    { id: "card",      label: "Card",       icon: "Card" },
    { id: "paypal",    label: "PayPal",     icon: "Card" },
    { id: "applepay",  label: "Apple Pay",  icon: "Card" },
    { id: "googlepay", label: "Google Pay", icon: "Card" },
  ];

  function toggleSameAsDriver() {
    const next = !sameAsDriver;
    setSameAsDriver(next);
    setForm(f => ({ ...f, cardName: next ? (f.first + " " + f.last).trim() : "" }));
  }

  const allPayOpts = [
    { id: "full",    label: "Pay in Full",    desc: "One payment now",           amt: total,                      tag: null },
    { id: "deposit", label: "Pay Deposit",    desc: "50% now, rest on pickup",   amt: Math.ceil(total * 0.50),    tag: "Flexible" },
    { id: "pickup",  label: "Pay at Pickup",  desc: "No charge today",           amt: 0,                          tag: "Free Today" },
  ];
  const payOpts = v.payment.hasPickupOption
    ? allPayOpts
    : allPayOpts.filter(o => o.id !== "pickup");
  const dueToday = (payOpts.find(o => o.id === pay) || payOpts[0]).amt;
  const ctaLabel = "Complete Booking — " + (dueToday === 0 ? "€0" : eur(dueToday));
  const needs3ds = pay !== "pickup" && payMethod === "card" && dueToday > 0;

  function completeBooking() {
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); go("confirm"); }, 900);
  }

  function submit(e) {
    e.preventDefault();
    if (!form.agree) { alert("Please accept the terms to continue."); return; }
    if (needs3ds) {
      setShow3ds(true);
      return;
    }
    completeBooking();
  }

  function on3dsConfirm() {
    setShow3ds(false);
    completeBooking();
  }

  function on3dsCancel() {
    setShow3ds(false);
    alert("Authentication cancelled — your booking was not created.");
  }

  return (
    <div className="flow shell" style={{ paddingTop: 24, paddingBottom: 40 }}>
      <TripBarEditable search={search} setSearch={setSearch} />
      <StepHead screen="checkout" go={go} />
      <InfoBanner variant="success" icon="Shield" style={{ marginTop: 12 }}>{v.checkout.protectionBanner}</InfoBanner>

      <div className="layout-2col" style={{ marginTop: 20 }}>
        <form className="col gap20" onSubmit={submit} noValidate>
          <div className="card card-pad">
            <h3 className="h2" style={{ marginBottom: 20 }}>{v.traveller.sectionLabel}</h3>
            <div className="form-grid">
              <FormField label="First name" required><Fld type="text" placeholder="Anna" value={form.first} onChange={set("first")} /></FormField>
              <FormField label="Last name" required><Fld type="text" placeholder="Sigurðardóttir" value={form.last} onChange={set("last")} /></FormField>
              <FormField label="Email address" required span><Fld type="email" placeholder="anna@example.com" value={form.email} onChange={set("email")} /></FormField>
              <FormField label="Mobile number" required helper="Verified by SMS — must match the number you confirmed">
                <Fld type="tel" placeholder="+354 555 0100" value={form.phone} onChange={set("phone")} readOnly={!!authSession?.mobile} style={authSession?.mobile ? { opacity: 0.85 } : {}} />
              </FormField>
            </div>
            {search.ageConfirmed && (
              <p className="dim" style={{ fontSize: 13, marginTop: 14, marginBottom: 0 }}>
                Age 25–70 confirmed on search — date of birth not required at checkout.
              </p>
            )}
          </div>

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

          {pay !== "pickup" && (
            <div className="card card-pad">
              <div className="row between center" style={{ marginBottom: 16 }}>
                <h3 className="h2">Payment Method</h3>
                <div className="row center gap6 muted" style={{ fontSize: 13 }}>
                  <Icons.Lock size={16} style={{ color: "var(--success)" }} /> SSL secured
                </div>
              </div>
              <Tab items={PAY_METHODS} active={payMethod} onChange={setPayMethod} style={{ marginBottom: 20 }} />

              {payMethod === "card" ? (
                <>
                  <div className="form-grid">
                    <FormField label="Card number" required span><Fld type="text" placeholder="4242 4242 4242 4242" maxLength={19} value={form.card} onChange={set("card")} /></FormField>
                    <FormField label="Expiry" required><Fld type="text" placeholder="MM/YY" maxLength={5} value={form.expiry} onChange={set("expiry")} /></FormField>
                    <FormField label="CVV" required><Fld type="text" placeholder="•••" maxLength={4} value={form.cvv} onChange={set("cvv")} /></FormField>
                    <FormField label="Name on card" required span>
                      <Fld type="text" placeholder="Anna Sigurðardóttir" value={form.cardName} onChange={set("cardName")} readOnly={sameAsDriver} style={sameAsDriver ? { opacity: 0.6 } : {}} />
                      <div style={{ marginTop: 8 }}>
                        <Chk checked={sameAsDriver} onChange={toggleSameAsDriver}>
                          <span style={{ fontSize: 13, color: "var(--muted)" }}>Same as driver</span>
                        </Chk>
                      </div>
                    </FormField>
                  </div>
                  {needs3ds && (
                    <InfoBanner variant="info" icon="Shield" style={{ marginTop: 16 }}>
                      Your bank may ask you to confirm this payment (3D Secure). This is separate from the SMS code you entered earlier.
                    </InfoBanner>
                  )}
                </>
              ) : (
                <InfoBanner variant="info">
                  {PAY_METHODS.find(m => m.id === payMethod).label} is coming soon — please pay by card for now.
                </InfoBanner>
              )}
            </div>
          )}

          <div className="card card-pad col gap12">
            <Chk checked={form.agree} onChange={() => setForm({ ...form, agree: !form.agree })}>
              <span style={{ fontSize: 14 }}>I agree to the <span style={{ color: "var(--primary-strong)" }}>Terms of Service</span> and <span style={{ color: "var(--primary-strong)" }}>{v.legal.conditionsLabel}</span> *</span>
            </Chk>
            <Chk checked={form.marketing} onChange={() => setForm({ ...form, marketing: !form.marketing })}>
              <span style={{ fontSize: 14, color: "var(--muted)" }}>{v.legal.marketingCopy}</span>
            </Chk>
          </div>

          <Btn variant="primary" size="lg" block iconEnd={Icons.ArrowR} disabled={submitting} type="submit">
            {submitting ? "Processing…" : ctaLabel}
          </Btn>
          <TrustBadges variant="checkout" style={{ marginTop: 4 }} />
        </form>

        <div className="summary">
          <PriceSummaryCard
            car={car} days={days} qty={qty}
            cta={submitting ? "Processing…" : ctaLabel}
            onCta={() => submit({ preventDefault: () => {} })}
            note={
              <div className="row center gap8" style={{ marginTop: 16, padding: "13px 16px", background: "var(--inner)", borderRadius: "var(--r-sm)", fontSize: 13.5 }}>
                <Icons.Info size={16} style={{ color: "var(--primary)", flex: "none" }} />
                <span className="muted">{v.checkout.summaryNote(search)}</span>
              </div>
            }
          />
        </div>
      </div>

      <IEDialog.Root open={show3ds} onOpenChange={setShow3ds}>
        <IEDialog.Content style={{ maxWidth: 420 }}>
          <div className="row between center" style={{ marginBottom: 8 }}>
            <IEDialog.Title style={{ marginBottom: 0 }}>Confirm with your bank</IEDialog.Title>
            <IEDialog.Close />
          </div>
          <IEDialog.Description>
            3D Secure — approve {eur(dueToday)} in your banking app or enter the code your bank sends.
          </IEDialog.Description>
          <div style={{ padding: "20px 16px", background: "var(--inner)", borderRadius: "var(--r-sm)", marginBottom: 20, textAlign: "center" }}>
            <Icons.Shield size={36} style={{ color: "var(--primary-strong)", marginBottom: 12 }} />
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>{eur(dueToday)}</div>
            <p className="muted" style={{ fontSize: 13, margin: 0 }}>Iceland Express · Card ending 4242</p>
          </div>
          <Btn variant="primary" size="lg" block onClick={on3dsConfirm} style={{ marginBottom: 10 }}>
            Approve payment
          </Btn>
          <Btn variant="ghost" block onClick={on3dsCancel}>Cancel</Btn>
        </IEDialog.Content>
      </IEDialog.Root>
    </div>
  );
}

Object.assign(window, { CheckoutScreen });
