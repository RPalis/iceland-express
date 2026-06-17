// organisms/Footer.jsx
// ─────────────────────────────────────────────────────────────
// Iceland Express DS — Footer organism
// Minimal site footer: copyright + legal links.
// ─────────────────────────────────────────────────────────────

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <span>© {year} Iceland Express. All rights reserved.</span>
        <nav className="footer-links" aria-label="Footer links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact Us</a>
        </nav>
      </div>
    </footer>
  );
}


/* Export to window — Babel-standalone runs each script in an isolated
   scope, so cross-script references require explicit global assignment. */
Object.assign(window, { Footer });
