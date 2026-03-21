import type * as cheerio from "cheerio";
import type { CrawlerIds, CrawlerRun } from "./types";
import * as util from "./util";

const COMPACT_TIME_RX = /^(\d{1,2})(\d{2})([ap]\.?m\.?)$/i;
const MASJIDBOX_API_BASE_URL =
  "https://api.masjidbox.com/1.0/masjidbox/landing";
const MASJIDBOX_API_KEY = "JejYcMS7hsOsZTPDk2ZhKOAlW9IyQ6Px";

type MasjidBoxSource =
  | string
  | {
      fromUrl: string;
      widgetKey: string;
    };

type MasjidBoxWidgetIqamah = {
  asr?: unknown;
  dhuhr?: unknown;
  fajr?: unknown;
  isha?: unknown;
  jumuah?: unknown;
  maghrib?: unknown;
};

type MasjidBoxWidgetDay = {
  date?: unknown;
  iqamah?: MasjidBoxWidgetIqamah;
  jumuah?: unknown;
};

type MasjidBoxWidgetResponse = {
  timetable?: unknown;
};

type MasjidBoxLandingState = {
  masjidbox?: {
    masjidboxAthany?: {
      settings?: {
        timezone?: unknown;
      };
      timetable?: unknown;
    };
  };
};

const masjidBoxJumuahValues = (day: MasjidBoxWidgetDay): unknown[] => {
  if (Array.isArray(day.jumuah)) {
    return day.jumuah;
  }
  if (Array.isArray(day.iqamah?.jumuah)) {
    return day.iqamah.jumuah;
  }

  return [];
};

const currentMasjidBoxDay = (
  timetable: MasjidBoxWidgetDay[],
  timeZoneId: string,
): MasjidBoxWidgetDay | undefined => {
  if (timetable.length === 0) {
    return undefined;
  }

  const today = util.strftime("%F", { timeZoneId });
  return (
    timetable.find(
      (entry) => typeof entry.date === "string" && entry.date.startsWith(today),
    ) ?? timetable[0]
  );
};

const currentMasjidBoxJumuahDay = (
  timetable: MasjidBoxWidgetDay[],
  currentDay: MasjidBoxWidgetDay | undefined,
): MasjidBoxWidgetDay | undefined => {
  if (!currentDay) {
    return timetable.find((entry) => masjidBoxJumuahValues(entry).length > 0);
  }

  const currentDayIndex = Math.max(0, timetable.indexOf(currentDay));
  return (
    timetable
      .slice(currentDayIndex)
      .find((entry) => masjidBoxJumuahValues(entry).length > 0) ??
    timetable.find((entry) => masjidBoxJumuahValues(entry).length > 0)
  );
};

const loadMasjidBoxLandingState = (
  $: cheerio.CheerioAPI,
): { timeZoneId: string; timetable: MasjidBoxWidgetDay[] } | null => {
  const reduxStateText =
    $("script")
      .toArray()
      .map((script) => $(script).text())
      .find((text) => text.includes("window.REDUX_STATE")) ?? "";
  const match = reduxStateText.match(/window\.REDUX_STATE\s*=\s*'([^']+)'/);
  if (!match?.[1]) {
    return null;
  }

  try {
    const decoded = decodeURIComponent(
      match[1].replace(/%(?![0-9a-f]{2})/gi, "%25"),
    );
    const payload = JSON.parse(decoded) as MasjidBoxLandingState;
    const athany = payload.masjidbox?.masjidboxAthany;
    const timeZoneId =
      typeof athany?.settings?.timezone === "string"
        ? athany.settings.timezone
        : "";
    const timetable = Array.isArray(athany?.timetable)
      ? (athany.timetable as MasjidBoxWidgetDay[])
      : [];
    if (!timeZoneId || timetable.length === 0) {
      return null;
    }

    return {
      timeZoneId,
      timetable,
    };
  } catch {
    return null;
  }
};

export const parseMasjidBoxTime = (value: string): string => {
  const extracted = util.extractTimeAmPm(value);
  if (extracted) {
    return extracted;
  }

  const match = value.replace(/\s+/g, "").match(COMPACT_TIME_RX);
  if (!match) {
    return "";
  }

  const [, hourText, minuteText, ampmText] = match;
  if (!hourText || !minuteText || !ampmText) {
    return "";
  }

  return `${hourText}:${minuteText}${ampmText.toUpperCase().replace(/\./g, "")}`;
};

const uniqueTimes = (times: string[]): string[] =>
  Array.from(new Set(times.filter((time) => time.length > 0)));

