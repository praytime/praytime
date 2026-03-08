import { Database } from "bun:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";

import type {
  CrawlerRunCompleteEvent,
  CrawlOutputLine,
  MasjidRecord,
} from "./types";

const timingFields = [
  "fajrIqama",
  "zuhrIqama",
  "asrIqama",
  "maghribIqama",
  "ishaIqama",
  "juma1",
  "juma2",
  "juma3",
] as const;

type TimingField = (typeof timingFields)[number];

export type CrawlerRunStatus =
  | "error"
  | "static"
  | "no_change"
  | "timings_updated";

type RunSessionStatus =
  | "running"
  | "completed"
  | "completed_with_errors"
  | "failed";

export interface GitMetadata {
  commitHash: string;
  dirty: boolean;
}

export interface CrawlerDescriptor {
  name: string;
  sourcePath: string;
  isStatic: boolean;
  isPuppeteer: boolean;
}

export interface RunSessionStartInput {
  argv: string[];
  patterns: string[];
  crawlerNames: string[];
  options: {
    save: boolean;
    force: boolean;
    verbose: boolean;
    skipStatic: boolean;
    skipPuppeteer: boolean;
  };
  git: GitMetadata;
  startedAt?: Date;
}

interface CrawlerAccumulator {
  recordCount: number;
  updatedCount: number;
  noChangeCount: number;
  firstSeenCount: number;
  lastError: string;
}

interface SessionCounters {
  error: number;
  static: number;
  noChange: number;
  timingsUpdated: number;
}

export interface RunSessionSummary {
  id: number;
  startedAt: string;
  finishedAt: string | null;
  status: string;
  crawlerCount: number;
  errorCount: number;
  staticCount: number;
  noChangeCount: number;
  timingsUpdatedCount: number;
  gitCommitHash: string;
  gitDirty: boolean;
}

export interface CrawlerStateSummary {
  crawlerName: string;
  sourcePath: string;
  isStatic: boolean;
  isPuppeteer: boolean;
  lastRunAt: string;
  lastStatus: CrawlerRunStatus;
  lastError: string;
  consecutiveErrors: number;
  lastDurationMs: number;
  lastRecordCount: number;
  lastUpdatedCount: number;
  lastNoChangeCount: number;
  lastFirstSeenCount: number;
  lastSkippedReason: string | null;
  lastGitCommitHash: string;
  lastGitDirty: boolean;
}

export interface RunReport {
  databasePath: string;
  generatedAt: string;
  latestSession: RunSessionSummary | null;
  recentSessions: RunSessionSummary[];
  crawlers: CrawlerStateSummary[];
}

const defaultSessionCounters = (): SessionCounters => ({
  error: 0,
  static: 0,
  noChange: 0,
  timingsUpdated: 0,
});

const mergeErrorMessages = (existing: string, incoming: string): string => {
  const next = incoming.trim();
  if (next.length === 0) {
    return existing;
  }

  const current = existing.trim();
  if (current.length === 0) {
    return next;
  }
  if (current.includes(next)) {
    return current;
  }

  return `${current} | ${next}`;
};

const normalizeTimeValue = (value: unknown): string => {
  if (typeof value !== "string") {
    return "";
  }
  return value.replace(/\s+/g, " ").trim();
};

const timingSnapshot = (record: MasjidRecord): Record<TimingField, string> => ({
  fajrIqama: normalizeTimeValue(record.fajrIqama),
  zuhrIqama: normalizeTimeValue(record.zuhrIqama),
  asrIqama: normalizeTimeValue(record.asrIqama),
  maghribIqama: normalizeTimeValue(record.maghribIqama),
  ishaIqama: normalizeTimeValue(record.ishaIqama),
  juma1: normalizeTimeValue(record.juma1),
  juma2: normalizeTimeValue(record.juma2),
  juma3: normalizeTimeValue(record.juma3),
});

const timingSnapshotJson = (record: MasjidRecord): string =>
  JSON.stringify(timingSnapshot(record));

const toIsoString = (value: Date): string => value.toISOString();

const toSQLiteBool = (value: boolean): number => (value ? 1 : 0);

