import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "18b8ee72-9671-4b71-b2b1-c5bed1fc262d",
    name: "Masjid E Abu Huraira",
    url: "http://www.masjidabuhuraira.org/",
    timeZoneId: "America/Chicago",
    address: "530 55901, 538 6th Ave NW, Rochester, MN 55901, USA",
    placeId: "ChIJwYO0nHdf94cR9R0Yg2cQRaY",
    geo: {
      latitude: 44.0292156,
      longitude: -92.47077379999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MN/masjid-e-abu-huraira-rochester",
  ids,
};
