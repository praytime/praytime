import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "7524b4a3-8c95-4158-9812-44a1bf6b466e",
    name: "Sharif Fashion",
    url: "https://www.facebook.com/SharifFahionLlc/",
    timeZoneId: "America/Chicago",
    address: "2910 Pillsbury Ave Suite 123, Minneapolis, MN 55408, USA",
    placeId: "ChIJt0-8uIsn9ocR92kcsobdxpI",
    geo: {
      latitude: 44.9499426,
      longitude: -93.2822952,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MN/sharif-fashion-minneapolis",
  ids,
};
