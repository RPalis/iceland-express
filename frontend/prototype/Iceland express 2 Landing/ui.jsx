// ui.jsx — shared UI components
const { useState, useEffect, useRef, useMemo } = React;

/* ---- outside click hook ---- */
function useOutside(onClose) {
  const ref = useRef(null);
  useEffect(() => {
    function onDoc(e) { if (ref.current && !ref.current.contains(e.target)) onClose(); }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [onClose]);
  return ref;
}

/* ============================================================
   NavBar
   ============================================================ */
function NavBar({ go }) {
  return (
    <nav className="nav">
      <div className="shell nav-inner">
        <div className="logo" onClick={() => go("home")} style={{ cursor: "pointer" }}>
          <span className="logo-mark"><Icons.Bolt size={16} /></span>
          Iceland Express
        </div>
        <div className="nav-links">
          <a onClick={() => go("home")}>Book a car</a>
          <a onClick={() => go('blog')}>Travel Guides</a>
          <a>Help</a>
        </div>
        <div className="nav-spacer"></div>
        <button className="btn btn-ghost btn-sm" onClick={() => go('manage')}>Manage Booking</button>
      </div>
    </nav>
  );
}

/* ============================================================
   Footer
   ============================================================ */
function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <span>© 2026 Iceland Express. All rights reserved.</span>
        <div className="footer-links">
          <a>Privacy Policy</a>
          <a>Terms of Service</a>
          <a>Contact Us</a>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   Stars
   ============================================================ */
function Stars({ value, size = 15 }) {
  return (
    <span style={{ display: "inline-flex", gap: 2, color: "var(--warn)" }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Icons.Star key={i} size={size} style={{ opacity: i < Math.round(value) ? 1 : 0.25 }} />
      ))}
    </span>
  );
}

/* ============================================================
   Trip summary bar
   ============================================================ */
function TripBar({ search, onEdit }) {
  const { pickupLoc, dropoffLoc, pickupDate, returnDate, pickupTime, returnTime } = search;
  return (
    <div className="tripbar fade-up">
      <div className="trip-leg">
        <span className="trip-pin"><Icons.Pin size={22} /></span>
        <div>
          <div className="trip-loc">{pickupLoc.name}</div>
          <div className="trip-time">{fmtDateLong(pickupDate)} · {pickupTime}</div>
        </div>
      </div>
      <span className="trip-arrow"><Icons.ArrowR size={20} /></span>
      <div className="trip-leg">
        <span className="trip-pin"><Icons.Pin size={22} /></span>
        <div>
          <div className="trip-loc">{dropoffLoc.name}</div>
          <div className="trip-time">{fmtDateLong(returnDate)} · {returnTime}</div>
        </div>
      </div>
      <div className="grow"></div>
      <div className="row center gap8 muted" style={{ fontSize: 13.5 }}>
        <Icons.Info size={17} style={{ color: "var(--primary)" }} />
        <span className="hide-sm">Pickup at {pickupTime} · {daysBetween(pickupDate, returnDate)} days</span>
      </div>
      {onEdit && (
        <button className="btn btn-primary btn-sm" onClick={onEdit}>
          <Icons.Edit size={16} /> Edit
        </button>
      )}
    </div>
  );
}

/* ============================================================
   Step header (progress)
   ============================================================ */
