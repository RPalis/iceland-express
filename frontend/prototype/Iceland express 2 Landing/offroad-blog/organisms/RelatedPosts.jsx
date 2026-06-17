// organisms/RelatedPosts.jsx
// ─────────────────────────────────────────────────────────────
// Iceland Express DS — RelatedPosts organism
// 3-column grid of related article cards at bottom of post.
// Atoms used: Badge
//
// Props:
//   posts   : array of post objects
//   onPost  : function(id) — navigate to a post
// ─────────────────────────────────────────────────────────────

function RelatedPosts({ posts, onPost }) {
  if (!posts || posts.length === 0) return null;
  return (
    <section style={{ marginTop: 60 }} aria-label="Related articles">
      <div className="row between" style={{ marginBottom: 22, alignItems: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, margin: 0 }}>
          More from the blog
        </h2>
      </div>

      <div className="related-grid">
        {posts.map(post => (
          <article
            key={post.id}
            className="related-card hover-lift"
            onClick={() => onPost && onPost(post.id)}
            style={{ cursor: 'pointer' }}
            aria-label={post.title}
          >
            <div className="related-card-img">
              <image-slot
                id={'related-' + post.heroSlot}
                className="related-card-img-slot"
                shape="rect"
                placeholder={post.heroPlaceholder}
              ></image-slot>
            </div>
            <div className="related-card-body">
              <Badge variant="soft" style={{ fontSize: 11 }}>{post.cat}</Badge>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, lineHeight: 1.3, margin: '8px 0 0' }}>
                {post.title}
              </h3>
              <p className="dim" style={{ fontSize: 12, marginTop: 8 }}>{post.date} · {post.readTime}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}


/* Export to window — Babel-standalone runs each script in an isolated
   scope, so cross-script references require explicit global assignment. */
Object.assign(window, { RelatedPosts });
