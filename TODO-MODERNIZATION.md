# TODO-MODERNIZATION.md

## Now (stability and correctness)
- [x] Add Node unit tests for shared time helpers.
- [x] Fix AM/PM conversion edge cases (`12 AM`, `12 PM`, case handling).
- [x] Add HTTP timeout/retry defaults in shared loader utilities.
- [x] Add per-crawler timeout guard in the Node runner.
- [x] Fix Mawaqit offset parsing (`+ 10` / `- 5`) in affected crawlers.

## Next (quality gates and security)
- [ ] Update vulnerable/outdated Node dependencies and refresh `package-lock.json`.

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
