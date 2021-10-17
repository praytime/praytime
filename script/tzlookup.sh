#!/usr/bin/env bash

set -eu -o pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="${SCRIPT_DIR}/.."

# shellcheck source=common.sh
. "${PROJECT_DIR}/script/common.sh"

trap exiterr EXIT


curl -fsSL -G 'https://maps.googleapis.com/maps/api/timezone/json' --data-urlencode "key=${GMAPS_API_KEY}" --data-urlencode "timestamp=0" --data-urlencode "location=${*?}"


trap - EXIT
