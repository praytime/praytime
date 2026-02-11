// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "cb47e785-23b2-48ae-ad84-265e90ab427d",
    name: "Masjid Alnoor Islamic Community",
    url: "http://www.masjidalnooriowa.org/",
    timeZoneId: "America/Chicago",
    address: "2110 Sager Ave, Waterloo, IA 50701, USA",
    placeId: "ChIJZy7l1e1U5YcRGmO1i9mntQk",
    geo: {
      latitude: 42.498719,
      longitude: -92.3942065,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/IA/masjid-alnoor-islamic-community-waterloo",
  ids,
};
