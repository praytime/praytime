#!/usr/bin/env bash

# shellcheck source=../.env
if [[ -e "${PROJECT_DIR?}/.env" ]] ; then
    set -a # automatically export all new variables
    . "${PROJECT_DIR?}/.env"
    set +a # stop automatically exporting variables
fi

function warn() {
    >&2 echo "$@"
}

function die() {
    warn "$@"
    exit 1
}

function exiterr {
    warn "An error occurred"
    exit 1
}
