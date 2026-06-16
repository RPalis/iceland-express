// screen-BP-blog-post.jsx — BP Blog Post
// Figma: Blog Post
const { useState: useS5, useEffect: useEffectS5, useRef: useRefS5 } = React;

/* ============================================================
   BLOG POST SCREEN (conversion-optimised)
   ============================================================ */
function BlogPostScreen({ postId, go, goPost, search, setSearch, onSelectCar }) {
  const post = POST_MAP[postId] || BLOG_POSTS[0];
  const relCar = CARS.find((c) => c.cat === post.relatedCarCat) || CARS[0];
  const [progress, setProgress] = useS5(0);
  const bodyRef = useRefS5(null);

  // Reading progress
  useEffectS5(() => {
    function onScroll() {
      const el = bodyRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      const h = el.offsetHeight;
      const vh = window.innerHeight;
      const read = Math.max(0, Math.min(1, (-top + vh * 0.5) / (h - vh * 0.5)));
      setProgress(read);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [post.id]);

  // Build sections with mid-article CTA injected
  const midIdx = post.midCtaAfter || 3;
  const sections = post.sections.reduce((acc, s, i) => {
    acc.push({ ...s, _idx: i });
    if (i === midIdx) acc.push({ type: "_midcta" });
    return acc;
  }, []);

  return (
    <div className="flow" style={{ paddingBottom: 120 }}>
      {/* Reading progress bar */}
      <div style={{ position: "fixed", top: 72, left: 0, right: 0, height: 3, zIndex: 50, background: "var(--fill)", pointerEvents: "none" }}>
        <div style={{ height: "100%", width: (progress * 100) + "%", background: "var(--primary)", transition: "width .1s linear", borderRadius: "0 2px 2px 0" }}></div>
      </div>

      {/* Hero */}
      <div className="post-hero">
        <image-slot id={post.heroSlot} style={{position:"absolute",inset:0,width:"100%",height:"100%",zIndex:0}} shape="rect" placeholder={post.heroPlaceholder}></image-slot>
        <div className="post-hero-overlay"></div>
        <div className="shell post-hero-inner">
          <div className="row center gap6" style={{ marginBottom: 20 }}>
            <span className="link dim" onClick={() => go("home")} style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>Home</span>
            <Icons.ChevronR size={13} style={{ color: "rgba(255,255,255,0.3)" }} />
            <span className="link dim" onClick={() => go("blog")} style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>Blog</span>
            <Icons.ChevronR size={13} style={{ color: "rgba(255,255,255,0.3)" }} />
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>{post.cat}</span>
          </div>
          <span className={"badge " + (post.tag === "Featured" ? "badge-primary" : "badge-soft")} style={{ marginBottom: 14 }}>{post.cat}</span>
          <h1 className="display post-hero-title">{post.title}</h1>
          <p className="post-hero-excerpt">{post.excerpt}</p>
          <div className="post-meta">
            <MetaRow author={post.author} role={post.authorRole} date={post.date} readTime={post.readTime} />
            <FreeCancBadge compact />
          </div>
        </div>
      </div>

      {/* Two-column body */}
      <div className="shell post-layout" ref={bodyRef}>
        {/* Article */}
        <article className="post-article">
          {sections.map((s, i) => (
            s.type === "_midcta"
              ? <MidArticleCTA key="midcta" post={post} car={relCar} go={go} onSelectCar={onSelectCar} />
              : <PostSection key={i} section={s} />
          ))}

          {/* End CTA */}
          <div className="post-end-cta">
            <div className="row center gap10" style={{ marginBottom: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--primary-tint)", display: "grid", placeItems: "center", color: "var(--primary-strong)", flex: "none" }}>
                <Icons.Search size={22} />
              </div>
              <div>
                <h3 className="h3" style={{ fontSize: 22 }}>{post.ctaTitle}</h3>
                <p className="muted" style={{ fontSize: 14.5, marginTop: 4 }}>{post.ctaDesc}</p>
              </div>
            </div>
            <div className="row gap12 wrap" style={{ alignItems: "center" }}>
              <Btn variant="primary" size="lg" icon={Icons.Search} onClick={() => go("results")}>Search available cars</Btn>
              <div className="row center gap10 card" style={{ padding: "10px 14px", gap: 12 }}>
                <img src={relCar.img} alt={relCar.name} style={{ width: 64, height: 48, objectFit: "cover", borderRadius: "var(--r-sm)" }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{relCar.name}</div>
                  <div className="muted" style={{ fontSize: 12 }}>from {eur(relCar.perDay)}/day</div>
                </div>
                <button className="btn btn-primary btn-sm" onClick={() => { onSelectCar && onSelectCar(relCar); go("detail"); }}>Book</button>
              </div>
            </div>
          </div>

          {/* Related posts */}
          <div style={{ marginTop: 60 }}>
            <div className="row between center" style={{ marginBottom: 22 }}>
              <h2 className="h2">More from the blog</h2>
              <span className="link" onClick={() => go("blog")} style={{ fontSize: 13 }}>All articles <Icons.ArrowR size={13} /></span>
            </div>
            <div className="post-related-grid">
              {post.relatedPosts.slice(0, 3).map((rid) => {
              const rp = POST_MAP[rid]; if (!rp) return null;
              return <BlogCardV2 key={rid} post={rp} onClick={() => goPost(rid)} variant="grid" />;
            })}
            </div>
          </div>
        </article>

        {/* Sticky sidebar */}
        <aside className="post-sidebar">
          <BlogSidebar post={post} car={relCar} search={search} setSearch={setSearch} go={go} onSelectCar={onSelectCar} />
        </aside>
      </div>

      {/* Mobile sticky bottom bar */}
      <MobileBookingBar post={post} car={relCar} go={go} />
    </div>
  );
}

/* ============================================================
   Mid-article inline CTA
   ============================================================ */
function MidArticleCTA({ post, car, go, onSelectCar }) {
  return (
    <div className="mid-article-cta">
      <div className="row center gap12" style={{ marginBottom: 12 }}>
        <img src={car.img} alt={car.name} style={{ width: 72, height: 54, objectFit: "cover", borderRadius: "var(--r-sm)", flex: "none" }} />
        <div className="grow">
          <div style={{ fontSize: 12, color: "var(--primary-strong)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Recommended for this trip</div>
          <div style={{ fontWeight: 700, fontSize: 16, marginTop: 3 }}>{car.name}</div>
          <div className="row center gap8" style={{ marginTop: 4 }}>
            <Stars value={car.rating} size={13} />
            <span className="muted" style={{ fontSize: 12 }}>{car.rating} · {car.reviews} reviews</span>
          </div>
        </div>
        <div className="col" style={{ alignItems: "flex-end", flex: "none" }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22 }}>{eur(car.perDay)}</span>
          <span className="muted" style={{ fontSize: 12 }}>/day</span>
        </div>
      </div>
      <div className="row center gap8 wrap">
        <span className="badge badge-success"><Icons.Shield size={12} /> Free cancellation</span>
        <span className="badge badge-outline"><Icons.Gear size={12} /> {car.transmission}</span>
        <span className="badge badge-outline"><Icons.Drive size={12} /> {car.drive}</span>
        <span className="badge badge-outline"><Icons.Users size={12} /> {car.seats} seats</span>
      </div>
      <div className="row gap10" style={{ marginTop: 14 }}>
        <Btn variant="primary" block iconEnd={Icons.ArrowR} onClick={() => { onSelectCar && onSelectCar(car); go("detail"); }}>View this car</Btn>
      </div>
    </div>
  );
}

/* ============================================================
   Sticky sidebar
   ============================================================ */
function BlogSidebar({ post, car, search, setSearch, go, onSelectCar }) {
  const h2s = post.sections.filter((s) => s.type === "h2");
  const [open, setOpen] = useS5(null);
  const [calMode, setCalMode] = useS5("pickup");
  const ref = useOutside(() => setOpen(null));

  const s = search || {
    pickupLoc: LOCATIONS[0], dropoffLoc: LOCATIONS[0],
    pickupDate: (() => { const d = new Date(); d.setDate(d.getDate() + 7); d.setHours(0,0,0,0); return d; })(),
    returnDate: (() => { const d = new Date(); d.setDate(d.getDate() + 12); d.setHours(0,0,0,0); return d; })(),
    pickupTime: "10:00", returnTime: "10:00",
  };

  function set(patch) { setSearch && setSearch({ ...s, ...patch }); }

  function pickDate(d) {
    if (calMode === "pickup") {
      const patch = { pickupDate: d };
      if (s.returnDate <= d) { const nd = new Date(d); nd.setDate(nd.getDate() + 1); patch.returnDate = nd; }
      set(patch);
      setCalMode("return");
    } else {
      if (d <= s.pickupDate) set({ pickupDate: d });
      else { set({ returnDate: d }); setOpen(null); }
    }
  }

  function handleSearch() {
    setOpen(null);
    go("results");
  }

  return (
    <div className="col gap16" ref={ref}>
      {/* Book CTA card */}
      <div className="sidebar-book-card">
        <div className="row center gap8" style={{ marginBottom: 14 }}>
          <span style={{ width: 36, height: 36, display: "grid", placeItems: "center", background: "var(--primary-tint)", borderRadius: "var(--r-sm)", color: "var(--primary-strong)", flex: "none" }}><Icons.Search size={18} /></span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>Book a car for this trip</div>
            <div className="muted" style={{ fontSize: 12.5 }}>Free cancellation · CDW included</div>
          </div>
        </div>

        <div className="col gap8">
          {/* Pickup location */}
          <div>
            <label className="field-label">Pickup location</label>
            <div style={{ position: "relative" }}>
              <button
                className={"sidebar-field" + (open === "loc" ? " open" : "")}
                style={{ width: "100%", cursor: "pointer", background: open === "loc" ? "var(--fill)" : "var(--inner)", border: `1px solid ${open === "loc" ? "var(--primary)" : "var(--border)"}`, borderRadius: "var(--r-sm)", display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", transition: "border-color .14s" }}
                onClick={() => setOpen(open === "loc" ? null : "loc")}
              >
                <Icons.Pin size={15} style={{ color: "var(--primary)", flex: "none" }} />
                <span style={{ fontSize: 13.5, fontWeight: 500, flex: 1, textAlign: "left", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.pickupLoc.name}</span>
                <Icons.Chevron size={13} style={{ color: "var(--dim)", flex: "none", transform: open === "loc" ? "rotate(180deg)" : "none", transition: "transform .15s" }} />
              </button>
              {open === "loc" && (
                <div className="pop" style={{ top: "calc(100% + 6px)", left: 0, right: 0, zIndex: 70 }}>
                  <LocationList value={s.pickupLoc} onPick={(l) => { set({ pickupLoc: l, dropoffLoc: l }); setOpen(null); }} />
                </div>
              )}
            </div>
          </div>

          {/* Dates */}
          <div className="row gap8">
            <div className="grow">
              <label className="field-label">Pickup date</label>
              <div style={{ position: "relative" }}>
                <button
                  className="sidebar-field"
                  style={{ width: "100%", cursor: "pointer", background: open === "cal" && calMode === "pickup" ? "var(--fill)" : "var(--inner)", border: `1px solid ${open === "cal" ? "var(--primary)" : "var(--border)"}`, borderRadius: "var(--r-sm)", display: "flex", alignItems: "center", gap: 6, padding: "9px 10px", transition: "border-color .14s" }}
                  onClick={() => { setCalMode("pickup"); setOpen(open === "cal" ? null : "cal"); }}
                >
                  <Icons.Calendar size={14} style={{ color: "var(--primary)", flex: "none" }} />
                  <span style={{ fontSize: 12.5, fontWeight: 500 }}>{fmtDate(s.pickupDate)}</span>
                </button>
              </div>
            </div>
            <div className="grow">
              <label className="field-label">Return date</label>
              <div style={{ position: "relative" }}>
                <button
                  className="sidebar-field"
                  style={{ width: "100%", cursor: "pointer", background: open === "cal" && calMode === "return" ? "var(--fill)" : "var(--inner)", border: `1px solid ${open === "cal" ? "var(--primary)" : "var(--border)"}`, borderRadius: "var(--r-sm)", display: "flex", alignItems: "center", gap: 6, padding: "9px 10px", transition: "border-color .14s" }}
                  onClick={() => { setCalMode("return"); setOpen(open === "cal" ? null : "cal"); }}
                >
                  <Icons.Calendar size={14} style={{ color: "var(--primary)", flex: "none" }} />
                  <span style={{ fontSize: 12.5, fontWeight: 500 }}>{fmtDate(s.returnDate)}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Calendar popover */}
          {open === "cal" && (
            <div className="pop" style={{ zIndex: 70 }}>
              <div className="segmented accent" style={{ width: "100%", marginBottom: 12 }}>
                <button className={calMode === "pickup" ? "on" : ""} style={{ flex: 1 }} onClick={() => setCalMode("pickup")}>Pickup</button>
                <button className={calMode === "return" ? "on" : ""} style={{ flex: 1 }} onClick={() => setCalMode("return")}>Return</button>
              </div>
              <Calendar pickupDate={s.pickupDate} returnDate={s.returnDate} mode={calMode} onPick={pickDate} />
            </div>
          )}

          <Btn variant="primary" block icon={Icons.Search} onClick={handleSearch}>
            Search available cars
          </Btn>
        </div>

        <div className="row center gap6" style={{ justifyContent: "center", marginTop: 12, fontSize: 12, color: "var(--dim)" }}>
          <Icons.Shield size={13} style={{ color: "var(--success)" }} /> No payment until booking
        </div>
      </div>

      {/* Recommended car */}
      <div className="card card-pad col gap12">
        <div className="eyebrow">Recommended for this article</div>
        <div style={{ borderRadius: "var(--r-md)", overflow: "hidden", height: 120 }}>
          <img src={car.img} alt={car.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div>
          <div className="row between center">
            <h3 className="h3" style={{ fontSize: 15.5 }}>{car.name}</h3>
            <span className="badge badge-success" style={{ fontSize: 11 }}>Free cancellation</span>
          </div>
          <div className="row center gap6" style={{ marginTop: 6 }}>
            <Stars value={car.rating} size={13} />
            <span className="muted" style={{ fontSize: 12 }}>{car.rating} ({car.reviews})</span>
          </div>
        </div>
        <div className="spec-row" style={{ margin: 0 }}>
          <div className="spec-cell"><Icons.Gear size={14} /><span>{car.transmission}</span></div>
          <div className="spec-cell"><Icons.Users size={14} /><span>{car.seats}</span></div>
          <div className="spec-cell"><Icons.Bag size={14} /><span>{car.bags}</span></div>
          <div className="spec-cell"><Icons.Drive size={14} /><span>{car.drive}</span></div>
        </div>
        <div className="row between center">
          <div>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22 }}>{eur(car.perDay)}</span>
            <span className="muted" style={{ fontSize: 13 }}>/day</span>
          </div>
          <Btn variant="primary" size="sm" iconEnd={Icons.ArrowR} onClick={() => { onSelectCar && onSelectCar(car); go("detail"); }}>Book this car</Btn>
        </div>
      </div>

      {/* Table of contents */}
      {h2s.length > 0 && (
        <div className="card card-pad">
          <div className="eyebrow" style={{ marginBottom: 12 }}>In this article</div>
          <div className="col gap8">
            {h2s.map((s, i) => (
              <div key={i} className="row center gap8" style={{ fontSize: 13.5, color: "var(--muted)", cursor: "pointer" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--fg)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "var(--muted)"}>
                <span style={{ width: 20, height: 20, background: "var(--fill)", borderRadius: "50%", display: "grid", placeItems: "center", fontSize: 11, fontWeight: 700, color: "var(--primary)", flex: "none" }}>{i + 1}</span>
                <span style={{ lineHeight: 1.3 }}>{s.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   Mobile sticky booking bar
   ============================================================ */
function MobileBookingBar({ post, car, go }) {
  const [visible, setVisible] = useS5(false);
  useEffectS5(() => {
    function onScroll() { setVisible(window.scrollY > 400); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return (
    <div className="mobile-book-bar">
      <div className="col gap1">
        <span style={{ fontWeight: 700, fontSize: 15 }}>Book a car from {eur(car.perDay)}/day</span>
        <span className="muted" style={{ fontSize: 12 }}>Free cancellation · CDW included</span>
      </div>
      <Btn variant="primary" icon={Icons.Search} onClick={() => go("results")}>Search cars</Btn>
    </div>
  );
}

/* ============================================================
   Post section renderer
   ============================================================ */
function PostSection({ section: s }) {
  switch (s.type) {
    case "intro": return <p className="post-intro">{s.body}</p>;
    case "h2": return <h2 className="post-h2">{s.text}</h2>;
    case "body": return (
      <div className="post-text">
        {s.body.split("\n\n").map((para, i) => <p key={i}>{para}</p>)}
      </div>
    );
    case "pull": return <blockquote className="post-pull">{s.text}</blockquote>;
    case "img": return (
      <figure className="post-img-wrap">
        <image-slot id={s.slot} style={{width:"100%",height:"100%",display:"block"}} shape="rect" placeholder={s.placeholder}></image-slot>
        {s.caption && <figcaption className="post-caption">{s.caption}</figcaption>}
      </figure>
    );
    case "list": return (
      <ul className="post-list">
        {s.items.map((item, i) => (
          <li key={i} className="post-list-item">
            <span className="post-list-bullet"><Icons.ChevronR size={14} /></span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
    default: return null;
  }
}

Object.assign(window, { BlogPostScreen });
