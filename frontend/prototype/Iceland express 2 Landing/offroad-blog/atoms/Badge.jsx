// atoms/Badge.jsx
// ─────────────────────────────────────────────────────────────
// Iceland Express DS — Badge atom
// Compact label chip. Six visual variants.
//
// Props:
//   variant : 'primary' | 'soft' | 'success' | 'amber' | 'outline' | 'glass'
//   icon    : Icon component (rendered left)
//   style   : inline style override
// ─────────────────────────────────────────────────────────────

function Badge({ variant = 'soft', icon: Icon, children, style }) {
  return (
    <span className={`badge badge-${variant}`} style={style}>
      {Icon && <Icon size={12} />}
      {children}
    </span>
  );
}
