import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "7e522ce3-54c5-4c54-9334-7cca45987903",
    name: "Masjid Al-Noor",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DMasjid+Al-Noor\u0026query_place_id\u003DChIJt3WC8XazGYgRniiDQmiJQX4",
    timeZoneId: "America/Detroit",
    address: "3206 Eastern Ave SE, Kentwood, MI 49508, USA",
    placeId: "ChIJt3WC8XazGYgRniiDQmiJQX4",
    geo: {
      latitude: 42.9053607,
      longitude: -85.64622349999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MI/masjid-al-noor-kentwood",
  ids,
};
