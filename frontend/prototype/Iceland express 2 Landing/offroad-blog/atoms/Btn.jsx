// atoms/Btn.jsx
// ─────────────────────────────────────────────────────────────
// Iceland Express DS — Btn atom
// Smallest button unit. All variants, sizes and states live here.
//
// Props:
//   variant  : 'primary' | 'ghost' | 'outline' | 'danger' | 'link'  (default: 'primary')
//   size     : 'sm' | 'md' | 'lg'                                    (default: 'md')
//   icon     : Icon component (rendered left of label)
//   iconEnd  : Icon component (rendered right of label)
//   block    : boolean — full width
//   disabled : boolean
//   loading  : boolean — shows spinner, disables interaction
//   onClick  : function
//   type     : 'button' | 'submit'                                   (default: 'button')
// ─────────────────────────────────────────────────────────────

function Btn({
  variant  = 'primary',
  size     = 'md',
  icon: Icon,
  iconEnd: IconEnd,
  block,
  disabled,
  loading,
  children,
  onClick,
  style,
  type,
}) {
  const sizeClass  = size === 'lg' ? ' btn-lg' : size === 'sm' ? ' btn-sm' : '';
  const blockClass = block ? ' btn-block' : '';
  const loadClass  = loading ? ' loading' : '';
  const iconSize   = { sm: 14, md: 16, lg: 19 }[size] || 16;

  return (
    <button
      className={`btn btn-${variant}${sizeClass}${blockClass}${loadClass}`}
      disabled={disabled || loading}
      onClick={onClick}
      style={style}
      type={type || 'button'}
    >
      {Icon && !loading && <Icon size={iconSize} />}
      {children}
      {IconEnd && !loading && <IconEnd size={iconSize} />}
    </button>
  );
}
