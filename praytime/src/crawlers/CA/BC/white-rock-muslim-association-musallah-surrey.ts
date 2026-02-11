// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "d8ed3760-50e4-4d7e-a55d-99e6a3d93e90",
    name: "White Rock Muslim Association - Musallah",
    url: "http://www.whiterockmuslims.com/",
    timeZoneId: "America/Vancouver",
    address: "15531 24 Ave, Surrey, BC V4A 2J4, Canada",
    placeId: "ChIJBZOVnJfEhVQRz_BwbB_Da6A",
    geo: {
      latitude: 49.0470896,
      longitude: -122.7919996,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "CA/BC/white-rock-muslim-association-musallah-surrey",
  ids,
};
