#!/usr/bin/env bash

set -eu -o pipefail

SCRIPT_NAME="$( basename "${BASH_SOURCE[0]}" )"
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="$SCRIPT_DIR/.."
GODIR="$PROJECT_DIR/go/cmd/$SCRIPT_NAME"
GOEXEC="$PROJECT_DIR/node_modules/.bin/$SCRIPT_NAME"

# shellcheck source=common.sh
. "$PROJECT_DIR/script/common.sh"

pushd "$GODIR" > /dev/null

go build -o "$GOEXEC" .

popd > /dev/null

exec "$GOEXEC" "$@"
