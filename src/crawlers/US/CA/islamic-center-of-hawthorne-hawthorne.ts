import {
  createMasjidAppRun,
  resolveMasjidAppPrayerUrl,
} from "../../../masjidapp";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "afae23dc-56dc-4ed7-9393-f782c7e13d6b",
    name: "Islamic Center of Hawthorne",
    url: "https://ichla.org/",
    timeZoneId: "America/Los_Angeles",
    address: "12209 Hawthorne Way, Hawthorne, CA 90250, USA",
    placeId: "ChIJL1hpkYO2woARA9PulLUU09g",
    geo: {
      latitude: 33.92168049999999,
      longitude: -118.353775,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/CA/islamic-center-of-hawthorne-hawthorne",
  ids,
  run: createMasjidAppRun(ids, {
    prayerUrl: "https://themasjidapp.org/31/prayers",
    resolvePrayerUrl: () =>
      resolveMasjidAppPrayerUrl(
        ids[0].url ?? "",
        "https://themasjidapp.org/31/prayers",
      ),
  }),
};
