import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "a6fe64ab-35ce-4e18-a985-3daa8dba59a1",
    name: "Dar Al Taqwa Islamic Center",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DDar+Al+Taqwa+Islamic+Center\u0026query_place_id\u003DChIJlbhUhiVgwokRK2dEx2XV7TY",
    timeZoneId: "America/New_York",
    address: "40-20 159th St, Flushing, NY 11358, USA",
    placeId: "ChIJlbhUhiVgwokRK2dEx2XV7TY",
    geo: {
      latitude: 40.762515,
      longitude: -73.806804,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/dar-al-taqwa-islamic-center-queens",
  ids,
};
