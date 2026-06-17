// organisms/MobileBookingBar.jsx
// ─────────────────────────────────────────────────────────────
// Iceland Express DS — MobileBookingBar organism
// Fixed bottom bar — visible on screens < 1000px only.
// Appears after user scrolls 400px into the article.
// Atoms used: Btn, Icons
//
// Props:
//   car     : car object with .perDay
//   onBook  : function — navigates to search results
// ─────────────────────────────────────────────────────────────

const { useState: useMBState, useEffect: useMBEffect } = React;

function MobileBookingBar({ car, onBook }) {
  const [visible, setVisible] = useMBState(false);

  useMBEffect(() => {
    function onScroll() { setVisible(window.scrollY > 400); }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="mobile-book-bar" role="complementary" aria-label="Book a car">
      <div className="col" style={{ gap: 1 }}>
        <span style={{ fontWeight: 700, fontSize: 15 }}>
          Book a car from €{car.perDay}/day
        </span>
        <span className="muted" style={{ fontSize: 12 }}>
          Free cancellation · CDW included
        </span>
      </div>
      <Btn variant="primary" icon={Icons.Search} onClick={onBook}>
        Search cars
      </Btn>
    </div>
  );
}


/* Export to window — Babel-standalone runs each script in an isolated
   scope, so cross-script references require explicit global assignment. */
Object.assign(window, { MobileBookingBar });
