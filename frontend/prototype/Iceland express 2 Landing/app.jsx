// app.jsx — Iceland Express main application
// ─────────────────────────────────────────────────────────────
// Entry point: App component + router + tweaks
// Depends on: data.jsx, tokens.jsx, ds-atoms/molecules/organisms.jsx,
//             ui.jsx, searchbar.jsx, all screen-*.jsx files
// ─────────────────────────────────────────────────────────────
const { useState: useAppState, useEffect: useAppEffect, useCallback } = React;

/* ── Default search state ───────────────────────────────────── */
function defaultSearch() {
  const now = new Date();
  const p = new Date(now); p.setDate(now.getDate() + 7); p.setHours(0, 0, 0, 0);
  const r = new Date(p); r.setDate(p.getDate() + 5);
  return {
    pickupLoc:  LOCATIONS[0],
    dropoffLoc: LOCATIONS[0],
    pickupDate: p,
    returnDate: r,
    pickupTime: "10:00",
    returnTime: "10:00",
  };
}

/* ── Accent colour options (Tweaks panel) ───────────────────── */
const ACCENT_COLORS = [
  { name: "Cyan",    v: "#06b6d4" },
  { name: "Violet",  v: "#8b5cf6" },
  { name: "Emerald", v: "#10b981" },
  { name: "Amber",   v: "#f59e0b" },
];

function applyTweaks(t) {
  const root = document.documentElement;
  const col = ACCENT_COLORS.find((c) => c.name === t.accent) || ACCENT_COLORS[0];
  root.style.setProperty("--primary", col.v);
  root.style.setProperty("--primary-strong", col.v + "cc");
  root.style.setProperty("--r", t.radius);
  root.style.setProperty("--d", t.density);
}

/* ── App ────────────────────────────────────────────────────── */
function App() {
  const [screen,      setScreen]      = useAppState("home");
  const [search,      setSearch]      = useAppState(defaultSearch);
  const [selectedCar, setSelectedCar] = useAppState(CARS[1]);
  const [qty,         setQty]         = useAppState({});
  const [currentPost, setCurrentPost] = useAppState(null);

  const days = daysBetween(search.pickupDate, search.returnDate);

  // Tweaks
  const [tweaks, setTweak] = useTweaks({ accent: "Cyan", radius: 1.0, density: 1.0 });
  useAppEffect(() => applyTweaks(tweaks), [tweaks]);

  // Navigation
  const go = useCallback((s) => {
    setScreen(s);
    if (s !== "post") setCurrentPost(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  function goPost(id) {
    if (id === "_list") { go("blog"); return; }
    setCurrentPost(id);
    setScreen("post");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function onSearch(car) {
    if (car && car.id) { setSelectedCar(car); go("detail"); }
    else go("results");
  }

  function onSelectCar(car) { setSelectedCar(car); go("detail"); }

  return (
    <div className="page">
      <NavBar go={go} />

      <main className="flow">
        {/* A1 — Homepage Search */}
        {screen === "home" && (
          <HomeScreen
            search={search} setSearch={setSearch}
            onSearch={onSearch} goPost={goPost}
          />
        )}

        {/* A2 — Search Results */}
        {screen === "results" && (
          <ResultsScreen
            search={search} setSearch={setSearch}
            go={go} onSelectCar={onSelectCar}
          />
        )}

        {/* A3 — Car Detail */}
        {screen === "detail" && (
          <DetailScreen
            search={search} setSearch={setSearch}
            car={selectedCar} days={days} qty={qty} go={go}
          />
        )}

        {/* A5 — Add-ons / Extras */}
        {screen === "extras" && (
          <ExtrasScreen
            search={search} setSearch={setSearch}
            car={selectedCar} days={days}
            qty={qty} setQty={setQty} go={go}
          />
        )}

        {/* A6 — Checkout */}
        {screen === "checkout" && (
          <CheckoutScreen
            search={search} setSearch={setSearch}
            car={selectedCar} days={days} qty={qty} go={go}
          />
        )}

        {/* A7 — Booking Confirmation */}
        {screen === "confirm" && (
          <ConfirmScreen
            search={search} car={selectedCar} days={days} qty={qty} go={go}
          />
        )}

        {/* MB — Manage Booking */}
        {screen === "manage" && <ManageBookingScreen go={go} />}

        {/* BL — Blog List */}
        {screen === "blog" && <BlogListScreen go={go} goPost={goPost} />}

        {/* BP — Blog Post */}
        {screen === "post" && (
          <BlogPostScreen
            postId={currentPost} go={go} goPost={goPost}
            search={search} setSearch={setSearch}
            onSelectCar={onSelectCar}
          />
        )}
      </main>

      <Footer />

      {/* Tweaks panel */}
      <TweaksPanel>
        <TweakSection label="Brand Accent" />
        <TweakRadio
          label="Accent"
          value={tweaks.accent}
          options={ACCENT_COLORS.map((c) => c.name)}
          onChange={(v) => setTweak("accent", v)}
        />
        <TweakSection label="Card Radius" />
        <TweakSlider
          label="Radius"
          value={tweaks.radius}
          min={0} max={2} step={0.1}
          onChange={(v) => setTweak("radius", v)}
        />
        <TweakSection label="Layout Density" />
        <TweakSlider
          label="Density"
          value={tweaks.density}
          min={0.7} max={1.3} step={0.05}
          onChange={(v) => setTweak("density", v)}
        />
      </TweaksPanel>
    </div>
  );
}

// Mount — wait for DOM so <div id="root"> is available
function mountApp() {
  const rootEl = document.getElementById("root");
  if (!rootEl) { console.error("[App] #root not found"); return; }
  ReactDOM.createRoot(rootEl).render(<App />);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountApp);
} else {
  mountApp();
}
