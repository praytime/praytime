// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "bc15d78e-730c-4263-9aaa-b590528e1262",
    name: "Masjid An-Noor",
    url: "http://www.masjidan-noor.com/wp/",
    timeZoneId: "America/New_York",
    address: "1300 Fairfield Ave, Bridgeport, CT 06605, USA",
    placeId: "ChIJvwFUiEAO6IkRG7EVp317gbY",
    geo: {
      latitude: 41.174166,
      longitude: -73.2090302,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/CT/masjid-an-noor-bridgeport",
  ids,
};
