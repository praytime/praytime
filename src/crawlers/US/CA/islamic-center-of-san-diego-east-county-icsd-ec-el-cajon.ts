import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "0284115e-bc91-4ff9-9836-46e6e215ebbd",
    name: "Islamic Center of San Diego-East County (ICSD-EC)",
    url: "https://islamic-center-of-san-diego-east-county.business.site/",
    timeZoneId: "America/Los_Angeles",
    address: "833 Broadway, El Cajon, CA 92021, USA",
    placeId: "ChIJrVUFX1dZ2YARYKE4z-kEpj8",
    geo: {
      latitude: 32.807278,
      longitude: -116.9521498,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/CA/islamic-center-of-san-diego-east-county-icsd-ec-el-cajon",
  ids,
};
