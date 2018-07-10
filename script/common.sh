#!/usr/bin/env bash

function echoerr() {
    >&2 echo "$@"
}

function exiterr {
    echoerr "An error occurred"
    exit 1
}

# shellcheck source=/dev/null
[[ -e "${PROJECT_DIR}/.env" ]] && . "${PROJECT_DIR}/.env"

