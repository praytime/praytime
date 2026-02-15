import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "07deeeb5-6dd6-4750-8a6b-2e915088d6c4",
    name: "Batavia Islamic Center",
    url: "http://bataviaislamiccenter.com",
    address: "222 S Batavia Ave, Batavia, IL 60510, USA",
    timeZoneId: "America/Chicago",
    placeId: "ChIJtSAijbj8DogRLoflgnzI_f4",
    geo: {
      latitude: 41.846624,
      longitude: -88.311146,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/IL/batavia-islamic-center",
  ids,
};
