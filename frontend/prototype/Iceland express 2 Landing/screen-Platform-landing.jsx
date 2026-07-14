// screen-Platform-landing.jsx — Platform Landing (Figma 974:10011)

function PlatformLandingScreen() {
  const assets = window.PLATFORM_ASSETS || {};
  const cards = window.PLATFORM_CARDS || [];

  function handleAiSubmit(query) {
    if (!query) {
      document.querySelector('.ai-preview-input-field')?.focus();
      return;
    }
    window.location.href = '/bookacar/';
  }

  return (
    <>
      <section className="platform-hero">
        <h1 className="platform-hero-title">
          <span className="platform-hero-title-explore">Explore</span>
          <span className="platform-hero-title-iceland"> Iceland</span>
        </h1>
        <p className="platform-hero-sub">
          Travel to Iceland your way: From Northern Lights adventures to Ring Road road trips, our local experts help you plan the perfect Iceland vacation.
        </p>
      </section>

      <section className="platform-cards" aria-label="Explore Iceland">
        {cards.map((c) => (
          <PlatformVerticalCard
            key={c.title}
            icon={assets[c.iconKey]}
            iconClass={c.iconClass}
            title={c.title}
            desc={c.desc}
            href={c.href}
          />
        ))}
      </section>

      <section className="platform-ai">
        <div className="platform-ai-copy">
          <h2 className="platform-ai-title">Your AI Iceland Travel Expert</h2>
          <p className="platform-ai-desc">
            Trained on real local guides. Ask me anything about routes, weather, or gear.
          </p>
        </div>
        <AiPreviewInput
          placeholder={'"What\'s the best route for 7 days in winter?"'}
          searchIcon={assets.iconAiSearch}
          sendIcon={assets.iconAiSend}
          onSubmit={handleAiSubmit}
        />
      </section>

      <PlatformFooter />
    </>
  );
}

function PlatformLandingApp({ go }) {
  const navItems = window.NAV_LANDING_ITEMS || window.NAV_PLATFORM_ITEMS || [];
  const assets = window.PLATFORM_ASSETS || {};
  return (
    <div className="platform-landing">
      <div className="platform-landing-bg" aria-hidden="true">
        <img className="platform-landing-bg-image" src={assets.heroBg} alt="" />
        <div className="platform-landing-bg-overlay" />
      </div>
      <div className="platform-landing-content">
        <NavBar go={go} items={navItems} variant="platform" manageRoute="manage" />
        <PlatformLandingScreen />
      </div>
    </div>
  );
}

function mountPlatformLanding() {
  const rootEl = document.getElementById('platform-root');
  if (!rootEl) return;

  function goLanding(route) {
    const map = window.LANDING_NAV_ROUTE_MAP || {};
    const target = map[route] || '/bookacar/';
    window.location.href = target;
  }

  ReactDOM.createRoot(rootEl).render(<PlatformLandingApp go={goLanding} />);
}

window.mountPlatformLanding = mountPlatformLanding;
