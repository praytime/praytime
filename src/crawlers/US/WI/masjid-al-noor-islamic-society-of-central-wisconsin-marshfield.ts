import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "61ed817c-48b1-40c0-872d-28280d56f21a",
    name: "Masjid Al-Noor (Islamic Society of Central Wisconsin)",
    url: "http://www.iscw.us/",
    timeZoneId: "America/Chicago",
    address: "200560 Meadow Ave N, Marshfield, WI 54449, USA",
    placeId: "ChIJLe85SIjC_4cRS2Z9RRmJn8I",
    geo: {
      latitude: 44.68918550000001,
      longitude: -90.1856849,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, "span[id$=Jamaat]");

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], ["check website"]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/WI/masjid-al-noor-islamic-society-of-central-wisconsin-marshfield",
  ids,
  run,
};
