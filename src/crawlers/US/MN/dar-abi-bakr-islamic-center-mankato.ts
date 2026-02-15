import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "344cb7e1-48d0-41ee-bac2-e2afb1b9e7c5",
    name: "Dar Abi Bakr Islamic Center",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DDar+Abi+Bakr+Islamic+Center\u0026query_place_id\u003DChIJrS3fPPA59IcRX4Y4Kmq8hYs",
    timeZoneId: "America/Chicago",
    address: "329 E Plum St, Mankato, MN 56001, USA",
    placeId: "ChIJrS3fPPA59IcRX4Y4Kmq8hYs",
    geo: {
      latitude: 44.1673321,
      longitude: -93.9973119,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MN/dar-abi-bakr-islamic-center-mankato",
  ids,
};
