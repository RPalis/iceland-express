// organisms/PostBody.jsx
// ─────────────────────────────────────────────────────────────
// Iceland Express DS — PostBody organism
// Renders the full article content with mid-article CTA injected
// after a configurable section index.
// Molecules used: PostSection
// Organisms used: MidArticleCTA
//
// Props:
//   post        : full post object
//   car         : recommended car object
//   midCtaAfter : number — inject CTA after this section index
//   onBook      : function — passed to MidArticleCTA
// ─────────────────────────────────────────────────────────────

function PostBody({ post, car, midCtaAfter, onBook }) {
  // Build sections array, injecting mid-CTA sentinel at the right index
  const sections = [];
  post.sections.forEach((s, i) => {
    sections.push({ ...s, _i: i });
    if (i === (midCtaAfter ?? post.midCtaAfter ?? 3)) {
      sections.push({ type: '_midcta' });
    }
  });

  return (
    <article className="post-article">
      {sections.map((s, i) =>
        s.type === '_midcta'
          ? <MidArticleCTA key="midcta" car={car} onBook={onBook} />
          : <PostSection key={i} section={s} />
      )}
    </article>
  );
}
