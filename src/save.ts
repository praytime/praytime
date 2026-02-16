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
import type { CrawlOutputLine, MasjidRecord } from "./types";

const timeRxG = /(\d{1,2})\s*:\s*(\d{1,2})/g;

export type PrayerContext = "fajr" | "zuhr" | "asr" | "maghrib" | "isha";

type TimeField =
  | "fajrIqama"
  | "zuhrIqama"
  | "asrIqama"
  | "maghribIqama"
  | "ishaIqama"
  | "juma1"
  | "juma2"
  | "juma3";

type ModifiedField =
  | "fajrIqamaModified"
  | "zuhrIqamaModified"
  | "asrIqamaModified"
  | "maghribIqamaModified"
  | "ishaIqamaModified"
  | "juma1Modified"
  | "juma2Modified"
  | "juma3Modified";

interface TimeFieldConfig {
  timeField: TimeField;
  modifiedField: ModifiedField;
  prayer: PrayerContext;
  diffLabel: string;
  deletedLabel: string;
}

const timeFieldConfigs: readonly TimeFieldConfig[] = [
  {
    timeField: "fajrIqama",
    modifiedField: "fajrIqamaModified",
    prayer: "fajr",
    diffLabel: "Fajr",
    deletedLabel: "Fajr",
  },
  {
    timeField: "zuhrIqama",
    modifiedField: "zuhrIqamaModified",
    prayer: "zuhr",
    diffLabel: "Zuhr",
    deletedLabel: "Zuhr",
  },
  {
    timeField: "asrIqama",
    modifiedField: "asrIqamaModified",
    prayer: "asr",
    diffLabel: "Asr",
    deletedLabel: "Asr",
  },
  {
    timeField: "maghribIqama",
    modifiedField: "maghribIqamaModified",
    prayer: "maghrib",
    diffLabel: "Maghrib",
    deletedLabel: "Maghrib",
  },
  {
    timeField: "ishaIqama",
    modifiedField: "ishaIqamaModified",
    prayer: "isha",
    diffLabel: "Isha",
    deletedLabel: "Isha",
  },
  {
    timeField: "juma1",
    modifiedField: "juma1Modified",
    prayer: "zuhr",
    diffLabel: "Juma",
    deletedLabel: "Juma1",
  },
  {
    timeField: "juma2",
    modifiedField: "juma2Modified",
    prayer: "zuhr",
    diffLabel: "Juma",
    deletedLabel: "Juma2",
  },
  {
    timeField: "juma3",
    modifiedField: "juma3Modified",
    prayer: "zuhr",
    diffLabel: "Juma",
    deletedLabel: "Juma3",
  },
];

const htmlEscapeMap: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&#34;",
  "'": "&#39;",
};

const stringifyError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (match) => htmlEscapeMap[match] ?? match);

const toStringValue = (value: unknown): string =>
  typeof value === "string" ? value : "";

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

export const normalizeTime = (
  value: string | undefined,
  prayer: PrayerContext,
): string[] => {
  const text = value ?? "";
  const result: string[] = [];

  for (const match of text.matchAll(timeRxG)) {
    const hourText = match[1];
    const minuteText = match[2];
    if (!hourText || !minuteText) {
      continue;
    }

    let hour = Number.parseInt(hourText, 10);
    const minute = Number.parseInt(minuteText, 10);

    if (!Number.isFinite(hour) || !Number.isFinite(minute)) {
      continue;
    }

    if (hour > 12) {
      hour -= 12;
    }

    let meridiem: "a" | "p" = "p";
    switch (prayer) {
      case "fajr":
        meridiem = "a";
        break;
      case "zuhr":
        meridiem = hour === 10 || hour === 11 ? "a" : "p";
        break;
      case "asr":
      case "maghrib":
        meridiem = "p";
        break;
      case "isha":
        meridiem = hour === 12 || hour === 1 ? "a" : "p";
        break;
    }

    result.push(`${hour}:${String(minute).padStart(2, "0")}${meridiem}`);
  }

  return result;
};

export const normalizePrayerTimes = (
  record: PrayerEventRecord,
): PrayerEventRecord => {
  for (const field of timeFieldConfigs) {
    const existingValue = record[field.timeField];
    const normalized = normalizeTime(
      toStringValue(existingValue),
      field.prayer,
    );

    if (normalized.length === 1) {
      record[field.timeField] = normalized[0];
      continue;
    }

    if (typeof existingValue === "string") {
      record[field.timeField] = escapeHtml(existingValue);
    }
  }

  return record;
};

export const hourMinutesToMinutes = (value: string): number => {
  const match = /^(\d+):(\d+)([ap])$/.exec(value);
  if (!match) {
    throw new Error("invalid time");
  }

  const hourText = match[1];
  const minuteText = match[2];
  const meridiem = match[3];
  if (!hourText || !minuteText || !meridiem) {
    throw new Error("invalid time");
  }

  let hour = Number.parseInt(hourText, 10);
  const minute = Number.parseInt(minuteText, 10);
  if (
    !Number.isInteger(hour) ||
    !Number.isInteger(minute) ||
    hour < 0 ||
    hour > 12 ||
    minute < 0 ||
    minute > 59 ||
    (meridiem !== "a" && meridiem !== "p")
  ) {
    throw new Error("invalid time");
  }

  if (hour === 12) {
    hour = 0;
  }
  if (meridiem === "p") {
    hour += 12;
  }

  return hour * 60 + minute;
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

  async saveLine(line: CrawlOutputLine): Promise<void> {
    const prefix = this.prefix(line);

    if (line.error.length > 0) {
      this.log(prefix, `ERROR crawl error: ${line.error}`);
      return;
    }

    const record = line.result as PrayerEventRecord;
    normalizePrayerTimes(record);

    const docRef = this.db.collection("Events").doc(record.uuid4);

    let updated = false;
    let snapshot: Awaited<ReturnType<typeof docRef.get>>;

    try {
      snapshot = await docRef.get();
    } catch (error: unknown) {
      this.log(prefix, `ERROR getting prev value: ${stringifyError(error)}`);
      return;
    }

    if (snapshot.exists) {
      const previous = this.previousFromSnapshot(snapshot.data() ?? {});
      let diff: string[] = [];

      try {
        ({ diff } = compareToPrevious(record, previous, this.force));
      } catch (error: unknown) {
        this.log(prefix, `ERROR diff: ${stringifyError(error)}`);
        return;
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
    } catch (error: unknown) {
      this.log(prefix, `ERROR setting new value: ${stringifyError(error)}`);
    }
  }

  async close(): Promise<void> {
    await this.db.terminate();
  }
}
