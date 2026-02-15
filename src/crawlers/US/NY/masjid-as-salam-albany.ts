import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "c9f1fae4-b8e8-4bd5-86ea-86a4b7084000",
    name: "Masjid As-Salam",
    url: "http://www.assalammasjid.org/",
    timeZoneId: "America/New_York",
    address: "276 Central Ave, Albany, NY 12206, USA",
    placeId: "ChIJpfl7Y0oK3okRtyZlCC-pb-E",
    geo: {
      latitude: 42.663953,
      longitude: -73.77221399999999,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, ".prayer-list button");

  util.setTimes(ids[0], a);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NY/masjid-as-salam-albany",
  ids,
  run,
};
