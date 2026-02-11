// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "7abaee28-9579-42aa-9936-70c86d3cba1a",
    name: "Islamic Center Of EL Cajon (Masjid Al Firdaws)",
    url: "https://islamic-center-of-el-cajon-masjid-al-firdaws.business.site/",
    timeZoneId: "America/Los_Angeles",
    address: "557 El Cajon Blvd, El Cajon, CA 92020, USA",
    placeId: "ChIJsTRM9c9Z2YARYzbPwmeJvmI",
    geo: {
      latitude: 32.7900719,
      longitude: -116.9720273,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/CA/islamic-center-of-el-cajon-masjid-al-firdaws-el-cajon",
  ids,
};