const statusFromCounters = (
  event: CrawlerRunCompleteEvent,
  accumulator: CrawlerAccumulator,
): { errorMessage: string; status: CrawlerRunStatus } => {
  let errorMessage = accumulator.lastError.trim();

  if (event.error.trim().length > 0) {
    errorMessage = event.error.trim();
  }

  if (errorMessage.length > 0) {
    return { errorMessage, status: "error" };
  }

  if (event.isStatic) {
    return { errorMessage: "", status: "static" };
  }

  if (accumulator.updatedCount > 0) {
    return { errorMessage: "", status: "timings_updated" };
  }

  return { errorMessage: "", status: "no_change" };
};

export class CrawlStateStore {
  private readonly dbPath: string;
  private readonly db: Database;
  private runSessionId: number | null = null;
  private git: GitMetadata = { commitHash: "unknown", dirty: false };
  private readonly descriptors = new Map<string, CrawlerDescriptor>();
  private readonly accumulators = new Map<string, CrawlerAccumulator>();
  private sessionCounters = defaultSessionCounters();

  constructor(dbPath = path.join(process.cwd(), ".run", "praytime.sqlite")) {
    this.dbPath = dbPath;
    mkdirSync(path.dirname(dbPath), { recursive: true });

    this.db = new Database(dbPath, { create: true });
    this.db.exec("PRAGMA journal_mode = WAL;");
    this.db.exec("PRAGMA busy_timeout = 5000;");
    this.migrate();
  }

