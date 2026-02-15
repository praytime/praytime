import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "94265ac9-b99c-475f-a385-c8a3e1b6905e",
    name: "Masjid As-Saber",
    url: "http://www.assaber.com/",
    timeZoneId: "America/Los_Angeles",
    address: "10323 SW 43rd Ave, Portland, OR 97219, USA",
    placeId: "ChIJGx6EHGALlVQRCfVJpo8LraM",
    geo: {
      latitude: 45.4516421,
      longitude: -122.7220092,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util
    .mapToText($, ".salah td:last-child")
    .filter(util.matchTimeAmPm);
  a.splice(1, 1); // remove sunrise

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], ["check website"]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/OR/masjid-as-saber-portland",
  ids,
  run,
};
