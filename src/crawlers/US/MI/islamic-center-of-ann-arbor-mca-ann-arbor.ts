import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

type PrayerTimesIqamah = {
  asr?: unknown;
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
    iqamah?: PrayerTimesIqamah[];
  };
  success?: unknown;
};

const normalizeText = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "dd1bc539-cafe-4f39-b21d-f2a51e9040e7",
    name: "Islamic Center of Ann Arbor (MCA)",
    url: "https://mca-a2.org/",
    timeZoneId: "America/Detroit",
    address: "2301 Plymouth Rd, Ann Arbor, MI 48105, USA",
    placeId: "ChIJoTX09ymsPIgRO8InMPpKP-4",
    geo: {
      latitude: 42.3011923,
      longitude: -83.714602,
    },
  },
];
const run = async () => {
  const { data } = await util.get<PrayerTimesResponse>(
    "https://mca-a2.org/wp-admin/admin-ajax.php",
    {
      fetch: {
        body: "action=prayer_times",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "POST",
      },
    },
  );

  const today = Array.isArray(data.data?.iqamah) ? data.data?.iqamah[0] : null;
  if (data.success !== true || !today) {
    throw new Error("missing prayer_times ajax payload");
  }

  const iqamaTimes = [
    normalizeText(today.fajr),
    normalizeText(today.zuhr),
    normalizeText(today.asr),
    normalizeText(today.maghrib),
    normalizeText(today.isha),
  ];
  if (iqamaTimes.some((time) => !time)) {
    throw new Error("incomplete iqamah times from prayer_times ajax");
  }

  util.setIqamaTimes(ids[0], iqamaTimes);
  util.setJumaTimes(ids[0], [
    normalizeText(today.jummah1),
    normalizeText(today.jummah2),
    // Site frontend renders a third slot at 2:00 PM when the API omits it.
    normalizeText(today.jummah3) || "2:00 PM",
  ]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/MI/islamic-center-of-ann-arbor-mca-ann-arbor",
  ids,
  run,
};
