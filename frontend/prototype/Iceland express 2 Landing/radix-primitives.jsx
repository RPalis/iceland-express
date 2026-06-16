// radix-primitives.jsx — Custom behaviour wrappers (prototype)
// Mirrors Radix UI API surface using React + ReactDOM.createPortal only.
// Production swap: replace CDN line in HTML with @radix-ui/* via bundler —
// no component code changes needed; all styling is IE CSS custom properties.

const { useState, useEffect, useRef, useCallback, createContext, useContext } = React;

// ─── Portal ─────────────────────────────────────────────────────────────────

const IEPortal = ({ children }) => ReactDOM.createPortal(children, document.body);

// ─── Shared hooks ───────────────────────────────────────────────────────────

function useEscapeKey(handler, active) {
  useEffect(() => {
    if (!active) return;
    const fn = (e) => { if (e.key === 'Escape') handler(); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [handler, active]);
}

function useClickOutside(ref, handler, active) {
  useEffect(() => {
    if (!active) return;
    const fn = (e) => {
      if (ref.current && !ref.current.contains(e.target)) handler(e);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, [handler, active]);
}

function useFocusTrap(ref, active) {
  useEffect(() => {
    if (!active || !ref.current) return;
    const sel = 'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])';
    const nodes = Array.from(ref.current.querySelectorAll(sel)).filter(
      n => !n.disabled && n.offsetParent !== null
    );
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    const prev = document.activeElement;
    first?.focus();
    const trap = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', trap);
    return () => {
      document.removeEventListener('keydown', trap);
      prev?.focus();
    };
  }, [active]);
}

function useScrollLock(active) {
  useEffect(() => {
    if (!active) return;
    const orig = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = orig; };
  }, [active]);
}

// ─── IEDialog ───────────────────────────────────────────────────────────────
// Composition: <IEDialog.Root> <IEDialog.Trigger> <IEDialog.Content>
//              <IEDialog.Title> <IEDialog.Description> <IEDialog.Close>

const _DialogCtx = createContext(null);

function _DialogRoot({ open = false, onOpenChange, children }) {
  const close = useCallback(() => onOpenChange?.(false), [onOpenChange]);
  const open2 = useCallback(() => onOpenChange?.(true), [onOpenChange]);
  return <_DialogCtx.Provider value={{ open, close, open2 }}>{children}</_DialogCtx.Provider>;
}

function _DialogTrigger({ children, asChild }) {
  const { open2 } = useContext(_DialogCtx) || {};
  if (asChild) {
    return React.cloneElement(React.Children.only(children), {
      onClick: (e) => { children.props.onClick?.(e); open2?.(); }
    });
  }
  return <button type="button" onClick={open2}>{children}</button>;
}

function _DialogContent({ children, style, className }) {
  const { open, close } = useContext(_DialogCtx) || {};
  const ref = useRef(null);
  useEscapeKey(close, open);
  useFocusTrap(ref, open);
  useScrollLock(open);
  if (!open) return null;
  return (
    <IEPortal>
      <div
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(5,6,16,0.85)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 'var(--z-modal)', padding: 'var(--space-6)'
        }}
        onClick={(e) => { if (e.target === e.currentTarget) close?.(); }}
        aria-hidden="true"
      >
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          className={className}
          style={{
            background: 'var(--modal-bg)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--modal-radius)',
            boxShadow: 'var(--modal-shadow)',
            maxWidth: 560, width: '100%',
            maxHeight: '90vh', overflowY: 'auto',
            padding: 'var(--pad-card)',
            position: 'relative',
            ...style
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </IEPortal>
  );
}

function _DialogTitle({ children, style }) {
  return (
    <h2 style={{
      margin: 0, marginBottom: 'var(--space-2)',
      fontSize: 'var(--text-xl)', fontWeight: 'var(--weight-bold)',
      color: 'var(--fg)', fontFamily: 'var(--font-display)', ...style
    }}>
      {children}
    </h2>
  );
}

function _DialogDescription({ children, style }) {
  return (
    <p style={{ margin: 0, marginBottom: 'var(--space-4)', color: 'var(--muted)',
                fontSize: 'var(--text-sm)', ...style }}>
      {children}
    </p>
  );
}

function _DialogClose({ children, style }) {
  const { close } = useContext(_DialogCtx) || {};
  return (
    <button
      type="button"
      onClick={close}
      aria-label="Close dialog"
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        color: 'var(--muted)', padding: 'var(--space-1)',
        lineHeight: 1, fontSize: 'var(--text-lg)', ...style
      }}
    >
      {children || '✕'}
    </button>
  );
}

const IEDialog = Object.assign(_DialogRoot, {
  Root: _DialogRoot,
  Trigger: _DialogTrigger,
  Content: _DialogContent,
  Title: _DialogTitle,
  Description: _DialogDescription,
  Close: _DialogClose,
});

// ─── IESheet ────────────────────────────────────────────────────────────────
// Slide-over panel. Props: open, onOpenChange, side ('right'|'left'), width (px)

function IESheet({ open = false, onOpenChange, side = 'right', width = 360, children }) {
  const ref = useRef(null);
  const close = useCallback(() => onOpenChange?.(false), [onOpenChange]);
  useEscapeKey(close, open);
  useFocusTrap(ref, open);
  useScrollLock(open);
  if (!open) return null;
  const edgeStyle = side === 'right'
    ? { right: 0, borderLeft: '1px solid var(--border)' }
    : { left: 0, borderRight: '1px solid var(--border)' };
  return (
    <IEPortal>
      <div
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(5,6,16,0.65)',
          zIndex: 'var(--z-modal)'
        }}
        onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      >
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed', top: 0, bottom: 0, width,
            background: 'var(--card)',
            overflowY: 'auto',
            display: 'flex', flexDirection: 'column',
            boxShadow: 'var(--shadow-xl)',
            ...edgeStyle
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </IEPortal>
  );
}

