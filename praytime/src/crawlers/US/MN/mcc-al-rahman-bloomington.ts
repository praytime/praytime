// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "fa0beb8e-b015-4aee-870a-1ec4215a3d98",
    name: "MCC Al Rahman",
    url: "http://www.mccminnesota.org/",
    timeZoneId: "America/Chicago",
    address: "8910 Old Cedar Ave S #2049, Bloomington, MN 55425, USA",
    placeId: "ChIJU2b8AHgv9ocRvlmPNikY9zA",
    geo: {
      latitude: 44.8420196,
      longitude: -93.2485221,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MN/mcc-al-rahman-bloomington",
  ids,
};
