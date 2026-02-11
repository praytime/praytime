// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "d6abef87-f2f3-4f90-8daa-74e2c7ba6172",
    name: "Al-Amaan Center",
    url: "http://alamaan.org/",
    timeZoneId: "America/Chicago",
    address: "5620 Smetana Dr, Minnetonka, MN 55343, USA",
    placeId: "ChIJ2yoQ9-Ih9ocRQBeJrTD1hns",
    geo: {
      latitude: 44.900831,
      longitude: -93.4049311,
    },
  },
];
const run = async () => {
  // sample:
  // [
  //   ...
  //   {
  //     "prayers": [
  //       {
  //         "name": "Fajr",
  //         "iqamah": "5:15",
  //         "azaan": "5:08"
  //       },
  //       {
  //         "name": "Arabic Jumua",
  //         "iqamah": "12:45",
  //         "azaan": "12:00"
  //       },
  //       {
  //         "name": "English Jumua",
  //         "iqamah": "13:50",
  //         "azaan": "13:15"
  //       },
  //       {
  //         "name": "Zuhr",
  //         "iqamah": "13:30",
  //         "azaan": "13:15"
  //       },
  //       {
  //         "name": "Asr",
  //         "iqamah": "17:15",
  //         "azaan": "16:59"
  //       },
  //       {
  //         "name": "Maghrib",
  //         "iqamah": "20:01",
  //         "azaan": "19:56"
  //       },
  //       {
  //         "name": "Isha",
  //         "iqamah": "21:22",
  //         "azaan": "21:22"
  //       }
  //     ],
  //     "date": "29/08/2021"
  //   }
  // ]
  const d = await util.loadJson(
    "https://rvljd7wah8.execute-api.us-east-2.amazonaws.com/Prod/prayers",
  );
  const targetDate = util.strftime("%d/%m/%Y", ids[0]);
  const { prayers: p } = d.find(({ date }) => date.trim() === targetDate);

  util.setTimes(ids[0], [
    p.find(({ name }) => name === "Fajr").iqamah,
    p.find(({ name }) => name === "Zuhr").iqamah,
    p.find(({ name }) => name === "Asr").iqamah,
    p.find(({ name }) => name === "Maghrib").iqamah,
    p.find(({ name }) => name === "Isha").iqamah,
    p.find(({ name }) => name === "Arabic Jumua").azaan,
    p.find(({ name }) => name === "English Jumua").azaan,
  ]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/MN/al-amaan-center-minnetonka",
  ids,
  run,
};
