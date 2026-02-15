import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "f30915ce-82f3-4691-a0bf-bb624b81efe3",
    name: "Islamic Center of Oakland (ICO)",
    url: "https://www.google.com/maps/search/?api=1&query=Islamic+Center+of+Oakland+%28ICO%29&query_place_id=ChIJY5V3SAB-hYARAobcajSl47A",
    timeZoneId: "America/Los_Angeles",
    address: "515 31st St, Oakland, CA 94609, USA",
    placeId: "ChIJY5V3SAB-hYARAobcajSl47A",
    geo: {
      latitude: 37.8197718,
      longitude: -122.2676706,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/CA/islamic-center-of-oakland-ico-oakland",
  ids,
};
