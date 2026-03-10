import { createSelectorRun } from "../../../selectors";
import type { CrawlerModule } from "../../../types";

const PRAYER_WIDGET_URL =
  "https://us.mohid.co/il/school/cimic/masjid/widget/api/index/?m=prayertimings";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "aa3e7e64-947c-4943-b4fc-6e5bf39b50fb",
    name: "Central Illinois Mosque and Islamic Center",
    url: "http://www.cimic.org",
    address: "106 S Lincoln Ave, Urbana, IL 61801, USA",
    placeId: "ChIJZxhDOm3XDIgRwO5K4Cbi840",
    timeZoneId: "America/Chicago",
    geo: {
      latitude: 40.111639,
      longitude: -88.218979,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/IL/cimic",
  ids,
  run: createSelectorRun(ids, {
    iqama: {
      removeIndexes: [0],
      selector: "#daily .prayer_iqama_div",
    },
    juma: {
      filterPattern: /khateeb/i,
      parser: "extractTime",
      selector: "#jummah li",
    },
    url: PRAYER_WIDGET_URL,
  }),
};
