import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "dc460379-4ceb-4939-a450-ad20f849c85e",
    name: "Masjid Al-Mu'mineen",
    url: "http://masjid-al-mu-mineen.jany.io/",
    timeZoneId: "America/Los_Angeles",
    address: "1280 3rd Ave, Chula Vista, CA 91911, USA",
    placeId: "ChIJ6YjAmYhO2YARzZdgPebL1ec",
    geo: {
      latitude: 32.6074436,
      longitude: -117.0669928,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/CA/masjid-al-mumineen-chula-vista",
  ids,
};
