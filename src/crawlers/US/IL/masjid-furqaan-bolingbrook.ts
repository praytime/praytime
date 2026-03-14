import { createDptTimetableRun } from "../../../dpt";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "3a8fc827-c9b5-496f-acc2-296268a3e980",
    name: "Masjid Furqaan",
    url: "https://bolingbrook.masjidfurqaan.org/",
    timeZoneId: "America/Chicago",
    address: "401 W Boughton Rd, Bolingbrook, IL 60440, USA",
    placeId: "ChIJJbNIRyJbDogRXZVVB0lQREw",
    geo: {
      latitude: 41.7066122,
      longitude: -88.0835115,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/IL/masjid-furqaan-bolingbrook",
  ids,
  run: createDptTimetableRun(ids, ids[0].url, {
    errorContext: "Masjid Furqaan Bolingbrook homepage",
    jumaSelector: ".dsJumuah, .dsJumuah-vertical",
    jumaTextFallbackSelector: 'h1:contains("Jumu\'ah Khutba")',
  }),
};
