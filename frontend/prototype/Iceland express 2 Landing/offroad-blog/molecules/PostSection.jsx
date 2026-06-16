// molecules/PostSection.jsx
// ─────────────────────────────────────────────────────────────
// Iceland Express DS — PostSection molecule
// Renders one section of a blog post based on its type.
// Used by PostBody organism to map over post.sections[].
//
// Section types:
//   intro  — large italic lead-in paragraph
//   h2     — section heading
//   body   — multi-paragraph body copy (\\n\\n = new paragraph)
//   pull   — blockquote pull quote
//   img    — image with optional caption (uses image-slot)
//   list   — bullet list with chevron icons
// ─────────────────────────────────────────────────────────────

function PostSection({ section: s }) {
  switch (s.type) {

    case 'intro':
      return <p className="post-intro">{s.body}</p>;

    case 'h2':
      return <h2 className="post-h2">{s.text}</h2>;

    case 'body':
      return (
        <div className="post-text">
          {s.body.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
        </div>
      );

    case 'pull':
      return <PullQuote text={s.text} />;

    case 'img':
      return (
        <figure className="post-img-wrap">
          {/* image-slot: drag & drop target — replace with <img> in production */}
          <image-slot
            id={s.slot}
            style={{ width: '100%', height: '100%', display: 'block' }}
            shape="rect"
            placeholder={s.placeholder}
          ></image-slot>
          {s.caption && <figcaption className="post-caption">{s.caption}</figcaption>}
        </figure>
      );

    case 'list':
      return (
        <ul className="post-list">
          {s.items.map((item, i) => (
            <li key={i} className="post-list-item">
              <span className="post-list-bullet"><Icons.ChevronR size={14} /></span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    default:
      return null;
  }
}
