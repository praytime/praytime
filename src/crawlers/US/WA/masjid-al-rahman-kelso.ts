import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "13d153fe-0a11-4182-be14-952cadb73eaa",
    name: "Masjid Al-Rahman",
    url: "https://www.google.com/maps/search/?api=1&query=Masjid+Al-Rahman&query_place_id=ChIJhct5VMdslFQRcikLvHZodMc",
    timeZoneId: "America/Los_Angeles",
    address: "424 Long Ave, Kelso, WA 98626, USA",
    placeId: "ChIJhct5VMdslFQRcikLvHZodMc",
    geo: {
      latitude: 46.1500357,
      longitude: -122.9181166,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/WA/masjid-al-rahman-kelso",
  ids,
};
