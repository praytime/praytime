#!/usr/bin/env bash
# Google Maps Places search: https://developers.google.com/maps/documentation/places/web-service/search-find-place
# usage: places.sh 'latitude,longitude'
# TODO: get all pages of results

set -euf -o pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="${SCRIPT_DIR}/.."

# shellcheck source=common.sh
. "${PROJECT_DIR}/script/common.sh"

trap exiterr EXIT

curl -fsSL -G 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json' --data-urlencode "key=${GMAPS_API_KEY}" \
    --data-urlencode "input=mosque" \
    --data-urlencode "inputtype=textquery" \
    --data-urlencode "fields=formatted_address,name,geometry,type,business_status,place_id" \
    --data-urlencode "locationbias=circle:50000@${*?}"

# optionally summarize:
# jq -r '.results[] | "\(.place_id)\t\(.name)"'

trap - EXIT
