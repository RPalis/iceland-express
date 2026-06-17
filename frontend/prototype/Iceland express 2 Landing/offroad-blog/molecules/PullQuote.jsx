// molecules/PullQuote.jsx
// ─────────────────────────────────────────────────────────────
// Iceland Express DS — PullQuote molecule
// Highlighted quote extracted from the article body.
// Uses: --primary token for left border accent.
//
// Props:
//   text : string — the quote text
// ─────────────────────────────────────────────────────────────

function PullQuote({ text }) {
  return (
    <blockquote className="pull-quote">
      {text}
    </blockquote>
  );
}


/* Export to window — Babel-standalone runs each script in an isolated
   scope, so cross-script references require explicit global assignment. */
Object.assign(window, { PullQuote });
