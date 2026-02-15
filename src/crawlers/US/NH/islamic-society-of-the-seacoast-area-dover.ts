import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "6ac13287-39f6-4a8e-bfd0-f02c7a7772d3",
    name: "Islamic Society of the Seacoast area",
    url: "http://www.issa-nh.org/",
    timeZoneId: "America/New_York",
    address: "42 Dover Point Rd unit n, Dover, NH 03820, USA",
    placeId: "ChIJgw-Nu1iW4okR07MuT3gp0MI",
    geo: {
      latitude: 43.1718648,
      longitude: -70.8582303,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NH/islamic-society-of-the-seacoast-area-dover",
  ids,
};
