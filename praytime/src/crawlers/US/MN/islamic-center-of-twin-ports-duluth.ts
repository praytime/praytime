// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "49dfa322-2750-4d67-8007-4ff954aadbbc",
    name: "Islamic Center of Twin Ports",
    url: "http://www.ictpmn.org/",
    timeZoneId: "America/Chicago",
    address: "145 W Winona St, Duluth, MN 55803, USA",
    placeId: "ChIJn_ksoqmtr1IR9cWBd8Ip1Ns",
    geo: {
      latitude: 46.84714289999999,
      longitude: -92.0870719,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MN/islamic-center-of-twin-ports-duluth",
  ids,
};
