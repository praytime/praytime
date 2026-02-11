# TypeScript Migration Plan

## Goals

- Re-implement the JavaScript crawler runtime in TypeScript under `praytime/`.
- Keep behavior parity with current runner output contract: JSON lines of `{ result, error, source }`.
- Support running one, some, or all crawlers from `index.ts`.
- Support crawler discovery/listing from `index.ts`.
- Improve safety with strict types, parser guards, and static analysis.
- Prepare for eventual replacement of root JS code with the TS project.

## Current Baseline (for planning)

- Existing crawler modules: ~758 (`lib/**/index.js`).
- Crawler modules with `run`: ~366.
- Puppeteer crawlers: ~43.
- Current runner capabilities to preserve:
  - run all crawlers or selected module paths
  - `--dump`
  - `--skip-static`
  - `--skip-ppt`
  - `PUPPETEER_DISABLED`, `CRAWLER_TIMEOUT_MS`, HTTP timeout/retry env vars

## Proposed TS Project Layout (inside `praytime/`)

```txt
praytime/
  src/
    index.ts                  # CLI entrypoint
    runner.ts                 # orchestration, timeout, output emission
    registry.ts               # load/list/filter crawler modules
    types.ts                  # shared contracts
    util.ts                   # typed port of lib/util.js
    crawlers/
      US/
        IL/
          islamic-center-of-naperville.ts
        ...
      CA/
      MX/
  scripts/
    generate-registry.ts      # optional: generates static registry from crawlers/
  test/
    *.test.ts
```

### Crawler file convention

- One crawler per file: `src/crawlers/<COUNTRY>/<STATE>/<crawler-name>.ts`.
- Canonical crawler name is path-like and stable, e.g. `US/IL/islamic-center-of-naperville`.
- Each crawler exports a typed object (preferred) or typed named exports:

```ts
export const crawler: CrawlerModule = {
  name: "US/IL/islamic-center-of-naperville",
  ids,
  run,
  puppeteer: false,
};
```

## Type Contracts to Introduce Early

Create strict types first and force all new TS code to conform:

- `GeoPoint`, `MasjidRecordBase`, `MasjidRecordCrawlFields`, `MasjidRecord`.
- `CrawlerModule`:
  - `name: string` (canonical id)
  - `ids: MasjidRecord[]`
  - `run?: () => Promise<MasjidRecord[]> | MasjidRecord[]`
  - `puppeteer?: boolean`
- `CrawlOutputLine`:
  - `result: MasjidRecord`
  - `error: string`
  - `source: string`

Add utility-level parser-safe helpers and avoid unsafe indexing (`match()[0]`, array offsets) without guards.

## Registry + Selection Strategy

Use crawler names (and optional glob patterns) instead of filesystem paths as the primary selector.

Recommended CLI behavior:

- `bun run src/index.ts` -> run all crawlers
- `bun run src/index.ts --crawler US/IL/islamic-center-of-naperville`
- `bun run src/index.ts --crawler 'US/IL/*naperville*'`
- `bun run src/index.ts --list`
- `bun run src/index.ts --dump`

### Loading options

- Preferred: dynamic runtime discovery with `Bun.Glob("src/crawlers/**/*.ts")` + `import()`.
- Optional (for stronger compile-time guarantees/startup speed): generated static registry (`scripts/generate-registry.ts`).

Given crawler count (~758), start with dynamic discovery for migration speed, then add generated registry if startup/type ergonomics need improvement.

## Migration Phases

## Phase 0: Foundation (no behavior change)

- Create `src/types.ts`, `src/util.ts`, `src/runner.ts`, `src/registry.ts`, `src/index.ts`.
- Port `lib/util.js` to typed TS with the same behavior.
- Port runner semantics from `index.js` (timeouts, skip flags, JSONL output).
- Implement `--list` and name/glob selection.
- Add Bun tests for utility functions and runner selection logic.

Exit criteria:

- `bun run src/index.ts --list` returns all discoverable crawlers.
- Runner can execute at least one existing crawler end-to-end with identical output shape.

## Phase 1: Dual-run compatibility

- Add compatibility adapter so TS runner can execute both:
  - migrated TS crawler modules
  - legacy JS crawler modules (temporary)
- Keep old root runner usable while parity is being established.

Exit criteria:

- TS runner can run selected legacy crawlers by canonical name.
- No contract regressions in JSONL output fields.

## Phase 2: Bulk crawler migration

- Convert crawlers in batches (e.g., by country/state).
- Use mechanical transforms first (`require` -> `import`, `exports` -> `export`), then type hardening.
- Apply parser-safe checklist to each converted crawler.
- Track migration status in a simple checklist table in this file or a separate tracker.

Exit criteria:

- Converted crawlers compile with strict TS checks.
- No parse/type regression on the converted set.

## Phase 3: Quality gates

- Add/expand tests:
  - schema validation of `ids`
  - UUID uniqueness
  - malformed time detection
  - crawler list/selection correctness
- Add linting/static analysis:
  - `typescript-eslint`
  - optional `oxlint`/`biome` if desired
- Tighten compiler flags (see tsconfig section).

Exit criteria:

- CI runs `bun test` and `bunx tsc --noEmit` cleanly.

## Phase 4: Cutover

- Make TS runner the primary project entrypoint.
- Update `script/run.sh` to target TS entrypoint.
- Move/replace root JS files once all crawlers are migrated.
- Remove legacy JS compatibility layer.

Exit criteria:

- Root JS runner/util no longer required.
- Production workflow uses TS project only.

## tsconfig guidance (`module` and `target`)

Short answer: yes, adjust them from the default Bun starter values for this backend crawler project.

Recommended settings during migration:

- `module`: `"ESNext"` (instead of `"Preserve"`)
- `target`: `"ES2022"`

Rationale:

- `module: "ESNext"` makes module intent explicit for ESM runtime (`"type": "module"`) and avoids ambiguous mixed-mode behavior from `"Preserve"`.
- `target: "ES2022"` is a practical floor for modern runtime features while keeping tooling/static analysis deterministic.

Suggested additional compiler settings for strong checks:

- keep: `strict`, `noUncheckedIndexedAccess`, `noFallthroughCasesInSwitch`, `noImplicitOverride`, `verbatimModuleSyntax`, `noEmit`
- add: `exactOptionalPropertyTypes`, `noImplicitReturns`, `useUnknownInCatchVariables`, `noPropertyAccessFromIndexSignature`
- keep: `allowJs: false`

## Implementation Notes

- Preserve environment variable names to avoid operational surprises.
- Keep fail-closed behavior for parser/schema errors.
- Keep placeholder semantics (`check website`, `-`, `--`) intentional only.
- Do not clear `crawlError` unless validation passes.

## Recommended initial next tasks

1. Build `src/types.ts` + `src/util.ts` with strict types.
2. Implement `src/registry.ts` with `--list` and name/glob filtering.
3. Implement `src/index.ts` + `src/runner.ts` preserving current flags and JSONL output.
4. Migrate 5-10 representative crawlers (static, HTTP, puppeteer) and validate parity.
