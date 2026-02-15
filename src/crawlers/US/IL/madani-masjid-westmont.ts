import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "2761a944-e1bc-4d85-8581-55a4d7536ce2",
    name: "Madani Masjid",
    url: "https://www.madanimasjid.org",
    address: "40 North Lincoln Street, Westmont, IL, 60559, USA",
    timeZoneId: "America/Chicago",
    placeId: "ChIJVVXlUllODogRulXf-qOuXyw",
    geo: {
      latitude: 41.797492,
      longitude: -87.977081,
    },
    juma1: "check website",
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = ["Fajr", "Dhuhr", "Asr", "Isha", "Jumah"]
    .map((s) => util.toText($, `p:contains("${s}")`))
    .map(util.extractTimeAmPm);

  a.splice(3, 0, "-"); // insert maghrib

  util.setTimes(ids[0], a);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/madani-masjid-westmont",
  ids,
  run,
};