// ─── IEPopover ──────────────────────────────────────────────────────────────
// Anchored popover. Uses fixed positioning + getBoundingClientRect.
// Props: trigger (element), children, open?, onOpenChange?, side?, align?

function IEPopover({ trigger, children, open: cOpen, onOpenChange, side = 'bottom', align = 'start' }) {
  const [selfOpen, setSelfOpen] = useState(false);
  const open = cOpen !== undefined ? cOpen : selfOpen;
  const setOpen = onOpenChange !== undefined ? onOpenChange : setSelfOpen;
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const contentRef = useRef(null);

  const calcPos = useCallback(() => {
    if (!triggerRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    const gap = 8;
    if (side === 'bottom') setPos({ top: r.bottom + gap, left: align === 'end' ? r.right : r.left });
    else if (side === 'top') setPos({ top: r.top - gap, left: align === 'end' ? r.right : r.left, transform: 'translateY(-100%)' });
    else if (side === 'right') setPos({ top: r.top, left: r.right + gap });
    else setPos({ top: r.top, left: r.left - gap, transform: 'translateX(-100%)' });
  }, [side, align]);

  const toggle = useCallback(() => {
    if (!open) calcPos();
    setOpen(!open);
  }, [open, calcPos]);

  useEscapeKey(() => setOpen(false), open);
  useClickOutside(contentRef, (e) => {
    if (!triggerRef.current?.contains(e.target)) setOpen(false);
  }, open);

  const triggerEl = React.cloneElement(React.Children.only(trigger), {
    ref: triggerRef,
    onClick: (e) => { trigger.props.onClick?.(e); toggle(); }
  });

  return (
    <>
      {triggerEl}
      {open && (
        <IEPortal>
          <div
            ref={contentRef}
            role="dialog"
            style={{
              position: 'fixed',
              top: pos.top, left: pos.left,
              transform: pos.transform,
              zIndex: 'var(--z-popover)',
              background: 'var(--popover)',
              color: 'var(--popover-foreground)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-md)',
              boxShadow: 'var(--shadow-pop)',
              minWidth: 200
            }}
          >
            {children}
          </div>
        </IEPortal>
      )}
    </>
  );
}

// ─── IESelect ───────────────────────────────────────────────────────────────
// Dropdown select. Props: value, onValueChange, options [{value, label}], placeholder, disabled

function IESelect({ value, onValueChange, options = [], placeholder = 'Select…', disabled = false }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef(null);
  const listRef = useRef(null);
  const [focused, setFocused] = useState(-1);

  const calcPos = () => {
    if (!triggerRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    setPos({ top: r.bottom + 4, left: r.left, width: r.width });
  };

  const toggle = () => {
    if (disabled) return;
    if (!open) { calcPos(); setFocused(-1); }
    setOpen(o => !o);
  };

  useEscapeKey(() => setOpen(false), open);
  useClickOutside(listRef, (e) => {
    if (!triggerRef.current?.contains(e.target)) setOpen(false);
  }, open);

  const select = (opt) => {
    onValueChange?.(opt.value);
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (!open) { if (e.key === 'Enter' || e.key === ' ') { calcPos(); setOpen(true); } return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); setFocused(f => Math.min(f + 1, options.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setFocused(f => Math.max(f - 1, 0)); }
    else if (e.key === 'Enter' && focused >= 0) { select(options[focused]); }
    else if (e.key === 'Escape') setOpen(false);
  };

  const selected = options.find(o => o.value === value);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        disabled={disabled}
        onClick={toggle}
        onKeyDown={onKeyDown}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          width: '100%', height: 'var(--input-height)',
          padding: '0 var(--input-px)',
          background: 'var(--input-bg)',
          border: `1px solid ${open ? 'var(--input-border-focus)' : 'var(--input-border)'}`,
          borderRadius: 'var(--input-radius)',
          color: selected ? 'var(--input-text)' : 'var(--input-placeholder)',
          fontSize: 'var(--text-base)',
          fontFamily: 'var(--font-body)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          outline: 'none',
          boxSizing: 'border-box'
        }}
      >
        <span>{selected?.label || placeholder}</span>
        <span style={{ color: 'var(--dim)', fontSize: 'var(--text-sm)', marginLeft: 'var(--space-2)' }}>
          {open ? '▲' : '▼'}
        </span>
      </button>
      {open && (
        <IEPortal>
          <ul
            ref={listRef}
            role="listbox"
            style={{
              position: 'fixed',
              top: pos.top, left: pos.left, width: pos.width,
              margin: 0, padding: 'var(--space-1)',
              listStyle: 'none',
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-md)',
              boxShadow: 'var(--shadow-md)',
              zIndex: 'var(--z-dropdown)',
              maxHeight: 260, overflowY: 'auto',
              outline: 'none'
            }}
          >
            {options.map((opt, i) => (
              <li
                key={opt.value}
                role="option"
                aria-selected={opt.value === value}
                onClick={() => select(opt)}
                style={{
                  padding: 'var(--space-2) var(--space-3)',
                  borderRadius: 'var(--r-sm)',
                  cursor: 'pointer',
                  fontSize: 'var(--text-base)',
                  color: opt.value === value ? 'var(--primary)' : 'var(--fg)',
                  background: i === focused ? 'var(--fill)' : 'transparent',
                  display: 'flex', alignItems: 'center', gap: 'var(--space-2)'
                }}
                onMouseEnter={() => setFocused(i)}
              >
                {opt.value === value && (
                  <span style={{ color: 'var(--primary)', fontSize: 'var(--text-sm)' }}>✓</span>
                )}
                {opt.label}
              </li>
            ))}
          </ul>
        </IEPortal>
      )}
    </>
  );
}

