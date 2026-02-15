import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "29eaa0f1-9164-447d-8eac-86eaed3e704f",
    name: "Islamic Society of Arlington Texas",
    url: "http://www.centermasjid.org/",
    timeZoneId: "America/Chicago",
    address: "1700 S Center St, Arlington, TX 76010, USA",
    geo: {
      latitude: 32.718492,
      longitude: -97.104419,
    },
    placeId: "ChIJawtfz0J9ToYR9MihBOCNEyE",
  },
];

export const crawler: CrawlerModule = {
  name: "US/TX/islamic-society-of-arlington-texas",
  ids,
};
