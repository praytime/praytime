import { createSelectorRun } from "../../../selectors";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "afae23dc-56dc-4ed7-9393-f782c7e13d6b",
    name: "Islamic Center of Hawthorne",
    url: "https://www.ichla.online/",
    timeZoneId: "America/Los_Angeles",
    address: "12209 Hawthorne Way, Hawthorne, CA 90250, USA",
    placeId: "ChIJL1hpkYO2woARA9PulLUU09g",
    geo: {
      latitude: 33.92168049999999,
      longitude: -118.353775,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/CA/islamic-center-of-hawthorne-hawthorne",
  ids,
  run: createSelectorRun(ids, {
    iqama: { limit: 5, selector: ".jamah" },
    juma: {
      parser: "matchTimeAmPmG",
      selector: 'h6:contains("Khutbah")',
    },
  }),
};
