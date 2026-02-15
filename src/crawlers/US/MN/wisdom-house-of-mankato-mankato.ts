import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "fd4cf137-bd39-4c26-b815-f271e8fd9db1",
    name: "Wisdom House of Mankato",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DWisdom+House+of+Mankato\u0026query_place_id\u003DChIJb33QKy859IcRPv3Fp1ACPLo",
    timeZoneId: "America/Chicago",
    address: "222 E Walnut St, Mankato, MN 56001, USA",
    placeId: "ChIJb33QKy859IcRPv3Fp1ACPLo",
    geo: {
      latitude: 44.165467,
      longitude: -94.0011533,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MN/wisdom-house-of-mankato-mankato",
  ids,
};
