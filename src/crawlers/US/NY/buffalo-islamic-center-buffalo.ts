// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "026ecb46-1665-4b33-857a-b0baa64d5b30",
    name: "Buffalo Islamic Center",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DBuffalo+Islamic+Center\u0026query_place_id\u003DChIJ8c04JcET04kRkMkq8LRTV6U",
    timeZoneId: "America/New_York",
    address: "863 Broadway, Buffalo, NY 14212, USA",
    placeId: "ChIJ8c04JcET04kRkMkq8LRTV6U",
    geo: {
      latitude: 42.892153,
      longitude: -78.84258229999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/buffalo-islamic-center-buffalo",
  ids,
};
