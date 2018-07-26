#!/usr/bin/env bash

# shellcheck source=/dev/null
if [[ -e "${PROJECT_DIR?}/.env" ]] ; then
    set -a # automatically export all new variables
    . "${PROJECT_DIR?}/.env"
    set +a # stop automatically exporting variables
fi

function echoerr() {
    >&2 echo "$@"
}

function exiterr {
    echoerr "An error occurred"
    exit 1
}

