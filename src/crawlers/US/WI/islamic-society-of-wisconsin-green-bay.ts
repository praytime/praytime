import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "7dfe4ba3-f9b7-4e54-b987-a7694d524fa8",
    name: "Islamic Society of Wisconsin",
    url: "https://www.facebook.com/pages/Islamic%20Society%20of%20Wisconsin,%20Green%20Bay%20Masjid/131775646993977/",
    timeZoneId: "America/Chicago",
    address: "1512 Velp Ave, Green Bay, WI 54303, USA",
    placeId: "ChIJbbhlGmTwAogRnIW1rBWFA00",
    geo: {
      latitude: 44.54705149999999,
      longitude: -88.0450579,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/WI/islamic-society-of-wisconsin-green-bay",
  ids,
};
