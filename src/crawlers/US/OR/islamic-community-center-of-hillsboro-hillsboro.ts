import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "70a920c7-c4bc-42f9-a2e5-033ca65e799e",
    name: "Islamic Community Center of Hillsboro",
    url: "https://icch.info/",
    timeZoneId: "America/Los_Angeles",
    address: "7270 NW Helvetia Rd, Hillsboro, OR 97124, USA",
    placeId: "ChIJe0k0irQFlVQRgJE7EMhefQ0",
    geo: {
      latitude: 45.5721162,
      longitude: -122.9232076,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/OR/islamic-community-center-of-hillsboro-hillsboro",
  ids,
};
