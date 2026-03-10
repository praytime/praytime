import { createMohidWidgetRun } from "../../../mohid";
import type { CrawlerModule } from "../../../types";

const PRAYER_WIDGET_URL = "https://us.mohid.co/il/nwcs/icw";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "70b2e71e-dab0-417d-a8c6-80076fa141e1",
    name: "Islamic Center of Wheaton",
    url: "https://www.icwonline.org/",
    address: "900 E Geneva Rd, Wheaton, IL 60187, USA",
    timeZoneId: "America/Chicago",
    placeId: "ChIJBTAAF6FUDogRMwiFUx8max4",
    geo: {
      latitude: 41.887677,
      longitude: -88.093184,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/IL/islamic-center-of-wheaton",
  ids,
  run: createMohidWidgetRun(ids, PRAYER_WIDGET_URL, { jumaLimit: 1 }),
};
