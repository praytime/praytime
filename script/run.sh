#!/usr/bin/env bash

set -eu -o pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="${SCRIPT_DIR}/.."

# shellcheck source=common.sh
. "${PROJECT_DIR}/script/common.sh"

trap exiterr EXIT

if [ -t 1 ] ; then 
    # Writing to terminal, use jq to pretty print
    bun run . "$@" | jq
else 
    bun run . "$@"
fi

trap - EXIT
