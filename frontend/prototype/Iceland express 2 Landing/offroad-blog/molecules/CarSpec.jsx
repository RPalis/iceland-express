// molecules/CarSpec.jsx
// ─────────────────────────────────────────────────────────────
// Iceland Express DS — CarSpec molecule
// 4-cell car specification grid.
// Composed of: Icon atoms in a CSS grid.
//
// Props:
//   transmission : string  e.g. 'Auto' | 'Manual'
//   seats        : number
//   bags         : number
//   drive        : string  e.g. '4WD' | 'AWD' | 'FWD'
//   style        : inline override
// ─────────────────────────────────────────────────────────────

function CarSpec({ transmission, seats, bags, drive, style }) {
  const cells = [
    { icon: Icons.Gear,  label: transmission },
    { icon: Icons.Bag,   label: bags + ' Bags' },
    { icon: Icons.Users, label: seats + ' Seats' },
    { icon: Icons.Drive, label: drive },
  ];
  return (
    <div className="spec-row-mini" style={style}>
      {cells.map(({ icon: IconC, label }) => (
        <div key={label} className="spec-cell">
          <IconC size={16} style={{ color: 'var(--dim)' }} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}


/* Export to window — Babel-standalone runs each script in an isolated
   scope, so cross-script references require explicit global assignment. */
Object.assign(window, { CarSpec });
