#!/bin/bash

# Content Enhancement Automation Script
# Processes pages from the manifest through Claude Code one at a time
# Usage:
#   bash scripts/enhance-content.sh              # Full run (all 232 pages)
#   bash scripts/enhance-content.sh --pilot      # Pilot run (first of each page type)
#   bash scripts/enhance-content.sh --type faq   # Only process FAQ pages
#   bash scripts/enhance-content.sh --resume     # Resume from last completed page

set -e

# --- Configuration ---
GUIDANCE_PATH="docs/content-enhancement-guidance.md"
MANIFEST_PATH="docs/page-manifest.json"
LOG_DIR="enhancement-logs"
BRANCH_NAME="content-enhancement"
PAUSE_BETWEEN_PAGES=5  # seconds between pages (rate limit buffer)

# --- Source file mapping ---
get_source_file() {
    local page_type="$1"
    case "$page_type" in
        metric) echo "src/data/content/metrics.js" ;;
        valuation-method) echo "src/data/content/valuations.js" ;;
        faq) echo "src/data/content/faqs.js" ;;
        *) echo "UNKNOWN"; return 1 ;;
    esac
}

# --- Parse arguments ---
PILOT_MODE=false
TYPE_FILTER=""
RESUME_MODE=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --pilot) PILOT_MODE=true; shift ;;
        --type) TYPE_FILTER="$2"; shift 2 ;;
        --resume) RESUME_MODE=true; shift ;;
        *) echo "Unknown option: $1"; exit 1 ;;
    esac
done

# --- Preflight checks ---
if ! command -v claude &> /dev/null; then
    echo "Error: claude CLI not found. Install Claude Code first."
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo "Error: node not found. Install Node.js first."
    exit 1
fi

if [ ! -f "$GUIDANCE_PATH" ]; then
    echo "Error: Guidance document not found at $GUIDANCE_PATH"
    exit 1
fi

if [ ! -f "$MANIFEST_PATH" ]; then
    echo "Error: Manifest not found at $MANIFEST_PATH"
    exit 1
fi

# Check for uncommitted changes on current branch
if [ -n "$(git status --porcelain)" ]; then
    echo "Error: You have uncommitted changes. Commit or stash them before running this script."
    exit 1
fi

# --- Setup ---
mkdir -p "$LOG_DIR"

# Branch management
CURRENT_BRANCH=$(git branch --show-current)
if [ "$RESUME_MODE" = true ]; then
    if [ "$CURRENT_BRANCH" != "$BRANCH_NAME" ]; then
        echo "Error: --resume requires you to be on the $BRANCH_NAME branch."
        echo "Current branch: $CURRENT_BRANCH"
        exit 1
    fi
    echo "Resuming on branch: $BRANCH_NAME"
else
    if git show-ref --verify --quiet "refs/heads/$BRANCH_NAME"; then
        echo "Error: Branch $BRANCH_NAME already exists."
        echo "Use --resume to continue, or delete the branch first: git branch -D $BRANCH_NAME"
        exit 1
    fi
    echo "Creating branch: $BRANCH_NAME (from $CURRENT_BRANCH)"
    git checkout -b "$BRANCH_NAME"
fi

