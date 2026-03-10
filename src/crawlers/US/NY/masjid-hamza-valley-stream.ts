import { createSelectorRun } from "../../../selectors";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "5c651bdd-fdb9-4ab6-b4cd-eba5ea425cec",
    name: "Masjid Hamza",
    url: "https://www.masjidhamza.com/",
    timeZoneId: "America/New_York",
    address: "202 Stuart Ave, Valley Stream, NY 11580, USA",
    placeId: "ChIJs8LPRY5jwokRNNJagxfUY3E",
    geo: {
      latitude: 40.6857947,
      longitude: -73.7162058,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/NY/masjid-hamza-valley-stream",
  ids,
  run: createSelectorRun(ids, {
    iqama: {
      removeIndexes: [1],
      selector: ".dptTimetable td:last-child",
    },
    mode: "setTimes",
  }),
};
