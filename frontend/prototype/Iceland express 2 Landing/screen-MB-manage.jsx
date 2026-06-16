// screen-MB-manage.jsx — MB Manage Booking
// Figma: Manage Booking (guest mode)

const { useState: useS4, useRef: useRefS4, useEffect: useEffectS4 } = React;

/* ── demo booking fixture ── */
const DEMO_BOOKING = {
  ref: "ICE-7X9K",
  email: "anna@example.com",
  car: CARS[1], // Toyota RAV4
  pickupLoc: LOCATIONS[0],
  dropoffLoc: LOCATIONS[0],
  pickupDate: (() => { const d = new Date(); d.setDate(d.getDate() + 14); d.setHours(0,0,0,0); return d; })(),
  returnDate: (() => { const d = new Date(); d.setDate(d.getDate() + 19); d.setHours(0,0,0,0); return d; })(),
  pickupTime: "10:00",
  returnTime: "10:00",
  qty: { gps: 1, wifi: 1 },
  status: "confirmed",
  paid: "full",
  bookedOn: new Date(Date.now() - 2 * 86400000),
};

/* ── cancellation policy ── */
function cancellationFee(booking) {
  const now = new Date();
  const hoursToPickup = (booking.pickupDate - now) / 3600000;
  if (hoursToPickup > 48) return { label: "Free Cancellation", fee: 0, pct: 0 };
  if (hoursToPickup > 24) return { label: "15% cancellation fee", fee: Math.ceil(computeTotals(booking.car, daysBetween(booking.pickupDate, booking.returnDate), booking.qty).total * 0.15), pct: 15 };
  return { label: "25% cancellation fee", fee: Math.ceil(computeTotals(booking.car, daysBetween(booking.pickupDate, booking.returnDate), booking.qty).total * 0.25), pct: 25 };
}

/* ============================================================
   MANAGE BOOKING — outer router
   ============================================================ */
function ManageBookingScreen({ go }) {
  const [sub, setSub] = useS4("lookup");   // lookup | found | changeDates | changeLocation | changeExtras | cancelConfirm | cancelled | updated
  const [booking, setBooking] = useS4(null);
  const [draftDates, setDraftDates] = useS4(null);
  const [draftLoc, setDraftLoc] = useS4(null);
  const [draftQty, setDraftQty] = useS4(null);

  function applyUpdate(patch) {
    setBooking({ ...booking, ...patch });
    setSub("updated");
  }

  return (
    <div className="flow" style={{ paddingBottom: 60 }}>
      {sub === "lookup" && <ManageLookup onFound={(b) => { setBooking(b); setSub("found"); }} goHome={() => go("home")} />}
      {sub === "found" && booking && <ManageFound booking={booking} setSub={setSub} goHome={() => go("home")} />}
      {sub === "changeDates" && booking && (
        <ManageChangeDates
          booking={booking}
          draft={draftDates || { pickupDate: booking.pickupDate, returnDate: booking.returnDate, pickupTime: booking.pickupTime, returnTime: booking.returnTime }}
          setDraft={setDraftDates}
          onBack={() => setSub("found")}
          onSave={(d) => applyUpdate(d)}
        />
      )}
      {sub === "changeLocation" && booking && (
        <ManageChangeLocation
          booking={booking}
          draft={draftLoc || { pickupLoc: booking.pickupLoc, dropoffLoc: booking.dropoffLoc }}
          setDraft={setDraftLoc}
          onBack={() => setSub("found")}
          onSave={(d) => applyUpdate(d)}
        />
      )}
      {sub === "changeExtras" && booking && (
        <ManageChangeExtras
          booking={booking}
          draft={draftQty || { ...booking.qty }}
          setDraft={setDraftQty}
          onBack={() => setSub("found")}
          onSave={(q) => applyUpdate({ qty: q })}
        />
      )}
      {sub === "cancelConfirm" && booking && (
        <ManageCancelConfirm
          booking={booking}
          onBack={() => setSub("found")}
          onConfirm={() => setSub("cancelled")}
        />
      )}
      {sub === "cancelled" && <ManageCancelled goHome={() => go("home")} />}
      {sub === "updated" && booking && <ManageUpdated booking={booking} onBack={() => setSub("found")} goHome={() => go("home")} />}
    </div>
  );
}

