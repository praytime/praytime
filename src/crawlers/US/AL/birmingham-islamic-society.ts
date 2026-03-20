import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "5b1a790c-6196-4167-bbc2-c4805d36b57f",
    name: "BIS Hoover Crescent Islamic Center",
    url: "http://www.bisweb.org/",
    timeZoneId: "America/Chicago",
    address: "2524 Hackberry Ln, Hoover, AL 35226, USA",
    placeId: "ChIJBUme07cYiYgRLCMgPiCRm1A",
    geo: {
      latitude: 33.4194263,
      longitude: -86.8147379,
    },
  },
  {
    uuid4: "7a4f54e7-9cd2-433a-b138-d9b09c8822e0",
    name: "BIS Homewood Masjid",
    url: "http://bisweb.org/",
    timeZoneId: "America/Chicago",
    address: "1810 25th Ct S, Homewood, AL 35209, USA",
    placeId: "ChIJ_cdM_dcbiYgR41tVxlc8LGI",
    geo: {
      latitude: 33.4866287,
      longitude: -86.79153219999999,
    },
  },
  {
    uuid4: "2de1ebd8-14d0-46f5-b43f-9821313abb12",
    name: "BIS West Side Masjid",
    url: "http://www.bisweb.org/",
    timeZoneId: "America/Chicago",
    address: "4506 Gary Ave, Fairfield, AL 35064, USA",
    placeId: "ChIJSRODqR3iiIgRCCG8x1qqxSU",
    geo: {
      latitude: 33.4921688,
      longitude: -86.9149705,
    },
  },
];

type BisIqamahResponse = {
  data?: Array<{
    masjid?: {
      nickname?: string;
    };
    prayer_times?: Record<string, string>;
  }>;
  success?: boolean;
};

type BisJummahResponse = {
  data?: {
    prayer_details?: Array<{
      masjid?: {
        nickname?: string;
      };
      time?: string;
    }>;
  };
  success?: boolean;
};

const parseBisClockMinutes = (value: string | undefined): number => {
  const match = value?.match(/^(\d{2}):(\d{2})/);
  if (!match) {
    return Number.NaN;
  }

  return (
    Number.parseInt(match[1] ?? "", 10) * 60 +
    Number.parseInt(match[2] ?? "", 10)
  );
};

const formatBisMinutes = (minutes: number): string => {
  const normalizedMinutes = ((minutes % (24 * 60)) + 24 * 60) % (24 * 60);
  const hours = Math.floor(normalizedMinutes / 60);
  const minuteValue = `${normalizedMinutes % 60}`.padStart(2, "0");
  const suffix = hours >= 12 ? "PM" : "AM";
  const normalizedHours = ((hours + 11) % 12) + 1;
  return `${normalizedHours}:${minuteValue} ${suffix}`;
};

const normalizeBisPrayerSequence = (
  values: Array<string | undefined>,
): string[] => {
  let previousMinutes = -1;

  return values.map((value) => {
    let minutes = parseBisClockMinutes(value);
    if (Number.isNaN(minutes)) {
      return "";
    }

    while (minutes <= previousMinutes && minutes < 24 * 60) {
      minutes += 12 * 60;
    }

    previousMinutes = minutes;
    return formatBisMinutes(minutes);
  });
};

const normalizeBisJummahTimes = (values: Array<string | undefined>): string[] =>
  values
    .map((value) => {
      let minutes = parseBisClockMinutes(value);
      if (Number.isNaN(minutes)) {
        return undefined;
      }

      if (minutes < 7 * 60) {
        minutes += 12 * 60;
      }

      return {
        minutes,
        formatted: formatBisMinutes(minutes),
      };
    })
    .filter(
      (
        value,
      ): value is {
        formatted: string;
        minutes: number;
      } => Boolean(value),
    )
    .sort((left, right) => left.minutes - right.minutes)
    .map((value) => value.formatted);

const run = async () => {
  const [hoover, homewood, westside] = ids;
  if (!hoover || !homewood || !westside) {
    throw new Error("missing BIS masjid records");
  }

  const [iqamahResponse, jummahResponse] = await Promise.all([
    util.loadJson<BisIqamahResponse>(
      `https://www.bisweb.org/wp-json/bis/v1/iqamahs?date=${util.strftime("%Y-%m-%d", hoover)}`,
    ),
    util.loadJson<BisJummahResponse>(
      "https://www.bisweb.org/wp-json/bis/v1/jummahs",
    ),
  ]);

  if (!iqamahResponse.success || !Array.isArray(iqamahResponse.data)) {
    throw new Error("missing BIS iqamah response");
  }
  if (
    !jummahResponse.success ||
    !Array.isArray(jummahResponse.data?.prayer_details)
  ) {
    throw new Error("missing BIS jummah response");
  }

  const iqamahByMasjid = new Map<string, string[]>();
  for (const entry of iqamahResponse.data) {
    const nickname = entry.masjid?.nickname?.trim();
    if (!nickname) {
      continue;
    }

    const prayerTimes = entry.prayer_times;
    iqamahByMasjid.set(
      nickname,
      normalizeBisPrayerSequence([
        prayerTimes?.fajr,
        prayerTimes?.dhur,
        prayerTimes?.asr,
        prayerTimes?.maghrib,
        prayerTimes?.isha,
      ]),
    );
  }

  const jummahByMasjid = new Map<string, Array<string | undefined>>();
  for (const detail of jummahResponse.data.prayer_details) {
    const nickname = detail.masjid?.nickname?.trim();
    if (!nickname || !detail.time) {
      continue;
    }

    jummahByMasjid.set(nickname, [
      ...(jummahByMasjid.get(nickname) ?? []),
      detail.time,
    ]);
  }

  [
    { nickname: "HCIC", record: hoover },
    { nickname: "Homewood", record: homewood },
    { nickname: "FIC", record: westside },
  ].forEach(({ nickname, record }) => {
    util.setIqamaTimes(record, [...(iqamahByMasjid.get(nickname) ?? [])]);
    util.setJumaTimes(
      record,
      normalizeBisJummahTimes(
        Array.from(new Set(jummahByMasjid.get(nickname) ?? [])),
      ),
    );
  });

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/AL/birmingham-islamic-society",
  ids,
  run,
};