# --- Build page list ---
if [ "$PILOT_MODE" = true ]; then
    echo "=== PILOT MODE: Processing first entry of each page type ==="
    PAGES=$(node -e "
        const m = JSON.parse(require('fs').readFileSync('$MANIFEST_PATH','utf8')).pages;
        const first = t => m.find(e => e.pageType === t);
        [first('metric'), first('valuation-method'), first('faq')]
            .filter(Boolean).forEach(e => console.log(JSON.stringify(e)));
    ")
elif [ -n "$TYPE_FILTER" ]; then
    echo "=== Filtering to page type: $TYPE_FILTER ==="
    PAGES=$(node -e "
        const m = JSON.parse(require('fs').readFileSync('$MANIFEST_PATH','utf8')).pages;
        m.filter(e => e.pageType === '$TYPE_FILTER')
            .forEach(e => console.log(JSON.stringify(e)));
    ")
else
    echo "=== FULL RUN: Processing all pages ==="
    PAGES=$(node -e "
        const m = JSON.parse(require('fs').readFileSync('$MANIFEST_PATH','utf8')).pages;
        m.forEach(e => console.log(JSON.stringify(e)));
    ")
fi

# Count pages
TOTAL=$(echo "$PAGES" | wc -l | tr -d ' ')
echo "Pages to process: $TOTAL"
echo ""

# --- Process pages ---
CURRENT=0
SUCCEEDED=0
FAILED=0

while IFS= read -r entry; do
    CURRENT=$((CURRENT + 1))

    FIELDS=$(echo "$entry" | node -e "let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{const e=JSON.parse(d);console.log(e.slug);console.log(e.pageType);console.log(e.name)})")
    SLUG=$(echo "$FIELDS" | sed -n '1p')
    PAGE_TYPE=$(echo "$FIELDS" | sed -n '2p')
    NAME=$(echo "$FIELDS" | sed -n '3p')
    SOURCE_FILE=$(get_source_file "$PAGE_TYPE")

    LOG_FILE="$LOG_DIR/${PAGE_TYPE}_${SLUG}.log"

    # Skip if already processed (resume mode)
    if [ "$RESUME_MODE" = true ] && [ -f "$LOG_FILE" ]; then
        echo "[$CURRENT/$TOTAL] SKIP (already processed): $NAME"
        continue
    fi

    echo "============================================"
    echo "[$CURRENT/$TOTAL] Processing: $NAME"
    echo "  Type: $PAGE_TYPE"
    echo "  Slug: $SLUG"
    echo "  Source: $SOURCE_FILE"
    echo "  Log: $LOG_FILE"
    echo "============================================"

    # Build the prompt
    PROMPT="Read the content enhancement guidance document at $GUIDANCE_PATH completely before doing anything else.

Then process the following page entry:

**Source file:** $SOURCE_FILE
**Slug:** $SLUG
**Page type:** $PAGE_TYPE
**Page name:** $NAME

SCOPE GUARD: You must ONLY modify the single entry with slug '$SLUG' in $SOURCE_FILE. Do not modify any other entries, imports, exports, or code in the file. Verify the slug matches before making any changes.

Follow the full workflow from Section 8 of the guidance:

1. Read the existing content of the entry with slug '$SLUG' completely
2. Identify the topic complexity level (basic, intermediate, or advanced)
3. Perform the content assessment described in Section 5 (Content Assessment First) — determine what educational, informative, and helpful content this page should provide before making any changes
4. Enhance the content fields in place following all guidelines in the document, including AI pattern avoidance (Section 4), content quality standards (Section 6), field mapping (Section 5D), and page-specific structure guidelines (Section 5)
5. Assess and update relationship arrays and description objects per Section 7
6. Run the quality self-check in Section 10
7. Provide the change summary in the format specified in Section 8

Reminders:
- Word count must only increase, never decrease
- All content must be evergreen and original
- Scan your output against the full AI avoidance phrase list in Section 4 before finalizing
- Preserve the file's existing quote style and escape characters
- Use \\n\\n for paragraph breaks within string fields
- For FAQ pages: the page must not feel templated — structure should be dictated by the specific question
- Treat this page independently — do not carry over patterns from other pages"

    # Run Claude Code and capture output
    if claude -p "$PROMPT" --allowedTools "Edit,Write,Read" 2>&1 | tee "$LOG_FILE"; then
        # Commit changes if any files were modified
        if [ -n "$(git status --porcelain)" ]; then
            # Syntax check the modified source file before committing
            # Using --input-type=module since source files use ES module syntax
            SYNTAX_CHECK=$(node --input-type=module --check < "$SOURCE_FILE" 2>&1)
            if [ $? -eq 0 ]; then
                git add -A
                git commit -m "enhance($PAGE_TYPE): $SLUG - $NAME"
                echo "[$CURRENT/$TOTAL] COMMITTED: $NAME"
                SUCCEEDED=$((SUCCEEDED + 1))
            else
                echo "[$CURRENT/$TOTAL] SYNTAX ERROR: $NAME — Claude Code broke the JS syntax"
                echo "  Error: $SYNTAX_CHECK"
                echo "  Reverting changes to $SOURCE_FILE"
                git checkout -- "$SOURCE_FILE"
                echo "SYNTAX_ERROR: $SYNTAX_CHECK" >> "$LOG_FILE"
                FAILED=$((FAILED + 1))
            fi
        else
            echo "[$CURRENT/$TOTAL] NO CHANGES: $NAME (Claude Code made no edits)"
        fi
    else
        echo "[$CURRENT/$TOTAL] FAILED: $NAME (Claude Code returned an error)"
        echo "FAILED" >> "$LOG_FILE"
        FAILED=$((FAILED + 1))
    fi

    echo ""

    # Pause between pages
    if [ "$CURRENT" -lt "$TOTAL" ]; then
        sleep "$PAUSE_BETWEEN_PAGES"
    fi
done <<< "$PAGES"

# --- Summary ---
echo ""
echo "============================================"
echo "ENHANCEMENT RUN COMPLETE"
echo "============================================"
echo "Total pages: $TOTAL"
echo "Succeeded: $SUCCEEDED"
echo "Failed: $FAILED"
echo "Logs: $LOG_DIR/"
echo ""
echo "Check for syntax errors or failures:"
echo "  grep -l 'SYNTAX_ERROR\|FAILED' $LOG_DIR/*.log"
echo ""
echo "Next steps:"
echo "  1. Review changes: git diff main"
echo "  2. Check logs: ls $LOG_DIR/"
echo "  3. Push to GitHub: git push -u origin $BRANCH_NAME"
echo "  4. Create a pull request on GitHub to review all changes"
echo ""
