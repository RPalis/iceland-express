// organisms/NavBar.jsx
// ─────────────────────────────────────────────────────────────
// Iceland Express DS — NavBar organism (canonical mirror)
// Byte-for-byte mirror of the canonical global NavBar in the main
// app's ds-organisms.jsx: frosted pill · two-color text wordmark ·
// links Book a car / Travel Guides / Help · btn-primary "Manage Booking".
// NO breadcrumb — the global nav is identical on every page (Law 13).
// Page-level context (breadcrumbs) belongs in the page, not the nav.
//
// Props:
//   onHome : function — navigates to homepage
// ─────────────────────────────────────────────────────────────

function NavBar({ onHome }) {
  return (
    <nav className="nav">
      <div className="shell nav-inner">

        {/* Two-color text wordmark — no icon mark */}
        <a className="logo" onClick={onHome} aria-label="Iceland Express home"
           style={{ textDecoration: 'none', color: 'inherit' }}>
          Iceland<span className="logo-accent">Express</span>
        </a>

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