const STEP_ORDER = ["results", "detail", "extras", "checkout", "confirm"];
const STEP_LABELS = {
  results: { title: "Search Results", next: "Car Details", back: "home", backLabel: "Back to home" },
  detail: { title: "Your Car", next: "Add-ons", back: "results", backLabel: "Back to Search Results" },
  extras: { title: "Add-ons", next: "Check out", back: "detail", backLabel: "Back to Car detail" },
  checkout: { title: "Check out", next: "Booking confirmation", back: "extras", backLabel: "Back to Add-ons" },
  confirm: { title: "Confirmed", next: null, back: null, backLabel: "" },
};
function StepHead({ screen, go }) {
  const cfg = STEP_LABELS[screen];
  const idx = STEP_ORDER.indexOf(screen);
  return (
    <div className="steps-head fade-up">
      {cfg.back && (
        <div className="link" style={{ marginBottom: 10 }} onClick={() => go(cfg.back)}>
          <Icons.ArrowL size={16} /> {cfg.backLabel}
        </div>
      )}
      <h1 className="h1">{cfg.title}</h1>
      {cfg.next && <div className="muted" style={{ marginTop: 4, fontSize: 14 }}>Next — {cfg.next}</div>}
      <div className="progress-track" style={{ marginTop: 16 }}>
        {STEP_ORDER.map((s, i) => (
          <div key={s} className={"progress-seg" + (i <= idx ? " done" : "")}></div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   Qty stepper
   ============================================================ */
function Stepper({ value, onChange, max = 9, min = 0 }) {
  return (
    <div className="stepper">
      <button className="step-btn minus" disabled={value <= min} onClick={() => onChange(Math.max(min, value - 1))}><Icons.Minus size={18} /></button>
      <span className="step-val">{value}</span>
      <button className="step-btn plus" disabled={value >= max} onClick={() => onChange(Math.min(max, value + 1))}><Icons.Plus size={18} /></button>
    </div>
  );
}

/* ============================================================
   Calendar (range) popover
   ============================================================ */
function Calendar({ pickupDate, returnDate, mode, onPick }) {
  // mode: 'pickup' | 'return' — which date the field edits; picking auto-advances
  const [view, setView] = useState(new Date((pickupDate || new Date()).getFullYear(), (pickupDate || new Date()).getMonth(), 1));
  const today = new Date(); today.setHours(0, 0, 0, 0);

  const first = new Date(view.getFullYear(), view.getMonth(), 1);
  const startDow = first.getDay();
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let dN = 1; dN <= daysInMonth; dN++) cells.push(new Date(view.getFullYear(), view.getMonth(), dN));

  function cls(d) {
    if (!d) return "";
    let c = "cal-day";
    if (d < today) c += " disabled";
    const isStart = sameDay(d, pickupDate);
    const isEnd = sameDay(d, returnDate);
    if (isStart) c += " start";
    if (isEnd) c += " end";
    if (pickupDate && returnDate && d > pickupDate && d < returnDate) c += " in-range";
    return c;
  }

  return (
    <div style={{ width: 300 }}>
      <div className="row between center" style={{ marginBottom: 12 }}>
        <button className="step-btn plus" style={{ width: 32, height: 32 }} onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}><Icons.ChevronL size={16} /></button>
        <span className="h3" style={{ fontSize: 15.5 }}>{MONTHS[view.getMonth()]} {view.getFullYear()}</span>
        <button className="step-btn plus" style={{ width: 32, height: 32 }} onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}><Icons.ChevronR size={16} /></button>
      </div>
      <div className="cal-grid">
        {DOW.map((d) => <div key={d} className="cal-dow">{d}</div>)}
        {cells.map((d, i) => (
          <div key={i} className={cls(d)} onClick={() => d && d >= today && onPick(d)}>
            {d ? d.getDate() : ""}
          </div>
        ))}
      </div>
      <div className="muted" style={{ fontSize: 12, marginTop: 12, textAlign: "center" }}>
        {mode === "pickup" ? "Select your pickup date" : "Select your return date"}
      </div>
    </div>
  );
}

/* ============================================================
   Time list popover
   ============================================================ */
function TimeList({ value, onPick }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      const sel = ref.current.querySelector(".time-item.on");
      if (sel) ref.current.scrollTop = sel.offsetTop - 80;
    }
  }, []);
  return (
    <div className="time-list" ref={ref}>
      {TIMES.map((t) => (
        <div key={t} className={"time-item" + (t === value ? " on" : "")} onClick={() => onPick(t)}>{t}</div>
      ))}
    </div>
  );
}

/* ============================================================
   Location dropdown
   ============================================================ */
function LocationList({ value, onPick }) {
  return (
    <div style={{ width: 280, display: "flex", flexDirection: "column", gap: 2 }}>
      {LOCATIONS.map((l) => (
        <div key={l.id} className={"time-item" + (l.id === value.id ? " on" : "")}
          style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 12px" }}
          onClick={() => onPick(l)}>
          <Icons.Pin size={18} style={{ color: l.id === value.id ? "var(--primary-fg)" : "var(--primary)", flex: "none" }} />
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{l.name}</div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>{l.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   TripBarEditable — inline search bar toggled by the Edit button
   ============================================================ */
function TripBarEditable({ search, setSearch }) {
  const [editOpen, setEditOpen] = React.useState(false);
  return editOpen ? (
    <div className="col gap12 fade-up" style={{ marginBottom: 8 }}>
      <div className="row center gap10">
        <span className="h3" style={{ fontSize: 16 }}>Edit your search</span>
        <button className="btn btn-ghost btn-sm" style={{ marginLeft: "auto" }} onClick={() => setEditOpen(false)}>
          <Icons.X size={15} /> Cancel
        </button>
      </div>
      <SearchBar search={search} setSearch={setSearch} onSearch={() => setEditOpen(false)} />
    </div>
  ) : (
    <TripBar search={search} onEdit={() => setEditOpen(true)} />
  );
}

Object.assign(window, {
  useOutside, NavBar, Footer, Stars, TripBar, TripBarEditable, StepHead, Stepper,
  Calendar, TimeList, LocationList, STEP_ORDER,
});
