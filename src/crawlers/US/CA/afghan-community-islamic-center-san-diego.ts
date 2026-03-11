import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "1f34f77c-bf42-4832-a371-3566b33e7889",
    name: "Afghan Community Islamic Center",
    url: "http://www.acicmasjidtawheed.com/",
    timeZoneId: "America/Los_Angeles",
    address: "3333 Sandrock Rd, San Diego, CA 92123, USA",
    placeId: "ChIJ52-wp2JV2YARuI8QpOnaCIY",
    geo: {
      latitude: 32.8034722,
      longitude: -117.1389556,
    },
  },
];

type UmmahsoftResponse = {
  iqamaTimes?: Array<{
    asr?: unknown;
    asr_iqama?: unknown;
    asr_iqama_time?: unknown;
    dhuhr?: unknown;
    fajr_iqama?: unknown;
    fajr_iqama_time?: unknown;
    iqama_date?: {
      date?: unknown;
    };
    isha?: unknown;
    isha_iqama?: unknown;
    isha_iqama_time?: unknown;
    maghrib?: unknown;
    maghrib_iqama?: unknown;
    magrib_iqama_time?: unknown;
    zuhr_iqama?: unknown;
    zuhr_iqama_time?: unknown;
  }>;
  masjidInfo?: {
    asr_iqama_time?: unknown;
    fajr_iqama_time?: unknown;
    isha_iqama_time?: unknown;
    jumma1_azan?: unknown;
    jumma1_iqama?: unknown;
    zuhr_iqama_time?: unknown;
  };
  prayerTimes?: Array<{
    date?: {
      date?: unknown;
    };
    maghrib_iqama_time?: unknown;
    magrib_iqama_time?: unknown;
  }>;
};

const firstTime = (...values: unknown[]): string => {
  for (const value of values) {
    if (typeof value !== "string") {
      continue;
    }

    const trimmed = value.trim();
    if (trimmed) {
      return trimmed;
    }
  }

  return "";
};

const run = async () => {
  const record = ids[0];
  if (!record) {
    throw new Error("missing masjid record");
  }

  const year = util.strftime("%Y", record);
  const month = Number.parseInt(util.strftime("%m", record), 10);
  const today = util.strftime("%Y-%m-%d", record);
  const response = await util.loadJson<UmmahsoftResponse>(
    `https://ummahsoft.org/salahtime/api/masjidi/v1/index.php/masjids/3478/iqamahandprayertimes/${year}/${month}`,
  );

  const todayIqama = response.iqamaTimes?.find((value) =>
    `${value.iqama_date?.date ?? ""}`.startsWith(today),
  );
  const todayPrayerTimes = response.prayerTimes?.find((value) =>
    `${value.date?.date ?? ""}`.startsWith(today),
  );
  const masjidInfo = response.masjidInfo;

  const iqamaTimes = [
    firstTime(
      todayIqama?.fajr_iqama,
      todayIqama?.fajr_iqama_time,
      masjidInfo?.fajr_iqama_time,
    ),
    firstTime(
      todayIqama?.dhuhr,
      todayIqama?.zuhr_iqama,
      todayIqama?.zuhr_iqama_time,
      masjidInfo?.zuhr_iqama_time,
    ),
    firstTime(
      todayIqama?.asr,
      todayIqama?.asr_iqama,
      todayIqama?.asr_iqama_time,
      masjidInfo?.asr_iqama_time,
    ),
    firstTime(
      todayIqama?.maghrib,
      todayIqama?.maghrib_iqama,
      todayIqama?.magrib_iqama_time,
      todayPrayerTimes?.maghrib_iqama_time,
      todayPrayerTimes?.magrib_iqama_time,
    ),
    firstTime(
      todayIqama?.isha,
      todayIqama?.isha_iqama,
      todayIqama?.isha_iqama_time,
      masjidInfo?.isha_iqama_time,
    ),
  ];
  if (iqamaTimes.some((value) => !value)) {
    throw new Error("incomplete ACIC iqama times");
  }

  util.setIqamaTimes(record, iqamaTimes);

  const jumaTime = firstTime(masjidInfo?.jumma1_iqama, masjidInfo?.jumma1_azan);
  if (jumaTime) {
    util.setJumaTimes(record, [jumaTime]);
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/CA/afghan-community-islamic-center-san-diego",
  ids,
  run,
};
