import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "453778cf-1023-4e3f-9590-6638dc1a7ba6",
    name: "Lincoln Road Mosque",
    url: "https://www.google.com/maps/search/?api=1&query=Lincoln+Road+Mosque&query_place_id=ChIJUZGFbcAsO4gRFyWEwClt4rY",
    timeZoneId: "America/Toronto",
    address: "659 Lincoln Road, Windsor, ON N8Y 2G8, Canada",
    placeId: "ChIJUZGFbcAsO4gRFyWEwClt4rY",
    geo: {
      latitude: 42.3210808,
      longitude: -83.0157706,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "CA/ON/lincoln-road-mosque-windsor",
  ids,
};
