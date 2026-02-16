import * as cheerio from "cheerio";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const MASJID_APP_FALLBACK_URL = "https://themasjidapp.org/7861/slides";

type MasjidAppDayIqama = {
  asr?: string;
  dhuhr?: string;
  fajr?: string;
  isha?: string;
  maghrib?: string;
  zuhr?: string;
};

type MasjidAppEvent = {
  isJuma?: boolean;
  order?: number;
  timeDesc?: string;
};

type MasjidAppPayload = {
  props?: {
    pageProps?: {
      masjid?: {
        events?: MasjidAppEvent[];
        iqamas?: Record<string, MasjidAppDayIqama>;
      };
    };
  };
};

const extractClock = (value: unknown): string => {
  if (typeof value !== "string") {
    return "";
  }
  return util.extractTimeAmPm(value) || util.extractTime(value);
};

const parseDayKey = (value: string): number => Number.parseInt(value, 10);

const nearestIqamaValue = (
  iqamas: Record<string, MasjidAppDayIqama>,
  dayOfYear: number,
  key: keyof MasjidAppDayIqama,
): string => {
  const direct = extractClock(iqamas[String(dayOfYear)]?.[key]);
  if (direct) {
    return direct;
  }

  const availableDays = Object.keys(iqamas)
    .map(parseDayKey)
    .filter(Number.isFinite)
    .sort((a, b) => a - b);

  for (const day of [...availableDays].reverse()) {
    if (day > dayOfYear) {
      continue;
    }
    const value = extractClock(iqamas[String(day)]?.[key]);
    if (value) {
      return value;
    }
  }

  for (const day of availableDays) {
    if (day < dayOfYear) {
      continue;
    }
    const value = extractClock(iqamas[String(day)]?.[key]);
    if (value) {
      return value;
    }
  }

  return "";
};

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "c6235d31-e9fc-4f30-9005-7c50b4116d2a",
    name: "Islamic Center of Chicago",
    url: "https://nahda.us/prayer-center/",
    timeZoneId: "America/Chicago",
    address: "3357 W 63rd St, Chicago, IL 60629, USA",
    placeId: "ChIJ4ZXGXc0xDogRkowOpYePJqE",
    geo: {
      latitude: 41.77861109999999,
      longitude: -87.7077778,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);
  const masjidAppUrl =
    $("iframe.widget-iframe").first().attr("src") ?? MASJID_APP_FALLBACK_URL;

  const response = await util.get<string>(masjidAppUrl);
  if (typeof response.data !== "string") {
    throw new Error("unexpected masjid app response type");
  }

  const iframePage = cheerio.load(response.data);
  const nextDataText = iframePage("#__NEXT_DATA__").text().trim();
  if (!nextDataText) {
    throw new Error("missing masjid app payload");
  }

  const nextData = JSON.parse(nextDataText) as MasjidAppPayload;
  const masjidData = nextData.props?.pageProps?.masjid;
  if (!masjidData?.iqamas || typeof masjidData.iqamas !== "object") {
    throw new Error("missing masjid app iqamas");
  }

  const dayOfYear = Number.parseInt(util.strftime("%j", ids[0]), 10);
  if (!Number.isFinite(dayOfYear)) {
    throw new Error("failed to derive local day-of-year");
  }
  const iqamaTimes = [
    nearestIqamaValue(masjidData.iqamas, dayOfYear, "fajr"),
    nearestIqamaValue(masjidData.iqamas, dayOfYear, "dhuhr") ||
      nearestIqamaValue(masjidData.iqamas, dayOfYear, "zuhr"),
    nearestIqamaValue(masjidData.iqamas, dayOfYear, "asr"),
    nearestIqamaValue(masjidData.iqamas, dayOfYear, "maghrib"),
    nearestIqamaValue(masjidData.iqamas, dayOfYear, "isha"),
  ];
  if (iqamaTimes.some((time) => !time)) {
    throw new Error("incomplete iqamah times");
  }
  util.setIqamaTimes(ids[0], iqamaTimes);

  const jumaTimes = (Array.isArray(masjidData.events) ? masjidData.events : [])
    .filter((event) => event?.isJuma === true)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((event) => extractClock(event.timeDesc))
    .filter((time) => time.length > 0);
  if (jumaTimes.length === 0) {
    throw new Error("failed to parse juma times");
  }
  util.setJumaTimes(ids[0], jumaTimes.slice(0, 3));

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/islamic-center-of-chicago-chicago",
  ids,
  run,
};
