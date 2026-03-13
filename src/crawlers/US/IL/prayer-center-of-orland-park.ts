import * as cheerio from "cheerio";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "634b264a-a2df-4335-81ba-85d65310157a",
    name: "The Prayer Center of Orland Park",
    url: "http://orlandparkprayercenter.org/",
    address: "16530 104th Ave, Orland Park, IL 60467, USA",
    placeId: "ChIJL23rVRhADogRoaVVq7Rp30o",
    timeZoneId: "America/Chicago",
    geo: {
      latitude: 41.589576,
      longitude: -87.872386,
    },
  },
];
const run = async () => {
  const response = await util.get("http://orlandparkprayercenter.org/");
  const $ = cheerio.load(response.data);

  const rows = $(".dptTimetable tr")
    .toArray()
    .map((row) =>
      $(row)
        .find("th, td")
        .toArray()
        .map((cell) => $(cell).text().trim())
        .filter(Boolean),
    );
  const findRow = (pattern: RegExp): string[] =>
    rows.find((cells) => pattern.test(cells[0] ?? "")) ?? [];
  const isFriday = util.isJumaToday(ids[0]);
  const iqama = (pattern: RegExp): string => {
    const row = findRow(pattern);
    return util.extractTimeAmPm(row.at(-1));
  };
  const jumaRow = findRow(/^jumu/i);
  const jumaTimes =
    util.matchTimeAmPmG(jumaRow.at(-1) ?? "") ??
    util.matchTimeAmPmG(findRow(/khutbah/i).join(" "));

  util.setIqamaTimes(ids[0], [
    iqama(/^fajr$/i),
    isFriday ? "Juma" : iqama(/^duh(?:r|ur)$/i),
    iqama(/^asr$/i),
    iqama(/^maghrib$/i),
    iqama(/^isha$/i),
  ]);
  util.setJumaTimes(ids[0], jumaTimes);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/prayer-center-of-orland-park",
  ids,
  run,
};
