import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "0318c08d-a87e-4869-8318-83446e721692",
    name: "Muslim Center Masjid",
    url: "https://muslimcenterdetroit.com/",
    timeZoneId: "America/Detroit",
    address: "1605 Davison Fwy, Detroit, MI 48238, USA",
    placeId: "ChIJ4wICC7rNJIgRzvzW6PCwuaU",
    geo: {
      latitude: 42.3966108,
      longitude: -83.1109476,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MI/muslim-center-masjid-detroit",
  ids,
};
