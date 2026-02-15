import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "19b51cd7-4866-4bd5-b9a0-5c0ddb3f1e0b",
    name: "South Suburban Islamic Center Of Harvey",
    url: "https://www.facebook.com/HarveyMasjid/",
    timeZoneId: "America/Chicago",
    address: "15200 Broadway Ave, Harvey, IL 60426, USA",
    placeId: "ChIJrcC6R0wiDogRltz_6KIUbdE",
    geo: {
      latitude: 41.6134259,
      longitude: -87.64505199999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/IL/south-suburban-islamic-center-of-harvey-harvey",
  ids,
};
