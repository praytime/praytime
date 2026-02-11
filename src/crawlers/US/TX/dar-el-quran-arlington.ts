// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "ac937393-914a-4068-9912-f719e8c4412f",
    name: "Dar El Quran",
    url: "https://www.darelquran.org/",
    timeZoneId: "America/Chicago",
    address: "331 Aaron Ave #139, Arlington, TX 76012, USA",
    placeId: "ChIJY4gTGvl8ToYRZ_gG3qeOng0",
    geo: {
      latitude: 32.73714770000001,
      longitude: -97.1431657,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/TX/dar-el-quran-arlington",
  ids,
};
