#!/usr/bin/env bash
# populate new masjid crawler, add to git

set -euf -o pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="$SCRIPT_DIR/.."

# shellcheck source=common.sh
. "${PROJECT_DIR}/script/common.sh"

trap exiterr EXIT

# first run new-masjid
"$SCRIPT_DIR/new-masjid" "$@"

git add --intent-to-add "$LIBDIR"

trap - EXIT
