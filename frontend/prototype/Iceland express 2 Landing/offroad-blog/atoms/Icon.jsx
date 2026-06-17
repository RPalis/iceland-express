// atoms/Icon.jsx
// ─────────────────────────────────────────────────────────────
// Iceland Express DS — Icon atom
// SVG icon library. Stroke-based, currentColor.
// All icons are named functions inside Icons object.
//
// Usage: <Icons.ArrowR size={18} />
// ─────────────────────────────────────────────────────────────

function mkIcon(paths, opts) {
  opts = opts || {};
  return function Icon(props) {
    const size = (props && props.size) || 20;
    return React.createElement('svg', {
      width: size, height: size, viewBox: '0 0 24 24',
      fill: opts.fill ? 'currentColor' : 'none',
      stroke: opts.fill ? 'none' : 'currentColor',
      strokeWidth: opts.sw || 1.8,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      style: props && props.style,
      'aria-hidden': true,
    }, paths.map((d, i) => React.createElement('path', { key: i, d })));
  };
}

const Icons = {
  // Navigation
  ArrowR:    mkIcon(['M5 12h14', 'M13 6l6 6-6 6']),
  ArrowL:    mkIcon(['M19 12H5', 'M11 6l-6 6 6 6']),
  ChevronR:  mkIcon(['M9 6l6 6-6 6']),
  ChevronL:  mkIcon(['M15 6l-6 6 6 6']),
  Chevron:   mkIcon(['M6 9l6 6 6-6']),

  // UI
  X:         mkIcon(['M6 6l12 12', 'M18 6L6 18'], { sw: 2 }),
  Check:     mkIcon(['M5 12.5l4.5 4.5L19 7'], { sw: 2.2 }),
  Plus:      mkIcon(['M12 5v14', 'M5 12h14'], { sw: 2.2 }),
  Minus:     mkIcon(['M5 12h14'], { sw: 2.2 }),
  Search:    mkIcon(['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z', 'M21 21l-4.3-4.3']),
  Info:      mkIcon(['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 11v5', 'M12 8h.01']),

  // Booking
  Pin:       mkIcon(['M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z', 'M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z']),
  Calendar:  mkIcon(['M7 3v3', 'M17 3v3', 'M4 8h16', 'M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z']),
  Clock:     mkIcon(['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 7v5l3 2']),
  Shield:    mkIcon(['M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z', 'M9 12l2 2 4-4']),
  Lock:      mkIcon(['M6 11h12a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z', 'M8 11V8a4 4 0 0 1 8 0v3']),
  Star:      mkIcon(['M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5Z'], { fill: true }),

  // Car specs
  Gear:      mkIcon(['M5 8h9', 'M14 8a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z', 'M19 16h-9', 'M10 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z']),
  Users:     mkIcon(['M16 19v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 17.5V19', 'M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', 'M20 19v-1.5a3.5 3.5 0 0 0-2.6-3.4', 'M15 4.2a3.5 3.5 0 0 1 0 6.6']),
  Bag:       mkIcon(['M6 8h12l-1 12H7L6 8Z', 'M9 8V6a3 3 0 0 1 6 0v2']),
  Drive:     mkIcon(['M5 13l1.5-4.5A2 2 0 0 1 8.4 7h7.2a2 2 0 0 1 1.9 1.5L19 13', 'M5 13h14v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H8v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-4Z', 'M7.5 15.5h.01', 'M16.5 15.5h.01']),
  Fuel:      mkIcon(['M5 21V6a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v15', 'M4 21h11', 'M14 9h2.5a1.5 1.5 0 0 1 1.5 1.5V16a1.5 1.5 0 0 0 3 0V9l-2.5-2.5', 'M7 9h4']),
  Snow:      mkIcon(['M12 3v18', 'M5 7l14 10', 'M19 7L5 17', 'M9 4l3 2 3-2', 'M9 20l3-2 3 2', 'M3 9l2 3-2 3', 'M21 9l-2 3 2 3'], { sw: 1.4 }),
  Gps:       mkIcon(['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 7v.01', 'M12 12l3 5', 'M3 12h2', 'M19 12h2', 'M12 3v2']),

  // Content
  Bolt:      mkIcon(['M13 3L5 14h6l-1 7 8-11h-6l1-7Z'], { fill: true }),
  Sparkle:   mkIcon(['M12 3l1.8 4.7L18.5 9.5 13.8 11.3 12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3Z'], { fill: true }),
  Doc:       mkIcon(['M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z', 'M13 3v5h5', 'M9 13h6', 'M9 16h4']),
};


/* Export to window — Babel-standalone runs each script in an isolated
   scope, so cross-script references require explicit global assignment. */
Object.assign(window, { mkIcon,Icons });
