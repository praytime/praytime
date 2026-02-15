import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "ff8745f9-0aa7-4289-a30e-301a1a775750",
    name: "Iman Islamic Complex (Masjid Mu’ath Bin Jabal)",
    url: "https://www.facebook.com/MasjidMuath/",
    timeZoneId: "America/Detroit",
    address: "6096 Dorothy St, Detroit, MI 48211, USA",
    placeId: "ChIJAXn4zk3SJIgR9rRU3sf0qJw",
    geo: {
      latitude: 42.3911842,
      longitude: -83.0401986,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MI/iman-islamic-complex-masjid-muath-bin-jabal-detroit",
  ids,
};
