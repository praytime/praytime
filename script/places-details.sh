#!/usr/bin/env bash
# Google Maps Places 'details' search: https://developers.google.com/maps/documentation/places/web-service/details
# fields=formatted_address,name,geometry. Use a forward slash when specifying compound values. For example: opening_hours/open_now
# usage: place-details.sh '<place_id>'

set -euf -o pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="${SCRIPT_DIR}/.."

# shellcheck source=common.sh
. "${PROJECT_DIR}/script/common.sh"

trap exiterr EXIT

curl -fsSL -G 'https://maps.googleapis.com/maps/api/place/details/json' --data-urlencode "key=${GMAPS_API_KEY}" \
    --data-urlencode "fields=name,formatted_address,geometry/location,website,place_id" \
    --data-urlencode "place_id=${*?}"

trap - EXIT
