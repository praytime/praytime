// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "5d6347cd-cbf0-491f-b0eb-96ddb096f45a",
    name: "Darul Arqam Center of Excellence",
    url: "http://darularqammn.com/",
    timeZoneId: "America/Chicago",
    address: "8710 Central Ave NE, Blaine, MN 55434, USA",
    placeId: "ChIJtX1tFKcls1IRG9wp0bj9E3Y",
    geo: {
      latitude: 45.1285722,
      longitude: -93.23629299999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MN/darul-arqam-center-of-excellence-blaine",
  ids,
};
