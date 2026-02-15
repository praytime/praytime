import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "99888f29-9511-4244-972c-0edbc3609a82",
    name: "ISCF Masjid Al Mutakaber",
    url: "https://iscf.org/masjid-al-mutakaber/",
    timeZoneId: "America/New_York",
    address: "1011 State Hwy 540, Winter Haven, FL 33880, USA",
    placeId: "ChIJN9iwx6kT3YgRUMOetlylGos",
    geo: {
      latitude: 28.0034411,
      longitude: -81.761996,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/FL/iscf-masjid-al-mutakaber-winter-haven",
  ids,
};
