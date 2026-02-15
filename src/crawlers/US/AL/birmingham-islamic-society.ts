import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "5b1a790c-6196-4167-bbc2-c4805d36b57f",
    name: "BIS Hoover Crescent Islamic Center",
    url: "http://www.bisweb.org/",
    timeZoneId: "America/Chicago",
    address: "2524 Hackberry Ln, Hoover, AL 35226, USA",
    placeId: "ChIJBUme07cYiYgRLCMgPiCRm1A",
    geo: {
      latitude: 33.4194263,
      longitude: -86.8147379,
    },
  },
  {
    uuid4: "7a4f54e7-9cd2-433a-b138-d9b09c8822e0",
    name: "BIS Homewood Masjid",
    url: "http://bisweb.org/",
    timeZoneId: "America/Chicago",
    address: "1810 25th Ct S, Homewood, AL 35209, USA",
    placeId: "ChIJ_cdM_dcbiYgR41tVxlc8LGI",
    geo: {
      latitude: 33.4866287,
      longitude: -86.79153219999999,
    },
  },
  {
    uuid4: "2de1ebd8-14d0-46f5-b43f-9821313abb12",
    name: "BIS West Side Masjid",
    url: "http://www.bisweb.org/",
    timeZoneId: "America/Chicago",
    address: "4506 Gary Ave, Fairfield, AL 35064, USA",
    placeId: "ChIJAXdiBx3iiIgRWIgikPBAjwc",
    geo: {
      latitude: 33.4921688,
      longitude: -86.9149705,
    },
  },
];

// prayer time:
// {
//   "Masjid": "HOMEWOOD",
//   "Month": 12,
//   "StartDay": 11,
//   "EndDay": 20,
//   "Fajr": "6:00",
//   "Duhr": "1:05",
//   "Asr": "3:30",
//   "Maghrib": "4:50",
//   "Isha": "8:30",
//   "Notes": "",
//   "Day": 14
// }
// juma time:
// https://beta.aleemstudio.com/api/mobile/GetNearestJumuahScheduleV3/a8aea7e2-b39b-4b54-b791-63aa9fb2446a
// {
// "12/17/2021": [
//   {
//     "masjid": "WESTSIDE",
//     "Time": "01:00",
//     "Khateeb": "Tariq  Mango",
//     "SortOrder": 50,
//     "Confirmed": 1
//   },
//   {
//     "masjid": "UAB Hospital",
//     "Time": "01:15",
//     "Khateeb": "Nasim Uddin",
//     "SortOrder": 70,
//     "Confirmed": 1
//   },
//   {
//     "masjid": "HCIC",
//     "Time": "01:00",
//     "Khateeb": "",
//     "SortOrder": "10",
//     "Confirmed": 0
//   },
//   {
//     "masjid": "HOMEWOOD",
//     "Time": "01:00",
//     "Khateeb": "",
//     "SortOrder": "30",
//     "Confirmed": 0
//   },
//   {
//     "masjid": "Sterne Library",
//     "Time": "01:15",
//     "Khateeb": "",
//     "SortOrder": "60",
//     "Confirmed": 0
//   },
//   {
//     "masjid": "Jasper",
//     "Time": "01:00",
//     "Khateeb": "",
//     "SortOrder": "90",
//     "Confirmed": 0
//   }
// ]
// }
const run = async () => {
  const da = await Promise.all([
    util.loadJson(
      util.strftime(
        "https://aleemstudio.com/MobileDeviceSupport/GetIqamahTimings?id=HOOVER&month=%m&day=%d",
        ids[0],
      ),
    ),
    util.loadJson(
      util.strftime(
        "https://aleemstudio.com/MobileDeviceSupport/GetIqamahTimings?id=HOMEWOOD&month=%m&day=%d",
        ids[1],
      ),
    ),
    util.loadJson(
      util.strftime(
        "https://aleemstudio.com/MobileDeviceSupport/GetIqamahTimings?id=WESTSIDE&month=%m&day=%d",
        ids[2],
      ),
    ),
    util.loadJson(
      "https://beta.aleemstudio.com/api/mobile/GetNearestJumuahScheduleV3/a8aea7e2-b39b-4b54-b791-63aa9fb2446a",
    ),
  ]);

  da.slice(0, 3).forEach((d, i) => {
    const record = d as {
      Fajr: string;
      Duhr: string;
      Asr: string;
      Maghrib: string;
      Isha: string;
    };
    util.setIqamaTimes(ids[i], [
      record.Fajr,
      record.Duhr,
      record.Asr,
      record.Maghrib,
      record.Isha,
    ]);
  });

  ["HCIC", "HOMEWOOD", "WESTSIDE"].forEach((name, i) => {
    const currentJumas = Object.values(
      da[3] as Record<string, { masjid: string; Time: string }>,
    );
    const juma = currentJumas.find(({ masjid }) => masjid === name);
    util.setJumaTimes(ids[i], [juma?.Time]);
  });

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/AL/birmingham-islamic-society",
  ids,
  run,
};
