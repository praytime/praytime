# TODO

- Migrate to typescript
- strict typechecks
- biome lint + format
- knip
- jscpd
- replace go w/typescript
- eliminate scripts
- use Bun.fetch instead of axios
  - web cache?
- use playwright instead of puppeteer
- persist sqlite
  - scrape logs: timestamp, inputs, outputs


## Near-term (maintainability)
- [ ] Introduce provider adapters for repeated scraper patterns:
  - [ ] Masjidal API
  - [ ] Mawaqit
  - [ ] `dptTimetable`-based pages
  - [ ] `prayer_entry`/Awqat-like layouts
- [ ] Add fixture-based parser tests for representative providers.
- [ ] Add crawler output validation step (required keys + sane time formats).
- [ ] Add machine-readable crawl failure summary (by source/error type).

## Go pipeline modernization
- [ ] Standardize Go versions/modules across `go/cmd/*` and `go/pkg/*`.
- [ ] Align Firebase Admin SDK usage (avoid mixed v3/v4 patterns).
- [ ] Verify and fix FCM topic naming/condition logic in loader and topic tools.
- [ ] Add tests around time normalization and compare/diff behavior in Go package.

## Documentation and operations
- [ ] Update `README.md` with current workflow, env vars, and testing commands.
- [ ] Document crawler authoring patterns with minimal templates per provider type.
- [ ] Document rollback and incident steps for bad scrape pushes.
- [ ] Add a scheduled smoke job for a small crawler subset with alerting.

## Re-evaluate
- push notifications on change
  - add auth (anon)
  - add db rules for id validation https://firebase.google.com/docs/firestore/security/rules-conditions
  - enable fcm in service worker
  - prompt for messaging permission
  - add buttons to subscribe for notifications
  - tables joining uid - masjid interest - fcm tokens
  - implement fcm token TTL
  - golang send message on change
- split nightly by timezone
- add direct link support
- allow arbitrary key-value fields
- UI
  - footer
- doc
  - how to add a new masjid
    - video / screencast tutorial
    - scraping tips
      - dev console
      - iframe
- scrape / calculate adhan timings
- calendar ocr to table
- site features
  - web form to add css selector paths for particular times
  - edit times (verify based on GPS)
  - become 'owner' of masjid
- auto-generate google calendar
- easyredir for praytime.us
