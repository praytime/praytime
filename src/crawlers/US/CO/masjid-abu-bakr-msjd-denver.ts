import { createDptTimetableRun } from "../../../dpt";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "3661afd3-e4a9-4348-9481-1f5e0dbe97e6",
    name: "Masjid Abu Bakr مسجد",
    url: "https://coloradomuslimsociety.org/",
    timeZoneId: "America/Denver",
    address: "2071 S Parker Rd, Denver, CO 80231, USA",
    placeId: "ChIJh0g_UWR9bIcRj5q9KMelS-c",
    geo: {
      latitude: 39.67891520000001,
      longitude: -104.8769933,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/CO/masjid-abu-bakr-msjd-denver",
  ids,
  run: createDptTimetableRun(ids, ids[0].url, {
    errorContext: "Colorado Muslim Society timetable",
  }),
};
