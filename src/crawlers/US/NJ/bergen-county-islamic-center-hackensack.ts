import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "b5370c7d-8dcd-46b0-84ff-4db4f26a8d2a",
    name: "Bergen County Islamic Center",
    url: "https://bciec.org/",
    timeZoneId: "America/New_York",
    address: "78 Trinity Pl, Hackensack, NJ 07601, USA",
    placeId: "ChIJXw8KsR36wokRtwptiWcEBCE",
    geo: {
      latitude: 40.8844444,
      longitude: -74.0455556,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  util.setTimes(
    ids[0],
    util
      .mapToText($, 'div[data-ux="ContentCards"] div[data-ux="ContentCard"]')
      .map((t) => t.replace(/^\w+:\s*/, "")),
  );

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NJ/bergen-county-islamic-center-hackensack",
  ids,
  run,
};
