import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "001209ab-299c-4344-888a-fe585303ecf5",
    name: "Masjid Wali Muhammad",
    url: "http://www.historicmwm.com/",
    timeZoneId: "America/Detroit",
    address: "11529 Linwood St, Detroit, MI 48206, USA",
    placeId: "ChIJi4BWBAfNJIgRRtB8JNrcdfk",
    geo: {
      latitude: 42.3817139,
      longitude: -83.1146545,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MI/masjid-wali-muhammad-detroit",
  ids,
};
