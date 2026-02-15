import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "25a6a193-fbb0-49a0-bfed-c0dd9d453fb7",
    name: "Tavares Islamic Center",
    url: "",
    timeZoneId: "America/New_York",
    address: "2824 S Grove St, Eustis, FL 32726, USA",
    placeId: "ChIJ9eJvwNGi54gR6IyQO_zZsjo",
    geo: {
      latitude: 28.8257781,
      longitude: -81.6842417,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/FL/tavares-islamic-center-eustis",
  ids,
};
