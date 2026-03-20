import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "ce1e972f-2517-4ac2-aa70-8a95f809c823",
    name: "Masjid Tabaq",
    url: "https://www.google.com/maps/search/?api=1&query=Masjid+Tabaq&query_place_id=ChIJF8pWgzfTD4gRUZcDO4pWuDU",
    timeZoneId: "America/Chicago",
    address: "1245 N Clybourn Ave, Chicago, IL 60610, USA",
    placeId: "ChIJF8pWgzfTD4gRUZcDO4pWuDU",
    geo: {
      latitude: 41.9047529,
      longitude: -87.6406602,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/IL/masjid-tabaq-chicago",
  ids,
};
