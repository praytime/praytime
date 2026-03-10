import { createSelectorRun } from "../../../selectors";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "12274a9a-4d61-4239-ba86-1c46bd12dc19",
    name: "MECCA Center",
    url: "https://meccacenter.org/",
    address: "16W560 91st Street, Willowbrook, IL 60527, USA",
    placeId: "ChIJuwioielFDogRbf6JF65FuZk",
    timeZoneId: "America/Chicago",
    geo: {
      latitude: 41.724164,
      longitude: -87.948055,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/IL/mecca-center",
  ids,
  run: createSelectorRun(ids, {
    iqama: { selector: "table.dptTimetable td.jamah" },
    juma: {
      parser: "matchTimeAmPmG",
      selector: 'div.wpb_wrapper > p:contains("Jumuah")',
    },
  }),
};
