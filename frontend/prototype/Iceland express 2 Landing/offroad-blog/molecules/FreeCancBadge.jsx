// molecules/FreeCancBadge.jsx
// ─────────────────────────────────────────────────────────────
// Iceland Express DS — FreeCancBadge molecule
// Primary conversion signal on every booking-related surface.
// Composed of: Badge atom OR inline row with Icons.Shield
//
// Props:
//   compact : boolean
//     true  → renders as a compact Badge (badge-success)
//     false → renders as an inline row with shield icon
// ─────────────────────────────────────────────────────────────

function FreeCancBadge({ compact }) {
  if (compact) {
    return (
      <Badge variant="success">
        <Icons.Shield size={12} /> Free cancellation
      </Badge>
    );
  }
  return (
    <div className="free-canc-inline">
      <Icons.Shield size={15} />
      Free cancellation · 48h window
    </div>
  );
}


/* Export to window — Babel-standalone runs each script in an isolated
   scope, so cross-script references require explicit global assignment. */
Object.assign(window, { FreeCancBadge });
