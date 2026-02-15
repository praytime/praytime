import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "6dd13ec9-17c9-45a0-95d9-6980f0aff405",
    name: "Muslim Community Center Of Detroit",
    url: "https://www.facebook.com/Muslim-Community-Center-of-Detroit-1433032846998956/",
    timeZoneId: "America/Detroit",
    address: "13720 W McNichols Rd, Detroit, MI 48235, USA",
    placeId: "ChIJB21UqOjLJIgRgJvh8HYHjwM",
    geo: {
      latitude: 42.416839,
      longitude: -83.181495,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MI/muslim-community-center-of-detroit-detroit",
  ids,
};
