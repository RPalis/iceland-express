// organisms/NavBar.jsx
// ─────────────────────────────────────────────────────────────
// Iceland Express DS — NavBar organism
// Sticky top nav with logo, breadcrumb trail, and CTA.
// Atoms used: Btn, Icons
//
// Props:
//   breadcrumbs : [{ label, href }]  — trail shown in desktop
//   onHome      : function — navigates to homepage
// ─────────────────────────────────────────────────────────────

// Canonical DS NavBar (mirrors main ds-organisms.jsx). Frosted pill,
// two-color text wordmark, btn-primary "Manage Booking". The breadcrumb
// is an offroad-only extension; pass `breadcrumbs` to show it.
function NavBar({ breadcrumbs = [], onHome }) {
  return (
    <nav className="nav">
      <div className="shell nav-inner">

        {/* Two-color text wordmark — no icon mark */}
        <a className="logo" onClick={onHome} aria-label="Iceland Express home"
           style={{ textDecoration: 'none', color: 'inherit' }}>
          Iceland<span className="logo-accent">Express</span>
        </a>

        {/* Breadcrumb (offroad-only extension) */}
        {breadcrumbs.length > 0 && (
          <nav className="nav-breadcrumb" aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={crumb.label}>
                {i > 0 && <Icons.ChevronR size={13} />}
                {i < breadcrumbs.length - 1
                  ? <a href={crumb.href || '#'} onClick={e => { e.preventDefault(); crumb.onClick && crumb.onClick(); }}>{crumb.label}</a>
                  : <span>{crumb.label}</span>
                }
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Canonical nav links */}
        <div className="nav-links">
          <a onClick={onHome}>Book a car</a>
          <a href="#">Travel Guides</a>
          <a href="#">Help</a>
        </div>

        <div className="nav-spacer" />

        {/* Canonical CTA */}
        <Btn variant="primary" size="sm" onClick={onHome}>
          Manage Booking
        </Btn>
      </div>
    </nav>
  );
}


/* Export to window — Babel-standalone runs each script in an isolated
   scope, so cross-script references require explicit global assignment. */
Object.assign(window, { NavBar });
