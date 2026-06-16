// screen-A2-results.jsx — A2 Search Results
// Figma: A2-Search-Results
const { useState: useS1, useMemo: useMemoS1 } = React;

/* ============================================================
   RESULTS
   ============================================================ */
function ResultsScreen({ search, setSearch, go, onSelectCar }) {
  const [cat, setCat] = useS1("All");
  const [sort, setSort] = useS1("Recommended");
  const [maxPrice, setMaxPrice] = useS1(200);
  const [trans, setTrans] = useS1("Any");
  const [fuels, setFuels] = useS1([]);
  const [feats, setFeats] = useS1([]);
  const [provs, setProvs] = useS1([]);
  const [sortOpen, setSortOpen] = useS1(false);
  const sortRef = useOutside(() => setSortOpen(false));

  const days = daysBetween(search.pickupDate, search.returnDate);
  const toggle = (arr, set, v) => set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const filtered = useMemoS1(() => {
    let list = CARS.filter((c) => {
      if (cat !== "All" && c.cat !== cat) return false;
      if (c.perDay > maxPrice) return false;
      if (trans !== "Any" && c.transmission !== trans) return false;
      if (fuels.length && !fuels.includes(c.fuel)) return false;
      if (feats.length && !feats.every((f) => c.feats.includes(f))) return false;
      if (provs.length && !provs.includes(c.provider)) return false;
      return true;
    });
    const tagRank = { "Recommended": 0, "Best Value": 1, "Most Popular": 2, "Top Rated": 3 };
    if (sort === "Recommended") list = [...list].sort((a, b) => (tagRank[a.tag] ?? 9) - (tagRank[b.tag] ?? 9) || b.rating - a.rating);
    else if (sort === "Price: Low → High") list = [...list].sort((a, b) => a.perDay - b.perDay);
    else if (sort === "Price: High → Low") list = [...list].sort((a, b) => b.perDay - a.perDay);
    else if (sort === "Top Rated") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [cat, maxPrice, trans, fuels, feats, provs, sort]);

  const SORTS = ["Recommended", "Price: Low → High", "Price: High → Low", "Top Rated"];

  return (
    <div className="flow shell" style={{ paddingTop: 24, paddingBottom: 40 }}>
      <TripBarEditable search={search} setSearch={setSearch} />
      <StepHead screen="results" go={go} />

      <div className="row between center wrap gap16" style={{ margin: "28px 0 20px" }}>
        <div className="h2">{filtered.length} car{filtered.length !== 1 ? "s" : ""} found <span className="muted" style={{ fontWeight: 400, fontSize: 15 }}>· {fmtDate(search.pickupDate)} – {fmtDate(search.returnDate)}</span></div>
        <div className="row center gap8 wrap">
          <div className="row gap8 wrap">
            {CATEGORIES.map((c) => (
              <button key={c} className={"chip" + (cat === c ? " active" : "")} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
          <div style={{ position: "relative" }} ref={sortRef}>
            <button className="chip" onClick={() => setSortOpen(!sortOpen)} style={{ minWidth: 150, justifyContent: "space-between" }}>
              <span>Sort: {sort.replace("Price: ", "")}</span><Icons.Chevron size={14} />
            </button>
            {sortOpen && (
              <div className="pop" style={{ top: "calc(100% + 8px)", right: 0, width: 200 }}>
                {SORTS.map((sOpt) => (
                  <div key={sOpt} className={"time-item" + (sort === sOpt ? " on" : "")} onClick={() => { setSort(sOpt); setSortOpen(false); }}>{sOpt}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="results-layout">
        {/* Filters */}
        <aside className="card card-pad filter-sidebar" style={{ position: "sticky", top: 92 }}>
          <div className="filter-panel">
            <div className="row between center">
              <h3 className="h3">Filters</h3>
              <button className="link" style={{ fontSize: 13 }} onClick={() => { setMaxPrice(200); setTrans("Any"); setFuels([]); setFeats([]); setProvs([]); }}>Reset</button>
            </div>

            <div className="filter-group">
              <div className="eyebrow">Price / day</div>
              <input type="range" className="range" min="34" max="200" value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} />
              <div className="row between" style={{ fontSize: 13, color: "var(--muted)" }}><span>€34</span><span style={{ color: "var(--primary-strong)", fontWeight: 700 }}>Up to {eur(maxPrice)}</span></div>
            </div>

            <div className="filter-group">
              <div className="eyebrow">Transmission</div>
              <div className="segmented accent">
                {TRANSMISSIONS.map((tm) => (
                  <button key={tm} className={trans === tm ? "on" : ""} style={{ flex: 1 }} onClick={() => setTrans(tm)}>{tm}</button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <div className="eyebrow">Fuel type</div>
              {FUEL_TYPES.map((f) => (
                <div key={f.k} className="filter-check" onClick={() => toggle(fuels, setFuels, f.k)}>
                  <span className={"checkbox" + (fuels.includes(f.k) ? " on" : "")}>{fuels.includes(f.k) && <Icons.Check size={14} style={{ color: "var(--primary-fg)" }} />}</span>
                  {f.k}<span className="filter-count">{f.n}</span>
                </div>
              ))}
            </div>

            <div className="filter-group">
              <div className="eyebrow">Features</div>
              {FEATURES.map((f) => (
                <div key={f} className="filter-check" onClick={() => toggle(feats, setFeats, f)}>
                  <span className={"checkbox" + (feats.includes(f) ? " on" : "")}>{feats.includes(f) && <Icons.Check size={14} style={{ color: "var(--primary-fg)" }} />}</span>
                  {f}
                </div>
              ))}
            </div>

            <div className="filter-group">
              <div className="eyebrow">Provider</div>
              {PROVIDERS.map((p) => (
                <div key={p.k} className="filter-check" onClick={() => toggle(provs, setProvs, p.k)}>
                  <span className={"checkbox" + (provs.includes(p.k) ? " on" : "")}>{provs.includes(p.k) && <Icons.Check size={14} style={{ color: "var(--primary-fg)" }} />}</span>
                  {p.k}<span className="filter-count">{p.n}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Grid */}
        <div>
          {filtered.length === 0 ? (
            <EmptyState icon="Search" title="No cars match your filters" desc="Try widening your price range or clearing some filters." />
          ) : (
            <div className="cargrid">
              {filtered.map((c) => <CarCardV2 key={c.id} car={c} days={days} onPick={() => onSelectCar(c)} />)}
            </div>
          )}

          {filtered.length > 0 && (
            <div className="row center gap8" style={{ justifyContent: "center", marginTop: 36 }}>
              <button className="chip"><Icons.ArrowL size={14} /> Prev</button>
              {[1, 2, 3].map((n) => <button key={n} className={"chip" + (n === 1 ? " active" : "")} style={{ minWidth: 40, justifyContent: "center" }}>{n}</button>)}
              <span className="dim">…</span>
              <button className="chip" style={{ minWidth: 40, justifyContent: "center" }}>8</button>
              <button className="chip">Next <Icons.ArrowR size={14} /></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ResultsScreen });
