// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "193f57e0-cab5-43a2-bb9f-e87ccd292ce5",
    name: "Islamic Cultural Center Riverside Drive",
    url: "https://icc-ny.us/",
    timeZoneId: "America/New_York",
    address: "1 Riverside Dr, New York, NY 10023, USA",
    placeId: "ChIJsxvZLmJYwokRAMsZaNGZzXU",
    geo: {
      latitude: 40.7804337,
      longitude: -73.98527229999999,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, ".jamah");
  const j = util
    .mapToText($, 'li:contains("Kutbah")')
    .map((t) => t.match(/\d+:\d+\s*\w+/g).shift());

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], j);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NY/islamic-cultural-center-riverside-drive-new-york",
  ids,
  run,
};
