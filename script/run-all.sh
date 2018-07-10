#!/usr/bin/env bash

set -eu -o pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="${SCRIPT_DIR}/.."

# shellcheck source=/dev/null
. "${PROJECT_DIR}/script/common.sh"

trap exiterr EXIT


for d in "${PROJECT_DIR}"/masaajid/* ; do

    cd "${d}"

    resultsUrl="$(curl \
        -fsSL \
        --request POST \
        --header "Content-Type: application/json" \
        --data-binary "$(./post-data.sh)" \
        https://api.apify.com/v1/hMf69fRQCWWX84d5Z/crawlers/bBG5kmupgKJPssdeh/execute?token="${APIFY_CRAWLER_TOKEN}" \
        | jq --raw-output '.resultsUrl')"

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
done


trap - EXIT
