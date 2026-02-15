import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "1d446b8a-493d-4f65-9239-ac6b94b0abb1",
    name: "Masjid Hazrati Abu Bakr Siddique",
    url: "http://masjid-abubakr.org/",
    timeZoneId: "America/New_York",
    address: "14147 33rd Ave, Flushing, NY 11354, USA",
    placeId: "ChIJL7xwPRxgwokR9iI9uNcwT-g",
    geo: {
      latitude: 40.7683639,
      longitude: -73.8250889,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/masjid-hazrati-abu-bakr-siddique-queens",
  ids,
};
