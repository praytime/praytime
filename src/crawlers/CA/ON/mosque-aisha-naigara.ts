// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "fd500a58-d499-4200-ad44-f27e21efb9fa",
    name: "Mosque Aisha",
    url: "https://www.mosqueaisha.ca/",
    timeZoneId: "America/Toronto",
    address: "5550 Stanley Ave, Niagara Falls, ON L2G 3X2, Canada",
    placeId: "ChIJ71IJHRVD04kRkL0WwWudsdA",
    geo: {
      latitude: 43.094015,
      longitude: -79.0848536,
    },
  },
  {
    uuid4: "ee50dc4b-837d-4bfa-a69e-be4b1e28fef8",
    name: "Mosque Aisha - Thorold",
    url: "https://www.mosqueaisha.ca/",
    timeZoneId: "America/Toronto",
    address: "70 St David St E, Thorold, ON L2V 4V4, Canada",
    placeId: "ChIJARSZy9db04kRLJMzroAk1V0",
    geo: {
      latitude: 43.1306057,
      longitude: -79.19527900000001,
    },
  },
];

// Sample API response:
// [
//   {
//     "name": "Fajr",
//     "start": "05:56",
//     "jamat": "06:30"
//   },
//   {
//     "name": "Dhuhr",
//     "start": "12:30",
//     "jamat": "13:30"
//   },
//   {
//     "name": "Asr",
//     "start": "15:20",
//     "jamat": "15:30"
//   },
//   {
//     "name": "Maghrib",
//     "start": "17:46",
//     "jamat": "18:00"
//   },
//   {
//     "name": "Isha",
//     "start": "19:05",
//     "jamat": "19:30"
//   }
// ]
const run = async () => {
  const [d, $] = await Promise.all([
    util.loadJson(
      "https://mosqueaisha.ca/api/prayerTimes/times/regular/niagara",
    ),
    util.load("https://www.mosqueaisha.ca/home/"),
  ]);

  const a = d.map((x) => x.jamat);
  a[3] = d[3].start; // use sunset for maghrib

  util.setIqamaTimesAll(ids, a);
  util.setJumaTimesAll(ids, util.mapToText($, "[id^=Jummah][id$=-iqama]"));

  return ids;
};

export const crawler: CrawlerModule = {
  name: "CA/ON/mosque-aisha-naigara",
  ids,
  run,
};
