// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "f9d2894e-cf77-43e7-86cc-d5f58323477d",
    name: "Islamic Society of Midwest",
    url: "http://islamicsom.org/",
    timeZoneId: "America/Chicago",
    address: "501 Midway Dr, Mt Prospect, IL 60056, USA",
    placeId: "ChIJXRQ2B9qwD4gRYtTJ-nKIIdA",
    geo: {
      latitude: 42.025141,
      longitude: -87.9431469,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = ["Fajr:", "Zuhr:", "Asr:", "Magrib:", "Isha:"].map((s) =>
    util.mapToText($, `span:contains("${s}")`).shift().replace(s, "").trim(),
  );

  // const j = util.mapToText($, 'span:contains("Jumuah")')

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], ["check website"]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/islamic-society-of-midwest-mt-prospect",
  ids,
  run,
};
