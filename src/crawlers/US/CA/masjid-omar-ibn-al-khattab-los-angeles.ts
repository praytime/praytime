import { createSelectorRun } from "../../../selectors";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "b051bf9f-c64e-4a72-a725-a1970ea81e73",
    name: "Masjid Omar ibn Al-Khattab",
    url: "https://omarfoundation.com/",
    timeZoneId: "America/Los_Angeles",
    address: "1025 W Exposition Blvd, Los Angeles, CA 90007, USA",
    placeId: "ChIJ2TILPvzHwoARHAcQW0V8D-s",
    geo: {
      latitude: 34.01860630000001,
      longitude: -118.2924531,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/CA/masjid-omar-ibn-al-khattab-los-angeles",
  ids,
  run: createSelectorRun(ids, {
    iqama: { selector: ".jamah" },
  }),
};
