import type { CrawlerIds, CrawlerRun, MasjidRecord } from "./types";
import * as util from "./util";

type PrayersConnectIqamahEntry = {
  address?: unknown;
  id?: unknown;
  iqamah_human?: unknown;
};

type PrayersConnectIqamahBucket = {
  iqamah?: unknown;
};

type PrayersConnectIqamahPayload = {
  props?: {
    pageProps?: {
      schedules?: Record<string, PrayersConnectIqamahBucket>;
    };
  };
};

type PrayersConnectJumuahEntry = {
  id?: unknown;
  iqamah?: unknown;
};

type PrayersConnectJumuahPayload = {
  props?: {
    pageProps?: {
      jumuahSchedules?: unknown;
    };
  };
};

type PrayersConnectRunOptions = {
  fallbackJumaTimes?: string[];
  jumaLimit?: number;
  loadJuma?: boolean;
  mosqueId: number;
  requireJuma?: boolean;
  supplementalJumaTimes?: string[];
};

const PRAYERS_CONNECT_BASE_URL = "https://prayersconnect.com";
const PRAYER_KEYS = ["fajr", "dhuhr", "asr", "maghrib", "isha"] as const;
const US_STATE_NAMES: Record<string, string> = {
  AK: "Alaska",
  AL: "Alabama",
  AR: "Arkansas",
  AZ: "Arizona",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DC: "District of Columbia",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  IA: "Iowa",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  MA: "Massachusetts",
  MD: "Maryland",
  ME: "Maine",
  MI: "Michigan",
  MN: "Minnesota",
  MO: "Missouri",
  MS: "Mississippi",
  MT: "Montana",
  NC: "North Carolina",
  ND: "North Dakota",
  NE: "Nebraska",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NV: "Nevada",
  NY: "New York",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VA: "Virginia",
  VT: "Vermont",
  WA: "Washington",
  WI: "Wisconsin",
  WV: "West Virginia",
  WY: "Wyoming",
};

const doubleEncodePathSegment = (value: string): string =>
  encodeURIComponent(value).replaceAll("%", "%25");

const normalizeCountryLabel = (value: string): string => {
  const trimmed = value.trim();
  if (/^(usa?|united states)$/i.test(trimmed)) {
    return "United States";
  }

  return trimmed;
};

const normalizeRegionLabel = (value: string): string => {
  const trimmed = value.trim().toUpperCase();
  return US_STATE_NAMES[trimmed] ?? value.trim();
};

const prayersConnectLocationLabel = (record: MasjidRecord): string => {
  const addressParts =
    record.address
      ?.split(",")
      .map((value) => value.trim())
      .filter((value) => value.length > 0) ?? [];
  if (addressParts.length >= 3) {
    const city = addressParts.at(-3) ?? "";
    const state = normalizeRegionLabel(
      (addressParts.at(-2) ?? "").replace(/\d.*$/, "").trim(),
    );
    const country = normalizeCountryLabel(addressParts.at(-1) ?? "");
    if (city && state && country) {
      return `${city}, ${state}, ${country}`;
    }
  }

  return record.name;
};

const prayersConnectCoords = (record: MasjidRecord): string =>
  `${record.geo.latitude},${record.geo.longitude}`;

const prayersConnectAreaUrl = (
  route: "iqamah-times" | "jumuah",
  record: MasjidRecord,
): string => {
  const location = doubleEncodePathSegment(prayersConnectLocationLabel(record));
  const coords = prayersConnectCoords(record);
  return `${PRAYERS_CONNECT_BASE_URL}/${route}/${location}/${coords}/${coords}`;
};

const parseNextData = <T>(html: string): T => {
  const payload = html.match(
    /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/,
  )?.[1];
  if (!payload) {
    throw new Error("missing prayers connect next data");
  }

  return JSON.parse(payload) as T;
};

const toMosqueId = (value: unknown): number => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "string" && value.trim()) {
    const parsed = Number.parseInt(value, 10);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return Number.NaN;
};

const normalizeClock = (value: unknown): string => {
  if (typeof value !== "string") {
    return "";
  }

  return util.extractTimeAmPm(value) || util.extractTime(value);
};

const findOptionalIqamahEntry = (
  entries: unknown,
  mosqueId: number,
): PrayersConnectIqamahEntry | undefined => {
  if (!Array.isArray(entries)) {
    return undefined;
  }

  const match = entries.find(
    (entry) =>
      toMosqueId((entry as PrayersConnectIqamahEntry)?.id) === mosqueId,
  );
  if (!match || typeof match !== "object") {
    return undefined;
  }

  return match as PrayersConnectIqamahEntry;
};

const findIqamahEntry = (
  entries: unknown,
  mosqueId: number,
  prayerKey: string,
): PrayersConnectIqamahEntry => {
  const optionalMatch = findOptionalIqamahEntry(entries, mosqueId);
  if (optionalMatch) {
    return optionalMatch;
  }

  if (!Array.isArray(entries)) {
    throw new Error(`missing prayers connect ${prayerKey} schedule`);
  }

  throw new Error(
    `missing prayers connect ${prayerKey} entry for mosque ${mosqueId}`,
  );
};

