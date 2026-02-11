// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "12274a9a-4d61-4239-ba86-1c46bd12dc19",
    name: "MECCA Center",
    url: "https://meccacenter.org/",
    address: "16W560 91st Street, Willowbrook, IL 60527, USA",
    placeId: "ChIJuwioielFDogRbf6JF65FuZk",
    timeZoneId: "America/Chicago",
    geo: {
      latitude: 41.724164,
      longitude: -87.948055,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  util.setIqamaTimes(ids[0], util.mapToText($, "table.dptTimetable td.jamah"));

  const j = util
    .mapToText($, 'div.wpb_wrapper > p:contains("Jumuah")')
    .map((t) => t.match(/\d+\s*:\s*\d+\s*\w+/g)[0]);
  util.setJumaTimes(ids[0], j);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/mecca-center",
  ids,
  run,
};
