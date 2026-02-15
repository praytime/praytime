import axios from "axios";
import * as cheerio from "cheerio";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "2eddb291-4ba6-4361-8f41-250145733c05",
    name: "Al-Minhaal Academy",
    url: "https://www.alminhaalacademy.com/",
    address: "1764 New Durham Rd, South Plainfield, NJ 07080, USA",
    placeId: "ChIJFaiTJAy4w4kRU8yE9Ad6Lhg",
    timeZoneId: "America/New_York",
    geo: {
      latitude: 40.547093,
      longitude: -74.423824,
    },
  },
];
const run = async () => {
  const response = await axios.get("https://www.alminhaalacademy.com/");
  const $ = cheerio.load(response.data);

  ids[0].fajrIqama = $(
    "#x-content-band-1 > div > div.x-column.x-sm.vc.x-1-4 > table > tbody > tr:nth-child(4) > td.jamah",
  )
    .text()
    .trim();
  ids[0].zuhrIqama = $(
    "#x-content-band-1 > div > div.x-column.x-sm.vc.x-1-4 > table > tbody > tr:nth-child(6) > td.jamah",
  )
    .text()
    .trim();
  ids[0].asrIqama = $(
    "#x-content-band-1 > div > div.x-column.x-sm.vc.x-1-4 > table > tbody > tr:nth-child(7) > td.jamah",
  )
    .text()
    .trim();
  ids[0].maghribIqama = $(
    "#x-content-band-1 > div > div.x-column.x-sm.vc.x-1-4 > table > tbody > tr:nth-child(8) > td.jamah",
  )
    .text()
    .trim();
  ids[0].ishaIqama = $(
    "#x-content-band-1 > div > div.x-column.x-sm.vc.x-1-4 > table > tbody > tr:nth-child(9) > td.jamah",
  )
    .text()
    .trim();

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NJ/al-minhaal-academy-new-jersey",
  ids,
  run,
};
