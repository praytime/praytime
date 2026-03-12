import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "6eede83a-e067-4743-a192-25fa1221c34b",
    name: "Nurul-Iman masjid and institute",
    url: "https://nuuruliimaan.net/",
    timeZoneId: "America/Chicago",
    address: "2222 Park Ave, Minneapolis, MN 55404, USA",
    placeId: "ChIJ2VB2MmIts1IRXlCMEWT2Nl4",
    geo: {
      latitude: 44.96025119999999,
      longitude: -93.26577759999999,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);
  const rows = $("#prayer_times_table tr")
    .toArray()
    .map((row) =>
      util
        .mapToText($, "td", row)
        .map(util.normalizeSpace)
        .filter((value) => value.length > 0),
    )
    .filter((cells) => cells.length > 0);

  const byPrayer = new Map(
    rows
      .filter((cells) => cells.length >= 2)
      .map((cells) => [cells[0]?.toLowerCase() ?? "", cells.slice(1)]),
  );

  util.setIqamaTimes(ids[0], [
    byPrayer.get("fajr")?.[1],
    byPrayer.get("dhuhr")?.[1],
    byPrayer.get("asr")?.[1],
    byPrayer.get("maghrib")?.[1],
    byPrayer.get("isha")?.[1],
  ]);
  util.setJumaTimes(ids[0], [byPrayer.get("jum'a")?.[0]]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/MN/nurul-iman-masjid-and-institute-minneapolis",
  ids,
  run,
};
