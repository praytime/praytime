#!/usr/bin/env bash
# Google Maps Places 'text' search: https://developers.google.com/maps/documentation/places/web-service/search-text
# TODO: get all pages of results

set -euf -o pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="${SCRIPT_DIR}/.."

# shellcheck source=common.sh
. "${PROJECT_DIR}/script/common.sh"

trap exiterr EXIT

curl -fsSL -G 'https://maps.googleapis.com/maps/api/place/textsearch/json' --data-urlencode "key=${GMAPS_API_KEY}" \
    --data-urlencode "type=mosque" \
    --data-urlencode "radius=50000" \
    --data-urlencode "query=${*?}"

# optionally summarize:
# jq -r '.results[] | "https://www.google.com/maps/search/?api=1&query=none&query_place_id=\(.place_id)\t\(.name)"'

trap - EXIT
