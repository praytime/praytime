import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const PRAYER_TIMES_URL = "https://www.icsd.org/";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "95b4e60b-b115-492a-93ca-34cd821cbac6",
    name: "Islamic Center of San Diego (ICSD)",
    url: PRAYER_TIMES_URL,
    timeZoneId: "America/Los_Angeles",
    address: "7050 Eckstrom Ave, San Diego, CA 92111, USA",
    placeId: "ChIJQe8a94z_24ARQeOZ6hQr1f0",
    geo: {
      latitude: 32.8204669,
      longitude: -117.1655668,
    },
  },
];

const normalizeIcsdLine = (line: string): string =>
  line.replace(/\s+/g, " ").trim();

const icsdIqamaValue = (label: string, value: string): string => {
  const parsed = util.extractTimeAmPm(value);
  if (parsed) {
    return parsed;
  }
  if (label === "fajr") {
    return "check website";
  }
  if (label === "maghrib") {
    return "-";
  }
  return "";
};

const run = async () => {
  const $ = await util.load(PRAYER_TIMES_URL);
  const lines = util.mapToText($, ".paragraph").map(normalizeIcsdLine);
  const prayers = new Map<util.StandardPrayerKey, string>();
  const jumaTimes: string[] = [];

  let section: "iqama" | "juma" | "" = "";
  for (const line of lines) {
    if (/^iqama times$/i.test(line)) {
      section = "iqama";
      continue;
    }
    if (/^jumuah khutbah times$/i.test(line)) {
      section = "juma";
      continue;
    }

    if (section === "iqama") {
      const [labelText = "", ...valueParts] = line.split(":");
      const prayerKey = util.getStandardPrayerKey(labelText);
      if (!prayerKey) {
        continue;
      }

      const value = icsdIqamaValue(prayerKey, valueParts.join(":").trim());
      if (!value) {
        continue;
      }

      if (!prayers.has(prayerKey)) {
        prayers.set(prayerKey, value);
      }
      continue;
    }

    if (section === "juma") {
      const time = util.extractTimeAmPm(line);
      if (/^\d+(st|nd|rd)\s+jumuah:/i.test(line) && time) {
        jumaTimes.push(time);
      }
    }
  }

  util.setIqamaTimes(
    ids[0],
    util.requireStandardPrayerTimes(
      prayers,
      "failed to parse ICSD iqama times",
    ),
  );
  util.setJumaTimes(ids[0], jumaTimes.slice(0, 2));

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/CA/islamic-center-of-san-diego-icsd-san-diego",
  ids,
  run,
};
