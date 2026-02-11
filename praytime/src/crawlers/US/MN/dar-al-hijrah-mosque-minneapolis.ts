// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "3f7a055b-54ff-4dfc-b68c-e79dd4f32ced",
    name: "Dar Al-Hijrah Mosque",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DDar+Al-Hijrah+Mosque\u0026query_place_id\u003DChIJYYtonUMts1IRSZpTfmLg5Cw",
    timeZoneId: "America/Chicago",
    address: "504 Cedar Ave, Minneapolis, MN 55454, USA",
    placeId: "ChIJYYtonUMts1IRSZpTfmLg5Cw",
    geo: {
      latitude: 44.96861699999999,
      longitude: -93.247532,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MN/dar-al-hijrah-mosque-minneapolis",
  ids,
};
