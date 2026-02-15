import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "add881e6-e2f9-45f6-949b-0284e35d58c5",
    name: "Darul Islah",
    url: "http://www.darulislah.org/",
    timeZoneId: "America/New_York",
    address: "320 Fabry Terrace, Teaneck, NJ 07666, USA",
    placeId: "ChIJwyoBEDT3wokReMGrShy9IsE",
    geo: {
      latitude: 40.87159,
      longitude: -74.001451,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util
    .mapToText($, ".pr-tm-bx span:last-child")
    .map((t) => t.split("\t")[1]);

  util.setTimes(ids[0], a);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NJ/darul-islah-teaneck",
  ids,
  run,
};
