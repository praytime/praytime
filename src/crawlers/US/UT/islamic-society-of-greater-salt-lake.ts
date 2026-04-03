import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "9fe30cc6-6683-46c3-808e-71646b1e124d",
    name: "Khadeeja Islamic Center (Islamic Society of Greater Salt Lake)",
    url: "http://utahmuslims.com/",
    timeZoneId: "America/Denver",
    address: "1019 W Parkway Ave, West Valley City, UT 84119, USA",
    placeId: "ChIJv-gQ9zmLUocR-VsHTtn0umU",
    geo: {
      latitude: 40.7169444,
      longitude: -111.9227778,
    },
  },
  {
    uuid4: "4e54bcd0-1bd5-47af-8df4-9d1d8f8c6003",
    name: "Masjid Al-Noor (Islamic Society of Greater Salt Lake)",
    url: "http://www.utahmuslims.com/",
    timeZoneId: "America/Denver",
    address: "740 S 700 E, Salt Lake City, UT 84102, USA",
    placeId: "ChIJrR-7dUP1UocRTHm55kiQTjU",
    geo: {
      latitude: 40.75311360000001,
      longitude: -111.8713079,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/UT/islamic-society-of-greater-salt-lake",
  ids,
  // The published sheet and PDF are stale and no longer cover the current date.
};
