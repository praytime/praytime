import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "77d6ef57-0796-4879-8f20-600de2cdaa90",
    name: "Muslim Community Center \u0026 Mosque",
    url: "https://magr.org/",
    timeZoneId: "America/Chicago",
    address: "5921 Darlene Dr, Rockford, IL 61109, USA",
    placeId: "ChIJ97qso6G4CIgR1LwZ4n0DFP8",
    geo: {
      latitude: 42.2360704,
      longitude: -89.00058489999999,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const pt = $('span:contains("Jamaat Prayer Times")').closest("table");
  const rows: string[][] = [];
  for (const row of pt.find("tr").toArray()) {
    const cells = util
      .mapToText($, "td", row)
      .map(util.normalizeSpace)
      .filter((value) => value.length > 0);
    if (cells.length >= 2) {
      rows.push(cells);
    }
  }

  const byLabel = new Map(
    rows.map((cells) => [cells[0]?.toLowerCase() ?? "", cells[1] ?? ""]),
  );

  util.setIqamaTimes(ids[0], [
    byLabel.get("fajr"),
    byLabel.get("zuhr"),
    byLabel.get("asr"),
    byLabel.get("maghrib"),
    byLabel.get("isha"),
  ]);
  util.setJumaTimes(ids[0], [
    byLabel.get("friday salat 1st"),
    byLabel.get("friday salat 2nd"),
  ]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/muslim-community-center-and-mosque-rockford",
  ids,
  run,
};
