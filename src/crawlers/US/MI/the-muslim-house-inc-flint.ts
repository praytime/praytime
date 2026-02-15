import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "bca65b22-ff25-4c4d-a994-22ef10626c7f",
    name: "The Muslim House, Inc.",
    url: "https://www.facebook.com/The-Muslim-House-148159981880787",
    timeZoneId: "America/Detroit",
    address: "804 Martin Luther King Ave, Flint, MI 48503, USA",
    placeId: "ChIJAd-WBz-CI4gR3fnqkANls4M",
    geo: {
      latitude: 43.02322489999999,
      longitude: -83.69655,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MI/the-muslim-house-inc-flint",
  ids,
};
