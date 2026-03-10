import { createSelectorRun } from "../../../selectors";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "a3870aa1-a206-4d07-b910-a8b1b510ed2e",
    name: "Islamic Center of Brushy Creek (ICBC)",
    url: "http://icbrushycreek.org/",
    timeZoneId: "America/Chicago",
    address: "1950 Brushy Creek Rd, Cedar Park, TX 78613, USA",
    placeId: "ChIJYbTOMDEtW4YRTXizT9pl5u8",
    geo: {
      latitude: 30.5081172,
      longitude: -97.792182,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/TX/islamic-center-of-brushy-creek-icbc-cedar-park",
  ids,
  run: createSelectorRun(ids, {
    iqama: {
      removeIndexes: [1],
      selector: ".pt",
    },
    juma: {
      filterPattern: /\d{1,2}\s*:\s*\d{1,2}/,
      parser: "extractTime",
      selector: "#plansKRQ .plan h3",
    },
  }),
};
