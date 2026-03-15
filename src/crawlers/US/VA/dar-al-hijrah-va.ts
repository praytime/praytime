import type { CheerioAPI } from "cheerio";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const DAILY_PRAYER_URL =
  "https://hijrah.org/?rest_route=/dpt/v1/prayertime&filter=today";
const JUMUAH_AJAX_URL = "https://hijrah.org/wp-admin/admin-ajax.php";
const DAR_AL_HIJRAH_LOCATION_ID = "1";

type HijrahPrayerDay = {
  asr_jamah?: unknown;
  fajr_jamah?: unknown;
  isha_jamah?: unknown;
  jamah_changes?: unknown;
  maghrib_jamah?: unknown;
  zuhr_jamah?: unknown;
};

type HijrahJumuahEntry = {
  hijri_time?: unknown;
};

type HijrahJumuahResponse = {
  data?: {
    data?: unknown;
  };
  success?: unknown;
};

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "6515de3b-bbda-49aa-97bd-6962072a9880",
    name: "Dar Al-Hijrah",
    url: "https://hijrah.org/",
    address: "3159 Row St, Falls Church, VA 22044, USA",
    timeZoneId: "America/New_York",
    placeId: "ChIJKZHrdH60t4kRDYVdiyL8Gps",
    geo: {
      latitude: 38.861948,
      longitude: -77.14697,
    },
  },
];

const normalizeHijrahClock = (value: unknown): string => {
  if (typeof value !== "string") {
    return "";
  }

  const match = value.trim().match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);
  if (!match) {
    return util.normalizeLooseClock(value);
  }

  const hour = Number(match[1]);
  const minute = match[2];
  if (!Number.isFinite(hour)) {
    return "";
  }

  const suffix = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minute} ${suffix}`;
};

const normalizeDisplayedClock = (value: unknown): string =>
  util.normalizeLooseClock(value).replace(/^0(?=\d:)/, "");

const toMinutes = (value: string): number => {
  const match = value.match(/^(\d{1,2}):(\d{2})\s*([AP]M)$/i);
  if (!match) {
    return Number.POSITIVE_INFINITY;
  }

  let hour = Number(match[1]) % 12;
  const meridiem = match[3] ?? "AM";
  if (meridiem.toUpperCase() === "PM") {
    hour += 12;
  }

  return hour * 60 + Number(match[2]);
};

const getJamahChangeValue = (
  prayerDay: HijrahPrayerDay,
  key: keyof Pick<
    HijrahPrayerDay,
    "fajr_jamah" | "zuhr_jamah" | "asr_jamah" | "maghrib_jamah" | "isha_jamah"
  >,
): unknown => {
  const changes = prayerDay.jamah_changes;
  if (!changes || typeof changes !== "object") {
    return undefined;
  }

  return (changes as Record<string, unknown>)[key];
};

const getPrayerDate = ($: CheerioAPI): string => {
  const prayerDate = util.normalizeSpace($("#selected2").first().text());
  if (!/^\d{2}-\d{2}-\d{4}$/.test(prayerDate)) {
    throw new Error("missing Dar Al-Hijrah Jumu'ah date");
  }
  return prayerDate;
};

const parsePrayerDate = (value: string): Date => {
  const [monthText = "", dayText = "", yearText = ""] = value.split("-");
  const month = Number.parseInt(monthText, 10);
  const day = Number.parseInt(dayText, 10);
  const year = Number.parseInt(yearText, 10);
  if (
    !Number.isFinite(month) ||
    !Number.isFinite(day) ||
    !Number.isFinite(year)
  ) {
    throw new Error(`invalid Dar Al-Hijrah Jumu'ah date: ${value}`);
  }

  return new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
};

const formatPrayerDate = (value: Date): string => {
  const month = String(value.getUTCMonth() + 1).padStart(2, "0");
  const day = String(value.getUTCDate()).padStart(2, "0");
  const year = value.getUTCFullYear();
  return `${month}-${day}-${year}`;
};

