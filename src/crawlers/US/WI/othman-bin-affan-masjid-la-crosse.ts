import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "a6d9c464-d29e-4b18-bb14-0f1b08adcdda",
    name: "Othman bin Affan Masjid",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DOthman+bin+Affan+Masjid\u0026query_place_id\u003DChIJzy9HAflU-YcRUXwdawU9MWk",
    timeZoneId: "America/Chicago",
    address: "206 Rose St, La Crosse, WI 54603, USA",
    placeId: "ChIJzy9HAflU-YcRUXwdawU9MWk",
    geo: {
      latitude: 43.8293109,
      longitude: -91.24783790000001,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/WI/othman-bin-affan-masjid-la-crosse",
  ids,
};
