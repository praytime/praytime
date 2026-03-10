import { createSelectorRun } from "../../../selectors";
import type { CrawlerModule } from "../../../types";

const PRAYER_WIDGET_URL =
  "https://us.mohid.co/md/mdrgn/isb/masjid/widget/api/index/?m=prayertimings";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "6f150f06-267b-41e2-bf9a-4ac4994c42aa",
    name: "Islamic Society of Baltimore",
    url: "https://isb.org/",
    address: "6631 Johnnycake Rd, Windsor Mill, MD 21244, USA",
    timeZoneId: "America/New_York",
    placeId: "ChIJSxyR1rIeyIkRMzYEmtZyAec",
    geo: {
      latitude: 39.303512,
      longitude: -76.747874,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/MD/islamic-society-of-baltimore",
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