const fridayJumaTimesFromSchedules = (
  schedules: Record<string, PrayersConnectIqamahBucket>,
  mosqueId: number,
): string[] =>
  Object.entries(schedules)
    .filter(([key]) => /^jummah\d+$/i.test(key))
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([, bucket]) => findOptionalIqamahEntry(bucket?.iqamah, mosqueId))
    .map((entry) => normalizeClock(entry?.iqamah_human))
    .filter((value): value is string => value.length > 0);

export const loadPrayersConnectPrayerTimes = async (
  record: MasjidRecord,
  input: { loadJuma?: boolean; mosqueId: number },
): Promise<{
  asr: string;
  fajr: string;
  isha: string;
  juma: string[];
  maghrib: string;
  zuhr: string;
}> => {
  const iqamahResponse = await util.get<string>(
    prayersConnectAreaUrl("iqamah-times", record),
  );
  if (typeof iqamahResponse.data !== "string") {
    throw new Error("unexpected prayers connect iqamah response type");
  }

  const iqamahPayload = parseNextData<PrayersConnectIqamahPayload>(
    iqamahResponse.data,
  );
  const schedules = iqamahPayload.props?.pageProps?.schedules;
  if (!schedules || typeof schedules !== "object") {
    throw new Error("missing prayers connect iqamah payload");
  }

  const prayerTimes = new Map<string, string>();
  for (const prayerKey of PRAYER_KEYS) {
    if (prayerKey === "dhuhr" && util.isJumaToday(record)) {
      const dhuhrEntry = findOptionalIqamahEntry(
        schedules.dhuhr?.iqamah,
        input.mosqueId,
      );
      if (!dhuhrEntry) {
        prayerTimes.set(prayerKey, "Juma");
        continue;
      }
    }

    const entry =
      prayerKey === "dhuhr"
        ? findIqamahEntry(schedules.dhuhr?.iqamah, input.mosqueId, prayerKey)
        : findIqamahEntry(
            schedules[prayerKey]?.iqamah,
            input.mosqueId,
            prayerKey,
          );
    const time = normalizeClock(entry.iqamah_human);
    if (!time) {
      throw new Error(
        `missing prayers connect ${prayerKey} iqamah for mosque ${input.mosqueId}`,
      );
    }

    prayerTimes.set(prayerKey, time);
  }

  const juma = util.isJumaToday(record)
    ? fridayJumaTimesFromSchedules(schedules, input.mosqueId)
    : [];
  if (input.loadJuma && juma.length === 0) {
    const jumuahResponse = await util.get<string>(
      prayersConnectAreaUrl("jumuah", record),
    );
    if (typeof jumuahResponse.data !== "string") {
      throw new Error("unexpected prayers connect jumuah response type");
    }

    const jumuahPayload = parseNextData<PrayersConnectJumuahPayload>(
      jumuahResponse.data,
    );
    const entries = jumuahPayload.props?.pageProps?.jumuahSchedules;
    if (Array.isArray(entries)) {
      const seen = new Set<string>();
      for (const entry of entries) {
        if (
          toMosqueId((entry as PrayersConnectJumuahEntry)?.id) !==
          input.mosqueId
        ) {
          continue;
        }

        const time = util.normalizeIsoClock(
          (entry as PrayersConnectJumuahEntry).iqamah,
          record.timeZoneId,
          normalizeClock,
        );
        const key = time.replace(/\s+/g, "").toLowerCase();
        if (!time || seen.has(key)) {
          continue;
        }

        seen.add(key);
        juma.push(time);
      }
    }
  }

  return {
    asr: prayerTimes.get("asr") ?? "",
    fajr: prayerTimes.get("fajr") ?? "",
    isha: prayerTimes.get("isha") ?? "",
    juma,
    maghrib: prayerTimes.get("maghrib") ?? "",
    zuhr: prayerTimes.get("dhuhr") ?? "",
  };
};

export const createPrayersConnectRun = (
  ids: CrawlerIds,
  options: PrayersConnectRunOptions,
): CrawlerRun => {
  return async () => {
    const shouldLoadJuma =
      options.loadJuma ??
      Boolean(
        options.requireJuma ||
          options.fallbackJumaTimes?.length ||
          options.supplementalJumaTimes?.length,
      );
    const prayerTimes = await loadPrayersConnectPrayerTimes(ids[0], {
      loadJuma: shouldLoadJuma,
      mosqueId: options.mosqueId,
    });

    util.setIqamaTimes(ids[0], [
      prayerTimes.fajr,
      prayerTimes.zuhr,
      prayerTimes.asr,
      prayerTimes.maghrib,
      prayerTimes.isha,
    ]);

    const jumaTimes: string[] = [];
    const seenJumaTimes = new Set<string>();
    for (const time of [
      ...prayerTimes.juma,
      ...(options.supplementalJumaTimes ?? []),
    ]) {
      const key = time.replace(/\s+/g, "").toLowerCase();
      if (!time || seenJumaTimes.has(key)) {
        continue;
      }

      seenJumaTimes.add(key);
      jumaTimes.push(time);
    }

    const limitedJumaTimes = jumaTimes.slice(0, options.jumaLimit ?? 3);
    if (limitedJumaTimes.length > 0) {
      util.setJumaTimes(ids[0], limitedJumaTimes);
    } else if (options.requireJuma) {
      throw new Error(
        `missing prayers connect juma times for mosque ${options.mosqueId}`,
      );
    } else if (options.fallbackJumaTimes?.length) {
      util.setJumaTimes(ids[0], options.fallbackJumaTimes);
    }

    return ids;
  };
};
