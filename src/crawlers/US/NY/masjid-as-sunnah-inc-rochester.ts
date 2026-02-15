import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "a4a40bbd-131b-4e78-82a6-35f79fdaec01",
    name: "Masjid As-Sunnah Inc",
    url: "http://www.msrny.org/",
    timeZoneId: "America/New_York",
    address: "494 N Goodman St, Rochester, NY 14609, USA",
    placeId: "ChIJQamIlZe11okRE2jbbSNfsVM",
    geo: {
      latitude: 43.1628283,
      longitude: -77.58296539999999,
    },
  },
];
const run = async () => {
  const $ = await util.load(
    "http://fiveprayers.org/display/index.php?id=MasjidSunnah",
  );

  const a = util.mapToText($, "td[id$=Iq]");
  const j = util.mapToText($, "td#fdp");

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], j);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NY/masjid-as-sunnah-inc-rochester",
  ids,
  run,
};
