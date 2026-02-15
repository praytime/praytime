import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "c30b9ae0-e16c-4bce-bf0a-9f8c02e5f093",
    name: "Masjid ul Haqq, Inc.",
    url: "https://masjidulhaqqbalto.com/",
    timeZoneId: "America/New_York",
    address: "514 Islamic Way, Baltimore, MD 21217, USA",
    placeId: "ChIJTxCJLrEEyIkR4jEie39qqRc",
    geo: {
      latitude: 39.3050142,
      longitude: -76.6331136,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MD/masjid-ul-haqq-inc-baltimore",
  ids,
};
