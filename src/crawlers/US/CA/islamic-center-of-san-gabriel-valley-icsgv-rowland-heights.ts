import { createMasjidAppRun } from "../../../masjidapp";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "1b263d44-0d3c-4e51-8ef8-292a43cca1f9",
    name: "Islamic Center of San Gabriel Valley (ICSGV)",
    url: "http://www.icsgv.com/",
    timeZoneId: "America/Los_Angeles",
    address: "19164 E Walnut Dr N, Rowland Heights, CA 91748, USA",
    placeId: "ChIJW0yKg1Yqw4ARE3w2TXosuPE",
    geo: {
      latitude: 33.9949473,
      longitude: -117.8846553,
    },
  },
];

const PRAYER_IFRAME_URL = "https://themasjidapp.org/296/prayers";

export const crawler: CrawlerModule = {
  name: "US/CA/islamic-center-of-san-gabriel-valley-icsgv-rowland-heights",
  ids,
  run: createMasjidAppRun(ids, {
    prayerUrl: PRAYER_IFRAME_URL,
    fallbackJumaTimes: ["check website"],
  }),
};
