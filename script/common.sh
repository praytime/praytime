#!/usr/bin/env bash

function echoerr() {
    >&2 echo "$@"
}

function exiterr {
    echoerr "An error occurred"
    exit 1
}

# shellcheck source=/dev/null
if [[ -e "${PROJECT_DIR}/.env" ]] ; then
    . "${PROJECT_DIR}/.env"
fi

