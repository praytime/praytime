import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "55ed2831-a256-4ef1-80e3-231b8d85fa41",
    name: "Jamaica Muslim Center",
    url: "http://jamaicamuslimcenter.org/",
    timeZoneId: "America/New_York",
    address: "85-37 JMC Way, Jamaica, NY 11432, USA",
    placeId: "ChIJjxcp7-FgwokR0Anky0BRMJg",
    geo: {
      latitude: 40.712634,
      longitude: -73.795754,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText(
    $,
    "section#mh_display_prayer_times-2 td:last-child",
  );
  a.splice(-1, 1); // remove last

  util.setTimes(ids[0], a);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NY/jamaica-muslim-center",
  ids,
  run,
};
