// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "771275f5-0c18-4001-bf8f-85176a609e50",
    name: "Noor Unity Center",
    url: "http://noorunitycenter.org/",
    timeZoneId: "America/Detroit",
    address: "2776 Flushing Rd, Flint, MI 48504, USA",
    placeId: "ChIJQZvik_KCI4gROPoWsrwHudM",
    geo: {
      latitude: 43.02411439999999,
      longitude: -83.72954159999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MI/noor-unity-center-flint",
  ids,
};
