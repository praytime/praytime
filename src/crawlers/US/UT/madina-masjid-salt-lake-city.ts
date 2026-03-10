import { createMohidWidgetRun } from "../../../mohid";
import type { CrawlerModule } from "../../../types";

const PRAYER_WIDGET_URL =
  "https://us.mohid.co/ut/saltlakecity/iscu/masjid/widget/api/index/?m=prayertimings";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "53e42a84-ef93-426c-9e88-ee15e233437e",
    name: "Madina Masjid",
    url: "http://madinaislamiccenter.org/",
    timeZoneId: "America/Denver",
    address: "1773 North Temple, Salt Lake City, UT 84116, USA",
    placeId: "ChIJp1PJuXr0UocR54uBJDdjDjY",
    geo: {
      latitude: 40.7712984,
      longitude: -111.9411984,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/UT/madina-masjid-salt-lake-city",
  ids,
  run: createMohidWidgetRun(ids, PRAYER_WIDGET_URL),
};
