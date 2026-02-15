import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "5e450aef-5957-461a-9fce-985b3bd54208",
    name: "The Islamic Community Center of Illinois",
    url: "https://iccicenter.org/",
    address: "6435 W Belmont Ave, Chicago, IL 60634, USA",
    timeZoneId: "America/Chicago",
    placeId: "ChIJh-pGXp3LD4gRMAa70sL98Cw",
    geo: {
      latitude: 41.938004,
      longitude: -87.787551,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText(
    $,
    "table.dptTimetable th.prayerName ~ td:last-child",
  );
  a.splice(1, 1); // remove sunrise
  util.setIqamaTimes(ids[0], a);

  ids[0].juma1 = "check website";

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/icci-chicago",
  ids,
  run,
};
