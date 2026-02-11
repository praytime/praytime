Default to using Bun instead of Node.js.

- Use `bun <file>` instead of `node <file>` or `ts-node <file>`
- Use `bun test` instead of `jest` or `vitest`
- Use `bun build <file.html|file.ts|file.css>` instead of `webpack` or `esbuild`
- Use `bun install` instead of `npm install` or `yarn install` or `pnpm install`
- Use `bun run <script>` instead of `npm run <script>` or `yarn run <script>` or `pnpm run <script>`
- Use `bunx <package> <command>` instead of `npx <package> <command>`
- Bun automatically loads .env, so don't use dotenv.

## APIs

- `bun:sqlite` for SQLite. Don't use `better-sqlite3`.
- Prefer `Bun.file` over `node:fs`'s readFile/writeFile
- Bun.$`ls` instead of execa.

## Testing

Run `bun run --parallel typecheck lint test` after any changes. Tests will be included.

```ts#index.test.ts
import { test, expect } from "bun:test";

test("hello world", () => {
  expect(1).toBe(1);
});
```

For more information, read the Bun API docs in `node_modules/bun-types/docs/**.mdx`.

## Purpose
Praytime scrapes masjid iqamah/jumuah times, emits JSON crawl records, and loads them into Firestore with change notifications.

## Repo Layout
- `index.js`: Bun crawl runner. Loads crawler modules, executes them, and prints JSON lines.
- `lib/index.js`: Discovers all crawler module directories under `lib/<country>/<state>/<crawler>/`.
- `lib/util.js`: Shared scrape utilities (HTTP fetch, regex/time parsing, cheerio/puppeteer helpers).
- `lib/<COUNTRY>/<STATE>/<crawler>/index.js`: One crawler per directory.
- `go/pkg/praytime/`: Shared Go models and time normalization/comparison logic.
- `go/cmd/praytime-load/`: Reads crawl JSON from stdin and writes to Firestore, sends FCM notifications on change.
- `go/cmd/new-masjid/`: Scaffolds crawler modules from Google Maps place details.
- `go/cmd/message/`, `go/cmd/topicMessage/`, `go/cmd/text-search/`: Utility commands for messaging/discovery.
- `script/`: Shell wrappers for running crawlers, Go tools, and Maps API helpers.
- `test/`: Bun unit tests.
- `research/`: Prototypes/experiments, not production path.

## Crawler Contract
Each crawler module should export:
- `ids`: array of masjid records with `uuid4`, `name`, `timeZoneId`, `geo.latitude`, `geo.longitude` (and usually `url`, `address`, `placeId`).
- Optional `run`: async function that mutates `ids` with current times and returns `ids`.
- Optional `puppeteer = true`: marks browser-based crawler.

## Runtime Flow
1. Run crawlers with Bun:
   - `script/run.sh [crawler-path ...]`
2. Optional ingest to Firestore:
   - `script/run.sh ... | script/praytime-load`

## Useful Commands
- Run one crawler: `script/run.sh ./lib/US/IL/islamic-center-of-naperville`
- Dump static index data: `bun index.js --dump`
- Bun tests: `bun test`
- Go tests: `cd go/pkg/praytime && go test ./...`

## Environment Variables
- `PUPPETEER_DISABLED`: skip browser crawlers.
- `CRAWLER_TIMEOUT_MS`: per-crawler execution timeout in `index.js`.
- `HTTP_TIMEOUT_MS`: default HTTP timeout for `util.load`/`util.loadJson`.
- `HTTP_RETRIES`: retry attempts for transient HTTP/network errors.
- `GCLOUD_PROJECT`: Firebase/Firestore project ID for Go commands.
- `GMAPS_API_KEY`: required by Maps-based scripts and `new-masjid`.

## Conventions
- Bun code uses CommonJS.
- Crawler outputs are JSON lines with `{ result, error, source }`.
- `.env` is loaded by shell scripts via `script/common.sh`.

## Crawler Parse/Type Error Playbook
When a crawler fails with `TypeError`, selector errors, or schema mismatch:

1. Reproduce and isolate
- Re-run only failing crawlers first (not the whole tree).
- Save output and group errors by exact `error` and `source`.
- Distinguish parser/data-shape errors from network/HTTP/TLS/DNS issues.
- Classify every failure as one of: `parse_schema`, `network_transient`, `http_blocked`, `timeout`.

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

5. Preserve crawl stability
- Parsing/schema failures are fail-closed: throw and mark crawler failed for investigation.
- Use placeholders only when they are intentional (`check website`, `-`, `--`), not accidental parse artifacts.
- Keep `crawlError` meaningful; never clear parse/schema errors unless contract validation passes.
- Network/transient failures can use retries; parser/schema failures should not be retried blindly.

6. Validate before finishing
- Re-run the previously failing crawler set and confirm parse/type errors are gone.
- Spot-check output values for malformed times (`46:1`, `1:0`, etc.).
- Confirm no syntax/load errors for modified crawler modules.
- Validate output contract per crawler: required fields present, valid time format/ranges, no malformed values.

7. Prefer shared fixes when repeated
- If many crawlers fail similarly, first improve shared utilities or runner-level recovery.
- Keep crawler-specific logic for known site structures, but centralize generic fallback behavior in `lib/util.js` or `index.js`.

8. Detect source-structure drift automatically
- Emit structured per-source health every run: `status`, `error_type`, `filled_field_count`, `malformed_field_count`.
- Flag crawler for scraping re-evaluation when any trigger occurs:
- new `parse_schema` failure,
- completeness drop greater than 30% vs recent baseline,
- malformed field count greater than 0,
- repeated fallback usage across consecutive runs.
- Quarantine flagged crawlers from downstream publish/load until fixed.
- Add fixture-based parser tests (saved HTML/API samples) so selector/schema breaks fail CI quickly.

## Parser-Safe Coding Checklist
- Guard every `.match(...)[0]` / `.split(...)[n]` / `arr[n]`.
- Guard every destructuring of remote payloads.
- Trim and normalize extracted text before parsing.
- Filter empty values before `util.setIqamaTimes` / `util.setJumaTimes`.
- Use `slice(0, N)` when passing arrays to setters.
- Add short comments only where parser resilience is non-obvious.
