import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const normalizeSpace = (text: string): string =>
  text
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "5a582b3a-5217-4802-8810-a247b8484a6e",
    name: "Masjid Ar-Rahman - Islamic Association of Greater Memphis",
    url: "http://www.masjid-arrahman.org/",
    timeZoneId: "America/Chicago",
    address: "7906 Lowrance Rd, Memphis, TN 38125, USA",
    placeId: "ChIJA0CXOZyQf4gRR2rA7UyvTUw",
    geo: {
      latitude: 35.03653609999999,
      longitude: -89.7997101,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);
  const html = $.html();

  const iqamaSection = normalizeSpace(
    $("h5")
      .toArray()
      .map((heading) => $(heading).text())
      .find(
        (text) => text.includes("Iqama Times") && text.includes("Fajr -"),
      ) ?? "",
  );
  if (!iqamaSection) {
    throw new Error("missing Iqama Times section");
  }

  const prayerMatches = Array.from(
    iqamaSection.matchAll(
      /(Fajr|Dhuhr|Asr|Maghrib|Isha)\s*-\s*([\s\S]*?)(?=(?:Fajr|Dhuhr|Asr|Maghrib|Isha)\s*-|$)/gi,
    ),
  );
  const byPrayer = new Map(
    prayerMatches.map((match) => [
      (match[1] ?? "").toLowerCase(),
      normalizeSpace(match[2] ?? ""),
    ]),
  );

  const jumaTime = util.extractTimeAmPm(
    html.match(/Fridays\s*([0-9:\sAPMapm]+)/i)?.[1],
  );
  if (!jumaTime) {
    throw new Error("missing Friday prayer time");
  }

  util.setIqamaTimes(ids[0], [
    byPrayer.get("fajr"),
    byPrayer.get("dhuhr"),
    byPrayer.get("asr"),
    byPrayer.get("maghrib"),
    byPrayer.get("isha"),
  ]);
  util.setJumaTimes(ids[0], [jumaTime]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TN/masjid-ar-rahman-islamic-association-of-greater-memphis-memphis",
  ids,
  run,
};
