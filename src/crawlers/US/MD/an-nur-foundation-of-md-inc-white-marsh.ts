import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "db12cfba-eb51-4fc8-bc2e-bbd3811db8ce",
    name: "An-Nur Foundation of MD Inc",
    url: "https://www.annurfoundation.org/",
    timeZoneId: "America/New_York",
    address: "10801 Philadelphia Rd, White Marsh, MD 21162, USA",
    placeId: "ChIJVbVmofTix4kRBqaV7FO-6wE",
    geo: {
      latitude: 39.38360309999999,
      longitude: -76.43090149999999,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util
    .mapToText($, "li > strong")
    .map((t) => t.replace(/^[A-Za-z]+\s*/, ""));

  util.setIqamaTimes(ids[0], a);
  // util.setJumaTimes(ids[0], j)

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/MD/an-nur-foundation-of-md-inc-white-marsh",
  ids,
  run,
};
