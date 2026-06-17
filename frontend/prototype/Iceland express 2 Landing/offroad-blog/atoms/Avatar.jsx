// atoms/Avatar.jsx
// ─────────────────────────────────────────────────────────────
// Iceland Express DS — Avatar atom
// Letter avatar. Uses --primary-tint + --primary-strong tokens.
//
// Props:
//   name  : string — first letter used
//   size  : number (px)  default 38
//   style : inline override
// ─────────────────────────────────────────────────────────────

function Avatar({ name, size = 38, style }) {
  const fontSize = Math.round(size * 0.38);
  return (
    <div
      className="avatar"
      style={{
        width: size,
        height: size,
        fontSize,
        ...style,
      }}
    >
      {name ? name[0].toUpperCase() : '?'}
    </div>
  );
}


/* Export to window — Babel-standalone runs each script in an isolated
   scope, so cross-script references require explicit global assignment. */
Object.assign(window, { Avatar });
