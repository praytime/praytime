import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "36487615-29b9-40ec-b2b3-0a8cb64d35c0",
    name: "Al-Hidaya Center Latham",
    url: "http://www.al-hidaya.org/",
    timeZoneId: "America/New_York",
    address: "322 Troy Schenectady Rd, Latham, NY 12110, USA",
    placeId: "ChIJo_XWj9UN3okRnB_UDKwGt0U",
    geo: {
      latitude: 42.74223629999999,
      longitude: -73.7484829,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);
  const texts = util
    .mapToText($, "h3,p")
    .map(util.normalizeSpace)
    .filter((value) => value.length > 0);

  const prayerValues = new Map<string, string>();
  for (const text of texts) {
    const match = /^(Fajr|Duhr|Dhuhr|Asr|Magrib|Maghrib|Isha):\s*(.+)$/i.exec(
      text,
    );
    if (!match) {
      continue;
    }

    const label = (match[1] ?? "").toLowerCase();
    const value = util.normalizeSpace(match[2] ?? "");
    if (!value || prayerValues.has(label)) {
      continue;
    }
    prayerValues.set(label, value);
  }

  const jumaTimes = texts
    .filter((text) => /\b(?:1st|2nd)\s+jummah\b/i.test(text))
    .map(util.extractTimeAmPm)
    .filter((value) => value.length > 0);

  util.setIqamaTimes(ids[0], [
    prayerValues.get("fajr"),
    prayerValues.get("duhr") ?? prayerValues.get("dhuhr"),
    prayerValues.get("asr"),
    prayerValues.get("magrib") ?? prayerValues.get("maghrib"),
    prayerValues.get("isha"),
  ]);
  util.setJumaTimes(ids[0], jumaTimes);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NY/al-hidaya-center-latham-latham",
  ids,
  run,
};
