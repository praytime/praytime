import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const normalizeLabel = (value: string): string =>
  value
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "78ffa969-e54f-4a4d-92cb-c049a9088d7f",
    name: "Islamic Center of Eastside",
    url: "https://www.eastsidemosque.com/",
    timeZoneId: "America/Los_Angeles",
    address: "14230 NE 21st St, Bellevue, WA 98007, USA",
    geo: {
      latitude: 47.629128,
      longitude: -122.150907,
    },
    placeId: "ChIJFRtUtEtskFQRFS42y762fRY",
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const prayerTable = $("div.azan-time-body table").first();
  const iqamaByPrayer = new Map<string, string>();

  prayerTable.find("tbody tr").each((_, row) => {
    const cells = $(row).find("td");
    if (cells.length < 3) {
      return;
    }

    const label = normalizeLabel(cells.eq(0).text());
    const iqama = cells.eq(2).text().trim();
    if (!iqama) {
      return;
    }

    if (label === "fajr") {
      iqamaByPrayer.set("fajr", iqama);
    } else if (label === "dhuhr main st") {
      iqamaByPrayer.set("zuhr", iqama);
    } else if (label === "asar") {
      iqamaByPrayer.set("asr", iqama);
    } else if (label === "maghrib") {
      iqamaByPrayer.set("maghrib", iqama);
    } else if (label === "isha") {
      iqamaByPrayer.set("isha", iqama);
    }
  });

  const iqamaTimes = [
    iqamaByPrayer.get("fajr") ?? "",
    iqamaByPrayer.get("zuhr") ?? "",
    iqamaByPrayer.get("asr") ?? "",
    iqamaByPrayer.get("maghrib") ?? "",
    iqamaByPrayer.get("isha") ?? "",
  ];
  if (iqamaTimes.some((time) => !time)) {
    throw new Error("incomplete prayer rows on ICOE homepage");
  }

  const seen = new Set<string>();
  const jumaTimes = $("div.azan-time-body table")
    .eq(1)
    .find("td.lower-text")
    .toArray()
    .map((cell) => util.extractTime($(cell).text()))
    .filter((time) => time && time !== "0:00")
    .filter((time) => {
      if (seen.has(time)) {
        return false;
      }
      seen.add(time);
      return true;
    });

  util.setIqamaTimes(ids[0], iqamaTimes);
  util.setJumaTimes(ids[0], jumaTimes);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/WA/icoe-bellevue",
  ids,
  run,
};
