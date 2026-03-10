import { createSelectorRun } from "../../../selectors";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "affcc172-c74d-4ed4-94c1-7d805a19c662",
    name: "Masjid Al-Madinah",
    url: "http://www.udicpa.org/",
    timeZoneId: "America/New_York",
    address: "201 S 69th St, Upper Darby, PA 19082, USA",
    placeId: "ChIJmRNEKDDBxokR_1LdkRv7moc",
    geo: {
      latitude: 39.9563371,
      longitude: -75.2575409,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/PA/masjid-al-madinah-upper-darby",
  ids,
  run: createSelectorRun(ids, {
    iqama: { limit: 5, selector: ".jamah" },
    juma: {
      parser: "extractTimeAmPm",
      selector: 'th:contains("Jumuah")',
    },
  }),
};