// ─── IETabs ─────────────────────────────────────────────────────────────────
// Composition: <IETabs.Root> <IETabs.List> <IETabs.Trigger value> <IETabs.Content value>

const _TabsCtx = createContext(null);

function _TabsRoot({ defaultValue, value: cValue, onValueChange, children, style }) {
  const [selfValue, setSelfValue] = useState(defaultValue || '');
  const value = cValue !== undefined ? cValue : selfValue;
  const setValue = onValueChange || setSelfValue;
  return (
    <_TabsCtx.Provider value={{ value, setValue }}>
      <div style={style}>{children}</div>
    </_TabsCtx.Provider>
  );
}

function _TabsList({ children, style }) {
  return (
    <div role="tablist" style={{ display: 'flex', ...style }}>
      {children}
    </div>
  );
}

function _TabsTrigger({ value, children, disabled, style }) {
  const ctx = useContext(_TabsCtx) || {};
  const active = ctx.value === value;
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      disabled={disabled}
      onClick={() => !disabled && ctx.setValue?.(value)}
      style={{
        background: 'none', border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
        padding: 'var(--space-2) var(--space-4)',
        fontSize: 'var(--text-sm)', fontFamily: 'var(--font-body)',
        fontWeight: active ? 'var(--weight-semibold)' : 'var(--weight-regular)',
        color: active ? 'var(--primary)' : 'var(--muted)',
        borderBottom: active ? '2px solid var(--primary)' : '2px solid transparent',
        transition: 'color var(--dur-fast), border-color var(--dur-fast)',
        outline: 'none',
        ...style
      }}
      onFocus={(e) => { e.currentTarget.style.outline = '2px solid var(--ring)'; }}
      onBlur={(e) => { e.currentTarget.style.outline = 'none'; }}
    >
      {children}
    </button>
  );
}

