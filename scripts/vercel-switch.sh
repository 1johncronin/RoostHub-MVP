#!/bin/bash

# Vercel Project Switcher for RoostHub
# Usage: ./scripts/vercel-switch.sh [dev|prod]

set -e

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
VERCEL_DIR="$PROJECT_ROOT/.vercel"

show_current() {
    if [ -f "$VERCEL_DIR/project.json" ]; then
        PROJECT_NAME=$(grep -o '"projectName":"[^"]*"' "$VERCEL_DIR/project.json" | cut -d'"' -f4)
        echo "Current project: $PROJECT_NAME"
    else
        echo "No Vercel project linked"
    fi
}

switch_to_dev() {
    if [ -f "$PROJECT_ROOT/.vercel-dev/project.json" ]; then
        cp "$PROJECT_ROOT/.vercel-dev/project.json" "$VERCEL_DIR/project.json"
        echo "✓ Switched to DEV project (roosthub-dev)"
        echo "  URL: https://roosthub-dev-transparency.vercel.app"
    else
        echo "Error: Dev project config not found"
        exit 1
    fi
}

switch_to_prod() {
    if [ -f "$PROJECT_ROOT/.vercel-prod/project.json" ]; then
        cp "$PROJECT_ROOT/.vercel-prod/project.json" "$VERCEL_DIR/project.json"
        echo "✓ Switched to PROD project (roosthub)"
        echo "  URL: https://roosthub-transparency.vercel.app"
    else
        echo "Error: Prod project config not found"
        exit 1
    fi
}

case "$1" in
    dev)
        switch_to_dev
        ;;
    prod)
        switch_to_prod
        ;;
    status|"")
        show_current
        ;;
    *)
        echo "Usage: $0 [dev|prod|status]"
        echo ""
        echo "Commands:"
        echo "  dev     Switch to roosthub-dev project"
        echo "  prod    Switch to roosthub production project"
        echo "  status  Show currently linked project (default)"
        exit 1
        ;;
esac
