// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "64978f32-c063-4416-ab84-36a52f308d6b",
    name: "Islamic Center of Irvine (ICOI)",
    url: "https://www.icoi.net/",
    timeZoneId: "America/Los_Angeles",
    address: "2 Truman St, Irvine, CA 92620, USA",
    placeId: "ChIJNVTpRuHc3IARdx02VBD1vXg",
    geo: {
      latitude: 33.6965312,
      longitude: -117.7655458,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, "td.timetd:last-child");
  a.splice(1, 1); // remove sunrise
  const j = util
    .mapToText($, ".prayer-time-row3")[0]
    .match(/\d{1,2}\s*:\s*\d{1,2}/g);

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], j);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/CA/islamic-center-of-irvine-icoi-irvine",
  ids,
  run,
};
