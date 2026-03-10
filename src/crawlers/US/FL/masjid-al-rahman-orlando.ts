import { createMawaqitMobileRun } from "../../../mawaqit";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "2322e846-7b5b-4fcb-a39f-d81879984a98",
    name: "Masjid Al-Rahman",
    url: "http://iscf.org/masjid/masjid-al-rahman/",
    timeZoneId: "America/New_York",
    address: "1089 N Goldenrod Rd, Orlando, FL 32807, USA",
    placeId: "ChIJDZ9OJJhl54gRNGv6Qwl8JVw",
    geo: {
      latitude: 28.5580639,
      longitude: -81.2834484,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/FL/masjid-al-rahman-orlando",
  ids,
  run: createMawaqitMobileRun(ids, "alrahman-Orlando-florida"),
};
