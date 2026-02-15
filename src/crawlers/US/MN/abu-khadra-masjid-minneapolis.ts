import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "12b3a6f2-16ee-417c-af94-4810da5d9f5f",
    name: "Abu Khadra Masjid",
    url: "https://www.facebook.com/abukhadramasjid",
    timeZoneId: "America/Chicago",
    address: "4056 7th St NE, Minneapolis, MN 55421, USA",
    placeId: "ChIJw0HoUxcus1IR2zMhIbCLyS8",
    geo: {
      latitude: 45.0426637,
      longitude: -93.2580411,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MN/abu-khadra-masjid-minneapolis",
  ids,
};
