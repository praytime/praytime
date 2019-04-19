#!/usr/bin/env bash

set -eu -o pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="${SCRIPT_DIR}/.."

# shellcheck source=/dev/null
. "${PROJECT_DIR}/script/common.sh"

trap exiterr EXIT

if [ -t 1 ] ; then 
    # Writing to terminal, use jq to pretty print
    node index.js "$@" | jq
else 
    node index.js "$@"
fi

trap - EXIT
