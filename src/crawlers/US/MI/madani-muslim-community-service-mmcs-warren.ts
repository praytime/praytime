import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "402ee8ef-c2fc-4abf-94e0-112ef610a272",
    name: "MADANI MUSLIM COMMUNITY SERVICE (MMCS)",
    url: "http://www.madanimcs.org/",
    timeZoneId: "America/Detroit",
    address: "2446 Twelve Mile Rd, Warren, MI 48092, USA",
    placeId: "ChIJwzyCOFPFJIgR_fwBu13Vbz4", // alt: ChIJnfzAaVPFJIgRdxcHTjZKRSI
    geo: {
      latitude: 42.5050245,
      longitude: -83.0799739,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MI/madani-muslim-community-service-mmcs-warren",
  ids,
};
