import { createPrayersConnectRun } from "../../../prayersconnect";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "12575fb9-d1c0-48c0-8204-eae3e3425c16",
    name: "Islamic Circle of North America (ICNA)",
    url: "http://icnamarkaz.org/",
    timeZoneId: "America/New_York",
    address: "166-26 89th Ave, Queens, NY 11432, USA",
    placeId: "ChIJ-0gLAyBhwokRTjMvNAoDzIg",
    geo: {
      latitude: 40.708152,
      longitude: -73.794282,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/NY/islamic-circle-of-north-america-icna-queens",
  ids,
  run: createPrayersConnectRun(ids, {
    fallbackJumaTimes: ["check website", "check website"],
    mosqueId: 84033161,
  }),
};
