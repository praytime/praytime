import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const PRAYER_TIMES_ENDPOINT =
  "https://masjiduthmanbinaffan.org/wp-admin/admin-ajax.php";

type PrayerTimesIqamahRow = {
  asr?: unknown;
  dhuhr?: unknown;
  fajr?: unknown;
  isha?: unknown;
  jummah1?: unknown;
  jummah2?: unknown;
  jummah3?: unknown;
  maghrib?: unknown;
  zuhr?: unknown;
};

type PrayerTimesResponse = {
  data?: {
    iqamah?: unknown;
  };
  success?: unknown;
};

const extractClock = (value: unknown): string => {
  if (typeof value !== "string") {
    return "";
  }
  return util.extractTimeAmPm(value);
};

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "31f508f9-668e-4ce8-8642-32a832618ca6",
    name: "Masjid Uthman Bin Affan",
    url: "http://masjiduthmanbinaffan.org/",
    timeZoneId: "America/Detroit",
    address: "21380 Ryan Rd, Warren, MI 48091, USA",
    placeId: "ChIJy2aCu87RJIgRKOOB5t8Mrw0",
    geo: {
      latitude: 42.4530407,
      longitude: -83.0639346,
    },
  },
];

const run = async () => {
  const response = await util.loadJson<PrayerTimesResponse>(
    PRAYER_TIMES_ENDPOINT,
    {
      fetch: {
        body: "action=prayer_times",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        method: "POST",
      },
    },
  );

  if (response.success !== true) {
    throw new Error("unexpected prayer_times response status");
  }

  const iqamahRows = response.data?.iqamah;
  if (!Array.isArray(iqamahRows)) {
    throw new Error("missing iqamah rows in prayer_times response");
  }

  const row = iqamahRows.find(
    (value): value is PrayerTimesIqamahRow =>
      typeof value === "object" && value !== null,
  );
  if (!row) {
    throw new Error("empty iqamah rows in prayer_times response");
  }

  const iqamahTimes = [
    extractClock(row.fajr),
    extractClock(row.zuhr ?? row.dhuhr),
    extractClock(row.asr),
    extractClock(row.maghrib),
    extractClock(row.isha),
  ];
  if (iqamahTimes.some((value) => !value)) {
    throw new Error("incomplete iqamah rows in prayer_times response");
  }

  const jumaTimes = [row.jummah1, row.jummah2, row.jummah3]
    .map(extractClock)
    .filter((value) => value.length > 0);
  if (jumaTimes.length === 0) {
    throw new Error("missing juma times in prayer_times response");
  }

  util.setIqamaTimes(ids[0], iqamahTimes);
  util.setJumaTimes(ids[0], jumaTimes.slice(0, 3));

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/MI/masjid-uthman-bin-affan-warren",
  ids,
  run,
};
