## Purpose
Praytime scrapes masjid iqamah/jumuah times, emits JSON crawl records, and loads them into Firestore with change notifications.

Default to using Bun instead of Node.js.

- Use `bun <file>` instead of `node <file>` or `ts-node <file>`
- Use `bun test` instead of `jest` or `vitest`
- Use `bun install` instead of `npm install` or `yarn install` or `pnpm install`
- Use `bun run <script>` instead of `npm run <script>` or `yarn run <script>` or `pnpm run <script>`
- Use `bunx <package> <command>` instead of `npx <package> <command>`
- Bun automatically loads .env, so don't use dotenv.

## APIs

- `bun:sqlite` for SQLite. Don't use `better-sqlite3`.
- Prefer `Bun.file` over `node:fs`'s readFile/writeFile
- Prefer direct Masjidal API calls via `util.loadMasjidalIqama` when the website exposes a usable Masjidal/AthanPlus `masjid_id`; only fall back to HTML scraping when no stable ID can be obtained.

## Testing

Run `bun run --parallel typecheck lint cpd test` after any changes. Tests will be included.

```ts#index.test.ts
import { test, expect } from "bun:test";

test("hello world", () => {
  expect(1).toBe(1);
});
```

Always test crawler changes using `bun run . --save <crawler>` to verify there are no regressions. If a save error is reported due to a missing prayer, check the site to see what is listed, and update the crawler or use the `--save --force` option to actually delete the prayer if the site is no longer listing it.

For more information, read the Bun API docs in `node_modules/bun-types/docs/**.mdx`.

## Repo Layout
- `src`: ts code runs crawlers and saves to Firestore
- `src/crawlers`: crawlers
- `go/pkg/praytime/`: Shared Go models and time normalization/comparison logic.
- `go/cmd/praytime-load/`: Reads crawl JSON from stdin and writes to Firestore, sends FCM notifications on change. (deprecated, ts now saves directly)
- `go/cmd/new-masjid/`: Scaffolds crawler modules from Google Maps place details.
- `go/cmd/message/`, `go/cmd/topicMessage/`, `go/cmd/text-search/`: Utility commands for messaging/discovery.
- `script/`: Shell wrappers for running crawlers, Go tools, and Maps API helpers.
- `test/`: Bun unit tests.
- `research/`: Prototypes/experiments, not production path.

## Crawler Contract
Each crawler module should export:
- `ids`: array of masjid records with `uuid4`, `name`, `timeZoneId`, `geo.latitude`, `geo.longitude` (and usually `url`, `address`, `placeId`).
- Optional `run`: async function that mutates `ids` with current times and returns `ids`. Crawlers without `run` are 'static'.
- Optional `puppeteer = true`: marks browser-based crawler.

### Non-Static Crawler Requirements
A non-static crawler's main purpose is to return accurate and up-to-date iqama prayer timings, sourced from the masjid website or APIs the masjid website uses.
- Prefer using APIs if available, then use page sources.
- If a browser is required to obtain prayer times, use puppeteer.
- If the masjid publishes a calendar in PDF or image format, use OCR tools to try and extract times.
- If a masjid website references some other means of getting prayer times (e.g. whatsapp), then return 'check website' in place of timings.
- If a masjid website just doesn't publish iqama times, then it should be a static crawler.
- If for some reason prayer times are published on the website but not programatically accessible, e.g. due to OCR limitations, then 'check website' may be returned so users know that times are available.
- Under no other circumstances should 'check website' be returned in place of prayer timings, rather an error should be returned so that crawler can be re-evaluated.
- Transient errors (fetch timeouts, http errors, etc) should also be surfaced so that the crawler can be retried later or re-evaluated.
- Crawlers should be fail-fast, do not use fallbacks.

## Runtime Flow
1. Run crawlers with Bun:
   - `bun run . [crawler module path]`
      e.g.: `bun run . US/IL/islamic-center-of-naperville`
2. Optional ingest to Firestore:
   - `bun run . --save [...]`

## Crawler History
Crawler runtime history is saved in .run/praytime.sqlite. `bun run report` to see the current status of each crawler.

## Environment Variables
- `PUPPETEER_DISABLED`: skip browser crawlers.
- `CRAWLER_TIMEOUT_MS`: per-crawler execution timeout in `index.js`.
- `HTTP_TIMEOUT_MS`: default HTTP timeout for `util.load`/`util.loadJson`.
- `HTTP_RETRIES`: retry attempts for transient HTTP/network errors.
- `GCLOUD_PROJECT`: Firebase/Firestore project ID for Go commands.
- `GMAPS_API_KEY`: required by Maps-based scripts and `new-masjid`.

## Conventions
- Crawler outputs are JSON lines with `{ result, error, source }`.
- `.env` is loaded by shell scripts via `script/common.sh`.

## Crawler Parse/Type Error Playbook
When a crawler fails with `TypeError`, selector errors, schema mismatch, or save error:

1. Reproduce and isolate
- Re-run only failing crawlers first (not the whole tree).
- Save output and group errors by exact `error` and `source`.
- Distinguish parser/data-shape errors from network/HTTP/TLS/DNS issues.

2. Inspect current source content
- Fetch the live page/API payload used by that crawler.
- Confirm whether failure is due to changed HTML structure, changed API schema, or empty response.
- Check for JS-rendered content and move to puppeteer only if static HTML no longer contains needed fields.

3. Apply defensive parsing patterns
- Never index into arrays/regex matches without guards.
- Use optional chaining + defaults for nested JSON (`obj?.a?.b`).
- Validate shape before mapping (`Array.isArray(x)`).
- Treat parser/schema mismatches as fatal, not best-effort success.
- Prefer `util.extractTime*` and `util.matchTime*` helpers over raw regex indexing.

4. Add resilient extraction fallback
- Keep primary site-specific selectors, but add a generic text-based fallback from current page content.
- Avoid extracting from `<script>/<style>` blobs when doing generic text parsing.
- Only accept plausible clock times (valid hour/minute ranges).
- Do not overwrite already-good values with lower-confidence fallback values.
- Do not silently convert parser failures into success; if required fields still fail validation, throw.
- Only return 'check website' in place of timings if a masjid website references some other means of getting prayer times (e.g. whatsapp), or if times are not programtically extractable due to technology limitations (e.g. OCR).

5. Preserve crawl stability
- Parsing/schema failures are fail-closed: throw and mark crawler failed for investigation.
- Keep `crawlError` meaningful; never clear parse/schema errors unless contract validation passes.
- Network/transient failures can use retries; parser/schema failures should not be retried blindly.

6. Validate before finishing
- Re-run the previously failing crawler set and confirm parse/type errors are gone. Use the `--save` option to confirm no prayers have been deleted.
- Spot-check output values for malformed times (`46:1`, `1:0`, etc.).
- Confirm no syntax/load errors for modified crawler modules.
- Validate output contract per crawler: required fields present, valid time format/ranges, no malformed values.

7. Prefer shared fixes when repeated
- If many crawlers fail similarly, first improve shared utilities or runner-level recovery.
- Keep crawler-specific logic for known site structures, but centralize generic fallback behavior in `lib/util.js` or `index.js`.

## Parser-Safe Coding Checklist
- Guard every `.match(...)[0]` / `.split(...)[n]` / `arr[n]`.
- Guard every destructuring of remote payloads.
- Trim and normalize extracted text before parsing.
- Add short comments only where parser resilience is non-obvious.
