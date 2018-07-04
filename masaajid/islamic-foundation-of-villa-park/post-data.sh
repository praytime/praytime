#!/bin/bash

cat <<EOF
{
  "_id": "bBG5kmupgKJPssdeh",
  "startUrls": [ { "value": "https://us.mohid.co/il/swcs/ifsvp/masjid/widget/api/index/?m=prayertimings" } ],
  "pageFunction": $(python -c 'import json,sys; print(json.dumps(sys.stdin.read()))' < page-function.js)
}
EOF


