import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "cf21fb8f-d855-491a-aaee-3d1ef0ed0386",
    name: "Salem Islamic Center",
    url: "http://www.facebook.com/SalemIslamicCenter",
    timeZoneId: "America/Los_Angeles",
    address: "3215 Fisher Rd NE, Salem, OR 97305, USA",
    placeId: "ChIJ_TvDGG_-v1QRobn4jNtUJgE",
    geo: {
      latitude: 44.9660427,
      longitude: -122.9889662,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/OR/salem-islamic-center-salem",
  ids,
};
