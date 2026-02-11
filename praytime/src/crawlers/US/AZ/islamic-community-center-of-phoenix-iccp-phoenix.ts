// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "bd4616b0-c6ef-417c-a67d-4f5281cff623",
    name: "Islamic Community Center of Phoenix (ICCP)",
    url: "http://iccpaz.com/",
    timeZoneId: "America/Phoenix",
    address: "7516 N Black Canyon Hwy, Phoenix, AZ 85051, USA",
    placeId: "ChIJBzqIZOlsK4cRR_iH3ORhpBs",
    geo: {
      latitude: 33.546548,
      longitude: -112.1128445,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, "#sidebar td:last-child");

  util.setIqamaTimes(ids[0], a);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/AZ/islamic-community-center-of-phoenix-iccp-phoenix",
  ids,
  run,
};
