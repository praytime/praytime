import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "15c13121-0e51-4b1a-9442-ef5b8ce0fe7f",
    name: "Council of Somali Imams",
    url: "https://www.google.com/maps/search/?api=1&query=Council+of+Somali+Imams&query_place_id=ChIJZWe1sVAts1IRvbzBgQxnMGA",
    timeZoneId: "America/Chicago",
    address: "1433 E Franklin Ave, Minneapolis, MN 55404, USA",
    placeId: "ChIJZWe1sVAts1IRvbzBgQxnMGA",
    geo: {
      latitude: 44.96241200000001,
      longitude: -93.2536688,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MN/council-of-somali-imams-minneapolis",
  ids,
};
