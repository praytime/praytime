#!/bin/bash

# TODO: set trap

set -euf -o pipefail

echoerr() {
    >&2 echo "$@"
}

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

curl -fsSLo input.json "https://api.apify.com/v2/key-value-stores/${APIFY_DEFAULT_KEY_VALUE_STORE_ID}/records/INPUT?disableRedirect=1"

cat input.json

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

cd "${SCRIPT_DIR}/masaajid/islamic-center-of-naperville"

"${SCRIPT_DIR}/script/run-and-save.sh"
