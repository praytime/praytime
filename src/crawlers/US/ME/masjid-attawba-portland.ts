import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "171463bf-3ae4-4faf-9f01-05b31364b63f",
    name: "Masjid Attawba",
    url: "https://www.google.com/maps/search/?api=1&query=Masjid+Attawba&query_place_id=ChIJ67U9Vu6askwRi8t_HpXFtpQ",
    timeZoneId: "America/New_York",
    address: "734 Riverside St, Portland, ME 04103, USA",
    placeId: "ChIJ67U9Vu6askwRi8t_HpXFtpQ",
    geo: {
      latitude: 43.7005908,
      longitude: -70.32243369999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/ME/masjid-attawba-portland",
  ids,
};
