// screen-A3-detail.jsx — A3 Car Detail
// Figma: A3-Car-Detail
const { useState: useS2 } = React;

const GALLERY = [(window.__resources&&window.__resources.carSuv||"assets/car-suv.png"), (window.__resources&&window.__resources.carRav4||"assets/car-rav4.png"), (window.__resources&&window.__resources.carTesla||"assets/car-tesla.png")];
function galleryFor(car) {
  const rest = GALLERY.filter((g) => g !== car.img);
  return [car.img, rest[0], rest[1]];
}

/* ============================================================
   DETAIL
   ============================================================ */
function DetailScreen({ search, setSearch, car, days, qty, go }) {
  const [activeImg, setActiveImg] = useS2(0);
  const [tab, setTab] = useS2("arrive");
  const imgs = galleryFor(car);
  const { total } = computeTotals(car, days, qty);

  const feats = [
    { i: "Users", t: car.seats + " Seats" }, { i: "Bag", t: car.bags + " Bags" },
    { i: "Gear", t: car.transmission }, { i: "Fuel", t: car.fuel },
    { i: "Drive", t: car.drive + " Drive" }, { i: "Snow", t: "Winter Ready" },
    { i: "Gps", t: "Unlimited km" }, { i: "Shield", t: "Min age " + car.minAge },
  ];
  const tabContent = {
    arrive: ["Check in 15 min before your scheduled time", "Terminal desk at arrivals hall, exit 3", "Flight delayed? We track it and adjust your pickup"],
    bring: ["Valid driving license (held 1+ year)", "Credit card in the main driver’s name", "Passport or national ID"],
    deposit: ["€2,000 hold on a credit card at pickup", "Released within 14 days of return", "No hold with Premium protection"],
  };

  return (
    <div className="flow shell" style={{ paddingTop: 24, paddingBottom: 40 }}>
      <TripBarEditable search={search} setSearch={setSearch} />
      <StepHead screen="detail" go={go} />

      <div className="layout-2col" style={{ marginTop: 28 }}>
        <div className="col gap20">
          <div className="detail-gallery fade-up">
            <div className="main"><img src={imgs[activeImg]} alt={car.name} /></div>
            <div className="side">
              {[1, 2].map((i) => (
                <div key={i} onClick={() => setActiveImg(i)} style={{ cursor: "pointer", outline: activeImg === i ? "2px solid var(--primary)" : "none" }}>
                  <img src={imgs[i]} alt="" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="row center gap12 wrap" style={{ marginBottom: 6 }}>
              <FreeCancBadge compact />
              {car.tag && <span className={"badge " + (TAG_STYLE[car.tag] || "badge-soft")}>{car.tag}</span>}
            </div>
            <h1 className="h1" style={{ fontSize: 34 }}>{car.year} {car.name}</h1>
            <div className="row center gap12" style={{ marginTop: 10 }}>
              <span className="badge badge-outline">{car.catLabel}</span>
              <RatingChip value={car.rating} count={car.reviews} />
              <span className="muted" style={{ fontSize: 14 }}>· {car.provider}</span>
            </div>
          </div>

          <div className="card card-pad">
            <SpecRow transmission={car.transmission} seats={car.seats} bags={car.bags} drive={car.drive} />
            <div className="feat-grid" style={{marginTop: 16}}>
              {feats.slice(4).map((f) => { const I = Icons[f.i]; return (
                <div key={f.t} className="feat"><span className="ico"><I size={18} /></span>{f.t}</div>
              ); })}
            </div>
          </div>

          <InfoBanner variant="info" icon="Shield">
            Every booking comes with full insurance and the essentials covered — no surprise charges when you collect your car.
          </InfoBanner>
          <div className="card card-pad">
            <h3 className="h3" style={{ marginBottom: 16 }}>Included in Your Rental</h3>
            <InclList items={INCLUDED} />
          </div>

          <div className="card card-pad">
            <div className="tabs" style={{ marginBottom: 16 }}>
              <div className={"tab" + (tab === "arrive" ? " on" : "")} onClick={() => setTab("arrive")}>Arrive on time</div>
              <div className={"tab" + (tab === "bring" ? " on" : "")} onClick={() => setTab("bring")}>What to bring</div>
              <div className={"tab" + (tab === "deposit" ? " on" : "")} onClick={() => setTab("deposit")}>Deposit info</div>
            </div>
            <div className="incl-list">
              {tabContent[tab].map((t) => (
                <div key={t} className="incl-item"><span style={{ color: "var(--primary)" }}><Icons.ChevronR size={16} /></span>{t}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="summary">
          <div className="card card-pad fade-up">
            <div className="row between" style={{ alignItems: "baseline" }}>
              <div className="row center gap6"><span className="price-amt" style={{ fontSize: 34 }}>{eur(car.perDay)}</span><span className="muted">/day</span></div>
              <span className="muted" style={{ fontSize: 14 }}>{eur(car.perDay * days)} total</span>
            </div>
            <hr className="divider" style={{ margin: "18px 0" }} />
            <div className="col gap12">
              <div className="row between" style={{ fontSize: 14 }}><span className="muted">{days} days × {eur(car.perDay)}/day</span><span style={{ fontWeight: 600 }}>{eur(car.perDay * days)}</span></div>
              <div className="row between" style={{ fontSize: 14 }}><span className="muted">Basic Protection</span><span style={{ color: "var(--success)", fontWeight: 600 }}>Included</span></div>
            </div>
            <hr className="divider" style={{ margin: "18px 0" }} />
            <div className="row between center">
              <span className="h3">Total</span>
              <span className="price-amt" style={{ color: "var(--primary-strong)", fontSize: 30 }}>{eur(total)}</span>
            </div>
            <button className="btn btn-primary btn-lg btn-block" style={{ marginTop: 18 }} onClick={() => go("extras")}>Continue <Icons.ArrowR size={18} /></button>
            <div className="row center gap8" style={{ justifyContent: "center", marginTop: 14, color: "var(--muted)", fontSize: 13 }}>
              <Icons.Lock size={14} /> No charge today · Free cancellation
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


Object.assign(window, { computeTotals, galleryFor, DetailScreen });