// screen-BL-blog-list.jsx — BL Blog List
// Figma: Blog List
const { useState: useS5 } = React;

/* ============================================================
   BLOG LIST SCREEN
   ============================================================ */
function BlogListScreen({ go, goPost }) {
  const [cat, setCat] = useS5("All");
  const featured = BLOG_POSTS[0];
  const filtered = cat === "All" ? BLOG_POSTS.slice(1) : BLOG_POSTS.slice(1).filter((p) => p.cat === cat);

  return (
    <div className="flow" style={{ paddingBottom: 80 }}>
      {/* List hero */}
      <div className="blog-list-hero">
        <image-slot id="blog-list-hero" style={{position:"absolute",inset:0,width:"100%",height:"100%"}} shape="rect" placeholder="Blog hero — Icelandic road panorama"></image-slot>
        <div className="blog-list-hero-overlay"></div>
        <div className="shell blog-list-hero-inner">
          <div className="link" style={{ marginBottom: 18 }} onClick={() => go("home")}><Icons.ArrowL size={16} /> Home</div>
          <div className="pill" style={{ alignSelf: "flex-start", marginBottom: 14 }}><Icons.Doc size={14} /> Travel blog</div>
          <h1 className="display" style={{ fontSize: 54, margin: 0, maxWidth: 680 }}>Iceland Travel<br/>Guides & Stories</h1>
          <p className="muted" style={{ fontSize: 18, marginTop: 14, maxWidth: 500, lineHeight: 1.5 }}>Road trip inspiration, practical guides and honest accounts from the road.</p>
          <div className="row center gap8 wrap" style={{ marginTop: 22 }}>
            {[{v:"4 articles"},{v:"Local authors"},{v:"Updated 2026"}].map((t) => (
              <span key={t.v} className="badge badge-glass">{t.v}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="shell" style={{ paddingTop: 52 }}>
        {/* Category filter */}
        <div className="row center gap8 wrap" style={{ marginBottom: 36 }}>
          {BLOG_CATS.map((c) => (
            <Chp key={c} active={cat === c} onClick={() => setCat(c)}>{c}</Chp>
          ))}
          <div style={{ marginLeft: "auto", color: "var(--dim)", fontSize: 13 }}>{cat === "All" ? BLOG_POSTS.length : BLOG_POSTS.filter(p=>p.cat===cat).length} articles</div>
        </div>

        {/* Featured */}
        {(cat === "All" || featured.cat === cat) && (
          <div className="blog-featured-list card hover-lift" onClick={() => goPost(featured.id)} style={{ marginBottom: 36, cursor: "pointer", overflow: "hidden" }}>
            <div className="blog-featured-list-img">
              <image-slot id={"list-" + featured.heroSlot} style={{position:"absolute",inset:0,width:"100%",height:"100%"}} shape="rect" placeholder={featured.heroPlaceholder}></image-slot>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to right, rgba(5,6,16,0.95) 40%, rgba(5,6,16,0.3) 100%)"}}></div>
              <div className="blog-featured-list-text">
                <span className="badge badge-primary" style={{ marginBottom: 12 }}>{featured.tag}</span>
                <h2 className="h1" style={{ fontSize: 30, maxWidth: 500, lineHeight: 1.2 }}>{featured.title}</h2>
                <p className="muted" style={{ fontSize: 15, marginTop: 10, lineHeight: 1.55, maxWidth: 460 }}>{featured.excerpt}</p>
                <div className="row center gap12" style={{ marginTop: 18 }}>
                  <div className="post-avatar" style={{ width: 32, height: 32, fontSize: 13 }}>{featured.author[0]}</div>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{featured.author}</span>
                  <span className="dim">·</span>
                  <span className="dim" style={{ fontSize: 13 }}>{featured.date}</span>
                  <span className="dim">·</span>
                  <span className="dim" style={{ fontSize: 13 }}>{featured.readTime}</span>
                </div>
                <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={(e) => { e.stopPropagation(); goPost(featured.id); }}>
                  Read article <Icons.ArrowR size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Grid */}
        <div className="blog-list-grid">
          {filtered.map((p) => (
            <div key={p.id} className="card" style={{ overflow: "hidden", cursor: "pointer", transition: "transform .18s, border-color .18s" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "#2b3a55"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = ""; }}
              onClick={() => goPost(p.id)}>
              <div style={{ height: 200, background: "var(--inner)", position: "relative", overflow: "hidden" }}>
                <image-slot id={"list-" + p.heroSlot} style={{position:"absolute",inset:0,width:"100%",height:"100%"}} shape="rect" placeholder={p.heroPlaceholder}></image-slot>
                <span className="guide-cat badge badge-glass">{p.cat}</span>
              </div>
              <div style={{ padding: "20px 20px 18px" }}>
                <div className="row center gap8" style={{ marginBottom: 10 }}>
                  <div className="post-avatar" style={{ width: 28, height: 28, fontSize: 12 }}>{p.author[0]}</div>
                  <span className="muted" style={{ fontSize: 13 }}>{p.author}</span>
                  <span className="dim" style={{ fontSize: 12 }}>· {p.date}</span>
                </div>
                <h3 className="h3" style={{ fontSize: 18, lineHeight: 1.3 }}>{p.title}</h3>
                <p className="muted" style={{ fontSize: 13.5, lineHeight: 1.55, marginTop: 8 }}>{p.excerpt}</p>
                <div className="row between center" style={{ marginTop: 16 }}>
                  <span className="dim" style={{ fontSize: 12.5 }}>{p.readTime}</span>
                  <span className="link" style={{ fontSize: 13 }}>Read <Icons.ArrowR size={13} /></span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <EmptyState icon="Doc" title="No articles in this category yet" desc="Check back soon — more guides are on the way." />
        )}

        {/* Bottom CTA */}
        <div className="post-cta" style={{ marginTop: 64 }}>
          <div className="post-cta-inner">
            <div className="col gap6">
              <h3 className="h3" style={{ fontSize: 22 }}>Ready to plan your Iceland trip?</h3>
              <p className="muted" style={{ fontSize: 14.5 }}>Compare cars from Iceland's best rental providers — free cancellation on most bookings.</p>
            </div>
            <Btn variant="primary" size="lg" icon={Icons.Search} onClick={() => go("results")}>Find your car</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}


Object.assign(window, { BlogListScreen });