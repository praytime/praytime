import * as cheerio from "cheerio";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const MASJIDAL_ID = "nL1J28Aa";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "67c64bec-d370-48ec-8c01-78f3d7cc2494",
    name: "Dar-us-Salaam",
    url: "https://darussalaam.org/",
    address: "5301 Edgewood Rd, College Park, MD 20740, USA",
    placeId: "ChIJZXrLS_PDt4kRFnzV6QTr4rQ",
    timeZoneId: "America/New_York",
    geo: {
      latitude: 39.015049,
      longitude: -76.911195,
    },
  },
  {
    uuid4: "40b30d95-f3b7-4a36-bc71-5bc57329120f",
    name: "Dar-us-Salaam - Off Site Juma",
    url: "https://darussalaam.org/",
    address: "9450 Cherry Hill Rd, College Park, MD 20740, USA",
    placeId: "ChIJBZgZgmrEt4kRPtq--ArcS5s",
    timeZoneId: "America/New_York",
    geo: {
      latitude: 39.020607,
      longitude: -76.94011,
    },
  },
];

const extractOffSiteJumaTimes = ($: cheerio.CheerioAPI): string[] => {
  const notice =
    util
      .mapToText($, "p")
      .find((text) => /jumu.?ah is being prayed at/i.test(text)) ?? "";
  const times = [...(util.matchTimeAmPmG(notice) ?? [])]
    .map((value) => util.extractTimeAmPm(value))
    .filter((value): value is string => Boolean(value));

  if (times.length < 2) {
    throw new Error("failed to parse Dar-us-Salaam off-site juma times");
  }

  return times.slice(0, 2);
};

const run = async () => {
  const [htmlResponse, iqama] = await Promise.all([
    util.get<string>(ids[0].url),
    util.loadMasjidalIqama(MASJIDAL_ID),
  ]);
  const html = htmlResponse.data;
  const $ = cheerio.load(html);

  util.setIqamaTimes(ids[0], [
    iqama.fajr,
    iqama.zuhr,
    iqama.asr,
    iqama.maghrib,
    iqama.isha,
  ]);

  const second = ids[1];
  if (second) {
    util.setJumaTimes(second, extractOffSiteJumaTimes($));
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/MD/dar-us-salaam-college-park",
  ids,
  run,
};
