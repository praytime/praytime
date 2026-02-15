import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "2262ccdb-f65c-4cef-bb82-9623f4271182",
    name: "Central Minnesota Islamic Center - Masjid Imaam Al-Shaafi'i",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DCentral+Minnesota+Islamic+Center+-+Masjid+Imaam+Al-Shaafi%27i\u0026query_place_id\u003DChIJuZVhS3pgtFIRP9eB4r8o78I",
    timeZoneId: "America/Chicago",
    address: "390 4th Ave S, St Cloud, MN 56301, USA",
    placeId: "ChIJuZVhS3pgtFIRP9eB4r8o78I",
    geo: {
      latitude: 45.556166,
      longitude: -94.1528531,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MN/central-minnesota-islamic-center-masjid-imaam-al-shaafii-st-cloud",
  ids,
};
