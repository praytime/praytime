import { createPrayersConnectRun } from "../../../prayersconnect";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "613f529b-690a-4ddb-99b4-2ddbd5121e70",
    name: "Mosque Foundation",
    url: "https://mosquefoundation.org/",
    address: "7360 W 93rd St, Bridgeview, IL 60455, USA",
    placeId: "ChIJvbna_MY5DogRXE_OTtsvkLs",
    timeZoneId: "America/Chicago",
    geo: {
      latitude: 41.722827,
      longitude: -87.802968,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/IL/mosque-foundation-bridgeview",
  ids,
  run: createPrayersConnectRun(ids, {
    loadJuma: true,
    mosqueId: 84070713,
  }),
};
