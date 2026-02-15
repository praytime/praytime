import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "4fc00d96-c943-4364-bed2-917e3f5661eb",
    name: "Masjid Attakwa",
    url: "http://www.masjidattakwa.org/",
    timeZoneId: "America/Chicago",
    address: "701 S Garfield Ave, Sioux Falls, SD 57104, USA",
    placeId: "ChIJA7DJvnHKjocR1HDBWkpCmgs",
    geo: {
      latitude: 43.5401157,
      longitude: -96.7586245,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/SD/masjid-attakwa-sioux-falls",
  ids,
};
