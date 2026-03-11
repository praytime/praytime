import { applicationDefault, getApps, initializeApp } from "firebase-admin/app";
import {
  type DocumentData,
  type Firestore,
  getFirestore,
  Timestamp,
} from "firebase-admin/firestore";
import {
  getMessaging,
  type Message,
  type Messaging,
} from "firebase-admin/messaging";
import {
  hourMinutesToMinutes,
  normalizePrayerFieldValue,
  timeFieldConfigs,
  toStringValue,
} from "./timing";
import type { CrawlOutputLine, MasjidRecord } from "./types";

export {
  hourMinutesToMinutes,
  normalizeTime,
  type PrayerContext,
} from "./timing";

const stringifyError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

const toDate = (value: unknown): Date | undefined => {
  if (value instanceof Date) {
    return value;
  }
  if (value instanceof Timestamp) {
    return value.toDate();
  }
  if (
    typeof value === "object" &&
    value !== null &&
    "toDate" in value &&
    typeof (value as { toDate?: unknown }).toDate === "function"
  ) {
    const candidate = (value as { toDate: () => unknown }).toDate();
    return candidate instanceof Date ? candidate : undefined;
  }
  if (typeof value === "string" || typeof value === "number") {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed;
    }
  }
  return undefined;
};

const omitUndefinedDeep = (value: unknown): unknown => {
  if (value === undefined || value === null) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((entry) => omitUndefinedDeep(entry));
  }

  if (
    typeof value === "object" &&
    !(value instanceof Date) &&
    !(value instanceof Timestamp)
  ) {
    const result: Record<string, unknown> = {};
    for (const [key, entry] of Object.entries(value)) {
      if (entry === undefined) {
        continue;
      }
      result[key] = omitUndefinedDeep(entry);
    }
    return result;
  }

  return value;
};

const ignoreModification = (
  current: string,
  previous: string,
  minutes: number,
): boolean => {
  let currentMinutes: number;
  let previousMinutes: number;

  try {
    currentMinutes = hourMinutesToMinutes(current);
    previousMinutes = hourMinutesToMinutes(previous);
  } catch {
    return false;
  }

  return Math.abs(currentMinutes - previousMinutes) < minutes;
};

export type PrayerEventRecord = MasjidRecord & {
  fajrIqamaModified?: Date;
  zuhrIqamaModified?: Date;
  asrIqamaModified?: Date;
  maghribIqamaModified?: Date;
  ishaIqamaModified?: Date;
  juma1Modified?: Date;
  juma2Modified?: Date;
  juma3Modified?: Date;
};

export const normalizePrayerTimes = (
  record: PrayerEventRecord,
): PrayerEventRecord => {
  for (const field of timeFieldConfigs) {
    record[field.timeField] = normalizePrayerFieldValue(
      record[field.timeField],
      field.prayer,
    );
  }

  return record;
};

export const compareToPrevious = (
  record: PrayerEventRecord,
  previous: PrayerEventRecord,
  force: boolean,
): { diff: string[]; record: PrayerEventRecord } => {
  const diff: string[] = [];

  for (const field of timeFieldConfigs) {
    const currentValue = toStringValue(record[field.timeField]);
    const previousValue = toStringValue(previous[field.timeField]);

    if (
      currentValue !== previousValue &&
      !force &&
      !ignoreModification(currentValue, previousValue, 4)
    ) {
      if (currentValue.length === 0) {
        throw new Error(`${field.deletedLabel} is deleted`);
      }
      record[field.modifiedField] = new Date();
      diff.push(`${field.diffLabel}: ${currentValue}`);
      continue;
    }

    record[field.modifiedField] = toDate(previous[field.modifiedField]);
  }

  return { record, diff };
};

export interface SaveOptions {
  force?: boolean;
  verbose?: boolean;
  projectId?: string;
  firestore?: Firestore;
  messaging?: Messaging;
}

export type SaveLineResult =
  | {
      outcome: "saved";
      updated: boolean;
    }
  | {
      outcome: "skipped";
      reason: "crawl_error" | "validation_error";
    }
  | {
      outcome: "error";
      error: string;
    };

const getValidationErrorText = (line: CrawlOutputLine): string => {
  const validationErrors = line.validationErrors ?? [];
  return validationErrors.join("; ").trim();
};

export class PraytimeSaver {
  private readonly db: Firestore;
  private readonly messaging: Messaging;
  private readonly force: boolean;
  private readonly verbose: boolean;

