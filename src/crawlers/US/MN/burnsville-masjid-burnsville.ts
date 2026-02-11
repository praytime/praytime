// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "c74a4eb7-ddb4-4494-ac82-bc1ba4b9a3f3",
    name: "Burnsville Masjid",
    url: "http://www.islamicinstituteofmn.com/",
    timeZoneId: "America/Chicago",
    address: "1351 Riverwood Dr, Burnsville, MN 55337, USA",
    placeId: "ChIJ_8_XJXUw9ocRrsTHePwkmMc",
    geo: {
      latitude: 44.785,
      longitude: -93.2555556,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MN/burnsville-masjid-burnsville",
  ids,
};
