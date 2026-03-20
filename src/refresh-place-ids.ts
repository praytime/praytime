import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  type PlaceIdRefreshTarget,
  type PlaceLookupCandidate,
  pickBestPlaceCandidate,
  updateSourceTextPlaceIds,
} from "./placeids";
import { discoverCrawlers, filterCrawlerEntries } from "./registry";
import { runMain } from "./runmain";
import { get, parsePositiveInt } from "./util";

type LegacyPlacesStatus =
  | "INVALID_REQUEST"
  | "NOT_FOUND"
  | "OK"
  | "OVER_QUERY_LIMIT"
  | "REQUEST_DENIED"
  | "UNKNOWN_ERROR"
  | "ZERO_RESULTS";

type LegacyPlaceDetailsResponse = {
  error_message?: string;
  result?: {
    place_id?: string;
  };
  status?: LegacyPlacesStatus;
};

type LegacyFindPlaceResponse = {
  candidates?: LegacyFindPlaceCandidate[];
  error_message?: string;
  status?: LegacyPlacesStatus;
};

type LegacyFindPlaceCandidate = {
  formatted_address?: string;
  geometry?: {
    location?: {
      lat?: number;
      lng?: number;
    };
  };
  name?: string;
  place_id?: string;
};

type RefreshCliOptions = {
  concurrency: number;
  help: boolean;
  limit?: number;
  patterns: string[];
  verbose: boolean;
  write: boolean;
};

type RefreshResult =
  | {
      newPlaceId: string;
      oldPlaceId: string;
      query?: string;
      status: "resolved" | "updated";
      target: PlaceIdRefreshTarget;
      via: string;
    }
  | {
      oldPlaceId: string;
      status: "unchanged";
      target: PlaceIdRefreshTarget;
      via: "details";
    };

type RefreshFailure = {
  message: string;
  oldPlaceId: string;
  status: "error";
  target: PlaceIdRefreshTarget;
};

const usage = `Usage: bun run src/refresh-place-ids.ts [options] [crawler-name-or-glob ...]

Options:
  --crawler <name-or-glob>  Select crawler(s), repeatable
  --write                   Update crawler source files in place
  --limit <count>           Only process the first N matching records
  --concurrency <count>     Parallel Google Places requests (default: 4)
  --verbose                 Print every checked record
  --help                    Show this help message
`;

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");

const RETRYABLE_PLACES_STATUSES = new Set<LegacyPlacesStatus>([
  "OVER_QUERY_LIMIT",
  "UNKNOWN_ERROR",
]);

