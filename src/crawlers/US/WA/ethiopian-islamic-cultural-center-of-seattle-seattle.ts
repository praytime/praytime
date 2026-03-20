import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "4563946e-9cdd-43a4-9095-92195f25a17b",
    name: "Ethiopian Islamic Cultural Center of Seattle",
    url: "https://www.google.com/maps/search/?api=1&query=Ethiopian+Islamic+Cultural+Center+of+Seattle&query_place_id=ChIJ7XZT6RJCkFQR_rpz0RwCHF8",
    timeZoneId: "America/Los_Angeles",
    address: "8819 Renton Ave S, Seattle, WA 98118, USA",
    placeId: "ChIJ7XZT6RJCkFQR_rpz0RwCHF8",
    geo: {
      latitude: 47.5236306,
      longitude: -122.2766678,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/WA/ethiopian-islamic-cultural-center-of-seattle-seattle",
  ids,
};
