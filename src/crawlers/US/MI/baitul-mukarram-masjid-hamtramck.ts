import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "1896fdc8-7cb1-4f4d-9dfd-24703bfb8f3d",
    name: "Baitul Mukarram Masjid",
    url: "http://baitulmukarrammasjid.org/",
    timeZoneId: "America/Detroit",
    address: "12203 Conant St, Hamtramck, MI 48212, USA",
    placeId: "ChIJlaELbOHTJIgRfRfrOxjfxL0",
    geo: {
      latitude: 42.40900119999999,
      longitude: -83.05747749999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MI/baitul-mukarram-masjid-hamtramck",
  ids,
};
