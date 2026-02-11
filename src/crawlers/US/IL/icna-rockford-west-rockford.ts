// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "83e1e4dc-4959-4b0b-bd60-e8f7abbc10c3",
    name: "ICNA Rockford West",
    url: "http://icnarockford.org/",
    timeZoneId: "America/Chicago",
    address: "1110 Arthur Ave, Rockford, IL 61101, USA",
    placeId: "ChIJ3fh8mZGVCIgRYLatnMws--s",
    geo: {
      latitude: 42.28606149999999,
      longitude: -89.1058443,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/IL/icna-rockford-west-rockford",
  ids,
};
