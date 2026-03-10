import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "28b3575e-ee0c-4119-a007-17acb27451e0",
    name: "South Metro Islamic Center",
    url: "https://www.southmetroic.org/",
    timeZoneId: "America/Chicago",
    address: "15400 S Robert Trail, Rosemount, MN 55068, USA",
    placeId: "ChIJXbQWP4Q09ocRrozNTohb57U",
    geo: {
      latitude: 44.72677119999999,
      longitude: -93.13164909999999,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/MN/south-metro-islamic-center-rosemount",
  ids,
  run: createMasjidalRun(ids, "3AO2BxLe"),
};
