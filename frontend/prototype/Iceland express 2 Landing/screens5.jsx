// screens5.jsx — Blog: List + Post (conversion-optimised)
const { useState: useS5, useEffect: useEffectS5, useRef: useRefS5 } = React;

/* ============================================================
   Blog post data (unchanged)
   ============================================================ */
const BLOG_POSTS = [
  {
    id: "ring-road",
    tag: "Featured",
    cat: "Route",
    date: "June 3, 2026",
    readTime: "11 min read",
    author: "Sigríður Björnsdóttir",
    authorRole: "Local guide & travel writer",
    title: "7 Days on the Ring Road: A First-Timer's Honest Account",
    excerpt: "From Reykjavík to Jökulsárlón and back — what we wished we'd known before renting a 4×4 and heading into the unknown.",
    heroSlot: "blog-featured",
    heroPlaceholder: "Ring Road hero — Icelandic landscape panorama",
    relatedCarCat: "SUV",
    ctaTitle: "Ready to drive the Ring Road?",
    ctaDesc: "Most travellers pair this route with a 4×4 SUV. Free cancellation, CDW included.",
    midCtaAfter: 3,
    sections: [
      { type: "intro", body: "We booked a white Toyota RAV4 from Keflavík Airport at 08:00 on a Tuesday in early June. By 09:30 we were already past Selfoss, heading east, with the whole Ring Road in front of us and exactly zero idea what we were doing. Seven days later we returned the car, muddy, exhausted, and ready to go back." },
      { type: "h2", text: "Day 1–2: The South Coast" },
      { type: "body", body: "The South Coast is Iceland 101 — Seljalandsfoss, Skógafoss, the black sand of Reynisfjara, and if you're lucky, a puffin or twelve. It's deservedly popular, which means it's also deservedly crowded in summer. Leave early. We left Reykjavík at 07:00 on day one and had Seljalandsfoss to ourselves for 20 golden minutes before the first tour bus arrived.\n\nThe road surface on Route 1 here is excellent. You don't need a 4×4 for the south coast — but you'll be glad you have one the moment you turn onto any of the F-roads later in the trip." },
      { type: "img", slot: "blog-ring-road-south", placeholder: "South Coast — black sand beach, Reynisfjara", caption: "Reynisfjara beach. Arrive before 9am or after 7pm to beat the crowds." },
      { type: "h2", text: "Day 3: Skaftá and the Glacier Lagoon" },
      { type: "body", body: "Jökulsárlón is the payoff. After two days of waterfalls and basalt columns, the glacier lagoon hits differently. Icebergs the size of houses, some striped with volcanic ash from centuries of eruptions, drifting silently toward the sea. We spent four hours there — two more than planned.\n\nThe drive from Vík to Jökulsárlón is roughly 200 km on Route 1, mostly flat and straight. The road cuts through Skaftá, where a volcanic eruption in 1783 changed the course of European history. There's a small museum worth the stop." },
      { type: "pull", text: "Icebergs the size of houses, some striped with volcanic ash from centuries of eruptions, drifting silently toward the sea." },
      { type: "h2", text: "Day 4–5: The East Fjords" },
      { type: "body", body: "The East Fjords are Iceland's best-kept secret. No glaciers, fewer waterfalls, but the driving is extraordinary — single-track roads snaking up fjord walls, reindeer crossing at dusk, fishing villages that look unchanged since the 1970s. We slept in a tiny guesthouse in Djúpivogur for €80 including breakfast.\n\nOne practical note: petrol stations are sparse here. Fill up in Höfn before heading north. The next reliable station is in Egilsstaðir, 100 km away." },
      { type: "h2", text: "Day 6: Mývatn and the North" },
      { type: "body", body: "Mývatn deserves more than a single day but we gave it one anyway. The pseudo-craters at Skútustaðagígar, the lava formations at Dimmuborgir, the geothermal baths at the Nature Baths — all within 30 minutes of each other. The midges are real. Bring a head net." },
      { type: "img", slot: "blog-ring-road-north", placeholder: "Mývatn — volcanic crater lake, north Iceland", caption: "Mývatn at midnight. The midnight sun makes timing irrelevant — and everything magical." },
      { type: "h2", text: "Day 7: Back to Reykjavík" },
      { type: "body", body: "We finished the Ring Road and couldn't resist adding Þingvellir and Geysir on the way back. Strokkur erupting every five minutes in the low summer sun is impossible to skip.\n\nFinal car stats: 2,180 km over seven days. One puncture near Höfn. Zero regrets." },
      { type: "h2", text: "What we wish we'd known" },
      { type: "list", items: ["Book accommodation months in advance for June and July.", "The weather changes every 20 minutes. Pack layers even on sunny days.", "Speed cameras are everywhere. Iceland takes its 90 km/h limit seriously.", "Gravel F-roads need a 4×4. Not just recommended — legally required.", "The road.is app is essential for daily updates.", "Budget €60–80/day for petrol."] },
    ],
    relatedPosts: ["highland-f-roads", "ev-charging", "packing-june"],
  },
  {
    id: "highland-f-roads",
    tag: "Off-Road",
    cat: "Off-Road",
    date: "May 28, 2026",
    readTime: "6 min read",
    author: "Björn Sigurðsson",
    authorRole: "Off-road driving instructor",
    title: "F-Roads & the Highlands: Which 4×4 Do You Actually Need?",
    excerpt: "When to go, which 4×4 you need, and the five highland routes that reward the adventurous driver.",
    heroSlot: "blog-highland-hero",
    heroPlaceholder: "Highland F-road — river crossing, Landmannalaugar",
    relatedCarCat: "4x4",
    ctaTitle: "Heading into the highlands?",
    ctaDesc: "Book a high-clearance 4×4 with free cancellation — from €58/day.",
    midCtaAfter: 2,
    sections: [
      { type: "intro", body: "Iceland has roughly 7,000 km of F-roads — tracks that carve through lava fields, cross glacial rivers, and climb to passes where the wind genuinely tries to remove your car door. Driving them is the best thing you can do in Iceland. It is also the fastest way to ruin a rental car if you don't respect a few basic rules." },
      { type: "h2", text: "The golden rule: minimum clearance of 22 cm" },
      { type: "body", body: "F-roads are legally off-limits to 2WD vehicles. Not advisory — it's Icelandic law, and rental insurance is void if you drive an F-road in an unsuitable car. The minimum you need is a high-clearance 4×4: a Dacia Duster, Suzuki Jimny, or Toyota RAV4 will handle most F-roads. For the serious ones — F26, F88, F910 — you want a Defender or a Hilux." },
      { type: "pull", text: "Rental insurance is void if you drive an F-road in an unsuitable car. This is Icelandic law, not a recommendation." },
      { type: "h2", text: "The five F-roads worth the detour" },
      { type: "list", items: ["F35 Kjölur — the most accessible highland route. Good for first-timers.", "F208 Fjallabak — past Landmannalaugar and its rhyolite mountains.", "F26 Sprengisandur — Iceland's wild interior crossing. Requires experience.", "F88 to Askja — ends at a caldera lake you can swim in.", "F910 Öskjuvatn — the highest point accessible by car."] },
      { type: "img", slot: "blog-highland-crossing", placeholder: "River crossing on F208, highlands of Iceland", caption: "River crossings: enter perpendicular, drive slow and steady, never stop in the middle." },
      { type: "h2", text: "When do F-roads open?" },
      { type: "body", body: "F-roads are closed in winter — most open between mid-June and early July, depending on snowmelt. Check road.is daily during the opening window. F35 Kjölur typically opens first; Sprengisandur and the northern routes last. They close again in late September.\n\nDriving a closed F-road voids your insurance entirely and risks a fine." },
    ],
    relatedPosts: ["ring-road", "packing-june", "ev-charging"],
  },
  {
    id: "ev-charging",
    tag: "Electric Travel",
    cat: "Electric",
    date: "May 20, 2026",
    readTime: "5 min read",
    author: "María Eiríksdóttir",
    authorRole: "EV travel specialist",
    title: "Driving Iceland in an EV: Charging on the Ring Road",
    excerpt: "We mapped every fast charger on Route 1 so you can plan your Tesla or ID.4 trip with zero range anxiety.",
    heroSlot: "blog-ev-hero",
    heroPlaceholder: "Tesla Model 3 charging at an Icelandic fast charger",
    relatedCarCat: "Electric",
    ctaTitle: "Go electric in Iceland",
    ctaDesc: "Tesla Model 3 and VW ID.4 available — fast-charge capable, AWD.",
    midCtaAfter: 2,
    sections: [
      { type: "intro", body: "Driving an EV around Iceland's Ring Road is no longer an adventure in logistics — it's genuinely straightforward. As of June 2026, there are 43 fast chargers along or just off Route 1, most of them 50–150 kW DC units that will top you up while you eat lunch." },
      { type: "h2", text: "The charger map" },
      { type: "body", body: "The densest coverage is between Reykjavík and Vík (about 190 km) — you'll pass six fast chargers. The longest gap on the whole Ring Road is between Höfn and Egilsstaðir, at roughly 270 km. A Tesla Model 3 Long Range handles this comfortably even in cold weather; an ID.4 will want to top up in Höfn before setting off.\n\nN1 stations are the most reliable network — their 150 kW chargers work with CCS (ID.4, most European EVs) and Tesla's CCS adapter." },
      { type: "img", slot: "blog-ev-charger", placeholder: "DC fast charger at N1 station, South Iceland", caption: "N1 fast chargers accept CCS2 and can charge an ID.4 from 20% to 80% in under 40 minutes." },
      { type: "pull", text: "The longest gap on the Ring Road is 270 km. A Tesla Model 3 Long Range handles it comfortably — the ID.4 will want to top up beforehand." },
      { type: "h2", text: "Cold weather and range" },
      { type: "body", body: "June is the kindest month for EV range in Iceland — temperatures stay above 8°C and cabin heating rarely drops range more than 10–15%. October visits are a different matter; we saw 30% range reduction in sustained cold and wind.\n\nTip: pre-condition the battery before leaving your charger stop. In a Tesla this is automatic if you set a Supercharger as your next destination." },
      { type: "h2", text: "Charging costs" },
      { type: "body", body: "Electricity in Iceland is cheap — geothermal power means you pay about €0.08–0.12 per kWh at most DC chargers. A full charge for a Tesla Model 3 (82 kWh battery) costs roughly €8–10. Compare that to €60–80 in petrol for the same distance in a diesel 4×4." },
    ],
    relatedPosts: ["ring-road", "highland-f-roads", "packing-june"],
  },
  {
    id: "packing-june",
    tag: "Packing Tips",
    cat: "Practical",
    date: "May 12, 2026",
    readTime: "3 min read",
    author: "Anna Halldórsdóttir",
    authorRole: "Iceland Express team",
    title: "What to Pack for an Icelandic Road Trip in June",
    excerpt: "Layers, waterproofs and a good playlist. The essentials (and the things most people forget).",
    heroSlot: "blog-packing-hero",
    heroPlaceholder: "Packed car boot ready for Icelandic road trip",
    relatedCarCat: "SUV",
    ctaTitle: "Your car, sorted",
    ctaDesc: "Book with GPS, WiFi hotspot and camping kit — all in one go.",
    midCtaAfter: 2,
    sections: [
      { type: "intro", body: "June in Iceland is magical — midnight sun, open F-roads, puffins on the cliffs. It's also 8°C with horizontal rain at least once a day. Here's what actually belongs in your bag." },
      { type: "h2", text: "Clothing: the layer system" },
      { type: "list", items: ["Base layer × 3 (merino wool, not cotton)", "Mid-layer fleece × 2", "Waterproof outer shell — jacket and trousers", "Insulated down jacket for evenings", "Warm hat and gloves (yes, in June)", "Hiking boots, waterproof."] },
      { type: "h2", text: "Kit for the car" },
      { type: "body", body: "Your rental already comes with a spare tyre and emergency triangle. Add these yourself:" },
      { type: "list", items: ["Phone mount for the dashboard", "Portable power bank — USB-C, 20,000 mAh", "A physical map of Iceland", "Reusable water bottles — tap water is glacier-pure", "Cash (ISK) — some farm stops don't take cards", "Insect head net if you're going near Mývatn"] },
      { type: "pull", text: "Bring a physical map of Iceland. Mobile signal disappears in the highlands — and Google Maps doesn't know about river crossings." },
      { type: "img", slot: "blog-packing-gear", placeholder: "Laid-out gear — layers, boots, camera, map of Iceland", caption: "Everything you need, none of what you don't. Overpacking is the main rookie error." },
      { type: "h2", text: "What to skip" },
      { type: "body", body: "Formal clothes. A full-size suitcase (soft bags stack better in a 4×4 boot). Flip-flops as your primary footwear. And a selfie stick — Iceland will make you put the phone down anyway." },
    ],
    relatedPosts: ["ring-road", "highland-f-roads", "ev-charging"],
  },
];