export const loadMasjidBoxTimes = async (
  url: string,
): Promise<{ iqamaTimes: string[]; jumaTimes: string[] }> => {
  const $ = await util.load(url);

  const landingState = loadMasjidBoxLandingState($);
  if (landingState) {
    const currentDay = currentMasjidBoxDay(
      landingState.timetable,
      landingState.timeZoneId,
    );
    const jumuahDay = currentMasjidBoxJumuahDay(
      landingState.timetable,
      currentDay,
    );
    const iqamah = currentDay?.iqamah;
    const iqamaTimes = uniqueTimes([
      util.normalizeIsoClock(
        iqamah?.fajr,
        landingState.timeZoneId,
        parseMasjidBoxTime,
      ),
      util.normalizeIsoClock(
        iqamah?.dhuhr,
        landingState.timeZoneId,
        parseMasjidBoxTime,
      ),
      util.normalizeIsoClock(
        iqamah?.asr,
        landingState.timeZoneId,
        parseMasjidBoxTime,
      ),
      util.normalizeIsoClock(
        iqamah?.maghrib,
        landingState.timeZoneId,
        parseMasjidBoxTime,
      ),
      util.normalizeIsoClock(
        iqamah?.isha,
        landingState.timeZoneId,
        parseMasjidBoxTime,
      ),
    ]);
    const jumaTimes = uniqueTimes(
      masjidBoxJumuahValues(jumuahDay ?? currentDay ?? {})
        .map((value) =>
          util.normalizeIsoClock(
            value,
            landingState.timeZoneId,
            parseMasjidBoxTime,
          ),
        )
        .filter(Boolean),
    );
    if (iqamaTimes.length >= 5 && jumaTimes.length > 0) {
      return {
        iqamaTimes: iqamaTimes.slice(0, 5),
        jumaTimes: jumaTimes.slice(0, 3),
      };
    }
  }

  const iqamaTimes = uniqueTimes(
    util.mapToText($, "div.iqamah div.time").map(parseMasjidBoxTime),
  );
  if (iqamaTimes.length < 5) {
    throw new Error("failed to parse masjidbox iqama timings");
  }

  const jumaTimes = uniqueTimes(
    util
      .mapToText($, "div.jumuah-times div.athan-time")
      .map(parseMasjidBoxTime),
  );
  if (jumaTimes.length === 0) {
    throw new Error("failed to parse masjidbox juma timings");
  }

  return {
    iqamaTimes: iqamaTimes.slice(0, 5),
    jumaTimes: jumaTimes.slice(0, 3),
  };
};

export const loadMasjidBoxWidgetTimes = async (
  source: Extract<MasjidBoxSource, { fromUrl: string; widgetKey: string }>,
  timeZoneId: string,
): Promise<{ iqamaTimes: string[]; jumaTimes: string[] }> => {
  const query = new URLSearchParams({
    begin: new Date().toISOString(),
    days: "9",
    get: "wg",
    key: source.widgetKey,
  });
  const payload = await util.loadJson<MasjidBoxWidgetResponse>(
    `${MASJIDBOX_API_BASE_URL}/athany?${query.toString()}`,
    {
      fetch: {
        headers: {
          "x-from": source.fromUrl,
          "x-key": source.widgetKey,
          apikey: MASJIDBOX_API_KEY,
        },
      },
    },
  );

  const timetable = Array.isArray(payload.timetable)
    ? (payload.timetable as MasjidBoxWidgetDay[])
    : [];
  if (timetable.length === 0) {
    throw new Error("failed to load masjidbox widget timetable");
  }

  const currentDay = currentMasjidBoxDay(timetable, timeZoneId);
  if (!currentDay) {
    throw new Error("missing current masjidbox widget prayer day");
  }

  const iqamah = currentDay.iqamah;
  const iqamaTimes = uniqueTimes([
    util.normalizeIsoClock(iqamah?.fajr, timeZoneId, parseMasjidBoxTime),
    util.normalizeIsoClock(iqamah?.dhuhr, timeZoneId, parseMasjidBoxTime),
    util.normalizeIsoClock(iqamah?.asr, timeZoneId, parseMasjidBoxTime),
    util.normalizeIsoClock(iqamah?.maghrib, timeZoneId, parseMasjidBoxTime),
    util.normalizeIsoClock(iqamah?.isha, timeZoneId, parseMasjidBoxTime),
  ]);
  if (iqamaTimes.length < 5) {
    throw new Error("failed to parse masjidbox widget iqama timings");
  }

  const jumuahDay = currentMasjidBoxJumuahDay(timetable, currentDay);
  const jumuah = jumuahDay ? masjidBoxJumuahValues(jumuahDay) : [];
  const jumaTimes = uniqueTimes(
    jumuah.map((value) =>
      util.normalizeIsoClock(value, timeZoneId, parseMasjidBoxTime),
    ),
  );
  if (jumaTimes.length === 0) {
    throw new Error("failed to parse masjidbox widget juma timings");
  }

  return {
    iqamaTimes: iqamaTimes.slice(0, 5),
    jumaTimes: jumaTimes.slice(0, 3),
  };
};

export const createMasjidBoxRun = (
  ids: CrawlerIds,
  source: MasjidBoxSource,
): CrawlerRun => {
  return async () => {
    const { iqamaTimes, jumaTimes } =
      typeof source === "string"
        ? await loadMasjidBoxTimes(source)
        : await loadMasjidBoxWidgetTimes(source, ids[0].timeZoneId);

    util.setIqamaTimes(ids[0], iqamaTimes);
    util.setJumaTimes(ids[0], jumaTimes);

    return ids;
  };
};
