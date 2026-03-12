import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "ab08ee23-74eb-491c-8d72-03811fc43033",
    name: "MCC - Muslim Community Center Charlotte",
    url: "http://charlottemcc.org/",
    timeZoneId: "America/New_York",
    address: "3116 Johnston Oehler Rd, Charlotte, NC 28269, USA",
    placeId: "ChIJm-jmmlQdVIgRfmMdLIMwSnQ",
    geo: {
      latitude: 35.364043,
      longitude: -80.7598536,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/NC/mcc-muslim-community-center-charlotte-charlotte",
  ids,
  run: createMasjidalRun(ids, "xdyqvadX", { jumaCount: 2 }),
};
