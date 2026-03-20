import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "7e522ce3-54c5-4c54-9334-7cca45987903",
    name: "Masjid Al-Noor",
    url: "https://www.google.com/maps/search/?api=1&query=Masjid+Al-Noor&query_place_id=ChIJeWkdNgCzGYgRcFtwWOVAH9k",
    timeZoneId: "America/Detroit",
    address: "3206 Eastern Ave SE, Kentwood, MI 49508, USA",
    placeId: "ChIJeWkdNgCzGYgRcFtwWOVAH9k",
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
