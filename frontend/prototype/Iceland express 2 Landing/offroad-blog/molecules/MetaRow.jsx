// molecules/MetaRow.jsx
// ─────────────────────────────────────────────────────────────
// Iceland Express DS — MetaRow molecule
// Author avatar + name + optional role + date + readTime.
// Composed of: Avatar atom, Icons.Clock atom
//
// Props:
//   author   : string
//   role     : string (optional)
//   date     : string
//   readTime : string
//   size     : 'sm' | 'md'  (default: 'md')
// ─────────────────────────────────────────────────────────────

function MetaRow({ author, role, date, readTime, size = 'md' }) {
  const avatarSz = size === 'sm' ? 28 : 38;
  const nameFz   = size === 'sm' ? 13 : 14;
  const metaFz   = size === 'sm' ? 12 : 13;

  return (
    <div className="meta-row">
      {author && (
        <div className="row gap-8">
          <Avatar name={author} size={avatarSz} />
          <div className="col gap-4">
            <span className="author-name" style={{ fontSize: nameFz }}>{author}</span>
            {role && <span className="author-role" style={{ fontSize: metaFz - 1 }}>{role}</span>}
          </div>
        </div>
      )}
      {(date || readTime) && <span className="meta-sep">·</span>}
      {date     && <span style={{ fontSize: metaFz }}>{date}</span>}
      {readTime && (
        <>
          <span className="meta-sep">·</span>
          <span style={{ fontSize: metaFz, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Icons.Clock size={13} />{readTime}
          </span>
        </>
      )}
    </div>
  );
}
