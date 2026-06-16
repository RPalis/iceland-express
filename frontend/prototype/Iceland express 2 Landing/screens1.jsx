// screens1.jsx — Home + Search Results
const { useState: useS1, useMemo: useMemoS1 } = React;

/* ============================================================
   HOME
   ============================================================ */
function HomeScreen({ search, setSearch, onSearch, goPost }) {
  const trustPills = ["Free Cancellation", "CDW Included", "Unlimited Mileage", "No Hidden Fees"];
  const why = [
    { icon: "Shield", t: "Free Cancellation", d: "Cancel up to 48 h before pickup and pay nothing. Plans change — we get it." },
    { icon: "Sparkle", t: "Best Value, Not Just Cheapest", d: "Every quote includes insurance, mileage and tax. The price you see is the price you pay." },
    { icon: "Phone", t: "24/7 Local Support", d: "Real people in Reykjavík, on call from pickup to return — in your language." },
  ];
  return (
    <div className="flow">
      {/* Hero */}
      <section className="hero">
        <div className="shell hero-inner">
          <div className="hero-left fade-up">
            <div className="pill" style={{ marginBottom: 18 }}><Icons.Sparkle size={15} /> Iceland’s trusted car rental marketplace</div>
            <h1 className="display hero-title">Find Your Perfect<br/>Rental in Iceland</h1>
            <p className="hero-sub">Compare top local providers. Best value guaranteed.<br/>Free cancellation on most bookings.</p>
            <div className="row wrap gap10" style={{ marginTop: 22 }}>
              {trustPills.map((p) => (
                <span key={p} className="pill"><Icons.Check size={14} /> {p}</span>
              ))}
            </div>
            <div className="row center gap8" style={{ marginTop: 22, color: "var(--dim)", fontWeight: 600, fontSize: 14 }}>
              <Stars value={5} size={15} /> Trusted by 50,000+ travelers
            </div>
          </div>
          <div className="hero-img fade-up">
            <img src="assets/car-suv.png" alt="Rental car in the Icelandic highlands" />
            <div className="hero-img-badge badge badge-glass"><Icons.Pin size={14} style={{ color: "var(--primary)" }} /> Ring Road ready</div>
          </div>
        </div>
      </section>

      {/* Search bar */}
      <section className="shell" style={{ marginTop: -40, position: "relative", zIndex: 5 }}>
        <SearchBar search={search} setSearch={setSearch} onSearch={onSearch} />
        <div className="row center wrap gap20 partner-strip">
          <span className="dim" style={{ fontSize: 13 }}>Compare from trusted providers</span>
          {PROVIDERS.map((p) => <span key={p.k} className="partner-logo">{p.k}</span>)}
        </div>
      </section>

      {/* Why */}
      <section className="shell" style={{ marginTop: 64 }}>
        <SectionHdr title="Why book with Iceland Express" subtitle="Value over the lowest sticker price — every time." style={{ marginBottom: 0 }} />
        <div className="why-grid">
          {why.map((w) => {
            const IconC = Icons[w.icon];
            return (
              <div key={w.t} className="card card-pad why-card">
                <span className="why-ico"><IconC size={22} /></span>
                <h3 className="h3" style={{ marginTop: 14 }}>{w.t}</h3>
                <p className="muted" style={{ marginTop: 8, fontSize: 14.5, lineHeight: 1.5 }}>{w.d}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Popular categories */}
      <section className="shell" style={{ marginTop: 56 }}>
        <SectionHdr title="Popular this season" action="View all cars" onAction={onSearch} />
        <div className="cargrid">
          {CARS.slice(0, 3).map((c) => <CarCardV2 key={c.id} car={c} days={daysBetween(search.pickupDate, search.returnDate)} onPick={() => onSearch(c)} />)}
        </div>
      </section>

      {/* Blog */}
      <section className="shell" style={{ marginTop: 64 }}>
        <div className="row between center" style={{ marginBottom: 24 }}>
          <div>
            <h2 className="h1" style={{ fontSize: 26 }}>From the Blog</h2>
            <p className="muted" style={{ fontSize: 14, marginTop: 4 }}>Stories, tips and road trip inspiration.</p>
          </div>
          <div className="link" onClick={() => goPost && goPost("_list")}>All posts <Icons.ArrowR size={16} /></div>
        </div>

        <div className="blog-grid">
          <div className="blog-featured card">
            <div className="blog-featured-img">
              <image-slot id="blog-featured" style={{position:"absolute",inset:0,width:"100%",height:"100%"}} shape="rect" placeholder="Drop featured photo here"></image-slot>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,6,16,0.95) 35%, transparent 70%)" }}></div>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 24px" }}>
                <span className="badge badge-primary" style={{ marginBottom: 12 }}>Featured</span>
                <h3 className="h3" style={{ fontSize: 22, lineHeight: 1.25, color: "var(--fg)" }}>7 Days on the Ring Road: A First-Timer's Honest Account</h3>
                <p className="muted" style={{ fontSize: 14, marginTop: 8, lineHeight: 1.5 }}>From Reykjavík to Jökulsárlón and back — what we wished we'd known before renting a 4×4 and heading into the unknown.</p>
                <div className="row center gap12" style={{ marginTop: 14 }}>
                  <span className="dim" style={{ fontSize: 12.5 }}>June 3, 2026 · 11 min read</span>
                  <span className="link" style={{ fontSize: 13 }} onClick={() => goPost && goPost("ring-road")}>Read <Icons.ArrowR size={13} /></span>
                </div>
              </div>
            </div>
          </div>

          <div className="col gap14">
            {[
              { id: "highland-f-roads", tag: "Road Conditions", date: "May 28, 2026", time: "4 min", title: "F26 Sprengisandur Opens for Summer 2026", desc: "The central highland route is now accessible — here's what the surface is like this year and which cars made it through." },
              { id: "ev-charging", tag: "Electric Travel", date: "May 20, 2026", time: "5 min", title: "Driving Iceland in an EV: Charging on the Ring Road", desc: "We mapped every fast charger on Route 1 so you can plan your Tesla or ID.4 trip with zero range anxiety." },
              { id: "packing-june", tag: "Packing Tips", date: "May 12, 2026", time: "3 min", title: "What to Pack for an Icelandic Road Trip in June", desc: "Layers, waterproofs and a good playlist. The essentials (and the things most people forget)." },
            ].map((p) => (
              <div key={p.title} className="card row gap16 hover-lift"
                style={{ padding: 16, cursor: "pointer", alignItems: "flex-start" }}
                onClick={() => goPost && goPost(p.id)}>
                <div className="blog-side-img" style={{ flex: "none" }}>
                  <image-slot id={"blog-" + p.tag.replace(/\s/g,"-").toLowerCase()} style={{width:"100%",height:"100%"}} shape="rect" placeholder="Photo"></image-slot>
                </div>
                <div className="grow col gap6">
                  <div className="row center gap8 wrap">
                    <span className="badge badge-soft" style={{ fontSize: 11 }}>{p.tag}</span>
                    <span className="dim" style={{ fontSize: 12 }}>{p.date} · {p.time} read</span>
                  </div>
                  <h3 className="h3" style={{ fontSize: 15.5, lineHeight: 1.3 }}>{p.title}</h3>
                  <p className="muted" style={{ fontSize: 13, lineHeight: 1.5 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Guides */}
      <section className="shell" style={{ marginTop: 64, paddingBottom: 60 }}>
        <div className="row between center" style={{ marginBottom: 24 }}>
          <div>
            <h2 className="h1" style={{ fontSize: 26 }}>Iceland Travel Guides</h2>
            <p className="muted" style={{ fontSize: 14, marginTop: 4 }}>Plan your trip with insights from locals.</p>
          </div>
          <div className="link" onClick={() => goPost && goPost("_list")}>All guides <Icons.ArrowR size={16} /></div>
        </div>
        <div className="guides-grid">
          {[
            { id: "ring-road", cat: "Route", title: "The Complete Ring Road Guide", desc: "Everything you need to know to drive Iceland's famous Route 1 — stops, timing, road conditions and must-see detours.", time: "8 min read", img: "road" },
            { id: "highland-f-roads", cat: "Off-Road", title: "F-Roads & the Highlands", desc: "When to go, which 4×4 you need, and the five highland routes that reward the adventurous driver.", time: "6 min read", img: "highland" },
            { id: "ring-road", cat: "Seasons", title: "Best Time to Visit Iceland", desc: "Midnight sun vs. Northern Lights — how each season shapes your rental choice and what to expect on the roads.", time: "5 min read", img: "seasons" },
            { id: "packing-june", cat: "Practical", title: "Driving in Iceland: Rules & Tips", desc: "Speed limits, weather warnings, river crossings and everything first-time visitors need before they turn the key.", time: "4 min read", img: "tips" },
          ].map((g) => (
            <div key={g.title} className="guide-card card hover-lift" onClick={() => goPost && goPost(g.id)} style={{cursor:"pointer"}}>
              <div className="guide-img">
                <image-slot id={"guide-" + g.img} style={{position:"absolute",inset:0,width:"100%",height:"100%"}} shape="rect" placeholder={"Drop " + g.title + " photo"}></image-slot>
                <span className="guide-cat badge badge-glass">{g.cat}</span>
              </div>
              <div className="guide-body">
                <h3 className="h3" style={{ fontSize: 17, lineHeight: 1.3 }}>{g.title}</h3>
                <p className="muted" style={{ fontSize: 13.5, lineHeight: 1.55, marginTop: 8, flexGrow: 1 }}>{g.desc}</p>
                <div className="row between center" style={{ marginTop: 16 }}>
                  <span className="dim" style={{ fontSize: 12.5 }}>{g.time}</span>
                  <span className="link" style={{ fontSize: 13 }}>Read <Icons.ArrowR size={13} /></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
function CarCard({ car, days, onPick }) {
  const [fav, setFav] = useS1(false);
  const Spec = ({ icon: I, label }) => (
    <div className="spec-cell"><I size={17} /><span>{label}</span></div>
  );
  return (
    <div className="carcard fade-up">
      <div className="carcard-media">
        <img src={car.img} alt={car.name} />
        {car.tag && <span className={"carcard-tag badge " + (TAG_STYLE[car.tag] || "badge-soft")}><Icons.Sparkle size={12} /> {car.tag}</span>}
        <button className="carcard-fav" onClick={(e) => { e.stopPropagation(); setFav(!fav); }} style={{ color: fav ? "var(--danger)" : "var(--fg)" }}>
          <Icons.Heart size={17} />
        </button>
      </div>
      <div className="carcard-body">
        <div className="row center gap8" style={{ color: "var(--success)", fontSize: 12.5, fontWeight: 600, marginBottom: 2 }}>
          <Icons.Shield size={14} /> Free cancellation · {car.catLabel}
        </div>
        <h3 className="h3" style={{ fontSize: 19 }}>{car.name}</h3>
        <div className="muted" style={{ fontSize: 13 }}>{car.similar} · {car.provider}</div>
        <div className="spec-row">
          <Spec icon={Icons.Gear} label={car.transmission} />
          <Spec icon={Icons.Bag} label={car.bags + " Bags"} />
          <Spec icon={Icons.Users} label={car.seats + " Seats"} />
          <Spec icon={Icons.Drive} label={car.drive} />
        </div>
        <div className="row between center" style={{ marginTop: "auto" }}>
          <div>
            <div className="row center gap6">
              <span className="price-amt">{eur(car.perDay)}</span>
              <span className="muted" style={{ fontSize: 14 }}>/day</span>
            </div>
            <div className="price-eur">{eur(car.perDay * days)} total · {days} days</div>
          </div>
          <div className="row center gap6" title={car.reviews + " reviews"}>
            <Icons.Star size={14} style={{ color: "var(--warn)" }} />
            <span style={{ fontWeight: 700, fontSize: 14 }}>{car.rating}</span>
          </div>
        </div>
        <div className="row gap10" style={{ marginTop: 14 }}>
          <button className="btn btn-ghost btn-sm grow" onClick={onPick}><Icons.Info size={15} /> Details</button>
          <button className="btn btn-primary btn-sm grow" onClick={onPick}>Book Now</button>
        </div>
      </div>
    </div>
  );
}

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
              <div className="segmented accent" style={{ width: "100%" }}>
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

Object.assign(window, { HomeScreen, CarCard, ResultsScreen });
