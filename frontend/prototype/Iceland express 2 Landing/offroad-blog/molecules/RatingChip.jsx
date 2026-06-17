// molecules/RatingChip.jsx
// ─────────────────────────────────────────────────────────────
// Iceland Express DS — RatingChip molecule
// Stars + numeric score + optional review count.
//
// Props:
//   value  : number  0–5
//   count  : number  (optional) review count
//   size   : 'sm' | 'md'  (default: 'md')
// ─────────────────────────────────────────────────────────────

function RatingChip({ value, count, size = 'md' }) {
  const fs = size === 'sm' ? 13 : 14;
  return (
    <div className="row gap-6">
      <Stars value={value} size={fs} />
      <span style={{ fontWeight: 700, fontSize: fs }}>{value}</span>
      {count && (
        <span className="muted" style={{ fontSize: fs - 1 }}>({count} reviews)</span>
      )}
    </div>
  );
}


/* Export to window — Babel-standalone runs each script in an isolated
   scope, so cross-script references require explicit global assignment. */
Object.assign(window, { RatingChip });
