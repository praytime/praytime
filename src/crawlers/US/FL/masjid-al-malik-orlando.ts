import { createMawaqitMobileRun } from "../../../mawaqit";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "6c6ab0f1-f8c2-4b96-a5c8-7d3c8faad8dd",
    name: "Masjid Al-Malik",
    url: "https://iscf.org/masjid/masjid-al-malik/",
    timeZoneId: "America/New_York",
    address: "2018 Rouse Rd, Orlando, FL 32817, USA",
    placeId: "ChIJhYetIidm54gR4jDKvzFk6OU",
    geo: {
      latitude: 28.5732199,
      longitude: -81.2247321,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/FL/masjid-al-malik-orlando",
  ids,
  run: createMawaqitMobileRun(ids, "almalik-orlando-florida"),
};