/* ============================================================
   1. LOOKUP
   ============================================================ */
function ManageLookup({ onFound, goHome }) {
  const [ref, setRef] = useS4("");
  const [email, setEmail] = useS4("");
  const [err, setErr] = useS4("");
  const [loading, setLoading] = useS4(false);

  function submit(e) {
    e.preventDefault();
    setErr("");
    if (!ref.trim() || !email.trim()) { setErr("Please enter your booking reference and email address."); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Demo: any non-empty ref+email resolves — hint shown below
      const demo = { ...DEMO_BOOKING, ref: ref.trim().toUpperCase(), email: email.trim().toLowerCase() };
      onFound(demo);
    }, 900);
  }

  return (
    <div className="shell" style={{ paddingTop: 60, paddingBottom: 60, maxWidth: 520, margin: "0 auto" }}>
      <div className="link" style={{ marginBottom: 24 }} onClick={goHome}><Icons.ArrowL size={16} /> Back to home</div>
      <div className="col gap6" style={{ marginBottom: 32 }}>
        <div className="pill" style={{ alignSelf: "flex-start" }}><Icons.Doc size={14} /> Guest mode</div>
        <h1 className="h1" style={{ fontSize: 32 }}>Manage your booking</h1>
        <p className="muted" style={{ fontSize: 15, lineHeight: 1.5, marginTop: 4 }}>Enter your booking reference and email address to access your reservation.</p>
      </div>

      <form className="card card-pad col gap18" onSubmit={submit} noValidate>
        <FormField label="Booking reference" required helper="Found in your confirmation email subject line.">
          <Fld type="text" placeholder="e.g. ICE-7X9K" value={ref} onChange={(e) => setRef(e.target.value)} style={{ fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", fontSize: 18 }} />
        </FormField>
        <FormField label="Email address used at booking" required>
          <Fld type="email" placeholder="anna@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormField>

        {err && <InfoBanner variant="danger" icon="Info">{err}</InfoBanner>}

        <Btn variant="primary" size="lg" block icon={loading ? null : Icons.Search} disabled={loading} type="submit">
          {loading ? "Looking up…" : "Find My Booking"}
        </Btn>

        <div className="row center gap8" style={{ justifyContent: "center", color: "var(--dim)", fontSize: 13 }}>
          <Icons.Lock size={14} style={{ color: "var(--success)" }} /> Your data is encrypted and secure
        </div>
      </form>

      <div className="surface" style={{ marginTop: 20, padding: "14px 18px", display: "flex", alignItems: "flex-start", gap: 10 }}>
        <Icons.Info size={16} style={{ color: "var(--primary)", flex: "none", marginTop: 2 }} />
        <p className="dim" style={{ fontSize: 13, lineHeight: 1.5, margin: 0 }}>
          <strong style={{ color: "var(--muted)" }}>Demo tip:</strong> Enter any booking reference and email to load a sample booking. Try <strong style={{ color: "var(--primary-strong)" }}>ICE-7X9K</strong> and <strong style={{ color: "var(--primary-strong)" }}>anna@example.com</strong>.
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   2. BOOKING FOUND — overview + actions
   ============================================================ */
function ManageFound({ booking, setSub, goHome }) {
  const days = daysBetween(booking.pickupDate, booking.returnDate);
  const { total, lines } = computeTotals(booking.car, days, booking.qty);
  const policy = cancellationFee(booking);

  const actions = [
    {
      id: "changeDates",
      icon: "Calendar",
      title: "Change dates",
      desc: "Pick new pickup or return dates.",
      color: "var(--primary-tint)",
      textColor: "var(--primary-strong)",
    },
    {
      id: "changeLocation",
      icon: "Pin",
      title: "Change location",
      desc: "Update pickup or dropoff point.",
      color: "var(--primary-tint)",
      textColor: "var(--primary-strong)",
    },
    {
      id: "changeExtras",
      icon: "Sparkle",
      title: "Modify add-ons",
      desc: "Add or remove GPS, seats, WiFi…",
      color: "var(--primary-tint)",
      textColor: "var(--primary-strong)",
    },
    {
      id: "cancelConfirm",
      icon: "X",
      title: "Cancel booking",
      desc: policy.fee === 0 ? "Free — cancellation window still open." : `${policy.label} applies.`,
      color: "rgba(239,68,68,0.1)",
      textColor: "var(--danger)",
      danger: true,
    },
  ];

  return (
    <div className="shell" style={{ paddingTop: 40, paddingBottom: 60 }}>
      <div className="link" style={{ marginBottom: 24 }} onClick={goHome}><Icons.ArrowL size={16} /> Back to home</div>

      {/* Header */}
      <div className="row between center wrap gap12" style={{ marginBottom: 28 }}>
        <div className="col gap6">
          <div className="row center gap10">
            <span className="badge badge-success"><Icons.Check size={12} /> Confirmed</span>
            <span className="badge badge-glass"><Icons.Doc size={12} /> Ref: {booking.ref}</span>
          </div>
          <h1 className="h1" style={{ fontSize: 30 }}>Your booking</h1>
          <p className="muted" style={{ fontSize: 14 }}>Booked on {fmtDateLong(booking.bookedOn)} · {booking.email}</p>
        </div>
        {policy.fee === 0 && (
          <span className="badge badge-success" style={{ fontSize: 13, padding: "8px 14px" }}>
            <Icons.Shield size={14} /> Free cancellation available
          </span>
        )}
      </div>

      <div className="layout-2col" style={{ alignItems: "start" }}>
        <div className="col gap20">
          {/* Car summary */}
          <div className="card card-pad row gap18" style={{ alignItems: "center" }}>
            <div style={{ width: 120, borderRadius: "var(--r-md)", overflow: "hidden", flex: "none", aspectRatio: "4/3", background: "var(--inner)" }}>
              <img src={booking.car.img} alt={booking.car.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div className="grow col gap6">
              <div className="eyebrow">{booking.car.catLabel} · {booking.car.provider}</div>
              <h3 className="h3" style={{ fontSize: 20 }}>{booking.car.year} {booking.car.name}</h3>
              <div className="row center gap8">
                <span className="badge badge-outline"><Icons.Gear size={11} /> {booking.car.transmission}</span>
                <span className="badge badge-outline"><Icons.Users size={11} /> {booking.car.seats} seats</span>
                <span className="badge badge-outline"><Icons.Drive size={11} /> {booking.car.drive}</span>
              </div>
            </div>
          </div>

          {/* Trip details */}
          <div className="card card-pad">
            <h3 className="h3" style={{ marginBottom: 16 }}>Trip Details</h3>
            <div className="col" style={{ gap: 14 }}>
              {[
                { ico: "Pin", label: "Pickup", val: booking.pickupLoc.name, sub: fmtDateLong(booking.pickupDate) + " · " + booking.pickupTime },
                { ico: "Pin", label: "Return", val: booking.dropoffLoc.name, sub: fmtDateLong(booking.returnDate) + " · " + booking.returnTime },
                { ico: "Calendar", label: "Duration", val: days + " days", sub: fmtDate(booking.pickupDate) + " → " + fmtDate(booking.returnDate) },
              ].map((row) => {
                const I = Icons[row.ico];
                return (
                  <div key={row.label} className="row center gap14" style={{ paddingBottom: 14, borderBottom: "1px solid var(--border)" }}>
                    <span style={{ width: 38, height: 38, display: "grid", placeItems: "center", borderRadius: "var(--r-sm)", background: "var(--primary-tint)", color: "var(--primary-strong)", flex: "none" }}><I size={18} /></span>
                    <div>
                      <div className="muted" style={{ fontSize: 12 }}>{row.label}</div>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{row.val}</div>
                      <div className="muted" style={{ fontSize: 13 }}>{row.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Extras */}
          {lines.length > 0 && (
            <div className="card card-pad">
              <h3 className="h3" style={{ marginBottom: 14 }}>Add-ons</h3>
              <div className="col gap10">
                {lines.map((l) => (
                  <div key={l.id} className="row between center" style={{ fontSize: 14 }}>
                    <span className="row center gap8 muted"><Icons.Check size={14} style={{ color: "var(--success)" }} />{l.qty > 1 ? l.qty + "× " : ""}{l.name}</span>
                    <span style={{ fontWeight: 600 }}>{eur(l.sum)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column: price + actions */}
        <div className="col gap16">
          {/* Price */}
          <div className="card card-pad">
            <div className="row between center">
              <span className="h3">Total paid</span>
              <span className="price-amt" style={{ color: "var(--primary-strong)", fontSize: 28 }}>{eur(total)}</span>
            </div>
            <hr className="divider" style={{ margin: "14px 0" }} />
            <div className="col gap8">
              <div className="row between" style={{ fontSize: 14 }}><span className="muted">{days} × {eur(booking.car.perDay)}/day</span><span style={{ fontWeight: 600 }}>{eur(booking.car.perDay * days)}</span></div>
              {lines.map((l) => (
                <div key={l.id} className="row between" style={{ fontSize: 13 }}>
                  <span className="muted">{l.qty > 1 ? l.qty + "× " : ""}{l.name}</span>
                  <span style={{ fontWeight: 600 }}>{eur(l.sum)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action cards */}
          <h3 className="h3" style={{ fontSize: 16, marginBottom: -4 }}>What would you like to change?</h3>
          {actions.map((a) => (
              <ManageActionCard
                key={a.id}
                icon={a.icon}
                title={a.title}
                desc={a.desc}
                color={a.color}
                textColor={a.textColor}
                danger={a.danger}
                onClick={() => setSub(a.id)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   3. CHANGE DATES
   ============================================================ */
function ManageChangeDates({ booking, draft, setDraft, onBack, onSave }) {
  const [calMode, setCalMode] = useS4("pickup");
  const [timeOpen, setTimeOpen] = useS4(null);
  const timeRef = useOutside(() => setTimeOpen(null));
  const days = daysBetween(draft.pickupDate, draft.returnDate);
  const origDays = daysBetween(booking.pickupDate, booking.returnDate);
  const { total: newTotal } = computeTotals(booking.car, days, booking.qty);
  const { total: origTotal } = computeTotals(booking.car, origDays, booking.qty);
  const diff = newTotal - origTotal;

  function pickDate(d) {
    if (calMode === "pickup") {
      const patch = { pickupDate: d };
      if (draft.returnDate <= d) { const nd = new Date(d); nd.setDate(nd.getDate() + 1); patch.returnDate = nd; }
      setDraft({ ...draft, ...patch });
      setCalMode("return");
    } else {
      if (d <= draft.pickupDate) setDraft({ ...draft, pickupDate: d });
      else setDraft({ ...draft, returnDate: d });
    }
  }

  return (
    <div className="shell" style={{ paddingTop: 36, paddingBottom: 60, maxWidth: 720, margin: "0 auto" }}>
      <div className="link" style={{ marginBottom: 22 }} onClick={onBack}><Icons.ArrowL size={16} /> Back to booking</div>
      <h1 className="h1" style={{ fontSize: 28, marginBottom: 6 }}>Change dates</h1>
      <p className="muted" style={{ fontSize: 14, marginBottom: 28 }}>Select new pickup and return dates. Price will update automatically.</p>

      <div className="layout-2col" style={{ alignItems: "start" }}>
        <div className="col gap16">
          {/* Calendar */}
          <div className="card card-pad">
            <div className="segmented accent" style={{ width: "100%", marginBottom: 18 }}>
              <button className={calMode === "pickup" ? "on" : ""} style={{ flex: 1 }} onClick={() => setCalMode("pickup")}>Pickup date</button>
              <button className={calMode === "return" ? "on" : ""} style={{ flex: 1 }} onClick={() => setCalMode("return")}>Return date</button>
            </div>
            <Calendar pickupDate={draft.pickupDate} returnDate={draft.returnDate} mode={calMode} onPick={pickDate} />
          </div>

          {/* Times */}
          <div className="card card-pad row gap16" ref={timeRef}>
            {[
              { label: "Pickup time", key: "pickupTime" },
              { label: "Return time", key: "returnTime" },
            ].map((t) => (
              <div key={t.key} style={{ flex: 1, position: "relative" }}>
                <label className="field-label">{t.label}</label>
                <button
                  className={"sb-btn" + (timeOpen === t.key ? " open" : "")}
                  style={{ background: "var(--inner)", border: "1px solid var(--border)", borderRadius: "var(--r-sm)", width: "100%", justifyContent: "space-between", padding: "11px 14px" }}
                  onClick={() => setTimeOpen(timeOpen === t.key ? null : t.key)}
                >
                  <span style={{ fontWeight: 600, fontSize: 15 }}>{draft[t.key]}</span>
                  <Icons.Chevron size={14} style={{ color: "var(--dim)" }} />
                </button>
                {timeOpen === t.key && (
                  <div className="pop" style={{ top: "calc(100% + 8px)", left: 0 }}>
                    <TimeList value={draft[t.key]} onPick={(v) => { setDraft({ ...draft, [t.key]: v }); setTimeOpen(null); }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="card card-pad col gap14">
          <h3 className="h3">Summary</h3>
          <div className="col gap10" style={{ fontSize: 14 }}>
            <div className="row between"><span className="muted">Original dates</span><span>{fmtDate(booking.pickupDate)} → {fmtDate(booking.returnDate)}</span></div>
            <div className="row between"><span className="muted">New dates</span><span style={{ color: "var(--primary-strong)", fontWeight: 700 }}>{fmtDate(draft.pickupDate)} → {fmtDate(draft.returnDate)}</span></div>
            <hr className="divider" />
            <div className="row between"><span className="muted">Duration</span><span>{days} day{days !== 1 ? "s" : ""}</span></div>
            <div className="row between"><span className="muted">Pickup time</span><span>{draft.pickupTime}</span></div>
            <div className="row between"><span className="muted">Return time</span><span>{draft.returnTime}</span></div>
            <hr className="divider" />
            <div className="row between center">
              <span className="muted">New total</span>
              <span className="price-amt" style={{ fontSize: 22, color: "var(--primary-strong)" }}>{eur(newTotal)}</span>
            </div>
            {diff !== 0 && (
              <div className="row between center" style={{ fontSize: 13 }}>
                <span className="muted">Price change</span>
                <span style={{ fontWeight: 700, color: diff > 0 ? "var(--warn)" : "var(--success)" }}>{diff > 0 ? "+" : ""}{eur(diff)}</span>
              </div>
            )}
          </div>
          <button className="btn btn-primary btn-block" onClick={() => onSave({ pickupDate: draft.pickupDate, returnDate: draft.returnDate, pickupTime: draft.pickupTime, returnTime: draft.returnTime })}>
            Save changes <Icons.Check size={16} />
          </button>
          <button className="btn btn-ghost btn-block btn-sm" onClick={onBack}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   4. CHANGE LOCATION
   ============================================================ */
function ManageChangeLocation({ booking, draft, setDraft, onBack, onSave }) {
  const [activeField, setActiveField] = useS4(null);
  const ref = useOutside(() => setActiveField(null));

  const field = (key, label, icon) => {
    const I = Icons[icon];
    return (
      <div style={{ position: "relative" }}>
        <div className="field-label">{label}</div>
        <button
          className={"sb-btn" + (activeField === key ? " open" : "")}
          style={{ background: "var(--inner)", border: "1px solid var(--border)", borderRadius: "var(--r-sm)", width: "100%", padding: "11px 14px", gap: 10 }}
          onClick={() => setActiveField(activeField === key ? null : key)}
        >
          <I size={18} style={{ color: "var(--primary)", flex: "none" }} />
          <div className="col" style={{ alignItems: "flex-start", minWidth: 0 }}>
            <span style={{ fontWeight: 600, fontSize: 15 }}>{draft[key].name}</span>
            <span className="dim" style={{ fontSize: 12 }}>{draft[key].sub}</span>
          </div>
          <Icons.Chevron size={14} style={{ color: "var(--dim)", marginLeft: "auto" }} />
        </button>
        {activeField === key && (
          <div className="pop" style={{ top: "calc(100% + 8px)", left: 0, zIndex: 70 }}>
            <LocationList value={draft[key]} onPick={(l) => { setDraft({ ...draft, [key]: l }); setActiveField(null); }} />
          </div>
        )}
      </div>
    );
  };

  const changed = draft.pickupLoc.id !== booking.pickupLoc.id || draft.dropoffLoc.id !== booking.dropoffLoc.id;

  return (
    <div className="shell" style={{ paddingTop: 36, paddingBottom: 60, maxWidth: 560, margin: "0 auto" }}>
      <div className="link" style={{ marginBottom: 22 }} onClick={onBack}><Icons.ArrowL size={16} /> Back to booking</div>
      <h1 className="h1" style={{ fontSize: 28, marginBottom: 6 }}>Change location</h1>
      <p className="muted" style={{ fontSize: 14, marginBottom: 28 }}>Update your pickup or dropoff point. Subject to availability.</p>

      <div className="card card-pad col gap20" ref={ref}>
        {field("pickupLoc", "Pickup location", "Pin")}
        <div className="row center gap10" style={{ color: "var(--dim)" }}>
          <hr className="divider" style={{ flex: 1 }} />
          <Icons.ArrowR size={18} />
          <hr className="divider" style={{ flex: 1 }} />
        </div>
        {field("dropoffLoc", "Return / dropoff location", "Pin")}

        {changed && (
          <div className="row center gap8" style={{ padding: "12px 14px", background: "var(--primary-tint)", borderRadius: "var(--r-sm)", fontSize: 13.5 }}>
            <Icons.Info size={15} style={{ color: "var(--primary)", flex: "none" }} />
            <span className="muted">Location changes are subject to provider confirmation. You'll receive an email within 2 hours.</span>
          </div>
        )}

        <button className="btn btn-primary btn-lg btn-block" onClick={() => onSave({ pickupLoc: draft.pickupLoc, dropoffLoc: draft.dropoffLoc })} disabled={!changed}>
          Save location <Icons.Check size={16} />
        </button>
        <button className="btn btn-ghost btn-block btn-sm" onClick={onBack}>Cancel</button>
      </div>
    </div>
  );
}

/* ============================================================
   5. CHANGE EXTRAS
   ============================================================ */
function ManageChangeExtras({ booking, draft, setDraft, onBack, onSave }) {
  const origDays = daysBetween(booking.pickupDate, booking.returnDate);
  const { total: origTotal } = computeTotals(booking.car, origDays, booking.qty);
  const { total: newTotal, lines: newLines } = computeTotals(booking.car, origDays, draft);
  const diff = newTotal - origTotal;

  return (
    <div className="shell" style={{ paddingTop: 36, paddingBottom: 60 }}>
      <div className="link" style={{ marginBottom: 22 }} onClick={onBack}><Icons.ArrowL size={16} /> Back to booking</div>
      <h1 className="h1" style={{ fontSize: 28, marginBottom: 6 }}>Modify add-ons</h1>
      <p className="muted" style={{ fontSize: 14, marginBottom: 28 }}>Add or remove extras from your booking.</p>

      <div className="layout-2col" style={{ alignItems: "start" }}>
        <div className="extras-grid">
          {EXTRAS.map((e) => (
            <ExtraCardV2 key={e.id} extra={e} qty={draft[e.id] || 0} onChange={(v) => setDraft({ ...draft, [e.id]: v })} />
          ))}
        </div>

        <div className="summary card card-pad col gap14">
          <h3 className="h3">Price update</h3>
          {newLines.length === 0 ? (
            <p className="muted" style={{ fontSize: 14 }}>No add-ons selected.</p>
          ) : (
            <div className="col gap10">
              {newLines.map((l) => (
                <div key={l.id} className="row between" style={{ fontSize: 13.5 }}>
                  <span className="muted">{l.qty > 1 ? l.qty + "× " : ""}{l.name}</span>
                  <span style={{ fontWeight: 600 }}>{eur(l.sum)}</span>
                </div>
              ))}
            </div>
          )}
          <hr className="divider" />
          <div className="row between center">
            <span className="h3">New total</span>
            <span className="price-amt" style={{ fontSize: 24, color: "var(--primary-strong)" }}>{eur(newTotal)}</span>
          </div>
          {diff !== 0 && (
            <div className="row between center" style={{ fontSize: 13 }}>
              <span className="muted">Change</span>
              <span style={{ fontWeight: 700, color: diff > 0 ? "var(--warn)" : "var(--success)" }}>{diff > 0 ? "+" : ""}{eur(diff)}</span>
            </div>
          )}
          <button className="btn btn-primary btn-block" onClick={() => onSave(draft)}>Save add-ons <Icons.Check size={16} /></button>
          <button className="btn btn-ghost btn-block btn-sm" onClick={onBack}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   6. CANCEL CONFIRM
   ============================================================ */
function ManageCancelConfirm({ booking, onBack, onConfirm }) {
  const policy = cancellationFee(booking);
  const days = daysBetween(booking.pickupDate, booking.returnDate);
  const { total } = computeTotals(booking.car, days, booking.qty);
  const refundAmt = total - policy.fee;

  return (
    <div className="shell" style={{ paddingTop: 36, paddingBottom: 60, maxWidth: 540, margin: "0 auto" }}>
      <div className="link" style={{ marginBottom: 22 }} onClick={onBack}><Icons.ArrowL size={16} /> Back to booking</div>

      <div className="col gap4" style={{ marginBottom: 28 }}>
        <div style={{ width: 52, height: 52, display: "grid", placeItems: "center", borderRadius: "50%", background: "rgba(239,68,68,0.12)", color: "var(--danger)", marginBottom: 12 }}>
          <Icons.Info size={26} />
        </div>
        <h1 className="h1" style={{ fontSize: 28 }}>Cancel this booking?</h1>
        <p className="muted" style={{ fontSize: 15, lineHeight: 1.5, marginTop: 6 }}>This action cannot be undone. Please review the cancellation policy below.</p>
      </div>

      <div className="card card-pad col gap16">
        {/* Policy */}
        <div style={{ padding: "14px 16px", background: policy.fee === 0 ? "rgba(52,211,153,0.1)" : "rgba(251,191,36,0.1)", borderRadius: "var(--r-sm)", border: `1px solid ${policy.fee === 0 ? "rgba(52,211,153,0.3)" : "rgba(251,191,36,0.3)"}` }}>
          <div className="row center gap8" style={{ fontWeight: 700, fontSize: 15, color: policy.fee === 0 ? "var(--success)" : "var(--warn)" }}>
            <Icons.Shield size={17} /> {policy.label}
          </div>
          {policy.fee > 0 && <p className="muted" style={{ fontSize: 13, marginTop: 6 }}>Your pickup is within {policy.pct === 15 ? "48" : "24"} hours.</p>}
        </div>

        <div className="col gap10">
          <div className="row between" style={{ fontSize: 14 }}><span className="muted">Total paid</span><span style={{ fontWeight: 600 }}>{eur(total)}</span></div>
          {policy.fee > 0 && <div className="row between" style={{ fontSize: 14 }}><span className="muted">Cancellation fee</span><span style={{ fontWeight: 600, color: "var(--warn)" }}>−{eur(policy.fee)}</span></div>}
          <hr className="divider" />
          <div className="row between center">
            <span style={{ fontWeight: 700 }}>Refund amount</span>
            <span className="price-amt" style={{ fontSize: 24, color: policy.fee === 0 ? "var(--success)" : "var(--warn)" }}>{eur(refundAmt)}</span>
          </div>
          <p className="dim" style={{ fontSize: 13 }}>Refund typically appears on your card within 5–7 business days.</p>
        </div>

        <button
          className="btn btn-block btn-lg"
          style={{ background: "rgba(239,68,68,0.12)", color: "var(--danger)", border: "1.5px solid rgba(239,68,68,0.35)" }}
          onClick={onConfirm}
        >
          <Icons.X size={17} /> Yes, cancel my booking
        </button>
        <button className="btn btn-primary btn-block" onClick={onBack}>Keep my booking</button>
      </div>
    </div>
  );
}

/* ============================================================
   7a. CANCELLED success
   ============================================================ */
function ManageCancelled({ goHome }) {
  return (
    <div className="shell" style={{ paddingTop: 60, textAlign: "center", maxWidth: 480, margin: "0 auto" }}>
      <div style={{ width: 68, height: 68, borderRadius: "50%", background: "rgba(52,211,153,0.15)", display: "grid", placeItems: "center", color: "var(--success)", margin: "0 auto 20px", boxShadow: "0 0 0 10px rgba(52,211,153,0.07)" }}>
        <Icons.Check size={30} />
      </div>
      <h1 className="h1" style={{ fontSize: 30 }}>Booking cancelled</h1>
      <p className="muted" style={{ fontSize: 16, lineHeight: 1.5, margin: "12px 0 32px" }}>Your booking has been cancelled. A confirmation email has been sent and your refund is on the way.</p>
      <button className="btn btn-primary btn-lg" onClick={goHome}><Icons.ArrowL size={16} /> Back to home</button>
    </div>
  );
}

/* ============================================================
   7b. UPDATED success
   ============================================================ */
function ManageUpdated({ booking, onBack, goHome }) {
  return (
    <div className="shell" style={{ paddingTop: 60, textAlign: "center", maxWidth: 480, margin: "0 auto" }}>
      <div style={{ width: 68, height: 68, borderRadius: "50%", background: "var(--primary-tint)", display: "grid", placeItems: "center", color: "var(--primary-strong)", margin: "0 auto 20px", boxShadow: "0 0 0 10px rgba(6,182,212,0.07)" }}>
        <Icons.Check size={30} />
      </div>
      <h1 className="h1" style={{ fontSize: 30 }}>Changes saved!</h1>
      <p className="muted" style={{ fontSize: 16, lineHeight: 1.5, margin: "12px 0 32px" }}>Your booking has been updated. An updated confirmation has been sent to <strong style={{ color: "var(--fg)" }}>{booking.email}</strong>.</p>
      <div className="row center gap12" style={{ justifyContent: "center", flexWrap: "wrap" }}>
        <button className="btn btn-primary btn-lg" onClick={onBack}><Icons.Doc size={16} /> View booking</button>
        <button className="btn btn-ghost" onClick={goHome}><Icons.ArrowL size={16} /> Back to home</button>
      </div>
    </div>
  );
}

Object.assign(window, { ManageBookingScreen });
