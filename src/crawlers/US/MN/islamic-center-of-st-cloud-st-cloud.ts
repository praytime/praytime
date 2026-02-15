import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "139e706e-57d1-4975-89a4-f336265523e8",
    name: "Islamic Center of St Cloud (Masjid Al-Iman)",
    url: "https://www.facebook.com/ICSCmn/",
    timeZoneId: "America/Chicago",
    address: "712-722 17th Ave S, St Cloud, MN 56301, USA",
    placeId: "ChIJU3VYWsVftFIR3jJF5bG7fVw",
    geo: {
      latitude: 45.5527104,
      longitude: -94.1706232,
    },
  },
  {
    uuid4: "a2047b20-98ec-4045-b072-d7d4a6cfcb70",
    name: "Islamic Center of St Cloud (Masjid Al-Nur)",
    url: "https://www.facebook.com/ICSCmn/",
    timeZoneId: "America/Chicago",
    address: "375 5th Ave S, St Cloud, MN 56301, USA",
    placeId: "ChIJwTNJ1ntgtFIRQffgQXkNLlI",
    geo: {
      latitude: 45.55665969999999,
      longitude: -94.1551132,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MN/islamic-center-of-st-cloud-st-cloud",
  ids,
};
