import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "a9702c36-7ec9-4ff4-a02e-0b35273665a2",
    name: "Abu-Bakar Islamic Center",
    url: "http://www.masjidabubakarpdx.com/",
    timeZoneId: "America/Los_Angeles",
    address: "2 NE 80th Ave, Portland, OR 97213, USA",
    placeId: "ChIJHV3MvwWhlVQRQekqorCcFZU", // also: ChIJLbDOvwWhlVQRUsQqSsQCFak
    geo: {
      latitude: 45.52293359999999,
      longitude: -122.5813434,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/OR/abu-bakar-islamic-center-portland",
  ids,
};