function _TabsContent({ value, children, style }) {
  const ctx = useContext(_TabsCtx) || {};
  if (ctx.value !== value) return null;
  return (
    <div role="tabpanel" style={style}>
      {children}
    </div>
  );
}

const IETabs = Object.assign(_TabsRoot, {
  Root: _TabsRoot,
  List: _TabsList,
  Trigger: _TabsTrigger,
  Content: _TabsContent,
});

// ─── IECheckbox ─────────────────────────────────────────────────────────────
// Props: checked (bool|'indeterminate'), onCheckedChange, disabled, children (label)

function IECheckbox({ checked = false, onCheckedChange, disabled = false, children, id, style }) {
  const toggle = () => {
    if (disabled) return;
    onCheckedChange?.(checked === true ? false : true);
  };
  const indeterminate = checked === 'indeterminate';
  return (
    <label
      htmlFor={id}
      style={{
        display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
        cursor: disabled ? 'not-allowed' : 'pointer', userSelect: 'none',
        opacity: disabled ? 0.5 : 1, ...style
      }}
    >
      <button
        id={id}
        type="button"
        role="checkbox"
        aria-checked={indeterminate ? 'mixed' : checked}
        disabled={disabled}
        onClick={toggle}
        style={{
          width: 18, height: 18, flexShrink: 0,
          background: checked || indeterminate ? 'var(--primary)' : 'var(--inner)',
          border: `1px solid ${checked || indeterminate ? 'var(--primary)' : 'var(--border)'}`,
          borderRadius: 'var(--r-xs)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: disabled ? 'not-allowed' : 'pointer',
          outline: 'none',
          transition: 'background var(--dur-fast), border-color var(--dur-fast)'
        }}
        onFocus={(e) => { e.currentTarget.style.boxShadow = '0 0 0 2px var(--ring)'; }}
        onBlur={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
      >
        {checked === true && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="var(--primary-fg)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {indeterminate && (
          <span style={{ width: 8, height: 2, background: 'var(--primary-fg)', borderRadius: 1 }} />
        )}
      </button>
      {children && (
        <span style={{ fontSize: 'var(--text-base)', color: 'var(--fg)' }}>{children}</span>
      )}
    </label>
  );
}

// ─── IESwitch ───────────────────────────────────────────────────────────────
// Props: checked, onCheckedChange, disabled, label

