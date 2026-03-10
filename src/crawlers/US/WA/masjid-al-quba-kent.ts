import { createMasjidAppRun } from "../../../masjidapp";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "63bce80c-2f58-43f5-9e7b-952ec9b1abf0",
    name: "Masjid Al-Quba",
    url: "https://masjidqubawa.org/",
    timeZoneId: "America/Los_Angeles",
    address: "12608 SE 240th St, Kent, WA 98031, USA",
    placeId: "ChIJh96iy1ZfkFQRwwkOnSw-CCc",
    geo: {
      latitude: 47.3872766,
      longitude: -122.1729033,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/WA/masjid-al-quba-kent",
  ids,
  run: createMasjidAppRun(ids, {
    prayerUrl: "https://themasjidapp.net/41/prayers",
    requireJuma: true,
  }),
};
