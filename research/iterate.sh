#!/bin/bash

# -r: raw output, strips quotes
for k in $(jq -r ".env | keys[]" input.json) ; do
    v="$(jq -r ".env[\"$k\"]" input.json)"
    export "${k}=${v}"
done

for k in $(jq -r ".files | keys[]" input.json) ; do
    jq -r ".files[\"$k\"]" input.json > "$k"
done
