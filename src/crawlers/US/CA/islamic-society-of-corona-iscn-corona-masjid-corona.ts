import { createSelectorRun } from "../../../selectors";
import type { CrawlerModule } from "../../../types";

const PRAYER_WIDGET_URL =
  "https://us.mohid.co/ca/losangeles/iscn/masjid/widget/api/index/?m=prayertimings";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "e8f0a693-40f0-4468-a843-f66c146032d9",
    name: "Islamic Society of Corona ISCN Corona Masjid",
    url: "http://www.coronamuslims.com/",
    timeZoneId: "America/Los_Angeles",
    address: "465 Santana Way, Corona, CA 92881, USA",
    placeId: "ChIJ4zrGMO7H3IARexzj1nbyqUc",
    geo: {
      latitude: 33.851829,
      longitude: -117.56223,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/CA/islamic-society-of-corona-iscn-corona-masjid-corona",
  ids,
  run: createSelectorRun(ids, {
    iqama: {
      removeIndexes: [0],
      selector: ".prayer_iqama_div",
    },
    mode: "setTimes",
    url: PRAYER_WIDGET_URL,
  }),
};
