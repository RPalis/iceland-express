// atoms/Sep.jsx
// ─────────────────────────────────────────────────────────────
// Iceland Express DS — Sep (Separator) atom
// Single-pixel horizontal rule. Uses --border token.
//
// Props:
//   style : inline override (e.g. margin)
// ─────────────────────────────────────────────────────────────

function Sep({ style }) {
  return <hr className="divider" style={style} />;
}


/* Export to window — Babel-standalone runs each script in an isolated
   scope, so cross-script references require explicit global assignment. */
Object.assign(window, { Sep });
