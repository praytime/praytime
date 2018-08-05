#!/usr/bin/env bash

set -eu -o pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="${SCRIPT_DIR}/.."

# shellcheck source=/dev/null
. "${PROJECT_DIR}/script/common.sh"

trap exiterr EXIT


go run "${PROJECT_DIR}/go/cmd/praytime-load/main.go" <&0


trap - EXIT
