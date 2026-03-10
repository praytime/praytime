import { createMohidWidgetRun } from "../../../mohid";
import type { CrawlerModule } from "../../../types";

const PRAYER_WIDGET_URL = "https://us.mohid.co/il/swcs/ifsvp";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "54ebe774-8fb6-4bbd-8824-fa4b0167d766",
    name: "Islamic Foundation",
    url: "http://www.islamicfoundation.org/",
    address: "300 W. Highridge Road, Villa Park, IL 60181, USA",
    timeZoneId: "America/Chicago",
    placeId: "ChIJf-nwNglNDogRCZYLGS4_dKE",
    geo: {
      latitude: 41.86793,
      longitude: -87.985824,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/IL/islamic-foundation-of-villa-park",
  ids,
  run: createMohidWidgetRun(ids, PRAYER_WIDGET_URL, { jumaLimit: 2 }),
};
