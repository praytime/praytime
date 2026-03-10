import { createMawaqitMobileRun } from "../../../mawaqit";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "0d07282b-2ffb-4f0b-86ee-e50a120a58ab",
    name: "Masjid Al-Aziz",
    url: "https://iscf.org/masjid/masjid-al-azziz/",
    timeZoneId: "America/New_York",
    address: "9501 Satellite Blvd, Orlando, FL 32837, USA",
    placeId: "ChIJtWEaKJR954gRj9VT_II9-rI",
    geo: {
      latitude: 28.420543,
      longitude: -81.400534,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/FL/masjid-al-aziz-orlando",
  ids,
  run: createMawaqitMobileRun(ids, "ma-alaziz-orlando-florida"),
};
