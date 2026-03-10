import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "ec38b9ab-8b65-4b81-ab67-89c434fd1407",
    name: "Masjid Haqq",
    url: "http://www.masjidhaqq.org",
    address: "1620 S Highland, Lombard, IL 60148, USA",
    placeId: "ChIJzenX43dSDogRqs8NAk0mFOY",
    timeZoneId: "America/Chicago",
    geo: {
      latitude: 41.851883,
      longitude: -88.012403,
    },
    fajrIqama: "check website",
    zuhrIqama: "check website",
    asrIqama: "check website",
    maghribIqama: "check website",
    ishaIqama: "check website",
    juma1: "check website",
  },
];
// ChIJCRyh63dSDogRGYvZ9jdS8zk
// ChIJCRyh63dSDogRYuFT6JDAcLM

export const crawler: CrawlerModule = {
  name: "US/IL/masjid-haqq-lombard",
  ids,
  run: createMasjidalRun(ids, "8K9OvEAp", { jumaCount: 2 }),
};
