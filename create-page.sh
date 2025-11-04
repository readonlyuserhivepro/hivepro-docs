#!/bin/bash

# Helper script to create new documentation pages from template
# Usage: ./create-page.sh <path/to/new-page.html> "Page Title"

set -e

if [ "$#" -lt 2 ]; then
    echo "Usage: $0 <path/to/new-page.html> \"Page Title\""
    echo ""
    echo "Examples:"
    echo "  $0 docs/getting-started/configuration.html \"Configuration\""
    echo "  $0 docs/guides/extensions/testing.html \"Testing Extensions\""
    exit 1
fi

PAGE_PATH="$1"
PAGE_TITLE="$2"

# Check if template exists
if [ ! -f "_template.html" ]; then
    echo "Error: _template.html not found"
    exit 1
fi

# Check if target file already exists
if [ -f "$PAGE_PATH" ]; then
    echo "Error: File already exists: $PAGE_PATH"
    echo "Remove it first if you want to recreate it."
    exit 1
fi

# Create directory if it doesn't exist
PAGE_DIR=$(dirname "$PAGE_PATH")
mkdir -p "$PAGE_DIR"

# Count directory depth to determine relative path
DEPTH=$(echo "$PAGE_PATH" | grep -o "/" | wc -l)

# Calculate the correct relative path for styles
REL_PATH=""
for ((i=1; i<=$DEPTH; i++)); do
    REL_PATH="../$REL_PATH"
done

# Copy template and replace placeholders
cp _template.html "$PAGE_PATH"

# Replace PAGE_TITLE
sed -i "s/PAGE_TITLE/$PAGE_TITLE/g" "$PAGE_PATH"

# Replace Page Title in h1
sed -i "s/<h1>Page Title<\/h1>/<h1>$PAGE_TITLE<\/h1>/g" "$PAGE_PATH"

# Update paths based on depth
if [ $DEPTH -eq 2 ]; then
    # docs/section/page.html - no change needed, template already uses ../../
    echo "Created: $PAGE_PATH (depth 2 - using ../../)"
elif [ $DEPTH -eq 3 ]; then
    # docs/section/subsection/page.html
    sed -i 's|../../styles.css|../../../styles.css|g' "$PAGE_PATH"
    sed -i 's|../../script.js|../../../script.js|g' "$PAGE_PATH"
    sed -i 's|href="../../index.html"|href="../../../index.html"|g' "$PAGE_PATH"
    echo "Created: $PAGE_PATH (depth 3 - using ../../../)"
else
    echo "Warning: Unusual depth ($DEPTH). You may need to manually adjust paths."
    echo "Created: $PAGE_PATH"
fi

echo ""
echo "✅ New page created successfully!"
echo ""
echo "Next steps:"
echo "1. Edit $PAGE_PATH and add your content"
echo "2. Add a link to this page in the sidebar of all other pages"
echo "3. Test the page by opening index.html in your browser"
echo ""
echo "To add to sidebar, add this line in the appropriate section:"
echo "  <li class=\"sidebar-item\"><a href=\"$PAGE_PATH\">$PAGE_TITLE</a></li>"