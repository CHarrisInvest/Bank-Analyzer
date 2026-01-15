#!/bin/bash
# Update SEC Financial Statement Data
# Downloads quarterly ZIPs from SEC and processes them into banks.json

set -e

CACHE_DIR=".sec-data-cache"
SCRIPT_DIR="$(dirname "$0")"

echo "═══════════════════════════════════════════════════════════════════"
echo "SEC Data Updater"
echo "═══════════════════════════════════════════════════════════════════"
echo ""

# Create cache directory
mkdir -p "$CACHE_DIR"

# Quarters to download (most recent first)
QUARTERS="2025q4 2025q3 2025q2 2025q1 2024q4"

echo "Downloading quarterly data from SEC..."
echo ""

for q in $QUARTERS; do
  FILE="$CACHE_DIR/$q.zip"
  URL="https://www.sec.gov/files/dera/data/financial-statement-data-sets/$q.zip"

  if [ -f "$FILE" ]; then
    echo "  ✓ $q.zip (cached)"
  else
    echo "  ↓ Downloading $q.zip..."
    curl -s -f -o "$FILE" "$URL" && echo "    ✓ Done" || echo "    ✗ Failed (may not be available yet)"
  fi
done

echo ""
echo "Processing data..."
echo ""

# Run the processing script
node "$SCRIPT_DIR/fetch-sec-fs-datasets.cjs" --local-only

echo ""
echo "═══════════════════════════════════════════════════════════════════"
echo "Done! To commit the changes:"
echo ""
echo "  git add public/data/banks.json public/data/sec-raw-data.json"
echo "  git commit -m 'Update SEC data'"
echo "  git push"
echo "═══════════════════════════════════════════════════════════════════"
