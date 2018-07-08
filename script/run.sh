#!/bin/bash

# TODO: set trap

set -euf -o pipefail

echoerr() { 
    >&2 echo "$@"
}

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# shellcheck source=/dev/null
[[ -e "${SCRIPT_DIR}/../.env" ]] && . "${SCRIPT_DIR}/../.env"

resultsUrl="$(curl \
    -fsSL \
    --request POST \
    --header "Content-Type: application/json" \
    --data-binary "$(./post-data.sh)" \
    https://api.apify.com/v1/hMf69fRQCWWX84d5Z/crawlers/bBG5kmupgKJPssdeh/execute?token="${APIFY_CRAWLER_TOKEN}" \
    | jq --raw-output '.resultsUrl')"  
    
echoerr "resultsUrl is $resultsUrl"

while 
    sleep 1
    results=$(curl -fsSL "$resultsUrl")
    resultsLen=${#results}
    (( resultsLen == 2 ))
do
    continue
done

# echo "$results"
# echo "$results" | jq '.[].pageFunctionResult'
echo "$results" | jq '.[].pageFunctionResult.results[]'
