// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "1836360f-5764-47fe-a6d8-c7f313b4ed29",
    name: "Muslim Center of Racine",
    url: "https://www.facebook.com/shakoorluqman/",
    timeZoneId: "America/Chicago",
    address: "419 High St, Racine, WI 53402, USA",
    placeId: "ChIJDzySg41DBYgR5lhGdSOqJLI",
    geo: {
      latitude: 42.74219799999999,
      longitude: -87.785771,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/WI/muslim-center-of-racine-racine",
  ids,
};