const POST_MAP = Object.fromEntries(BLOG_POSTS.map((p) => [p.id, p]));
const BLOG_CATS = ["All", "Route", "Off-Road", "Electric", "Practical"];

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
        <image-slot id={post.heroSlot} style={{position:"absolute",inset:0,width:"100%",height:"100%"}} shape="rect" placeholder={post.heroPlaceholder}></image-slot>
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
        <Btn variant="ghost" size="sm" icon={Icons.Search} onClick={() => go("results")}>Compare all</Btn>
      </div>
    </div>
  );
}

/* ============================================================
   Sticky sidebar
   ============================================================ */
function BlogSidebar({ post, car, search, setSearch, go, onSelectCar }) {
  const h2s = post.sections.filter((s) => s.type === "h2");

  return (
    <div className="col gap16">
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
          <div>
            <label className="field-label">Pickup</label>
            <div className="sidebar-field">
              <Icons.Pin size={15} style={{ color: "var(--primary)", flex: "none" }} />
              <span>{search ? search.pickupLoc.name : LOCATIONS[0].name}</span>
            </div>
          </div>
          <div className="row gap8">
            <div className="grow">
              <label className="field-label">From</label>
              <div className="sidebar-field">
                <Icons.Calendar size={15} style={{ color: "var(--primary)", flex: "none" }} />
                <span>{search ? fmtDate(search.pickupDate) : "Pick a date"}</span>
              </div>
            </div>
            <div className="grow">
              <label className="field-label">To</label>
              <div className="sidebar-field">
                <Icons.Calendar size={15} style={{ color: "var(--primary)", flex: "none" }} />
                <span>{search ? fmtDate(search.returnDate) : "Pick a date"}</span>
              </div>
            </div>
          </div>
          <Btn variant="primary" block icon={Icons.Search} onClick={() => go("results")}>Search available cars</Btn>
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

Object.assign(window, { BlogListScreen, BlogPostScreen, BLOG_POSTS, POST_MAP });
