#!/bin/bash

curl -v -v --include --request POST --header "Content-Type: application/json" --data-binary "$(./post-data.sh)" https://api.apify.com/v1/hMf69fRQCWWX84d5Z/crawlers/bBG5kmupgKJPssdeh/execute?token=ptgJXnS5JYaRCHG8f6RAx5oHM
