import { parsePrayerTable } from "../../../prayertable";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "9fcf6eb9-9795-4ea9-b2bc-cf74b68e2994",
    name: "Rahmat-e-Alam Foundation - Western Building",
    url: "https://www.shariahboard.org/",
    address: "7045 N Western Ave, Chicago, IL 60645, USA",
    placeId: "ChIJT7yggtHRD4gRlUbrWuBRJYw",
    timeZoneId: "America/Chicago",
    geo: {
      latitude: 42.009954,
      longitude: -87.689971,
    },
  },
  {
    uuid4: "eff0d63a-3b35-4c54-bfa7-9b5b6d8a76d7",
    name: "Rahmat-e-Alam Foundation - California Building",
    url: "https://www.shariahboard.org/",
    address: "6201 N California Ave, Chicago, IL 60659, USA",
    placeId: "ChIJdQdsux_OD4gRkH5DT01BEpI",
    timeZoneId: "America/Chicago",
    geo: {
      latitude: 41.994201,
      longitude: -87.699305,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);
  const tables = $(".prayer-timings table.timings-table");
  const parseJumaTimes = ({ iqamaText }: { iqamaText: string }) =>
    util.matchTimeAmPmG(iqamaText) ?? [];

  const west = parsePrayerTable($, tables.eq(0), {
    errorContext: "shariaboard table 0",
    iqamaCellIndex: 2,
    parseJumaTimes,
  });
  util.setIqamaTimes(ids[0], west.iqamah);
  util.setJumaTimes(ids[0], west.jummah);

  const california = parsePrayerTable($, tables.eq(1), {
    errorContext: "shariaboard table 1",
    iqamaCellIndex: 2,
    parseJumaTimes,
  });
  util.setIqamaTimes(ids[1], california.iqamah);
  util.setJumaTimes(ids[1], california.jummah);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/shariaboard-chicago",
  ids,
  run,
};
