import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "c7f52457-b461-44de-9f37-4f3b43aecaf6",
    name: "East Plano Islamic Center",
    url: "http://epicmasjid.org",
    address: "1350 Star Ct, Plano, TX 75074, USA",
    placeId: "ChIJvdyH6-sbTIYREMaa7JQJCsc",
    timeZoneId: "America/Chicago",
    geo: {
      latitude: 33.01005,
      longitude: -96.646647,
    },
  },
];

const run = async () => {
  const $ = await util.load("https://epicmasjid.org");
  const record = ids[0];
  if (!record) {
    throw new Error("No masjid record configured");
  }

  const iqamaRows = $("#first_namaz tbody tr")
    .toArray()
    .map((row) => {
      const prayer = $("td:nth-child(1)", row).text().trim().toLowerCase();
      const iqama = $("td:nth-child(3)", row).text().trim();
      return { prayer, iqama };
    });
  const getIqama = (prayerName: string): string => {
    const value = iqamaRows.find(({ prayer }) => prayer === prayerName)?.iqama;
    const parsed = util.extractTimeAmPm(value);
    if (!parsed) {
      throw new Error(`Failed to parse ${prayerName} iqama time`);
    }
    return parsed;
  };

  util.setIqamaTimes(record, [
    getIqama("fajr"),
    getIqama("dhuhr"),
    getIqama("asr"),
    getIqama("maghrib"),
    getIqama("isha"),
  ]);

  const jumaTimes = $("#first_namaz + table tbody tr td:nth-child(2)")
    .toArray()
    .map((cell) => util.extractTimeAmPm($(cell).text()))
    .filter(Boolean);
  const uniqueJumaTimes = Array.from(new Set(jumaTimes)).slice(0, 3);
  util.setJumaTimes(record, uniqueJumaTimes);

  if (uniqueJumaTimes.length === 0) {
    throw new Error("Failed to parse Jumuah times");
  }

  if (iqamaRows.length < 5) {
    throw new Error("Failed to parse iqama timings");
  }

  if (!record.fajrIqama || !record.zuhrIqama || !record.asrIqama) {
    throw new Error("Missing required iqama timings");
  }

  if (!record.maghribIqama || !record.ishaIqama) {
    throw new Error("Missing required evening iqama timings");
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/east-plano-islamic-center",
  ids,
  run,
};
