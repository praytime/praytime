#!/usr/bin/env bash

cat <<EOF
{
  "_id": "bBG5kmupgKJPssdeh",
  "startUrls": [ { "value": "https://mccchicago.org" } ],
  "pageFunction": $(python -c 'import json,sys; print(json.dumps(sys.stdin.read()))' < page-function.js)
}
EOF


