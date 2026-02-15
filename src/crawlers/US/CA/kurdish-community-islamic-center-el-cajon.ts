import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "622107e7-1eb0-4159-89de-e1bf1b54cca1",
    name: "Kurdish Community Islamic Center",
    url: "http://www.masjidashty.com/",
    timeZoneId: "America/Los_Angeles",
    address: "1357 Broadway, El Cajon, CA 92021, USA",
    placeId: "ChIJeav4mAFZ2YARip9YqlXma0w",
    geo: {
      latitude: 32.8075135,
      longitude: -116.9336595,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/CA/kurdish-community-islamic-center-el-cajon",
  ids,
};
