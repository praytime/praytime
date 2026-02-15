import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "979dea4b-5df2-46a0-88c4-2fb0e11a685e",
    name: "Masjid As-Sabur",
    url: "https://www.masjidassaburlv.com/",
    timeZoneId: "America/Los_Angeles",
    address: "711 Morgan Ave, Las Vegas, NV 89106, USA",
    placeId: "ChIJWyg-va_DyIARghkYZcaFekE",
    geo: {
      latitude: 36.1799856,
      longitude: -115.1512791,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NV/masjid-as-sabur-las-vegas",
  ids,
};
