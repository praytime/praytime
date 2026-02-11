// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "b051bf9f-c64e-4a72-a725-a1970ea81e73",
    name: "Masjid Omar ibn Al-Khattab",
    url: "http://omarfoundation.com/",
    timeZoneId: "America/Los_Angeles",
    address: "1025 W Exposition Blvd, Los Angeles, CA 90007, USA",
    placeId: "ChIJ2TILPvzHwoARHAcQW0V8D-s",
    geo: {
      latitude: 34.01860630000001,
      longitude: -118.2924531,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, ".jamah");

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], ["check website"]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/CA/masjid-omar-ibn-al-khattab-los-angeles",
  ids,
  run,
};
