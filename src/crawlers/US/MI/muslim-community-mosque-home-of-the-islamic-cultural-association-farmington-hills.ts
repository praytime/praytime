import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "aff2ad30-1602-4edb-a223-f2540f3fb118",
    name: "Muslim Community Mosque: Home of the Islamic Cultural Association",
    url: "https://ica-mi.org/",
    timeZoneId: "America/Detroit",
    address: "35700 W 12 Mile Rd, Farmington Hills, MI 48331, USA",
    placeId: "ChIJYdTmWhWwJIgRjT_HfCKAB7c",
    geo: {
      latitude: 42.4988203,
      longitude: -83.40092159999999,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const iqamaTimes = util
    .mapToText($, "table.dptTimetable td.jamah")
    .map(util.extractTimeAmPm)
    .slice(0, 5);
  if (iqamaTimes.length < 5 || iqamaTimes.some((time) => !time)) {
    throw new Error("incomplete iqama times on ICA Michigan timetable");
  }

  let jumaTimes = [
    ...new Set(
      util
        .mapToText($, "p strong, strong, p")
        .filter((text) => /jum[a-z]*\s+khutbah/i.test(text))
        .flatMap((text) => util.matchTimeAmPmG(text) ?? []),
    ),
  ];
  if (jumaTimes.length === 0) {
    jumaTimes = [
      ...new Set(
        util
          .mapToText($, "table.dptTimetable .dsJumuah")
          .map(util.extractTimeAmPm)
          .filter((time) => time.length > 0),
      ),
    ];
  }
  if (jumaTimes.length === 0) {
    throw new Error("missing Juma times on ICA Michigan homepage");
  }

  util.setIqamaTimes(ids[0], iqamaTimes);
  util.setJumaTimes(ids[0], jumaTimes.slice(0, 3));

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/MI/muslim-community-mosque-home-of-the-islamic-cultural-association-farmington-hills",
  ids,
  run,
};
