import { createSelectorRun } from "../../../selectors";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "94265ac9-b99c-475f-a385-c8a3e1b6905e",
    name: "Masjid As-Saber",
    url: "http://www.assaber.com/",
    timeZoneId: "America/Los_Angeles",
    address: "10323 SW 43rd Ave, Portland, OR 97219, USA",
    placeId: "ChIJGx6EHGALlVQRCfVJpo8LraM",
    geo: {
      latitude: 45.4516421,
      longitude: -122.7220092,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/OR/masjid-as-saber-portland",
  ids,
  run: createSelectorRun(ids, {
    iqama: {
      filterPattern: /\d{1,2}\s*:\s*\d{1,2}\s*(a|p)m/i,
      parser: "extractTimeAmPm",
      removeIndexes: [1],
      selector: ".salah td:last-child",
    },
    jumaDefault: ["check website"],
  }),
};
