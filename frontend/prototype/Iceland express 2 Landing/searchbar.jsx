// searchbar.jsx — the interactive search bar (location, dates, times)
const { useState: useStateSB } = React;
const { useRef: useRefSB } = React;

function SBField({ icon: IconC, label, value, accent, onClick, open, compact, children }) {
  return (
    <div className="sb-field" style={{ position: "relative" }}>
      <button className={"sb-btn" + (open ? " open" : "")} onClick={onClick}>
        <span className="sb-ico"><IconC size={18} /></span>
        <span className="sb-col">
          <span className="sb-label">{label}</span>
          <span className={"sb-value" + (accent ? " accent" : "")}>{value}</span>
        </span>
        
      </button>
      {open && children}
    </div>
  );
}

function SearchBar({ search, setSearch, onSearch, compact }) {
  const [open, setOpen] = useStateSB(null);
  const [ageError, setAgeError] = useStateSB(false);
  const ageRef = useRefSB(null);
  const ref = useOutside(() => setOpen(null));
  const s = search;

  function set(patch) { setSearch({ ...s, ...patch }); }

  function handleSearch() {
    if (!s.ageConfirmed) {
      setAgeError(true);
      if (ageRef.current) ageRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setAgeError(false);
    setOpen(null);
    onSearch();
  }

  function pickDate(d) {
    if (open === "pickupDate") {
      const patch = { pickupDate: d };
      if (s.returnDate <= d) {
        const nd = new Date(d); nd.setDate(nd.getDate() + 1); patch.returnDate = nd;
      }
      set(patch);
      setOpen("returnDate");
    } else {
      if (d <= s.pickupDate) { set({ pickupDate: d }); }
      else { set({ returnDate: d }); setOpen(null); }
    }
  }

  const popWrap = (left, node) => (
    <div className="pop" style={{ top: "calc(100% + 10px)", left: left }}>{node}</div>
  );

  return (
    <React.Fragment>
      <div className={"searchbar" + (compact ? " compact" : "")} ref={ref}>
        <SBField icon={Icons.Pin} label="PICKUP LOCATION" value={s.pickupLoc.name} accent open={open === "pickupLoc"}
          onClick={() => setOpen(open === "pickupLoc" ? null : "pickupLoc")}>
          {popWrap(0, <LocationList value={s.pickupLoc} onPick={(l) => { set({ pickupLoc: l, dropoffLoc: s.sameReturn ? l : s.dropoffLoc }); setOpen(null); }} />)}
        </SBField>

        <div className="sb-div"></div>

        <SBField icon={Icons.Calendar} label="PICKUP DATE" value={fmtDate(s.pickupDate)} open={open === "pickupDate"}
          onClick={() => setOpen(open === "pickupDate" ? null : "pickupDate")}>
          {popWrap(0, <Calendar pickupDate={s.pickupDate} returnDate={s.returnDate} mode="pickup" onPick={pickDate} />)}
        </SBField>

        <div className="sb-div"></div>

        <SBField icon={Icons.Clock} label="PICKUP TIME" value={s.pickupTime} compact open={open === "pickupTime"}
          onClick={() => setOpen(open === "pickupTime" ? null : "pickupTime")}>
          {popWrap(0, <TimeList value={s.pickupTime} onPick={(t) => { set({ pickupTime: t }); setOpen(null); }} />)}
        </SBField>

        <div className="sb-div"></div>

        <SBField icon={Icons.Calendar} label="RETURN DATE" value={fmtDate(s.returnDate)} open={open === "returnDate"}
          onClick={() => setOpen(open === "returnDate" ? null : "returnDate")}>
          {popWrap("auto", <Calendar pickupDate={s.pickupDate} returnDate={s.returnDate} mode="return" onPick={pickDate} />)}
        </SBField>

        <div className="sb-div"></div>

        <SBField icon={Icons.Clock} label="RETURN TIME" value={s.returnTime} compact open={open === "returnTime"}
          onClick={() => setOpen(open === "returnTime" ? null : "returnTime")}>
          <div className="pop" style={{ top: "calc(100% + 10px)", right: 0 }}><TimeList value={s.returnTime} onPick={(t) => { set({ returnTime: t }); setOpen(null); }} /></div>
        </SBField>

        <button className="btn btn-primary sb-search" onClick={handleSearch}>
          <Icons.Search size={20} /> Search
        </button>
      </div>

      <div
        ref={ageRef}
        className={"sb-age-check" + (ageError ? " error" : "")}
        onClick={() => { set({ ageConfirmed: !s.ageConfirmed }); setAgeError(false); }}
      >
        <span style={{
          width: 20, height: 20, borderRadius: 4, border: "2px solid",
          borderColor: ageError ? "var(--danger)" : s.ageConfirmed ? "var(--primary)" : "var(--border)",
          background: s.ageConfirmed ? "var(--primary)" : "transparent",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, transition: "all .14s",
        }}>
          {s.ageConfirmed && <Icons.Check size={13} style={{ color: "var(--primary-fg)" }} />}
        </span>
        <span style={{ fontSize: 14, fontWeight: 600, color: ageError ? "var(--danger)" : "var(--fg)" }}>
          Driver aged between 25 – 70
        </span>
        {ageError && <span style={{ fontSize: 12, color: "var(--danger)", marginLeft: "auto" }}>Required to search</span>}
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { SearchBar });
