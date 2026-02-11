// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "408a7c0e-7a28-4ad1-bdbf-eeecb02c2214",
    name: "Darussalam Mosque (Islamic Society of San Francisco)",
    url: "http://islamsf.org/",
    timeZoneId: "America/Los_Angeles",
    address: "20 Jones St, San Francisco, CA 94102, USA",
    placeId: "ChIJucn4J4WAhYARDAhpfUI7cxM",
    geo: {
      latitude: 37.7815675,
      longitude: -122.4119737,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/CA/darussalam-mosque-islamic-society-of-san-francisco-sf",
  ids,
};