  private migrate(): void {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        version INTEGER PRIMARY KEY,
        applied_at TEXT NOT NULL
      );
    `);

    const versionRow = this.db
      .query(
        "SELECT COALESCE(MAX(version), 0) AS version FROM schema_migrations",
      )
      .get() as { version: number } | null;
    const version = Number(versionRow?.version ?? 0);

    if (version >= 1) {
      return;
    }

    this.db.exec(`
      CREATE TABLE IF NOT EXISTS run_sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        started_at TEXT NOT NULL,
        finished_at TEXT,
        status TEXT NOT NULL DEFAULT 'running',
        argv_json TEXT NOT NULL,
        patterns_json TEXT NOT NULL,
        options_json TEXT NOT NULL,
        crawler_names_json TEXT NOT NULL,
        crawler_count INTEGER NOT NULL,
        error_count INTEGER NOT NULL DEFAULT 0,
        static_count INTEGER NOT NULL DEFAULT 0,
        no_change_count INTEGER NOT NULL DEFAULT 0,
        timings_updated_count INTEGER NOT NULL DEFAULT 0,
        fatal_error TEXT NOT NULL DEFAULT '',
        git_commit_hash TEXT NOT NULL,
        git_dirty INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS crawler_runs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        run_session_id INTEGER NOT NULL,
        crawler_name TEXT NOT NULL,
        source_path TEXT NOT NULL,
        started_at TEXT NOT NULL,
        finished_at TEXT NOT NULL,
        duration_ms INTEGER NOT NULL,
        is_static INTEGER NOT NULL,
        is_puppeteer INTEGER NOT NULL,
        run_invoked INTEGER NOT NULL,
        skipped_reason TEXT,
        status TEXT NOT NULL CHECK(status IN ('error', 'static', 'no_change', 'timings_updated')),
        error TEXT NOT NULL DEFAULT '',
        record_count INTEGER NOT NULL DEFAULT 0,
        updated_count INTEGER NOT NULL DEFAULT 0,
        no_change_count INTEGER NOT NULL DEFAULT 0,
        first_seen_count INTEGER NOT NULL DEFAULT 0,
        crawler_timeout_ms INTEGER NOT NULL,
        git_commit_hash TEXT NOT NULL,
        git_dirty INTEGER NOT NULL DEFAULT 0,
        details_json TEXT NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (run_session_id) REFERENCES run_sessions(id) ON DELETE CASCADE,
        UNIQUE(run_session_id, crawler_name)
      );

      CREATE TABLE IF NOT EXISTS masjid_state (
        uuid4 TEXT PRIMARY KEY,
        crawler_name TEXT NOT NULL,
        last_seen_at TEXT NOT NULL,
        last_run_session_id INTEGER NOT NULL,
        times_json TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS crawler_state (
        crawler_name TEXT PRIMARY KEY,
        source_path TEXT NOT NULL,
        is_static INTEGER NOT NULL,
        is_puppeteer INTEGER NOT NULL,
        last_run_at TEXT NOT NULL,
        last_status TEXT NOT NULL CHECK(last_status IN ('error', 'static', 'no_change', 'timings_updated')),
        last_error TEXT NOT NULL DEFAULT '',
        consecutive_errors INTEGER NOT NULL DEFAULT 0,
        last_run_session_id INTEGER NOT NULL,
        last_duration_ms INTEGER NOT NULL DEFAULT 0,
        last_record_count INTEGER NOT NULL DEFAULT 0,
        last_updated_count INTEGER NOT NULL DEFAULT 0,
        last_no_change_count INTEGER NOT NULL DEFAULT 0,
        last_first_seen_count INTEGER NOT NULL DEFAULT 0,
        last_skipped_reason TEXT,
        last_git_commit_hash TEXT NOT NULL,
        last_git_dirty INTEGER NOT NULL DEFAULT 0,
        updated_at TEXT NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_crawler_runs_session_id ON crawler_runs(run_session_id);
      CREATE INDEX IF NOT EXISTS idx_crawler_runs_name_finished ON crawler_runs(crawler_name, finished_at DESC);
      CREATE INDEX IF NOT EXISTS idx_run_sessions_started_at ON run_sessions(started_at DESC);
    `);

    this.db
      .query(
        "INSERT INTO schema_migrations(version, applied_at) VALUES (?1, ?2)",
      )
      .run(1, new Date().toISOString());
  }

  private requireRunSessionId(): number {
    if (this.runSessionId === null) {
      throw new Error("run session has not been started");
    }
    return this.runSessionId;
  }

  private ensureAccumulator(name: string): CrawlerAccumulator {
    const existing = this.accumulators.get(name);
    if (existing) {
      return existing;
    }

    const created: CrawlerAccumulator = {
      recordCount: 0,
      updatedCount: 0,
      noChangeCount: 0,
      firstSeenCount: 0,
      lastError: "",
    };

    this.accumulators.set(name, created);
    return created;
  }

  registerCrawlerDescriptors(descriptors: CrawlerDescriptor[]): void {
    for (const descriptor of descriptors) {
      this.descriptors.set(descriptor.name, descriptor);
      this.ensureAccumulator(descriptor.name);
    }
  }

  startRunSession(input: RunSessionStartInput): number {
    if (this.runSessionId !== null) {
      throw new Error("run session already started");
    }

    this.git = input.git;
    this.sessionCounters = defaultSessionCounters();
    this.accumulators.clear();

    const startedAt = toIsoString(input.startedAt ?? new Date());
    const now = new Date().toISOString();
    const optionsJson = JSON.stringify(input.options);

    this.db
      .query(`
        INSERT INTO run_sessions(
          started_at,
          status,
          argv_json,
          patterns_json,
          options_json,
          crawler_names_json,
          crawler_count,
          git_commit_hash,
          git_dirty,
          created_at,
          updated_at
        )
        VALUES(?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11)
      `)
      .run(
        startedAt,
        "running" satisfies RunSessionStatus,
        JSON.stringify(input.argv),
        JSON.stringify(input.patterns),
        optionsJson,
        JSON.stringify(input.crawlerNames),
        input.crawlerNames.length,
        input.git.commitHash,
        toSQLiteBool(input.git.dirty),
        now,
        now,
      );

    const row = this.db
      .query("SELECT CAST(last_insert_rowid() AS INTEGER) AS id")
      .get() as { id: number } | null;

    const sessionId = Number(row?.id ?? 0);
    if (!Number.isInteger(sessionId) || sessionId <= 0) {
      throw new Error("failed to create run session");
    }

    this.runSessionId = sessionId;
    return sessionId;
  }

  recordCrawlerOutput(line: CrawlOutputLine): void {
    const runSessionId = this.requireRunSessionId();
    const accumulator = this.ensureAccumulator(line.source);

    accumulator.recordCount += 1;

    if (line.error.trim().length > 0) {
      accumulator.lastError = line.error.trim();
      return;
    }

    const uuid4 =
      typeof line.result.uuid4 === "string" ? line.result.uuid4 : "";
    if (uuid4.length === 0) {
      accumulator.lastError = "missing uuid4 in crawler output";
      return;
    }

    const seenAt =
      line.result.crawlTime instanceof Date
        ? toIsoString(line.result.crawlTime)
        : new Date().toISOString();
    const timesJson = timingSnapshotJson(line.result);

    const existing = this.db
      .query("SELECT times_json FROM masjid_state WHERE uuid4 = ?1")
      .get(uuid4) as { times_json: string } | null;

    if (!existing) {
      this.db
        .query(`
          INSERT INTO masjid_state(
            uuid4,
            crawler_name,
            last_seen_at,
            last_run_session_id,
            times_json,
            updated_at
          )
          VALUES(?1, ?2, ?3, ?4, ?5, ?6)
        `)
        .run(uuid4, line.source, seenAt, runSessionId, timesJson, seenAt);

      accumulator.updatedCount += 1;
      accumulator.firstSeenCount += 1;
      return;
    }

    const changed = existing.times_json !== timesJson;

    this.db
      .query(`
        UPDATE masjid_state
        SET
          crawler_name = ?1,
          last_seen_at = ?2,
          last_run_session_id = ?3,
          times_json = ?4,
          updated_at = ?5
        WHERE uuid4 = ?6
      `)
      .run(line.source, seenAt, runSessionId, timesJson, seenAt, uuid4);

    if (changed) {
      accumulator.updatedCount += 1;
      return;
    }

    accumulator.noChangeCount += 1;
  }

  recordCrawlerSaveError(crawlerName: string, error: string): void {
    const accumulator = this.ensureAccumulator(crawlerName);
    accumulator.lastError = mergeErrorMessages(accumulator.lastError, error);
  }

  recordCrawlerCompletion(event: CrawlerRunCompleteEvent): CrawlerRunStatus {
    const runSessionId = this.requireRunSessionId();
    const accumulator = this.ensureAccumulator(event.name);
    const descriptor = this.descriptors.get(event.name);

    const { errorMessage, status } = statusFromCounters(event, accumulator);

    const recordCount = Math.max(accumulator.recordCount, event.emittedCount);
    const detailsJson = JSON.stringify({
      crawlerTimeoutMs: event.crawlerTimeoutMs,
      emittedCount: event.emittedCount,
      runInvoked: event.runInvoked,
      skippedReason: event.skippedReason ?? null,
    });
    const sourcePath = descriptor?.sourcePath ?? "";
    const finishedAtIso = toIsoString(event.finishedAt);
    const previousErrorRow = this.db
      .query(
        "SELECT consecutive_errors FROM crawler_state WHERE crawler_name = ?1",
      )
      .get(event.name) as { consecutive_errors: number } | null;
    const nextConsecutiveErrors =
      status === "error"
        ? Number(previousErrorRow?.consecutive_errors ?? 0) + 1
        : 0;

    this.db
      .query(`
        INSERT INTO crawler_runs(
          run_session_id,
          crawler_name,
          source_path,
          started_at,
          finished_at,
          duration_ms,
          is_static,
          is_puppeteer,
          run_invoked,
          skipped_reason,
          status,
          error,
          record_count,
          updated_count,
          no_change_count,
          first_seen_count,
          crawler_timeout_ms,
          git_commit_hash,
          git_dirty,
          details_json,
          created_at
        )
        VALUES(
          ?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15,
          ?16, ?17, ?18, ?19, ?20, ?21
        )
      `)
      .run(
        runSessionId,
        event.name,
        sourcePath,
        toIsoString(event.startedAt),
        finishedAtIso,
        event.durationMs,
        toSQLiteBool(event.isStatic),
        toSQLiteBool(event.isPuppeteer),
        toSQLiteBool(event.runInvoked),
        event.skippedReason ?? null,
        status,
        errorMessage,
        recordCount,
        accumulator.updatedCount,
        accumulator.noChangeCount,
        accumulator.firstSeenCount,
        event.crawlerTimeoutMs,
        this.git.commitHash,
        toSQLiteBool(this.git.dirty),
        detailsJson,
        finishedAtIso,
      );

    this.db
      .query(`
        INSERT INTO crawler_state(
          crawler_name,
          source_path,
          is_static,
          is_puppeteer,
          last_run_at,
          last_status,
          last_error,
          consecutive_errors,
          last_run_session_id,
          last_duration_ms,
          last_record_count,
          last_updated_count,
          last_no_change_count,
          last_first_seen_count,
          last_skipped_reason,
          last_git_commit_hash,
          last_git_dirty,
          updated_at
        )
        VALUES(
          ?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15,
          ?16, ?17, ?18
        )
        ON CONFLICT(crawler_name) DO UPDATE SET
          source_path = excluded.source_path,
          is_static = excluded.is_static,
          is_puppeteer = excluded.is_puppeteer,
          last_run_at = excluded.last_run_at,
          last_status = excluded.last_status,
          last_error = excluded.last_error,
          consecutive_errors = excluded.consecutive_errors,
          last_run_session_id = excluded.last_run_session_id,
          last_duration_ms = excluded.last_duration_ms,
          last_record_count = excluded.last_record_count,
          last_updated_count = excluded.last_updated_count,
          last_no_change_count = excluded.last_no_change_count,
          last_first_seen_count = excluded.last_first_seen_count,
          last_skipped_reason = excluded.last_skipped_reason,
          last_git_commit_hash = excluded.last_git_commit_hash,
          last_git_dirty = excluded.last_git_dirty,
          updated_at = excluded.updated_at
      `)
      .run(
        event.name,
        sourcePath,
        toSQLiteBool(event.isStatic),
        toSQLiteBool(event.isPuppeteer),
        finishedAtIso,
        status,
        errorMessage,
        nextConsecutiveErrors,
        runSessionId,
        event.durationMs,
        recordCount,
        accumulator.updatedCount,
        accumulator.noChangeCount,
        accumulator.firstSeenCount,
        event.skippedReason ?? null,
        this.git.commitHash,
        toSQLiteBool(this.git.dirty),
        finishedAtIso,
      );

    switch (status) {
      case "error":
        this.sessionCounters.error += 1;
        break;
      case "static":
        this.sessionCounters.static += 1;
        break;
      case "no_change":
        this.sessionCounters.noChange += 1;
        break;
      case "timings_updated":
        this.sessionCounters.timingsUpdated += 1;
        break;
    }

    this.accumulators.delete(event.name);
    return status;
  }

  hasCrawlerErrors(): boolean {
    return this.sessionCounters.error > 0;
  }

  finishRunSession(options?: { finishedAt?: Date; fatalError?: string }): void {
    if (this.runSessionId === null) {
      return;
    }

    const finishedAt = toIsoString(options?.finishedAt ?? new Date());
    const fatalError = options?.fatalError?.trim() ?? "";

    const status: RunSessionStatus =
      fatalError.length > 0
        ? "failed"
        : this.sessionCounters.error > 0
          ? "completed_with_errors"
          : "completed";

    this.db
      .query(`
        UPDATE run_sessions
        SET
          finished_at = ?1,
          status = ?2,
          error_count = ?3,
          static_count = ?4,
          no_change_count = ?5,
          timings_updated_count = ?6,
          fatal_error = ?7,
          updated_at = ?8
        WHERE id = ?9
      `)
      .run(
        finishedAt,
        status,
        this.sessionCounters.error,
        this.sessionCounters.static,
        this.sessionCounters.noChange,
        this.sessionCounters.timingsUpdated,
        fatalError,
        finishedAt,
        this.runSessionId,
      );

    this.runSessionId = null;
    this.sessionCounters = defaultSessionCounters();
    this.accumulators.clear();
  }

  getRunReport(options?: {
    crawlerLimit?: number;
    sessionLimit?: number;
  }): RunReport {
    const crawlerLimit = Math.max(1, options?.crawlerLimit ?? 300);
    const sessionLimit = Math.max(1, options?.sessionLimit ?? 25);

    const latestSessionRow = this.db
      .query(`
        SELECT
          id,
          started_at,
          finished_at,
          status,
          crawler_count,
          error_count,
          static_count,
          no_change_count,
          timings_updated_count,
          git_commit_hash,
          git_dirty
        FROM run_sessions
        ORDER BY id DESC
        LIMIT 1
      `)
      .get() as {
      id: number;
      started_at: string;
      finished_at: string | null;
      status: string;
      crawler_count: number;
      error_count: number;
      static_count: number;
      no_change_count: number;
      timings_updated_count: number;
      git_commit_hash: string;
      git_dirty: number;
    } | null;

    const recentSessionRows = this.db
      .query(`
        SELECT
          id,
          started_at,
          finished_at,
          status,
          crawler_count,
          error_count,
          static_count,
          no_change_count,
          timings_updated_count,
          git_commit_hash,
          git_dirty
        FROM run_sessions
        ORDER BY id DESC
        LIMIT ?1
      `)
      .all(sessionLimit) as Array<{
      id: number;
      started_at: string;
      finished_at: string | null;
      status: string;
      crawler_count: number;
      error_count: number;
      static_count: number;
      no_change_count: number;
      timings_updated_count: number;
      git_commit_hash: string;
      git_dirty: number;
    }>;

    const crawlerRows = this.db
      .query(`
        SELECT
          crawler_name,
          source_path,
          is_static,
          is_puppeteer,
          last_run_at,
          last_status,
          last_error,
          consecutive_errors,
          last_duration_ms,
          last_record_count,
          last_updated_count,
          last_no_change_count,
          last_first_seen_count,
          last_skipped_reason,
          last_git_commit_hash,
          last_git_dirty
        FROM crawler_state
        ORDER BY last_run_at DESC, crawler_name ASC
        LIMIT ?1
      `)
      .all(crawlerLimit) as Array<{
      crawler_name: string;
      source_path: string;
      is_static: number;
      is_puppeteer: number;
      last_run_at: string;
      last_status: CrawlerRunStatus;
      last_error: string;
      consecutive_errors: number;
      last_duration_ms: number;
      last_record_count: number;
      last_updated_count: number;
      last_no_change_count: number;
      last_first_seen_count: number;
      last_skipped_reason: string | null;
      last_git_commit_hash: string;
      last_git_dirty: number;
    }>;

    const toSessionSummary = (row: {
      id: number;
      started_at: string;
      finished_at: string | null;
      status: string;
      crawler_count: number;
      error_count: number;
      static_count: number;
      no_change_count: number;
      timings_updated_count: number;
      git_commit_hash: string;
      git_dirty: number;
    }): RunSessionSummary => ({
      id: row.id,
      startedAt: row.started_at,
      finishedAt: row.finished_at,
      status: row.status,
      crawlerCount: row.crawler_count,
      errorCount: row.error_count,
      staticCount: row.static_count,
      noChangeCount: row.no_change_count,
      timingsUpdatedCount: row.timings_updated_count,
      gitCommitHash: row.git_commit_hash,
      gitDirty: row.git_dirty === 1,
    });

    const crawlerSummaries: CrawlerStateSummary[] = crawlerRows.map((row) => ({
      crawlerName: row.crawler_name,
      sourcePath: row.source_path,
      isStatic: row.is_static === 1,
      isPuppeteer: row.is_puppeteer === 1,
      lastRunAt: row.last_run_at,
      lastStatus: row.last_status,
      lastError: row.last_error,
      consecutiveErrors: row.consecutive_errors,
      lastDurationMs: row.last_duration_ms,
      lastRecordCount: row.last_record_count,
      lastUpdatedCount: row.last_updated_count,
      lastNoChangeCount: row.last_no_change_count,
      lastFirstSeenCount: row.last_first_seen_count,
      lastSkippedReason: row.last_skipped_reason,
      lastGitCommitHash: row.last_git_commit_hash,
      lastGitDirty: row.last_git_dirty === 1,
    }));

    return {
      databasePath: this.dbPath,
      generatedAt: new Date().toISOString(),
      latestSession: latestSessionRow
        ? toSessionSummary(latestSessionRow)
        : null,
      recentSessions: recentSessionRows.map(toSessionSummary),
      crawlers: crawlerSummaries,
    };
  }

  close(): void {
    this.db.close();
  }
}

const runGit = (cwd: string, args: string[]): string | null => {
  const proc = Bun.spawnSync({
    cmd: ["git", ...args],
    cwd,
    stdout: "pipe",
    stderr: "pipe",
  });

  if (proc.exitCode !== 0) {
    return null;
  }

  return new TextDecoder().decode(proc.stdout).trim();
};

export const getGitMetadata = (cwd = process.cwd()): GitMetadata => {
  const commitHash = runGit(cwd, ["rev-parse", "HEAD"]) ?? "unknown";
  const statusOutput =
    runGit(cwd, ["status", "--porcelain", "--untracked-files=no"]) ?? "";

  return {
    commitHash,
    dirty: statusOutput.length > 0,
  };
};
