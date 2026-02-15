import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "ce09a6f4-d90b-478b-9ec8-c54bf8caf455",
    name: "Omar Mosque",
    url: "http://facebook.com/masjidomarnj",
    timeZoneId: "America/New_York",
    address: "501 Getty Ave, Paterson, NJ 07503, USA",
    placeId: "ChIJpyuNZZn-wokRdOJyMMGiNnw",
    geo: {
      latitude: 40.89096069999999,
      longitude: -74.1527176,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NJ/omar-mosque-paterson",
  ids,
};
