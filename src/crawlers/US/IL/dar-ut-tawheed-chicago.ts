import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

interface TimeMyMasjidDayTiming {
  day?: unknown;
  iqamah_Asr?: unknown;
  iqamah_Fajr?: unknown;
  iqamah_Isha?: unknown;
  iqamah_Maghrib?: unknown;
  iqamah_Zuhr?: unknown;
  month?: unknown;
}

interface TimeMyMasjidJumahTiming {
  iqamahTime?: unknown;
  time?: unknown;
}

interface TimeMyMasjidResponse {
  hasError?: unknown;
  model?: {
    jumahSalahIqamahTimings?: TimeMyMasjidJumahTiming[];
    salahTimings?: TimeMyMasjidDayTiming[];
  };
}

const normalizeClock = (value: unknown): string => {
  if (typeof value !== "string") {
    return "";
  }
  const trimmed = value.trim();
  const shortClock = trimmed.match(/^(\d{1,2}:\d{2})(?::\d{2})?$/);
  if (shortClock?.[1]) {
    return shortClock[1];
  }
  return trimmed;
};

const getDatePart = (format: string, record: { timeZoneId: string }): number =>
  Number.parseInt(util.strftime(format, record), 10);

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "c2e84391-4f13-462a-979c-9983970ba632",
    name: "Dar-ut-Tawheed",
    url: "https://daruttawheed.com/",
    timeZoneId: "America/Chicago",
    address: "6351 N Western Ave, Chicago, IL 60659, USA",
    geo: {
      latitude: 41.997385,
      longitude: -87.689615,
    },
    placeId: "ChIJt1fAD93RD4gRFOgw4kT4P98",
  },
];
const run = async () => {
  const response = await util.loadJson<TimeMyMasjidResponse>(
    "https://time.my-masjid.com/api/TimingsInfoScreen/GetMasjidTimings?GuidId=74bab332-4052-4e25-b1f4-50a8f52b0ac7",
  );
  if (response.hasError === true) {
    throw new Error("time.my-masjid returned hasError=true");
  }

  const salahTimings = response.model?.salahTimings;
  if (!Array.isArray(salahTimings)) {
    throw new Error("time.my-masjid missing salahTimings");
  }

  const month = getDatePart("%m", ids[0]);
  const day = getDatePart("%d", ids[0]);

  const todayTiming = salahTimings.find((entry) => {
    const timingMonth = Number(entry.month);
    const timingDay = Number(entry.day);
    return timingMonth === month && timingDay === day;
  });
  if (!todayTiming) {
    throw new Error(`time.my-masjid missing entry for ${month}-${day}`);
  }

  const iqamaTimes = [
    normalizeClock(todayTiming.iqamah_Fajr),
    normalizeClock(todayTiming.iqamah_Zuhr),
    normalizeClock(todayTiming.iqamah_Asr),
    normalizeClock(todayTiming.iqamah_Maghrib),
    normalizeClock(todayTiming.iqamah_Isha),
  ];
  if (iqamaTimes.some((time) => !time)) {
    throw new Error(`incomplete iqama times for ${month}-${day}`);
  }

  const jumaTimes = Array.isArray(response.model?.jumahSalahIqamahTimings)
    ? response.model.jumahSalahIqamahTimings
        .map((timing) => normalizeClock(timing.iqamahTime ?? timing.time))
        .filter((time): time is string => Boolean(time))
        .slice(0, 3)
    : [];

  util.setIqamaTimes(ids[0], iqamaTimes);
  util.setJumaTimes(ids[0], jumaTimes);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/dar-ut-tawheed-chicago",
  ids,
  run,
};
