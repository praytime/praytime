import type { CrawlerIds, CrawlerRun, MasjidRecord } from "./types";
import * as util from "./util";

const MAWAQIT_MOBILE_QUERY =
  "?showNotification=0&showSearchButton=0&showFooter=0&showFlashMessage=0";

type MawaqitDaySchedule = Record<string, string[]>;

type MawaqitPayload = {
  calendar?: MawaqitDaySchedule[];
  iqamaCalendar?: MawaqitDaySchedule[];
  jumua?: string | null;
  jumua2?: string | null;
  jumua3?: string | null;
};

const IQAMA_ADHAN_INDEXES = [0, 2, 3, 4, 5] as const;

const normalizeClock = (value: unknown): string => {
  if (typeof value !== "string") {
    return "";
  }

  return util.extractTimeAmPm(value) || util.extractTime(value);
};

const toMinutes = (timeText: string): number => {
  const match = timeText.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) {
    throw new Error(`invalid base time: ${timeText}`);
  }

  const [, hourText, minuteText] = match;
  if (!hourText || !minuteText) {
    throw new Error(`invalid base time: ${timeText}`);
  }

  const hour = Number.parseInt(hourText, 10);
  const minute = Number.parseInt(minuteText, 10);
  if (
    !Number.isFinite(hour) ||
    !Number.isFinite(minute) ||
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59
  ) {
    throw new Error(`invalid base time: ${timeText}`);
  }

  return hour * 60 + minute;
};

const parseMawaqitPayload = (html: string): MawaqitPayload => {
  const payloadText = html.match(/var confData = (\{[\s\S]*?\});/)?.[1];
  if (!payloadText) {
    throw new Error("missing mawaqit payload");
  }

  return JSON.parse(payloadText) as MawaqitPayload;
};

const dayPrayerTimes = (
  schedule: MawaqitDaySchedule[] | undefined,
  monthIndex: number,
  day: number,
): string[] => {
  const month = schedule?.[monthIndex];
  if (!month || typeof month !== "object") {
    return [];
  }

  const values = month[String(day)];
  return Array.isArray(values) ? values : [];
};

const localDayParts = (
  record: MasjidRecord,
): { day: number; monthIndex: number } => {
  const monthIndex = Number.parseInt(util.strftime("%m", record), 10) - 1;
  const day = Number.parseInt(util.strftime("%d", record), 10);

  if (
    !Number.isFinite(monthIndex) ||
    monthIndex < 0 ||
    monthIndex > 11 ||
    !Number.isFinite(day) ||
    day < 1 ||
    day > 31
  ) {
    throw new Error("failed to derive local day");
  }

  return { day, monthIndex };
};

const extractPrayerTimes = (
  record: MasjidRecord,
  payload: MawaqitPayload,
): { iqamaTimes: string[]; jumaTimes: string[] } => {
  const { day, monthIndex } = localDayParts(record);
  const adhanTimes = dayPrayerTimes(payload.calendar, monthIndex, day);
  const iqamaConfig = dayPrayerTimes(payload.iqamaCalendar, monthIndex, day);
  if (
    adhanTimes.length < 6 ||
    iqamaConfig.length < IQAMA_ADHAN_INDEXES.length
  ) {
    throw new Error("missing mawaqit schedule for day");
  }

  const iqamaTimes = IQAMA_ADHAN_INDEXES.map((adhanIndex, index) => {
    const entry = iqamaConfig[index];
    if (typeof entry !== "string") {
      throw new Error(`missing mawaqit iqamah entry ${index}`);
    }

    const text = normalizeClock(entry);
    if (text) {
      return text;
    }

    if (/^\s*[+-]\s*\d+\s*$/.test(entry)) {
      const adhan = adhanTimes[adhanIndex];
      if (typeof adhan !== "string") {
        throw new Error(`missing mawaqit adhan entry ${adhanIndex}`);
      }

      return util.minutesTohourMinute(
        toMinutes(adhan) + util.minuteOffsetFromText(entry),
      );
    }

    throw new Error(`failed to parse mawaqit iqamah time: ${entry}`);
  });

  const jumaTimes = [payload.jumua, payload.jumua2, payload.jumua3]
    .map(normalizeClock)
    .filter((time): time is string => time.length > 0);
  if (jumaTimes.length === 0) {
    throw new Error("failed to parse mawaqit juma times");
  }

  return { iqamaTimes, jumaTimes };
};

export const mawaqitMobileUrl = (slug: string): string =>
  `https://mawaqit.net/en/m/${slug}${MAWAQIT_MOBILE_QUERY}`;

export const loadMawaqitMobileTimesFromUrl = async (
  record: MasjidRecord,
  url: string,
): Promise<void> => {
  const response = await util.get<string>(url);
  if (typeof response.data !== "string") {
    throw new Error("unexpected mawaqit response type");
  }

  const payload = parseMawaqitPayload(response.data);
  const { iqamaTimes, jumaTimes } = extractPrayerTimes(record, payload);

  util.setIqamaTimes(record, iqamaTimes);
  util.setJumaTimes(record, jumaTimes);
};

export const loadMawaqitMobileTimes = async (
  record: MasjidRecord,
  slug: string,
): Promise<void> => {
  await loadMawaqitMobileTimesFromUrl(record, mawaqitMobileUrl(slug));
};

export const createMawaqitMobileRun = (
  ids: CrawlerIds,
  slug: string,
): CrawlerRun => {
  return async () => {
    await loadMawaqitMobileTimes(ids[0], slug);
    return ids;
  };
};
