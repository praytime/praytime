import { parse } from "csv-parse/sync";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const STORAGE_BUCKET = "bilalmasjid-146db.appspot.com";
const STORAGE_PREFIX = "prayer_times/";
const STORAGE_LIST_URL = `https://firebasestorage.googleapis.com/v0/b/${STORAGE_BUCKET}/o?prefix=${encodeURIComponent(STORAGE_PREFIX)}`;

type FirebaseStorageList = {
  items?: Array<{
    name?: unknown;
  }>;
};

type BilalCsvRow = {
  "Asr Iqama": string;
  Date: string;
  Day: string;
  "Duhr Iqama": string;
  "Fajr Iqama": string;
  "Isha Iqama": string;
  Jummah1: string;
  Jummah2: string;
  "Maghrib Iqama": string;
};

const normalizeClock = (value: unknown): string => {
  if (typeof value !== "string") {
    return "";
  }

  return util.extractTimeAmPm(value) || util.extractTime(value);
};

const weekdayLabel = (timeZoneId: string): string =>
  new Intl.DateTimeFormat("en-US", {
    timeZone: timeZoneId,
    weekday: "short",
  }).format(new Date());

const localDayOfMonth = (timeZoneId: string): number => {
  const value = new Intl.DateTimeFormat("en-US", {
    timeZone: timeZoneId,
    day: "numeric",
  }).format(new Date());
  const day = Number.parseInt(value, 10);
  if (!Number.isFinite(day) || day < 1 || day > 31) {
    throw new Error("failed to derive Bilal local day");
  }

  return day;
};

const loadBilalCsvRows = async (path: string): Promise<BilalCsvRow[]> => {
  const response = await util.get<string>(
    `https://firebasestorage.googleapis.com/v0/b/${STORAGE_BUCKET}/o/${encodeURIComponent(path)}?alt=media`,
  );
  if (typeof response.data !== "string") {
    throw new Error(`unexpected Bilal csv response for ${path}`);
  }

  return parse(response.data, {
    columns: true,
    skip_empty_lines: true,
  }) as BilalCsvRow[];
};

const findBilalCurrentRow = async (): Promise<BilalCsvRow> => {
  const storage = await util.loadJson<FirebaseStorageList>(STORAGE_LIST_URL);
  const csvPaths = (storage.items ?? [])
    .map((item) => (typeof item?.name === "string" ? item.name : ""))
    .filter((name) => name.endsWith(".csv"))
    .sort()
    .reverse();
  if (csvPaths.length === 0) {
    throw new Error("missing Bilal prayer time csv");
  }

  const day = localDayOfMonth(ids[0].timeZoneId);
  const weekday = weekdayLabel(ids[0].timeZoneId).toLowerCase();

  for (const path of csvPaths) {
    const row = (await loadBilalCsvRows(path))
      .filter((candidate) => {
        const candidateDay = Number.parseInt(candidate.Date, 10);
        return (
          Number.isFinite(candidateDay) &&
          candidateDay === day &&
          candidate.Day.trim().toLowerCase() === weekday
        );
      })
      // Ramadan exports can wrap across a month boundary and repeat the same
      // day number/week day combination. The later row is the current segment.
      .at(-1);
    if (row) {
      return row;
    }
  }

  throw new Error(`missing Bilal prayer time row for ${weekday} ${day}`);
};

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "ebc421c8-5dc4-48f1-a896-660f1979e922",
    name: "Bilal Masjid",
    url: "http://www.bilalmasjid.com/",
    timeZoneId: "America/Los_Angeles",
    address: "4115 SW 160th Ave, Beaverton, OR 97007, USA",
    placeId: "ChIJ1zBAhokOlVQR2TdaCbFyL9k",
    geo: {
      latitude: 45.490128,
      longitude: -122.842614,
    },
  },
];
const run = async () => {
  const row = await findBilalCurrentRow();
  const iqamaTimes = [
    normalizeClock(row["Fajr Iqama"]),
    normalizeClock(row["Duhr Iqama"]),
    normalizeClock(row["Asr Iqama"]),
    normalizeClock(row["Maghrib Iqama"]),
    normalizeClock(row["Isha Iqama"]),
  ];

  if (iqamaTimes.some((value) => !value)) {
    throw new Error("failed to parse Bilal iqama times");
  }

  util.setIqamaTimes(ids[0], iqamaTimes);
  util.setJumaTimes(ids[0], [row.Jummah1, row.Jummah2]);
  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/OR/bilal-masjid-beaverton",
  ids,
  run,
};
