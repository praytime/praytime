#!/usr/bin/env bash
# Google Maps Places 'nearby' search: https://developers.google.com/maps/documentation/places/web-service/search-nearby
# usage: places-nearby.sh 'latitude,longitude'
# TODO: get all pages of results

set -euf -o pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="${SCRIPT_DIR}/.."

# shellcheck source=common.sh
. "${PROJECT_DIR}/script/common.sh"

trap exiterr EXIT

curl -fsSL -G 'https://maps.googleapis.com/maps/api/place/nearbysearch/json' --data-urlencode "key=${GMAPS_API_KEY}" \
    --data-urlencode "keyword=mosque" \
    --data-urlencode "radius=50000" \
    --data-urlencode "location=${*?}"

# optionally summarize:
# jq -r '.results[] | "\(.place_id)\t\(.name)"'

trap - EXIT
