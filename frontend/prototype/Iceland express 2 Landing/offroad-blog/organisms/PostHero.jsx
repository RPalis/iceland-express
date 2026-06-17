// organisms/PostHero.jsx
// ─────────────────────────────────────────────────────────────
// Iceland Express DS — PostHero organism
// Full-bleed hero section for blog post pages.
// Molecules used: MetaRow, FreeCancBadge, Badge
// Atoms used: Icons
//
// Props:
//   post        : { title, excerpt, cat, tag, author, authorRole, date, readTime, heroSlot, heroPlaceholder }
//   readingPct  : number 0–1 — drives the reading progress bar
// ─────────────────────────────────────────────────────────────

function PostHero({ post, readingPct = 0 }) {
  return (
    <>
      {/* Reading progress bar — fixed at top of viewport */}
      <div className="reading-progress" role="progressbar" aria-valuenow={Math.round(readingPct * 100)} aria-valuemin="0" aria-valuemax="100">
        <div
          className="reading-progress-fill"
          style={{ width: (readingPct * 100) + '%' }}
        />
      </div>

      {/* Hero */}
      <section className="post-hero">
        {/* Image slot — drag a photo here in the prototype */}
        <image-slot
          id={post.heroSlot}
          className="post-hero-img-slot"
          shape="rect"
          placeholder={post.heroPlaceholder}
        ></image-slot>

        <div className="post-hero-overlay" aria-hidden="true" />

        <div className="post-hero-content shell">
          {/* Category badge */}
          <Badge variant="soft" style={{ marginBottom: 14 }}>{post.cat}</Badge>

          {/* Title */}
          <h1 className="post-hero-title">{post.title}</h1>

          {/* Excerpt */}
          <p className="post-hero-excerpt">{post.excerpt}</p>

          {/* Meta row + free cancellation signal */}
          <div className="post-meta">
            <MetaRow
              author={post.author}
              role={post.authorRole}
              date={post.date}
              readTime={post.readTime}
            />
            <FreeCancBadge compact />
          </div>
        </div>
      </section>
    </>
  );
}


/* Export to window — Babel-standalone runs each script in an isolated
   scope, so cross-script references require explicit global assignment. */
Object.assign(window, { PostHero });
