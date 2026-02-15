import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "aa34886a-9b83-43de-98d1-0ed3eea94f68",
    name: "ISGH Masjid Attaqwa",
    url: "http://www.masjidattaqwa.com/",
    timeZoneId: "America/Chicago",
    address: "10415 Synott Rd, Sugar Land, TX 77498, USA",
    placeId: "ChIJ67jiaGPnQIYRFXbnw4sJ3-I",
    geo: {
      latitude: 29.6653413,
      longitude: -95.6157784,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/TX/isgh-masjid-attaqwa-sugar-land",
  ids,
};
