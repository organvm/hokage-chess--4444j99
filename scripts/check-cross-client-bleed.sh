#!/usr/bin/env bash
set -euo pipefail

# Cross-client keyword guard
# Per docs/governance/client-separation-substrate.md (4-zone topology, R1 routing rule).
# This repo is {client:rob} scope. Reject staged content that bleeds other-client
# identifiers, except in explicit cross-stream coordination surfaces.

REPO_ROOT=$(git rev-parse --show-toplevel)
cd "$REPO_ROOT"

KEYWORDS_FILE=${CROSS_CLIENT_KEYWORDS_FILE:-config/cross-client-keywords.txt}

if [[ ! -f "$KEYWORDS_FILE" ]]; then
  echo "ERROR: Cross-client keyword guard config not found: $KEYWORDS_FILE"
  exit 1
fi

keyword_patterns=()
while IFS= read -r pattern || [[ -n "$pattern" ]]; do
  pattern=${pattern%$'\r'}
  [[ -z "$pattern" || "$pattern" == \#* ]] && continue
  keyword_patterns+=("$pattern")
done < "$KEYWORDS_FILE"

if [[ ${#keyword_patterns[@]} -eq 0 ]]; then
  echo "ERROR: Cross-client keyword guard config has no active patterns: $KEYWORDS_FILE"
  exit 1
fi

# Allowlist: files that legitimately reference cross-client keywords because they
# define the substrate, configure this guard, or are explicit coordination logs.
ALLOWLIST_REGEX='^(docs/archive/orchestration/.*|docs/governance/client-separation-substrate\.md|docs/governance/CANONICAL-HOME-ANCHOR\.md|config/cross-client-keywords\.txt|scripts/check-cross-client-bleed\.sh|HANDOFF\.md|\.conductor/active-handoff\.md|\.claude/plans/.*)$'

is_allowlisted_path() {
  local file=$1
  [[ "$file" =~ $ALLOWLIST_REGEX ]]
}

has_cross_stream_coordination_frontmatter() {
  local file=$1

  git show ":$file" 2>/dev/null | awk '
    NR == 1 && $0 != "---" { exit 1 }
    NR == 1 { in_frontmatter = 1; next }
    in_frontmatter && ($0 == "---" || $0 == "...") { exit found ? 0 : 1 }
    in_frontmatter {
      if ($0 ~ /^audiences:[[:space:]]*\[[^]]*cross_stream_coordination[^]]*\]/) found = 1
      if ($0 ~ /^[[:space:]]*-[[:space:]]*cross_stream_coordination[[:space:]]*$/) found = 1
      if ($0 ~ /^[[:space:]]*-[[:space:]]*id:[[:space:]]*cross_stream_coordination[[:space:]]*$/) found = 1
    }
    END { exit found ? 0 : 1 }
  '
}

find_matching_pattern() {
  local staged_content=$1
  local pattern

  for pattern in "${keyword_patterns[@]}"; do
    if printf '%s\n' "$staged_content" | grep -E -i -q -e "$pattern"; then
      printf '%s\n' "$pattern"
      return 0
    fi
  done

  return 1
}

# Get staged files (not yet committed).
staged_files=$(git diff --cached --name-only --diff-filter=ACMR)

if [[ -z "$staged_files" ]]; then
  exit 0
fi

violations=()

while IFS= read -r file; do
  [[ -z "$file" ]] && continue

  if is_allowlisted_path "$file" || has_cross_stream_coordination_frontmatter "$file"; then
    continue
  fi

  # Get the staged content of this file (additions only, excluding diff header markers).
  # `+` is a regex metachar in BSD basic regex, so we use bracket-class literals
  # to keep the pattern portable across BSD grep (macOS default) and GNU grep.
  staged_content=$(git diff --cached -- "$file" | grep -E '^[+]' | grep -v -F '+++' || true)

  if matching_pattern=$(find_matching_pattern "$staged_content"); then
    violations+=("$file (matched configured pattern: $matching_pattern)")
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
  echo "  - If this is explicit cross-stream coordination, place it under docs/archive/orchestration/"
  echo "    or add audiences: [cross_stream_coordination] frontmatter"
  echo "  - To update blocked terms, edit $KEYWORDS_FILE"
  echo ""
  exit 1
fi

exit 0
