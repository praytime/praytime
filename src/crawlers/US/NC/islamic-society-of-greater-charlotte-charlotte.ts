import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "8f9195a8-66f6-4456-ab22-a96783d98817",
    name: "Islamic Society of Greater Charlotte",
    url: "http://isgcharlotte.com/",
    timeZoneId: "America/New_York",
    address: "7025 The Plaza, Charlotte, NC 28215, USA",
    placeId: "ChIJH3ImHd8eVIgR6hd4QM8Bwr8",
    geo: {
      latitude: 35.25698249999999,
      longitude: -80.740174,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NC/islamic-society-of-greater-charlotte-charlotte",
  ids,
};
