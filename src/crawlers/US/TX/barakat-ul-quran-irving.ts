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
      : util.normalize24HourClock(prayerTimes.magrib_i);
  const iqamaTimes = [
    util.normalize24HourClock(prayerTimes.fajr_i),
    util.normalize24HourClock(prayerTimes.dahur_i),
    util.normalize24HourClock(prayerTimes.asar_i),
    maghribIqama,
    util.normalize24HourClock(prayerTimes.isha_i),
  ];

  if (iqamaTimes.some((value) => value.length === 0)) {
    throw new Error("failed to parse Barkaat Ul Quran iqama timings");
  }

  util.setIqamaTimes(ids[0], iqamaTimes);
  util.setJumaTimes(
    ids[0],
    [
      util.normalize24HourClock(jummahTimes.iqama_time1),
      util.normalize24HourClock(jummahTimes.iqama_time2),
      util.normalize24HourClock(jummahTimes.iqama_time3),
    ].filter((value): value is string => value.length > 0),
  );

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/barakat-ul-quran-irving",
  ids,
  run,
};
