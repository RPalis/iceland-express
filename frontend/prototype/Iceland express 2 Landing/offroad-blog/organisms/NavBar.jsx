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

function NavBar({ breadcrumbs = [], onHome }) {
  return (
    <header className="navbar">
      <div className="shell navbar-inner">

        {/* Logo */}
        <div className="navbar-logo" onClick={onHome} aria-label="Iceland Express home">
          <span className="navbar-logo-mark">
            <Icons.Bolt size={14} />
          </span>
          Iceland Express
        </div>

        {/* Breadcrumb (desktop) */}
        {breadcrumbs.length > 0 && (
          <nav className="navbar-breadcrumb" aria-label="Breadcrumb">
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

        {/* Nav links */}
        <nav className="navbar-links" aria-label="Site navigation">
          <a href="#">Travel Guides</a>
          <a href="#">Help</a>
        </nav>

        <span className="navbar-spacer" />

        {/* CTA */}
        <Btn variant="primary" size="sm" icon={Icons.Search} onClick={onHome}>
          Book a car
        </Btn>
      </div>
    </header>
  );
}
