import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "50264f4b-e6eb-421e-b549-ebf02cea3368",
    name: "Islamic Center of North Fulton",
    url: "http://www.icnf.org/",
    timeZoneId: "America/New_York",
    address: "1265 Rucker Rd, Alpharetta, GA 30009, USA",
    placeId: "ChIJz4p7FVp09YgR4aDWoGo3EWY",
    geo: {
      latitude: 34.07346539999999,
      longitude: -84.3234098,
    },
  },
];
const run = async () => {
  // https://masjiddashboard.com/api/prayer/companyId/6046bc4b37e1105575a61ef0/month/1/day/26
  // {
  //   "successful": true,
  //   "message": "Prayer found.",
  //   "fieldErrors": {},
  //   "target": {
  //     "date": "2016-01-26T00:00:00.000Z",
  //     "hijriString": null,
  //     "fajr": "06:12",
  //     "fajrIqama": "06:30",
  //     "dhuhr": "12:50",
  //     "dhuhrIqama": "14:00",
  //     "asr": "15:41",
  //     "asrIqama": "16:30",
  //     "maghrib": "18:03",
  //     "maghribIqama": "5 Mins",
  //     "isha": "19:13",
  //     "ishaIqama": "20:00",
  //     "sunrise": "07:38",
  //     "fajrChange": "06:15",
  //     "fajrChangeDate": "2021-02-15T00:00:00.000Z",
  //     "dhuhrChange": null,
  //     "dhuhrChangeDate": null,
  //     "asrChange": "16:45",
  //     "asrChangeDate": "2021-02-01T00:00:00.000Z",
  //     "maghribChange": null,
  //     "maghribChangeDate": null,
  //     "ishaChange": "20:15",
  //     "ishaChangeDate": "2021-02-15T00:00:00.000Z"
  //   }
  // }
  const [d, $] = await Promise.all([
    util.loadJson(
      util.strftime(
        "https://masjiddashboard.com/api/prayer/companyId/6046bc4b37e1105575a61ef0/month/%m/day/%d",
        ids[0],
      ),
    ),
    util.load(ids[0].url),
  ]);

  util.setIqamaTimes(ids[0], [
    d.target.fajrIqama,
    d.target.dhuhrIqama,
    d.target.asrIqama,
    d.target.maghribIqama,
    d.target.ishaIqama,
  ]);

  const j = util
    .mapToText($, ".textwidget b")
    .filter((t) => t.includes("Jummah"))
    .map(util.extractTimeAmPm);

  util.setJumaTimes(ids[0], j);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/GA/islamic-center-of-north-fulton-alpharetta",
  ids,
  run,
};
