#!/usr/bin/env bash

# helper script to change directory name under lib and update index.js

set -eu -o pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="${SCRIPT_DIR}/.."

# shellcheck source=common.sh
. "${PROJECT_DIR}/script/common.sh"

trap exiterr EXIT

set -x

git mv "$1" "$2"

perl -p -i -e "s{\Q$1\E}{$2}" index.js 

set +x

trap - EXIT
