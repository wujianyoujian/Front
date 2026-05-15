#!/bin/sh
input=$(cat)

cwd=$(echo "$input" | jq -r '.cwd')
model=$(echo "$input" | jq -r '.model.display_name')
used_pct=$(echo "$input" | jq -r '.context_window.used_percentage // empty')
branch=$(git -C "$cwd" --no-optional-locks rev-parse --abbrev-ref HEAD 2>/dev/null)

# Build context usage segment
if [ -n "$used_pct" ]; then
  ctx_seg=$(printf "ctx:%.0f%%" "$used_pct")
else
  ctx_seg="ctx:--"
fi

# Build git branch segment
if [ -n "$branch" ]; then
  git_seg="[$branch]"
else
  git_seg=""
fi

printf "%s  %s  %s  %s" "$cwd" "$model" "$ctx_seg" "$git_seg"
