// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "e14cfee4-fc47-499f-9f9d-b1664ed0cca9",
    name: "Islamic Association of Raleigh (IAR)",
    url: "https://raleighmasjid.org/",
    timeZoneId: "America/New_York",
    address: "808 Atwater St, Raleigh, NC 27607, USA",
    placeId: "ChIJjRyzRrf1rIkRn4FSlLMZ2cc",
    geo: {
      latitude: 35.7898025,
      longitude: -78.69111629999999,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, ".prayertimes-day-info:last-child");
  a.splice(1, 1); // remove sunrise
  const j = util.mapToText($, ".prayerschedule-title-time");

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], j);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NC/islamic-association-of-raleigh-iar-raleigh",
  ids,
  run,
};
