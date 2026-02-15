import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "f9c95eb8-101f-4e89-900b-f1217d3584cd",
    name: "Masjid Omar Al-Farooq",
    url: "https://www.facebook.com/ICNA-Central-Florida-617669371701835/",
    timeZoneId: "America/New_York",
    address: "526 W Lake Mary Blvd, Sanford, FL 32773, USA",
    placeId: "ChIJ6xQq8KRy54gRABWkBsl_Tg0",
    geo: {
      latitude: 28.7578985,
      longitude: -81.29532929999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/FL/masjid-omar-al-farooq-sanford",
  ids,
};