const sleep = async (ms: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

const shiftRequiredValue = (
  args: string[],
  optionName: string,
  missingMessage: string,
): string => {
  const value = args.shift();
  if (!value) {
    throw new Error(missingMessage);
  }

  if (optionName === "--crawler" && value.startsWith("--")) {
    throw new Error(missingMessage);
  }

  return value;
};

const readPositiveIntOption = (
  _optionName: string,
  rawValue: string,
  invalidMessage: string,
): number => {
  const value = parsePositiveInt(rawValue, 0);
  if (!value) {
    throw new Error(invalidMessage);
  }

  return value;
};

const maybeConsumePatternOption = (
  arg: string,
  args: string[],
  patterns: string[],
): boolean => {
  if (arg === "--crawler") {
    patterns.push(
      shiftRequiredValue(args, "--crawler", "--crawler requires a value"),
    );
    return true;
  }

  const prefix = "--crawler=";
  if (!arg.startsWith(prefix)) {
    return false;
  }

  const value = arg.slice(prefix.length);
  if (!value) {
    throw new Error("--crawler requires a non-empty value");
  }

  patterns.push(value);
  return true;
};

const maybeConsumeNumericOption = (
  arg: string,
  args: string[],
  optionName: "--concurrency" | "--limit",
  invalidMessage: string,
): number | null => {
  if (arg === optionName) {
    return readPositiveIntOption(
      optionName,
      shiftRequiredValue(args, optionName, `${optionName} requires a value`),
      invalidMessage,
    );
  }

  const prefix = `${optionName}=`;
  if (!arg.startsWith(prefix)) {
    return null;
  }

  return readPositiveIntOption(
    optionName,
    arg.slice(prefix.length),
    invalidMessage,
  );
};

const parseCliArgs = (argv: string[]): RefreshCliOptions => {
  const options: RefreshCliOptions = {
    concurrency: 4,
    help: false,
    patterns: [],
    verbose: false,
    write: false,
  };

  const args = [...argv];

  while (args.length > 0) {
    const arg = args.shift();
    if (!arg) {
      continue;
    }

    if (arg === "--") {
      options.patterns.push(...args);
      break;
    }

    if (arg === "--help") {
      options.help = true;
      continue;
    }

    if (arg === "--write") {
      options.write = true;
      continue;
    }

    if (arg === "--verbose") {
      options.verbose = true;
      continue;
    }

    if (maybeConsumePatternOption(arg, args, options.patterns)) {
      continue;
    }

    const limit = maybeConsumeNumericOption(
      arg,
      args,
      "--limit",
      "--limit must be a positive integer",
    );
    if (limit !== null) {
      options.limit = limit;
      continue;
    }

    const concurrency = maybeConsumeNumericOption(
      arg,
      args,
      "--concurrency",
      "--concurrency must be a positive integer",
    );
    if (concurrency !== null) {
      options.concurrency = concurrency;
      continue;
    }

    if (!arg.startsWith("--")) {
      options.patterns.push(arg);
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return options;
};

const buildPlacesUrl = (
  pathname: string,
  params: Record<string, string>,
): string => {
  const url = new URL(`https://maps.googleapis.com/maps/api/place/${pathname}`);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  return url.toString();
};

const loadLegacyPlacesJson = async <
  T extends { error_message?: string; status?: LegacyPlacesStatus },
>(
  url: string,
): Promise<T> => {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const response = await get<T>(url);
    const status = response.data?.status;

    if (!status || !RETRYABLE_PLACES_STATUSES.has(status) || attempt === 2) {
      return response.data;
    }

    await sleep(500 * 2 ** attempt);
  }

  throw new Error(`request attempts exhausted for ${url}`);
};

const refreshPlaceIdViaDetails = async (
  apiKey: string,
  placeId: string,
): Promise<LegacyPlaceDetailsResponse> =>
  loadLegacyPlacesJson<LegacyPlaceDetailsResponse>(
    buildPlacesUrl("details/json", {
      fields: "place_id",
      key: apiKey,
      place_id: placeId,
    }),
  );

const toLocationBias = ({
  latitude,
  longitude,
}: PlaceIdRefreshTarget["geo"]): string =>
  `circle:10000@${latitude},${longitude}`;

const findPlace = async (
  apiKey: string,
  query: string,
  target: PlaceIdRefreshTarget,
): Promise<LegacyFindPlaceResponse> =>
  loadLegacyPlacesJson<LegacyFindPlaceResponse>(
    buildPlacesUrl("findplacefromtext/json", {
      fields: "formatted_address,geometry,name,place_id",
      input: query,
      inputtype: "textquery",
      key: apiKey,
      language: "en",
      locationbias: toLocationBias(target.geo),
    }),
  );

const buildLookupQueries = (target: PlaceIdRefreshTarget): string[] => {
  const queries = [
    `${target.name}, ${target.address}`,
    target.address,
    target.name,
  ];
  const deduped = new Set<string>();

  for (const query of queries) {
    const normalized = query.trim();
    if (normalized.length > 0) {
      deduped.add(normalized);
    }
  }

  return [...deduped];
};

const toLookupCandidate = (
  candidate: LegacyFindPlaceCandidate,
): PlaceLookupCandidate | null => {
  const placeId = candidate.place_id;
  const name = candidate.name;
  const address = candidate.formatted_address;
  const latitude = candidate.geometry?.location?.lat;
  const longitude = candidate.geometry?.location?.lng;

  if (
    typeof placeId !== "string" ||
    typeof name !== "string" ||
    typeof address !== "string"
  ) {
    return null;
  }

  return {
    address,
    geo:
      isFiniteNumber(latitude) && isFiniteNumber(longitude)
        ? {
            latitude,
            longitude,
          }
        : undefined,
    name,
    placeId,
  };
};

const resolveObsoletePlaceId = async (
  apiKey: string,
  target: PlaceIdRefreshTarget,
): Promise<RefreshResult> => {
  const attemptNotes: string[] = [];

  for (const query of buildLookupQueries(target)) {
    const response = await findPlace(apiKey, query, target);
    const status = response.status;

    if (!status) {
      throw new Error(`missing Places Find Place status for query "${query}"`);
    }

    if (status === "ZERO_RESULTS") {
      attemptNotes.push(`${query}: ZERO_RESULTS`);
      continue;
    }

    if (status !== "OK") {
      const message = response.error_message
        ? `${status}: ${response.error_message}`
        : status;
      throw new Error(`Find Place failed for "${query}": ${message}`);
    }

    const candidates = (response.candidates ?? [])
      .map((candidate) => toLookupCandidate(candidate))
      .filter((candidate) => candidate !== null);
    const match = pickBestPlaceCandidate(target, candidates);
    if (!match) {
      attemptNotes.push(`${query}: ambiguous or low-confidence match`);
      continue;
    }

    return {
      newPlaceId: match.candidate.placeId,
      oldPlaceId: target.placeId,
      query,
      status: "resolved",
      target,
      via: "find-place",
    };
  }

  throw new Error(
    `unable to resolve replacement place ID (${attemptNotes.join("; ") || "no matching candidates"})`,
  );
};

const refreshTarget = async (
  apiKey: string,
  target: PlaceIdRefreshTarget,
): Promise<RefreshFailure | RefreshResult> => {
  try {
    const response = await refreshPlaceIdViaDetails(apiKey, target.placeId);
    const status = response.status;

    if (!status) {
      throw new Error("missing Places Details status");
    }

    if (status === "OK") {
      const nextPlaceId = response.result?.place_id;
      if (typeof nextPlaceId !== "string" || nextPlaceId.length === 0) {
        throw new Error("Place Details returned OK without place_id");
      }

      if (nextPlaceId === target.placeId) {
        return {
          oldPlaceId: target.placeId,
          status: "unchanged",
          target,
          via: "details",
        };
      }

      return {
        newPlaceId: nextPlaceId,
        oldPlaceId: target.placeId,
        status: "updated",
        target,
        via: "details",
      };
    }

    if (status === "NOT_FOUND" || status === "INVALID_REQUEST") {
      return await resolveObsoletePlaceId(apiKey, target);
    }

    const message = response.error_message
      ? `${status}: ${response.error_message}`
      : status;
    throw new Error(`Place Details failed: ${message}`);
  } catch (error: unknown) {
    return {
      message: error instanceof Error ? error.message : String(error),
      oldPlaceId: target.placeId,
      status: "error",
      target,
    };
  }
};

const mapWithConcurrency = async <T, U>(
  values: T[],
  concurrency: number,
  worker: (value: T) => Promise<U>,
): Promise<U[]> => {
  const results = new Array<U>(values.length);
  let nextIndex = 0;

  const workers = Array.from(
    { length: Math.min(concurrency, values.length) },
    async () => {
      while (true) {
        const currentIndex = nextIndex;
        nextIndex += 1;

        if (currentIndex >= values.length) {
          return;
        }

        results[currentIndex] = await worker(values[currentIndex] as T);
      }
    },
  );

  await Promise.all(workers);
  return results;
};

const relativePath = (value: string): string => path.relative(repoRoot, value);

const formatResult = (
  result: RefreshFailure | RefreshResult,
  includeUnchanged: boolean,
): string | null => {
  const label = `${result.target.crawlerName} :: ${result.target.name}`;

  if (result.status === "unchanged") {
    if (!includeUnchanged) {
      return null;
    }

    return `UNCHANGED\t${label}\t${result.oldPlaceId}`;
  }

  if (result.status === "error") {
    return `ERROR\t${label}\t${result.oldPlaceId}\t${result.message}`;
  }

  const querySuffix = result.query ? `\t${result.query}` : "";
  return `${result.status.toUpperCase()}\t${label}\t${result.oldPlaceId}\t${result.newPlaceId}\t${result.via}${querySuffix}`;
};

const writeUpdates = async (results: RefreshResult[]): Promise<number> => {
  const updatesByFile = new Map<
    string,
    Array<{ placeId: string; uuid4: string }>
  >();

  for (const result of results) {
    if (
      result.status === "unchanged" ||
      result.newPlaceId === result.oldPlaceId
    ) {
      continue;
    }

    const sourceFile = path.join(repoRoot, result.target.sourcePath);
    const fileUpdates = updatesByFile.get(sourceFile) ?? [];
    fileUpdates.push({
      placeId: result.newPlaceId,
      uuid4: result.target.uuid4,
    });
    updatesByFile.set(sourceFile, fileUpdates);
  }

  for (const [sourceFile, replacements] of updatesByFile) {
    const original = await Bun.file(sourceFile).text();
    const nextText = updateSourceTextPlaceIds(original, replacements);
    if (nextText !== original) {
      await Bun.write(sourceFile, nextText);
    }
  }

  return updatesByFile.size;
};

export const main = async (argv = process.argv.slice(2)): Promise<void> => {
  process.chdir(repoRoot);

  const options = parseCliArgs(argv);
  if (options.help) {
    process.stdout.write(usage);
    return;
  }

  const apiKey = process.env.GMAPS_API_KEY;
  if (!apiKey) {
    throw new Error("GMAPS_API_KEY is required");
  }

  const entries = filterCrawlerEntries(
    await discoverCrawlers(),
    options.patterns,
  );
  const targets = entries
    .flatMap((entry) =>
      entry.crawler.ids.map<PlaceIdRefreshTarget>((record) => ({
        address: record.address ?? "",
        crawlerName: entry.name,
        geo: record.geo,
        name: record.name,
        placeId: record.placeId ?? "",
        sourcePath: entry.sourcePath,
        uuid4: record.uuid4,
      })),
    )
    .filter(
      (target) =>
        target.address.length > 0 &&
        target.placeId.length > 0 &&
        target.name.length > 0,
    );

  const limitedTargets =
    typeof options.limit === "number"
      ? targets.slice(0, options.limit)
      : targets;

  const results = await mapWithConcurrency(
    limitedTargets,
    options.concurrency,
    async (target) => refreshTarget(apiKey, target),
  );

  for (const result of results) {
    const line = formatResult(result, options.verbose);
    if (line) {
      console.log(line);
    }
  }

  const failures = results.filter(
    (result): result is RefreshFailure => result.status === "error",
  );
  const successfulResults = results.filter(
    (result): result is RefreshResult => result.status !== "error",
  );
  const changedResults = successfulResults.filter(
    (result) =>
      result.status !== "unchanged" && result.newPlaceId !== result.oldPlaceId,
  );

  let writtenFiles = 0;
  if (options.write && changedResults.length > 0) {
    writtenFiles = await writeUpdates(changedResults);
  }

  console.log(
    [
      "SUMMARY",
      `checked=${limitedTargets.length}`,
      `unchanged=${successfulResults.filter((result) => result.status === "unchanged").length}`,
      `changed=${changedResults.length}`,
      `errors=${failures.length}`,
      `mode=${options.write ? "write" : "dry-run"}`,
      `files=${writtenFiles}`,
    ].join("\t"),
  );

  if (changedResults.length > 0) {
    const changedFiles = new Set(
      changedResults.map((result) =>
        relativePath(path.join(repoRoot, result.target.sourcePath)),
      ),
    );
    console.log(
      `FILES\t${[...changedFiles].sort((left, right) => left.localeCompare(right)).join(",")}`,
    );
  }

  if (failures.length > 0) {
    throw new Error(`place ID refresh finished with ${failures.length} errors`);
  }
};

runMain(main, import.meta.main);