function IESwitch({ checked = false, onCheckedChange, disabled = false, label, id, style }) {
  const toggle = () => { if (!disabled) onCheckedChange?.(!checked); };
  return (
    <label
      htmlFor={id}
      style={{
        display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
        cursor: disabled ? 'not-allowed' : 'pointer', userSelect: 'none',
        opacity: disabled ? 0.5 : 1, ...style
      }}
    >
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={toggle}
        style={{
          width: 42, height: 24, flexShrink: 0, position: 'relative',
          background: checked ? 'var(--primary)' : 'var(--fill)',
          border: 'none', borderRadius: 'var(--r-pill)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          outline: 'none',
          transition: 'background var(--dur-fast)'
        }}
        onFocus={(e) => { e.currentTarget.style.boxShadow = '0 0 0 2px var(--ring)'; }}
        onBlur={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
      >
        <span style={{
          position: 'absolute', top: 3, left: checked ? 'calc(100% - 21px)' : 3,
          width: 18, height: 18, borderRadius: '50%',
          background: checked ? 'var(--primary-fg)' : 'var(--muted)',
          transition: 'left var(--dur-fast) var(--ease-default)'
        }} />
      </button>
      {label && (
        <span style={{ fontSize: 'var(--text-base)', color: 'var(--fg)' }}>{label}</span>
      )}
    </label>
  );
}

// ─── IETooltip ──────────────────────────────────────────────────────────────
// Props: content (string|element), children (trigger), side ('top'|'bottom'|'left'|'right')

function IETooltip({ content, children, side = 'top', delay = 600 }) {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const timerRef = useRef(null);
  const triggerRef = useRef(null);

  const calcPos = () => {
    if (!triggerRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    const gap = 8;
    if (side === 'top') setPos({ top: r.top - gap, left: r.left + r.width / 2, transform: 'translate(-50%,-100%)' });
    else if (side === 'bottom') setPos({ top: r.bottom + gap, left: r.left + r.width / 2, transform: 'translateX(-50%)' });
    else if (side === 'left') setPos({ top: r.top + r.height / 2, left: r.left - gap, transform: 'translate(-100%,-50%)' });
    else setPos({ top: r.top + r.height / 2, left: r.right + gap, transform: 'translateY(-50%)' });
  };

  const onEnter = () => {
    calcPos();
    timerRef.current = setTimeout(() => setShow(true), delay);
  };
  const onLeave = () => { clearTimeout(timerRef.current); setShow(false); };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <>
      {React.cloneElement(React.Children.only(children), {
        ref: triggerRef,
        onMouseEnter: (e) => { children.props.onMouseEnter?.(e); onEnter(); },
        onMouseLeave: (e) => { children.props.onMouseLeave?.(e); onLeave(); },
        onFocus: (e) => { children.props.onFocus?.(e); onEnter(); },
        onBlur: (e) => { children.props.onBlur?.(e); onLeave(); }
      })}
      {show && (
        <IEPortal>
          <div
            role="tooltip"
            style={{
              position: 'fixed',
              top: pos.top, left: pos.left,
              transform: pos.transform,
              zIndex: 'var(--z-tooltip)',
              background: 'var(--fill)',
              color: 'var(--fg)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-sm)',
              padding: 'var(--space-1) var(--space-2)',
              fontSize: 'var(--text-xs)',
              fontFamily: 'var(--font-body)',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            {content}
          </div>
        </IEPortal>
      )}
    </>
  );
}

// ─── IEDropdown ─────────────────────────────────────────────────────────────
// Action menu. Props: trigger, items [{value, label, icon?, disabled?, separator?}], onSelect

function IEDropdown({ trigger, items = [], onSelect }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const [focused, setFocused] = useState(-1);
  const listRef = useRef(null);
  const triggerRef = useRef(null);

  const calcPos = () => {
    if (!triggerRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    setPos({ top: r.bottom + 4, left: r.left });
  };

  const toggle = () => {
    if (!open) { calcPos(); setFocused(-1); }
    setOpen(o => !o);
  };

  useEscapeKey(() => setOpen(false), open);
  useClickOutside(listRef, (e) => {
    if (!triggerRef.current?.contains(e.target)) setOpen(false);
  }, open);

  const selectableItems = items.filter(i => !i.separator && !i.disabled);

  const onKeyDown = (e) => {
    if (!open) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setFocused(f => Math.min(f + 1, selectableItems.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setFocused(f => Math.max(f - 1, 0)); }
    else if (e.key === 'Enter' && focused >= 0) { onSelect?.(selectableItems[focused].value); setOpen(false); }
  };

  return (
    <>
      {React.cloneElement(React.Children.only(trigger), {
        ref: triggerRef,
        onClick: (e) => { trigger.props.onClick?.(e); toggle(); },
        onKeyDown: (e) => { trigger.props.onKeyDown?.(e); onKeyDown(e); }
      })}
      {open && (
        <IEPortal>
          <ul
            ref={listRef}
            role="menu"
            style={{
              position: 'fixed',
              top: pos.top, left: pos.left,
              margin: 0, padding: 'var(--space-1)',
              listStyle: 'none', minWidth: 180,
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-md)',
              boxShadow: 'var(--shadow-md)',
              zIndex: 'var(--z-dropdown)',
              outline: 'none'
            }}
          >
            {items.map((item, i) => {
              if (item.separator) {
                return <li key={i} role="separator" style={{ height: 1, background: 'var(--border)', margin: 'var(--space-1) 0' }} />;
              }
              const idx = selectableItems.indexOf(item);
              return (
                <li
                  key={item.value || i}
                  role="menuitem"
                  aria-disabled={item.disabled}
                  onClick={() => { if (!item.disabled) { onSelect?.(item.value); setOpen(false); } }}
                  onMouseEnter={() => setFocused(idx)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
                    padding: 'var(--space-2) var(--space-3)',
                    borderRadius: 'var(--r-sm)',
                    cursor: item.disabled ? 'not-allowed' : 'pointer',
                    fontSize: 'var(--text-base)',
                    color: item.disabled ? 'var(--dim)' : item.danger ? 'var(--danger)' : 'var(--fg)',
                    background: idx === focused && !item.disabled ? 'var(--fill)' : 'transparent',
                    opacity: item.disabled ? 0.5 : 1
                  }}
                >
                  {item.icon && <span style={{ opacity: 0.7 }}>{item.icon}</span>}
                  {item.label}
                </li>
              );
            })}
          </ul>
        </IEPortal>
      )}
    </>
  );
}
