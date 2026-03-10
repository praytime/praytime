import { createMohidWidgetRun } from "../../../mohid";
import type { CrawlerModule } from "../../../types";

const PRAYER_WIDGET_URL = "https://us.mohid.co/il/nwcs/isnschicago";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "c295f191-1796-45a5-8f07-bc7e6d62c302",
    name: "Islamic Society of Northwest Suburbs",
    url: "http://www.isns.org/",
    address: "3950 Industrial Ave, Rolling Meadows, IL 60008, USA",
    placeId: "ChIJj84qIiKlD4gRhLA-MMcAnAw",
    timeZoneId: "America/Chicago",
    geo: {
      latitude: 42.096069,
      longitude: -88.031134,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/IL/isns-rolling-meadows",
  ids,
  run: createMohidWidgetRun(ids, PRAYER_WIDGET_URL, { jumaLimit: 2 }),
};
