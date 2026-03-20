import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "1ec2b745-e99f-4fc9-8041-47af041b05b6",
    name: "Baitul Mamoor Jam-E-Masjid",
    url: "https://www.google.com/maps/search/?api=1&query=Baitul+Mamoor+Jam-E-Masjid&query_place_id=ChIJaTtDJ3YN04kRWJbg-caT1pk",
    timeZoneId: "America/New_York",
    address: "64 Titus Ave, Buffalo, NY 14212, USA",
    placeId: "ChIJaTtDJ3YN04kRWJbg-caT1pk",
    geo: {
      latitude: 42.89788060000001,
      longitude: -78.82305389999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/baitul-mamoor-jam-e-masjid-buffalo",
  ids,
};
