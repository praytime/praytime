import { createPrayersConnectRun } from "../../../prayersconnect";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "718b2f2e-4e79-4e85-9774-cf7cd56a9e47",
    name: "Masjid Dar Al-Hadeeth",
    url: "https://masjiddaralhadeeth.com/",
    timeZoneId: "America/Chicago",
    address: "4809 N Elston Ave, Chicago, IL 60630, USA",
    placeId: "ChIJKYNI-qTND4gRk5oNFPplxfE",
    geo: {
      latitude: 41.9683685,
      longitude: -87.74037109999999,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/IL/masjid-dar-al-hadeeth-chicago",
  ids,
  run: createPrayersConnectRun(ids, {
    loadJuma: true,
    mosqueId: 84051255,
  }),
};
