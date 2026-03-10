import { createSelectorRun } from "../../../selectors";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "b94dd720-c2da-4261-8086-ee141fb49f05",
    name: "Masjid Al-Baqi (Muslims On Long Island Inc)",
    url: "http://www.masjidalbaqi.org/",
    timeZoneId: "America/New_York",
    address: "320 Central Ave, Bethpage, NY 11714, USA",
    placeId: "ChIJvVJ6nBaAwokRk13sHZePyEQ",
    geo: {
      latitude: 40.7388553,
      longitude: -73.4823182,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/NY/masjid-al-baqi-muslims-on-long-island-inc-bethpage",
  ids,
  run: createSelectorRun(ids, {
    iqama: {
      removeIndexes: [1],
      selector: ".dptTimetable td:last-child",
    },
    juma: {
      filterPattern: /\d{1,2}:\d{1,2}\s+(a|p)m/i,
      parser: "extractTimeAmPm",
      selector: ".elementor-row > div:nth-child(2)",
    },
  }),
};
