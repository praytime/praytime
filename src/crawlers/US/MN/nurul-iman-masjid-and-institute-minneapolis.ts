// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "6eede83a-e067-4743-a192-25fa1221c34b",
    name: "Nurul-Iman masjid and institute",
    url: "https://nuuruliimaan.net/",
    timeZoneId: "America/Chicago",
    address: "2222 Park Ave, Minneapolis, MN 55404, USA",
    placeId: "ChIJ2VB2MmIts1IRXlCMEWT2Nl4",
    geo: {
      latitude: 44.96025119999999,
      longitude: -93.26577759999999,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util
    .mapToText($, "#prayer_times td:last-child")
    .filter(util.matchTimeAmPm);

  util.setTimes(ids[0], a);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/MN/nurul-iman-masjid-and-institute-minneapolis",
  ids,
  run,
};
