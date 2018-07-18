#!/usr/bin/env bash

set -eu -o pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="${SCRIPT_DIR}/.."

# shellcheck source=/dev/null
. "${PROJECT_DIR}/script/common.sh"

trap exiterr EXIT

# trigger build of nightly actor
curl -fsSLX POST "https://api.apify.com/v2/acts/JyBDpCj5wWp5hrsqA/runs?token=${APIFY_TOKEN}"


trap - EXIT
