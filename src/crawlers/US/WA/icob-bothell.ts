import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "fba149e9-2199-4c8a-a37d-784340297355",
    name: "Islamic Center of Bothell",
    url: "https://bothellmosque.org/",
    timeZoneId: "America/Los_Angeles",
    address: "10027 Main St, Bothell, WA 98011, USA",
    geo: {
      latitude: 47.7599261,
      longitude: -122.2060476,
    },
    placeId: "ChIJkaqOrjQPkFQRYKOm9ZbSlJU", // temp location
    // ChIJk7ou2msOkFQRG1pKlmCuRpQ - closed for construction
  },
];
const run = async () => {
  const $ = await util.load("https://ezan.io/ezantime/?loc=bothell-mosque");

  $('tr:contains("Sunrise")').remove();

  const a = util.mapToText($, "td:last-child");

  util.setTimes(ids[0], a);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/WA/icob-bothell",
  ids,
  run,
};
