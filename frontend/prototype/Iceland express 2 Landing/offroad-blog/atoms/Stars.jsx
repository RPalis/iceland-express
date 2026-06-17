// atoms/Stars.jsx
// ─────────────────────────────────────────────────────────────
// Iceland Express DS — Stars atom
// Renders N filled + (5-N) dim star icons.
//
// Props:
//   value : number 0–5 (rounds to nearest integer)
//   size  : icon size in px (default 15)
// ─────────────────────────────────────────────────────────────

function Stars({ value, size = 15 }) {
  return (
    <span style={{ display: 'inline-flex', gap: 2, color: 'var(--warn)' }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Icons.Star key={i} size={size} style={{ opacity: i < Math.round(value) ? 1 : 0.22 }} />
      ))}
    </span>
  );
}


/* Export to window — Babel-standalone runs each script in an isolated
   scope, so cross-script references require explicit global assignment. */
Object.assign(window, { Stars });
