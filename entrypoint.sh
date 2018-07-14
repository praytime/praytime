#!/usr/bin/env bash

set -eu -o pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="${SCRIPT_DIR}"

# shellcheck source=/dev/null
. "${PROJECT_DIR}/script/common.sh"

trap exiterr EXIT


curl -fsSLo input.json "https://api.apify.com/v2/key-value-stores/${APIFY_DEFAULT_KEY_VALUE_STORE_ID}/records/INPUT?disableRedirect=1"

# set 'env' section vars
# -r: raw output, strips quotes
for k in $(jq -r ".env | keys[]" input.json) ; do
    v="$(jq -r ".env[\"$k\"]" input.json)"
    export "${k}=${v}"
done

# set files section files
for k in $(jq -r ".files | keys[]" input.json) ; do
    jq -r ".files[\"$k\"]" input.json > "$k"
done

node index.js | "${PROJECT_DIR}/script/save.sh"


trap - EXIT
