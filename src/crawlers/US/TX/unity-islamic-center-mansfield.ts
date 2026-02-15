import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "7f5a3172-1a8c-47bc-9d16-f1586a0837f9",
    name: "Unity Islamic Center",
    url: "http://www.unityislamiccenter.com/",
    timeZoneId: "America/Chicago",
    address: "201 Regency Pkwy #121, Mansfield, TX 76063, USA",
    placeId: "ChIJK0qoyDthToYRNkX07NLUvfU",
    geo: {
      latitude: 32.56536180000001,
      longitude: -97.1104091,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/TX/unity-islamic-center-mansfield",
  ids,
};
