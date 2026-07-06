#!/usr/bin/env bash
set -euo pipefail

# Cross-client keyword guard
# Per docs/governance/client-separation-substrate.md (4-zone topology, R1 routing rule).
# This repo is {client:rob} scope. Reject staged content that bleeds {client:maddie} or
# other client identifiers, except in whitelisted governance/audit-log files.

DEFAULT_KEYWORDS_REGEX='(maddie|Maddie|Sovereign Spiral|sovereign-systems|elevatealign\.com|stopdrinkingacid\.com|eaucohub\.com)'
KEYWORDS_FILE="${CROSS_CLIENT_KEYWORDS_FILE:-config/cross-client-keywords.txt}"
configured_patterns=""

if [[ -f "$KEYWORDS_FILE" ]]; then
  configured_patterns=$(grep -Ev '^[[:space:]]*(#|$)' "$KEYWORDS_FILE" | paste -sd '|' - || true)
fi

if [[ -n "$configured_patterns" ]]; then
  KEYWORDS_REGEX="($configured_patterns)"
else
  KEYWORDS_REGEX="$DEFAULT_KEYWORDS_REGEX"
fi

# Whitelist: files that legitimately reference cross-client keywords (substrate doc itself,
# audit logs, this guard's own implementation).
WHITELIST_REGEX='^(docs/governance/client-separation-substrate\.md|docs/governance/CANONICAL-HOME-ANCHOR\.md|scripts/check-cross-client-bleed\.sh|HANDOFF\.md|\.conductor/active-handoff\.md|docs/archive/.*|\.claude/plans/.*)$'

has_cross_stream_coordination_frontmatter() {
  local file="$1"
  local line
  local line_no=0
  local found=0

  while IFS= read -r line; do
    line_no=$((line_no + 1))
    if [[ $line_no -eq 1 ]]; then
      [[ "$line" == "---" ]] || return 1
      continue
    fi
    if [[ "$line" == "---" ]]; then
      [[ $found -eq 1 ]] && return 0
      return 1
    fi
    if [[ "$line" =~ audiences:[[:space:]]*\[[^]]*cross_stream_coordination[^]]*\] ]]; then
      found=1
    fi
  done < <(git show ":$file" 2>/dev/null || true)

  return 1
}

# Get staged files (not yet committed)
staged_files=$(git diff --cached --name-only --diff-filter=ACMR)

if [[ -z "$staged_files" ]]; then
  exit 0
fi

violations=()

while IFS= read -r file; do
  [[ -z "$file" ]] && continue
  # Skip whitelisted files
  if [[ "$file" =~ $WHITELIST_REGEX ]]; then
    continue
  fi
  if has_cross_stream_coordination_frontmatter "$file"; then
    continue
  fi
  # Get the staged content of this file (additions only, excluding diff header markers).
  # `+` is a regex metachar in BSD basic regex, so we use bracket-class literals
  # to keep the pattern portable across BSD grep (macOS default) and GNU grep.
  staged_content=$(git diff --cached -- "$file" | grep -E '^[+]' | grep -v -F '+++' || true)
  # Check for keyword match in additions; capture the first matching line for the report.
  first_match=$(echo "$staged_content" | grep -E -i "$KEYWORDS_REGEX" | head -1 || true)
  if [[ -n "$first_match" ]]; then
    violations+=("$file: $first_match")
  fi
done <<< "$staged_files"

if [[ ${#violations[@]} -gt 0 ]]; then
  echo "ERROR: Cross-client keyword bleed detected in staged content."
  echo ""
  echo "This repo ({client:rob}) is scoped to Rob/Hokage Chess. The following staged files"
  echo "contain {client:maddie} or other-client identifiers in non-whitelisted locations:"
  echo ""
  for v in "${violations[@]}"; do
    echo "  - $v"
  done
  echo ""
  echo "Per docs/governance/client-separation-substrate.md routing rule R1:"
  echo "  - If this content belongs to a different client scope, route to that client's repo"
  echo "  - If this is workspace-governance content, route to ~/.local/share/workspace/operational/exports/"
  echo "  - If this content is legitimately needed in this repo, add the path to the WHITELIST_REGEX"
  echo "    in scripts/check-cross-client-bleed.sh and document the rationale in the substrate doc."
  echo ""
  exit 1
fi

exit 0
