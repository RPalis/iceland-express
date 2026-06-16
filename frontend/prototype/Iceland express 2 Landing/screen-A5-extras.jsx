// screen-A5-extras.jsx — A5 Add-ons / Extras
// Figma: A5-Extras
const { useState: useA5 } = React;

/* ============================================================
   EXTRAS
   ============================================================ */
function ExtrasScreen({ search, setSearch, car, days, qty, setQty, go }) {
  const { total, lines } = computeTotals(car, days, qty);
  function setOne(id, v) { setQty({ ...qty, [id]: v }); }

  return (
    <div className="flow shell" style={{ paddingTop: 24, paddingBottom: 40 }}>
      <TripBarEditable search={search} setSearch={setSearch} />
      <StepHead screen="extras" go={go} />

      <div className="layout-2col" style={{ marginTop: 28 }}>
        <div className="col gap20">
          <div className="extras-grid">
            {EXTRAS.map((e) => (
            <ExtraCardV2 key={e.id} extra={e} qty={qty[e.id] || 0} onChange={(v) => setOne(e.id, v)} />
          ))}
          </div>

          <div className="card card-pad">
            <h3 className="h3" style={{ marginBottom: 16 }}>Already Included in Your Rental</h3>
            <InclList items={INCLUDED} />
          </div>
        </div>

        <PriceSummaryCard car={car} days={days} qty={qty} cta="Continue" onCta={() => go("checkout")} />
      </div>
    </div>
  );
}


Object.assign(window, { ExtrasScreen });
