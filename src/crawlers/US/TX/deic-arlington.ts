import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "3011dcae-f2fd-49b5-b4e0-5b3bdc351a5f",
    name: "Dar El-Eman Islamic Center",
    url: "http://www.dareleman.org/",
    timeZoneId: "America/Chicago",
    address: "5511 Mansfield Rd, Arlington, TX 76017, USA",
    geo: {
      latitude: 32.65665,
      longitude: -97.136278,
    },
    placeId: "ChIJe3bVAwJjToYRxUtZ8R51FmE",
  },
];
const run = async () => {
  const $ = await util.load("http://www.dareleman.org/");

  util.setTimes(ids[0], util.mapToText($, "div.textwidget td:last-child"));

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/deic-arlington",
  ids,
  run,
};
