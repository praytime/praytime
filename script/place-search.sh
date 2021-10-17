#!/usr/bin/env bash
# Google Maps Places 'nearby' search: https://developers.google.com/maps/documentation/places/web-service/search-nearby
# usage: place-search.sh 'latitude,longitude'
# TODO: get all pages of results

set -euf -o pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="${SCRIPT_DIR}/.."

# shellcheck source=common.sh
. "${PROJECT_DIR}/script/common.sh"

trap exiterr EXIT

curl -fsSL -G 'https://maps.googleapis.com/maps/api/place/nearbysearch/json' --data-urlencode "key=${GMAPS_API_KEY}" \
    --data-urlencode "type=mosque" \
    --data-urlencode "radius=10000" \
    --data-urlencode "location=${*?}"

trap - EXIT