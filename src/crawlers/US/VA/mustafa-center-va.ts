import { createMasjidAppRun } from "../../../masjidapp";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "8e294bc2-57f9-4b3a-b20e-6ade87654241",
    name: "Mustafa Center",
    url: "http://www.mustafacenter.org/",
    address: "6844 Braddock Rd, Annandale, VA 22003, USA",
    timeZoneId: "America/New_York",
    placeId: "ChIJufAZgdCyt4kRRs3ejdgPBDQ",
    geo: {
      latitude: 38.812529,
      longitude: -77.183281,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/VA/mustafa-center-va",
  ids,
  run: createMasjidAppRun(ids, {
    prayerUrl: "https://themasjidapp.net/7772/prayers",
    requireJuma: true,
  }),
};
