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
