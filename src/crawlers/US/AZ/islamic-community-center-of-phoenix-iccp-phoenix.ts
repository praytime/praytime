import { createPrayersConnectRun } from "../../../prayersconnect";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "bd4616b0-c6ef-417c-a67d-4f5281cff623",
    name: "Islamic Community Center of Phoenix (ICCP)",
    url: "https://iccpaz.com/",
    timeZoneId: "America/Phoenix",
    address: "7516 N Black Canyon Hwy, Phoenix, AZ 85051, USA",
    placeId: "ChIJBzqIZOlsK4cRR_iH3ORhpBs",
    geo: {
      latitude: 33.546548,
      longitude: -112.1128445,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/AZ/islamic-community-center-of-phoenix-iccp-phoenix",
  ids,
  run: createPrayersConnectRun(ids, {
    mosqueId: 84028168,
  }),
};
