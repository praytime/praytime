import { createSelectorRun } from "../../../selectors";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "f1cd423f-daef-40c5-b074-18f0613b3801",
    name: "Apex Mosque",
    url: "http://www.apexmosque.org/",
    timeZoneId: "America/New_York",
    address: "733 Center St, Apex, NC 27502, USA",
    placeId: "ChIJuSIwU6aSrIkRpc40xGuB12A",
    geo: {
      latitude: 35.7296577,
      longitude: -78.8410203,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/NC/apex-mosque-apex",
  ids,
  run: createSelectorRun(ids, {
    iqama: { limit: 5, selector: ".jamah" },
    juma: { parser: "extractTimeAmPm", selector: "span.dsJumuah" },
  }),
};
