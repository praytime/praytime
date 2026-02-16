import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const MAWAQIT_FALLBACK_URL =
  "https://mawaqit.net/en/m/islamic-center-brooklyn?showNotification=0&showSearchButton=0&showFooter=0&showFlashMessage=0&view=mobile";

type MawaqitDaySchedule = Record<string, string[]>;

type MawaqitPayload = {
  calendar?: MawaqitDaySchedule[];
  iqamaCalendar?: MawaqitDaySchedule[];
  jumua?: string | null;
  jumua2?: string | null;
  jumua3?: string | null;
};

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

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "aeec7d94-658a-47cb-b38c-8254da8bd7b2",
    name: "Al-Iman Mosque",
    url: "https://alimancenter.org/",
    timeZoneId: "America/New_York",
    address: "24-30 Steinway St, Queens, NY 11103, USA",
    placeId: "ChIJcd40bWpfwokRarqRDvYtYAM",
    geo: {
      latitude: 40.768471,
      longitude: -73.9115833,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);
  const mawaqitUrl =
    $("iframe[src*='mawaqit.net'][src*='/m/']").first().attr("src") ??
    MAWAQIT_FALLBACK_URL;

  const mawaqitResponse = await util.get<string>(mawaqitUrl);
  if (typeof mawaqitResponse.data !== "string") {
    throw new Error("unexpected mawaqit response type");
  }
  const mawaqit = parseMawaqitPayload(mawaqitResponse.data);

  const monthIndex = Number.parseInt(util.strftime("%m", ids[0]), 10) - 1;
  const day = Number.parseInt(util.strftime("%d", ids[0]), 10);
  if (
    !Number.isFinite(monthIndex) ||
    monthIndex < 0 ||
    monthIndex > 11 ||
    !Number.isFinite(day)
  ) {
    throw new Error("failed to derive local day");
  }

  const adhanTimes = dayPrayerTimes(mawaqit.calendar, monthIndex, day);
  const iqamaConfig = dayPrayerTimes(mawaqit.iqamaCalendar, monthIndex, day);
  if (adhanTimes.length < 6 || iqamaConfig.length < 5) {
    throw new Error("missing mawaqit schedule for day");
  }

  const adhanIndexes = [0, 2, 3, 4, 5] as const;
  const iqamaTimes = iqamaConfig.map((entry, index) => {
    const text = normalizeClock(entry);
    if (text) {
      return text;
    }

    if (/^\s*[+-]\s*\d+\s*$/.test(entry)) {
      const prayerBaseIndex = adhanIndexes[index];
      if (prayerBaseIndex === undefined) {
        return "";
      }
      const adhan = adhanTimes[prayerBaseIndex];
      if (!adhan) {
        return "";
      }
      return util.minutesTohourMinute(
        toMinutes(adhan) + util.minuteOffsetFromText(entry),
      );
    }

    return "";
  });
  if (iqamaTimes.some((time) => !time)) {
    throw new Error("failed to parse iqamah times");
  }

  const jumaTimes = [mawaqit.jumua, mawaqit.jumua2, mawaqit.jumua3]
    .map(normalizeClock)
    .filter((time) => time.length > 0);
  if (jumaTimes.length === 0) {
    throw new Error("failed to parse juma times");
  }

  util.setIqamaTimes(ids[0], iqamaTimes);
  util.setJumaTimes(ids[0], jumaTimes);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NY/al-iman-mosque-queens",
  ids,
  run,
};
