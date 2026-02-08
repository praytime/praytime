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

Use `bun test` to run tests.

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
