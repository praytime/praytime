// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "d6970cd2-cbdb-4333-b9c4-b85a90c9c8e9",
    name: "Naif Herndon Center",
    url: "http://www.naifcenter.org/",
    timeZoneId: "America/New_York",
    address: "13515 Dulles Technology Dr STE 1, Herndon, VA 20171, USA",
    placeId: "ChIJdQVTUj9HtokRH1hXCnh1F7c",
    geo: {
      latitude: 38.95318759999999,
      longitude: -77.41270279999999,
    },
  },
  {
    uuid4: "13fa5397-397d-4a24-9188-e01b4f16c4ee",
    name: "NAIF Center",
    url: "http://www.naifcenter.org/",
    timeZoneId: "America/New_York",
    address: "9720 Capital Ct, Manassas, VA 20110, USA",
    placeId: "ChIJAQAQ-tNdtokR8GCyYjxLs60",
    geo: {
      latitude: 38.7388456,
      longitude: -77.5211408,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util
    .mapToText($, ".prayer-timings-table td:last-child")
    .filter(util.matchTimeAmPm);
  util.setIqamaTimes(ids[0], a);
  util.setIqamaTimes(ids[1], a);

  util.setJumaTimes(
    ids[0],
    util.mapToText($, '.prayer-timings-table td:contains("Herndon") + td'),
  );
  util.setJumaTimes(
    ids[1],
    util.mapToText($, '.prayer-timings-table td:contains("Manassas") + td'),
  );

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/VA/naif-herndon-center-herndon",
  ids,
  run,
};
