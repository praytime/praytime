import { createPrayersConnectRun } from "../../../prayersconnect";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "16098e7e-b111-47d9-8b9e-d03fb828becd",
    name: "Masjid Al Rahma",
    url: "http://www.mercymn.org/",
    timeZoneId: "America/Chicago",
    address: "2647 Bloomington Ave, Minneapolis, MN 55407, USA",
    placeId: "ChIJz_vvNVMts1IR5r7kNneaj00",
    geo: {
      latitude: 44.95413769999999,
      longitude: -93.25221739999999,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/MN/masjid-al-rahma-minneapolis",
  ids,
  run: createPrayersConnectRun(ids, {
    mosqueId: 84012870,
  }),
};
