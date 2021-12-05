#!/usr/bin/env bash
# populate new masjid crawler, rebuild index and add to git

set -euf -o pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="$SCRIPT_DIR/.."

# shellcheck source=common.sh
. "${PROJECT_DIR}/script/common.sh"

trap exiterr EXIT

# first run new-masjid
"$SCRIPT_DIR/new-masjid" "$@"

git add --intent-to-add "$PROJECT_DIR/lib"

trap - EXIT
