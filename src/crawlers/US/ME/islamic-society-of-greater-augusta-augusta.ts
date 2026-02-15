import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "23c99c5a-df97-4d61-b65a-a2d5cefb2be4",
    name: "Islamic Society of Greater Augusta",
    url: "http://goisga.org/contact-us/",
    timeZoneId: "America/New_York",
    address: "11 N Pearl St, Augusta, ME 04330, USA",
    placeId: "ChIJveNARDEBskwRyph76LvhSx4",
    geo: {
      latitude: 44.32359520000001,
      longitude: -69.76142,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/ME/islamic-society-of-greater-augusta-augusta",
  ids,
};
