#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────
# ds-audit.sh — IcelandExpress design-system duplication audit
#
# Flags the duplication classes that caused real drift:
#   1. Duplicate component definitions (same function name in >1 ACTIVE file)
#   2. DS CSS classes re-declared outside the canonical styles.css
#   3. Raw hex colours hard-coded in JSX inline styles (Law 1)
#   4. Design tokens defined in more than one file (drift risk)
#
# Legacy/alternate bundles are excluded from §1 (see EXCLUDE) — they are not
# loaded alongside the active screen-*.jsx / ds-*.jsx files.
#
# Usage:
#   bash scripts/ds-audit.sh            # warn mode — always exit 0 (report only)
#   bash scripts/ds-audit.sh --strict   # exit 1 if any findings (hook/CI)
# ─────────────────────────────────────────────────────────────────────────
set -uo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PROTO="$ROOT/frontend/prototype/Iceland express 2 Landing"
DS_CSS="$PROTO/styles.css"

# Legacy/alternate bundles — superseded, never loaded with the active files.
EXCLUDE='screens[1-5]\.jsx|ds-app\.jsx|Standalone\.html|Express Export\.html'

# Accepted static mirrors — standalone production pages that cannot import the
# prototype's JS design system, so they intentionally inline a CSS copy. These
# are reported as ACCEPTED (not failures). Keep their markup in sync by hand.
ACCEPTED='(^|/)index\.html$|Landing Page\.html$'

accepted=0
note() { printf '  \033[36m•\033[0m  %s \033[2m(accepted mirror)\033[0m\n' "$1"; accepted=$((accepted+1)); }
is_accepted() { printf '%s' "$1" | grep -qE "$ACCEPTED"; }

STRICT=0
[ "${1:-}" = "--strict" ] && STRICT=1

findings=0
section() { printf '\n\033[1m── %s\033[0m\n' "$1"; }
flag()    { printf '  \033[33m⚠\033[0m  %s\n' "$1"; findings=$((findings+1)); }
ok()      { printf '  \033[32m✓\033[0m  %s\n' "$1"; }
rel()     { printf '%s' "${1#$ROOT/}"; }

printf '\033[1mIcelandExpress · DS duplication audit\033[0m\n'

# 1 ── Duplicate component definitions (active files only) ────────────────
section "1. Duplicate component definitions (same name, >1 active file)"
before=$findings
while IFS= read -r name; do
  [ -z "$name" ] && continue
  files=""
  while IFS= read -r f; do files+="    $(rel "$f")"$'\n'; done < <(grep -rlE "^function $name\b" --include="*.jsx" "$ROOT" 2>/dev/null | grep -vE "$EXCLUDE")
  # only a real dupe if it survives in >1 NON-excluded file
  count=$(printf '%s' "$files" | grep -c .)
  [ "$count" -gt 1 ] && flag "$name in $count files:"$'\n'"$files"
done < <(grep -rhoE "^function [A-Za-z0-9_]+" --include="*.jsx" "$ROOT" 2>/dev/null \
         | grep -vE "$EXCLUDE" | awk '{print $2}' | sort | uniq -d)
[ "$findings" -eq "$before" ] && ok "no duplicate component names in active files"

# 2 ── DS CSS classes re-declared outside the canonical styles.css ───────
section "2. DS CSS classes re-declared outside styles.css"
before=$findings
for cls in btn badge nav shell logo card chip input; do
  while IFS= read -r f; do
    [ -z "$f" ] && continue
    [ "$f" = "$DS_CSS" ] && continue
    if is_accepted "$f"; then note ".$cls in $(rel "$f")"; continue; fi
    flag ".$cls re-declared in $(rel "$f")"
  done < <(grep -rlE "^[[:space:]]*\.$cls([ .{:]|$)" --include="*.css" --include="*.html" "$ROOT" 2>/dev/null | grep -vE "$EXCLUDE")
done
[ "$findings" -eq "$before" ] && ok "no unaccepted DS-class re-declarations"

# 3 ── Raw hex colours in JSX inline styles ──────────────────────────────
section "3. Raw hex colours in JSX inline styles (Law 1)"
before=$findings
while IFS= read -r f; do
  [ -z "$f" ] && continue
  flag "raw hex in inline style: $(rel "$f")"
done < <(grep -rlE "style=\{\{[^}]*#[0-9a-fA-F]{3,6}" --include="*.jsx" "$ROOT" 2>/dev/null | grep -vE "$EXCLUDE")
[ "$findings" -eq "$before" ] && ok "no raw hex in JSX inline styles"

# 4 ── Tokens defined in more than one file ──────────────────────────────
section "4. Tokens defined in >1 CODE source (docs + accepted mirrors excluded)"
before=$findings
for tok in --primary --nav-frost-bg --nav-pad-x --shadow-lg --maxw; do
  # real drift = defined in >1 .css/.html CODE source, minus docs, legacy, accepted mirrors
  rn=0; reallist=""; acc=""
  while IFS= read -r f; do
    [ -z "$f" ] && continue
    case "$f" in *.md) continue;; esac          # docs document tokens — not code drift
    if is_accepted "$f"; then acc+="$(rel "$f") "; continue; fi
    rn=$((rn+1)); reallist+="    $(rel "$f")"$'\n'
  done < <(grep -rlE -- "$tok:" --include="*.css" --include="*.html" "$ROOT" 2>/dev/null | grep -vE "$EXCLUDE")
  [ "$rn" -gt 1 ] && flag "$tok in $rn code sources:"$'\n'"$reallist"
  [ "$rn" -le 1 ] && [ -n "$acc" ] && note "$tok also in: $acc"
done
[ "$findings" -eq "$before" ] && ok "tokens single-sourced (canonical: styles.css)"

# ── Summary ──────────────────────────────────────────────────────────────
printf '\n\033[1mTotal findings: %s\033[0m  \033[2m(%s accepted mirror(s) — not failures)\033[0m\n' "$findings" "$accepted"
if [ "$findings" -gt 0 ] && [ "$STRICT" -eq 1 ]; then
  printf '\033[31mds-audit: FAIL (strict). Reuse the DS instead of duplicating.\033[0m\n'
  exit 1
fi
exit 0
