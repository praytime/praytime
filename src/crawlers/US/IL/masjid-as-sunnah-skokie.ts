import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "7e648216-8f92-4400-8959-095048c1b165",
    name: "Masjid As-Sunnah",
    url: "https://masjidsunnahchi.org/",
    timeZoneId: "America/Chicago",
    address: "5144 Main St, Skokie, IL 60077, USA",
    placeId: "ChIJBZXmgBXPD4gRYUQdqdMNii4",
    geo: {
      latitude: 42.033847,
      longitude: -87.75652199999999,
    },
  },
];
const run = async () => {
  const d = await util.loadJson("https://masjidsunnahchi.org/api/prayers");
  // [
  //   {
  //     "_id": "5f6ee34c63f9807c64d7c560",
  //     "name": "Fajr",
  //     "time": "6:00 AM",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "5f6ee35163f9807c64d7c561",
  //     "name": "Dhuhr",
  //     "time": "12:30 PM",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "5f6ee35a63f9807c64d7c562",
  //     "name": "Asr",
  //     "time": "2:45 PM",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "5f6ee36163f9807c64d7c563",
  //     "name": "Maghrib",
  //     "time": "SUNSET",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "5f6ee36b63f9807c64d7c564",
  //     "name": "Isha",
  //     "time": "7:00 PM",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "5f6f80aed86367b2103876d1",
  //     "name": "Jumu'ah",
  //     "time": "1:00 PM",
  //     "__v": 0
  //   }
  // ]

  type PrayerTime = {
    name: string;
    time: string;
  };

  const prayerTimes = d as unknown as PrayerTime[];
  const getTime = (name: string): string => {
    return (
      prayerTimes.find((entry: PrayerTime) => entry.name === name)?.time ??
      "check website"
    );
  };

  util.setTimes(ids[0], [
    getTime("Fajr"),
    getTime("Dhuhr"),
    getTime("Asr"),
    getTime("Maghrib"),
    getTime("Isha"),
    getTime("Jumu'ah"),
  ]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/masjid-as-sunnah-skokie",
  ids,
  run,
};
