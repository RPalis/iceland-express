// templates/BlogPostTemplate.jsx
// ─────────────────────────────────────────────────────────────
// Iceland Express DS — BlogPostTemplate
// Top-level template for any blog post page.
// Wires all organisms together into the complete page layout.
//
// Organism composition:
//   NavBar
//   PostHero            ← reading-progress + hero image
//   shell > post-layout
//     PostBody          ← article sections + mid-article CTA
//     PostSidebar       ← booking widget + rec car + TOC
//   EndCTA              ← bottom conversion block
//   RelatedPosts        ← 3-col grid of related articles
//   Footer
//   MobileBookingBar    ← fixed bottom bar on mobile
//
// Props:
//   post        : full post object (see POST_DATA)
//   car         : recommended car object
//   relatedPosts: array of related post objects
//   onBook      : function() — navigate to search results
//   onHome      : function() — navigate to homepage
//   onPost      : function(id) — navigate to another post
// ─────────────────────────────────────────────────────────────

const {
  useState:   useTplState,
  useEffect:  useTplEffect,
  useRef:     useTplRef,
} = React;

function BlogPostTemplate({ post, car, relatedPosts, onBook, onHome, onPost }) {
  // ── Reading progress ──────────────────────────────────────
  const [readingPct, setReadingPct] = useTplState(0);
  const bodyRef = useTplRef(null);

  useTplEffect(() => {
    function onScroll() {
      const el = bodyRef.current;
      if (!el) return;
      const top  = el.getBoundingClientRect().top;
      const h    = el.offsetHeight;
      const vh   = window.innerHeight;
      const pct  = Math.max(0, Math.min(1, (-top + vh * 0.5) / (h - vh * 0.5)));
      setReadingPct(pct);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [post.id]);

  // ── Breadcrumbs ───────────────────────────────────────────
  const breadcrumbs = [
    { label: 'Home',         onClick: onHome },
    { label: 'Travel Guides' },
    { label: post.cat },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingBottom: 80 }}>

      {/* ── Organism 1: NavBar (canonical global nav — no breadcrumb) ── */}
      <NavBar onHome={onHome} />

      {/* ── Page-level breadcrumb — below the global nav, not inside it ── */}
      <nav className="page-breadcrumb shell" aria-label="Breadcrumb">
        {breadcrumbs.map((crumb, i) => (
          <React.Fragment key={crumb.label}>
            {i > 0 && <Icons.ChevronR size={13} />}
            {i < breadcrumbs.length - 1
              ? <a onClick={e => { e.preventDefault(); crumb.onClick && crumb.onClick(); }}>{crumb.label}</a>
              : <span aria-current="page">{crumb.label}</span>
            }
          </React.Fragment>
        ))}
      </nav>

      {/* ── Organism 2: PostHero (includes reading progress bar) ── */}
      <PostHero post={post} readingPct={readingPct} />

      {/* ── Main content area ── */}
      <main className="shell" ref={bodyRef}>
        <div className="post-layout">

          {/* ── Organism 3: PostBody (article + mid-article CTA) ── */}
          <PostBody
            post={post}
            car={car}
            onBook={onBook}
          />

          {/* ── Organism 4: PostSidebar (sticky right column) ── */}
          <PostSidebar
            post={post}
            car={car}
            onBook={onBook}
          />
        </div>

        {/* ── Organism 5: EndCTA ── */}
        <EndCTA post={post} car={car} onBook={onBook} />

        {/* ── Organism 6: RelatedPosts ── */}
        <RelatedPosts posts={relatedPosts} onPost={onPost} />
      </main>

      {/* ── Organism 7: Footer ── */}
      <Footer />

      {/* ── Organism 8: MobileBookingBar (hidden on desktop) ── */}
      <MobileBookingBar car={car} onBook={onBook} />

    </div>
  );
}


/* Export to window — Babel-standalone runs each script in an isolated
   scope, so cross-script references require explicit global assignment. */
Object.assign(window, { BlogPostTemplate });
