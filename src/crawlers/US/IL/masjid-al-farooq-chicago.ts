import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "3d831335-0908-48b8-a30e-1f21d5d3e899",
    name: "Masjid Al Farooq",
    url: "https://www.mafchicago.com/",
    timeZoneId: "America/Chicago",
    address: "8950 S Stony Island Ave, Chicago, IL 60617, USA",
    placeId: "ChIJHXOKFykmDogRwk7cbmZqngM",
    geo: {
      latitude: 41.7316667,
      longitude: -87.58583329999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/IL/masjid-al-farooq-chicago",
  ids,
};
