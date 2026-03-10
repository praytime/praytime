import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

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
/* jscpd:ignore-start */
const run = async () => {
  const $ = await util.load(ids[0].url);

  const iqamaTimes = util
    .mapToText($, "table.dptTimetable td.jamah")
    .map(util.extractTimeAmPm)
    .slice(0, 5);
  if (iqamaTimes.length < 5 || iqamaTimes.some((time) => !time)) {
    throw new Error(
      "incomplete iqama times on Colorado Muslim Society timetable",
    );
  }

  const jumaTimes = [
    ...new Set(
      util
        .mapToText($, "table.dptTimetable .dsJumuah")
        .map(util.extractTimeAmPm)
        .filter((time) => time.length > 0),
    ),
  ];
  if (jumaTimes.length === 0) {
    throw new Error("missing Juma times on Colorado Muslim Society timetable");
  }

  util.setIqamaTimes(ids[0], iqamaTimes);
  util.setJumaTimes(ids[0], jumaTimes.slice(0, 3));

  return ids;
};
/* jscpd:ignore-end */

export const crawler: CrawlerModule = {
  name: "US/CO/masjid-abu-bakr-msjd-denver",
  ids,
  run,
};
