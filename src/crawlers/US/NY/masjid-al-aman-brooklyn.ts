import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "058b4e16-397a-4cd9-a0c6-e6e039684872",
    name: "Masjid Al-Aman",
    url: "http://www.masjidalaman.com/",
    timeZoneId: "America/New_York",
    address: "203 Forbell St, Brooklyn, NY 11208, USA",
    placeId: "ChIJTekAOpVdwokRwp9q-SJz80k",
    geo: {
      latitude: 40.67816639999999,
      longitude: -73.8636736,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/NY/masjid-al-aman-brooklyn",
  ids,
};
