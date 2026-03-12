import { createMasjidBoxRun } from "../../../masjidbox";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "af74625a-0866-4ecb-b012-db6042b4181c",
    name: "Islamic Association of Cincinnati",
    url: "http://cliftonmosque.org/",
    timeZoneId: "America/New_York",
    address: "3668 Clifton Ave, Cincinnati, OH 45220, USA",
    placeId: "ChIJdzCM9IGzQYgRsKTEW4oSAK0",
    geo: {
      latitude: 39.1493373,
      longitude: -84.518059,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/OH/islamic-association-of-cincinnati-cincinnati",
  ids,
  run: createMasjidBoxRun(
    ids,
    "https://masjidbox.com/prayer-times/islamic-association-of-cincinnati",
  ),
};
