#!/usr/bin/env bash
# build an index.js at root of every country under lib

set -euf -o pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="$SCRIPT_DIR/.."

# shellcheck source=common.sh
. "${PROJECT_DIR}/script/common.sh"

trap exiterr EXIT

LIBDIR="$PROJECT_DIR/lib/US"
OUTFILE="$LIBDIR/index.js"

cd "$PROJECT_DIR"
echo "exports.masaajid = [" > "$OUTFILE"
find ./lib/US -mindepth 2 -type f -name index.js -printf "  '%p',\n" >> "$OUTFILE"
echo "]" >> "$OUTFILE"

trap - EXIT
