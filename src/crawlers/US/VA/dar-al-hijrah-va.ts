import { createSelectorRun } from "../../../selectors";
import type { CrawlerModule } from "../../../types";

// const axios = require('axios')
// const cheerio = require('cheerio')

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "6515de3b-bbda-49aa-97bd-6962072a9880",
    name: "Dar Al-Hijrah",
    url: "https://hijrah.org/",
    address: "3159 Row St, Falls Church, VA 22044, USA",
    timeZoneId: "America/New_York",
    placeId: "ChIJKZHrdH60t4kRDYVdiyL8Gps",
    geo: {
      latitude: 38.861948,
      longitude: -77.14697,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/VA/dar-al-hijrah-va",
  ids,
  run: createSelectorRun(ids, {
    iqama: { selector: "table.dptTimetable td.jamah" },
    jumaDefault: ["check website", "check website", "check website"],
  }),
};