const loadJumahTimesForDate = async (prayerDate: string): Promise<string[]> => {
  const response = await util.loadJson<HijrahJumuahResponse>(JUMUAH_AJAX_URL, {
    fetch: {
      body: new URLSearchParams({
        action: "get_event",
        khateeb_date: prayerDate,
        location_id: DAR_AL_HIJRAH_LOCATION_ID,
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      method: "POST",
    },
  });

  if (response.success !== true) {
    throw new Error("failed to load Dar Al-Hijrah Jumu'ah schedule");
  }

  const entries = response.data?.data;
  if (!Array.isArray(entries)) {
    throw new Error("missing Dar Al-Hijrah Jumu'ah entries");
  }

  const times = Array.from(
    new Set(
      (entries as HijrahJumuahEntry[])
        .map((entry) => normalizeDisplayedClock(entry.hijri_time))
        .filter((value) => value.length > 0),
    ),
  ).sort((a, b) => toMinutes(a) - toMinutes(b));

  if (times.length === 0) {
    throw new Error("failed to parse Dar Al-Hijrah Jumu'ah times");
  }

  return times;
};

const isRegularJumahSchedule = (times: string[]): boolean => {
  if (times.length === 0 || times.length > 4) {
    return false;
  }

  return times.every((time) => {
    const minutes = toMinutes(time);
    return Number.isFinite(minutes) && minutes >= 11 * 60 && minutes <= 15 * 60;
  });
};

const loadJumahTimes = async (prayerDate: string): Promise<string[]> => {
  const selectedTimes = await loadJumahTimesForDate(prayerDate);
  if (isRegularJumahSchedule(selectedTimes)) {
    return selectedTimes;
  }

  const baseDate = parsePrayerDate(prayerDate);
  const candidateDates: string[] = [];
  for (let weekOffset = 1; weekOffset <= 4; weekOffset += 1) {
    candidateDates.push(
      formatPrayerDate(
        new Date(baseDate.getTime() + weekOffset * 7 * 24 * 60 * 60 * 1000),
      ),
    );
  }
  for (let weekOffset = 1; weekOffset <= 4; weekOffset += 1) {
    candidateDates.push(
      formatPrayerDate(
        new Date(baseDate.getTime() - weekOffset * 7 * 24 * 60 * 60 * 1000),
      ),
    );
  }

  for (const candidateDate of candidateDates) {
    const candidateTimes = await loadJumahTimesForDate(candidateDate);
    if (isRegularJumahSchedule(candidateTimes)) {
      return candidateTimes;
    }
  }

  return selectedTimes;
};

const run = async () => {
  const [prayerDay] = await util.loadJson<HijrahPrayerDay[]>(DAILY_PRAYER_URL);
  if (!prayerDay || typeof prayerDay !== "object") {
    throw new Error("missing Dar Al-Hijrah daily prayer data");
  }

  const fajr = normalizeHijrahClock(
    getJamahChangeValue(prayerDay, "fajr_jamah") ?? prayerDay.fajr_jamah,
  );
  const zuhr = normalizeHijrahClock(
    getJamahChangeValue(prayerDay, "zuhr_jamah") ?? prayerDay.zuhr_jamah,
  );
  const asr = normalizeHijrahClock(
    getJamahChangeValue(prayerDay, "asr_jamah") ?? prayerDay.asr_jamah,
  );
  const maghrib = normalizeHijrahClock(
    getJamahChangeValue(prayerDay, "maghrib_jamah") ?? prayerDay.maghrib_jamah,
  );
  const isha = normalizeHijrahClock(
    getJamahChangeValue(prayerDay, "isha_jamah") ?? prayerDay.isha_jamah,
  );

  if (!fajr || !zuhr || !asr || !maghrib || !isha) {
    throw new Error("failed to parse Dar Al-Hijrah iqama times");
  }

  const $ = await util.load(ids[0].url);
  const jumahDate = getPrayerDate($);
  const jumahTimes = await loadJumahTimes(jumahDate);

  util.setIqamaTimes(ids[0], [fajr, zuhr, asr, maghrib, isha]);
  util.setJumaTimes(ids[0], jumahTimes);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/VA/dar-al-hijrah-va",
  ids,
  run,
};
