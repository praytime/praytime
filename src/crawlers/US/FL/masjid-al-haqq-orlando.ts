import { createMawaqitMobileRun } from "../../../mawaqit";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "0cc8834d-c32b-4228-9a78-6a798a8e2aff",
    name: "Masjid Al-Haqq",
    url: "http://iscf.org/masjid/masjid-al-haq/",
    timeZoneId: "America/New_York",
    address: "545 W Central Blvd, Orlando, FL 32801, USA",
    placeId: "ChIJc-Co_1R654gRvdYso_a8G2E",
    geo: {
      latitude: 28.5422285,
      longitude: -81.386837,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/FL/masjid-al-haqq-orlando",
  ids,
  run: createMawaqitMobileRun(ids, "alhaq-orlando-florida"),
};
