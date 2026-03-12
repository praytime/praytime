import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

type BarkaatPrayerTime = {
  asar_i?: string | null;
  dahur_i?: string | null;
  fajr_i?: string | null;
  isha_i?: string | null;
  magrib_i?: string | null;
  sunrise?: string | null;
};

type BarkaatJummahTime = {
  iqama_time1?: string | null;
  iqama_time2?: string | null;
  iqama_time3?: string | null;
};

const normalizeApiClock = (value: string | null | undefined): string => {
  const match = value?.trim().match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);
  if (!match?.[1] || !match[2]) {
    return "";
  }

  const hours24 = Number.parseInt(match[1], 10);
  const minutes = match[2];
  if (!Number.isFinite(hours24)) {
    return "";
  }

  const suffix = hours24 >= 12 ? "PM" : "AM";
  const hours12 = ((hours24 + 11) % 12) + 1;
  return `${hours12}:${minutes} ${suffix}`;
};

const parseInlineJson = <T>(html: string, label: string): T => {
  const match = html.match(
    new RegExp(
      `${label}\\s*=\\s*JSON\\.parse\\(JSON\\.stringify\\((\\{.*?\\})\\)\\);`,
      "s",
    ),
  );
  if (!match?.[1]) {
    throw new Error(`missing ${label} payload`);
  }

  return JSON.parse(match[1]) as T;
};

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "09bfc7ba-3bc4-47df-aacf-9b4f55dc987e",
    name: "Barakaat Ul Quran Center",
    url: "https://www.barkaatulquran.org/",
    timeZoneId: "America/Chicago",
    address: "555 W Airport Fwy #170, Irving, TX 75062, USA",
    geo: {
      latitude: 32.839181,
      longitude: -96.95225,
    },
    placeId: "ChIJWxSOxgKDToYR_NAzFqEPFd4",
  },
];
const run = async () => {
  const { data: html } = await util.get<string>(
    "https://www.barkaatulquran.org/",
  );
  const prayerTimes = parseInlineJson<BarkaatPrayerTime>(
    html,
    "prayerTimeResponse",
  );
  const jummahTimes = parseInlineJson<BarkaatJummahTime>(
    html,
    "jummahPrayerTimeResponse",
  );

  const maghribIqama =
    prayerTimes.magrib_i && prayerTimes.magrib_i === prayerTimes.sunrise
      ? "sunset"
      : normalizeApiClock(prayerTimes.magrib_i);
  const iqamaTimes = [
    normalizeApiClock(prayerTimes.fajr_i),
    normalizeApiClock(prayerTimes.dahur_i),
    normalizeApiClock(prayerTimes.asar_i),
    maghribIqama,
    normalizeApiClock(prayerTimes.isha_i),
  ];

  if (iqamaTimes.some((value) => value.length === 0)) {
    throw new Error("failed to parse Barkaat Ul Quran iqama timings");
  }

  util.setIqamaTimes(ids[0], iqamaTimes);
  util.setJumaTimes(
    ids[0],
    [
      normalizeApiClock(jummahTimes.iqama_time1),
      normalizeApiClock(jummahTimes.iqama_time2),
      normalizeApiClock(jummahTimes.iqama_time3),
    ].filter((value): value is string => value.length > 0),
  );

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/barakat-ul-quran-irving",
  ids,
  run,
};
