import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "aaa9e574-848f-4c79-b4c4-c890435fc936",
    name: "ASSALAM mosque",
    url: "http://www.islamicinstituteofmn.com/maplewood.html",
    timeZoneId: "America/Chicago",
    address: "1460 Skillman Ave E, Maplewood, MN 55109, USA",
    placeId: "ChIJr6GhxmbUslIRV1TKcgS1iXo",
    geo: {
      latitude: 45.0025384,
      longitude: -93.03879789999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MN/assalam-mosque-maplewood",
  ids,
};
