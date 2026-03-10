import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "bd62178a-93e1-4dc7-959a-d6c73bf90260",
    name: "Pullman Islamic Center",
    url: "https://www.pullmanislamicassociation.org/",
    timeZoneId: "America/Los_Angeles",
    address: "1155 NE Stadium Way, Pullman, WA 99163, USA",
    placeId: "ChIJZfQNpOKGn1QRoMsP5HpvJWY",
    geo: {
      latitude: 46.7370429,
      longitude: -117.1656464,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/WA/pullman-islamic-center-pullman",
  ids,
  run: createMasjidalRun(ids, "PAPwXrLJ"),
};
