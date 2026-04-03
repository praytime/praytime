import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "b4e14309-4f00-4f67-827f-c14c6408b838",
    name: "Bilal Ibn Rabah Islamic center",
    url: "http://bilalislamiccenter.com/",
    timeZoneId: "America/Los_Angeles",
    address: "607 SE Everett Mall Way Unit 6D, Everett, WA 98204, USA",
    geo: {
      latitude: 47.910235,
      longitude: -122.224584,
    },
    placeId: "ChIJ7eiGP9MGkFQREKOMJdMaFBQ",
  },
];
export const crawler: CrawlerModule = {
  name: "US/WA/bilal-islamic-center-everett",
  ids,
  // MuslimFeed no longer exposes current iqama times for this masjid.
};
