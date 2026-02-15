import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "dc920932-b3ba-4d07-8892-e881f9c6ab3d",
    name: "Islamic Center of North County",
    url: "http://www.icnc.ws/",
    timeZoneId: "America/Los_Angeles",
    address: "13495 Poway Rd, Poway, CA 92064, USA",
    placeId: "ChIJy1cOudj624ARd9Nm9Ncxp4w",
    geo: {
      latitude: 32.9547302,
      longitude: -117.0388931,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/CA/islamic-center-of-north-county-poway",
  ids,
};
