import * as cheerio from "cheerio";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "3e87a273-03d2-453c-b778-465c3323dfc9",
    name: "Masjid Salahadeen",
    url: "http://masjidsalahadeen.org/",
    timeZoneId: "America/Chicago",
    address: "6100 K Ave, Plano, TX 75074, USA",
    geo: {
      latitude: 33.058068,
      longitude: -96.688619,
    },
    placeId: "ChIJO5PKkcAZTIYRTh4L65JMhEs",
  },
];
const run = async () => {
  const response = await util.get("http://masjidsalahadeen.org/");
  const $ = cheerio.load(response.data);

  const iqamaTimes = [
    $("td:contains(Fajr) + td").text().trim(),
    $("td:contains(Dhuhr) + td").text().trim(),
    $("td:contains(Asr) + td").text().trim(),
    $("td:contains(Maghrib) + td").text().trim(),
    $("td:contains(Isha) + td").text().trim(),
  ];
  const juma1 =
    $("td:contains(Khutba) + td")
      .text()
      .match(/\d{1,2}:\d{2}/)?.[0] ?? "";

  if (iqamaTimes.some((value) => value.length === 0) || !juma1) {
    throw new Error("failed to parse Masjid Salahadeen prayer times");
  }

  util.setIqamaTimes(ids[0], iqamaTimes);
  ids[0].juma1 = juma1;

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/masjid-salahadeen-plano",
  ids,
  run,
};
