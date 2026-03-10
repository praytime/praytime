import { createPrayerTableRun } from "../../../prayertable";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "1dd45b1c-ec70-449d-9243-b5984cc68c66",
    name: "Islamic Association of Collin County",
    url: "https://planomasjid.org",
    address: "6401 Independence Pkwy, Plano, TX 75023, USA",
    placeId: "ChIJq9bOLqciTIYRCcB6F30aiXQ",
    timeZoneId: "America/Chicago",
    geo: {
      latitude: 33.059806,
      longitude: -96.751549,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/TX/iacc-plano",
  ids,
  run: createPrayerTableRun(ids, {
    errorContext: "planomasjid.org prayer times table",
    parseJumaTimes: ({ iqamaText }) => util.matchTimeAmPmG(iqamaText) ?? [],
    tableSelector: "div.prayer-times table",
  }),
};