  constructor(options: SaveOptions = {}) {
    this.force = options.force === true;
    this.verbose = options.verbose === true;

    const projectId = options.projectId ?? process.env.GCLOUD_PROJECT;
    console.error("projectID: %s", projectId ?? "");

    let firestore = options.firestore;
    let messaging = options.messaging;

    if (!firestore || !messaging) {
      const app =
        getApps()[0] ??
        initializeApp({
          credential: applicationDefault(),
          ...(projectId ? { projectId } : {}),
        });

      firestore ??= getFirestore(app);
      messaging ??= getMessaging(app);
    }

    if (!firestore || !messaging) {
      throw new Error("failed to initialize firebase clients");
    }

    this.db = firestore;
    this.messaging = messaging;
  }

  private prefix(line: CrawlOutputLine): string {
    const uuidPrefix =
      typeof line.result.uuid4 === "string"
        ? line.result.uuid4.slice(0, 8)
        : "unknown";
    return `${line.source}[${uuidPrefix}]`;
  }

  private log(prefix: string, message: string): void {
    console.error("%s %s", prefix, message);
  }

  private previousFromSnapshot(data: DocumentData): PrayerEventRecord {
    const record = { ...(data as PrayerEventRecord) };
    for (const field of timeFieldConfigs) {
      record[field.modifiedField] = toDate(record[field.modifiedField]);
    }
    return record;
  }

  private async sendNotification(
    prefix: string,
    message: Message,
    suffix: string,
  ): Promise<void> {
    try {
      const response = await this.messaging.send(message);
      if (this.verbose) {
        this.log(prefix, `sent message${suffix}, response: ${response}`);
      }
    } catch (error: unknown) {
      this.log(
        prefix,
        `ERROR sending message${suffix}: ${stringifyError(error)}`,
      );
    }
  }

  async saveLine(line: CrawlOutputLine): Promise<SaveLineResult> {
    const prefix = this.prefix(line);
    const crawlError = line.crawlError?.trim() ?? "";
    const validationErrorText = getValidationErrorText(line);

    if (crawlError.length > 0) {
      this.log(prefix, `ERROR crawl error: ${line.error}`);
      return {
        outcome: "skipped",
        reason: "crawl_error",
      };
    }

    if (validationErrorText.length > 0 && !this.force) {
      this.log(prefix, `ERROR validation error: ${validationErrorText}`);
      return {
        outcome: "skipped",
        reason: "validation_error",
      };
    }

    if (line.error.length > 0 && validationErrorText.length === 0) {
      this.log(prefix, `ERROR crawl error: ${line.error}`);
      return {
        outcome: "skipped",
        reason: "crawl_error",
      };
    }

    if (validationErrorText.length > 0 && this.force) {
      this.log(
        prefix,
        `forcing save despite validation error: ${validationErrorText}`,
      );
    }

    const record = line.result as PrayerEventRecord;
    normalizePrayerTimes(record);

    const docRef = this.db.collection("Events").doc(record.uuid4);

    let updated = false;
    let snapshot: Awaited<ReturnType<typeof docRef.get>>;

    try {
      snapshot = await docRef.get();
    } catch (error: unknown) {
      const message = `save get prev value: ${stringifyError(error)}`;
      this.log(prefix, `ERROR ${message}`);
      return {
        outcome: "error",
        error: message,
      };
    }

    if (snapshot.exists) {
      const previous = this.previousFromSnapshot(snapshot.data() ?? {});
      let diff: string[] = [];

      try {
        ({ diff } = compareToPrevious(record, previous, this.force));
      } catch (error: unknown) {
        const message = `save diff: ${stringifyError(error)}`;
        this.log(prefix, `ERROR ${message}`);
        return {
          outcome: "error",
          error: message,
        };
      }

      if (diff.length > 0) {
        updated = true;
        const body = diff.join(", ");

        await this.sendNotification(
          prefix,
          {
            notification: {
              title: record.name,
              body,
            },
            topic: `/topics/${record.uuid4}`,
          },
          "",
        );

        await this.sendNotification(
          prefix,
          {
            notification: {
              title: record.name,
              body,
            },
            topic: "/topics/all",
          },
          " (all)",
        );
      }
    }

    if (this.verbose) {
      this.log(prefix, `Uploading: ${JSON.stringify(record)}`);
    }

    try {
      const payload = omitUndefinedDeep(record) as PrayerEventRecord;
      await docRef.set(payload);
      this.log(prefix, `set (updated: ${updated})`);
      return {
        outcome: "saved",
        updated,
      };
    } catch (error: unknown) {
      const message = `save set new value: ${stringifyError(error)}`;
      this.log(prefix, `ERROR ${message}`);
      return {
        outcome: "error",
        error: message,
      };
    }
  }

  async close(): Promise<void> {
    await this.db.terminate();
  }
}
