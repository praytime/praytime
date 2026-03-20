import { createMohidWidgetRun } from "../../../mohid";
import type { CrawlerModule } from "../../../types";

const PRAYER_WIDGET_URL = "https://us.mohid.co/il/nwcs/msi";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "f1da0fa7-6043-4f7c-b319-49ecc9fe0087",
    name: "Muslim Society Inc",
    url: "http://www.muslimsocietyinc.org/",
    address: "1785 Bloomingdale Rd., Glendale Heights, IL 60139, USA",
    placeId: "ChIJLXNcEpisD4gRdq5lUx4FvkE",
    timeZoneId: "America/Chicago",
    geo: {
      latitude: 41.9240867,
      longitude: -88.08072500000002,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/IL/muslim-society-inc-bloomingdale",
  ids,
  run: createMohidWidgetRun(ids, PRAYER_WIDGET_URL, { jumaLimit: 2 }),
};
