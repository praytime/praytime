import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "dc9d2aa1-b222-45ea-ba3d-f36ff38cc861",
    name: "Masjid al-Jami'e",
    url: "http://fjia.org/",
    timeZoneId: "America/Los_Angeles",
    address: "373 Alta Vista Dr, South San Francisco, CA 94080, USA",
    placeId: "ChIJNbrX5pF5j4ARFkeLZUz0dak",
    geo: {
      latitude: 37.6398981,
      longitude: -122.4351421,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/CA/masjid-al-jamie-south-san-francisco",
  ids,
};
