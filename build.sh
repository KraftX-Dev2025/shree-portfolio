#!/usr/bin/env bash
# Builds the deployable site/ folder from src/ (wraps each page in a full HTML document).
set -e; cd "$(dirname "$0")"; rm -rf site; mkdir -p site
for f in src/*.html; do
  { printf '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n';
    cat "$f"; printf '\n</html>\n'; } > "site/$(basename "$f")"
done
cp src/*.js src/*.css site/
echo built
